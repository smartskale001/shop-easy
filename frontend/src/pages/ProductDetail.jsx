import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProduct } from '../api.js'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchProduct(id)
      .then((data) => {
        setProduct(data)
        setError('')
      })
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="mx-auto max-w-6xl px-6 py-12 text-slate-500">Loading...</div>
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-slate-600">{error || 'Product not found.'}</p>
        <Link to="/" className="mt-4 inline-block font-medium text-indigo-600 hover:underline">
          &larr; Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link to="/" className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:underline">
        &larr; Back to products
      </Link>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="mb-2 w-fit rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
            {product.category}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
          <p className="mt-6 leading-relaxed text-slate-600">{product.description}</p>
          <button className="mt-8 w-fit rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
