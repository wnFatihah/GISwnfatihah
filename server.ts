import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LeadPayload {
  fullName?: string;
  phone?: string;
  email?: string;
}

const WHATSAPP_NUMBER = '60169865648';

function normalizeMalaysianPhone(raw: string): string {
  return raw.replace(/[\s()-]/g, '');
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/leads', async (req, res) => {
    const body = (req.body || {}) as LeadPayload;
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (fullName.length < 2) {
      res.status(400).json({ error: 'Sila masukkan nama penuh yang sah.' });
      return;
    }

    const cleanedPhone = normalizeMalaysianPhone(phone);
    if (!/^(\+?6?01\d{8,9}|0\d{8,10})$/.test(cleanedPhone)) {
      res.status(400).json({ error: 'Sila masukkan nombor telefon Malaysia yang sah (contoh: 016-9865648).' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Sila masukkan alamat emel yang sah.' });
      return;
    }

    const submittedAt = new Date().toISOString();
    let forwardedToSheets = false;

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
    if (scriptUrl) {
      try {
        const sheetResponse = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nama: fullName,
            telefon: phone,
            emel: email,
            program: 'Kursus Elektrik GIS College',
            tarikh: submittedAt,
          }),
          redirect: 'follow',
        });
        forwardedToSheets = sheetResponse.ok;
      } catch (err) {
        console.error('Google Apps Script forwarding error:', err);
      }
    }

    // Store locally as backup log if filesystem is writable
    try {
      const dataDir = path.resolve(__dirname, '.data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const logFile = path.join(dataDir, 'leads.ndjson');
      fs.appendFileSync(
        logFile,
        JSON.stringify({ fullName, phone, email, submittedAt, forwardedToSheets }) + '\n',
        'utf8',
      );
    } catch {
      // Ignore read-only filesystem errors in ephemeral containers
    }

    const waMessage = [
      'Salam sejahtera GIS College Malaysia,',
      'Saya berminat untuk mengetahui maklumat lanjut mengenai Kursus Elektrik (Pengambilan 2026).',
      '',
      `Nama Penuh: ${fullName}`,
      `No. Telefon: ${phone}`,
      `Emel: ${email}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    res.json({
      success: true,
      forwardedToSheets,
      submittedAt,
      whatsappUrl,
    });
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`GIS College server running on http://0.0.0.0:${port}`);
  });
}

startServer();
