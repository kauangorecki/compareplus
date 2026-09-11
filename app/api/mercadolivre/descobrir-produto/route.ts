import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const produto = url.searchParams.get("q");

  if (!produto?.trim()) {
    return Response.json(
      {
        erro: "Informe o produto. Exemplo: ?q=RTX%204060",
      },
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

  // 1. Procurar o produto no catálogo
  const buscaUrl = new URL(
    "https://api.mercadolibre.com/products/search"
  );

  buscaUrl.searchParams.set("status", "active");
  buscaUrl.searchParams.set("site_id", "MLB");
  buscaUrl.searchParams.set("q", produto);
  buscaUrl.searchParams.set("limit", "1");

  const buscaResposta = await fetch(buscaUrl.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const buscaDados = await buscaResposta.json();

  if (!buscaResposta.ok) {
    return Response.json(
      {
        erro: "Erro ao procurar produto no Mercado Livre.",
        detalhes: buscaDados,
      },
      { status: buscaResposta.status }
    );
  }

  const primeiroProduto = buscaDados.results?.[0];

  if (!primeiroProduto?.id) {
    return Response.json(
      {
        sucesso: false,
        erro: "Nenhum produto encontrado.",
      },
      { status: 404 }
    );
  }

  const productId = primeiroProduto.id;

  // 2. Consultar detalhes do produto
  const produtoResposta = await fetch(
    `https://api.mercadolibre.com/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const produtoDados = await produtoResposta.json();

  return Response.json(
    {
      status_busca: buscaResposta.status,
      status_produto: produtoResposta.status,
      produto: primeiroProduto,
      detalhes: produtoDados,
    },
    {
      status: produtoResposta.ok ? 200 : produtoResposta.status,
    }
  );
}