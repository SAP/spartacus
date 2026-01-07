/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CacheEntrySizeCalculator,
  RenderingEntry,
} from './rendering-cache.model';

/**
 * Default implementation of the cache entry size calculator.
 *
 * For HTML string, it returns the size of the string in bytes, assuming 2 bytes per each character
 * (an upper-bound estimation assuming V8 is using `SeqTwoByteString` for string cache entries).
 *
 * For error object, it only roughly approximates the size - it sums sizes of the `name`, `message` and `stack` string properties.
 *
 * **CAUTION**: the error object can be potentially anything and can have more properties (not necessarily strings),
 *          so it's prone to under-estimation!
 *          It's not recommended to cache error objects.
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
   * Returns string size in bytes for NodeJS V8 engine.
   * Uses 2 bytes per character as an upper-bound estimate.
   *
   * V8 can use either one or two bytes per character, but for Spartacus SSR
   * it consistently uses two-byte-per-character strings (`SeqTwoByteString`)
   * which was verified through heap snapshots and memory measurements.
   *
   * For more on V8's `SeqTwoByteString`, see https://github.com/v8/v8/blob/c865b8257a/src/objects/string.h#L921-L923
   */
  protected getStringSize(str: string): number {
    return 2 * str.length;
  }
}
