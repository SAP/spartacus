/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '../../config/config-providers';
import { ContentPageMetaResolver } from './content-page-meta.resolver';
import { PageMetaResolver } from './page-meta.resolver';
import { defaultPageMetaFactory } from './config/default-page-meta-factory';

@NgModule({
  providers: [
    {
      provide: PageMetaResolver,
      useExisting: ContentPageMetaResolver,
      multi: true,
    },
  ],
})
export class PageMetaModule {
  static forRoot(): ModuleWithProviders<PageMetaModule> {
    return {
      ngModule: PageMetaModule,
      providers: [provideDefaultConfigFactory(defaultPageMetaFactory)],
    };
  }
}
