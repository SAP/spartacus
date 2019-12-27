import { Injectable } from '@angular/core';
import {
  OrderEntry,
  PromotionResult,
  CartService,
  Cart,
  Order,
  CheckoutService,
  PromotionLocation,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../../../cms-components/myaccount/order/order-details/order-details.service';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor(
    protected cartService: CartService,
    protected orderDetailsService: OrderDetailsService,
    protected checkoutService: CheckoutService
  ) {}

  getOrderPromotions(
    promotionLocation: PromotionLocation
  ): Observable<PromotionResult[]> {
    switch (promotionLocation) {
      case PromotionLocation.ActiveCart:
        return this.getOrderPromotionsFromCart();
      case PromotionLocation.Checkout:
        return this.getOrderPromotionsFromCheckout();
      case PromotionLocation.Order:
        return this.getOrderPromotionsFromOrder();
      default:
        return of([]);
    }
  }

  getOrderPromotionsFromCart(): Observable<PromotionResult[]> {
    return this.cartService
      .getActive()
      .pipe(map(cart => this.getOrderPromotionsFromCartHelper(cart)));
  }

  private getOrderPromotionsFromCartHelper(cart: Cart): PromotionResult[] {
    const potentialPromotions = [];
    potentialPromotions.push(...(cart.potentialOrderPromotions || []));

    const appliedPromotions = [];
    appliedPromotions.push(...(cart.appliedOrderPromotions || []));

    return [...potentialPromotions, ...appliedPromotions];
  }

  getOrderPromotionsFromCheckout(): Observable<PromotionResult[]> {
    return this.checkoutService
      .getOrderDetails()
      .pipe(map(order => this.getOrderPromotionsFromOrderHelper(order)));
  }

  getOrderPromotionsFromOrder(): Observable<PromotionResult[]> {
    return this.orderDetailsService
      .getOrderDetails()
      .pipe(map(order => this.getOrderPromotionsFromOrderHelper(order)));
  }

  private getOrderPromotionsFromOrderHelper(order: Order): PromotionResult[] {
    const appliedOrderPromotions = [];
    appliedOrderPromotions.push(...(order.appliedOrderPromotions || []));

    return appliedOrderPromotions;
  }

  getProductPromotionForEntry(
    item: OrderEntry,
    promotionLocation: PromotionLocation
  ): Observable<PromotionResult[]> {
    switch (promotionLocation) {
      case PromotionLocation.ActiveCart:
        return this.cartService
          .getActive()
          .pipe(
            map(cart =>
              this.getProductPromotion(
                item,
                cart.appliedProductPromotions || []
              )
            )
          );
      case PromotionLocation.Checkout:
        return this.checkoutService
          .getOrderDetails()
          .pipe(
            map(order =>
              this.getProductPromotion(
                item,
                order.appliedProductPromotions || []
              )
            )
          );
      case PromotionLocation.Order:
        return this.orderDetailsService
          .getOrderDetails()
          .pipe(
            map(order =>
              this.getProductPromotion(
                item,
                order.appliedProductPromotions || []
              )
            )
          );
    }
  }

  private getProductPromotion(
    item: OrderEntry,
    promotions: PromotionResult[]
  ): PromotionResult[] {
    const entryPromotions: PromotionResult[] = [];
    if (promotions && promotions.length > 0) {
      for (const promotion of promotions) {
        if (
          promotion.description &&
          promotion.consumedEntries &&
          promotion.consumedEntries.length > 0
        ) {
          for (const consumedEntry of promotion.consumedEntries) {
            if (this.isConsumedByEntry(consumedEntry, item)) {
              entryPromotions.push(promotion);
            }
          }
        }
      }
    }
    return entryPromotions;
  }

  private isConsumedByEntry(consumedEntry: any, entry: any): boolean {
    const consumedEntryNumber = consumedEntry.orderEntryNumber;
    if (entry.entries && entry.entries.length > 0) {
      for (const subEntry of entry.entries) {
        if (subEntry.entryNumber === consumedEntryNumber) {
          return true;
        }
      }
      return false;
    } else {
      return consumedEntryNumber === entry.entryNumber;
    }
  }
}
