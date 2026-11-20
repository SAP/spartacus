/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { BaseSiteService } from '../facade/base-site.service';
import { LanguageService } from '../facade/language.service';
import { MockBaseSiteService } from './mock-base-site.service';
import { MockLanguageService } from './mock-language.service';
import { SiteContextTestingModule } from './site-context-testing.module';

describe('SiteContextTestingModule', () => {
  let languageService: LanguageService;
  let baseSiteService: BaseSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SiteContextTestingModule] });
    languageService = TestBed.inject(LanguageService);
    baseSiteService = TestBed.inject(BaseSiteService);
  });

  it('should provide mock language and base-site services', () => {
    expect(languageService).toBeInstanceOf(MockLanguageService);
    expect(baseSiteService).toBeInstanceOf(MockBaseSiteService);
  });

  it('should return defaults', async () => {
    expect(await firstValueFrom(languageService.getActive())).toBe('en');
    expect(await firstValueFrom(baseSiteService.getAll())).toEqual([]);
  });

  it('should allow overriding a method return value with vi.spyOn', async () => {
    vi.spyOn(languageService, 'getActive').mockReturnValue(of('de'));
    expect(await firstValueFrom(languageService.getActive())).toBe('de');
  });
});
