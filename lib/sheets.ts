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
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    tabName
  )}&headers=1`;

  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet tab "${tabName}" (status ${res.status})`);
  }

  const raw = await res.text();
  // gviz wraps the JSON in google.visualization.Query.setResponse(...);
  // strip that wrapper before parsing.
  const jsonText = raw.substring(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
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
