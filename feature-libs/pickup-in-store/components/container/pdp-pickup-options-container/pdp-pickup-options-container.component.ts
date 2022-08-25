/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupOption,
} from '@spartacus/pickup-in-store/root';
import {
  CurrentProductService,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { combineLatest, iif, Observable, of, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';

function isProductWithCode(
  product: Product | null
): product is Required<Pick<Product, 'code'>> & Product {
  return !!product?.code;
}

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
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    protected currentProductService: CurrentProductService,
    protected preferredStoreService: PreferredStoreService
  ) {
    // Intentional empty constructor
  }

  ngOnInit() {
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
            intendedLocation?.pickupOption === 'pickup' &&
            !!intendedLocation.displayName,
          of(intendedLocation?.displayName),
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
    const preferredStore = this.preferredStoreService.getPreferredStore();
    if (!this.displayNameIsSet) {
      this.openDialog();
    } else if (preferredStore) {
      this.intendedPickupLocationService.setIntendedLocation(this.productCode, {
        ...preferredStore,
        pickupOption: 'pickup',
      });
    }
  }
}
