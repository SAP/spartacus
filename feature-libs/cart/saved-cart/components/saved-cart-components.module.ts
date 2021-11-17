import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideConfig } from '@spartacus/core';
import { AddToSavedCartModule } from './add-to-saved-cart/add-to-saved-cart.module';
import { SavedCartDetailsModule } from './details/saved-cart-details.module';
import { SavedCartListModule } from './list/saved-cart-list.module';
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
  providers: [provideConfig(defaultSavedCartFormLayoutConfig)],
})
export class SavedCartComponentsModule {}
