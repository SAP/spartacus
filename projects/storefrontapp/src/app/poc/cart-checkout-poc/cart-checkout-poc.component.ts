/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartCheckoutPocResult } from './cart-checkout-poc.model';
import { CartCheckoutPocService } from './cart-checkout-poc.service';

@Component({
  selector: 'cx-cart-checkout-poc',
  templateUrl: './cart-checkout-poc.component.html',
  styleUrl: './cart-checkout-poc.component.scss',
  imports: [AsyncPipe, FormsModule],
})
export class CartCheckoutPocComponent {
  protected cartCheckoutPocService = inject(CartCheckoutPocService);
  protected activeCartFacade = inject(ActiveCartFacade);

  protected activeCartId$: Observable<string> =
    this.activeCartFacade.getActiveCartId();

  protected productCode = '300938';
  protected running = false;
  protected collapsed = true;
  protected result$ = new BehaviorSubject<CartCheckoutPocResult | null>(null);

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  runPoc(): void {
    if (this.running) {
      return;
    }

    this.running = true;
    this.result$.next(null);

    this.cartCheckoutPocService
      .runPoc(this.productCode)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.result$.next(result);
          this.running = false;
        },
        error: () => {
          this.running = false;
        },
      });
  }
}
