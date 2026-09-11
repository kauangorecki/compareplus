import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("ml_access_token")?.value;

  if (!accessToken) {
    return Response.json(
      { erro: "Mercado Livre não conectado." },
      { status: 401 }
    );
  }

  const itemId = "MLB5212143563";

  const resposta = await fetch(
    `https://api.mercadolibre.com/items/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const dados = await resposta.json();

  return Response.json(
    {
      status_api: resposta.status,
      resposta: dados,
    },
    { status: resposta.ok ? 200 : resposta.status }
  );
}