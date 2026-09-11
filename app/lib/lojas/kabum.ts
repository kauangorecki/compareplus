import type { Oferta } from "@/app/lib/ofertas";

export function buscarOfertasKaBuM(produto: string): Oferta[] {
  return [
    {
      loja: "KaBuM",
      preco: 1999.9,
      frete: "R$ 15,00",
      avaliacao: 4.9,
      link: `https://www.kabum.com.br/busca/${encodeURIComponent(produto)}`,
    },
  ];
}