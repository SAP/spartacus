import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutFacade } from '@spartacus/checkout/root';
import {
  ORDER_TYPE,
  recurrencePeriod,
  RoutingService,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { BehaviorSubject, merge, Observable, Subscription } from 'rxjs';
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
  placedOrder: void | Observable<ComponentRef<any> | undefined>;

  daysOfWeekNotChecked$ = new BehaviorSubject<boolean>(false);

  checkoutSubmitForm: FormGroup = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue],
  });

  get termsAndConditionInvalid(): Boolean {
    return this.checkoutSubmitForm.invalid;
  }

  constructor(
    protected checkoutService: CheckoutFacade,
    protected routingService: RoutingService,
    protected fb: FormBuilder,
    protected checkoutReplenishmentFormService: CheckoutReplenishmentFormService,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  submitForm(): void {
    if (this.checkoutSubmitForm.valid && Boolean(this.currentOrderType)) {
      this.placedOrder = this.launchDialogService.launch(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER,
        this.vcr
      );
      merge(
        this.currentOrderType === ORDER_TYPE.PLACE_ORDER
          ? this.checkoutService.placeOrder(this.checkoutSubmitForm.valid)
          : this.checkoutService.scheduleReplenishmentOrder(
              this.scheduleReplenishmentFormData,
              this.checkoutSubmitForm.valid
            )
      ).subscribe({
        error: () => {
          if (this.placedOrder) {
            this.placedOrder
              .subscribe((component) => {
                this.launchDialogService.clear(
                  LAUNCH_CALLER.PLACE_ORDER_SPINNER
                );
                if (component) {
                  component.destroy();
                }
              })
              .unsubscribe();
          }
        },
        next: () => {
          this.onSuccess();
        },
      });
    } else {
      this.checkoutSubmitForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.subscription.add(
      this.checkoutService
        .getOrderType()
        .subscribe((orderType) => (this.currentOrderType = orderType))
    );

    this.subscription.add(
      this.checkoutReplenishmentFormService
        .getScheduleReplenishmentFormData()
        .subscribe((data) => {
          this.scheduleReplenishmentFormData = data;

          this.daysOfWeekNotChecked$.next(
            data.daysOfWeek?.length === 0 &&
              data.recurrencePeriod === recurrencePeriod.WEEKLY
          );
        })
    );
  }

  onSuccess(): void {
    console.log(this.currentOrderType);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
  }
}
