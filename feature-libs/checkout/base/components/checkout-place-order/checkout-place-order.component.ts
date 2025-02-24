/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  inject,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  CurrencyService,
  LanguageService,
  RoutingService,
} from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'cx-place-order',
  templateUrl: './checkout-place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CheckoutPlaceOrderComponent implements OnDestroy, OnInit {
  placedOrder: void | Observable<ComponentRef<any> | undefined>;
  params$ = new Observable<string[]>();
  checkoutSubmitForm: UntypedFormGroup = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue],
  });

  private currencyService = inject(CurrencyService);
  private languageService = inject(LanguageService);

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

  ngOnInit() {
    this.params$ = combineLatest([
      this.currencyService.getActive(),
      this.languageService.getActive(),
    ]).pipe(map(([currency, language]) => [currency, language]));
  }

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
