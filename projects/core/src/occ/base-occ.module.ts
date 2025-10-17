/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '../config/config-providers';
import { provideConfigValidator } from '../config/config-validator/config-validator';
import { CmsOccModule } from './adapters/cms/cms-occ.module';
import { SiteContextOccModule } from './adapters/site-context/site-context-occ.module';
import { defaultOccConfigFactory } from './config/default-occ-config-factory';
import { occConfigValidator } from './config/occ-config-validator';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';

@NgModule({
  imports: [CmsOccModule, SiteContextOccModule],
})
export class BaseOccModule {
  static forRoot(): ModuleWithProviders<BaseOccModule> {
    return {
      ngModule: BaseOccModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: WithCredentialsInterceptor,
          multi: true,
        },
        provideConfigValidator(occConfigValidator),
        provideDefaultConfigFactory(defaultOccConfigFactory),
      ],
    };
  }
}
