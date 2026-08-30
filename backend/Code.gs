/**
 * Home Meals - shared Apps Script backend
 * One Web App deployment serves every shop. Onboarding a new shop means
 * adding one row to the REGISTRY_SHEET_ID's "Shops" tab, not new code.
 *
 * ── Deployment ──
 * Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone.
 * After any code change: Deploy → Manage deployments → edit the existing
 * deployment → "New version" → Deploy. This keeps the same URL alive -
 * creating a fresh deployment instead would break the live site's URL.
 *
 * ── Registry sheet ("Shops" tab), never shared with anyone ──
 * Columns: ShopID | ShopName | PublicSheetID | PrivateSheetID |
 *          DiscordWebhookOrderPosted | DiscordWebhookOrderStatus |
 *          DiscordWebhookNewSignups | SellerDiscordUserID
 *
 * ── Registry sheet ("Leads" tab) ──
 * Columns: Timestamp | Name | Contact | Cuisine | Notes
 */

const REGISTRY_SHEET_ID = "REPLACE_WITH_YOUR_PRIVATE_REGISTRY_SHEET_ID";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot - real users never fill this hidden field, bots often do.
    if (data.website) {
      return jsonResponse({ success: true }); // fail silently, don't tip off the bot
    }

    switch (data.type) {
      case "orderRequest":
        return jsonResponse(handleOrderRequest(data));
      case "payment":
        return jsonResponse(handlePayment(data));
      case "sellerSignup":
        return jsonResponse(handleSellerSignup(data));
      default:
        return jsonResponse({ success: false, error: "Unknown request type." });
    }
  } catch (err) {
    logError(err, e);
    return jsonResponse({ success: false, error: "Something went wrong. Please try again." });
  } finally {
    lock.releaseLock();
  }
}

/* ============================================================
   Order request (step 1 - no payment yet)
   ============================================================ */
function handleOrderRequest(data) {
  const shop = getShopConfig(data.shopId);
  if (!shop) return { success: false, error: "Shop not found." };

  const publicSheet = SpreadsheetApp.openById(shop.PublicSheetID);
  const menuSheet = publicSheet.getSheetByName("Menu");
  const item = findRowByColumn(menuSheet, "ItemID", data.itemId);

  if (!item) return { success: false, error: "Item not found." };
  if (String(item.Available).toUpperCase() !== "Y") {
    return { success: false, error: `Sorry, "${item.Name}" is no longer available. Please pick something else.` };
  }

  const orderCode = genOrderCode(shop.ShopID);
  const qty = Number(data.qty) || 1;
  const total = Number(item.Price) * qty;

  const privateSheet = SpreadsheetApp.openById(shop.PrivateSheetID);
  const ordersSheet = privateSheet.getSheetByName("Orders");
  ordersSheet.appendRow([
    new Date(),
    orderCode,
    item.Name,
    qty,
    item.Price,
    total,
    data.buyerName,
    data.contact,
    data.location,
    "", // Payment Method - filled at payment step
    "", // Transaction ID - filled at payment step
    "Awaiting availability",
    data.notes || "",
  ]);

  postToDiscord(shop.DiscordWebhookOrderPosted, {
    content: `New order request **${orderCode}**`,
    embeds: [
      {
        title: `Order ${orderCode}`,
        fields: [
          { name: "Item", value: `${item.Name} × ${qty}`, inline: true },
          { name: "Total", value: `৳${total}`, inline: true },
          { name: "Buyer", value: data.buyerName, inline: true },
          { name: "Contact", value: data.contact, inline: true },
          { name: "Location", value: data.location, inline: true },
          { name: "Notes", value: data.notes || "—", inline: true },
        ],
      },
    ],
  });

  return { success: true, orderCode };
}

/* ============================================================
   Payment submission (step 2)
   ============================================================ */
