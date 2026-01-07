/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Product } from '@spartacus/core';

import { AsyncPipe, NgIf } from '@angular/common';
import {
  AugmentedPointOfService,
  getProperty,
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
  PickupOption,
  PickupOptionFacade,
  PreferredStoreFacade,
  RequiredDeepPath,
} from '@spartacus/pickup-in-store/root';
import {
  CurrentProductService,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { PickupOptionsComponent } from '../../presentational';

/** Custom type guard to ensure we have a product a defined code */
function isProductWithCode(
  product: Product | null
): product is RequiredDeepPath<Product, 'code'> {
  return !!product?.code;
}

/**
 * A container component of the pair of the pickup options radio buttons for cart entry.
 */
@Component({
  selector: 'cx-cart-pickup-options-container',
  templateUrl: 'pdp-pickup-options-container.component.html',
  imports: [PickupOptionsComponent, AsyncPipe, NgIf],
})
export class PdpPickupOptionsContainerComponent implements OnInit, OnDestroy {
  @Output() intendedPickupChange = new EventEmitter<
    AugmentedPointOfService | undefined
  >();
  subscription = new Subscription();

  availableForPickup = false;
  displayPickupLocation$: Observable<string | undefined>;
  pickupOption$: Observable<PickupOption>;
  intendedPickupLocation$: Observable<AugmentedPointOfService | undefined>;
  private productCode: string;

  constructor(
    protected currentProductService: CurrentProductService,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    protected launchDialogService: LaunchDialogService,
    protected pickupOptionFacade: PickupOptionFacade,
    protected preferredStoreFacade: PreferredStoreFacade,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected vcr: ViewContainerRef
  ) {
    // Intentional empty constructor
  }

  ngOnInit() {
    this.pickupOptionFacade.setPageContext('PDP');
    const productCode$ = this.currentProductService.getProduct().pipe(
      filter(isProductWithCode),
      map((product) => {
        this.productCode = product.code;
        this.availableForPickup = !!product.availableForPickup;
        return this.productCode;
      }),
      tap(
        (productCode) =>
          (this.pickupOption$ =
            this.intendedPickupLocationService.getPickupOption(productCode))
      )
    );

    this.displayPickupLocation$ = this.currentProductService.getProduct().pipe(
      filter(isProductWithCode),
      map((product) => product.code),
      switchMap((productCode) =>
        this.intendedPickupLocationService
          .getIntendedLocation(productCode)
          .pipe(map((intendedLocation) => ({ intendedLocation, productCode })))
      ),
      switchMap(({ intendedLocation, productCode }) => {
        if (intendedLocation?.displayName) {
          return of(getProperty(intendedLocation, 'displayName'));
        }

        this.setIntendedPickupLocation(productCode);
        return of(undefined);
      })
    );

    this.intendedPickupLocation$ = this.currentProductService.getProduct().pipe(
      filter(isProductWithCode),
      map((product) => product.code),
      switchMap((productCode) =>
        this.intendedPickupLocationService.getIntendedLocation(productCode)
      )
    );

    this.subscription.add(
      this.intendedPickupLocation$.subscribe(this.intendedPickupChange)
    );

    this.subscription.add(
      combineLatest([
        productCode$,
        this.launchDialogService.dialogClose.pipe(
          filter((reason) => reason !== undefined),
          startWith(undefined)
        ),
      ])
        .pipe(
          switchMap(([productCode]) =>
            this.intendedPickupLocationService.getIntendedLocation(productCode)
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setIntendedPickupLocation(productCode: string) {
    this.subscription.add(
      this.preferredStoreFacade
        .getPreferredStoreWithProductInStock(productCode)
        .pipe(
          map(({ name }) => name),
          tap((storeName) =>
            this.pickupLocationsSearchService.loadStoreDetails(storeName)
          ),
          concatMap((storeName: string) =>
            this.pickupLocationsSearchService.getStoreDetails(storeName)
          ),
          filter((storeDetails) => !!storeDetails)
        )
        .subscribe((storeDetails) => {
          this.intendedPickupLocationService.setIntendedLocation(productCode, {
            ...storeDetails,
            pickupOption: 'delivery',
          });
        })
    );
  }

  openDialog(triggerElement: ElementRef): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      triggerElement,
      this.vcr,
      { productCode: this.productCode }
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  onPickupOptionChange(event: {
    option: PickupOption;
    triggerElement: ElementRef;
  }): void {
    this.intendedPickupLocationService.setPickupOption(
      this.productCode,
      event.option
    );
  }
}
