import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

const Inventario = lazy(() => import('./pages/Inventario'))
const DetalleProducto = lazy(() => import('./pages/DetalleProducto'))
const Carrito = lazy(() => import('./pages/Carrito'))
const NuevoProducto = lazy(() => import('./pages/NuevoProducto'))

export default function App() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500">Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inventario />} />
          <Route path="producto/:id" element={<DetalleProducto />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="nuevo" element={<NuevoProducto />} />
          <Route path="*" element={<section className="tarjeta p-8"><h1 className="text-2xl font-bold">Página no encontrada</h1><a href="#/" className="mt-4 inline-block text-verde-700">Volver al inicio</a></section>} />
        </Route>
      </Routes>
    </Suspense>
  )
}
