/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  FeatureDirective,
  FeatureToggles,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { ProgressButtonComponent } from '@spartacus/storefront';
import { combineLatest, Observable, of, Subscription, timer } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';

const PROCEED_TO_CHECKOUT_UPDATING_DEBOUNCE_MS = 250;
/**
 * Hard cap on how long the gate can keep the button disabled. If
 * `isStable()` never recovers (e.g., a leaked process counter) the gate
 * releases regardless after this timeout so the user is never locked out.
 */
const PROCEED_TO_CHECKOUT_GATE_SAFETY_VALVE_MS = 10_000;

@Component({
  selector: 'cx-cart-proceed-to-checkout',
  templateUrl: './cart-proceed-to-checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FeatureDirective,
    NgIf,
    ProgressButtonComponent,
    RouterLink,
    TranslatePipe,
    UrlPipe,
  ],
})
export class CartProceedToCheckoutComponent implements OnInit, OnDestroy {
  cartValidationInProgress = false;

  /**
   * Emits true while the active cart has any in-flight load or pending
   * process (e.g. queued add-to-cart writes on a slow network). The
   * Proceed-to-Checkout button is disabled while this is true to prevent
   * entering checkout against a half-loaded cart (CXSPA-10582). Mirrors the
   * Place Order gate.
   *
   * Debounced to avoid flicker on fast networks. The safety-valve timer
   * forces release after PROCEED_TO_CHECKOUT_GATE_SAFETY_VALVE_MS so a stuck
   * `isStable()` selector cannot lock the user out indefinitely.
   */
  cartUpdating$: Observable<boolean>;

  protected subscription = new Subscription();
  private featureToggles = inject(FeatureToggles);
  protected activeCartFacade = inject(ActiveCartFacade);

  constructor(
    protected router: Router,
    protected cd?: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.router.events.subscribe((event: Event) => {
        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.cartValidationInProgress = false;
          this.cd?.markForCheck();
        }
      })
    );

    if (!this.featureToggles.enableCartSlowNetworkResilience) {
      this.cartUpdating$ = of(false);
      return;
    }

    const safetyValveExpired$ = timer(
      PROCEED_TO_CHECKOUT_GATE_SAFETY_VALVE_MS
    ).pipe(
      map(() => true),
      startWith(false)
    );

    this.cartUpdating$ = combineLatest([
      this.activeCartFacade.isStable(),
      safetyValveExpired$,
    ]).pipe(
      map(([stable, expired]) => !stable && !expired),
      debounceTime(PROCEED_TO_CHECKOUT_UPDATING_DEBOUNCE_MS),
      startWith(false),
      distinctUntilChanged()
    );
  }

  disableButtonWhileNavigation(): void {
    this.cartValidationInProgress = true;
  }

  protected isSlowNetworkResilienceEnabled(): boolean {
    return !!this.featureToggles.enableCartSlowNetworkResilience;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
