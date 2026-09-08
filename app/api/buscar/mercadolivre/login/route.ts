import { redirect } from "next/navigation";

export async function GET() {
  const clientId = process.env.MERCADOLIVRE_CLIENT_ID;

  if (!clientId) {
    return Response.json(
      { erro: "MERCADOLIVRE_CLIENT_ID não configurado." },
      { status: 500 }
    );
  }

  const redirectUri = process.env.MERCADOLIVRE_REDIRECT_URI;

  if (!redirectUri) {
    return Response.json(
      { erro: "MERCADOLIVRE_REDIRECT_URI não configurado." },
      { status: 500 }
    );
  }

  const url = new URL(
    "https://auth.mercadolivre.com.br/authorization"
  );

  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);

  return redirect(url.toString());
}