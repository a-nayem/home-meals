import { MenuItem, Review } from "./types";

/**
 * Fetches a single tab from a public Google Sheet using the gviz
 * endpoint, which returns JSON without needing the Sheets API or
 * an API key. The sheet must be shared as "Anyone with link can view".
 *
 * Revalidates every 30 seconds so menu changes (price, sold out)
 * show up on the live site without a redeploy.
 */
async function fetchTab(sheetId: string, tabName: string): Promise<Record<string, any>[]> {
  if (!sheetId || sheetId.startsWith("REPLACE_WITH")) {
    throw new Error(
      `This shop's Public Sheet ID hasn't been set yet. Update publicSheetId in lib/shops.ts to a real Google Sheet ID.`
    );
  }

  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    tabName
  )}&headers=1`;

  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) {
    throw new Error(
      `Could not read the "${tabName}" tab (status ${res.status}). Make sure the Sheet is shared as "Anyone with the link can view" and that a tab named exactly "${tabName}" exists.`
    );
  }

  const raw = await res.text();
  const jsonStart = raw.indexOf("{");
  const jsonEnd = raw.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error(
      `Got an unexpected response reading the "${tabName}" tab. This usually means the Sheet ID is wrong or the Sheet isn't shared publicly.`
    );
  }

  const jsonText = raw.substring(jsonStart, jsonEnd + 1);
  const parsed = JSON.parse(jsonText);

  const cols: string[] = parsed.table.cols.map((c: any) => c.label || c.id);
  const rows = parsed.table.rows.map((r: any) => {
    const obj: Record<string, any> = {};
    r.c.forEach((cell: any, i: number) => {
      obj[cols[i]] = cell ? cell.v : null;
    });
    return obj;
  });

  return rows;
}

export async function getMenu(publicSheetId: string): Promise<MenuItem[]> {
  const rows = await fetchTab(publicSheetId, "Menu");
  return rows.map((r) => ({
    ItemID: String(r.ItemID ?? ""),
    Name: String(r.Name ?? ""),
    Description: String(r.Description ?? ""),
    Price: Number(r.Price ?? 0),
    ImageURL: r.ImageURL ? String(r.ImageURL) : undefined,
    Available: String(r.Available ?? "N").toUpperCase(),
    Category: String(r.Category ?? ""),
  }));
}

export async function getReviews(publicSheetId: string): Promise<Review[]> {
  const rows = await fetchTab(publicSheetId, "Reviews");
  return rows.map((r) => ({
    Timestamp: String(r.Timestamp ?? ""),
    Item: String(r.Item ?? ""),
    BuyerName: String(r.BuyerName ?? ""),
    Comment: String(r.Comment ?? ""),
    Rating: Number(r.Rating ?? 0),
  }));
}

export async function getMenuItem(publicSheetId: string, itemId: string): Promise<MenuItem | undefined> {
  const menu = await getMenu(publicSheetId);
  return menu.find((i) => i.ItemID === itemId);
}
