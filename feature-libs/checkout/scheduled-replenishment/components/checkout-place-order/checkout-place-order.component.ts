/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { CheckoutPlaceOrderComponent } from '@spartacus/checkout/base/components';
import { RoutingService } from '@spartacus/core';
import {
  OrderFacade,
  ORDER_TYPE,
  recurrencePeriod,
  ScheduledReplenishmentOrderFacade,
  ScheduleReplenishmentForm,
} from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { BehaviorSubject, merge, Subscription } from 'rxjs';
import { CheckoutReplenishmentFormService } from '../services/checkout-replenishment-form.service';

@Component({
  selector: 'cx-place-order',
  templateUrl: './checkout-place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutScheduledReplenishmentPlaceOrderComponent
  extends CheckoutPlaceOrderComponent
  implements OnInit, OnDestroy
{
  protected subscriptions = new Subscription();

  currentOrderType: ORDER_TYPE;
  scheduleReplenishmentFormData: ScheduleReplenishmentForm;

  daysOfWeekNotChecked$ = new BehaviorSubject<boolean>(false);

  constructor(
    protected orderFacade: OrderFacade,
    protected routingService: RoutingService,
    protected fb: UntypedFormBuilder,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    protected checkoutReplenishmentFormService: CheckoutReplenishmentFormService,
    protected scheduledReplenishmentOrderFacade: ScheduledReplenishmentOrderFacade
  ) {
    super(orderFacade, routingService, fb, launchDialogService, vcr);
  }

  submitForm(): void {
    if (this.checkoutSubmitForm.valid && !!this.currentOrderType) {
      this.placedOrder = this.launchDialogService.launch(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER,
        this.vcr
      );
      merge(
        this.currentOrderType === ORDER_TYPE.PLACE_ORDER
          ? this.orderFacade.placeOrder(this.checkoutSubmitForm.valid)
          : this.scheduledReplenishmentOrderFacade.scheduleReplenishmentOrder(
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
    this.subscriptions.add(
      this.checkoutReplenishmentFormService
        .getOrderType()
        .subscribe((orderType) => (this.currentOrderType = orderType))
    );

    this.subscriptions.add(
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
    switch (this.currentOrderType) {
      case ORDER_TYPE.PLACE_ORDER: {
        super.onSuccess();
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
    this.subscriptions.unsubscribe();
    super.ngOnDestroy();
  }
}
