import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CheckoutService,
  ORDER_TYPE,
  recurrencePeriod,
  RoutingService,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
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
  placedOrder: void | Observable<ComponentRef<any>>;

  daysOfWeekNotChecked$ = new BehaviorSubject<boolean>(false);

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
        this.checkoutService.getPlaceOrderError(),
      ]).subscribe(([orderLoading, orderSuccess, orderError]) => {
        if (orderLoading) {
          this.placedOrder = this.launchDialogService.launch(
            LAUNCH_CALLER.PLACE_ORDER_SPINNER,
            this.vcr
          );
        }

        if (orderError) {
          if (this.placedOrder) {
            this.placedOrder
              .subscribe((component) => {
                this.launchDialogService.clear(
                  LAUNCH_CALLER.PLACE_ORDER_SPINNER
                );
                component.destroy();
              })
              .unsubscribe();
            this.checkoutService.clearPlaceOrderState();
          }
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
        .subscribe((data) => {
          this.scheduleReplenishmentFormData = data;

          this.daysOfWeekNotChecked$.next(
            data.daysOfWeek.length === 0 &&
              data.recurrencePeriod === recurrencePeriod.WEEKLY
          );
        })
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
          break;
        }
      }
      this.checkoutReplenishmentFormService.resetScheduleReplenishmentFormData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
    this.checkoutService.clearPlaceOrderState();
  }
}
