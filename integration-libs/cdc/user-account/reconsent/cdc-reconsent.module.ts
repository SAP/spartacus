/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartSharedModule } from '@spartacus/cart/base/components';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { ConsentManagementModule, IconModule, ItemCounterModule, KeyboardFocusModule, PromotionsModule, SpinnerModule } from '@spartacus/storefront';
import { CdcReconsentDialogEventListener } from './cdc-reconsent-dialogue-event.listener';
import { CdcReconsentComponent } from './cdc-reconsent.component';
import { defaultCdcReconsentLayoutConfig } from './default-cdc-reconsent-layout.config';

@NgModule({
    providers: [provideDefaultConfig(defaultCdcReconsentLayoutConfig)],
    declarations: [CdcReconsentComponent],
    exports: [CdcReconsentComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CartSharedModule,
        RouterModule,
        SpinnerModule,
        PromotionsModule,
        UrlModule,
        IconModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule,
        ConsentManagementModule
    ]
})
export class CdcReconsentModule {
  constructor(
    _cdcReconsentDialogEventListener: CdcReconsentDialogEventListener
  ) {
    // Intentional empty constructor
  }
}
