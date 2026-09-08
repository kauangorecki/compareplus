import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const produto = searchParams.get("q");

  if (!produto) {
    return NextResponse.json(
      {
        sucesso: false,
        mensagem: "Informe um produto para pesquisar.",
      },
      { status: 400 }
    );
  }

  const busca = produto.toLowerCase();

  let ofertas;

  if (busca.includes("rtx 4060")) {
    ofertas = [
      {
        loja: "Mercado Livre",
        preco: 1899.9,
        frete: "Grátis",
        avaliacao: 4.8,
        link: `https://lista.mercadolivre.com.br/${encodeURIComponent(produto)}`,
      },
      {
        loja: "Amazon",
        preco: 1949.0,
        frete: "Grátis",
        avaliacao: 4.7,
        link: `https://www.amazon.com.br/s?k=${encodeURIComponent(produto)}`,
      },
      {
        loja: "KaBuM",
        preco: 1999.9,
        frete: "R$ 15,00",
        avaliacao: 4.9,
        link: `https://www.kabum.com.br/busca/${encodeURIComponent(produto)}`,
      },
    ];
  } else if (busca.includes("iphone 15")) {
    ofertas = [
      {
        loja: "Mercado Livre",
        preco: 3299.9,
        frete: "Grátis",
        avaliacao: 4.8,
        link: `https://lista.mercadolivre.com.br/${encodeURIComponent(produto)}`,
      },
      {
        loja: "Amazon",
        preco: 3399.0,
        frete: "Grátis",
        avaliacao: 4.7,
        link: `https://www.amazon.com.br/s?k=${encodeURIComponent(produto)}`,
      },
      {
        loja: "KaBuM",
        preco: 3499.9,
        frete: "R$ 20,00",
        avaliacao: 4.6,
        link: `https://www.kabum.com.br/busca/${encodeURIComponent(produto)}`,
      },
    ];
  } else {
    ofertas = [
      {
        loja: "Mercado Livre",
        preco: 499.9,
        frete: "Grátis",
        avaliacao: 4.8,
        link: `https://lista.mercadolivre.com.br/${encodeURIComponent(produto)}`,
      },
      {
        loja: "Amazon",
        preco: 529.0,
        frete: "Grátis",
        avaliacao: 4.7,
        link: `https://www.amazon.com.br/s?k=${encodeURIComponent(produto)}`,
      },
      {
        loja: "KaBuM",
        preco: 549.9,
        frete: "R$ 15,00",
        avaliacao: 4.6,
        link: `https://www.kabum.com.br/busca/${encodeURIComponent(produto)}`,
      },
    ];
  }

  return NextResponse.json({
    sucesso: true,
    produto: produto,
    ofertas: ofertas,
  });
}