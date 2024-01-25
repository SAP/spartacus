/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  provideDefaultConfig,
  I18nModule,
} from '@spartacus/core';
import {
  FileUploadModule,
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CustomerTicketingReopenComponent } from './customer-ticketing-reopen.component';
import { CustomerTicketingReopenDialogComponent } from './customer-ticketing-reopen-dialog/customer-ticketing-reopen-dialog.component';

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
