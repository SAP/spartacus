import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideConfig, provideDefaultConfig } from '@spartacus/core';

import { AddToSavedCartModule } from './add-to-saved-cart/add-to-saved-cart.module';
import { SavedCartListModule } from './list/saved-cart-list.module';
import { savedCartFormConfig } from './saved-cart-form/saved-cart-form.config';
import { SavedCartFormModule } from './saved-cart-form/saved-cart-form.module';
import { savedCartRoutingConfig } from './saved-cart.config';

@NgModule({
  imports: [
    RouterModule,
    AddToSavedCartModule,
    SavedCartFormModule,
    SavedCartListModule,
  ],
  providers: [
    provideDefaultConfig(savedCartRoutingConfig),
    provideConfig(savedCartFormConfig),
  ],
})
export class SavedCartComponentsModule {}
