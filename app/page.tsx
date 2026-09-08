import Busca from "./componentes/Busca";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* HEADER */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <div className="text-2xl font-bold">
            Compare<span className="text-lime-400">+</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#" className="transition hover:text-white">
              Ofertas
            </a>

            <a href="#" className="transition hover:text-white">
              Comparar
            </a>

            <a href="#" className="transition hover:text-white">
              Histórico
            </a>

            <a href="#" className="transition hover:text-white">
              IA
            </a>
          </nav>

          <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:border-lime-400 hover:text-lime-400">
            Entrar
          </button>

        </div>
      </header>


      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-24 text-center">

          <div className="mb-6 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm text-lime-300">
            🚀 Seu novo jeito de comprar melhor
          </div>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
            Encontre o melhor
            <span className="block text-lime-400">
              preço da internet.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Compare produtos, preços, lojas, avaliações e frete em um só lugar.
            O Compare+ ajuda você a decidir onde realmente vale a pena comprar.
          </p>


          {/* BUSCA */}
          <Busca />

          <p className="mt-4 text-sm text-zinc-600">
            Exemplo: RTX 4060, iPhone 15, TV 55", notebook...
          </p>

        </div>
      </section>


      {/* RECURSOS */}
      <section className="border-t border-zinc-900 bg-zinc-950">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="mb-12 text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">
              Por que Compare+?
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Comprar melhor ficou mais fácil.
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {/* CARD 1 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-lime-400/40">

              <div className="mb-5 text-3xl">
                🔎
              </div>

              <h3 className="text-xl font-bold">
                Compare ofertas
              </h3>

              <p className="mt-3 leading-7 text-zinc-400">
                Veja diferentes ofertas e encontre preços mais interessantes
                sem precisar abrir várias lojas.
              </p>

            </div>


            {/* CARD 2 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-lime-400/40">

              <div className="mb-5 text-3xl">
                📦
              </div>

              <h3 className="text-xl font-bold">
                Tudo em um lugar
              </h3>

              <p className="mt-3 leading-7 text-zinc-400">
                Produtos de diferentes lojas organizados em uma única
                experiência de compra.
              </p>

            </div>


            {/* CARD 3 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-lime-400/40">

              <div className="mb-5 text-3xl">
                🤖
              </div>

              <h3 className="text-xl font-bold">
                IA para ajudar você
              </h3>

              <p className="mt-3 leading-7 text-zinc-400">
                Nossa IA poderá analisar preço, avaliações, frete e histórico
                para ajudar você a escolher a compra que mais vale a pena.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* COMO FUNCIONA */}
      <section className="border-t border-zinc-900 bg-zinc-950">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="mb-12 text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">
              Como funciona
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Você pesquisa. O Compare+ compara.
            </h2>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-400 text-2xl font-bold text-black">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Pesquise
              </h3>

              <p className="mt-3 text-zinc-400">
                Digite o produto que você está procurando.
              </p>

            </div>


            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-400 text-2xl font-bold text-black">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Compare
              </h3>

              <p className="mt-3 text-zinc-400">
                O Compare+ reúne ofertas de diferentes lojas.
              </p>

            </div>


            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-400 text-2xl font-bold text-black">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Compre melhor
              </h3>

              <p className="mt-3 text-zinc-400">
                Escolha a oferta que realmente vale a pena.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="border-t border-zinc-900">

        <div className="mx-auto max-w-4xl px-6 py-24 text-center">

          <h2 className="text-4xl font-bold sm:text-5xl">
            Pare de procurar em várias lojas.
          </h2>

          <p className="mt-5 text-lg text-zinc-400">
            Pesquise uma vez e deixe o Compare+ fazer a comparação.
          </p>

          <a
            href="#"
            className="mt-8 inline-block rounded-xl bg-lime-400 px-8 py-4 font-bold text-black transition hover:bg-lime-300"
          >
            Começar a comparar
          </a>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-zinc-500 sm:flex-row">

          <p>
            © 2026 Compare<span className="text-lime-400">+</span>
          </p>

          <p>
            Compare preços. Compre melhor.
          </p>

        </div>

      </footer>

    </main>
  );
}