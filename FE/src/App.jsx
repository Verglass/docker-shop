import { Routes, Route } from 'react-router-dom'
import Layout from './features/layout/Layout'
import ProductsList from './features/products/ProductsList'
import ProductForm from './features/products/ProductForm'
import ProductDetails from './features/productDetails/ProductDetails'
import CommentsList from './features/comments/CommentsList'
import ScoresList from './features/scores/ScoresList'
import DeliveryOptionsList from './features/deliveryOptions/DeliveryOptionsList'
import Cart from './features/cart/Cart'
import CartForm from './features/cart/CartForm'
import CartConfirm from './features/cart/CartConfirm'
import Stats from './features/layout/Stats'
import PrivateRoute from './helpers/ProtectedRoute'
import AdminRoute from './helpers/AdminRoute'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from './app/keycloak'
import { useEffect, useRef } from 'react'


function App() {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      keycloak.init({
        pkceMethod: 'S256',
      })
      isInitialMount.current = false
    }
  }, [])

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <div className="text-zinc-800 mt-14 flex justify-center">
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<ProductsList />} />
            <Route path=':page' element={<ProductsList />} />
            <Route path=':productId/details' element={<ProductDetails />} />
            <Route path=':productId/edit' element={<AdminRoute><ProductForm edit={true} /></AdminRoute>} />
            <Route path=':productId/scores' element={<AdminRoute><ScoresList /></AdminRoute>} />
            <Route path=':productId/comments/:page' element={<PrivateRoute><CommentsList /></PrivateRoute>} />
            <Route path='deliveryOptions' element={<AdminRoute><DeliveryOptionsList /></AdminRoute>} />
            <Route path='add' element={<AdminRoute><ProductForm edit={false} /></AdminRoute>} />
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={<PrivateRoute><CartForm /></PrivateRoute>} />
            <Route path='confirm' element={<PrivateRoute><CartConfirm /></PrivateRoute>} />
            <Route path='stats' element={<AdminRoute><Stats /></AdminRoute>} />
          </Route>
        </Routes>
      </div>
    </ReactKeycloakProvider>
  )
}

export default App
