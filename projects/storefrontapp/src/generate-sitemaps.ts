/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Sitemap CLI entry point for storefrontapp.
 *
 * Bundled by esbuild (via sitemapCliEntryPlugin) into
 * `dist/storefrontapp/server/generate-sitemaps.mjs`.
 *
 * Usage (after `nx build storefrontapp`):
 *   node dist/storefrontapp/server/generate-sitemaps.mjs --occ-url https://api.example.com
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Parse CLI args and set env vars BEFORE any Angular imports ──────
// Angular reads process.env at module load time, so we must set these
// synchronously at the top of this module, before dynamic-importing
// main.server (which triggers Angular module initialization).

const cliArgs = process.argv.slice(2);
let outputDir = './dist/sitemaps';
let occBaseUrl = process.env['OCC_BACKEND_BASE_URL'] || '';
let insecure = process.env['NODE_TLS_REJECT_UNAUTHORIZED'] === '0';

for (let i = 0; i < cliArgs.length; i++) {
  switch (cliArgs[i]) {
    case '--output':
      outputDir = cliArgs[++i];
      break;
    case '--occ-url':
      occBaseUrl = cliArgs[++i];
      break;
    case '--insecure':
      insecure = true;
      break;
    case '--help':
      console.log(`
  Spartacus Sitemap Generator

  Usage: node generate-sitemaps.mjs [options]

  Options:
    --output <dir>    Output directory (default: ./dist/sitemaps)
    --occ-url <url>   OCC backend base URL
    --insecure        Disable SSL cert verification (self-signed certs)
    --help            Show this help
`);
      process.exit(0);
  }
}

// Set env vars BEFORE Angular modules are loaded (dynamic import below).
if (!process.env['SERVER_REQUEST_ORIGIN']) {
  process.env['SERVER_REQUEST_ORIGIN'] = 'http://localhost:4000';
}
if (occBaseUrl) {
  process.env['OCC_BACKEND_BASE_URL'] = occBaseUrl;
}
if (insecure) {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

outputDir = resolve(outputDir);

// ── Now dynamically import Angular (env vars are already set) ───────

(async () => {
  // Dynamic imports so that process.env is set before Angular reads it.
  const { renderApplication } = await import('@angular/platform-server');
  const { default: bootstrap } = await import('./main.server');

  // ── Load index.server.html ──────────────────────────────────────

  const serverDir = dirname(fileURLToPath(import.meta.url));
  const indexPath = join(serverDir, 'index.server.html');
  let doc = existsSync(indexPath)
    ? readFileSync(indexPath, 'utf-8')
    : '<!DOCTYPE html><html lang="en"><head></head><body><app-root></app-root></body></html>';

  if (occBaseUrl) {
    doc = doc.replace(/OCC_BACKEND_BASE_URL_VALUE/g, occBaseUrl);
  }

  // ── Render ──────────────────────────────────────────────────────

  console.log('═══════════════════════════════════════════════════════');
  console.log('  Spartacus Sitemap Generator');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  Output dir: ${outputDir}`);
  if (occBaseUrl) console.log(`  OCC URL:    ${occBaseUrl}`);
  if (insecure) console.warn('  ⚠️  SSL certificate verification disabled');
  console.log('\n  🔄 Rendering application for sitemap discovery...\n');

  const t0 = Date.now();
  const TIMEOUT = 60_000;

  let html: string;
  try {
    html = await Promise.race([
      renderApplication(bootstrap, {
        document: doc,
        url: process.env['SERVER_REQUEST_ORIGIN'] || 'http://localhost:4000',
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error(`SSR render timed out after ${TIMEOUT / 1000}s`)),
          TIMEOUT
        )
      ),
    ]);
  } catch (e: any) {
    console.error(`  ❌ ${e.message || e}`);
    process.exit(1);
  }

  console.log(
    `  ✅ Render completed in ${Date.now() - t0}ms  (${(html.length / 1024).toFixed(0)} KB)\n`
  );

  // ── Extract sitemap data ────────────────────────────────────────

  const match = html.match(
    /<script\s+id="cxSitemapData"\s+type="application\/json">([\s\S]*?)<\/script>/
  );
  if (!match?.[1]) {
    console.error(
      '  ❌ No <script id="cxSitemapData"> in rendered HTML.\n' +
        '  Ensure provideSitemapFileGenerator() is in app.config.server.ts\n'
    );
    process.exit(1);
  }

  const data = JSON.parse(match[1].replace(/\\u003C/g, '<'));
  if (data.error) {
    console.error(`  ❌ ${data.error}`);
    process.exit(1);
  }

  // ── Write XML files ─────────────────────────────────────────────

  console.log(`  📁 Writing ${Object.keys(data.sitemaps).length} file(s):\n`);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  for (const [name, xml] of Object.entries(data.sitemaps)) {
    const fp = join(outputDir, name);
    const dir = dirname(fp);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(fp, xml as string, 'utf-8');
    console.log(
      `    ✓ ${name}  (${(Buffer.byteLength(xml as string, 'utf-8') / 1024).toFixed(1)} KB)`
    );
  }

  // ── Summary ─────────────────────────────────────────────────────

  console.log('\n═══════════════════════════════════════════════════════');
  console.log(`  ✅ Done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  console.log(
    `  Files: ${data.files?.length ?? Object.keys(data.sitemaps).length}   URLs: ${data.totalUrls}`
  );
  if (data.urlsByLanguage) {
    for (const [lang, count] of Object.entries(data.urlsByLanguage)) {
      console.log(`    ${lang}: ${count}`);
    }
  }
  console.log('═══════════════════════════════════════════════════════\n');
})().catch((err) => {
  console.error('[Sitemap CLI] Fatal error:', err);
  process.exit(1);
});

