/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
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
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CurrencyService,
  LanguageService,
  RoutingService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import {
  AtMessageDirective,
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { combineLatest, map, Observable, take } from 'rxjs';

@Component({
  selector: 'cx-place-order',
  templateUrl: './checkout-place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    AtMessageDirective,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
  ],
})
export class CheckoutPlaceOrderComponent implements OnDestroy, OnInit {
  placedOrder: void | Observable<ComponentRef<any> | undefined>;
  params$ = new Observable<string[]>();
  checkoutSubmitForm: UntypedFormGroup = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue],
  });

  /**
   * Emits true while the active cart has any in-flight load or pending process
   * (e.g. queued CartAddEntry actions on a slow network). The Place Order
   * button is disabled while this is true to prevent placing the order before
   * all queued cart writes have settled — otherwise queued requests would fire
   * against the just-removed cart and create a phantom cart (CXSPA-10582).
   */
  isCartUpdating$: Observable<boolean> = this.activeCartFacade
    .isStable()
    .pipe(map((stable) => !stable));

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
    protected vcr: ViewContainerRef,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  ngOnInit() {
    this.params$ = combineLatest([
      this.currencyService.getActive(),
      this.languageService.getActive(),
    ]).pipe(map(([currency, language]) => [currency, language]));
  }

  submitForm(): void {
    if (!this.checkoutSubmitForm.valid) {
      this.checkoutSubmitForm.markAllAsTouched();
      return;
    }
    this.activeCartFacade
      .isStable()
      .pipe(take(1))
      .subscribe((isStable) => {
        if (!isStable) {
          return;
        }
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
                this.launchDialogService.clear(
                  LAUNCH_CALLER.PLACE_ORDER_SPINNER
                );
                if (component) {
                  component.destroy();
                }
              })
              .unsubscribe();
          },
          next: () => this.onSuccess(),
        });
      });
  }

  onSuccess(): void {
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }

  ngOnDestroy(): void {
    this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
  }
}
