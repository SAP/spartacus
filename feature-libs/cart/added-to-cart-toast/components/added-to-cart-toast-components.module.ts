import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { AddedToCartToastComponent } from './added-to-cart-toast/added-to-cart-toast.component';

@NgModule({
  imports: [CommonModule, MediaModule, RouterModule, UrlModule, I18nModule],
  declarations: [AddedToCartToastComponent],
})
export class AddedToCartToastComponentsModule {}
