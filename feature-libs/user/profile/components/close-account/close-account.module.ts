/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CloseAccountModalComponent } from './components/close-account-modal/close-account-modal.component';
import { defaultCloseDialogModalLayoutConfig } from './components/close-account-modal/default-close-account-modal-layout.config';
import { CloseAccountComponent } from './components/close-account/close-account.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    IconModule,
    SpinnerModule,
    KeyboardFocusModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CloseAccountComponent: {
          component: CloseAccountComponent,
          guards: [AuthGuard],
        },
      },
    }),
    provideDefaultConfig(defaultCloseDialogModalLayoutConfig),
  ],
  declarations: [CloseAccountComponent, CloseAccountModalComponent],
})
export class CloseAccountModule {}
