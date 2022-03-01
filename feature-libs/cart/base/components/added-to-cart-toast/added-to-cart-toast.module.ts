import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlModule, I18nModule, provideConfig } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { AddedToCartToastEventListener } from './added-to-cart-toast-event.listener';
import { AddedToCartToastComponent } from './added-to-cart-toast.component';
import { defaultAddedToCartToastLayoutConfig } from './default-added-to-cart-toast-layout.config';

@NgModule({
  imports: [CommonModule, MediaModule, RouterModule, UrlModule, I18nModule],
  declarations: [AddedToCartToastComponent],
  exports: [AddedToCartToastComponent],
  providers: [provideConfig(defaultAddedToCartToastLayoutConfig)],
})
export class AddedToCartToastModule {
  constructor(_addToCartToastEventListener: AddedToCartToastEventListener) {}
}
