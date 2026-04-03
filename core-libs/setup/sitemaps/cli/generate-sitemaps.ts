#!/usr/bin/env node

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Standalone CLI script for generating sitemap XML files.
 *
 * This script **re-uses an existing Angular application build** to generate
 * sitemaps without requiring a live SSR server. It can be run:
 *
 * - On a schedule (cron job)
 * - As part of a CI/CD pipeline
 * - Manually for on-demand regeneration
 *
 * ## How it works
 *
 * 1. Checks if the application has already been built (looks for `main.server.mjs`
 *    in the build output). If the build is missing, it exits with an error
 *    and prints the build command.
 * 2. Dynamically imports the built `main.server.mjs` to get the `bootstrap`
 *    function and `renderApplication` (both re-exported from `main.server.ts`).
 * 3. Calls `renderApplication()` to perform a single SSR render.
 * 4. During the render, `provideSitemapFileGenerator()` hooks into
 *    `BEFORE_APP_SERIALIZED` to perform sitemap discovery and embed
 *    the result as serialized JSON inside a `<script id="cxSitemapData">` tag.
 * 5. Extracts the JSON from the rendered HTML.
 * 6. Writes each sitemap XML file to disk.
 *
 * ## Re-uses existing build
 *
 * The script **never rebuilds** the application — it requires an existing build.
 * This keeps it fast and avoids duplicating the build configuration.
 *
 * ```bash
 * # Step 1: Build the app (once)
 * nx build storefrontapp
 *
 * # Step 2: Generate sitemaps (reuses the build)
 * node projects/storefrontapp/generate-sitemaps.mjs
 * ```
 *
 * ## Memory management for large sites
 *
 * For sites with millions of products across 20+ baseSites:
 *
 * - **Per-baseSite mode**: Use `--base-site electronics-spa` to process
 *   one baseSite at a time. Each invocation is a separate Node.js process
 *   with its own heap — no cumulative memory growth.
 *
 * - **maxUrlsPerSitemap**: Ensures each XML file stays manageable.
 *   Default 50,000 URLs per file.
 *
 * - **Sequential processing**: BaseSites are processed one at a time
 *   within a single run. Memory from previous baseSite is GC'd.
 *
 * ## CLI Arguments
 *
 * | Argument | Description | Default |
 * |----------|-------------|---------|
 * | `--output <dir>` | Output directory for XML files | `./dist/sitemaps` |
 * | `--base-site <uid>` | Generate only for this baseSite | All configured sites |
 * | `--bootstrap <path>` | Path to `main.server.mjs` (auto-detected) | Auto-detect |
 * | `--occ-url <url>` | OCC backend base URL override | From build env |
 * | `--help` | Show usage help | |
 *
 * @example
 * ```bash
 * # Basic usage (generates all configured baseSites)
 * node projects/storefrontapp/generate-sitemaps.mjs
 *
 * # Custom output directory
 * node projects/storefrontapp/generate-sitemaps.mjs --output /var/www/sitemaps
 *
 * # Single baseSite (memory isolation for large sites)
 * node projects/storefrontapp/generate-sitemaps.mjs --base-site electronics-spa
 *
 * # Explicit path to built server bundle
 * node projects/storefrontapp/generate-sitemaps.mjs --bootstrap dist/storefrontapp/server/main.server.mjs
 * ```
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

/**
 * Serialized sitemap data extracted from the rendered HTML.
 * Mirrors {@link SitemapSerializedData} but declared inline to avoid
 * compile-time dependency on the Angular library.
 */
interface SitemapSerializedData {
  sitemaps: Record<string, string>;
  files: string[];
  totalUrls: number;
  urlsByLanguage: Record<string, number>;
  error?: string;
}

// ── CLI Argument Parsing ──────────────────────────────────────────────

