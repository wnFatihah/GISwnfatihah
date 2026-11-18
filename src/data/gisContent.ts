export interface RotatingHeroMessage {
  headline: string;
  subtext: string;
}

export interface ParallelHighlight {
  id: 'sahsiah' | 'amali' | 'kerjaya';
  tabLabel: string;
  title: string;
  description: string;
  metricValue: string;
  metricLabel: string;
}

export interface PainPointItem {
  id: 'kewangan' | 'kerjaya' | 'keselamatan' | 'sahsiah';
  index: string;
  title: string;
  summary: string;
  parentVoice: string;
  solutionTitle: string;
  solutionDetail: string;
  keyAssurance: string;
}

export interface WhyChooseFeature {
  id: string;
  index: string;
  title: string;
  metric: string;
  description: string;
  highlights: string[];
}

export interface CareerPathway {
  index: string;
  roleTitle: string;
  sector: string;
  description: string;
  coreSkills: string[];
  progressionNote: string;
}

export interface CampusTab {
  id: 'kampus' | 'bengkel' | 'osha';
  label: string;
  title: string;
  description: string;
  standards: string[];
}

export interface TestimonialItem {
  id: string;
  category: 'ibu-bapa' | 'alumni';
  name: string;
  role: string;
  location: string;
  cohort: string;
  before: string;
  outcome: string;
  quote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const WHATSAPP_DISPLAY = '016-9865648';
export const WHATSAPP_DIRECT_URL =
  'https://wa.me/60169865648?text=' +
  encodeURIComponent(
    'Salam sejahtera GIS College Malaysia, saya ingin bertanya mengenai Kursus Elektrik (Pengambilan 2026).',
  );

export const HERO_MESSAGES: RotatingHeroMessage[] = [
  {
    headline: 'Bimbing Masa Depan Anak Anda dengan Kemahiran Elektrik yang Terjamin',
    subtext:
      'Sejak 2001, GIS College membantu remaja 18 tahun ke atas menguasai kemahiran elektrik sebenar dalam suasana kampus yang selamat, sopan, dan berdisiplin.',
  },
  {
    headline: 'Dari Remaja Lepasan Sekolah ke Juruteknik Elektrik Berkemahiran Tinggi',
    subtext:
      '70% latihan amali di bengkel bersama tenaga pengajar berpengalaman memastikan anak anda bukan sekadar menghafal teori, tetapi bersedia memasuki alam pekerjaan.',
  },
  {
    headline: 'Ketenangan Hati Ibu Bapa Bermula dengan Persekitaran Kampus yang Terjaga',
    subtext:
      'Etika pemakaian kemas, bimbingan sahsiah berterusan, serta pematuhan keselamatan OSHA yang ketat di setiap bengkel pendawaian.',
  },
];

export const PARALLEL_HIGHLIGHTS: ParallelHighlight[] = [
  {
    id: 'sahsiah',
    tabLabel: 'Sahsiah & Etika',
    title: 'Persekitaran Sopan & Terkawal',
    description:
      'Pelajar lelaki dan perempuan dipupuk dengan adab berpakaian kemas, disiplin kehadiran harian, serta bimbingan mentor yang dekat dengan ibu bapa.',
    metricValue: '18+ Thn',
    metricLabel: 'Bimbingan Remaja Lepasan Sekolah',
  },
  {
    id: 'amali',
    tabLabel: '70% Amali',
    title: 'Latihan Praktikal Terus di Bengkel',
    description:
      'Pelajar mengendalikan papan agihan, pendawaian 1-fasa dan 3-fasa, serta alat ujian industri di bawah penyeliaan nisbah kecil.',
    metricValue: '70% / 30%',
    metricLabel: 'Nisbah Latihan Amali Berbanding Teori',
  },
  {
    id: 'kerjaya',
    tabLabel: 'Laluan Kerjaya',
    title: 'Kemahiran Dicari Sektor Industri',
    description:
      'Permintaan berterusan bagi juruteknik elektrik, penyelenggaraan bangunan, dan kontraktor bertauliah di seluruh Malaysia.',
    metricValue: '25+ Thn',
    metricLabel: 'Rekod Kecemerlangan Sejak 2001',
  },
];

export const INSTITUTIONAL_METRICS = [
  { value: 'Sejak 2001', label: 'Pengalaman Pendidikan Kemahiran' },
  { value: '70% Amali', label: 'Pendekatan Bengkel Hands-On' },
  { value: '100% OSHA', label: 'Pematuhan Piawaian Keselamatan' },
  { value: '18+ Tahun', label: 'Sasaran Pelajar Lepasan Sekolah' },
];

export const PAIN_POINTS: PainPointItem[] = [
  {
    id: 'kewangan',
    index: '01',
    title: 'Kewangan & Kos Pengajian',
    summary:
      'Kerisauan terhadap yuran pengajian tinggi yang membebankan serta pulangan nilai sebenar untuk keluarga.',
    parentVoice:
      '“Kami risau jika terpaksa menanggung komitmen yuran yang tinggi tetapi anak masih belum tentu mendapat pekerjaan selepas tamat.”',
    solutionTitle: 'Struktur Yuran Jelas & Pilihan Bantuan Kewangan',
    solutionDetail:
      'GIS College menawarkan struktur yuran yang telus tanpa caj tersembunyi, pelan bayaran berperingkat yang mesra keluarga, serta panduan permohonan bantuan latihan kemahiran yang layak.',
    keyAssurance: 'Tiada beban hutang luar jangka · Kaunseling kewangan sebelum mendaftar',
  },
  {
    id: 'kerjaya',
    index: '02',
    title: 'Hala Tuju Kerjaya Anak',
    summary:
      'Kebimbangan sekiranya anak tidak cenderung kepada akademik tulen lalu sukar bersaing mendapatkan kerja stabil.',
    parentVoice:
      '“Anak saya lebih minat kerja praktikal berbanding membaca buku semata-mata. Apa peluang kerjaya yang benar-benar terjamin untuknya?”',
    solutionTitle: 'Kurikulum 70% Amali Berorientasikan Industri',
    solutionDetail:
      'Pelajar dilatih kemahiran pendawaian domestik, industri 3-fasa, kawalan motor, dan penyelenggaraan elektrik yang diperlukan oleh syarikat kejuruteraan, kilang, dan projek pembinaan.',
    keyAssurance: 'Latihan teknikal sebenar · Persediaan penempatan industri',
  },
  {
    id: 'keselamatan',
    index: '03',
    title: 'Keselamatan Kampus & Bengkel',
    summary:
      'Rasa bimbang ibu bapa terhadap risiko pengendalian arus elektrik serta kawalan keselamatan harian di kampus.',
    parentVoice:
      '“Bidang elektrik melibatkan arus dan peralatan teknikal. Sejauh mana keselamatan anak saya terjamin sewaktu di bengkel?”',
    solutionTitle: 'Protokol OSHA Ketat & Peralatan Pelindung Lengkap',
    solutionDetail:
      'Setiap sesi amali bermula dengan taklimat keselamatan, pemakaian PPE lengkap (kasut keselamatan, sarung tangan penebat, pelindung mata), sistem RCCB sensitiviti tinggi, dan pengawasan pensyarah bertauliah.',
    keyAssurance: 'Pemantauan pensyarah 100% di bengkel · Fasiliti berpenebat selamat',
  },
  {
    id: 'sahsiah',
    index: '04',
    title: 'Sahsiah & Disiplin Diri',
    summary:
      'Keinginan melihat anak membesar dengan akhlak mulia, berdikari, berpakaian sopan, dan menjauhi pengaruh negatif.',
    parentVoice:
      '“Pada usia 18 tahun ke atas, kami mahu tempat belajar yang bukan sahaja mengajar kemahiran, malah menjaga adab dan pergaulan anak.”',
    solutionTitle: 'Budaya Kampus Beretika & Laporan Berkala Ibu Bapa',
    solutionDetail:
      'GIS College mengekalkan kod etika pemakaian sopan dan kemas, pemantauan rekod kehadiran harian, serta komunikasi terbuka bersama ibu bapa tentang perkembangan disiplin pelajar.',
    keyAssurance: 'Kod pakaian sopan wajib · Bimbingan mentor & hal ehwal pelajar',
  },
];

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  {
    id: 'amali-70',
    index: '01',
    title: 'Pendekatan 70% Amali & 30% Teori',
    metric: '70 : 30',
    description:
      'Direka khusus untuk remaja yang belajar lebih pantas melalui sentuhan praktikal. Pelajar tidak hanya duduk mendengar kuliah, tetapi membina litar, mendawai papan agihan, dan menguji sistem elektrik secara langsung.',
    highlights: [
      'Pendawaian Domestik 1-Fasa & Industri 3-Fasa',
      'Pengujian Litar, Pengesanan Kerosakan & Multimeter',
      'Panel Kawalan Motor & Sistem Perlindungan Beban',
    ],
  },
  {
    id: 'sejak-2001',
    index: '02',
    title: 'Rekod Institusi Kukuh Sejak 2001',
    metric: '25+ Tahun',
    description:
      'Lebih dua dekad membimbing ribuan pelajar Malaysia membina kerjaya teknikal. Pengalaman panjang ini membentuk silibus yang matang dan dipercayai majikan.',
    highlights: [
      'Tenaga pengajar berpengalaman industri sebenar',
      'Penilaian kemahiran berterusan mengikut tahap pelajar',
    ],
  },
  {
    id: 'fasiliti-lengkap',
    index: '03',
    title: 'Bengkel & Bilik Kuliah Moden',
    metric: 'Nisbah Kecil',
    description:
      'Setiap stesen kerja dilengkapi papan latihan individu supaya setiap pelajar mendapat giliran amali secukupnya tanpa berkongsi beramai-ramai.',
    highlights: [
      '1 pelajar 1 stesen latihan pendawaian berasingan',
      'Peralatan ujian digital serta komponen piawaian Malaysia',
    ],
  },
];

