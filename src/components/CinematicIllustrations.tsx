export function HeroCinematicCampusScene() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[#0f2b5c]/12 bg-gradient-to-b from-[#eff6ff] via-[#f8fafc] to-[#e2e8f0]/60">
      <svg
        viewBox="0 0 800 460"
        className="h-auto w-full block"
        role="img"
        aria-label="Ilustrasi sinematik pelajar lelaki dan perempuan GIS College berpakaian sopan memegang buku dan menggalas beg berjalan ke dewan kuliah elektrik"
      >
        <defs>
          <linearGradient id="skyWarmLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="55%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="sunBeam" x1="0.85" y1="0" x2="0.15" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="buildingWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="walkwayFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {/* Sunlit Morning Sky Backdrop */}
        <rect width="800" height="460" fill="url(#skyWarmLight)" />
        <polygon points="800,0 520,0 180,460 800,460" fill="url(#sunBeam)" />

        {/* Distant Academic Wing & Tree Line */}
        <g opacity="0.85">
          <circle cx="95" cy="245" r="46" fill="#bfdbfe" opacity="0.55" />
          <circle cx="145" cy="235" r="56" fill="#93c5fd" opacity="0.4" />
          <circle cx="715" cy="250" r="52" fill="#bfdbfe" opacity="0.55" />
        </g>

        {/* Main GIS College Academic Hall Architecture */}
        <rect x="64" y="96" width="672" height="234" rx="4" fill="url(#buildingWall)" stroke="#0f2b5c" strokeOpacity="0.14" />
        {/* Roof fascia in Corporate GIS Blue */}
        <rect x="52" y="84" width="696" height="24" rx="3" fill="#0f2b5c" />
        <rect x="52" y="106" width="696" height="4" fill="#f59e0b" />

        {/* Architectural Signage on Building */}
        <rect x="250" y="122" width="300" height="36" rx="4" fill="#0f2b5c" />
        <text
          x="400"
          y="145"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="14"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, sans-serif"
          letterSpacing="1.2"
        >
          FAKULTI TEKNOLOGI ELEKTRIK
        </text>

        {/* Glass Windows & Structural Colonnade Pillars */}
        {[100, 195, 290, 440, 535, 630].map((x) => (
          <g key={x}>
            <rect x={x} y="178" width="66" height="92" rx="3" fill="#dbeafe" stroke="#1e40af" strokeOpacity="0.22" />
            <line x1={x + 33} y1="178" x2={x + 33} y2="270" stroke="#ffffff" strokeWidth="2" />
            <line x1={x} y1="224" x2={x + 66} y2="224" stroke="#ffffff" strokeWidth="2" />
          </g>
        ))}

        {/* Entrance Canopy & Glass Double Doors */}
        <rect x="355" y="182" width="90" height="148" rx="3" fill="#eff6ff" stroke="#0f2b5c" strokeOpacity="0.28" />
        <line x1="400" y1="182" x2="400" y2="330" stroke="#0f2b5c" strokeOpacity="0.35" strokeWidth="2" />
        <rect x="336" y="172" width="128" height="12" rx="2" fill="#1e40af" />

        {/* Walkway & Campus Courtyard */}
        <polygon points="0,330 800,330 800,460 0,460" fill="url(#walkwayFloor)" />
        <line x1="0" y1="330" x2="800" y2="330" stroke="#0f2b5c" strokeOpacity="0.16" strokeWidth="2" />
        {/* Perspective Walkway Paving Lines */}
        <line x1="400" y1="330" x2="400" y2="460" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="8 8" />
        <line x1="250" y1="330" x2="110" y2="460" stroke="#0f2b5c" strokeOpacity="0.08" strokeWidth="1.5" />
        <line x1="550" y1="330" x2="690" y2="460" stroke="#0f2b5c" strokeOpacity="0.08" strokeWidth="1.5" />

        {/* Student 1 (Male, left): Modest collared shirt, long slacks, backpack, holding electrical manual */}
        <g transform="translate(230, 232)">
          {/* Soft floor shadow */}
          <ellipse cx="32" cy="176" rx="28" ry="6" fill="#0f2b5c" fillOpacity="0.14" />
          {/* Backpack strap / body behind */}
          <rect x="10" y="54" width="38" height="54" rx="10" fill="#1e3a8a" />
          {/* Legs (long formal trousers) */}
          <path d="M22 108 L18 166 L29 166 L32 118 L39 166 L50 166 L44 108 Z" fill="#1e293b" />
          {/* Safety/Smart Shoes */}
          <ellipse cx="22" cy="168" rx="9" ry="4.5" fill="#0f172a" />
          <ellipse cx="45" cy="168" rx="9" ry="4.5" fill="#0f172a" />
          {/* Torso (Modest long-sleeve/neat collared corporate shirt) */}
          <path d="M16 52 Q32 46 48 52 L50 110 L14 110 Z" fill="#ffffff" stroke="#0f2b5c" strokeOpacity="0.2" />
          {/* Collar & Lanyard */}
          <polygon points="27,50 32,60 37,50" fill="#e2e8f0" />
          <line x1="32" y1="56" x2="32" y2="80" stroke="#f59e0b" strokeWidth="2" />
          <rect x="28" y="78" width="8" height="10" rx="1" fill="#0f2b5c" />
          {/* Head & Hair */}
          <circle cx="32" cy="28" r="14" fill="#d9a074" />
          <path d="M18 26 C18 14, 46 14, 46 25 C43 19, 21 19, 18 26 Z" fill="#1e293b" />
          {/* Arm & Book held cleanly */}
          <path d="M46 58 L58 84 L44 92" fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="38" y="76" width="22" height="28" rx="2" fill="#0f2b5c" transform="rotate(-10 48 90)" />
          <rect x="41" y="80" width="16" height="4" rx="1" fill="#f59e0b" transform="rotate(-10 48 90)" />
        </g>

        {/* Student 2 (Female, center-right): Modest hijab/tudung labuh, long tunic & slacks, backpack, holding books */}
        <g transform="translate(362, 238)">
          <ellipse cx="32" cy="172" rx="27" ry="6" fill="#0f2b5c" fillOpacity="0.14" />
          {/* Backpack */}
          <rect x="14" y="54" width="36" height="50" rx="10" fill="#0f2b5c" />
          {/* Modest long skirt / wide trousers */}
          <path d="M18 106 L14 162 L29 162 L32 120 L37 162 L50 162 L46 106 Z" fill="#0f2b5c" />
          <ellipse cx="21" cy="164" rx="8" ry="4" fill="#1e293b" />
          <ellipse cx="44" cy="164" rx="8" ry="4" fill="#1e293b" />
          {/* Modest long tunic (baju labuh sopan) */}
          <path d="M15 52 Q32 46 49 52 L53 122 L11 122 Z" fill="#eff6ff" stroke="#1e40af" strokeOpacity="0.22" />
          {/* Modest Hijab / Tudung */}
          <path d="M16 28 C16 11, 48 11, 48 28 L52 62 Q32 72 12 62 Z" fill="#1e40af" />
          <circle cx="32" cy="29" r="11" fill="#e0ac82" />
          {/* Books held with both hands */}
          <rect x="19" y="74" width="26" height="20" rx="2" fill="#f59e0b" />
          <rect x="21" y="70" width="24" height="6" rx="1" fill="#ffffff" stroke="#0f2b5c" strokeOpacity="0.25" />
          <path d="M14 58 L20 84" fill="none" stroke="#eff6ff" strokeWidth="8" strokeLinecap="round" />
          <path d="M50 58 L44 84" fill="none" stroke="#eff6ff" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* Student 3 (Male, right background walking toward hall): Neat polo/shirt, backpack */}
        <g transform="translate(505, 248) scale(0.88)">
          <ellipse cx="32" cy="164" rx="24" ry="5" fill="#0f2b5c" fillOpacity="0.12" />
          <rect x="12" y="54" width="36" height="48" rx="9" fill="#334155" />
          <path d="M21 104 L18 156 L29 156 L32 114 L38 156 L48 156 L43 104 Z" fill="#1e293b" />
          <path d="M16 52 Q32 46 48 52 L50 106 L14 106 Z" fill="#dbeafe" stroke="#1e40af" strokeOpacity="0.2" />
          <circle cx="32" cy="28" r="13.5" fill="#d4956a" />
          <path d="M18 26 C18 13, 46 13, 46 25 C41 18, 23 18, 18 26 Z" fill="#0f172a" />
          <rect x="38" y="76" width="18" height="24" rx="2" fill="#1e40af" />
        </g>

        {/* Subtle Architectural Caption Strip Inside Bottom */}
        <rect x="20" y="416" width="760" height="28" rx="6" fill="#ffffff" fillOpacity="0.9" />
        <text
          x="400"
          y="434"
          textAnchor="middle"
          fill="#0f2b5c"
          fontSize="12"
          fontWeight="600"
          fontFamily="DM Sans, sans-serif"
        >
          Suasana Kampus Beretika · Pemakaian Kemas &amp; Sopan · Disiplin Kehadiran Menuju Kelas Amali
        </text>
      </svg>
    </div>
  );
}

