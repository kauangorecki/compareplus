import type { Oferta } from "@/app/lib/ofertas";
import { cookies } from "next/headers";

export async function buscarOfertasMercadoLivre(
  produto: string
): Promise<Oferta[]> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("ml_access_token")?.value;

    if (!accessToken) {
      return [];
    }

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

    if (!buscaResposta.ok) {
      return [];
    }

    const buscaDados = await buscaResposta.json();
    const productId = buscaDados.results?.[0]?.id;

    if (!productId) {
      return [];
    }

    const ofertasResposta = await fetch(
      `https://api.mercadolibre.com/products/${productId}/items`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!ofertasResposta.ok) {
      return [];
    }

    const ofertasDados = await ofertasResposta.json();

    return (ofertasDados.results ?? []).map((item: any) => ({
      loja: "Mercado Livre",
      preco: item.price,
      frete: item.shipping?.free_shipping ? "Grátis" : "Pago",
      avaliacao: 0,
      link: `https://www.mercadolivre.com.br/p/${item.item_id}`,
    }));
  } catch (erro) {
    console.error("Erro ao buscar ofertas do Mercado Livre:", erro);
    return [];
  }
}