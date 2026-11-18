# Product Requirements Document (PRD): Landing Page Kursus Elektrik GIS College (Light Mode Cinematic)

**Dokumen Versi:** 2.0  
**Tarikh Kemaskini:** 2026  
**Status Projek:** Spesifikasi Rekabentuk & Pembangunan Selesai  
**Institusi:** GIS College Malaysia (Sejak 2001)  

---

## 1. Pengenalan & Matlamat Produk

### 1.1 Latar Belakang
GIS College menawarkan program kemahiran teknikal berkualiti tinggi terutamanya **Kursus Elektrik** yang mensasarkan golongan remaja berumur 18 tahun ke atas. Sasaran utama pemasaran (*target audience*) ialah **ibu bapa** yang mempunyai pelbagai kerisauan terhadap masa depan anak mereka selepas menamatkan pendidikan sekolah menengah.

### 1.2 Matlamat Utama (Core Objectives)
* **Membina Kepercayaan (Trust Building):** Menangani emosi dan kerisauan ibu bapa secara berempati tanpa strategi *fearmongering*.
* **Menyediakan Solusi Jelas:** Menjawab 4 kerisauan utama ibu bapa (kewangan, kerjaya anak, keselamatan kampus, dan sahsiah).
* **Penjanaan Lead Berkesan (*Lead Generation*):** Mengumpul data prospek melalui borang ringkas (Nama, No. Telefon, Emel), menyimpan data secara automatik ke Google Sheets, dan melancarkan mesej WhatsApp terus kepada nombor **016-9865648**.

---

## 2. Spesifikasi Reka Bentuk & Visual (UI/UX)

### 2.1 Tema & Gaya Visual (Light Mode Exclusive)
* **Tiada Dark Mode:** Keseluruhan laman web wajib menggunakan tema *Light Mode* yang cerah, bersih, profesional, dan meyakinkan untuk audiens ibu bapa.
* **Palet Warna Korporat:**
  * **Biru Korporat (GIS Blue):** `#0f2b5c` (Dominan untuk header, teks utama, dan elemen korporat).
  * **Biru Cerah:** `#1e40af` (Aksen sekunder).
  * **Kuning Emas (GIS Yellow):** `#f59e0b` (Digunakan pada butang CTA utama untuk menarik perhatian).
  * **Latar Belakang:** `#f8fafc` & `#ffffff` (Warm sand dan putih bersih yang selesa dibaca).

### 2.2 Main Banner: Cinematic Wide Screen & Parallel Style
* **Konsep Visual:** Paparan sinematik lebar (*wide screen cinematic*) memaparkan pelajar lelaki dan perempuan berpakaian sopan memegang buku serta menggalas beg berjalan menuju ke kelas.
* **Susun Atur Selari (*Parallel Style*):** Reka bentuk dua kolum selari yang meletakkan mesej emosi persuasif di sebelah kiri dan kad sorotan persekitaran positif di sebelah kanan.
* **Transisi & Animasi:** Diperkasakan dengan transisi teks dinamik serta pustaka animasi *AOS (Animate On Scroll)* untuk kesan skrol yang lancar dan interaktif.

---

## 3. Struktur Kandungan Laman Web (Urutan Seksyen)

1. **Header & Navigation:** Logo GIS College, menu pantas, dan butang tindakan pantas WhatsApp / Daftar Minat.
2. **Hero / Cinematic Main Banner:** Tajuk sinematik utama, visual pelajar sopan beretika ke kelas, subheadline persuasif, dan butang CTA.
3. **Parent Pain Points:** 4 kad interaktif menyentuh isu kewangan, kerjaya, keselamatan, dan sahsiah.
4. **Our Solutions:** Susun atur perbandingan masalah berbanding solusi praktikal GIS College.
5. **Why Choose GIS College?:** Pengalaman institusi sejak 2001, pendekatan amali 70%, dan fasilitas.
6. **Career Opportunities:** Peluang kerjaya sebagai juruteknik elektrik, penyelenggaraan, dan kontraktor.
7. **Campus & Learning Environment:** Foto kampus, bengkel amali, dan pematuhan piawaian OSHA.
8. **Parent Testimonials & Alumni Stories:** Ulasan sahih ibu bapa dan graduan.
9. **Frequently Asked Questions (FAQ):** *Accordion* interaktif merangkumi syarat kemasukan, yuran, bantuan kewangan, dan keselamatan.
10. **Final Conversion & Lead Capture Form:** Borang 3 item (Nama Penuh, No. Telefon, Emel) dengan integrasi Google Sheets & WhatsApp.
11. **Footer:** Maklumat hak cipta, pautan penting, dan nombor perhubungan rasmi.

---

## 4. Spesifikasi Borang Lead Generation & Automasi

### 4.1 Item Borang (3 Input Sahaja)
1. `Nama Penuh` (Text, Required)
2. `No. Telefon` (Tel, Required)
3. `Emel` (Email, Required)

### 4.2 Aliran Tindakan Selepas Hantar (*On Submit Workflow*)
1. Butang dikunci sementara memaparkan status pemprosesan (*spinner*).
2. Data dihantar secara latar belakang (*background fetch*) ke endpoint **Google Apps Script Web App** untuk direkodkan ke Google Sheets.
3. Sistem menyediakan mesej WhatsApp pramuat dan membuka aplikasi WhatsApp secara automatik ke nombor **016-9865648** dalam masa 1 saat.
4. Paparan kotak mesej kejayaan (*success state*) muncul di skrin berserta pautan *fallback* manual jika WhatsApp tidak terbuka secara automatik.

---

## 5. Keperluan Bukan Fungsian (Non-Functional Requirements)

* **Responsif Sepenuhnya (*Mobile-First*):** Paparan wajib kelihatan sempurna dan kemas pada peranti mudah alih (iOS/Android), tablet, dan komputer desktop.
* **Kelajuan Pemuatan (*Performance*):** Penggunaan CDN terpantas untuk Tailwind CSS, FontAwesome, dan AOS Animation.
* **Aksesibiliti & Kebolehbacaan:** Kontras teks yang jelas, saiz fon mesra pembaca dewasa (ibu bapa), dan struktur semantik HTML5 yang sah.