import { Component, inject, OnInit } from '@angular/core';
import { OrderDetailsService } from '@spartacus/order/components';

@Component({
  selector: 'cx-reschedule-service-order',
  templateUrl: './reschedule-service-order.component.html'
})
export class RescheduleServiceOrderComponent implements OnInit {
  protected orderDetailsService = inject(OrderDetailsService);

  ngOnInit(): void {
    this.orderDetailsService.orderCode$
      .subscribe(orderCode => {
        console.log('Order Number: ', orderCode);
      });
  }
}
