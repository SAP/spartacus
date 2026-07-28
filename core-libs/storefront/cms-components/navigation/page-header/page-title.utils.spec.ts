/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageMeta, PageMetaService } from '@spartacus/core';
import { of } from 'rxjs';
import { getPageTitle } from './page-title.utils';

describe('getPageTitle', () => {
  let pageMetaService: jasmine.SpyObj<PageMetaService>;

  beforeEach(() => {
    pageMetaService = jasmine.createSpyObj('PageMetaService', ['getMeta']);
  });

  it('should return heading from pageMetaService when heading is present', (done) => {
    const meta: PageMeta = { heading: 'Page Heading', title: 'Page Title' };
    pageMetaService.getMeta.and.returnValue(of(meta));

    getPageTitle(pageMetaService).subscribe((result) => {
      expect(result).toBe('Page Heading');
      done();
    });
  });

  it('should fall back to title when heading is absent', (done) => {
    const meta: PageMeta = { title: 'Page Title' };
    pageMetaService.getMeta.and.returnValue(of(meta));

    getPageTitle(pageMetaService).subscribe((result) => {
      expect(result).toBe('Page Title');
      done();
    });
  });

  it('should return empty string when both heading and title are absent', (done) => {
    const meta: PageMeta = {};
    pageMetaService.getMeta.and.returnValue(of(meta));

    getPageTitle(pageMetaService).subscribe((result) => {
      expect(result).toBe('');
      done();
    });
  });

  it('should filter out null meta emissions', (done) => {
    pageMetaService.getMeta.and.returnValue(
      of(null, { heading: 'After Null' }) as any
    );

    const results: string[] = [];
    getPageTitle(pageMetaService).subscribe({
      next: (result) => results.push(result),
      complete: () => {
        expect(results).toEqual(['After Null']);
        done();
      },
    });
  });
});
