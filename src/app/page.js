'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { 
  HiOutlineChevronRight, 
  HiOutlineTruck, 
  HiOutlineShieldCheck, 
  HiOutlineCreditCard, 
  HiOutlineSupport, 
  HiOutlineHeart, 
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineHome
} from 'react-icons/hi';
import { TbWashMachine, TbFridge, TbSofa } from 'react-icons/tb';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useProducts } from '@/context/ProductsContext';

// Beyaz Eşya & Mobilya temalı hero slides
const heroSlides = [
  {
    title: 'Buzdolapları',
    subtitle: 'No-Frost teknoloji, A+++ enerji sınıfı',
    discount: '❄️ %35 İndirim',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=1200&q=80',
    link: '/kategori/buzdolaplari',
    gradient: 'from-slate-900/90 via-slate-800/80 to-transparent'
  },
  {
    title: 'Çamaşır Makineleri',
    subtitle: 'Akıllı yıkama, sessiz motor teknolojisi',
    discount: '🌀 %40 İndirim',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=1200&q=80',
    link: '/kategori/camasir-makineleri',
    gradient: 'from-slate-900/90 via-slate-800/80 to-transparent'
  },
  {
    title: 'Mobilya Koleksiyonu',
    subtitle: 'Modern tasarım, üstün konfor',
    discount: '🛋️ %45 İndirim',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    link: '/kategori/mobilya',
    gradient: 'from-slate-900/90 via-slate-800/80 to-transparent'
  }
];

const features = [
  { icon: HiOutlineTruck, title: 'Ücretsiz Kargo', description: '5.000 TL üzeri' },
  { icon: HiOutlineShieldCheck, title: '2 Yıl Garanti', description: 'Tüm ürünlerde' },
  { icon: HiOutlineCreditCard, title: 'Taksit İmkanı', description: '12 aya varan' },
  { icon: HiOutlineSupport, title: '7/24 Destek', description: 'Her zaman yanınızda' },
];

