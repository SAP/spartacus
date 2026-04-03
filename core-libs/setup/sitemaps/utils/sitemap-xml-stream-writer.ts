/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'node:fs';
import { join } from 'node:path';
import { escapeXml } from './xml-utils';
import { SitemapUrlEntry } from '../model/sitemap.model';

const SITEMAP_XML_HEADER = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
const SITEMAP_XML_FOOTER = `</urlset>\n`;

/**
 * Writes sitemap XML files to disk using streaming I/O.
 *
 * Instead of building the full XML in memory, this writer streams
 * URL entries directly to disk. This is critical for large-scale
 * sites with millions of products — avoids OOM errors.
 *
 * ## Usage flow
 *
 * ```
 * const writer = new SitemapXmlStreamWriter('/output/dir');
 * const handle = writer.openFile('electronics-spa/sitemap-en-1.xml');
 * writer.writeEntries(handle, entries);  // can call multiple times
 * writer.closeFile(handle);
 * writer.writeSitemapIndex('sitemap.xml', indexEntries);
 * ```
 */
export class SitemapXmlStreamWriter {
  /** Tracks open file handles for cleanup on error */
  private openHandles = new Map<string, WriteStream>();

  constructor(private readonly outputDir: string) {
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
  }

  /**
   * Opens a new sitemap XML file and writes the XML header.
   * Returns a handle identifier for subsequent writes.
   */
  openFile(relativePath: string): string {
    const fullPath = join(this.outputDir, relativePath);
    const dir = fullPath.substring(0, fullPath.lastIndexOf('/'));
    if (dir && !existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    const stream = createWriteStream(fullPath, { encoding: 'utf-8' });
    stream.write(SITEMAP_XML_HEADER);
    this.openHandles.set(relativePath, stream);

    return relativePath;
  }

  /**
   * Writes URL entries to an open sitemap file.
   * Can be called multiple times for the same handle (streaming batches).
   */
  writeEntries(handle: string, entries: SitemapUrlEntry[]): void {
    const stream = this.openHandles.get(handle);
    if (!stream) {
      throw new Error(`[SitemapXmlStreamWriter] No open file for handle: ${handle}`);
    }

    for (const entry of entries) {
      stream.write(this.buildUrlElement(entry));
    }
  }

  /**
   * Closes a sitemap file (writes footer + closes stream).
   * Returns a promise that resolves when the file is fully flushed to disk.
   */
  async closeFile(handle: string): Promise<void> {
    const stream = this.openHandles.get(handle);
    if (!stream) {
      return;
    }

    return new Promise<void>((resolve, reject) => {
      stream.write(SITEMAP_XML_FOOTER, () => {
        stream.end(() => {
          this.openHandles.delete(handle);
          resolve();
        });
      });
      stream.on('error', reject);
    });
  }

  /**
   * Writes a complete sitemap file in one shot (for small files like index).
   */
  async writeFile(relativePath: string, content: string): Promise<void> {
    const fullPath = join(this.outputDir, relativePath);
    const dir = fullPath.substring(0, fullPath.lastIndexOf('/'));
    if (dir && !existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    return new Promise<void>((resolve, reject) => {
      const stream = createWriteStream(fullPath, { encoding: 'utf-8' });
      stream.write(content, () => {
        stream.end(() => resolve());
      });
      stream.on('error', reject);
    });
  }

  /**
   * Writes a sitemap index XML file referencing all generated sitemaps.
   */
  async writeSitemapIndex(
    files: string[],
    baseUrls: Record<string, string>,
    servePath: string = '/sitemaps'
  ): Promise<void> {
    const today = new Date().toISOString().split('T')[0];

    const sitemapElements = files
      .map((file) => {
        const baseSiteId = file.split('/')[0];
        const baseUrl = baseUrls[baseSiteId] || '';
        return `  <sitemap>\n    <loc>${escapeXml(baseUrl)}${servePath}/${file}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`;
      })
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapElements}\n</sitemapindex>\n`;

    await this.writeFile('sitemap.xml', xml);
  }

  /**
   * Closes all open file handles. Call on error/abort for cleanup.
   */
  async closeAll(): Promise<void> {
    const promises: Promise<void>[] = [];
    for (const handle of this.openHandles.keys()) {
      promises.push(this.closeFile(handle));
    }
    await Promise.all(promises);
  }

  private buildUrlElement(entry: SitemapUrlEntry): string {
    let xml = `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n`;
    if (entry.lastmod) {
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    }
    if (entry.changefreq) {
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    }
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }
    xml += `  </url>\n`;
    return xml;
  }
}

