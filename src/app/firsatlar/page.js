'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useProducts } from '@/context/ProductsContext';

export default function DealsPage() {
  const { isLoading, getDiscountedProducts } = useProducts();
  const discountedProducts = getDiscountedProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white pt-[106px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/30 to-white pt-[106px]">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-5xl mb-4 block">🏠</span>
          <h1 className="text-3xl font-bold text-white mb-2">Fırsat Ürünleri</h1>
          <p className="text-white/90">Kaçırılmayacak indirimler sizleri bekliyor!</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Discount Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 -mx-4 px-4">
          {[
            { label: 'Tümü', min: 0 },
            { label: '%10+', min: 10 },
            { label: '%15+', min: 15 },
            { label: '%20+', min: 20 },
          ].map((filter, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                index === 0 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-sky-50 hover:border-sky-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {discountedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {discountedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Şu an indirimli ürün bulunmamaktadır.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