export const CAREER_PATHWAYS: CareerPathway[] = [
  {
    index: '01',
    roleTitle: 'Juruteknik Elektrik Berkelayakan',
    sector: 'Sektor Pembinaan & Kejuruteraan',
    description:
      'Melaksanakan pemasangan pendawaian baharu, pengagihan kuasa bangunan komersial, serta pemeriksaan keselamatan sistem elektrik.',
    coreSkills: ['Pendawaian 1-Fasa & 3-Fasa', 'Pembacaan Pelan Skematik', 'Pengujian Rintangan Penebatan'],
    progressionNote: 'Laluan pantas ke pentauliahan Kekompetenan Suruhanjaya Tenaga (PW2 / PW4).',
  },
  {
    index: '02',
    roleTitle: 'Juruteknik Penyelenggaraan & Fasiliti',
    sector: 'Kilang Pembuatan, Hospital & Hotel',
    description:
      'Mengurus operasi harian sistem kuasa bangunan, penyelenggaraan berkala motor industri, serta penyelesaian gangguan bekalan segera.',
    coreSkills: ['Kawalan Motor & Automasi', 'Penyelenggaraan Papan Suis', 'Keselamatan Lockout-Tagout'],
    progressionNote: 'Kerjaya tetap berpendapatan stabil dengan elaun syif dan kerja lebih masa.',
  },
  {
    index: '03',
    roleTitle: 'Usahawan & Kontraktor Elektrik',
    sector: 'Perniagaan Perkhidmatan Teknikal Sendiri',
    description:
      'Membina perniagaan perkhidmatan pendawaian kediaman, pemasangan sistem penyaman udara, solar, dan naik taraf kuasa premis.',
    coreSkills: ['Sebut Harga & Pengurusan Projek', 'Standard Keselamatan Pemasangan', 'Servis Pelanggan Profesional'],
    progressionNote: 'Potensi pendapatan fleksibel serta peluang membina pasukan juruteknik sendiri.',
  },
];