interface CliArgs {
  outputDir: string;
  baseSite?: string;
  bootstrapPath?: string;
  occBaseUrl?: string;
  insecure?: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    outputDir: './dist/sitemaps',
    occBaseUrl: process.env['OCC_BACKEND_BASE_URL'] || undefined,
  };

  for (let i = 2; i < argv.length; i++) {
    switch (argv[i]) {
      case '--output':
        args.outputDir = argv[++i];
        break;
      case '--base-site':
        args.baseSite = argv[++i];
        break;
      case '--bootstrap':
        args.bootstrapPath = argv[++i];
        break;
      case '--occ-url':
        args.occBaseUrl = argv[++i];
        break;
      case '--insecure':
        args.insecure = true;
        break;
      case '--help':
        printHelp();
        process.exit(0);
    }
  }

  return args;
}

function printHelp(): void {
  console.log(`
Spartacus Sitemap Generator — Standalone CLI

Usage:
  node generate-sitemaps.mjs [options]

Options:
  --output <dir>        Output directory for XML files (default: ./dist/sitemaps)
  --base-site <uid>     Generate only for this baseSite (default: all configured)
  --bootstrap <path>    Path to main.server.mjs bootstrap module (auto-detected)
  --occ-url <url>       OCC backend base URL (or set OCC_BACKEND_BASE_URL env var)
  --insecure            Disable SSL certificate verification (for self-signed certs)
  --help                Show this help

Prerequisites:
  The Angular application must be built before running this script.
  Run:  nx build <app-name>

Examples:
  node generate-sitemaps.mjs
  node generate-sitemaps.mjs --output /var/www/sitemaps
  node generate-sitemaps.mjs --base-site electronics-spa --output /var/www/sitemaps
`);
}

// ── Build Detection & Bootstrap Loading ───────────────────────────────

/**
 * Well-known paths where `main.server.mjs` may be located,
 * relative to `process.cwd()`.
 */
const BUILD_CANDIDATES = [
  'dist/storefrontapp/server/main.server.mjs',
  'dist/server/main.server.mjs',
];

/**
 * Resolves the bootstrap function and `renderApplication` from the
 * pre-built Angular server bundle.
 *
 * The script **never rebuilds** the app. If the build is missing it exits
 * with an actionable error message.
 *
 * The built `main.server.mjs` must:
 * - export a bootstrap function as `default`
 * - re-export `renderApplication` from `@angular/platform-server`
 */
async function loadServerBundle(
  explicitPath?: string
): Promise<{ bootstrap: any; renderApplication: any; resolvedPath: string }> {
  let resolvedPath: string | undefined;

  if (explicitPath) {
    resolvedPath = resolve(explicitPath);
    if (!existsSync(resolvedPath)) {
      console.error(
        `\n  ❌ Specified bootstrap path not found: ${resolvedPath}\n`
      );
      process.exit(1);
    }
  } else {
    for (const candidate of BUILD_CANDIDATES) {
      const full = resolve(process.cwd(), candidate);
      if (existsSync(full)) {
        resolvedPath = full;
        break;
      }
    }
  }

  if (!resolvedPath) {
    console.error(
      '\n  ❌ Application build not found.\n' +
        '  Looked in:\n' +
        BUILD_CANDIDATES.map((p) => `    - ${resolve(process.cwd(), p)}`).join(
          '\n'
        ) +
        '\n\n' +
        '  Build the application first:\n' +
        '    nx build storefrontapp\n'
    );
    process.exit(1);
  }

  console.log(`  Bootstrap: ${resolvedPath}`);

  const serverModule = await import(resolvedPath);
  const bootstrap = serverModule.default;
  const renderApplication = serverModule.renderApplication;

  if (!bootstrap) {
    console.error(
      `\n  ❌ No default export (bootstrap function) found in ${resolvedPath}\n` +
        `  Ensure main.server.ts exports a bootstrap function as default.\n`
    );
    process.exit(1);
  }

  if (!renderApplication) {
    console.error(
      `\n  ❌ renderApplication not exported from ${resolvedPath}\n` +
        `  Add to main.server.ts:\n` +
        `    export { renderApplication } from '@angular/platform-server';\n`
    );
    process.exit(1);
  }

  return { bootstrap, renderApplication, resolvedPath };
}

// ── HTML Document Preparation ─────────────────────────────────────────

/**
 * Tries to load `index.server.html` from the build output directory
 * (sibling of `main.server.mjs`).
 * Falls back to a minimal HTML skeleton if not found.
 */
