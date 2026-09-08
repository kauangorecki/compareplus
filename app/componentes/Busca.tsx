"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Busca() {
  const [produto, setProduto] = useState("");
  const router = useRouter();

  function buscarProduto() {
    if (!produto.trim()) return;

    router.push(`/resultados?q=${encodeURIComponent(produto)}`);
  }

  return (
    <div className="mt-10 flex w-full max-w-3xl flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl sm:flex-row">
      <div className="flex flex-1 items-center">
        <span className="px-4 text-xl">🔎</span>

        <input
          type="text"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              buscarProduto();
            }
          }}
          placeholder="Digite o produto que você procura..."
          className="w-full bg-transparent py-4 text-white outline-none placeholder:text-zinc-500"
        />
      </div>

      <button
        onClick={buscarProduto}
        className="rounded-xl bg-lime-400 px-8 py-4 font-bold text-black transition hover:bg-lime-300"
      >
        Buscar
      </button>
    </div>
  );
}