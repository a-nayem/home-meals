# Home Meals - Backend Setup

## 1. Create the registry sheet (private, never shared)

New Google Sheet, two tabs:

**Shops**
`ShopID | ShopName | PublicSheetID | PrivateSheetID | DiscordWebhookOrderPosted | DiscordWebhookOrderStatus | DiscordWebhookNewSignups | SellerDiscordUserID`

**Leads**
`Timestamp | Name | Contact | Cuisine | Notes`

Copy this Sheet's ID from its URL into `REGISTRY_SHEET_ID` at the top of `Code.gs`.

## 2. Create each shop's two sheets

**Public Sheet** (share as "Anyone with the link can view"):
- `Menu` tab - import `public-sheet-menu.csv`
- `Reviews` tab - import `public-sheet-reviews.csv`

**Private Sheet** (never shared - seller gets Viewer access only, added manually):
- `Orders` tab - import `private-sheet-orders.csv`

Copy both Sheet IDs into a new row in the registry's `Shops` tab.

## 3. Add the Public Sheet ID to the frontend

In `lib/shops.ts`, set `publicSheetId` for the shop to match what you just created.

## 4. Set up Discord

One server, one category per shop, six channels: `#order-posted`, `#order-status`, `#payment-form`, `#support`, `#talk-to-dev`, `#suggestions`.

Permissions:
- `#order-posted` - seller + admin only, both read and write
- `#order-status` - seller + admin write, buyers read-only
- `#payment-form` - admin write only, everyone read (pin the site's `/shop/[shopId]/pay` link here)
- the rest - open to everyone

Create a webhook in `#order-posted` (Channel Settings → Integrations → Webhooks → New Webhook), copy its URL into the registry's `DiscordWebhookOrderPosted` column for that shop. Repeat for `#order-status` if you want automated status posts later, and for a `#new-signups` admin channel if you want lead notifications.

## 5. Deploy the Apps Script

1. Create a new Apps Script project, paste in `Code.gs`
2. Set `REGISTRY_SHEET_ID` at the top
3. Deploy → New deployment → type: Web app → Execute as: **Me** → Who has access: **Anyone**
4. Copy the deployment URL

**Every time you edit the code afterward:** Deploy → Manage deployments → edit icon on the existing deployment → Version: "New version" → Deploy. This keeps the same URL live. Creating a brand new deployment instead gives you a different URL and breaks the site until you update it.

## 6. Wire the frontend to the backend

In `.env.local` (copy from `.env.local.example`):

```
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## 7. Run it

```
npm install
npm run dev
```

## What's already handled in Code.gs

- Duplicate transaction ID rejection, checked inside the same lock as the write so two near-simultaneous submissions can't both slip through
- Availability re-checked at submission time, not just at page load, so a mid-browse sold-out item gets rejected with a clear message
- Honeypot field silently discarded, no error shown to the bot
- All writes wrapped in try/catch with a fallback `Errors` tab so a failure never loses an order silently
- One shared script and one deployment for every shop - onboarding a new shop is a registry row, not new code

## Still manual by design (per the agreed system)

- Availability confirmation and payment verification happen as plain text messages typed by the seller in Discord, not automated - no bot required
- Weekly/monthly analytics are read manually from the Orders sheet
- Cash orders are verified face-to-face at handoff, matched against the Orders sheet by name and phone
