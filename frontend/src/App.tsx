import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AuthProvider from './context/Authcontext';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from 'sonner';
import { lazy, Suspense } from 'react';
import CategorySkeleton from './components/skeleton/CategorySkeleton';
import ProductsSkeleton from './components/skeleton/ProductSkeleton';
import AdminLayout from './components/AdminLayout';
const About = lazy(()=> import('./pages/About'))
const Home = lazy(()=> import('./pages/Home'))
const Cart = lazy(()=> import('./pages/Cart'))
const CategoryList = lazy(()=> import('./pages/CategoryList'))
const Product = lazy(()=> import('./pages/Product'))
const MyOrders = lazy(()=> import('./pages/MyOrders'))
const AdminDashboard = lazy(()=> import('./pages/admin/AdminDashboard'))
const AdminUsers = lazy(()=> import('./pages/admin/AdminUsers'))
const AdminOrders = lazy(()=> import('./pages/admin/AdminOrders'))
const AdminCatalog = lazy(()=> import('./pages/admin/AdminCatalog'))

function App() {
  return (
    <>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <AuthProvider>
      <Toaster position="top-center" />
    <BrowserRouter>

    {/* Storefront Routes */}
    <Routes>
      <Route path='/about' element={<><Header/><Suspense fallback={<><CategorySkeleton/><ProductsSkeleton/></>}><About/></Suspense></>}/>
      <Route path='/category/:id' element={<><Header/><Suspense fallback={<><CategorySkeleton/><ProductsSkeleton/></>}><CategoryList/></Suspense></>}/>
      <Route path='/' element={<><Header/><Suspense fallback={<><CategorySkeleton/><ProductsSkeleton/></>}><Home/></Suspense></>}/>
      <Route path='/cart' element={<><Header/><Suspense fallback={<><CategorySkeleton/><ProductsSkeleton/></>}><Cart/></Suspense></>}/>
      <Route path='product/:id' element={<><Header/><Suspense fallback={<><CategorySkeleton/><ProductsSkeleton/></>}><Product/></Suspense></>}/>
      <Route path='/orders' element={<><Header/><Suspense fallback={<div className="h-[60vh] flex items-center justify-center">Loading orders...</div>}><MyOrders/></Suspense></>}/>

      {/* Admin Routes */}
      <Route path='/admin' element={<Suspense fallback={<div className="min-h-screen bg-[#0a0a0f]" />}><AdminLayout /></Suspense>}>
        <Route index element={<Suspense fallback={<div />}><AdminDashboard /></Suspense>} />
        <Route path='catalog' element={<Suspense fallback={<div />}><AdminCatalog /></Suspense>} />
        <Route path='users' element={<Suspense fallback={<div />}><AdminUsers /></Suspense>} />
        <Route path='orders' element={<Suspense fallback={<div />}><AdminOrders /></Suspense>} />
      </Route>
    </Routes>

    </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
    </>
  )
}

export default App
