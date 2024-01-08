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
import { CustomerTicketingCloseDialogComponent } from './customer-ticketing-close-dialog/customer-ticketing-close-dialog.component';
import { CustomerTicketingCloseComponent } from './customer-ticketing-close.component';

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
        SupportTicketCloseComponent: {
          component: CustomerTicketingCloseComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    CustomerTicketingCloseComponent,
    CustomerTicketingCloseDialogComponent,
  ],
  exports: [
    CustomerTicketingCloseComponent,
    CustomerTicketingCloseDialogComponent,
  ],
})
export class CustomerTicketingCloseModule {}
