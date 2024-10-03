/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CpqConfiguratorRestInterceptor } from './cpq-configurator-rest.interceptor';
import { defaultCpqConfiguratorAuthConfig } from './default-cpq-configurator-auth.config';
/**
 * @deprecated since 2211.25. Not needed for commerce based CPQ orchestration (which is the default communication flavour).
 * Refer to configuration setting ConfiguratorCoreConfig.productConfigurator.cpqOverOcc = true.
 * The other flavour (performing direct calls from composable storefront to CPQ) is technically no longer supported.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CpqConfiguratorRestInterceptor,
      multi: true,
    },
    provideDefaultConfig(defaultCpqConfiguratorAuthConfig),
  ],
})
export class CpqConfiguratorInterceptorModule {}
