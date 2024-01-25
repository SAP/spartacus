/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MockUrlPipe, URL_TESTING_ALLOWLISTED_PARAMS } from './mock-url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [MockUrlPipe],
  exports: [MockUrlPipe],
})
export class UrlTestingModule {
  static allowlistParams(
    allowlistedParams: string[]
  ): ModuleWithProviders<UrlTestingModule> {
    return {
      ngModule: UrlTestingModule,
      providers: [
        {
          provide: URL_TESTING_ALLOWLISTED_PARAMS,
          useValue: allowlistedParams,
        },
      ],
    };
  }
}
