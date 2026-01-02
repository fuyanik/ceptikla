'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAllProducts, 
  getAllCategories, 
  getProductsByCategory as getProductsByCategoryFromDB,
  getFeaturedProducts as getFeaturedProductsFromDB,
  getDiscountedProducts as getDiscountedProductsFromDB,
  searchProducts as searchProductsFromDB,
  getProductById as getProductByIdFromDB,
  getCategoryById as getCategoryByIdFromDB
} from '@/lib/productService';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // İlk yüklemede tüm verileri çek
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getAllCategories()
      ]);
      setProducts(productsData);
      // Kategorileri order alanına göre sırala (küçükten büyüğe)
      const sortedCategories = categoriesData.sort((a, b) => {
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        return orderA - orderB;
      });
      setCategories(sortedCategories);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Verileri yenile
  const refreshData = () => {
    loadData();
  };

  // ID ile ürün getir (önce cache'den, yoksa Firebase'den)
  const getProductById = async (id) => {
    // Önce mevcut listeden bak
    const cached = products.find(p => p.id === id);
    if (cached) return cached;
    
    // Yoksa Firebase'den çek
    return await getProductByIdFromDB(id);
  };

  // Kategoriye göre ürünleri getir
  const getProductsByCategory = (categoryId) => {
    return products.filter(p => p.category === categoryId);
  };

  // ========================================
  // ANA SAYFA BÖLÜMLERİ - Otomatik Filtreleme
  // (products collection'una dokunmadan)
  // ========================================

  // Ayın Süper İndirimleri - En yüksek indirimli ürünler
  const getSelectedForYouProducts = () => {
    // Önce homepageSections'dan kontrol et
    const fromSections = products.filter(p => 
      p.homepageSections && p.homepageSections.includes('selected')
    );
    if (fromSections.length > 0) {
      return fromSections.sort((a, b) => {
        const orderA = a.homepageSectionOrder?.['selected'] ?? 999;
        const orderB = b.homepageSectionOrder?.['selected'] ?? 999;
        return orderA - orderB;
      });
    }
    
    // Yoksa indirimli ürünlerden al
    return products
      .filter(p => p.discount && p.discount > 0)
      .sort((a, b) => (b.discount || 0) - (a.discount || 0))
      .slice(0, 15);
  };

  // Beyaz Eşya Fırsatları - Featured ürünler veya rating'e göre
  const getFeaturedProducts = () => {
    // Önce featured olanları kontrol et
    const featured = products.filter(p => 
      p.featured === true || 
      (p.homepageSections && p.homepageSections.includes('featured'))
    );
    if (featured.length > 0) {
      return featured.sort((a, b) => {
        const orderA = a.homepageSectionOrder?.['featured'] ?? 999;
        const orderB = b.homepageSectionOrder?.['featured'] ?? 999;
        return orderA - orderB;
      });
    }
    
    // Yoksa rating'e göre en iyi ürünleri al
    return products
      .filter(p => p.rating && p.rating > 0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 15);
  };

  // Mutfak Ürünleri / Bu Ayın Önerileri - Son eklenen ürünler
  const getSchoolShoppingProducts = () => {
    // Önce homepageSections'dan kontrol et
    const school = products.filter(p => 
      p.homepageSections && p.homepageSections.includes('school')
    );
    if (school.length > 0) {
      return school.sort((a, b) => {
        const orderA = a.homepageSectionOrder?.['school'] ?? 999;
        const orderB = b.homepageSectionOrder?.['school'] ?? 999;
        return orderA - orderB;
      });
    }
    
    // Yoksa son eklenen ürünleri al
    return products
      .sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt) || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt) || new Date(0);
        return dateB - dateA;
      })
      .slice(0, 15);
  };

  // Mobilya Koleksiyonu / Favoriler - En çok değerlendirilen
  const getMostFavoritedProducts = () => {
    // Önce homepageSections'dan kontrol et
    const favorites = products.filter(p => 
      p.homepageSections && p.homepageSections.includes('favorites')
    );
    if (favorites.length > 0) {
      return favorites.sort((a, b) => {
        const orderA = a.homepageSectionOrder?.['favorites'] ?? 999;
        const orderB = b.homepageSectionOrder?.['favorites'] ?? 999;
        return orderA - orderB;
      });
    }
    
    // Yoksa en çok değerlendirilen ürünleri al
    return products
      .filter(p => p.reviews && p.reviews > 0)
      .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
      .slice(0, 15);
  };

  // Belirli bir bölümdeki ürünleri getir
  const getProductsBySection = (sectionId) => {
    return products.filter(p => 
      p.homepageSections && p.homepageSections.includes(sectionId)
    );
  };

  // İndirimli ürünleri getir
  const getDiscountedProducts = (minDiscount = 0) => {
    return products
      .filter(p => p.discount && p.discount >= minDiscount)
      .sort((a, b) => (b.discount || 0) - (a.discount || 0));
  };

  // Ürün ara
  const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name?.toLowerCase().includes(lowercaseQuery) ||
      product.description?.toLowerCase().includes(lowercaseQuery) ||
      product.category?.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Kategori getir
  const getCategoryById = (categoryId) => {
    return categories.find(c => c.categoryId === categoryId);
  };

  const value = {
    products,
    categories,
    isLoading,
    error,
    refreshData,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getSchoolShoppingProducts,
    getMostFavoritedProducts,
    getSelectedForYouProducts,
    getProductsBySection,
    getDiscountedProducts,
    searchProducts,
    getCategoryById
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
