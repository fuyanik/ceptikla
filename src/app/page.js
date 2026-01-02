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
  HiOutlineStar
} from 'react-icons/hi';
import { GiFullMotorcycleHelmet } from 'react-icons/gi';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useProducts } from '@/context/ProductsContext';

// Motorsiklet temalı hero slides
const heroSlides = [
  {
    title: 'Kasklar',
    subtitle: 'Güvenliğiniz için en kaliteli kask modelleri',
    discount: '🔥 %45 İndirim',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    link: '/kategori/kasklar',
    gradient: 'from-slate-900/90 via-slate-800/80 to-transparent'
  },
  {
    title: 'Giyim Ürünleri',
    subtitle: 'Koruyucu mont, pantolon ve kombinler',
    discount: '🏍️ %50 İndirim',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200',
    link: '/kategori/giyim-urunleri',
    gradient: 'from-slate-900/90 via-slate-800/80 to-transparent'
  },
  {
    title: 'Oto Lastikler',
    subtitle: 'Yolda maksimum tutuş, güvenli sürüş',
    discount: '⚡ %40 İndirim',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200',
    link: '/kategori/oto-lastikler',
    gradient: 'from-slate-900/90 via-slate-800/80 to-transparent'
  }
];

const features = [
  { icon: HiOutlineTruck, title: 'Ücretsiz Kargo', description: '2.000 TL üzeri' },
  { icon: HiOutlineShieldCheck, title: 'Güvenli Ödeme', description: '256-bit SSL' },
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-[106px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-[6vh]">
      {/* Hero Slider - Motorsiklet Teması with Dark Overlay */}
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
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs font-bold text-white mb-3 shadow-lg shadow-red-500/50 animate-pulse">
                        {slide.discount}
                      </span>
                      
                      {/* Motorsiklet başlığı */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-400 text-sm font-semibold tracking-wider uppercase">
                          ⚡ Oto Market 360 ⚡
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
        <section className="py-8 bg-gradient-to-b from-pink-50/50 to-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <HiOutlineSparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Ayın Süper İndirimleri</h2>
                  <p className="text-sm text-gray-500">Sizin için özel seçimler</p>
                </div>
              </div>
              <Link 
                href="/kategoriler" 
                className="hidden sm:flex items-center gap-1 px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
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
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-pink-50/50 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Tümünü Gör Butonu */}
            <div className="flex justify-start mt-5 px-4">
              <Link
                href="/koleksiyon/super-indirimler"
                className="group relative inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-semibold rounded-full shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Tümünü Gör</span>
                <HiOutlineChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* Featured Products - Kışın En Güçlü Kaskları */}
      {featuredProducts.length > 0 && (
        <section className="py-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                  <GiFullMotorcycleHelmet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Kışın En Güçlü Kaskları</h2>
                  <p className="text-sm text-gray-500">En çok tercih edilen modeller</p>
                </div>
              </div>
              <Link 
                href="/firsatlar" 
                className="hidden sm:flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium hover:bg-red-100 transition-colors"
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
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Tümünü Gör Butonu */}
            <div className="flex justify-start mt-5 px-4">
              <Link
                href="/koleksiyon/en-guclukasklar"
                className="group relative inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold rounded-full shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/35 transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Tümünü Gör</span>
                <HiOutlineChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Banner 1 - Motorsiklet Görseli */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[160px] md:h-[200px] rounded-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200"
              alt="Motorsiklet Aksesuar"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/70 to-transparent flex items-center">
              <div className="px-6 md:px-10">
                <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Yeni Sezon</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">Güvenlik Ekipmanları</h3>
                <p className="text-gray-300 text-sm mt-2 max-w-md">Premium kalite, maksimum koruma</p>
                <Link href="/kategori/giyim-urunleri" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-gray-100 transition-colors">
                  İncele <HiOutlineChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Shopping Products -> Yolculukta Güvenlik */}
      {schoolShoppingProducts.length > 0 && (
        <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <HiOutlineShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Yolculukta Güvenlik</h2>
                  <p className="text-sm text-gray-500">Koruyucu ekipmanlar</p>
                </div>
              </div>
              <Link 
                href="/kategoriler" 
                className="hidden sm:flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
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
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </div>

            {/* Tümünü Gör Butonu */}
            <div className="flex justify-start mt-5 px-4">
              <Link
                href="/koleksiyon/guvenlik-ekipmanlari"
                className="group relative inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Tümünü Gör</span>
                <HiOutlineChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Banner 2 - Lastik Görseli */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[160px] md:h-[200px] rounded-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1200"
              alt="Oto Lastik"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-900/85 via-slate-800/70 to-transparent flex items-center justify-end">
              <div className="px-6 md:px-10 text-right">
                <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Özel Fırsat</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">Oto Lastikler</h3>
                <p className="text-gray-300 text-sm mt-2 max-w-md">Tüm mevsim, tüm yollar</p>
                <Link href="/kategori/oto-lastikler" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-gray-100 transition-colors">
                  İncele <HiOutlineChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Favorited - Motosiklet Kombinleri */}
      {mostFavoritedProducts.length > 0 && (
        <section className="py-8 bg-gradient-to-b from-white to-pink-50/50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <HiOutlineHeart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Motosiklet Kombinleri</h2>
                  <p className="text-sm text-gray-500">En çok beğenilen ürünler</p>
                </div>
              </div>
              <Link 
                href="/favoriler" 
                className="hidden sm:flex items-center gap-1 px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors"
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
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-pink-50/50 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Tümünü Gör Butonu */}
            <div className="flex justify-start mt-5 px-4">
              <Link
                href="/koleksiyon/motosiklet-kombinleri"
                className="group relative inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold rounded-full shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35 transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Tümünü Gör</span>
                <HiOutlineChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Big Banner - Motorsiklet */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[280px] md:h-[350px] rounded-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200"
              alt="Motorsiklet"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div className="p-6 md:p-10 w-full">
                <span className="text-red-400 text-sm font-bold uppercase tracking-wider">🏁 Yılbaşı Kampanyası</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">Tüm Ürünlerde %45'e Varan İndirim</h3>
                <p className="text-gray-300 mt-2 max-w-lg">Kask, mont, eldiven ve daha fazlası için kaçırılmayacak fırsatlar</p>
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

     
      {/* Categories - Modern Design with Images */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Kategoriler</h2>
            <Link href="/kategoriler" className="text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-1">
              Tümü <HiOutlineChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Category Cards with Images */}
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
            <Link href="/kategori/eldiven" className="group">
              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/otomotivsepeti-8048d.firebasestorage.app/o/categories%2F1766717761447_sst7bb_motor-eldiven.jpg?alt=media&token=b26da729-ec7b-4f05-9cd0-f24307881eeb"
                  alt="Eldivenler"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-red-500 rounded-full text-xs font-semibold text-white mb-2">
                      Yeni Koleksiyon
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1">Korumalı Eldivenler</h3>
                    <p className="text-white/80 text-sm">Maksimum tutuş, tam koruma</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/kategori/ses-goruntu" className="group">
              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/otomotivsepeti-8048d.firebasestorage.app/o/categories%2F1766717658526_ukyp0d_sayfa-urun-19-600x400.jpg?alt=media&token=8cb60e38-8c1f-4359-82b3-bb9d6ccdfd48"
                  alt="Ses Sistemleri"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-500 rounded-full text-xs font-semibold text-white mb-2">
                      Teknoloji
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1">Ses & Görüntü</h3>
                    <p className="text-white/80 text-sm">Araç içi multimedya sistemleri</p>
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
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-red-500" />
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
      <section className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Neden Bizi Tercih Etmelisiniz?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">50K+</div>
              <div className="text-gray-400">Mutlu Müşteri</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">1000+</div>
              <div className="text-gray-400">Ürün Çeşidi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">99%</div>
              <div className="text-gray-400">Memnuniyet</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">24/7</div>
              <div className="text-gray-400">Destek</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
