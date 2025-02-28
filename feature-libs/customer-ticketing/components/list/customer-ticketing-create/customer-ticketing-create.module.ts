/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, FeaturesConfigModule } from '@spartacus/core';
import {
  FileUploadModule,
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { CustomerTicketingCreateDialogComponent } from './customer-ticketing-create-dialog/customer-ticketing-create-dialog.component';
import { CustomerTicketingCreateComponent } from './customer-ticketing-create.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    FormErrorsModule,
    FileUploadModule,
    FeaturesConfigModule,
    NgSelectModule,
    NgSelectA11yModule,
  ],
  declarations: [
    CustomerTicketingCreateComponent,
    CustomerTicketingCreateDialogComponent,
  ],
  exports: [
    CustomerTicketingCreateComponent,
    CustomerTicketingCreateDialogComponent,
  ],
})
export class CustomerTicketingCreateModule {}
