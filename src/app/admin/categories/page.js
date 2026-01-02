'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  HiOutlinePhotograph, 
  HiOutlineUpload, 
  HiOutlineCheck, 
  HiOutlineX,
  HiOutlineRefresh,
  HiOutlineArrowLeft,
  HiOutlinePencil,
  HiOutlineEye,
  HiOutlineShoppingBag,
  HiOutlineChevronRight
} from 'react-icons/hi';
import { getAllCategories, updateCategoryImage, getAllProducts } from '@/lib/productService';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [productCounts, setProductCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingCategory, setUploadingCategory] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  // Kategorileri ve ürünleri yükle
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const [categoriesData, productsData] = await Promise.all([
        getAllCategories(),
        getAllProducts()
      ]);
      
      // Sıralama
      const sorted = categoriesData.sort((a, b) => (a.order || 999) - (b.order || 999));
      setCategories(sorted);
      
      // Kategori başına ürün sayısı
      const counts = {};
      productsData.forEach(product => {
        counts[product.category] = (counts[product.category] || 0) + 1;
      });
      setProductCounts(counts);
    } catch (error) {
      console.error('Error loading categories:', error);
      setErrorMessage('Kategoriler yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  // Dosya seçildiğinde
  const handleFileSelect = (e, category) => {
    const file = e.target.files[0];
    if (file) {
      // Dosya tipi kontrolü
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Lütfen geçerli bir görsel dosyası seçin');
        return;
      }
      
      // Dosya boyutu kontrolü (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Dosya boyutu 5MB\'dan küçük olmalıdır');
        return;
      }

      setSelectedFile(file);
      setUploadingCategory(category);
      
      // Önizleme oluştur
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Resmi yükle ve güncelle
  const handleUpload = async () => {
    if (!selectedFile || !uploadingCategory) return;

    try {
      setIsLoading(true);
      setErrorMessage('');
      
      const newImageUrl = await updateCategoryImage(uploadingCategory.id, selectedFile);
      
      // Listeyi güncelle
      setCategories(prev => prev.map(cat => 
        cat.id === uploadingCategory.id 
          ? { ...cat, image: newImageUrl }
          : cat
      ));
      
      setSuccessMessage(`${uploadingCategory.name} kategorisi resmi başarıyla güncellendi!`);
      
      // Temizle
      setUploadingCategory(null);
      setPreviewImage(null);
      setSelectedFile(null);
      
      // Başarı mesajını 3 saniye sonra kaldır
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Resim yüklenirken hata oluştu: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // İptal et
  const handleCancel = () => {
    setUploadingCategory(null);
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[60px] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                href="/admin" 
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <HiOutlineArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kategori Resimleri</h1>
                <p className="text-sm text-gray-500">Kategori arka plan görsellerini yönetin</p>
              </div>
            </div>
            <button
              onClick={loadCategories}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <HiOutlineRefresh className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">Yenile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[120px] left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <HiOutlineCheck className="w-5 h-5" />
            {successMessage}
          </motion.div>
        )}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[120px] left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <HiOutlineX className="w-5 h-5" />
            {errorMessage}
            <button onClick={() => setErrorMessage('')} className="ml-2">
              <HiOutlineX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading && categories.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Kategoriler yükleniyor...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Kategori Resmi */}
                <div className="relative aspect-video bg-gray-100">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <HiOutlinePhotograph className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Resim yok</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay with icon */}
                  <div className="absolute top-3 left-3">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  
                  {/* View full image button */}
                  {category.image && (
                    <a
                      href={category.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
                    >
                      <HiOutlineEye className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>

                {/* Kategori Bilgileri */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                      {productCounts[category.categoryId] || 0} ürün
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{category.description}</p>
                  
                  {/* Butonlar */}
                  <div className="space-y-2">
                    {/* Ürünleri Gör Butonu */}
                    <Link 
                      href={`/admin/products?category=${category.categoryId}`}
                      className="flex items-center justify-between w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <HiOutlineShoppingBag className="w-5 h-5" />
                        <span className="font-medium">Ürünleri Gör</span>
                      </div>
                      <HiOutlineChevronRight className="w-5 h-5" />
                    </Link>
                    
                    {/* Resmi Değiştir Butonu */}
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, category)}
                        ref={uploadingCategory?.id === category.id ? fileInputRef : null}
                      />
                      <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl cursor-pointer transition-all">
                        <HiOutlinePencil className="w-5 h-5" />
                        <span className="font-medium">Resmi Değiştir</span>
                      </div>
                    </label>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Preview Modal */}
      <AnimatePresence>
        {uploadingCategory && previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  {uploadingCategory.name} - Resim Önizleme
                </h3>
                <p className="text-sm text-gray-500">Yeni resmi onaylamak için &quot;Kaydet&quot; butonuna tıklayın</p>
              </div>

              {/* Preview Images */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Mevcut Resim */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Mevcut Resim</p>
                    <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                      {uploadingCategory.image ? (
                        <Image
                          src={uploadingCategory.image}
                          alt="Mevcut"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <HiOutlinePhotograph className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Yeni Resim */}
                  <div>
                    <p className="text-xs font-medium text-green-600 mb-2 uppercase tracking-wide">Yeni Resim</p>
                    <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden ring-2 ring-green-500">
                      <Image
                        src={previewImage}
                        alt="Yeni"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* File Info */}
                {selectedFile && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Dosya:</span> {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Boyut:</span> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleUpload}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Yükleniyor...</span>
                    </>
                  ) : (
                    <>
                      <HiOutlineUpload className="w-5 h-5" />
                      <span>Kaydet</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