export function WorkshopAmaliScene() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[#0f2b5c]/12 bg-[#ffffff]">
      <svg
        viewBox="0 0 760 400"
        className="h-auto w-full block"
        role="img"
        aria-label="Ilustrasi bengkel latihan pendawaian elektrik 3-fasa dan papan agihan di GIS College"
      >
        <rect width="760" height="400" fill="#f8fafc" />
        {/* Architectural grid lines */}
        <path d="M0 80 H760 M0 160 H760 M0 240 H760 M0 320 H760" stroke="#0f2b5c" strokeOpacity="0.05" />
        <path d="M120 0 V400 M240 0 V400 M360 0 V400 M480 0 V400 M600 0 V400" stroke="#0f2b5c" strokeOpacity="0.05" />

        {/* Training Bay Frame */}
        <rect x="48" y="36" width="664" height="328" rx="8" fill="#ffffff" stroke="#0f2b5c" strokeOpacity="0.16" strokeWidth="1.5" />
        <rect x="48" y="36" width="664" height="40" rx="8" fill="#0f2b5c" />
        <text x="72" y="61" fill="#ffffff" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          STESEN LATIHAN PENDAWAIAN 3-FASA &amp; PAPAN AGIHAN (DB)
        </text>
        <text x="688" y="61" textAnchor="end" fill="#f59e0b" fontSize="12" fontWeight="600" fontFamily="JetBrains Mono, monospace">
          AMALI 70% · RCCB 30mA
        </text>

        {/* Left: Main Distribution Board (DB Box) */}
        <rect x="84" y="104" width="220" height="224" rx="6" fill="#f1f5f9" stroke="#0f2b5c" strokeWidth="2" />
        <rect x="98" y="118" width="192" height="32" rx="3" fill="#0f2b5c" />
        <text x="194" y="138" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
          MAIN SWITCH / RCCB / MCB
        </text>

        {/* Breaker switches row */}
        {[106, 134, 162, 190, 218, 246].map((bx, i) => (
          <g key={bx}>
            <rect x={bx} y="168" width="22" height="58" rx="2" fill="#ffffff" stroke="#0f2b5c" strokeOpacity="0.4" />
            <rect x={bx + 4} y={i < 2 ? 178 : 196} width="14" height="14" rx="1" fill={i === 0 ? '#f59e0b' : '#1e40af'} />
          </g>
        ))}

        {/* Copper Busbar & Earth Bar */}
        <rect x="106" y="246" width="176" height="12" rx="2" fill="#d97706" />
        <rect x="106" y="272" width="176" height="10" rx="2" fill="#16a34a" />
        <text x="194" y="306" textAnchor="middle" fill="#0f2b5c" fontSize="11" fontWeight="600" fontFamily="DM Sans, sans-serif">
          Penebat &amp; Pembumian Teruji
        </text>

        {/* Conduit Piping Connections (Red/Yellow/Blue Phase) */}
        <path d="M304 148 H392 V132 H446" fill="none" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
        <path d="M304 176 H408 V180 H446" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        <path d="M304 204 H392 V228 H446" fill="none" stroke="#1e40af" strokeWidth="4" strokeLinecap="round" />

        {/* Right: Motor Control & Testing Bench */}
        <rect x="446" y="104" width="230" height="142" rx="6" fill="#eff6ff" stroke="#1e40af" strokeOpacity="0.35" strokeWidth="1.5" />
        <text x="561" y="128" textAnchor="middle" fill="#0f2b5c" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          Panel Kawalan Motor &amp; Beban
        </text>
        {/* Phase indicator lamps */}
        <circle cx="496" cy="162" r="14" fill="#dc2626" fillOpacity="0.2" stroke="#dc2626" strokeWidth="2" />
        <circle cx="496" cy="162" r="6" fill="#dc2626" />
        <circle cx="561" cy="162" r="14" fill="#f59e0b" fillOpacity="0.25" stroke="#d97706" strokeWidth="2" />
        <circle cx="561" cy="162" r="6" fill="#f59e0b" />
        <circle cx="626" cy="162" r="14" fill="#1e40af" fillOpacity="0.2" stroke="#1e40af" strokeWidth="2" />
        <circle cx="626" cy="162" r="6" fill="#1e40af" />
        <text x="496" y="194" textAnchor="middle" fill="#0f2b5c" fontSize="10" fontFamily="JetBrains Mono, monospace">L1</text>
        <text x="561" y="194" textAnchor="middle" fill="#0f2b5c" fontSize="10" fontFamily="JetBrains Mono, monospace">L2</text>
        <text x="626" y="194" textAnchor="middle" fill="#0f2b5c" fontSize="10" fontFamily="JetBrains Mono, monospace">L3</text>

        {/* Digital Multimeter */}
        <rect x="446" y="262" width="230" height="66" rx="6" fill="#ffffff" stroke="#0f2b5c" strokeOpacity="0.2" />
        <rect x="462" y="274" width="88" height="42" rx="4" fill="#0f2b5c" />
        <text x="506" y="300" textAnchor="middle" fill="#f59e0b" fontSize="15" fontWeight="700" fontFamily="JetBrains Mono, monospace">
          415.0 V
        </text>
        <text x="566" y="291" fill="#0f2b5c" fontSize="12" fontWeight="600" fontFamily="DM Sans, sans-serif">
          Ujian Voltan &amp; Keterusan
        </text>
        <text x="566" y="308" fill="#475569" fontSize="11" fontFamily="DM Sans, sans-serif">
          Diselia Pensyarah Bertauliah
        </text>
      </svg>
    </div>
  );
}

