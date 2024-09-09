/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RoutingService, FeaturesConfigModule, UrlModule, I18nModule } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER, FormErrorsModule } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'cx-place-order',
    templateUrl: './checkout-place-order.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    ReactiveFormsModule,
    RouterLink,
    FeaturesConfigModule,
    FormErrorsModule,
    UrlModule,
    I18nModule,
],
})
export class CheckoutPlaceOrderComponent implements OnDestroy {
  placedOrder: void | Observable<ComponentRef<any> | undefined>;

  checkoutSubmitForm: UntypedFormGroup = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue],
  });

  get termsAndConditionInvalid(): boolean {
    return this.checkoutSubmitForm.invalid;
  }

  constructor(
    protected orderFacade: OrderFacade,
    protected routingService: RoutingService,
    protected fb: UntypedFormBuilder,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  submitForm(): void {
    if (this.checkoutSubmitForm.valid) {
      this.placedOrder = this.launchDialogService.launch(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER,
        this.vcr
      );
      this.orderFacade.placeOrder(this.checkoutSubmitForm.valid).subscribe({
        error: () => {
          if (!this.placedOrder) {
            return;
          }

          this.placedOrder
            .subscribe((component) => {
              this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
              if (component) {
                component.destroy();
              }
            })
            .unsubscribe();
        },
        next: () => this.onSuccess(),
      });
    } else {
      this.checkoutSubmitForm.markAllAsTouched();
    }
  }

  onSuccess(): void {
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }

  ngOnDestroy(): void {
    this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
  }
}
