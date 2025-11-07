/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject } from '@angular/core';
import { smartEditDecorators } from './decorators/index';
import { SmartEditService } from './services/smart-edit.service';

@NgModule({
  providers: [...smartEditDecorators],
})
export class SmartEditCoreModule {
  private smartEditService = inject(SmartEditService);

  constructor() {
    this.smartEditService.processCmsPage();
  }
}
