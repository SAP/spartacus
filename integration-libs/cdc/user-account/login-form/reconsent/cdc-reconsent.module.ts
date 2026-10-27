/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  BtnLikeLinkModule,
  ConsentManagementModule,
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CdcReconsentDialogEventListener } from './cdc-reconsent-dialogue-event.listener';
import { CdcReconsentComponent } from './cdc-reconsent.component';
import { defaultCdcReconsentLayoutConfig } from './default-cdc-reconsent-layout.config';

@NgModule({
  providers: [
    provideAppInitializer(() => {
      inject(CdcReconsentDialogEventListener);
    }),
    provideDefaultConfig(defaultCdcReconsentLayoutConfig),
  ],
  exports: [CdcReconsentComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    IconModule,
    I18nModule,
    KeyboardFocusModule,
    ConsentManagementModule,
    BtnLikeLinkModule,
    CdcReconsentComponent,
  ],
})
export class CdcReconsentModule {}
