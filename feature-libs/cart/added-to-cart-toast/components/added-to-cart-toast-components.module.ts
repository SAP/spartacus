import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideConfig, UrlModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { AddedToCartToastComponent } from './added-to-cart-toast/added-to-cart-toast.component';
import { defaultAddedToCartToastLayoutConfig } from './default-added-to-cart-toast-layout.config';

@NgModule({
  imports: [CommonModule, MediaModule, RouterModule, UrlModule],
  declarations: [AddedToCartToastComponent],
  providers: [provideConfig(defaultAddedToCartToastLayoutConfig)],
})
export class AddedToCartToastComponentsModule {}
