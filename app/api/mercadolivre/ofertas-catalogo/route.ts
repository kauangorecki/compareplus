import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const productId = url.searchParams.get("product_id");

  if (!productId?.trim()) {
    return Response.json(
      {
        erro: "Informe o product_id. Exemplo: ?product_id=MLB28250856",
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

  const apiUrl = `https://api.mercadolibre.com/products/${productId}/items`;

  const resposta = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const dados = await resposta.json();

  return Response.json(
    {
      status_api: resposta.status,
      product_id: productId,
      resposta: dados,
    },
    {
      status: resposta.ok ? 200 : resposta.status,
    }
  );
}