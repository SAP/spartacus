import { NgModule } from '@angular/core';
import { ScheduledReplenishmentPlaceOrderModule } from './place-order/place-order.module';
import { ScheduledReplenishmentOrderConfirmationModule } from './replenishment-order-confirmation.module';
import { ScheduleReplenishmentOrderModule } from './schedule-replenishment-order/schedule-replenishment-order.module';

@NgModule({
  imports: [
    ScheduleReplenishmentOrderModule,
    ScheduledReplenishmentOrderConfirmationModule,
    ScheduledReplenishmentPlaceOrderModule,
  ],
})
export class CheckoutScheduledReplenishmentComponentsModule {}
