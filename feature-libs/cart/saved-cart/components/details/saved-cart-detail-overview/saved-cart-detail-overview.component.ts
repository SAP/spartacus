import { Component } from '@angular/core';
import { Cart, TranslationService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { SavedCartService } from 'feature-libs/cart/saved-cart/core/services/saved-cart.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SavedCartDetailService } from '../saved-cart-detail.service';

@Component({
  selector: 'cx-saved-cart-detail-overview',
  templateUrl: './saved-cart-detail-overview.component.html',
})
export class SavedCartDetailOverviewComponent {
  savedCart$: Observable<Cart> = this.savedCartDetailService.getCartDetails();

  constructor(
    protected savedCartDetailService: SavedCartDetailService,
    protected savedCartService: SavedCartService,
    protected translation: TranslationService
  ) {}

  getCartName(cartName: string): Observable<Card> {
    return this.translation.translate('savedCartDetails.cartName').pipe(
      filter(() => Boolean(cartName)),
      map((textTitle) => ({
        title: textTitle,
        text: [cartName],
      }))
    );
  }

  getCartDescription(cartDescription: string): Observable<Card> {
    return this.translation.translate('savedCartDetails.cartDescription').pipe(
      filter(() => Boolean(cartDescription)),
      map((textTitle) => ({
        title: textTitle,
        text: [cartDescription],
      }))
    );
  }

  getCartId(cartId: string): Observable<Card> {
    return this.translation.translate('savedCartDetails.cartId').pipe(
      filter(() => Boolean(cartId)),
      map((textTitle) => ({
        title: textTitle,
        text: [cartId],
      }))
    );
  }

  getDateSaved(saveTime: string): Observable<Card> {
    return this.translation.translate('savedCartDetails.dateSaved').pipe(
      filter(() => Boolean(saveTime)),
      map((textTitle) => {
        const date = this.getDate(new Date(saveTime));

        return {
          title: textTitle,
          text: [date],
        };
      })
    );
  }

  getCartItems(totalItems: number): Observable<Card> {
    return this.translation.translate('savedCartDetails.items').pipe(
      filter(() => Boolean(totalItems)),
      map((textTitle) => ({
        title: textTitle,
        text: [totalItems.toString()],
      }))
    );
  }

  getCartQuantity(totalUnitItems: number): Observable<Card> {
    return this.translation.translate('savedCartDetails.quantity').pipe(
      filter(() => Boolean(totalUnitItems)),
      map((textTitle) => ({
        title: textTitle,
        text: [totalUnitItems.toString()],
      }))
    );
  }

  getCartTotal(totalItems: string): Observable<Card> {
    return this.translation.translate('savedCartDetails.total').pipe(
      filter(() => Boolean(totalItems)),
      map((textTitle) => ({
        title: textTitle,
        text: [totalItems],
      }))
    );
  }

  editCart(cartId: string): void {
    // TODO: requires Michal's generic dialog form

    this.savedCartService.saveCart({
      cartId,
      saveCartName: 'it works no worries',
      saveCartDescription: 'hello from the other side',
      extraData: { edit: true },
    });
  }

  deleteCart(cartId: string): void {
    //  TODO: asked Marcin if I can make changes to the cart actions
    // question is catered towards deprecations
    // main question is that I want to add the loader state mechanism to it
    this.savedCartService.deleteSavedCart(cartId);
  }

  private getDate(givenDate: Date): string {
    const date = givenDate.toDateString().split(' ');

    const month = date[1];
    const day = date[2];
    const year = date[3];

    return month + ' ' + day + ' ' + year;
  }
}
