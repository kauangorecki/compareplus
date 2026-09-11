import Filtros from "./filtros";
import { buscarOfertas } from "@/app/lib/ofertas";

export default async function Resultados({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const produto = params?.q || "";

  const ofertas = produto ? await buscarOfertas(produto) : [];

  const melhorOferta =
    ofertas.length > 0
      ? ofertas.reduce((menor, atual) =>
          atual.preco < menor.preco ? atual : menor
        )
      : null;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="/" className="text-2xl font-bold">
            Compare<span className="text-lime-400">+</span>
          </a>

          <a
            href="/"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm transition hover:border-lime-400 hover:text-lime-400"
          >
            ← Nova busca
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">
          Resultados para
        </p>

        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          {produto || "Produto"}
        </h1>

        <p className="mt-4 text-zinc-400">
          Compare preços e escolha a oferta que mais vale a pena.
        </p>

        {melhorOferta && (
          <div className="mt-10 rounded-2xl border border-lime-400/30 bg-lime-400/5 p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-lime-400">
                  🏆 MELHOR OFERTA
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {melhorOferta.loja}
                </h2>

                <p className="mt-1 text-zinc-400">
                  Menor preço encontrado.
                </p>
              </div>

              <div className="text-left md:text-right">
                <p className="text-3xl font-bold text-lime-400">
                  R$ {melhorOferta.preco.toFixed(2).replace(".", ",")}
                </p>

                <p className="text-sm text-zinc-400">
                  {melhorOferta.frete}
                </p>
              </div>
            </div>
          </div>
        )}

        <Filtros ofertas={ofertas} />

        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🤖</div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">
                Compare+ IA
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Quer ajuda para escolher?
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-zinc-400">
                Em breve, nossa IA poderá analisar preço, frete, avaliação,
                histórico e características do produto para indicar qual
                oferta realmente vale a pena.
              </p>

              <button className="mt-5 rounded-xl border border-lime-400 px-5 py-3 font-semibold text-lime-400 transition hover:bg-lime-400 hover:text-black">
                Analisar com IA
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-500">
          © 2026 Compare<span className="text-lime-400">+</span>
          {" "}— Compare preços. Compre melhor.
        </div>
      </footer>
    </main>
  );
}