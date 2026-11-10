import { NavLink, Outlet } from 'react-router-dom'
import { useTienda } from '../store/StoreContext'

export default function Layout() {
  const { carrito } = useTienda()
  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0)
  const enlace = ({ isActive }) => `nav-link ${isActive ? 'nav-link-activo' : ''}`

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="contenedor flex flex-wrap items-center justify-between gap-4 py-4">
          <NavLink to="/" className="flex items-center gap-3 text-slate-900 no-underline">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-verde-700 text-2xl text-white" aria-hidden="true">🛒</span>
            <span><strong className="block text-lg leading-5">Supermercado</strong><span className="text-xs text-slate-500">Gestión de inventario</span></span>
          </NavLink>
          <nav className="flex flex-wrap items-center gap-1" aria-label="Navegación principal">
            <NavLink end to="/" className={enlace}>Inventario</NavLink>
            <NavLink to="/nuevo" className={enlace}>Agregar artículo</NavLink>
            <NavLink to="/carrito" className={enlace}>Carrito <span className="ml-1 rounded-full bg-verde-100 px-2 py-0.5 text-xs text-verde-800">{cantidad}</span></NavLink>
          </nav>
        </div>
      </header>
      <main className="contenedor flex-1 py-8 sm:py-10"><Outlet /></main>
      <footer className="border-t border-slate-200 bg-white py-5 text-center text-sm text-slate-500">Sistema de inventario · Desarrollo Frontend II</footer>
    </div>
  )
}
