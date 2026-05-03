# mantıklaAL 🏆

> En ucuzu değil, en mantıklısını al.

## Kurulum

### 1. GitHub'a yükle
```bash
git init
git add .
git commit -m "ilk commit"
git remote add origin https://github.com/KULLANICI_ADIN/mantikla-al.git
git push -u origin main
```

### 2. Supabase kurulumu
1. supabase.com → yeni proje oluştur
2. SQL Editor → `supabase-schema.sql` dosyasını yapıştır → Run
3. Project Settings → API → URL ve anon key'i kopyala

### 3. Vercel'e deploy
1. vercel.com → "Add New Project" → GitHub repo'nu seç
2. Environment Variables ekle:
   - `ANTHROPIC_API_KEY` = Claude API key'in
   - `NEXT_PUBLIC_SUPABASE_URL` = Supabase URL'in
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Supabase anon key'in
3. Deploy butonuna bas → site canlıda! 🎉

## Yeni Ürün Eklemek
Supabase → Table Editor → products → Insert row

## Teknolojiler
- Next.js 14 (App Router)
- Supabase (PostgreSQL)
- Claude API (MantıkBot)
- Vercel (Hosting)
