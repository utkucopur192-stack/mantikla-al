-- MantıklaAL Veritabanı Şeması
-- Supabase SQL Editor'e yapıştır ve çalıştır

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100),
  category VARCHAR(100),
  price DECIMAL(10,2),
  rating DECIMAL(3,1),
  review_count INTEGER DEFAULT 0,
  warranty_years INTEGER DEFAULT 1,
  brand_score DECIMAL(3,1) DEFAULT 7,
  category_avg_price DECIMAL(10,2),
  logic_score DECIMAL(3,1),
  specs TEXT[],
  pros TEXT[],
  cons TEXT[],
  why TEXT,
  platform VARCHAR(50),
  affiliate_url TEXT,
  emoji VARCHAR(10) DEFAULT '📦',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Örnek ürünler
INSERT INTO products (name, brand, category, price, rating, review_count, warranty_years, brand_score, category_avg_price, logic_score, specs, pros, cons, why, platform, affiliate_url, emoji) VALUES
(
  'Xiaomi Redmi Note 13 Pro+', 'Xiaomi', 'Telefon', 12999, 4.7, 3200, 2, 8, 18000, 9.3,
  ARRAY['Dimensity 7200 Ultra','12GB RAM','200MP Kamera','67W Şarj'],
  ARRAY['200MP inanılmaz kamera','67W hızlı şarj','Fiyatının üstünde ekran'],
  ARRAY['MIUI reklam sorunu','Servis ağı sınırlı'],
  '200MP kamera + 12GB RAM bu fiyata? Akıllara durgunluk. Kullanıcıların %91i memnun.',
  'Trendyol', 'https://trendyol.com', '📱'
),
(
  'JBL Tune 770NC', 'JBL', 'Kulaklık', 1299, 4.3, 1800, 1, 8.5, 1800, 8.1,
  ARRAY['ANC','50 Saat Batarya','Bluetooth 5.3','Katlanabilir'],
  ARRAY['Fiyatına göre harika batarya','Hafif ve rahat tasarım','Katlanabilir'],
  ARRAY['ANC Sonye kıyasla zayıf','Plastik yapı ucuz hissettiriyor'],
  'Bu fiyata bu performans çok iyi. Sony kadar değil ama yarı fiyatına gayet yeterli.',
  'Hepsiburada', 'https://hepsiburada.com', '🎧'
),
(
  'Philips BHD356', 'Philips', 'Fön Makinesi', 1750, 4.5, 920, 2, 9, 2200, 8.7,
  ARRAY['1200W','ThermoProtect','İyonik Teknoloji','6 Ayar'],
  ARRAY['Az elektrik harcıyor 1200W','2 yıl garanti','İyonik teknoloji saçı korur'],
  ARRAY['Kablo kısa 1.8m','Difüzör ek alınıyor'],
  '1200W ile hem saçını korur hem elektrik faturanı düşürür. 2000₺ altında en mantıklı fön.',
  'Trendyol', 'https://trendyol.com', '💨'
);
