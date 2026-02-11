/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import {
  FileUploadModule,
  FormErrorsModule,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  IconModule,
  KeyboardFocusModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { CustomerTicketingCreateDialogComponent } from './customer-ticketing-create-dialog/customer-ticketing-create-dialog.component';
import { CustomerTicketingCreateComponent } from './customer-ticketing-create.component';

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
    FormRequiredAsterisksComponent,
    FormRequiredLegendComponent,
    CustomerTicketingCreateComponent,
    CustomerTicketingCreateDialogComponent,
  ],
  exports: [
    CustomerTicketingCreateComponent,
    CustomerTicketingCreateDialogComponent,
  ],
})
export class CustomerTicketingCreateModule {}
