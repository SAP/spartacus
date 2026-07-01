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
  FeatureToggles,
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
import { combineLatest, map, Observable, of, take, timer } from 'rxjs';
import { startWith } from 'rxjs/operators';

/**
 * Hard cap on how long the Place Order gate can keep the button disabled.
 * If `isStable()` never recovers (e.g., a leaked process counter) the gate
 * releases regardless after this timeout so the user is never locked out of
 * placing the order.
 */
const PLACE_ORDER_GATE_SAFETY_VALVE_MS = 10_000;

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

  private featureToggles = inject(FeatureToggles);
  protected activeCartFacade = inject(ActiveCartFacade);

  protected isSlowNetworkResilienceEnabled(): boolean {
    return !!this.featureToggles.enableCartSlowNetworkResilience;
  }

  /**
   * Emits true while the active cart has any in-flight load or pending process
   * (e.g. queued CartAddEntry actions on a slow network). The Place Order
   * button is disabled while this is true to prevent placing the order before
   * all queued cart writes have settled — otherwise queued requests would fire
   * against the just-removed cart and create a phantom cart (CXSPA-10582).
   *
   * A safety-valve timer forces the gate to release after
   * PLACE_ORDER_GATE_SAFETY_VALVE_MS so a stuck `isStable()` selector cannot
   * lock the user out of placing the order indefinitely.
   *
   * Gated by `enableCartSlowNetworkResilience`; emits constant `false` when
   * the toggle is OFF so an extending client sees pre-CXSPA-10582 behaviour.
   */
  isCartUpdating$: Observable<boolean> = this.isSlowNetworkResilienceEnabled()
    ? combineLatest([
        this.activeCartFacade.isStable(),
        timer(PLACE_ORDER_GATE_SAFETY_VALVE_MS).pipe(
          map(() => true),
          startWith(false)
        ),
      ]).pipe(map(([stable, expired]) => !stable && !expired))
    : of(false);

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
    if (!this.checkoutSubmitForm.valid) {
      this.checkoutSubmitForm.markAllAsTouched();
      return;
    }
    if (!this.isSlowNetworkResilienceEnabled()) {
      this.launchPlaceOrder();
      return;
    }
    this.activeCartFacade
      .isStable()
      .pipe(take(1))
      .subscribe((isStable) => {
        if (!isStable) {
          return;
        }
        this.launchPlaceOrder();
      });
  }

  protected launchPlaceOrder(): void {
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
  }

  onSuccess(): void {
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }

  ngOnDestroy(): void {
    this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
  }
}
