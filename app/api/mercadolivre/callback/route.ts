import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();

  const savedState = cookieStore.get("ml_oauth_state")?.value;
  const codeVerifier = cookieStore.get("ml_code_verifier")?.value;

  if (!code || !state) {
    return Response.json(
      { erro: "Código de autorização não recebido." },
      { status: 400 }
    );
  }

  if (!savedState || state !== savedState) {
    return Response.json(
      { erro: "State inválido." },
      { status: 400 }
    );
  }

  if (!codeVerifier) {
    return Response.json(
      { erro: "Code verifier não encontrado." },
      { status: 400 }
    );
  }

  const clientId = process.env.MERCADOLIVRE_CLIENT_ID;
  const clientSecret = process.env.MERCADOLIVRE_CLIENT_SECRET;
  const redirectUri = process.env.MERCADOLIVRE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return Response.json(
      { erro: "Configuração do Mercado Livre incompleta." },
      { status: 500 }
    );
  }

  const body = new URLSearchParams();

  body.set("grant_type", "authorization_code");
  body.set("client_id", clientId);
  body.set("client_secret", clientSecret);
  body.set("code", code);
  body.set("redirect_uri", redirectUri);
  body.set("code_verifier", codeVerifier);

  const resposta = await fetch(
    "https://api.mercadolibre.com/oauth/token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  const dados = await resposta.json();

  if (!resposta.ok) {
    return Response.json(
      {
        erro: "Falha ao obter token do Mercado Livre.",
        detalhes: dados,
      },
      { status: resposta.status }
    );
  }

  const accessToken = dados.access_token;
  const refreshToken = dados.refresh_token;

  if (!accessToken || !refreshToken) {
    return Response.json(
      { erro: "Mercado Livre não retornou os tokens esperados." },
      { status: 500 }
    );
  }

  cookieStore.set("ml_access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: dados.expires_in || 21600,
  });

  cookieStore.set("ml_refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });

  cookieStore.delete("ml_oauth_state");
  cookieStore.delete("ml_code_verifier");

  return Response.json({
    mensagem: "Mercado Livre conectado com sucesso!",
    user_id: dados.user_id,
    expires_in: dados.expires_in,
    scope: dados.scope,
  });
}