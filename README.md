# Home Meals - Next.js frontend

## Pages
- `/` - shop directory
- `/shop/[shopId]` - menu + reviews, live from the shop's Public Sheet
- `/shop/[shopId]/order?item=...` - order request (step 1)
- `/shop/[shopId]/confirmed?code=...` - order requested ticket
- `/shop/[shopId]/pay?code=...` - payment submission (step 2)
- `/shop/[shopId]/payment-submitted?code=...` - payment submitted ticket
- `/list-your-kitchen` - seller pitch + signup
- `/how-it-works` - buyer/seller facing explainer
- `/shop/[shopId]/not-found` - broken shop/item link fallback

## Setup
See `backend/README.md` for the full setup: registry sheet, per-shop sheets,
Discord channels, and deploying `backend/Code.gs`.

Quick start once the backend is deployed:

```
cp .env.local.example .env.local   # then fill in NEXT_PUBLIC_APPS_SCRIPT_URL
npm install
npm run dev
```

## Adding a new shop
1. Add its Public/Private Sheets and Discord webhooks to the registry's Shops tab
2. Add one entry to `lib/shops.ts` with its `publicSheetId`

No other code changes needed - one shared Apps Script backend and one Next.js
deployment serve every shop.
