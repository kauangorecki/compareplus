import type { Oferta } from "@/app/lib/ofertas";

export function buscarOfertasAmazon(produto: string): Oferta[] {
  return [
    {
      loja: "Amazon",
      preco: 1949,
      frete: "Grátis",
      avaliacao: 4.7,
      link: `https://www.amazon.com.br/s?k=${encodeURIComponent(produto)}`,
    },
  ];
}