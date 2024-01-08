/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  ConsentManagementModule,
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CdcReconsentDialogEventListener } from './cdc-reconsent-dialogue-event.listener';
import { CdcReconsentComponent } from './cdc-reconsent.component';
import { defaultCdcReconsentLayoutConfig } from './default-cdc-reconsent-layout.config';

@NgModule({
  providers: [provideDefaultConfig(defaultCdcReconsentLayoutConfig)],
  declarations: [CdcReconsentComponent],
  exports: [CdcReconsentComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    IconModule,
    I18nModule,
    KeyboardFocusModule,
    ConsentManagementModule,
  ],
})
export class CdcReconsentModule {
  constructor(
    _cdcReconsentDialogEventListener: CdcReconsentDialogEventListener
  ) {
    // Intentional empty constructor
  }
}
