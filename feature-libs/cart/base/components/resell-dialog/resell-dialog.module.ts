/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { MarketplacesComponent } from './marketplaces/marketplaces.component';
import { ResellDetailsComponent } from './resell-details/resell-details.component';
import { defaultResellDialogLayoutConfig } from './resell-dialog-layout.config';
import { ResellDialogComponent } from './resell-dialog.component';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    FormsModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    NgSelectModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
  declarations: [
    ListingComponent,
    LoginComponent,
    MarketplacesComponent,
    ResellDetailsComponent,
    ResellDialogComponent,
  ],
  exports: [ResellDialogComponent],
  providers: [provideDefaultConfig(defaultResellDialogLayoutConfig)],
})
export class ResellDialogModule {}
