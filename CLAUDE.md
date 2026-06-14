# La Fleur Virágbolt — Weboldal Projekt

## Mit kell csinálnod
Építs egy **egyoldalas, magyar nyelvű landing page-et** a(z) **La Fleur Virágbolt** (Virágbolt, Eger) számára.

## Lépések

### 1. Design generálás (AIDesigner MCP)
Használd az AIDesigner MCP `generate_design` toolt:
- Olvasd el a `spec.md` fájlt — ott van a teljes design specifikáció
- Olvasd el a `prompt.json` fájlt — ott vannak a színek, betűtípusok, céges adatok
- Prompt az AIDesigner-nek: A spec.md-ben lévő teljes magyar nyelvű leírás
- Viewport: desktop (1440px)
- Generálj egy mobil verziót is (viewport: mobile, 390px)

### 2. Design finomítás
Ha az első design nem tökéletes, használd a `refine_design` toolt:
- "Legyen magyarabb a szöveg / természetesebb"
- "A színek legyenek jobban a prompt.json szerint"
- "Mobilon legyen jobb a spacing"

### 3. Frontend implementálás
A generált HTML/Tailwind design alapján:
- Hozd létre a Next.js oldalakat (`src/app/page.tsx`)
- Használj Tailwind CSS-t a `prompt.json` színeivel
- Google Fonts betöltés a megadott betűtípusokkal
- Minden szekció: Hero → Szolgáltatások → Rólunk → Galéria → Űrlap → Kapcsolat → Lábléc

### 4. Payload CMS collections
Hozd létre:
- `src/collections/Services.ts` — név, leírás, ár, ikon, sorrend
- `src/collections/Gallery.ts` — kép, alt szöveg, sorrend
- `src/collections/Submissions.ts` — név, telefon, email, szolgáltatás, időpont, üzenet
- `src/globals/Settings.ts` — cégnév, telefon, cím, email, nyitvatartás, facebook, instagram

### 5. Seed data
Töltsd fel a Settings-et a `prompt.json`-ból:
- Cégnév, telefon, cím, email, social linkek
- Adj hozzá 3-5 placeholder szolgáltatást a spec.md alapján

### 6. Űrlap
Az időpontfoglalás/kapcsolat űrlap mentse a Payload `submissions` collection-be.
Server action vagy API route — NE client-side fetch.

### 7. Vercel deploy előkészítés
- Hozz létre `vercel.json`-t ha nincs
- `.env.local` fájlba: MONGODB_URI, PAYLOAD_SECRET placeholder
- `next.config.js`-ben legyen output: 'standalone' ha szükséges
- Ellenőrizd hogy `npm run build` hiba nélkül lefut

### 8. Végső ellenőrzés
- `npm run dev` → localhost:3000 működjön
- Mobil nézet OK
- Minden szöveg magyar
- Űrlap működik
- Google Maps embed a kapcsolat szekcióban

## Fontos szabályok
- MINDEN szöveg, gomb, placeholder, hibaüzenet MAGYARUL
- Tegező/magázó stílus a spec.md szerint
- A design a `prompt.json` színeit és betűtípusait használja
- Mobile-first, reszponzív
- Telefonszámok kattinthatóak (tel: link)
- A galéria placeholder képeket használjon (via placeholder.co vagy similar)
