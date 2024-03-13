/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {ModuleWithProviders, NgModule} from '@angular/core';
import {defaultPageMetaConfig} from './config/default-page-meta.config';
import {ContentPageMetaResolver} from './content-page-meta.resolver';
import {PageMetaResolver} from './page-meta.resolver';
import {provideDefaultConfig} from "@spartacus/core";

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
      providers: [provideDefaultConfig(defaultPageMetaConfig)],
    };
  }
}
