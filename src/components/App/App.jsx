import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from '../Navigation/Navigation';
import './App.css';
import ProductFeatures from '../ProductFeatures/ProductFeatures';

const ProductReviews = lazy(() => import('../ProductReviews/ProductReviews'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const ProductPage = lazy(() => import('../../pages/ProductPage/ProductPage'));
const CatalogPage = lazy(() => import('../../pages/CatalogPage/CatalogPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:productId" element={<ProductPage />}>
            <Route path="" element={<ProductFeatures />} />
            <Route path="reviews" element={<ProductReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