export function OshaSafetyScene() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[#0f2b5c]/12 bg-[#ffffff]">
      <svg
        viewBox="0 0 760 400"
        className="h-auto w-full block"
        role="img"
        aria-label="Ilustrasi pematuhan piawaian keselamatan OSHA, PPE lengkap dan prosedur Lockout-Tagout di GIS College"
      >
        <rect width="760" height="400" fill="#f8fafc" />
        <rect x="48" y="36" width="664" height="328" rx="8" fill="#ffffff" stroke="#0f2b5c" strokeOpacity="0.16" strokeWidth="1.5" />
        <rect x="48" y="36" width="664" height="40" rx="8" fill="#0f2b5c" />
        <text x="72" y="61" fill="#ffffff" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          PROTOKOL KESELAMATAN BENGKEL (PEMATUHAN OSHA)
        </text>
        <text x="688" y="61" textAnchor="end" fill="#f59e0b" fontSize="12" fontWeight="600" fontFamily="JetBrains Mono, monospace">
          PPE WAJIB · SIFAR KOMPROMI
        </text>

        {/* 3 PPE / Safety Stations */}
        {[
          {
            x: 84,
            code: 'LANGKAH 01',
            title: 'Sarung Tangan & Gogal Penebat',
            sub: 'Perlindungan sentuhan & percikan arka',
          },
          {
            x: 282,
            code: 'LANGKAH 02',
            title: 'Lockout / Tagout (LOTO)',
            sub: 'Pengasingan litar sebelum penyelenggaraan',
          },
          {
            x: 480,
            code: 'LANGKAH 03',
            title: 'Kasut Keselamatan Berpenebat',
            sub: 'Tapak anti-gelincir & penebat voltan',
          },
        ].map((item, idx) => (
          <g key={item.code} transform={`translate(${item.x}, 104)`}>
            <rect width="196" height="224" rx="6" fill="#f8fafc" stroke="#0f2b5c" strokeOpacity="0.15" />
            <circle cx="98" cy="76" r="38" fill="#eff6ff" stroke="#1e40af" strokeOpacity="0.25" strokeWidth="2" />
            {idx === 0 && (
              <path
                d="M78 76 C78 60, 118 60, 118 76 C118 92, 78 92, 78 76 Z M88 76 H108"
                fill="none"
                stroke="#0f2b5c"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}
            {idx === 1 && (
              <g>
                <rect x="82" y="72" width="32" height="24" rx="3" fill="#f59e0b" />
                <path d="M88 72 V62 C88 54, 108 54, 108 62 V72" fill="none" stroke="#0f2b5c" strokeWidth="3.5" />
              </g>
            )}
            {idx === 2 && (
              <path
                d="M76 88 H118 L112 72 H94 L86 60 H76 V88 Z"
                fill="#0f2b5c"
              />
            )}
            <text x="98" y="142" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono, monospace">
              {item.code}
            </text>
            <text x="98" y="166" textAnchor="middle" fill="#0f2b5c" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
              {item.title.split(' ').slice(0, 2).join(' ')}
            </text>
            <text x="98" y="183" textAnchor="middle" fill="#0f2b5c" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
              {item.title.split(' ').slice(2).join(' ')}
            </text>
            <text x="98" y="206" textAnchor="middle" fill="#475569" fontSize="10.5" fontFamily="DM Sans, sans-serif">
              {item.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
