# TezSlide
React + Vite + Tailwind + Framer Motion + Supabase. AI so'rovlari xavfsiz Supabase Edge Function orqali ketadi (API kalit frontendda yo'q).

## Ishga tushirish
1. `npm install`
2. supabase.com da loyiha oching → SQL Editor'da `supabase/schema.sql` ni ishga tushiring (jadval + RLS: har kim faqat o'zinikini ko'radi).
3. `.env.example` ni `.env` ga nusxalab, `VITE_SUPABASE_URL` va `VITE_SUPABASE_ANON_KEY` ni (Project Settings → API) kiriting.
4. AI backend (Supabase CLI kerak):
   ```
   supabase login && supabase link --project-ref <REF>
   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
   supabase functions deploy generate
   ```
   (ixtiyoriy: `supabase secrets set AI_MODEL=<model nomi>`)
5. Authentication → Providers → Email yoqilgan bo'lsin (tasdiqlash emailini xohlasangiz o'chirib qo'yishingiz mumkin).
6. `npm run dev` yoki `npm run build`.

## Eksport
PPTX — PptxGenJS (spiker eslatmalari bilan). PDF — slaydlar html2canvas orqali rasmga olinib jsPDF'ga yoziladi (o‘zbek harflari to‘g‘ri chiqishi uchun).
