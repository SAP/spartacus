import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideConfig } from '@spartacus/core';
import { AddToSavedCartModule } from './add-to-saved-cart/add-to-saved-cart.module';
import { SavedCartDetailsModule } from './details/saved-cart-details.module';
import { SavedCartListModule } from './list/saved-cart-list.module';
import { savedCartFormConfig } from './saved-cart-form/saved-cart-form.config';
import { SavedCartFormModule } from './saved-cart-form/saved-cart-form.module';

@NgModule({
  imports: [
    RouterModule,
    AddToSavedCartModule,
    SavedCartFormModule,
    SavedCartListModule,
    SavedCartDetailsModule,
  ],
  providers: [provideConfig(savedCartFormConfig)],
})
export class SavedCartComponentsModule {}