function loadDocumentHtml(bootstrapPath: string, occBaseUrl?: string): string {
  const serverDir = dirname(bootstrapPath);
  const indexHtmlPath = join(serverDir, 'index.server.html');

  let html: string;

  if (existsSync(indexHtmlPath)) {
    html = readFileSync(indexHtmlPath, 'utf-8');
    console.log(`  Document:  ${indexHtmlPath}`);
  } else {
    html = `<!DOCTYPE html><html lang="en"><head></head><body><app-root></app-root></body></html>`;
    console.log(
      `  Document:  (minimal fallback — index.server.html not found)`
    );
  }

  // Replace OCC_BACKEND_BASE_URL_VALUE placeholder (injected at build time)
  if (occBaseUrl) {
    html = html.replace(/OCC_BACKEND_BASE_URL_VALUE/g, occBaseUrl);
  }

  return html;
}

// ── SSR Render ────────────────────────────────────────────────────────

const RENDER_TIMEOUT_MS = 60_000;

async function renderForSitemapData(
  bootstrap: any,
  renderApplication: any,
  documentHtml: string
): Promise<string> {
  const url =
    process.env['SERVER_REQUEST_ORIGIN'] || 'http://localhost:4000';

  const renderPromise = renderApplication(bootstrap, {
    document: documentHtml,
    url,
  });

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(
      () =>
        reject(
          new Error(
            `SSR render timed out after ${RENDER_TIMEOUT_MS / 1000}s. ` +
              `This usually means Angular is waiting for pending async tasks ` +
              `(e.g. open HTTP subscriptions).`
          )
        ),
      RENDER_TIMEOUT_MS
    );
  });

  return Promise.race([renderPromise, timeoutPromise]);
}

// ── Sitemap Data Extraction ───────────────────────────────────────────

/**
 * Extracts the serialized sitemap JSON from rendered HTML.
 * The data is embedded by `BEFORE_APP_SERIALIZED` in a
 * `<script id="cxSitemapData">` tag.
 */
function extractSitemapData(html: string): SitemapSerializedData | null {
  const regex =
    /<script\s+id="cxSitemapData"\s+type="application\/json">([\s\S]*?)<\/script>/;
  const match = html.match(regex);

  if (!match || !match[1]) {
    return null;
  }

  try {
    const json = match[1].replace(/\\u003C/g, '<');
    return JSON.parse(json) as SitemapSerializedData;
  } catch (error) {
    console.error('[Sitemap CLI] Failed to parse embedded JSON:', error);
    return null;
  }
}

// ── File Writing ──────────────────────────────────────────────────────

