export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center md:py-32">
        <span className="mb-4 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
          New season, new deals
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
          Welcome to <span className="text-indigo-600">ShopEasy</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Discover quality products at unbeatable prices. Shopping made simple,
          fast, and delightful — all in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            Shop Now
          </button>
          <button className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
            Browse Deals
          </button>
        </div>
      </div>
    </section>
  )
}
