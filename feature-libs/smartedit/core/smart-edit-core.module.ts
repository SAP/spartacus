/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { smartEditDecorators } from './decorators/index';
import { SmartEditService } from './services/smart-edit.service';

@NgModule({
  providers: [...smartEditDecorators],
})
export class SmartEditCoreModule {
  constructor(private smartEditService: SmartEditService) {
    this.smartEditService.processCmsPage();
  }
}
