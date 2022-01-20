import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Cart, TranslationService } from '@spartacus/core';
import {
  Card,
  ICON_TYPE,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { SavedCartDetailsService } from '../saved-cart-details.service';

@Component({
  selector: 'cx-saved-cart-details-overview',
  templateUrl: './saved-cart-details-overview.component.html',
})
export class SavedCartDetailsOverviewComponent implements OnDestroy {
  private subscription = new Subscription();

  @ViewChild('element') element: ElementRef;

  iconTypes = ICON_TYPE;
  savedCart$: Observable<Cart | undefined> =
    this.savedCartDetailsService.getCartDetails();

  constructor(
    protected savedCartDetailsService: SavedCartDetailsService,
    protected translation: TranslationService,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService
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

  getDateSaved(saveTime: string | null): Observable<Card> {
    return this.translation.translate('savedCartDetails.dateSaved').pipe(
      filter(() => Boolean(saveTime)),
      map((textTitle) => {
        return {
          title: textTitle,
          text: [saveTime ?? ''],
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

  getCartQuantity(totalUnitCount: number): Observable<Card> {
    return this.translation.translate('savedCartDetails.quantity').pipe(
      filter(() => Boolean(totalUnitCount)),
      map((textTitle) => ({
        title: textTitle,
        text: [totalUnitCount.toString()],
      }))
    );
  }

  getCartTotal(totalPriceWithTax: string): Observable<Card> {
    return this.translation.translate('savedCartDetails.total').pipe(
      filter(() => Boolean(totalPriceWithTax)),
      map((textTitle) => ({
        title: textTitle,
        text: [totalPriceWithTax],
      }))
    );
  }

  openDialog(cart: Cart): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.SAVED_CART,
      this.element,
      this.vcr,
      { cart, layoutOption: 'edit' }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
