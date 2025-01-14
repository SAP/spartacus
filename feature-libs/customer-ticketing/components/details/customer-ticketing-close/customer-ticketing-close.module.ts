/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  FeaturesConfigModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CustomerTicketingCloseComponent } from './customer-ticketing-close.component';
import { CustomerTicketingCloseDialogComponent } from './customer-ticketing-close-dialog/customer-ticketing-close-dialog.component';
import {
  FileUploadModule,
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerTicketingCloseComponentService } from './customer-ticketing-close-component.service';

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
    FeaturesConfigModule,
  ],
  providers: [
    CustomerTicketingCloseComponentService,
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
