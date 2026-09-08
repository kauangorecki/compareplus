"use client";

import { useState } from "react";

type Oferta = {
  loja: string;
  preco: number;
  frete: string;
  avaliacao: number;
  link: string;
};

type FiltrosProps = {
  ofertas: Oferta[];
};

export default function Filtros({ ofertas }: FiltrosProps) {
  const [filtro, setFiltro] = useState("melhor");

  function ordenarOfertas() {
    const lista = [...ofertas];

    if (filtro === "preco") {
      return lista.sort((a, b) => a.preco - b.preco);
    }

    if (filtro === "avaliacao") {
      return lista.sort((a, b) => b.avaliacao - a.avaliacao);
    }

    if (filtro === "frete") {
      return lista.sort((a, b) => {
        const freteA = a.frete.toLowerCase().includes("grátis") ? 0 : 1;
        const freteB = b.frete.toLowerCase().includes("grátis") ? 0 : 1;

        return freteA - freteB;
      });
    }

    return lista.sort((a, b) => a.preco - b.preco);
  }

  const ofertasOrdenadas = ordenarOfertas();

  return (
    <>
      {/* FILTROS */}
      <div className="mt-10 flex flex-wrap gap-3">

        <button
          onClick={() => setFiltro("melhor")}
          className={`rounded-xl border px-5 py-2 text-sm font-bold ${
            filtro === "melhor"
              ? "border-lime-400 bg-lime-400 text-black"
              : "border-zinc-700 text-zinc-300 hover:border-lime-400"
          }`}
        >
          Melhor oferta
        </button>

        <button
          onClick={() => setFiltro("preco")}
          className={`rounded-xl border px-5 py-2 text-sm ${
            filtro === "preco"
              ? "border-lime-400 bg-lime-400 font-bold text-black"
              : "border-zinc-700 text-zinc-300 hover:border-lime-400"
          }`}
        >
          Menor preço
        </button>

        <button
          onClick={() => setFiltro("avaliacao")}
          className={`rounded-xl border px-5 py-2 text-sm ${
            filtro === "avaliacao"
              ? "border-lime-400 bg-lime-400 font-bold text-black"
              : "border-zinc-700 text-zinc-300 hover:border-lime-400"
          }`}
        >
          Melhor avaliação
        </button>

        <button
          onClick={() => setFiltro("frete")}
          className={`rounded-xl border px-5 py-2 text-sm ${
            filtro === "frete"
              ? "border-lime-400 bg-lime-400 font-bold text-black"
              : "border-zinc-700 text-zinc-300 hover:border-lime-400"
          }`}
        >
          Frete grátis
        </button>
      </div>

      {/* OFERTAS */}
      <div className="mt-8 space-y-4">
        {ofertasOrdenadas.map((oferta) => (
          <div
            key={oferta.loja}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-lime-400/40"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  {oferta.loja}
                </h2>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-400">
                  <span>🚚 {oferta.frete}</span>
                  <span>⭐ {oferta.avaliacao}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-8">
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    R$ {oferta.preco.toFixed(2).replace(".", ",")}
                  </p>
                </div>

                <a
                  href={oferta.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
                >
                  Ver oferta
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}