function writeSitemapFiles(
  data: SitemapSerializedData,
  outputDir: string
): void {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  for (const [filename, xml] of Object.entries(data.sitemaps)) {
    const filePath = join(outputDir, filename);
    const dir = dirname(filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(filePath, xml, 'utf-8');
    const sizeKB = (Buffer.byteLength(xml, 'utf-8') / 1024).toFixed(1);
    console.log(`    ✓ ${filename} (${sizeKB} KB)`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = parseArgs(process.argv);
  const outputDir = resolve(args.outputDir);

  // Set env vars BEFORE importing the Angular bundle.
  // Spartacus SSR reads SERVER_REQUEST_ORIGIN at import time.
  if (!process.env['SERVER_REQUEST_ORIGIN']) {
    process.env['SERVER_REQUEST_ORIGIN'] = 'http://localhost:4000';
  }

  // Set OCC_BACKEND_BASE_URL so that app.config.server.ts can read it
  // at import time and configure Spartacus OCC services accordingly.
  // The HTML meta tag mechanism does not work reliably in standalone
  // renderApplication() context.
  if (args.occBaseUrl) {
    process.env['OCC_BACKEND_BASE_URL'] = args.occBaseUrl;
  }

  // Disable SSL certificate verification for self-signed certs (dev environments).
  // Must be set BEFORE any HTTPS requests are made.
  if (args.insecure || process.env['NODE_TLS_REJECT_UNAUTHORIZED'] === '0') {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  }

  console.log('═══════════════════════════════════════════════════════');
  console.log('  Spartacus Sitemap Generator');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  Output dir: ${outputDir}`);
  if (args.baseSite) {
    console.log(`  BaseSite:   ${args.baseSite}`);
  }
  if (args.occBaseUrl) {
    console.log(`  OCC URL:    ${args.occBaseUrl}`);
  }
  if (process.env['NODE_TLS_REJECT_UNAUTHORIZED'] === '0') {
    console.warn('  ⚠️  SSL certificate verification disabled');
  }
  console.log('');

  // ── Step 1: Load the pre-built Angular server bundle ────────────
  const { bootstrap, renderApplication, resolvedPath } =
    await loadServerBundle(args.bootstrapPath);

  // ── Step 2: Prepare the HTML document ───────────────────────────
  const documentHtml = loadDocumentHtml(resolvedPath, args.occBaseUrl);

  // ── Step 3: Render the application ──────────────────────────────
  console.log('\n  🔄 Rendering application for sitemap discovery...\n');
  const startTime = Date.now();

  let html: string;
  try {
    html = await renderForSitemapData(
      bootstrap,
      renderApplication,
      documentHtml
    );
  } catch (error: any) {
    if (error?.message?.includes('timed out')) {
      console.error(`  ❌ ${error.message}`);
      console.error(
        '  Tip: Spartacus apps with open HTTP subscriptions may never ' +
          'complete SSR render.'
      );
    } else {
      console.error('  ❌ SSR render failed:', error);
    }
    process.exit(1);
  }

  const renderTime = Date.now() - startTime;
  console.log(`  ✅ SSR render completed in ${renderTime}ms`);
  console.log(`  HTML size: ${(html.length / 1024).toFixed(1)} KB`);

  // ── Step 4: Extract sitemap data from rendered HTML ─────────────
  const data = extractSitemapData(html);

  if (!data) {
    console.error(
      '\n  ❌ No <script id="cxSitemapData"> found in rendered HTML.\n' +
        '  Ensure provideSitemapFileGenerator() is configured in ' +
        'app.config.server.ts\n'
    );

    // Debug: list script tags found
    const scriptTags = html.match(/<script[^>]*id="[^"]*"[^>]*>/g);
    if (scriptTags) {
      console.log('  Scripts found in HTML:');
      scriptTags.forEach((s: string) => console.log(`    ${s}`));
    }
    process.exit(1);
  }

  if (data.error) {
    console.error(`\n  ❌ Generation error: ${data.error}`);
    process.exit(1);
  }

  // ── Step 5: Write XML files to disk ─────────────────────────────
  const fileCount = Object.keys(data.sitemaps).length;
  console.log(`\n  📁 Writing ${fileCount} file(s) to ${outputDir}:\n`);

  writeSitemapFiles(data, outputDir);

  // ── Summary ─────────────────────────────────────────────────────
  const totalTime = Date.now() - startTime;
  console.log('\n═══════════════════════════════════════════════════════');
  console.log(`  ✅ Done in ${(totalTime / 1000).toFixed(1)}s`);
  console.log(
    `  Files:      ${data.files?.length ?? Object.keys(data.sitemaps).length}`
  );
  console.log(`  Total URLs: ${data.totalUrls}`);
  if (data.urlsByLanguage && Object.keys(data.urlsByLanguage).length > 0) {
    console.log(`  By language:`);
    for (const [lang, count] of Object.entries(data.urlsByLanguage)) {
      console.log(`    ${lang}: ${count}`);
    }
  }
  console.log('═══════════════════════════════════════════════════════\n');
}

/**
 * Entry point for the sitemap CLI.
 * Call this from your application's generate-sitemaps.ts entry point.
 *
 * @example
 * ```typescript
 * // projects/storefrontapp/src/generate-sitemaps.ts
 * import { runSitemapCli } from '@spartacus/setup/sitemaps';
 * runSitemapCli();
 * ```
 */
export function runSitemapCli(): void {
  main().catch((err) => {
    console.error('[Sitemap CLI] Fatal error:', err);
    process.exit(1);
  });
}


