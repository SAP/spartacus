/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  AugmentedPointOfService,
  cartWithIdAndUserId,
  IntendedPickupLocationFacade,
  LocationSearchParams,
  PickupLocationsSearchFacade,
  PickupOptionFacade,
} from '@spartacus/pickup-in-store/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';

import { Observable, Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

/**
 * The dialog box to select the pickup location for a product.
 */
@Component({
  selector: 'cx-pickup-option-dialog',
  templateUrl: './pickup-option-dialog.component.html',
})
export class PickupOptionDialogComponent implements OnInit, OnDestroy {
  productCode: string;
  entryNumber: number;
  quantity: number;
  getHideOutOfStockState$: Observable<boolean>;
  loading: boolean;
  subscription = new Subscription();
  isPDP: boolean;
  cartId: string;
  userId: string;

  readonly focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'input',
    focusOnEscape: true,
  };

  readonly ICON_TYPE = ICON_TYPE;
  /** The reason given closing the dialog window without selecting a location */
  readonly CLOSE_WITHOUT_SELECTION = 'CLOSE_WITHOUT_SELECTION';
  /** The reason given closing the dialog window after selecting a location */
  readonly LOCATION_SELECTED = 'LOCATION_SELECTED';

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected elementRef: ElementRef,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    protected launchDialogService: LaunchDialogService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected pickupOptionFacade: PickupOptionFacade
  ) {
    // Intentional empty constructor
  }

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if (
      (event.target as any).tagName === this.elementRef.nativeElement.tagName
    ) {
      this.close(this.CLOSE_WITHOUT_SELECTION);
    }
  }

  ngOnInit() {
    this.subscription.add(
      this.launchDialogService.data$.subscribe(
        ({ productCode, entryNumber, quantity }) => {
          this.productCode = productCode;
          this.entryNumber = entryNumber;
          this.quantity = quantity;
        }
      )
    );

    this.getHideOutOfStockState$ =
      this.pickupLocationsSearchService.getHideOutOfStock();

    this.subscription.add(
      this.pickupOptionFacade
        .getPageContext()
        .subscribe((_data) => (this.isPDP = _data === 'PDP'))
    );

    this.subscription.add(
      this.activeCartFacade
        .getActive()
        .pipe(
          filter(cartWithIdAndUserId),
          tap((cart) => {
            this.cartId = cart.user.uid === 'anonymous' ? cart.guid : cart.code;
            this.userId = cart.user.uid;
          })
        )
        .subscribe()
    );
  }

  /**
   * Find the pickup points of service nearest to a place based on given search parameters.
   * @param locationSearchParams The latitude and longitude or free text search query to be used
   */
  onFindStores(locationSearchParams: LocationSearchParams): void {
    this.pickupLocationsSearchService.startSearch({
      productCode: this.productCode,
      ...locationSearchParams,
    });
  }

  /**
   * Toggle whether locations without store should be shown or hidden.
   */
  onHideOutOfStock(): void {
    this.pickupLocationsSearchService.toggleHideOutOfStock();
  }

  /**
   * Close the dialog window. This has additional side effects based upon whether
   * we are making a selection on the PDP or in the cart/during checkout.
   *
   * On the PDP:
   *
   * If the dialog is closed without making a selection, then the radio buttons
   * are left on pickup if there already exists an intended pickup location or
   * to delivery if not.
   *
   * Not on the PDP:
   *
   * If the window is closed after making a selection, then the cart is updated
   * to the the new selection.
   *
   * @param reason The reason the dialog window was closed
   */
  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
    if (reason === this.CLOSE_WITHOUT_SELECTION) {
      this.intendedPickupLocationService
        .getIntendedLocation(this.productCode)
        .pipe(
          filter(
            (store: AugmentedPointOfService | undefined) =>
              typeof store !== 'undefined'
          ),
          map((store) => store as AugmentedPointOfService),
          filter((store) => !store.name),
          take(1),
          tap(() =>
            this.intendedPickupLocationService.setPickupOption(
              this.productCode,
              'delivery'
            )
          )
        )
        .subscribe();
      this.pickupOptionFacade.setPickupOption(this.entryNumber, 'delivery');
      return;
    }
    this.subscription.add(
      this.intendedPickupLocationService
        .getIntendedLocation(this.productCode)
        .pipe(
          filter((store) => !this.isPDP && !!store),
          tap((store) =>
            this.activeCartFacade.updateEntry(
              this.entryNumber,
              this.quantity,
              (store as AugmentedPointOfService).name as string,
              false
            )
          )
        )
        .subscribe()
    );
  }

  /**
   * Change if the loading spinner should be displayed or not.
   * @param showSpinner Whether the loading spinner should be displayed
   */
  showSpinner(showSpinner: boolean): void {
    this.loading = showSpinner;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
