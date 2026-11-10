import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categorias } from '../data/products'
import { useTienda } from '../store/StoreContext'

const inicial = { nombre: '', categoria: categorias[0], precio: '', stock: '', descripcion: '', unidad: '', imagen: '📦' }

export default function NuevoProducto() {
  const [datos, setDatos] = useState(inicial)
  const [error, setError] = useState('')
  const { productos, agregarProducto } = useTienda()
  const navigate = useNavigate()
  const actualizar = event => setDatos({ ...datos, [event.target.name]: event.target.value })

  function guardar(event) {
    event.preventDefault()
    const nombre = datos.nombre.trim()
    const precio = Number(datos.precio)
    const stock = Number(datos.stock)
    if (!nombre || !datos.unidad.trim() || !datos.descripcion.trim() || !Number.isFinite(precio) || precio <= 0 || !Number.isInteger(stock) || stock < 0 || datos.precio === '' || datos.stock === '') {
      setError('Completa todos los campos con un precio mayor a cero y un stock entero no negativo.')
      return
    }
    if (productos.some(p => p.nombre.toLowerCase() === nombre.toLowerCase())) {
      setError('Ya existe un artículo con ese nombre.')
      return
    }
    agregarProducto({ ...datos, nombre, unidad: datos.unidad.trim(), descripcion: datos.descripcion.trim(), precio, stock })
    navigate('/')
  }

  return (
    <>
      <Link to="/" className="mb-6 inline-block text-sm font-semibold text-verde-700 hover:underline">← Volver al inventario</Link>
      <div className="mx-auto max-w-2xl"><div className="mb-7"><span className="text-sm font-semibold uppercase tracking-wide text-verde-700">Gestión de productos</span><h1 className="mt-2 text-3xl font-extrabold">Agregar artículo</h1><p className="mt-2 text-slate-500">Ingresa los datos para incorporar un nuevo producto al inventario.</p></div>
        <form onSubmit={guardar} className="tarjeta space-y-5 p-6 sm:p-8">
          <label className="block"><span className="etiqueta-campo">Nombre del artículo</span><input className="campo" name="nombre" value={datos.nombre} onChange={actualizar} placeholder="Ej. Aceite vegetal" maxLength="80" required /></label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block"><span className="etiqueta-campo">Categoría</span><select className="campo" name="categoria" value={datos.categoria} onChange={actualizar}>{categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></label>
            <label className="block"><span className="etiqueta-campo">Presentación</span><input className="campo" name="unidad" value={datos.unidad} onChange={actualizar} placeholder="Ej. Botella de 1 litro" maxLength="70" required /></label>
            <label className="block"><span className="etiqueta-campo">Precio (CLP)</span><input className="campo" type="number" name="precio" min="1" step="1" value={datos.precio} onChange={actualizar} placeholder="Ej. 2500" required /></label>
            <label className="block"><span className="etiqueta-campo">Stock inicial</span><input className="campo" type="number" name="stock" min="0" step="1" value={datos.stock} onChange={actualizar} placeholder="Ej. 15" required /></label>
          </div>
          <label className="block"><span className="etiqueta-campo">Descripción</span><textarea className="campo min-h-28" name="descripcion" value={datos.descripcion} onChange={actualizar} placeholder="Describe brevemente el artículo" maxLength="300" required /></label>
          <label className="block"><span className="etiqueta-campo">Ícono del artículo</span><select className="campo" name="imagen" value={datos.imagen} onChange={actualizar}><option value="📦">📦 Producto general</option><option value="🍎">🍎 Fruta</option><option value="🥬">🥬 Verdura</option><option value="🥛">🥛 Lácteo</option><option value="🍞">🍞 Pan</option><option value="🥤">🥤 Bebida</option><option value="🧴">🧴 Limpieza</option><option value="🍚">🍚 Despensa</option></select></label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <div className="flex flex-wrap justify-end gap-3 pt-3"><Link to="/" className="boton-secundario">Cancelar</Link><button type="submit" className="boton-primario">Guardar artículo</button></div>
        </form>
      </div>
    </>
  )
}