export default function HomePage() {
  const { 
    products, 
    categories, 
    isLoading, 
    getFeaturedProducts, 
    getSchoolShoppingProducts,
    getMostFavoritedProducts,
    getSelectedForYouProducts,
    getDiscountedProducts 
  } = useProducts();
  
  const featuredProducts = getFeaturedProducts();
  const schoolShoppingProducts = getSchoolShoppingProducts();
  const mostFavoritedProducts = getMostFavoritedProducts();
  const selectedForYouProducts = getSelectedForYouProducts();
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
    <div className="bg-gradient-to-b from-sky-50/30 to-white min-h-screen pt-[6vh]">
      {/* Hero Slider - Beyaz Eşya Teması */}
      <section className="relative overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full aspect-[16/10] md:aspect-[21/9]"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Dark gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="max-w-7xl mx-auto px-4 w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="max-w-lg"
                    >
                      {/* İndirim etiketi */}
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full text-xs font-bold text-white mb-3 shadow-lg shadow-sky-500/50 animate-pulse">
                        {slide.discount}
                      </span>
                      
                      {/* Mağaza başlığı */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sky-300 text-sm font-semibold tracking-wider uppercase">
                          🏠 Trend Evim Mağazası 🏠
                        </span>
                      </div>
                      
                      <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <p className="text-lg text-white/90 mb-6 drop-shadow">
                        {slide.subtitle}
                      </p>
                      <Link
                        href={slide.link}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                      >
                        Keşfet
                        <HiOutlineChevronRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

       {/* Selected For You - Haftanın Öne Çıkan Ürünleri */}
       {selectedForYouProducts.length > 0 && (
        <section className="py-8 bg-gradient-to-b from-sky-50/50 to-white">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
                  <HiOutlineSparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Ayın Süper İndirimleri</h2>
                  <p className="text-sm text-gray-500">Sizin için özel seçimler</p>
                </div>
              </div>
              <Link 
                href="/kategoriler" 
                className="hidden sm:flex items-center gap-1 px-4 py-2 bg-sky-50 text-sky-600 rounded-full text-sm font-medium hover:bg-sky-100 transition-colors"
              >
                Tümünü Gör <HiOutlineChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Swiper Carousel */}
            <div className="relative group">
              <Swiper
                modules={[FreeMode]}
                spaceBetween={16}
                slidesPerView={2.2}
                freeMode={true}
                grabCursor={true}
                className="!px-4"
                breakpoints={{
                  480: { slidesPerView: 2.5, spaceBetween: 16 },
                  640: { slidesPerView: 3.2, spaceBetween: 16 },
                  768: { slidesPerView: 3.5, spaceBetween: 20 },
                  1024: { slidesPerView: 4.5, spaceBetween: 20 },
                  1280: { slidesPerView: 5.2, spaceBetween: 24 },
                }}
              >
                {selectedForYouProducts.map((product, index) => (
                  <SwiperSlide key={product.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Gradient Fade Effects */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-sky-50/50 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </div>

            {/* Tümünü Gör Butonu */}
            <div className="flex justify-start mt-5 px-4">
              <Link
                href="/koleksiyon/super-indirimler"
                className="group relative inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-sky-500 to-cyan-600 text-white text-sm font-semibold rounded-full shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Tümünü Gör</span>
                <HiOutlineChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* Featured Products - Beyaz Eşya Fırsatları */}
      {featuredProducts.length > 0 && (
        <section className="py-8 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <TbFridge className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Beyaz Eşya Fırsatları</h2>
                  <p className="text-sm text-gray-500">En çok tercih edilen modeller</p>
                </div>
              </div>
              <Link 
                href="/firsatlar" 
                className="hidden sm:flex items-center gap-1 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                Tümünü Gör <HiOutlineChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Swiper Carousel */}
            <div className="relative group">
              <Swiper
                modules={[FreeMode]}
                spaceBetween={16}
                slidesPerView={2.2}
                freeMode={true}
                grabCursor={true}
                className="!px-4"
                breakpoints={{
                  480: { slidesPerView: 2.5, spaceBetween: 16 },
                  640: { slidesPerView: 3.2, spaceBetween: 16 },
                  768: { slidesPerView: 3.5, spaceBetween: 20 },
                  1024: { slidesPerView: 4.5, spaceBetween: 20 },
                  1280: { slidesPerView: 5.2, spaceBetween: 24 },
                }}
              >
                {featuredProducts.map((product, index) => (
                  <SwiperSlide key={product.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Gradient Fade Effects */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Tümünü Gör Butonu */}
            <div className="flex justify-start mt-5 px-4">
              <Link
                href="/koleksiyon/beyaz-esya-firsatlari"
                className="group relative inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-full shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/35 transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Tümünü Gör</span>
                <HiOutlineChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Banner 1 - Çamaşır Makinesi Görseli */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[160px] md:h-[200px] rounded-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=1200&q=80"
              alt="Çamaşır Makineleri"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/70 to-transparent flex items-center">
              <div className="px-6 md:px-10">
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider">Yeni Sezon</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">Çamaşır Makineleri</h3>
                <p className="text-gray-300 text-sm mt-2 max-w-md">Akıllı yıkama, enerji tasarrufu</p>
                <Link href="/kategori/camasir-makineleri" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-gray-100 transition-colors">
                  İncele <HiOutlineChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Shopping Products -> Mutfak Ürünleri */}
      {schoolShoppingProducts.length > 0 && (
        <section className="py-8 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <span className="text-white text-xl">🍳</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Mutfak Ürünleri</h2>
                  <p className="text-sm text-gray-500">Ankastre ve küçük ev aletleri</p>
                </div>
              </div>
              <Link 
                href="/kategoriler" 
                className="hidden sm:flex items-center gap-1 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors"
              >
                Tümünü Gör <HiOutlineChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Swiper Carousel */}
            <div className="relative group">
              <Swiper
                modules={[FreeMode]}
                spaceBetween={16}
                slidesPerView={2.2}
                freeMode={true}
                grabCursor={true}
                className="!px-4"
                breakpoints={{
                  480: { slidesPerView: 2.5, spaceBetween: 16 },
                  640: { slidesPerView: 3.2, spaceBetween: 16 },
                  768: { slidesPerView: 3.5, spaceBetween: 20 },
                  1024: { slidesPerView: 4.5, spaceBetween: 20 },
                  1280: { slidesPerView: 5.2, spaceBetween: 24 },
                }}
              >
                {schoolShoppingProducts.map((product, index) => (
                  <SwiperSlide key={product.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Gradient Fade Effects */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </div>

            {/* Tümünü Gör Butonu */}
            <div className="flex justify-start mt-5 px-4">
              <Link
                href="/koleksiyon/mutfak-urunleri"
                className="group relative inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold rounded-full shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Tümünü Gör</span>
                <HiOutlineChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Banner 2 - Buzdolabı Görseli */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[160px] md:h-[200px] rounded-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=1200&q=80"
              alt="Buzdolapları"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-900/85 via-slate-800/70 to-transparent flex items-center justify-end">
              <div className="px-6 md:px-10 text-right">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Özel Fırsat</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">Buzdolapları</h3>
                <p className="text-gray-300 text-sm mt-2 max-w-md">No-Frost, A+++ enerji sınıfı</p>
                <Link href="/kategori/buzdolaplari" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-gray-100 transition-colors">
                  İncele <HiOutlineChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Favorited - Mobilya Koleksiyonu */}
      {mostFavoritedProducts.length > 0 && (
        <section className="py-8 bg-gradient-to-b from-white to-violet-50/50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <TbSofa className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Mobilya Koleksiyonu</h2>
                  <p className="text-sm text-gray-500">En çok beğenilen ürünler</p>
                </div>
              </div>
              <Link 
                href="/favoriler" 
                className="hidden sm:flex items-center gap-1 px-4 py-2 bg-violet-50 text-violet-600 rounded-full text-sm font-medium hover:bg-violet-100 transition-colors"
              >
                Tümünü Gör <HiOutlineChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Swiper Carousel */}
            <div className="relative group">
              <Swiper
                modules={[FreeMode]}
                spaceBetween={16}
                slidesPerView={2.2}
                freeMode={true}
                grabCursor={true}
                className="!px-4"
                breakpoints={{
                  480: { slidesPerView: 2.5, spaceBetween: 16 },
                  640: { slidesPerView: 3.2, spaceBetween: 16 },
                  768: { slidesPerView: 3.5, spaceBetween: 20 },
                  1024: { slidesPerView: 4.5, spaceBetween: 20 },
                  1280: { slidesPerView: 5.2, spaceBetween: 24 },
                }}
              >
                {mostFavoritedProducts.map((product, index) => (
                  <SwiperSlide key={product.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Gradient Fade Effects */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-violet-50/50 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Tümünü Gör Butonu */}
            <div className="flex justify-start mt-5 px-4">
              <Link
                href="/koleksiyon/mobilya-koleksiyonu"
                className="group relative inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold rounded-full shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-violet-500/35 transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Tümünü Gör</span>
                <HiOutlineChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Big Banner - Ev & Yaşam */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[280px] md:h-[350px] rounded-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"
              alt="Ankastre Mutfak"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div className="p-6 md:p-10 w-full">
                <span className="text-sky-400 text-sm font-bold uppercase tracking-wider">🏠 Yılbaşı Kampanyası</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">Tüm Ürünlerde %45'e Varan İndirim</h3>
                <p className="text-gray-300 mt-2 max-w-lg">Buzdolabı, çamaşır makinesi, mobilya ve daha fazlası için kaçırılmayacak fırsatlar</p>
                <div className="flex gap-3 mt-4">
                  <Link href="/firsatlar" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors">
                    Fırsatları Gör
                  </Link>
                  <Link href="/kategoriler" className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-bold rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm">
                    Kategoriler
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      {/* Categories - Grid Style */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Kategoriler</h2>
            <Link href="/kategoriler" className="text-sm font-medium text-sky-500 hover:text-sky-600 flex items-center gap-1">
              Tümü <HiOutlineChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Category Cards with Images - Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.slice(0, 8).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/kategori/${category.categoryId}`}
                  className="group block"
                >
                  <div className="relative h-28 md:h-36 rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white font-semibold text-sm md:text-base">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/kategori/kahve-makineleri" className="group">
              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80"
                  alt="Kahve Makineleri"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-amber-500 rounded-full text-xs font-semibold text-white mb-2">
                      Yeni Koleksiyon
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1">Kahve Makineleri</h3>
                    <p className="text-white/80 text-sm">Espresso, filtre ve otomatik</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/kategori/yatak-odasi" className="group">
              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
                  alt="Yatak Odası"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-violet-500 rounded-full text-xs font-semibold text-white mb-2">
                      Konfor
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1">Yatak Odası</h3>
                    <p className="text-white/80 text-sm">Yatak, baza ve başlık takımları</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{feature.title}</p>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-slate-800 via-slate-900 to-sky-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Neden Bizi Tercih Etmelisiniz?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold text-sky-400 mb-2">50K+</div>
              <div className="text-gray-400">Mutlu Müşteri</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-400 mb-2">1000+</div>
              <div className="text-gray-400">Ürün Çeşidi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-400 mb-2">99%</div>
              <div className="text-gray-400">Memnuniyet</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-400 mb-2">24/7</div>
              <div className="text-gray-400">Destek</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
