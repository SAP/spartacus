/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Product } from '@spartacus/core';
import {
  getProperty,
} from '@spartacus/pickup-in-store/base/core';
import {
  IntendedPickupLocationFacade,
  PickupOption,
  PickupOptionFacade,
  RequiredDeepPath,
  PreferredStoreFacade,
} from '@spartacus/pickup-in-store/base/root';
import {
  CurrentProductService,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { combineLatest, iif, Observable, of, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';

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
})
export class PdpPickupOptionsContainerComponent implements OnInit, OnDestroy {
  @ViewChild('open') element: ElementRef;
  subscription = new Subscription();

  availableForPickup = false;
  displayPickupLocation$: Observable<string | undefined>;
  pickupOption$: Observable<PickupOption>;

  private productCode: string;
  private displayNameIsSet = false;

  constructor(
    protected currentProductService: CurrentProductService,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    protected launchDialogService: LaunchDialogService,
    protected pickupOptionFacade: PickupOptionFacade,
    protected preferredStoreService: PreferredStoreFacade,
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
      switchMap(({ intendedLocation, productCode }) =>
        iif(
          () =>
            !!intendedLocation &&
            getProperty(intendedLocation, 'pickupOption') === 'pickup' &&
            !!intendedLocation.displayName,
          of(getProperty(intendedLocation, 'displayName')),
          this.preferredStoreService
            .getPreferredStoreWithProductInStock(productCode)
            .pipe(map(({ displayName }) => displayName))
        )
      ),
      tap(() => (this.displayNameIsSet = true))
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

  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      this.element,
      this.vcr,
      { productCode: this.productCode }
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  onPickupOptionChange(option: PickupOption) {
    this.intendedPickupLocationService.setPickupOption(
      this.productCode,
      option
    );
    if (option === 'delivery') {
      this.intendedPickupLocationService.removeIntendedLocation(
        this.productCode
      );
      return;
    }
    if (!this.displayNameIsSet) {
      this.openDialog();
      return;
    }
    this.subscription.add(
      this.preferredStoreService
        .getPreferredStore$()
        .pipe(
          filter((preferredStore) => !!preferredStore),
          tap((preferredStore) =>
            this.intendedPickupLocationService.setIntendedLocation(
              this.productCode,
              {
                ...preferredStore,
                pickupOption: 'pickup',
              }
            )
          )
        )
        .subscribe()
    );
  }
}
