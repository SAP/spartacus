/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ActiveCartFacade,
  CartItemContext,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { Product } from '@spartacus/core';
import {
  getProperty,
  PreferredStoreService,
} from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
  PickupOption,
  PickupOptionFacade,
  RequiredDeepPath,
} from '@spartacus/pickup-in-store/root';
import {
  CurrentProductService,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { iif, Observable, of, Subscription } from 'rxjs';
import { concatMap, filter, map, switchMap, take, tap } from 'rxjs/operators';

// these functions should be moved to util
function isProductWithCode(
  product: Product | null
): product is RequiredDeepPath<Product, 'code'> {
  return !!product?.code;
}

type OrderEntryRequiredFields =
  | 'entryNumber'
  | 'quantity'
  | 'product.code'
  | 'product.availableForPickup';

/** An order entry with all the fields needed for using pickup in store */
type OrderEntryWithRequiredFields = RequiredDeepPath<
  OrderEntry,
  OrderEntryRequiredFields
>;
/** Custom type guard to ensure we have an order entry with all the required fields */
export function orderEntryWithRequiredFields(
  orderEntry: OrderEntry | undefined
): orderEntry is OrderEntryWithRequiredFields {
  return (
    !!orderEntry &&
    orderEntry.entryNumber !== undefined &&
    orderEntry.quantity !== undefined &&
    orderEntry.product !== undefined &&
    orderEntry.product.code !== undefined &&
    orderEntry.product.availableForPickup !== undefined
  );
}

/**
 * The presentational component of a pair of radio buttons for pickup options for a product.
 */
@Component({
  selector: 'cx-pickup-options',
  templateUrl: './pickup-options.component.html',
})
export class PickupOptionsComponent implements OnInit {
  @ViewChild('element') element: ElementRef;

  @Input() displayPickupLocation$: Observable<string | undefined>;

  @Input() product: Product;

  availableForPickup$: Observable<boolean>;

  subscription = new Subscription();

  displayNameIsSet = false;

  entryNumber: number;
  productCode: string;
  quantity: number;

  constructor(
    protected currentProductService: CurrentProductService,
    protected pickupOptionFacade: PickupOptionFacade,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    protected preferredStoreService: PreferredStoreService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected launchDialogService: LaunchDialogService,
    protected activeCartFacade: ActiveCartFacade,
    protected vcr: ViewContainerRef,
    @Optional() protected cartItemContext?: CartItemContext
  ) {}

  ngOnInit() {
    if (this.product) {
      this.availableForPickup$ = of(!!this.product.availableForPickup);
    } else {
      this.availableForPickup$ = this.cartItemContext
        ? this.cartItemContext.item$.pipe(
            filter(orderEntryWithRequiredFields),
            tap((orderEntry) => this.pickupForOrderEntry(orderEntry)),
            map((orderEntry) => orderEntry.product.availableForPickup ?? false)
          )
        : this.currentProductService.getProduct().pipe(
            filter(isProductWithCode),
            tap((product) => this.pickupForProduct(product)),
            map((product) => product.availableForPickup ?? false)
          );
    }
  }

  protected pickupForOrderEntry(orderEntry: any): void {
    this.productCode = orderEntry.product.code;
    this.entryNumber = orderEntry.entryNumber;
    this.quantity = orderEntry.quantity;

    const selectedOption = orderEntry.deliveryPointOfService
      ? 'pickup'
      : 'delivery';
    this.pickupOptionFacade.setPickupOption(
      orderEntry.entryNumber,
      selectedOption
    );

    this.pickupOptionsForm.get('pickupOption')?.setValue(selectedOption);

    const storeName = orderEntry.deliveryPointOfService?.name;
    this.displayPickupLocation$ = iif(
      () => !!storeName,
      of(storeName as string).pipe(
        tap((storeName) => {
          return this.pickupLocationsSearchService.loadStoreDetails(storeName);
        }),
        concatMap((storeName) =>
          this.pickupLocationsSearchService.getStoreDetails(storeName)
        ),
        filter((storeDetails) => !!storeDetails)
      ),
      this.preferredStoreService.getPreferredStoreWithProductInStock(
        this.productCode
      )
    ).pipe(
      map(({ displayName }) => displayName),
      filter((displayName): displayName is string => !!displayName),
      tap((_) => (this.displayNameIsSet = true))
    );
  }

  protected pickupForProduct(product: any): void {
    this.productCode = product.code;

    this.intendedPickupLocationService
      .getPickupOption(this.productCode)
      .pipe(take(1))
      .subscribe((selectedOption) =>
        this.pickupOptionsForm.get('pickupOption')?.setValue(selectedOption)
      );

    this.displayPickupLocation$ = this.intendedPickupLocationService
      .getIntendedLocation(this.productCode)
      .pipe(
        switchMap((intendedLocation) =>
          iif(
            () =>
              !!intendedLocation &&
              getProperty(intendedLocation, 'pickupOption') === 'pickup' &&
              !!intendedLocation.displayName,
            of(getProperty(intendedLocation, 'displayName')),
            this.preferredStoreService
              .getPreferredStoreWithProductInStock(this.productCode)
              .pipe(map(({ displayName }) => displayName))
          )
        ),
        tap(() => (this.displayNameIsSet = true))
      );
  }

  pickupId = `pickup-id:${Math.random().toString(16)}`;
  deliveryId = `delivery-id:${Math.random().toString(16)}`;

  pickupOptionsForm = new FormGroup({
    pickupOption: new FormControl<PickupOption | null>(null),
  });

  onPickupOptionChange(pickupOption: PickupOption): void {
    if (this.entryNumber !== undefined) {
      this.pickupOptionFacade.setPickupOption(this.entryNumber, pickupOption);
      if (pickupOption === 'delivery') {
        // use the refactored activeFacade.updateEntry function, so no need cartId and userId
        this.activeCartFacade
          .getActive()
          .pipe(take(1))
          .subscribe((cart) => {
            this.pickupLocationsSearchService.setPickupOptionToDelivery(
              cart.code || '',
              this.entryNumber,
              cart.user?.uid || '',
              this.productCode,
              this.quantity
            );
          });

        return;
      }
    } else {
      this.intendedPickupLocationService.setPickupOption(
        this.productCode,
        pickupOption
      );
      if (pickupOption === 'delivery') {
        this.intendedPickupLocationService.removeIntendedLocation(
          this.productCode
        );
        return;
      }
    }

    if (!this.displayNameIsSet) {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      this.element,
      this.vcr,
      {
        productCode: this.productCode,
        entryNumber: this.entryNumber,
        quantity: this.quantity,
      }
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }
}
