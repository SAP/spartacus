/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { defaultOpfErrorModalLayoutConfig } from './default-opf-error-modal.layout.config';
import { OpfErrorModalComponent } from './opf-error-modal.component';

@NgModule({
  declarations: [OpfErrorModalComponent],
  providers: [provideDefaultConfig(defaultOpfErrorModalLayoutConfig)],
  exports: [OpfErrorModalComponent],
  imports: [CommonModule, I18nModule, KeyboardFocusModule],
})
export class OpfErrorModalModule {}
