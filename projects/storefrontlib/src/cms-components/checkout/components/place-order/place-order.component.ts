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
    protected checkoutReplenishmentForm: CheckoutReplenishmentFormService,
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

          this.checkoutReplenishmentForm.setScheduleReplenishmentFormData(
            this.checkoutReplenishmentForm.defaultFormData
          );
          break;
        }
      }
    } else {
      this.checkoutSubmitForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
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
        .getReplenishmentOrderDetails()
        .pipe(filter((order) => Object.keys(order).length !== 0))
        .subscribe(() => {
          this.routingService.go({ cxRoute: 'replenishmentConfirmation' });
        })
    );

    this.subscription.add(
      this.checkoutService
        .getCurrentOrderType()
        .subscribe((orderType) => (this.currentOrderType = orderType))
    );

    this.subscription.add(
      this.checkoutReplenishmentForm
        .getScheduleReplenishmentFormData()
        .subscribe((data) => (this.scheduleReplenishmentFormData = data))
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
