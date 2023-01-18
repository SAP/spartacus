/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  OCC_CART_ID_CURRENT,
} from '@spartacus/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { concatMap, filter, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-asm-bind-cart',
  templateUrl: './asm-bind-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsmBindCartComponent implements OnInit, OnDestroy {
  cartId: FormControl<string | null> = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  protected subscription = new Subscription();

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected activeCartFacade: ActiveCartFacade,
    protected multiCartFacade: MultiCartFacade,
    protected asmBindCartFacade: AsmBindCartFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activeCartFacade.getActiveCartId().subscribe((response) => {
        this.cartId.setValue(response ?? '');
      })
    );
  }

  /**
   * Bind the input cart number to the customer
   */
  bindCartToCustomer() {
    const subscription = of(this.loading$.getValue())
      .pipe(
        filter((loading) => !loading && this.cartId.valid),
        tap(() => this.loading$.next(true)),
        concatMap(() =>
          this.asmBindCartFacade.bindCart(this.cartId.value as string)
        ),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(
        () => {
          this.multiCartFacade.reloadCart(OCC_CART_ID_CURRENT);

          this.globalMessageService.add(
            { key: 'asm.bindCart.success' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        },
        (error: HttpErrorModel) => {
          this.globalMessageService.add(
            error.details?.[0].message ?? '',
            GlobalMessageType.MSG_TYPE_ERROR
          );
        }
      );

    this.subscription.add(subscription);
  }

  clearText() {
    this.cartId.setValue('');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
