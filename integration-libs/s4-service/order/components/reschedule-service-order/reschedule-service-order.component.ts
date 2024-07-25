import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartOutlets, } from '@spartacus/cart/base/root';
import { GlobalMessageService, GlobalMessageType, RoutingService } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import { CheckoutServiceSchedulePickerService, RescheduleServiceOrderFacade, ServiceDateTime } from '@spartacus/s4-service/root';
import { mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'cx-reschedule-service-order',
  templateUrl: './reschedule-service-order.component.html'
})
export class RescheduleServiceOrderComponent implements OnInit {
  protected orderDetailsService = inject(OrderDetailsService);
  protected rescheduleServiceOrdeFacade = inject(RescheduleServiceOrderFacade);
  protected routingService = inject(RoutingService);
  protected globalMessageService = inject(GlobalMessageService);
  protected fb = inject(FormBuilder);
  protected checkoutServiceSchedulePickerService = inject(
    CheckoutServiceSchedulePickerService
  );
  readonly CartOutlets = CartOutlets;
  dateTime: ServiceDateTime;
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  minServiceDate$: Observable<string> =
    this.checkoutServiceSchedulePickerService.getMinDateForService();
  scheduleTimes$: Observable<string[]> =
    this.checkoutServiceSchedulePickerService.getScheduledServiceTimes();
  form: FormGroup = this.fb.group({
    scheduleDate: [null, Validators.required],
    scheduleTime: [null, Validators.required],
  });

  ngOnInit(): void {
    this.order$
      .subscribe(orderDetails => {
        console.log('Order details: ', orderDetails);
      });
  }

  setScheduleTime(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.form.patchValue({
      scheduleTime: value,
    });
  }

  rescheduleServiceOrder(): void {
    const scheduleDate = this.form?.get('scheduleDate')?.value || '';
    const scheduleTime = this.form?.get('scheduleTime')?.value || '';
    this.dateTime =
    this.checkoutServiceSchedulePickerService.convertToDateTime(
      scheduleDate,
      scheduleTime
    );
    console.log('Component level ', this.dateTime);
    this.orderDetailsService.orderCode$
      .pipe(
        mergeMap(orderCode => this.rescheduleServiceOrdeFacade.rescheduleService(orderCode, this.dateTime))
      )
      .subscribe({
        next: () => {
        console.log('Service order rescheduled ');
        this.routingService.go({ cxRoute: 'orders' });
        this.globalMessageService.add(
          'Service order rescheduled successfully', GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      },
      error: () => {
        console.log('Service order reschedule failed');
        this.routingService.go({ cxRoute: 'orders' });
        this.globalMessageService.add(
          'Service order reschedule failed', GlobalMessageType.MSG_TYPE_ERROR
        );
      }
    });
  }
}
