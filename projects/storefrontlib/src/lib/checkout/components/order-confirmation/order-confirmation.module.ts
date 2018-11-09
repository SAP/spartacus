import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrderConfirmationComponent } from './order-confirmation.component';

import { MediaModule } from './../../../ui/components/media/media.module';
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';
import { AddToHomeScreenBannerComponent } from './add-to-home-screen-banner/add-to-home-screen-banner.component';

@NgModule({
  imports: [CommonModule, MediaModule, CartSharedModule, CardModule],
  declarations: [OrderConfirmationComponent, AddToHomeScreenBannerComponent],
  exports: [OrderConfirmationComponent]
})
export class OrderConfirmationModule {}
