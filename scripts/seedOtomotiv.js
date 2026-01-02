// Otomotiv Sepeti - Kategori ve Ürün Seed Script
// Bu scripti çalıştırmak için: node scripts/seedOtomotiv.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDRwrJIH59pSMucFIFkeDWGd2f5uoBc3zc",
  authDomain: "otomotivsepeti-8048d.firebaseapp.com",
  projectId: "otomotivsepeti-8048d",
  storageBucket: "otomotivsepeti-8048d.firebasestorage.app",
  messagingSenderId: "455300473454",
  appId: "1:455300473454:web:95649300aa59a71f7ffc7f",
  measurementId: "G-VKF0V9CK8V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Yeni Kategoriler
const categories = [
  {
    categoryId: 'kasklar',
    name: 'Kasklar',
    icon: '🪖',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Motosiklet ve motorsporları için güvenli kask modelleri',
    order: 1
  },
  {
    categoryId: 'giyim-urunleri',
    name: 'Giyim Ürünleri',
    icon: '🧥',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400',
    description: 'Koruyucu mont, pantolon ve motosiklet kombinleri',
    order: 2
  },
  {
    categoryId: 'motosiklet-aksesuarlari',
    name: 'Motosiklet Aksesuarları',
    icon: '🏍️',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400',
    description: 'Motosikletiniz için tüm aksesuar çeşitleri',
    order: 3
  },
  {
    categoryId: 'ses-goruntu',
    name: 'Oto Ses ve Görüntü Sistemleri',
    icon: '🔊',
    image: 'https://images.unsplash.com/photo-1558618047-f4b511b673bc?w=400',
    description: 'Araç içi multimedya ve ses sistemleri',
    order: 4
  },
  {
    categoryId: 'oto-lastikler',
    name: 'Oto Lastikler',
    icon: '🛞',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',
    description: 'Dört mevsim ve performans lastikleri',
    order: 5
  },
  {
    categoryId: 'eldiven',
    name: 'Korumalı Eldivenler',
    icon: '🧤',
    image: 'https://images.unsplash.com/photo-1617606002806-94e279c22567?w=400',
    description: 'Motosiklet ve motorsporları için koruyucu eldivenler',
    order: 6
  }
];

