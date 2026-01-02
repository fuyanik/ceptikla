/**
 * GÜVENLİ SCRIPT - SADECE reviews FIELD'INI GÜNCELLER
 * 
 * Bu script:
 * - HİÇBİR ürünü SİLMEZ
 * - HİÇBİR field'ı DEĞİŞTİRMEZ (reviews hariç)
 * - Sadece mevcut ürünlerin reviews değerini 300-1400 arası random yapar
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDRwrJIH59pSMucFIFkeDWGd2f5uoBc3zc",
  authDomain: "otomotivsepeti-8048d.firebaseapp.com",
  projectId: "otomotivsepeti-8048d",
  storageBucket: "otomotivsepeti-8048d.firebasestorage.app",
  messagingSenderId: "455300473454",
  appId: "1:455300473454:web:95649300aa59a71f7ffc7f",
  measurementId: "G-VKF0V9CK8V"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 300-1400 arası random sayı üret
function getRandomReviews() {
  return Math.floor(Math.random() * (1400 - 300 + 1)) + 300;
}

async function updateProductReviews() {
  console.log('🔒 GÜVENLİ GÜNCELLEME BAŞLIYOR...');
  console.log('⚠️  Bu script SADECE reviews field\'ını günceller, başka hiçbir şeye dokunmaz.\n');
  
  try {
    // 1. Mevcut ürünleri getir
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    const totalProducts = snapshot.size;
    console.log(`📦 Toplam ${totalProducts} ürün bulundu.\n`);
    
    if (totalProducts === 0) {
      console.log('❌ Hiç ürün bulunamadı!');
      return;
    }
    
    // 2. Her ürünün SADECE reviews field'ını güncelle
    let updated = 0;
    let errors = 0;
    
    for (const docSnap of snapshot.docs) {
      const productId = docSnap.id;
      const productData = docSnap.data();
      const productName = productData.name || 'İsimsiz Ürün';
      const oldReviews = productData.reviews || 0;
      const newReviews = getRandomReviews();
      
      try {
        // SADECE reviews field'ını güncelle - updateDoc diğer field'lara dokunmaz
        const productDocRef = doc(db, 'products', productId);
        await updateDoc(productDocRef, {
          reviews: newReviews
        });
        
        updated++;
        
        // Her 50 üründe bir ilerleme göster
        if (updated % 50 === 0) {
          console.log(`✅ ${updated}/${totalProducts} ürün güncellendi...`);
        }
        
      } catch (err) {
        errors++;
        console.error(`❌ Hata (${productName}):`, err.message);
      }
    }
    
    console.log('\n========================================');
    console.log('📊 SONUÇ:');
    console.log(`✅ Başarıyla güncellenen: ${updated} ürün`);
    console.log(`❌ Hata olan: ${errors} ürün`);
    console.log(`📦 Toplam ürün sayısı değişmedi: ${totalProducts}`);
    console.log('========================================\n');
    
    console.log('🎉 İşlem tamamlandı! Hiçbir ürün silinmedi, sadece reviews değerleri güncellendi.');
    
  } catch (error) {
    console.error('❌ Kritik hata:', error);
  }
  
  process.exit(0);
}

// Scripti çalıştır
updateProductReviews();

