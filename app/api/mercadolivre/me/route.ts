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

  const clientId = process.env.MERCADOLIVRE_CLIENT_ID;

  if (!clientId) {
    return Response.json(
      { erro: "MERCADOLIVRE_CLIENT_ID não configurado." },
      { status: 500 }
    );
  }

  const resposta = await fetch(
    `https://api.mercadolibre.com/applications/${clientId}/grants`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const dados = await resposta.json();

  if (!resposta.ok) {
    return Response.json(
      {
        erro: "Erro ao consultar os grants do aplicativo.",
        detalhes: dados,
      },
      { status: resposta.status }
    );
  }

  return Response.json(dados);
}