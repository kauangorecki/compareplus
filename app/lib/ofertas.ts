import { buscarOfertasMercadoLivre } from "./lojas/mercadolivre";
import { buscarOfertasAmazon } from "./lojas/amazon";
import { buscarOfertasKaBuM } from "./lojas/kabum";

export type Oferta = {
  loja: string;
  preco: number;
  frete: string;
  avaliacao: number;
  link: string;
};

export async function buscarOfertas(produto: string): Promise<Oferta[]> {
  const ofertasMercadoLivre = await buscarOfertasMercadoLivre(produto);

  return [
    ...ofertasMercadoLivre,
    ...buscarOfertasAmazon(produto),
    ...buscarOfertasKaBuM(produto),
  ];
}