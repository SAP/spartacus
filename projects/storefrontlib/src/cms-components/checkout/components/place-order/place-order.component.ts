import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CheckoutReplenishmentOrderService,
  CheckoutService,
  ORDER_TYPE,
  RoutingService,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CheckoutReplenishmentFormService } from '../../services/checkout-replenishment-form-service';

@Component({
  selector: 'cx-place-order',
  templateUrl: './place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  currentOrderType: ORDER_TYPE;
  scheduleReplenishmentFormData: ScheduleReplenishmentForm;

  checkoutSubmitForm: FormGroup = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue],
  });

  get termsAndConditionInvalid(): Boolean {
    return this.checkoutSubmitForm.invalid;
  }

  constructor(
    protected checkoutService: CheckoutService,
    protected checkoutReplenishmentService: CheckoutReplenishmentOrderService,
    protected checkoutReplenishmentFormService: CheckoutReplenishmentFormService,
    protected routingService: RoutingService,
    protected fb: FormBuilder
  ) {}

  submitForm(): void {
    if (this.checkoutSubmitForm.valid && Boolean(this.currentOrderType)) {
      switch (this.currentOrderType) {
        case ORDER_TYPE.PLACE_ORDER: {
          this.checkoutService.placeOrder();
          break;
        }

        case ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER: {
          this.checkoutReplenishmentService.scheduleReplenishmentOrder(
            this.scheduleReplenishmentFormData,
            this.checkoutSubmitForm.valid
          );
          break;
        }
      }
    } else {
      this.checkoutSubmitForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    // TODO: when process state functionality is added to place_order store (GH-8659)
    this.subscription.add(
      this.checkoutService
        .getOrderDetails()
        .pipe(filter((order) => Object.keys(order).length !== 0))
        .subscribe(() => {
          this.routingService.go({ cxRoute: 'orderConfirmation' });
        })
    );

    this.subscription.add(
      this.checkoutReplenishmentService
        .getScheduleReplenishmentOrderSuccess()
        .subscribe((success) => this.onSuccess(success))
    );

    this.subscription.add(
      this.checkoutService
        .getCurrentOrderType()
        .subscribe((orderType) => (this.currentOrderType = orderType))
    );

    this.subscription.add(
      this.checkoutReplenishmentFormService
        .getScheduleReplenishmentFormData()
        .subscribe((data) => (this.scheduleReplenishmentFormData = data))
    );
  }

  onSuccess(data: boolean): void {
    if (data) {
      switch (this.currentOrderType) {
        case ORDER_TYPE.PLACE_ORDER: {
          // TODO: when process state functionality is added to place_order store (GH-8659)
          break;
        }

        case ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER: {
          this.routingService.go({ cxRoute: 'replenishmentConfirmation' });
          this.checkoutReplenishmentFormService.resetScheduleReplenishmentFormData();
          break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.checkoutReplenishmentService.clearScheduleReplenishmentOrderState();
  }
}
