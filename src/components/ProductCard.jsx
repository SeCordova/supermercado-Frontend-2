import { Link } from 'react-router-dom'
import { dinero } from '../utils/format'

export default function ProductCard({ producto }) {
  return (
    <Link to={`/producto/${producto.id}`} className="grupo tarjeta flex flex-col overflow-hidden no-underline transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-verde-700">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-verde-50 to-slate-100 text-7xl" aria-hidden="true">{producto.imagen}</div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-verde-700">{producto.categoria}</span>
        <h3 className="text-lg font-bold text-slate-900">{producto.nombre}</h3>
        <p className="mt-1 text-sm text-slate-500">{producto.unidad}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-5">
          <span className="text-xl font-extrabold text-slate-900">{dinero(producto.precio)}</span>
          <span className={producto.stock > 0 ? 'etiqueta-ok' : 'etiqueta-agotado'}>{producto.stock > 0 ? `${producto.stock} disponibles` : 'Agotado'}</span>
        </div>
        <span className="mt-4 text-sm font-semibold text-verde-700 group-hover:underline">Ver detalle →</span>
      </div>
    </Link>
  )
}
