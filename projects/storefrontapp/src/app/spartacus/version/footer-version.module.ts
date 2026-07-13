/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { FooterVersionComponent } from './footer-version.component';

/**
 * Example-app-only module that injects the version badge into the footer outlet.
 *
 * CAUTION: This belongs to our example storefrontapp only. It is NOT meant for
 * customers' applications and is NOT shipped in any Spartacus library.
 */
@NgModule({
  imports: [FooterVersionComponent],
  providers: [
    provideOutlet({
      id: 'Footer',
      position: OutletPosition.AFTER,
      component: FooterVersionComponent,
    }),
  ],
})
export class FooterVersionModule {}
