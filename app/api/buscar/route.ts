import { NextResponse } from "next/server";
import { buscarOfertas } from "@/app/lib/ofertas";

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

  const ofertas = await buscarOfertas(produto);

  return NextResponse.json({
    sucesso: true,
    produto,
    ofertas,
  });
}