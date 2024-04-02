/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NewSavedCartOrderEntriesContextToken,
  SavedCartOrderEntriesContextToken,
} from '@spartacus/cart/saved-cart/root';
import { provideDefaultConfig } from '@spartacus/core';
import { AddToSavedCartModule } from './add-to-saved-cart/add-to-saved-cart.module';
import { SavedCartDetailsModule } from './details/saved-cart-details.module';
import { SavedCartListModule } from './list/saved-cart-list.module';
import { SavedCartOrderEntriesContext } from './page-context/saved-cart-details-page/saved-cart-order-entries.context';
import { NewSavedCartOrderEntriesContext } from './page-context/saved-carts-page/new-saved-cart-order-entries.context';
import { defaultSavedCartFormLayoutConfig } from './saved-cart-form-dialog/default-saved-cart-form-layout.config';
import { SavedCartFormDialogModule } from './saved-cart-form-dialog/saved-cart-form-dialog.module';

@NgModule({
  imports: [
    RouterModule,
    AddToSavedCartModule,
    SavedCartFormDialogModule,
    SavedCartListModule,
    SavedCartDetailsModule,
  ],
  providers: [
    {
      provide: SavedCartOrderEntriesContextToken,
      useExisting: SavedCartOrderEntriesContext,
    },
    {
      provide: NewSavedCartOrderEntriesContextToken,
      useExisting: NewSavedCartOrderEntriesContext,
    },
    provideDefaultConfig(defaultSavedCartFormLayoutConfig),
  ],
})
export class SavedCartComponentsModule {}
