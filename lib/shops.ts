import { ShopConfig } from "./types";

/**
 * Every shop your platform serves, listed here.
 *
 * publicSheetId is the Google Sheet ID of that shop's PUBLIC sheet
 * (Menu + Reviews tabs, shared as "anyone with link can view").
 * This is safe to keep in the codebase since it's read-only public data.
 *
 * The shop's PRIVATE sheet (Orders) is never referenced here.
 * The Apps Script backend looks that up itself from its own private
 * registry, so the Next.js app never needs to know it.
 *
 * To onboard a new shop: add one object below. Nothing else in the
 * frontend needs to change.
 */
export const SHOPS: ShopConfig[] = [
  {
    id: "ak",
    name: "Amma's Kitchen",
    tagline: "Home Kitchen · Bangladeshi · North Hall delivery",
    publicSheetId: "REPLACE_WITH_AMMAS_KITCHEN_PUBLIC_SHEET_ID",
  },
];

export function getShopById(shopId: string): ShopConfig | undefined {
  return SHOPS.find((s) => s.id === shopId);
}
