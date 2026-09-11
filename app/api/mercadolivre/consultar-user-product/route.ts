import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userProductId = url.searchParams.get("user_product_id");

  if (!userProductId?.trim()) {
    return Response.json(
      {
        erro:
          "Informe o user_product_id. Exemplo: ?user_product_id=MLBU5125696521",
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

  const apiUrl = new URL(
    `https://api.mercadolibre.com/user-products/${encodeURIComponent(
      userProductId
    )}`
  );

  const resposta = await fetch(apiUrl.toString(), {
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
      resposta: dados,
    },
    { status: resposta.ok ? 200 : resposta.status }
  );
}