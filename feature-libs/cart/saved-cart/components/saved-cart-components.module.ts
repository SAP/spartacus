import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NewSavedCartOrderEntriesContextToken,
  SavedCartOrderEntriesContextToken,
} from '@spartacus/cart/saved-cart/root';
import { AuthGuard, provideDefaultConfig } from '@spartacus/core';
import { AddToSavedCartModule } from './add-to-saved-cart/add-to-saved-cart.module';
import { SavedCartDetailsModule } from './details/saved-cart-details.module';
import { SavedCartListModule } from './list/saved-cart-list.module';
import { TestGuard } from './list/test.guard';
import { SavedCartOrderEntriesContext } from './page-context/saved-cart-details-page/saved-cart-order-entries.context';
import { NewSavedCartOrderEntriesContext } from './page-context/saved-carts-page/new-saved-cart-order-entries.context';
import { defaultSavedCartFormLayoutConfig } from './saved-cart-form-dialog/default-saved-cart-form-layout.config';
import { SavedCartFormDialogModule } from './saved-cart-form-dialog/saved-cart-form-dialog.module';
import { SomeOtherAuthGuard } from './some-other-auth.guard';
import { SomeOtherTestGuard } from './some-other-test.guard';

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
      provide: TestGuard,
      useExisting: SomeOtherTestGuard,
    },
    {
      provide: AuthGuard,
      useExisting: SomeOtherAuthGuard,
    },
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
