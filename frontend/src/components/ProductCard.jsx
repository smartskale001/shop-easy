import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="aspect-[3/2] overflow-hidden bg-slate-100">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 w-fit rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
          {product.category}
        </span>
        <h3 className="font-semibold text-slate-900">{product.name}</h3>
        <p className="mt-auto pt-3 text-lg font-bold text-slate-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}
