import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const produto = url.searchParams.get("q");

  if (!produto?.trim()) {
    return Response.json(
      { erro: "Informe o produto. Exemplo: ?q=RTX%204060" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("ml_access_token")?.value;

  if (!accessToken) {
    return Response.json(
      { erro: "Mercado Livre não conectado." },
      { status: 401 }
    );
  }

  const apiUrl = new URL(
    "https://api.mercadolibre.com/sites/MLB/search"
  );

  apiUrl.searchParams.set("q", produto);
  apiUrl.searchParams.set("limit", "10");

  const resposta = await fetch(apiUrl.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    return Response.json(
      {
        erro: "Erro ao buscar produtos no Mercado Livre.",
        detalhes: dados,
      },
      { status: resposta.status }
    );
  }

  return Response.json(dados);
}