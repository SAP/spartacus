/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageMeta, PageMetaService } from '@spartacus/core';
import { firstValueFrom, of } from 'rxjs';
import { getPageTitle } from './page-title.utils';

describe('getPageTitle', () => {
  let pageMetaService: any;

  beforeEach(() => {
    pageMetaService = { getMeta: vi.fn() };
  });

  it('should return heading from pageMetaService when heading is present', async () => {
    const meta: PageMeta = { heading: 'Page Heading', title: 'Page Title' };
    pageMetaService.getMeta.mockReturnValue(of(meta));

    const result = await firstValueFrom(getPageTitle(pageMetaService));
    expect(result).toBe('Page Heading');
  });

  it('should fall back to title when heading is absent', async () => {
    const meta: PageMeta = { title: 'Page Title' };
    pageMetaService.getMeta.mockReturnValue(of(meta));

    const result = await firstValueFrom(getPageTitle(pageMetaService));
    expect(result).toBe('Page Title');
  });

  it('should return empty string when both heading and title are absent', async () => {
    const meta: PageMeta = {};
    pageMetaService.getMeta.mockReturnValue(of(meta));

    const result = await firstValueFrom(getPageTitle(pageMetaService));
    expect(result).toBe('');
  });

  it('should filter out null meta emissions', async () => {
    pageMetaService.getMeta.mockReturnValue(
      of(null, { heading: 'After Null' }) as any
    );

    const results: string[] = [];
    await new Promise<void>((resolve) => {
      getPageTitle(pageMetaService).subscribe({
        next: (result) => results.push(result),
        complete: () => resolve(),
      });
    });
    expect(results).toEqual(['After Null']);
  });
});