export const CAMPUS_TABS: CampusTab[] = [
  {
    id: 'kampus',
    label: 'Suasana Kampus Sopan',
    title: 'Persekitaran Belajar Kondusif, Bersih & Teratur',
    description:
      'Kampus GIS College direka untuk memberikan ketenangan fikiran kepada ibu bapa. Pelajar melangkah ke kelas dengan pakaian berkolar kemas, bertudung sopan bagi siswi, serta jadual pembelajaran berstruktur dari pagi hingga petang.',
    standards: [
      'Kod etika pemakaian sopan & kemas setiap hari kuliah',
      'Kawalan akses kampus serta pemantauan staf hal ehwal pelajar',
      'Bilik kuliah berhawa dingin dengan pencahayaan optimum',
    ],
  },
  {
    id: 'bengkel',
    label: 'Bengkel Amali 3-Fasa',
    title: 'Ruang Latihan Industri Sebenar Tanpa Sesak',
    description:
      'Bengkel elektrik dilengkapi panel latihan pendawaian permukaan, tersembunyi, konduit GI/PVC, serta papan kawalan motor supaya pelajar mahir sebelum melangkah ke tapak kerja.',
    standards: [
      'Ruang kerja luas dengan penandaan laluan keselamatan lantai',
      'Bekalan kuasa latihan terasing bagi setiap baris stesen kerja',
      'Penyeliaan rapat oleh pensyarah bertauliah sepanjang sesi amali',
    ],
  },
  {
    id: 'osha',
    label: 'Pematuhan OSHA',
    title: 'Keselamatan Elektrik Adalah Keutamaan Mutlak',
    description:
      'Setiap pelajar dilatih membudayakan prosedur kerja selamat mengikut garis panduan Akta Keselamatan dan Kesihatan Pekerjaan (OSHA) sebelum menyentuh sebarang peralatan hidup.',
    standards: [
      'Pemakaian wajib kasut keselamatan bertapak penebat & gogal',
      'Perlindungan RCCB 30mA dan suis henti kecemasan di setiap zon',
      'Latihan pengasingan bekalan (Lockout / Tagout) & pertolongan cemas',
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'parent-1',
    category: 'ibu-bapa',
    name: 'Puan Hajah Noraini binti Othman',
    role: 'Ibu Pelajar Kursus Elektrik',
    location: 'Shah Alam, Selangor',
    cohort: 'Pengambilan 2024',
    before: 'Anak kurang minat membaca buku akademik selepas SPM dan banyak menghabiskan masa di rumah tanpa arah tuju kerjaya yang jelas.',
    outcome: 'Selepas 6 bulan di GIS College, disiplin solat dan ketepatan masanya berubah ketara; kini mahir mendawai panel 1-fasa serta bersemangat memohon latihan industri.',
    quote:
      'Sebagai ibu, perkara paling saya hargai di GIS College ialah cara pensyarah menjaga sahsiah dan keselamatan anak di bengkel. Saya nampak perubahan yakin diri anak saya setiap kali pulang bercuti.',
  },
  {
    id: 'parent-2',
    category: 'ibu-bapa',
    name: 'Encik Mohd Razali bin Ismail',
    role: 'Bapa Pelajar Kursus Elektrik',
    location: 'Seremban, Negeri Sembilan',
    cohort: 'Pengambilan 2023',
    before: 'Risau dengan kos pengajian tinggi swasta yang mahal serta bimbang anak terjebak dengan persekitaran kampus yang kurang terkawal.',
    outcome: 'Yuran yang jelas dan teratur tidak membebankan keluarga, manakala anak berjaya menamatkan latihan dengan rekod kehadiran 98% dan terus diterima bekerja sebagai juruteknik.',
    quote:
      'Pihak kolej sentiasa memaklumkan perkembangan anak kepada kami. Pelaburan pendidikan kemahiran ini ternyata berbaloi apabila anak mula menyumbang semula kepada keluarga.',
  },
  {
    id: 'alumni-1',
    category: 'alumni',
    name: 'Muhammad Amirul Hakim bin Roslan',
    role: 'Juruteknik Penyelenggaraan Elektrik',
    location: 'Pasir Gudang, Johor',
    cohort: 'Alumni Kohort 2022',
    before: 'Tidak pasti haluan selepas tamat Tingkatan 5 dan tidak mempunyai sebarang asas teknikal elektrik.',
    outcome: 'Latihan 70% amali di GIS College membolehkan saya menguasai pembacaan litar dan ujian keselamatan sehingga dilantik sebagai juruteknik tetap dalam tempoh 3 minggu tamat pengajian.',
    quote:
      'Sewaktu ditemuduga majikan, saya diminta menyambung litar kawalan motor secara praktikal. Kerana sudah ratusan jam berlatih di bengkel GIS College, saya dapat menyiapkannya dengan tenang dan kemas.',
  },
  {
    id: 'alumni-2',
    category: 'alumni',
    name: 'Nurul Izzati binti Kamarudin',
    role: 'Penyelia Teknikal & Kawalan Kualiti Elektrik',
    location: 'Bayan Lepas, Pulau Pinang',
    cohort: 'Alumni Kohort 2021',
    before: 'Bimbang bidang elektrik hanya sesuai untuk pelajar lelaki dan risau tentang keselamatan ketika latihan bengkel.',
    outcome: 'Persekitaran kampus yang menghormati batas etika serta bimbingan OSHA yang rapi membolehkan saya cemerlang sehingga kini menyelia pasukan teknikal kilang.',
    quote:
      'Di GIS College, pelajar perempuan dilayan dengan hormat, pakaian sopan sentiasa dijaga, dan setiap langkah keselamatan di bengkel diterangkan dengan teliti sehingga saya yakin bekerja dalam industri.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'syarat',
    question: 'Apakah syarat kelayakan untuk memohon Kursus Elektrik di GIS College?',
    answer:
      'Terbuka kepada warganegara Malaysia berumur 18 tahun ke atas (lepasan SPM atau setaraf), boleh membaca, menulis dan mengira dengan baik, serta sihat tubuh badan dan tidak rabun warna bagi tujuan mengenal pasti kod warna kabel elektrik.',
  },
  {
    id: 'yuran',
    question: 'Bagaimanakah struktur yuran pengajian dan adakah pilihan bayaran berperingkat disediakan?',
    answer:
      'GIS College menyediakan struktur yuran yang berpatutan dan telus tanpa caj tersembunyi. Ibu bapa boleh memilih pelan pembayaran secara berperingkat serta mendapatkan khidmat nasihat mengenai pilihan bantuan kewangan latihan kemahiran yang berkaitan semasa sesi konsultasi.',
  },
  {
    id: 'keselamatan',
    question: 'Sejauh manakah keselamatan pelajar terjamin semasa latihan amali di bengkel elektrik?',
    answer:
      'Setiap bengkel mematuhi piawaian keselamatan OSHA dengan perlindungan pemutus litar RCCB sensitiviti tinggi, bekalan kuasa berasingan mengikut stesen, pemakaian wajib peralatan perlindungan diri (PPE), serta pengawasan penuh oleh tenaga pengajar bertauliah sepanjang sesi amali berlangsung.',
  },
  {
    id: 'sahsiah',
    question: 'Bagaimanakah pemantauan disiplin, pemakaian sopan, dan penginapan pelajar diuruskan?',
    answer:
      'Semua pelajar diwajibkan mematuhi kod etika pemakaian sopan dan kemas semasa berada di kawasan kampus dan bengkel. Rekod kehadiran dipantau setiap hari, dan ibu bapa boleh menghubungi pegawai hal ehwal pelajar untuk semakan perkembangan anak serta panduan penginapan asrama berhampiran kampus.',
  },
  {
    id: 'kerjaya',
    question: 'Adakah pelajar dibantu untuk penempatan latihan industri dan peluang pekerjaan selepas tamat?',
    answer:
      'Ya. Sejak ditubuhkan pada tahun 2001, GIS College mengekalkan hubungan rapat dengan rangkaian majikan industri kejuruteraan, penyelenggaraan bangunan, dan kontraktor elektrik bagi memudahkan penempatan latihan industri serta persediaan kerjaya graduan.',
  },
];
