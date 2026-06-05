import { useEffect, useState } from 'react'
import Hero from '../components/Hero.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { fetchProducts, fetchCategories } from '../api.js'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load category list once.
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

  // Reload products whenever the search or category changes (debounced).
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      fetchProducts({ search, category })
        .then((data) => {
          setProducts(data)
          setError('')
        })
        .catch(() => setError('Could not load products. Is the backend running?'))
        .finally(() => setLoading(false))
    }, 250)
    return () => clearTimeout(timer)
  }, [search, category])

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Our Products</h2>
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter categories={categories} active={category} onChange={setCategory} />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {loading ? (
          <p className="text-slate-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-slate-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
