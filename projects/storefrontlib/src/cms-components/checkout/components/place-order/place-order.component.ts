import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CheckoutService,
  ORDER_TYPE,
  RoutingService,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { combineLatest, Subscription } from 'rxjs';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
} from '../../../../layout/launch-dialog/index';
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
    protected checkoutReplenishmentFormService: CheckoutReplenishmentFormService,
    protected routingService: RoutingService,
    protected launchDialogService: LaunchDialogService,
    protected fb: FormBuilder,
    protected vcr: ViewContainerRef
  ) {}

  submitForm(): void {
    if (this.checkoutSubmitForm.valid && Boolean(this.currentOrderType)) {
      switch (this.currentOrderType) {
        case ORDER_TYPE.PLACE_ORDER: {
          this.checkoutService.placeOrder();
          break;
        }

        case ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER: {
          this.checkoutService.scheduleReplenishmentOrder(
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
    this.subscription.add(
      combineLatest([
        this.checkoutService.getPlaceOrderLoading(),
        this.checkoutService.getPlaceOrderSuccess(),
      ]).subscribe(([orderLoading, orderSuccess]) => {
        if (orderLoading) {
          this.launchDialogService.launch(
            LAUNCH_CALLER.PLACE_ORDER_SPINNER,
            this.vcr
          );
        }

        if (orderSuccess) {
          this.onSuccess(orderSuccess);
        }
      })
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
          this.routingService.go({ cxRoute: 'orderConfirmation' });
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
    this.subscription.unsubscribe();
    this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
    this.checkoutService.clearPlaceOrderState();
  }
}
