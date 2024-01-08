/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  FileUploadModule,
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CustomerTicketingReopenDialogComponent } from './customer-ticketing-reopen-dialog/customer-ticketing-reopen-dialog.component';
import { CustomerTicketingReopenComponent } from './customer-ticketing-reopen.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    FormErrorsModule,
    FileUploadModule,
    SpinnerModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SupportTicketReopenComponent: {
          component: CustomerTicketingReopenComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    CustomerTicketingReopenComponent,
    CustomerTicketingReopenDialogComponent,
  ],
  exports: [
    CustomerTicketingReopenComponent,
    CustomerTicketingReopenDialogComponent,
  ],
})
export class CustomerTicketingReopenModule {}
