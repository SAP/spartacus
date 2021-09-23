import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { AddedToCartToastComponent } from './added-to-cart-toast/added-to-cart-toast.component';

@NgModule({
  imports: [CommonModule, MediaModule, RouterModule, UrlModule],
  declarations: [AddedToCartToastComponent],
})
export class AddedToCartToastComponentsModule {}
