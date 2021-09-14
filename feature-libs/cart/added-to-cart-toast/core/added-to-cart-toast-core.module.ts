import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultAddedToCartToastConfig } from '../default-added-to-cart-toast-config';

@NgModule({
  imports: [CommonModule],
  providers: [provideDefaultConfig(defaultAddedToCartToastConfig)],
})
export class AddedToCartToastCoreMdule {}