// Örnek Ürünler
const products = [
  // Kasklar
  {
    name: 'AGV K6 S Full Face Kask - Mat Siyah',
    description: 'AGV K6 S serisi, hafif karbon fiber yapısı ve üstün havalandırma sistemiyle uzun yolculuklarda maksimum konfor sağlar. ECE 22.06 sertifikalı.',
    price: 8999,
    originalPrice: 11999,
    category: 'kasklar',
    stock: 25,
    featured: true,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
    specs: { 'Malzeme': 'Karbon Fiber', 'Ağırlık': '1.255g', 'Sertifika': 'ECE 22.06', 'Renk': 'Mat Siyah' },
    rating: 4.8,
    reviews: 124,
    homepageSections: ['featured', 'school'],
    homepageSectionOrder: { 'featured': 0, 'school': 0 }
  },
  {
    name: 'Shoei X-SPR Pro Racing Kask',
    description: 'Profesyonel yarış kasklarının zirvesi. Aerodinamik tasarım, anti-fog vizör ve premium iç astar.',
    price: 15999,
    originalPrice: 19999,
    category: 'kasklar',
    stock: 10,
    featured: true,
    images: ['https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600'],
    specs: { 'Malzeme': 'AIM+ Shell', 'Ağırlık': '1.340g', 'Sertifika': 'SNELL M2020', 'Tip': 'Full Face' },
    rating: 4.9,
    reviews: 89,
    homepageSections: ['featured'],
    homepageSectionOrder: { 'featured': 1 }
  },
  {
    name: 'HJC RPHA 71 Yarı Açık Kask',
    description: 'Şehir içi kullanım için ideal, geniş görüş açısı ve entegre güneş vizörü.',
    price: 5499,
    originalPrice: 6999,
    category: 'kasklar',
    stock: 30,
    featured: false,
    images: ['https://images.unsplash.com/photo-1558981033-0f0309284409?w=600'],
    specs: { 'Malzeme': 'Polikarbonat', 'Ağırlık': '1.450g', 'Sertifika': 'ECE 22.06', 'Güneşlik': 'Entegre' },
    rating: 4.5,
    reviews: 67,
    homepageSections: ['school'],
    homepageSectionOrder: { 'school': 1 }
  },
  {
    name: 'LS2 Storm II Kask - Neon Sarı',
    description: 'Görünürlüğü artıran neon sarı renk, HPTT kabuk teknolojisi.',
    price: 3299,
    originalPrice: 4299,
    category: 'kasklar',
    stock: 40,
    featured: false,
    images: ['https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=600'],
    specs: { 'Malzeme': 'HPTT', 'Ağırlık': '1.350g', 'Sertifika': 'ECE 22.06', 'Renk': 'Neon Sarı' },
    rating: 4.3,
    reviews: 156,
    homepageSections: ['favorites'],
    homepageSectionOrder: { 'favorites': 0 }
  },

  // Giyim Ürünleri
  {
    name: 'Dainese Super Speed 4 Deri Mont',
    description: 'Premium dana derisi, CE Level 2 koruyucular, hava kanalları ile maksimum koruma ve konfor.',
    price: 12999,
    originalPrice: 16999,
    category: 'giyim-urunleri',
    stock: 15,
    featured: true,
    images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600'],
    specs: { 'Malzeme': 'Dana Derisi', 'Koruyucu': 'CE Level 2', 'Havalandırma': 'Var', 'Beden': 'S-XXL' },
    rating: 4.9,
    reviews: 78,
    homepageSections: ['featured', 'favorites'],
    homepageSectionOrder: { 'featured': 2, 'favorites': 1 }
  },
  {
    name: 'Alpinestars GP Plus R V4 Racing Takım',
    description: 'Pist kullanımı için tasarlanmış tek parça deri takım, titanyum kaydırıcılar.',
    price: 24999,
    originalPrice: 29999,
    category: 'giyim-urunleri',
    stock: 8,
    featured: true,
    images: ['https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=600'],
    specs: { 'Malzeme': 'Premium Deri', 'Koruyucu': 'CE Level 2', 'Kaydırıcı': 'Titanyum', 'Tip': 'Tek Parça' },
    rating: 5.0,
    reviews: 34,
    homepageSections: ['featured'],
    homepageSectionOrder: { 'featured': 3 }
  },
  {
    name: 'Rev\'it Eclipse 2 Tekstil Mont',
    description: 'Yaz ayları için ideal, nefes alan kumaş ve ayrılabilir su geçirmez astar.',
    price: 4999,
    originalPrice: 5999,
    category: 'giyim-urunleri',
    stock: 50,
    featured: false,
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600'],
    specs: { 'Malzeme': 'Tekstil', 'Koruyucu': 'CE Level 1', 'Su Geçirmez': 'Ayrılabilir', 'Mevsim': 'Yaz' },
    rating: 4.6,
    reviews: 112,
    homepageSections: ['school', 'favorites'],
    homepageSectionOrder: { 'school': 2, 'favorites': 2 }
  },
  {
    name: 'Spidi Warrior H2Out Pantolon',
    description: 'Su geçirmez ve nefes alır membran, D3O koruyucular.',
    price: 5499,
    originalPrice: 6499,
    category: 'giyim-urunleri',
    stock: 35,
    featured: false,
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600'],
    specs: { 'Malzeme': 'H2Out', 'Koruyucu': 'D3O', 'Su Geçirmez': 'Evet', 'Tip': 'Pantolon' },
    rating: 4.4,
    reviews: 89,
    homepageSections: ['selected'],
    homepageSectionOrder: { 'selected': 0 }
  },

  // Eldivenler
  {
    name: 'Alpinestars GP Pro R3 Yarış Eldiveni',
    description: 'MotoGP pilotlarının tercihi, karbon fiber eklem korumaları.',
    price: 3999,
    originalPrice: 4999,
    category: 'eldiven',
    stock: 20,
    featured: true,
    images: ['https://images.unsplash.com/photo-1617606002806-94e279c22567?w=600'],
    specs: { 'Malzeme': 'Keçi Derisi', 'Koruyucu': 'Karbon Fiber', 'Dokunmatik': 'Evet', 'Tip': 'Yarış' },
    rating: 4.8,
    reviews: 156,
    homepageSections: ['featured', 'school'],
    homepageSectionOrder: { 'featured': 4, 'school': 3 }
  },
  {
    name: 'Dainese Carbon 4 Short Eldiven',
    description: 'Kısa kesim, yaz kullanımı için ideal, karbon koruyuculu.',
    price: 2499,
    originalPrice: 2999,
    category: 'eldiven',
    stock: 45,
    featured: false,
    images: ['https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=600'],
    specs: { 'Malzeme': 'Keçi Derisi', 'Koruyucu': 'Karbon', 'Kesim': 'Kısa', 'Mevsim': 'Yaz' },
    rating: 4.5,
    reviews: 234,
    homepageSections: ['favorites', 'selected'],
    homepageSectionOrder: { 'favorites': 3, 'selected': 1 }
  },
  {
    name: 'Rev\'it Striker 3 Kış Eldiveni',
    description: 'Soğuk havalarda sıcak tutan, su geçirmez ve dokunmatik uyumlu.',
    price: 1899,
    originalPrice: 2299,
    category: 'eldiven',
    stock: 60,
    featured: false,
    images: ['https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=600'],
    specs: { 'Malzeme': 'Tekstil/Deri', 'Su Geçirmez': 'Evet', 'Dokunmatik': 'Evet', 'Mevsim': 'Kış' },
    rating: 4.3,
    reviews: 178,
    homepageSections: ['school'],
    homepageSectionOrder: { 'school': 4 }
  },

  // Oto Lastikler
  {
    name: 'Michelin Pilot Sport 5 - 225/45R17',
    description: 'Yüksek performans lastiği, mükemmel yol tutuşu ve uzun ömür.',
    price: 3299,
    originalPrice: 3999,
    category: 'oto-lastikler',
    stock: 100,
    featured: true,
    images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600'],
    specs: { 'Ebat': '225/45R17', 'Yük': '94Y', 'Tip': 'Yaz', 'Marka': 'Michelin' },
    rating: 4.9,
    reviews: 312,
    homepageSections: ['featured', 'favorites'],
    homepageSectionOrder: { 'featured': 5, 'favorites': 4 }
  },
  {
    name: 'Continental WinterContact TS 870 - 205/55R16',
    description: 'Kış lastiği, kar ve buzda üstün performans.',
    price: 2499,
    originalPrice: 2999,
    category: 'oto-lastikler',
    stock: 80,
    featured: false,
    images: ['https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600'],
    specs: { 'Ebat': '205/55R16', 'Yük': '91H', 'Tip': 'Kış', 'Marka': 'Continental' },
    rating: 4.7,
    reviews: 189,
    homepageSections: ['selected'],
    homepageSectionOrder: { 'selected': 2 }
  },
  {
    name: 'Pirelli P Zero - 245/40R18',
    description: 'Ultra yüksek performans lastiği, spor araçlar için.',
    price: 4999,
    originalPrice: 5999,
    category: 'oto-lastikler',
    stock: 40,
    featured: true,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
    specs: { 'Ebat': '245/40R18', 'Yük': '97Y', 'Tip': 'Yaz UHP', 'Marka': 'Pirelli' },
    rating: 4.8,
    reviews: 156,
    homepageSections: ['school', 'selected'],
    homepageSectionOrder: { 'school': 5, 'selected': 3 }
  },

  // Motosiklet Aksesuarları
  {
    name: 'GoPro Hero 12 Black + Kask Montaj Kiti',
    description: 'Aksiyon kamerası ve motosiklet kasına uygun montaj seti.',
    price: 8999,
    originalPrice: 10999,
    category: 'motosiklet-aksesuarlari',
    stock: 25,
    featured: true,
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600'],
    specs: { 'Çözünürlük': '5.3K', 'Stabilizasyon': 'HyperSmooth 6.0', 'Su Geçirmez': '10m', 'Pil': '1720mAh' },
    rating: 4.9,
    reviews: 234,
    homepageSections: ['featured'],
    homepageSectionOrder: { 'featured': 6 }
  },
  {
    name: 'Cardo Packtalk Edge Bluetooth İnterkom',
    description: 'Premium motosiklet interkomu, 1.6km menzil, JBL hoparlörler.',
    price: 7999,
    originalPrice: 9499,
    category: 'motosiklet-aksesuarlari',
    stock: 30,
    featured: false,
    images: ['https://images.unsplash.com/photo-1598618356794-eb1720430eb4?w=600'],
    specs: { 'Menzil': '1.6km', 'Hoparlör': 'JBL', 'Pil': '13 saat', 'Bağlantı': '15 sürücü' },
    rating: 4.7,
    reviews: 167,
    homepageSections: ['favorites', 'selected'],
    homepageSectionOrder: { 'favorites': 5, 'selected': 4 }
  },
  {
    name: 'Oxford Tank Bag 15L Manyetik',
    description: 'Manyetik bağlantılı depo çantası, su geçirmez.',
    price: 1499,
    originalPrice: 1899,
    category: 'motosiklet-aksesuarlari',
    stock: 55,
    featured: false,
    images: ['https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600'],
    specs: { 'Kapasite': '15L', 'Bağlantı': 'Manyetik', 'Su Geçirmez': 'Evet', 'Telefon Bölmesi': 'Evet' },
    rating: 4.4,
    reviews: 98,
    homepageSections: ['school'],
    homepageSectionOrder: { 'school': 6 }
  },

  // Ses ve Görüntü Sistemleri
  {
    name: 'Pioneer DMH-Z5350BT Apple CarPlay Ünite',
    description: '7 inç dokunmatik ekran, Apple CarPlay ve Android Auto uyumlu.',
    price: 6999,
    originalPrice: 8499,
    category: 'ses-goruntu',
    stock: 20,
    featured: true,
    images: ['https://images.unsplash.com/photo-1558618047-f4b511b673bc?w=600'],
    specs: { 'Ekran': '7 inç', 'CarPlay': 'Kablosuz', 'Android Auto': 'Evet', 'Bluetooth': '5.0' },
    rating: 4.8,
    reviews: 145,
    homepageSections: ['featured', 'favorites'],
    homepageSectionOrder: { 'featured': 7, 'favorites': 6 }
  },
  {
    name: 'JBL Club 6520 Araç Hoparlörü Set',
    description: '165mm koaksiyel hoparlör seti, 150W RMS güç.',
    price: 2499,
    originalPrice: 2999,
    category: 'ses-goruntu',
    stock: 40,
    featured: false,
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600'],
    specs: { 'Çap': '165mm', 'Güç': '150W RMS', 'Tip': 'Koaksiyel', 'İmpedans': '3 Ohm' },
    rating: 4.6,
    reviews: 89,
    homepageSections: ['selected'],
    homepageSectionOrder: { 'selected': 5 }
  },
  {
    name: 'Kenwood KSC-SW11 Aktif Subwoofer',
    description: 'Kompakt aktif subwoofer, koltuk altı montaj.',
    price: 3999,
    originalPrice: 4799,
    category: 'ses-goruntu',
    stock: 25,
    featured: false,
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600'],
    specs: { 'Güç': '150W', 'Frekans': '25Hz-150Hz', 'Montaj': 'Koltuk Altı', 'Uzaktan': 'Evet' },
    rating: 4.5,
    reviews: 67,
    homepageSections: ['school'],
    homepageSectionOrder: { 'school': 7 }
  }
];

