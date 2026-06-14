# La Fleur Virágbolt — Weboldal Specifikáció

**Típus:** Egyoldalas magyar nyelvű landing page
**Iparág:** Virágbolt | **Város:** Eger
**Web státusz:** Csak Facebook/Instagram (nincs weboldal)
**Elérhetőség:** Email: lafleurvirag.eger@gmail.com | FB: facebook.com/lafleureger | Cím: Szent János utca 7, Eger

---

Készíts egy magyar nyelvű, egyoldalas landing page-et egy virágboltnak:

AZ ÜZLET ADATAI:
- Név: La Fleur Virágbolt
- Cím: Szent János utca 7, Eger
- Email: lafleurvirag.eger@gmail.com
- Facebook: facebook.com/lafleureger | Instagram, TikTok
- Nyitvatartás: hétköznap 9–17
- Szolgáltatások: Vágott virág, csokrok, ajándékok, szezonális termékek

DESIGN:
- Stílus: Friss, természetes, elegáns
- Színek: Friss zöld (#5A8A5E) fejlécekhez, púderrózsaszín (#E8C4D0) kiemelésekhez, krém (#F6F3EE) háttérhez, mélyzöld (#2D4A30) szöveghez
- Betűtípus: Elegáns serif címekhez (pl. Lora), sans-serif szöveghez (pl. Open Sans)

FELÉPÍTÉS (egyetlen görgethető oldal):
1. Hero szekció: "La Fleur Virágbolt — Eger", szlogen ("Friss virágok, szeretettel kötve"), CTA: "Érdeklődjön / Rendeljen"
2. Kínálatunk: Csokrok, alkalmi virágok (esküvő, születésnap, névnap), ajándékok, szezonális termékek — rövid leírással
3. Rólunk: A bolt bemutatkozása, filozófia
4. Galéria: 6-8 kép placeholder (csokrok, dekorációk)
5. Rendelés/Kapcsolat űrlap: Név, telefon, email, milyen alkalomra (legördülő), üzenet/kívánság
6. Elérhetőség: Email, cím, nyitvatartás, Google Maps
7. Lábléc: Facebook, Instagram, email, cím, © 2026

HANGNEM: Meleg, kedves, természetes.

TECHNIKAI: Mobilbarát, reszponzív, képoptimalizálás.

---

## Technikai követelmények
- **Stack:** Next.js 14+ (App Router) + Payload CMS 3.x + Tailwind CSS
- **Nyelv:** Magyar (HU)
- **Hosting:** Vercel-kompatibilis
- **Responsive:** Mobile-first
- **SEO:** Meta tagek, Open Graph, magyar title/description
- **Űrlap:** Payload CMS form submission → submissions collection
- **Térkép:** Google Maps embed (Eger)

## Payload CMS Collections
- `services` — Szolgáltatások (név, leírás, ár, ikon)
- `gallery` — Galéria képek (kép, alt, sorrend)
- `submissions` — Űrlap beküldések (név, telefon, email, üzenet, szolgáltatás, időpont)
- `settings` — Globális (cégnév, telefon, cím, nyitvatartás, social linkek)
