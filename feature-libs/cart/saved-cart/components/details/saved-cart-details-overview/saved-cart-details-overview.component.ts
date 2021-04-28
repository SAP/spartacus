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
import { SavedCartFormLaunchDialogService } from '../../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';
import { SavedCartDetailsService } from '../saved-cart-details.service';

@Component({
  selector: 'cx-saved-cart-details-overview',
  templateUrl: './saved-cart-details-overview.component.html',
})
export class SavedCartDetailsOverviewComponent implements OnDestroy {
  private subscription = new Subscription();

  @ViewChild('element') element: ElementRef;

  iconTypes = ICON_TYPE;
  savedCart$: Observable<
    Cart | undefined
  > = this.savedCartDetailsService.getCartDetails();

  // TODO(#12167): make launchDialogService a required dependency instead of savedCartFormLaunchDialogService and remove deprecated constructor
  /**
   * Default constructor
   *
   * @param {SavedCartDetailsService} savedCartDetailsService
   * @param {TranslationService} translation
   * @param {ViewContainerRef} vcr
   * @param {LaunchDialogService} launchDialogService
   */
  constructor(
    savedCartDetailsService: SavedCartDetailsService,
    translation: TranslationService,
    vcr: ViewContainerRef,
    launchDialogService: LaunchDialogService
  );

  /**
   * @deprecated since 3.3
   */
  constructor(
    savedCartDetailsService: SavedCartDetailsService,
    translation: TranslationService,
    savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService,
    vcr: ViewContainerRef
  );
  constructor(
    protected savedCartDetailsService: SavedCartDetailsService,
    protected translation: TranslationService,
    protected savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService,
    protected vcr: ViewContainerRef,
    protected launchDialogService?: LaunchDialogService
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
    // TODO(#12167): use launchDialogService only
    if (this.launchDialogService) {
      const dialog = this.launchDialogService.openDialog(
        LAUNCH_CALLER.SAVED_CART,
        this.element,
        this.vcr,
        { cart, layoutOption: 'edit' }
      );

      if (dialog) {
        this.subscription.add(dialog.pipe(take(1)).subscribe());
      }
    } else {
      const dialog = this.savedCartFormLaunchDialogService.openDialog(
        this.element,
        this.vcr,
        { cart, layoutOption: 'edit' }
      );

      if (dialog) {
        this.subscription.add(dialog.pipe(take(1)).subscribe());
      }
    }
  }

  private getDate(givenDate: Date): string {
    const date = givenDate.toDateString().split(' ');

    const month = date[1];
    const day = date[2];
    const year = date[3];

    return month + ' ' + day + ' ' + year;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
