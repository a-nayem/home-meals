import { ApiResponse, OrderRequestPayload, PaymentPayload, SellerSignupPayload } from "./types";

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";

/**
 * Sends the payload with Content-Type text/plain on purpose.
 * Apps Script Web Apps don't handle browser CORS preflight requests
 * cleanly, and application/json triggers a preflight. text/plain is
 * treated as a "simple request" so the browser skips the preflight
 * entirely. The body is still valid JSON text - Apps Script parses
 * it as JSON on the server side regardless of the declared type.
 */
async function postToBackend(payload: OrderRequestPayload | PaymentPayload | SellerSignupPayload): Promise<ApiResponse> {
  if (!APPS_SCRIPT_URL) {
    return { success: false, error: "Backend URL is not configured yet (NEXT_PUBLIC_APPS_SCRIPT_URL)." };
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as ApiResponse;
    return data;
  } catch (err) {
    return { success: false, error: "Could not reach the server. Please try again." };
  }
}

export async function submitOrderRequest(payload: Omit<OrderRequestPayload, "type">): Promise<ApiResponse> {
  return postToBackend({ type: "orderRequest", ...payload });
}

export async function submitPayment(payload: Omit<PaymentPayload, "type">): Promise<ApiResponse> {
  return postToBackend({ type: "payment", ...payload });
}

export async function submitSellerSignup(payload: Omit<SellerSignupPayload, "type">): Promise<ApiResponse> {
  return postToBackend({ type: "sellerSignup", ...payload });
}