async function clearCollection(collectionName) {
  console.log(`🗑️  ${collectionName} koleksiyonu temizleniyor...`);
  const querySnapshot = await getDocs(collection(db, collectionName));
  const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
  console.log(`✅ ${collectionName} koleksiyonu temizlendi (${querySnapshot.size} döküman silindi)`);
}

async function seedCategories() {
  console.log('\n📂 Kategoriler ekleniyor...');
  for (const category of categories) {
    const docRef = await addDoc(collection(db, 'categories'), {
      ...category,
      createdAt: new Date()
    });
    console.log(`  ✅ ${category.name} eklendi (ID: ${docRef.id})`);
  }
}

async function seedProducts() {
  console.log('\n📦 Ürünler ekleniyor...');
  for (const product of products) {
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log(`  ✅ ${product.name} eklendi (ID: ${docRef.id})`);
  }
}

async function main() {
  console.log('🏍️  Otomotiv Sepeti - Veritabanı Seed İşlemi Başlatılıyor...\n');
  console.log('=' .repeat(60));

  try {
    // Mevcut verileri temizle
    await clearCollection('categories');
    await clearCollection('products');

    // Yeni verileri ekle
    await seedCategories();
    await seedProducts();

    console.log('\n' + '=' .repeat(60));
    console.log('🎉 Seed işlemi başarıyla tamamlandı!');
    console.log(`   📂 ${categories.length} kategori eklendi`);
    console.log(`   📦 ${products.length} ürün eklendi`);
    console.log('\n🏁 Otomotiv Sepeti hazır!');
  } catch (error) {
    console.error('❌ Hata oluştu:', error);
  }

  process.exit(0);
}

main();

