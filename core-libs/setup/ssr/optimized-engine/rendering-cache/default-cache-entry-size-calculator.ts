/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CacheEntrySizeCalculator } from '../ssr-optimization-options';
import { RenderingEntry } from './rendering-cache.model';

/**
 * Default implementation of the cache entry size calculator.
 *
 * For HTML string, it assumes each character is 2 bytes (utf-8 encoding).
 *
 * For error object, it sums sizes of the `name`, `message` and `stack` string properties.
 *
 * CAUTION: the error object can be potentially anything and can have more properties (not necessarily strings),
 *          so it's just an approximation and it's prone to under-estimation!
 *
 * Note: it's not recommended to cache error objects.
 */
export class DefaultCacheEntrySizeCalculator
  implements CacheEntrySizeCalculator
{
  calculateSize(entry: RenderingEntry): number {
    // entry should have either `html` or `err` property
    if (entry.html) {
      return this.calculateHtmlSize(entry.html);
    }
    if (entry.err) {
      return this.calculateErrorSize(entry.err);
    }
    return 0;
  }

  /**
   * Calculates the size of the rendered HTML.
   *
   * It assumes each character is 2 bytes (utf-8 encoding).
   */
  protected calculateHtmlSize(html: string): number {
    return this.getStringSize(html);
  }

  /**
   * Roughly approximates the size of the error, by calculating the size of 3 string properties:
   * - name
   * - message
   * - stack
   */
  protected calculateErrorSize(error: any): number {
    let size = 0;
    const properties = ['name', 'message', 'stack'];
    properties.forEach((property) => {
      if (error?.[property]) {
        size += this.getStringSize(error[property]);
      }
    });
    return size;
  }

  /**
   * Returns the size of the string in bytes.
   *
   * It assumes each character is 2 bytes (utf-8 encoding).
   */
  protected getStringSize(str: string): number {
    return 2 * Buffer.byteLength(str, 'utf8');
  }
}
