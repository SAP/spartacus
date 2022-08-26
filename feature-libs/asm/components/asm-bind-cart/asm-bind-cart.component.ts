/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  Command,
  CommandService,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  isNotUndefined,
  OCC_CART_ID_CURRENT,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { defer, Subscription } from 'rxjs';
import { concatMap, filter, finalize, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-asm-bind-cart',
  templateUrl: './asm-bind-cart.component.html',
})
export class AsmBindCartComponent implements OnInit, OnDestroy {
  cartId: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  loading = false;

  protected subscription = new Subscription();

  protected bindCartToCurrentUser$: Command<string, unknown> =
    this.commandService.create((cartId) =>
      this.userAccountFacade.get().pipe(
        take(1),
        map((customer) => customer?.uid),
        filter(isNotUndefined),
        concatMap((customerId) =>
          this.asmBindCartFacade
            .bindCart({
              cartId,
              customerId,
            })
            .pipe(
              tap(() =>
                this.multiCartFacade.loadCart({
                  cartId: OCC_CART_ID_CURRENT,
                  userId: customerId,
                })
              )
            )
        )
      )
    );

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected activeCartFacade: ActiveCartFacade,
    protected multiCartFacade: MultiCartFacade,
    protected userAccountFacade: UserAccountFacade,
    protected asmBindCartFacade: AsmBindCartFacade,
    protected commandService: CommandService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activeCartFacade
        .getActiveCartId()
        .pipe(filter((id) => Boolean(id)))
        .subscribe((response) => {
          this.cartId.setValue(response);
        })
    );
  }

  /**
   * Bind the input cart number to the customer
   */
  bindCartToCustomer() {
    if (this.cartId.valid && !this.loading) {
      const subscription = defer(() => {
        this.loading = true;
        return this.bindCartToCurrentUser$.execute(this.cartId.value);
      })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
          () => {
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
  }

  clearText() {
    this.cartId.setValue('');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
