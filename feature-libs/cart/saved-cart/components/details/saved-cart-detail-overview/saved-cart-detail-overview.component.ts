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
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { SavedCartService } from 'feature-libs/cart/saved-cart/core/services/saved-cart.service';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { SavedCartDetailService } from '../saved-cart-detail.service';

@Component({
  selector: 'cx-saved-cart-detail-overview',
  templateUrl: './saved-cart-detail-overview.component.html',
})
export class SavedCartDetailOverviewComponent implements OnDestroy {
  iconTypes = ICON_TYPE;
  savedCart$: Observable<Cart> = this.savedCartDetailService.getCartDetails();

  @ViewChild('element') element: ElementRef;

  protected subscription = new Subscription();

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected savedCartDetailService: SavedCartDetailService,
    protected savedCartService: SavedCartService,
    protected translation: TranslationService,
    protected vcr: ViewContainerRef
  ) {}

  ngOnDestroy(): void {
    this.launchDialogService.clear(LAUNCH_CALLER.ADD_TO_SAVED_CART);
    this.subscription?.unsubscribe();
  }

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

  editCart(cart: Cart): void {
    const dialog = this.openDialog(this.element, this.vcr, cart);

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  deleteCart(cartId: string): void {
    //  TODO: asked Marcin if I can make changes to the cart actions
    // question is catered towards deprecations
    // main question is that I want to add the loader state mechanism to it
    this.savedCartService.deleteSavedCart(cartId);
  }

  protected openDialog(
    openElement?: ElementRef,
    vcr?: ViewContainerRef,
    data?: any
  ): Observable<any> | undefined {
    const component = this.launchDialogService.launch(
      LAUNCH_CALLER.ADD_TO_SAVED_CART,
      vcr,
      data
    );

    if (component) {
      return combineLatest([
        component,
        this.launchDialogService.dialogClose,
      ]).pipe(
        filter(([, close]) => close !== undefined),
        tap(([comp]) => {
          openElement?.nativeElement.focus();
          this.launchDialogService.clear(LAUNCH_CALLER.ADD_TO_SAVED_CART);
          comp.destroy();
        }),
        map(([comp]) => comp)
      );
    }
  }

  private getDate(givenDate: Date): string {
    const date = givenDate.toDateString().split(' ');

    const month = date[1];
    const day = date[2];
    const year = date[3];

    return month + ' ' + day + ' ' + year;
  }
}
