/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  combineLatest,
  defer,
  EMPTY,
  iif,
  Observable,
  Subscription,
} from 'rxjs';
import {
  concatMap,
  filter,
  finalize,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs/operators';
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

  valid$ = this.cartId.statusChanges.pipe(
    map((status) => status === 'VALID'),
    shareReplay(1)
  );

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
    const anonymousCartId = this.cartId.value;

    const subscription = combineLatest([
      this.loading$.asObservable(),
      this.valid$,
    ])
      .pipe(
        take(1),
        filter(([loading, valid]) => !loading && valid),
        tap(() => this.loading$.next(true)),
        concatMap(() =>
          this.activeCartFacade.getActive().pipe(
            map((cart) => cart.deliveryItemsQuantity ?? 0),
            take(1)
          )
        ),
        concatMap((cartItemCount) =>
          iif(
            () => Boolean(this.activeCartId && cartItemCount),
            this.openDialog(this.activeCartId, anonymousCartId as string),
            this.simpleBindCart(anonymousCartId as string)
          )
        ),
        finalize(() => this.loading$.next(false))
      )
      .subscribe({
        next: () => {
          this.globalMessageService.add(
            { key: 'asm.bindCart.success' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        },
        error: (error: HttpErrorModel) => {
          this.globalMessageService.add(
            error.details?.[0].message ?? '',
            GlobalMessageType.MSG_TYPE_ERROR
          );
        },
      });

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
  protected openDialog(activeCartId: string, anonymousCartId: string) {
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
        return this.selectBindAction(
          activeCartId,
          anonymousCartId,
          dialogResult
        );
      })
    );
  }

  protected selectBindAction(
    activeCartId: string,
    anonymousCartId: string,
    action: BIND_CART_DIALOG_ACTION
  ): Observable<unknown> {
    switch (action) {
      case BIND_CART_DIALOG_ACTION.REPLACE:
        return this.replaceCart(activeCartId, anonymousCartId);

      case BIND_CART_DIALOG_ACTION.CANCEL:
      default:
        return EMPTY;
    }
  }

  protected replaceCart(
    previousActiveCartId: string,
    anonymousCartId: string
  ): Observable<unknown> {
    return this.simpleBindCart(anonymousCartId).pipe(
      tap(() => {
        this.savedCartFacade.saveCart({
          cartId: previousActiveCartId,
          saveCartName: previousActiveCartId,
          // TODO(#12660): Remove default value once backend is updated
          saveCartDescription: '-',
        });
      })
    );
  }
}
