/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BaseSiteService } from '../facade/base-site.service';
import { LanguageService } from '../facade/language.service';
import { MockBaseSiteService } from './mock-base-site.service';
import { MockLanguageService } from './mock-language.service';

/**
 * Provides default mocks for {@link LanguageService} and {@link BaseSiteService}.
 */
@NgModule({
  providers: [
    { provide: LanguageService, useClass: MockLanguageService },
    { provide: BaseSiteService, useClass: MockBaseSiteService },
  ],
})
export class SiteContextTestingModule {}
