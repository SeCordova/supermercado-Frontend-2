import { Link } from 'react-router-dom'
import { useTienda } from '../store/StoreContext'
import { dinero } from '../utils/format'

export default function Carrito() {
  const { productos, carrito, agregarCarrito, disminuirCarrito, quitarCarrito } = useTienda()
  const items = carrito.map(item => ({ ...item, producto: productos.find(p => p.id === item.id) })).filter(item => item.producto)
  const cantidadTotal = items.reduce((total, item) => total + item.cantidad, 0)
  const total = items.reduce((suma, item) => suma + item.cantidad * item.producto.precio, 0)

  return (
    <>
      <div className="mb-8"><span className="text-sm font-semibold uppercase tracking-wider text-verde-700">Tus productos seleccionados</span><h1 className="mt-2 text-3xl font-extrabold">Carrito de compras</h1><p className="mt-2 text-slate-500">Aumenta o disminuye cantidades y revisa cómo cambia el inventario.</p></div>
      {items.length === 0 ? <section className="tarjeta px-6 py-16 text-center"><p className="text-6xl" aria-hidden="true">🛒</p><h2 className="mt-4 text-xl font-bold">Tu carrito está vacío</h2><p className="mt-2 text-slate-500">Selecciona un producto del inventario para comenzar.</p><Link to="/" className="boton-primario mt-6 inline-block">Ir al inventario</Link></section> : <div className="grid items-start gap-6 lg:grid-cols-[1fr_310px]">
        <section className="tarjeta divide-y divide-slate-100 overflow-hidden" aria-label="Artículos del carrito">
          {items.map(({ producto, cantidad }) => <article key={producto.id} className="flex flex-wrap items-center gap-4 p-5 sm:flex-nowrap">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-verde-50 text-5xl" aria-hidden="true">{producto.imagen}</div>
            <div className="min-w-0 flex-1"><Link to={`/producto/${producto.id}`} className="font-bold text-slate-900 hover:text-verde-700">{producto.nombre}</Link><p className="mt-1 text-xs text-slate-500">{producto.categoria}</p><p className="mt-1 text-sm font-semibold">{dinero(producto.precio)} c/u</p><p className="mt-1 text-xs text-slate-500">Stock disponible: {producto.stock}</p></div>
            <div className="flex flex-col items-end gap-2"><div className="flex items-center rounded-xl border border-slate-200"><button type="button" className="control-cantidad" onClick={() => disminuirCarrito(producto.id)} aria-label={`Quitar una unidad de ${producto.nombre}`}>−</button><span className="min-w-10 text-center font-bold" aria-label={`${cantidad} unidades`}>{cantidad}</span><button type="button" className="control-cantidad" disabled={producto.stock === 0} onClick={() => agregarCarrito(producto.id)} aria-label={`Añadir una unidad de ${producto.nombre}`}>+</button></div><strong>{dinero(producto.precio * cantidad)}</strong><button type="button" className="text-xs font-semibold text-red-600 hover:underline" onClick={() => quitarCarrito(producto.id)}>Eliminar</button></div>
          </article>)}
        </section>
        <aside className="tarjeta p-6"><h2 className="text-xl font-bold">Resumen</h2><div className="mt-5 flex justify-between text-sm"><span>Unidades</span><strong>{cantidadTotal}</strong></div><div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg"><span>Total</span><strong className="text-verde-800">{dinero(total)}</strong></div><p className="mt-4 text-xs leading-5 text-slate-500">Las unidades del carrito están descontadas del inventario. Si quitas artículos, vuelven a estar disponibles.</p><Link to="/" className="boton-primario mt-6 block text-center">Seguir revisando productos</Link></aside>
      </div>}
    </>
  )
}
