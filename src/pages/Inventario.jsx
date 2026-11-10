import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categorias } from '../data/products'
import { useTienda } from '../store/StoreContext'

export default function Inventario() {
  const { productos, carrito } = useTienda()
  const [categoria, setCategoria] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const productosFiltrados = productos.filter(producto =>
    (categoria === 'Todas' || producto.categoria === categoria) &&
    producto.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
  )
  const unidadesDisponibles = productos.reduce((total, p) => total + p.stock, 0)
  const unidadesCarrito = carrito.reduce((total, item) => total + item.cantidad, 0)

  return (
    <>
      <section className="mb-8 overflow-hidden rounded-3xl bg-verde-800 px-6 py-9 text-white sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div><span className="text-sm font-semibold uppercase tracking-widest text-verde-100">Panel principal</span><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Inventario del supermercado</h1><p className="mt-3 max-w-xl text-verde-100">Revisa los productos disponibles, filtra por categoría y agrega artículos al carrito.</p></div>
          <Link to="/nuevo" className="boton-blanco">+ Nuevo artículo</Link>
        </div>
      </section>
      <section className="mb-8 grid gap-4 sm:grid-cols-3" aria-label="Resumen de inventario">
        <div className="tarjeta p-5"><p className="text-sm text-slate-500">Productos registrados</p><p className="mt-1 text-3xl font-extrabold">{productos.length}</p></div>
        <div className="tarjeta p-5"><p className="text-sm text-slate-500">Unidades disponibles</p><p className="mt-1 text-3xl font-extrabold">{unidadesDisponibles}</p></div>
        <div className="tarjeta p-5"><p className="text-sm text-slate-500">Unidades en carrito</p><p className="mt-1 text-3xl font-extrabold">{unidadesCarrito}</p></div>
      </section>
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold text-slate-900">Lista de artículos</h2><p className="mt-1 text-sm text-slate-500">Mostrando {productosFiltrados.length} de {productos.length} productos</p></div></div>
        <div className="tarjeta mb-6 grid gap-4 p-5 sm:grid-cols-2">
          <label className="block"><span className="etiqueta-campo">Filtrar por categoría</span><select className="campo" value={categoria} onChange={event => setCategoria(event.target.value)}><option value="Todas">Todas las categorías</option>{categorias.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
          <label className="block"><span className="etiqueta-campo">Buscar artículo</span><input className="campo" value={busqueda} onChange={event => setBusqueda(event.target.value)} placeholder="Ej. leche, arroz..." /></label>
        </div>
        {productosFiltrados.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{productosFiltrados.map(producto => <ProductCard key={producto.id} producto={producto} />)}</div> : <div className="tarjeta py-14 text-center"><p className="text-4xl">🔎</p><h3 className="mt-3 font-bold">No se encontraron artículos</h3><p className="mt-2 text-sm text-slate-500">Prueba con otra categoría o búsqueda.</p><button className="boton-secundario mt-4" onClick={() => { setCategoria('Todas'); setBusqueda('') }}>Limpiar filtros</button></div>}
      </section>
    </>
  )
}
