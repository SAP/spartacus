/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  OCC_CART_ID_CURRENT,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import {
  BehaviorSubject,
  defer,
  EMPTY,
  iif,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { concatMap, filter, finalize, map, take, tap } from 'rxjs/operators';
import { BIND_CART_DIALOG_ACTION } from '../asm-bind-cart-dialog/asm-bind-cart-dialog.component';

@Component({
  selector: 'cx-asm-bind-cart',
  templateUrl: './asm-bind-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsmBindCartComponent implements OnInit, OnDestroy {
  activeCartValidator: ValidatorFn = (control) => {
    if (control.value === this.activeCartId) {
      return { activeCartError: true };
    }
    return null;
  };

  cartId: FormControl<string | null> = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    this.activeCartValidator,
  ]);

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  valid$ = this.cartId.statusChanges.pipe(map((status) => status === 'VALID'));

  activeCartId = '';

  @ViewChild('bindToCart') bindToCartElemRef: ElementRef<HTMLButtonElement>;

  protected subscription = new Subscription();

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected activeCartFacade: ActiveCartFacade,
    protected multiCartFacade: MultiCartFacade,
    protected asmBindCartFacade: AsmBindCartFacade,
    protected launchDialogService: LaunchDialogService,
    protected savedCartFacade: SavedCartFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activeCartFacade.getActiveCartId().subscribe((response) => {
        this.activeCartId = response ?? '';

        this.cartId.setValue(this.activeCartId);
      })
    );
  }

  resetInput() {
    if (!this.cartId.value) {
      this.cartId.setValue(this.activeCartId);
    }
  }

  /**
   * Bind the input cart number to the customer
   */
  bindCartToCustomer() {
    let anonymousCartId = this.cartId.value;

    const subscription = of(this.loading$.getValue())
      .pipe(
        filter((loading) => !loading && Boolean(anonymousCartId)),
        tap(() => {
          this.loading$.next(true);
        }),
        concatMap(() =>
          iif(
            () => Boolean(this.activeCartId),
            this.openDialog(anonymousCartId as string),
            this.simpleBindCart(anonymousCartId as string)
          )
        ),
        finalize(() => this.loading$.next(false))
      )
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

  clearText() {
    this.cartId.setValue('');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Binds cart on subscription and reloads cart
   */
  protected simpleBindCart(anonymousCartId: string): Observable<unknown> {
    return defer(() => this.asmBindCartFacade.bindCart(anonymousCartId)).pipe(
      tap(() => this.multiCartFacade.reloadCart(OCC_CART_ID_CURRENT))
    );
  }

  /**
   * Opens dialog and passes non-cancel result to select action
   */
  protected openDialog(anonymousCartId: string) {
    return defer(() => {
      this.launchDialogService.openDialogAndSubscribe(
        LAUNCH_CALLER.ASM_BIND_CART,
        this.bindToCartElemRef
      );
      return this.launchDialogService.dialogClose.pipe(
        filter((result) => Boolean(result)),
        take(1)
      ) as Observable<BIND_CART_DIALOG_ACTION>;
    }).pipe(
      filter((dialogResult) => Boolean(dialogResult)),
      concatMap((dialogResult) => {
        return this.selectBindAction(anonymousCartId, dialogResult);
      })
    );
  }

  protected selectBindAction(
    anonymousCartId: string,
    action: BIND_CART_DIALOG_ACTION
  ): Observable<unknown> {
    switch (action) {
      case BIND_CART_DIALOG_ACTION.REPLACE:
        return this.replaceCart(anonymousCartId);

      case BIND_CART_DIALOG_ACTION.CANCEL:
      default:
        return EMPTY;
    }
  }

  protected replaceCart(anonymousCartId: string): Observable<unknown> {
    return of(this.activeCartId).pipe(
      tap((activeCartId) => {
        if (activeCartId) {
          this.savedCartFacade.saveCart({
            cartId: activeCartId,
            saveCartName: activeCartId,
            // TODO(#12660): Remove default value once backend is updated
            saveCartDescription: '-',
          });
        }
      }),
      concatMap(() => this.simpleBindCart(anonymousCartId))
    );
  }
}
