import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutModule, I18nModule } from '@spartacus/core';
import { CartSharedModule } from '../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';
import { PwaModule } from '../../../../cms-structure/pwa/index';
import { CardModule } from '../../../ui/components/card/card.module';
import { MediaModule } from './../../../ui/components/media/media.module';
import { OrderConfirmationComponent } from './order-confirmation.component';

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
