import { createContext, useContext, useEffect, useReducer } from 'react'
import { productosIniciales } from '../data/products'

const StoreContext = createContext(null)
const CLAVE = 'supermercado-inventario-v1'

function estadoInicial() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE))
    if (guardado && Array.isArray(guardado.productos) && Array.isArray(guardado.carrito)) {
      return guardado
    }
  } catch {
    return { productos: productosIniciales, carrito: [] }
  }
  return { productos: productosIniciales, carrito: [] }
}

export function tiendaReducer(estado, accion) {
  switch (accion.type) {
    case 'AGREGAR_PRODUCTO': {
      const producto = accion.producto
      if (!producto.nombre.trim() || !Number.isFinite(producto.precio) || producto.precio <= 0 || !Number.isInteger(producto.stock) || producto.stock < 0) return estado
      const id = Math.max(0, ...estado.productos.map(p => p.id)) + 1
      return { ...estado, productos: [...estado.productos, { ...producto, id }] }
    }
    case 'AGREGAR_CARRITO': {
      const producto = estado.productos.find(p => p.id === accion.id)
      if (!producto || producto.stock < 1) return estado
      const existe = estado.carrito.some(item => item.id === accion.id)
      return {
        productos: estado.productos.map(p => p.id === accion.id ? { ...p, stock: p.stock - 1 } : p),
        carrito: existe
          ? estado.carrito.map(item => item.id === accion.id ? { ...item, cantidad: item.cantidad + 1 } : item)
          : [...estado.carrito, { id: accion.id, cantidad: 1 }]
      }
    }
    case 'DISMINUIR_CARRITO': {
      const item = estado.carrito.find(item => item.id === accion.id)
      if (!item) return estado
      return {
        productos: estado.productos.map(p => p.id === accion.id ? { ...p, stock: p.stock + 1 } : p),
        carrito: item.cantidad === 1
          ? estado.carrito.filter(item => item.id !== accion.id)
          : estado.carrito.map(item => item.id === accion.id ? { ...item, cantidad: item.cantidad - 1 } : item)
      }
    }
    case 'QUITAR_CARRITO': {
      const item = estado.carrito.find(item => item.id === accion.id)
      if (!item) return estado
      return {
        productos: estado.productos.map(p => p.id === accion.id ? { ...p, stock: p.stock + item.cantidad } : p),
        carrito: estado.carrito.filter(item => item.id !== accion.id)
      }
    }
    case 'REINICIAR':
      return { productos: productosIniciales, carrito: [] }
    default:
      return estado
  }
}

export function StoreProvider({ children }) {
  const [estado, dispatch] = useReducer(tiendaReducer, undefined, estadoInicial)

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(estado))
  }, [estado])

  const agregarProducto = (producto) => dispatch({ type: 'AGREGAR_PRODUCTO', producto })
  const agregarCarrito = (id) => dispatch({ type: 'AGREGAR_CARRITO', id })
  const disminuirCarrito = (id) => dispatch({ type: 'DISMINUIR_CARRITO', id })
  const quitarCarrito = (id) => dispatch({ type: 'QUITAR_CARRITO', id })
  const reiniciar = () => dispatch({ type: 'REINICIAR' })

  return (
    <StoreContext.Provider value={{ ...estado, agregarProducto, agregarCarrito, disminuirCarrito, quitarCarrito, reiniciar }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useTienda() {
  const contexto = useContext(StoreContext)
  if (!contexto) throw new Error('Falta StoreProvider')
  return contexto
}
