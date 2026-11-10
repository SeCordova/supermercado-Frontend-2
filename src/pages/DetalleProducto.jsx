import { Link, useParams } from 'react-router-dom'
import { useTienda } from '../store/StoreContext'
import { dinero } from '../utils/format'

export default function DetalleProducto() {
  const { id } = useParams()
  const { productos, carrito, agregarCarrito } = useTienda()
  const producto = productos.find(item => item.id === Number(id))

  if (!producto) return <section className="tarjeta p-8 text-center"><h1 className="text-2xl font-bold">Producto no encontrado</h1><Link to="/" className="boton-primario mt-5 inline-block">Volver al inventario</Link></section>

  const enCarrito = carrito.find(item => item.id === producto.id)?.cantidad || 0

  return (
    <>
      <Link to="/" className="mb-6 inline-block text-sm font-semibold text-verde-700 hover:underline">← Volver al inventario</Link>
      <section className="tarjeta grid overflow-hidden md:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center bg-gradient-to-br from-verde-50 to-slate-100 text-9xl" aria-hidden="true">{producto.imagen}</div>
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-verde-700">{producto.categoria}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">{producto.nombre}</h1>
          <p className="mt-2 text-slate-500">{producto.unidad}</p>
          <p className="mt-5 leading-7 text-slate-600">{producto.descripcion}</p>
          <p className="mt-7 text-3xl font-extrabold text-slate-900">{dinero(producto.precio)}</p>
          <p className="mt-3 text-sm text-slate-600">Disponibles en inventario: <strong>{producto.stock}</strong></p>
          <p className="mt-1 text-sm text-slate-600">Unidades en tu carrito: <strong>{enCarrito}</strong></p>
          <button type="button" className="boton-primario mt-7 w-full sm:w-fit" disabled={producto.stock === 0} onClick={() => agregarCarrito(producto.id)}>{producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock disponible'}</button>
          <p className="mt-3 text-xs text-slate-500">Al agregar una unidad, el stock disponible disminuye automáticamente.</p>
          {enCarrito > 0 && <Link to="/carrito" className="mt-5 text-sm font-semibold text-verde-700 hover:underline">Ver carrito de compras →</Link>}
        </div>
      </section>
    </>
  )
}
