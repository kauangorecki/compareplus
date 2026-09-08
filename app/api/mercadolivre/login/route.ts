import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

function base64Url(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function GET() {
  const clientId = process.env.MERCADOLIVRE_CLIENT_ID;
  const redirectUri = process.env.MERCADOLIVRE_REDIRECT_URI;

  if (!clientId) {
    return Response.json(
      { erro: "MERCADOLIVRE_CLIENT_ID não configurado." },
      { status: 500 }
    );
  }

  if (!redirectUri) {
    return Response.json(
      { erro: "MERCADOLIVRE_REDIRECT_URI não configurado." },
      { status: 500 }
    );
  }

  const codeVerifier = base64Url(crypto.randomBytes(32));

  const codeChallenge = base64Url(
    crypto.createHash("sha256").update(codeVerifier).digest()
  );

  const state = base64Url(crypto.randomBytes(32));

  const cookieStore = await cookies();

  cookieStore.set("ml_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  cookieStore.set("ml_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  const url = new URL(
    "https://auth.mercadolivre.com.br/authorization"
  );

  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");

  return redirect(url.toString());
}