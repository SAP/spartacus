/*
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
import {
  Cart,
  CartOutlets,
  CartType,
  DeleteCartSuccessEvent as DeleteSavedCartSuccessEvent,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { SavedCartDetailsService } from '../saved-cart-details.service';

@Component({
  selector: 'cx-saved-cart-details-items',
  templateUrl: './saved-cart-details-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartDetailsItemsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  readonly CartOutlets = CartOutlets;
  readonly CartType = CartType;
  CartLocation = PromotionLocation;

  buyItAgainTranslation$: Observable<string>;

  cartLoaded$: Observable<boolean> = this.savedCartDetailsService
    .getSavedCartId()
    .pipe(switchMap((cartId) => this.savedCartService.isStable(cartId)));

  savedCart$: Observable<Cart | undefined> = this.savedCartDetailsService
    .getCartDetails()
    .pipe(
      tap((cart) => {
        if ((cart?.entries ?? []).length <= 0 && !!cart?.code) {
          this.savedCartService.deleteSavedCart(cart.code);
        }
      })
    );

  constructor(
    protected savedCartDetailsService: SavedCartDetailsService,
    protected savedCartService: SavedCartFacade,
    protected eventSercvice: EventService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.eventSercvice
        .get(DeleteSavedCartSuccessEvent)
        .pipe(
          take(1),
          map(() => true)
        )
        .subscribe((success) => this.onDeleteComplete(success))
    );

    this.buyItAgainTranslation$ = this.translation.translate(
      'addToCart.addToActiveCart'
    );
  }

  onDeleteComplete(success: boolean): void {
    if (success) {
      this.routingService.go({ cxRoute: 'savedCarts' });
      this.globalMessageService.add(
        {
          key: 'savedCartDialog.deleteCartSuccess',
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