function handlePayment(data) {
  const shop = getShopConfig(data.shopId);
  if (!shop) return { success: false, error: "Shop not found." };

  const privateSheet = SpreadsheetApp.openById(shop.PrivateSheetID);
  const ordersSheet = privateSheet.getSheetByName("Orders");
  const { row, rowIndex, headers } = findRowWithIndex(ordersSheet, "Order Code", data.orderCode);

  if (!row) return { success: false, error: "Order ID not found. Double-check your order code." };
  if (row["Transaction ID"] || row["Payment Method"] === "Cash") {
    return { success: false, error: "Payment already submitted for this order. Contact the seller if this looks wrong." };
  }

  if (data.paymentMethod === "bKash") {
    const dup = findRowByColumn(ordersSheet, "Transaction ID", data.transactionId);
    if (dup) return { success: false, error: "This transaction ID has already been used for another order." };
  }

  const methodCol = headers.indexOf("Payment Method") + 1;
  const txnCol = headers.indexOf("Transaction ID") + 1;
  const statusCol = headers.indexOf("Payment Verified") + 1;

  ordersSheet.getRange(rowIndex, methodCol).setValue(data.paymentMethod);
  ordersSheet.getRange(rowIndex, txnCol).setValue(data.paymentMethod === "bKash" ? data.transactionId : "");
  ordersSheet
    .getRange(rowIndex, statusCol)
    .setValue(data.paymentMethod === "Cash" ? "Cash - verify at handoff" : "Awaiting verification");

  postToDiscord(shop.DiscordWebhookOrderPosted, {
    content: `💳 Payment submitted for **${data.orderCode}**`,
    embeds: [
      {
        title: `Order ${data.orderCode}`,
        fields: [
          { name: "Method", value: data.paymentMethod, inline: true },
          { name: "Transaction ID", value: data.paymentMethod === "bKash" ? data.transactionId : "—", inline: true },
          { name: "Amount", value: `৳${row["Total"]}`, inline: true },
        ],
      },
    ],
  });

  return { success: true, orderCode: data.orderCode };
}

/* ============================================================
   Seller signup lead
   ============================================================ */
function handleSellerSignup(data) {
  const registry = SpreadsheetApp.openById(REGISTRY_SHEET_ID);
  const leadsSheet = registry.getSheetByName("Leads");
  leadsSheet.appendRow([new Date(), data.name, data.contact, data.cuisine, data.notes || ""]);
  return { success: true };
}

/* ============================================================
   Helpers
   ============================================================ */
function getShopConfig(shopId) {
  const registry = SpreadsheetApp.openById(REGISTRY_SHEET_ID);
  const shopsSheet = registry.getSheetByName("Shops");
  return findRowByColumn(shopsSheet, "ShopID", shopId);
}

// Returns the first matching row as a { header: value } object, or null.
function findRowByColumn(sheet, columnName, value) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const colIndex = headers.indexOf(columnName);
  if (colIndex === -1) return null;

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][colIndex]) === String(value)) {
      const obj = {};
      headers.forEach((h, j) => (obj[h] = data[i][j]));
      return obj;
    }
  }
  return null;
}

// Same as above, but also returns the sheet row index (1-based) for editing.
function findRowWithIndex(sheet, columnName, value) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const colIndex = headers.indexOf(columnName);
  if (colIndex === -1) return { row: null, rowIndex: -1, headers };

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][colIndex]) === String(value)) {
      const obj = {};
      headers.forEach((h, j) => (obj[h] = data[i][j]));
      return { row: obj, rowIndex: i + 1, headers };
    }
  }
  return { row: null, rowIndex: -1, headers };
}

function genOrderCode(shopCode) {
  const now = new Date();
  const datePart = Utilities.formatDate(now, "GMT+6", "yyMMdd");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${shopCode}-${datePart}-${rand}`;
}

function postToDiscord(webhookUrl, payload) {
  if (!webhookUrl) return;
  try {
    UrlFetchApp.fetch(webhookUrl, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });
  } catch (err) {
    logError(err, { context: "postToDiscord", webhookUrl });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function logError(err, context) {
  try {
    const registry = SpreadsheetApp.openById(REGISTRY_SHEET_ID);
    let errorsSheet = registry.getSheetByName("Errors");
    if (!errorsSheet) errorsSheet = registry.insertSheet("Errors");
    errorsSheet.appendRow([new Date(), String(err), JSON.stringify(context)]);
  } catch (e) {
    // last resort - nothing more we can do if even the error log fails
  }
}
