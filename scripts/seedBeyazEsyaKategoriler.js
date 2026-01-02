// Beyaz Eşya ve Mobilya kategorileri ekleyen script
// ÖNEMLİ: Bu script SADECE categories collection'una yazar
// products collection'una KESİNLİKLE dokunmaz!
// Çalıştırmak için: node scripts/seedBeyazEsyaKategoriler.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where, deleteDoc, doc } = require('firebase/firestore');

// Firebase config - ceptikla projesi
const firebaseConfig = {
  apiKey: "AIzaSyARAXRHmPEfvI4UVUfYlanQpV4MnM0FtTg",
  authDomain: "ceptikla-1a5a9.firebaseapp.com",
  projectId: "ceptikla-1a5a9",
  storageBucket: "ceptikla-1a5a9.firebasestorage.app",
  messagingSenderId: "53650631586",
  appId: "1:53650631586:web:32d7e36ac80cbe2ca520fb",
  measurementId: "G-Y3B0VVP56S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Yeni Beyaz Eşya ve Mobilya Kategorileri
const beyazEsyaKategoriler = [
  {
    categoryId: 'ankastre-setler',
    name: 'Ankastre Setler',
    icon: '🍳',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    description: 'Ocak, fırın ve davlumbaz ankastre setleri',
    order: 1
  },
  {
    categoryId: 'bulasik-makineleri',
    name: 'Bulaşık Makineleri',
    icon: '🍽️',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    description: 'A+++ enerji sınıfı bulaşık makineleri',
    order: 2
  },
  {
    categoryId: 'buzdolaplari',
    name: 'Buzdolapları',
    icon: '🧊',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80',
    description: 'No-Frost ve çift kapılı buzdolapları',
    order: 3
  },
  {
    categoryId: 'camasir-makineleri',
    name: 'Çamaşır Makineleri',
    icon: '👕',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80',
    description: 'Yüksek devir ve enerji tasarruflu çamaşır makineleri',
    order: 4
  },
  {
    categoryId: 'derin-dondurucular',
    name: 'Derin Dondurucular',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80',
    description: 'Sandık ve dolap tipi derin dondurucular',
    order: 5
  },
  {
    categoryId: 'kurutma-makineleri',
    name: 'Kurutma Makineleri',
    icon: '💨',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80',
    description: 'Isı pompalı ve kondensasyonlu kurutma makineleri',
    order: 6
  },
  {
    categoryId: 'kurutmali-camasir-makineleri',
    name: 'Kurutmalı Çamaşır Makineleri',
    icon: '🌀',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80',
    description: 'Hem yıkayan hem kuruttan akıllı makineler',
    order: 7
  },
  {
    categoryId: 'su-sebilleri',
    name: 'Su Sebilleri',
    icon: '💧',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80',
    description: 'Sıcak-soğuk su sebilleri ve filtreleri',
    order: 8
  },
  {
    categoryId: 'sobalar-isiticilar',
    name: 'Sobalar & Isıtıcılar',
    icon: '🔥',
    image: 'https://images.unsplash.com/photo-1544963873-c5ca9a54ec13?w=800&q=80',
    description: 'Elektrikli sobalar, kat kaloriferleri ve ısıtıcılar',
    order: 9
  },
  {
    categoryId: 'kahve-makineleri',
    name: 'Kahve Makineleri',
    icon: '☕',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80',
    description: 'Espresso, filtre ve otomatik kahve makineleri',
    order: 10
  },
  {
    categoryId: 'mobilya',
    name: 'Mobilya',
    icon: '🛋️',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    description: 'Koltuk takımları, TV üniteleri ve sehpalar',
    order: 11
  },
  {
    categoryId: 'yatak-odasi',
    name: 'Yatak Odası',
    icon: '🛏️',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    description: 'Yatak, baza, başlık ve yatak odası takımları',
    order: 12
  }
];

async function checkCategoryExists(categoryId) {
  const q = query(collection(db, 'categories'), where('categoryId', '==', categoryId));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

async function seedCategories() {
  console.log('🏠 Beyaz Eşya ve Mobilya Kategorileri Ekleniyor...\n');
  console.log('⚠️  DİKKAT: Bu script SADECE categories collection\'una yazar.');
  console.log('⚠️  products collection\'una KESİNLİKLE dokunmaz!\n');

  try {
    let eklenen = 0;
    let atlanan = 0;

    for (const cat of beyazEsyaKategoriler) {
      const exists = await checkCategoryExists(cat.categoryId);
      
      if (exists) {
        console.log(`⚠️ ${cat.name} (${cat.categoryId}) kategorisi zaten mevcut, atlanıyor.`);
        atlanan++;
      } else {
        const categoryRef = await addDoc(collection(db, 'categories'), {
          ...cat,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        console.log(`✅ ${cat.icon} ${cat.name} kategorisi eklendi (ID: ${categoryRef.id})`);
        eklenen++;
      }
    }

    console.log('\n🎉 İşlem tamamlandı!');
    console.log(`📊 Özet: ${eklenen} kategori eklendi, ${atlanan} kategori atlandı (zaten mevcut)`);
    console.log('\n📋 Eklenen Kategoriler:');
    beyazEsyaKategoriler.forEach((cat, i) => {
      console.log(`   ${i + 1}. ${cat.icon} ${cat.name} (${cat.categoryId})`);
    });
    
  } catch (error) {
    console.error('❌ Hata:', error);
  }
  
  process.exit(0);
}

seedCategories();

