import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckoutModule, I18nModule } from '@spartacus/core';
import { OrderConfirmationComponent } from './order-confirmation.component';

import { MediaModule } from './../../../ui/components/media/media.module';
import { CartSharedModule } from './../../../cart/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';
import { PwaModule } from '../../../pwa/pwa.module';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    CartSharedModule,
    CardModule,
    PwaModule,
    CheckoutModule,
    I18nModule,
  ],
  declarations: [OrderConfirmationComponent],
  exports: [OrderConfirmationComponent],
})
export class OrderConfirmationModule {}
