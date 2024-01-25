/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ActiveCartFacade,
  CartType,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { CmsService, Page } from '@spartacus/core';
import {
  cartWithIdAndUserId,
  getProperty,
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
  PickupOption,
  PickupOptionFacade,
  PreferredStoreFacade,
  RequiredDeepPath,
} from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { EMPTY, iif, Observable, of, Subscription } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

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
 * A container component of the pair of the pickup options radio buttons for cart entry.
 */
@Component({
  selector: 'cx-cart-pickup-options-container',
  templateUrl: 'cart-pickup-options-container.component.html',
})
export class CartPickupOptionsContainerComponent implements OnInit, OnDestroy {
  @ViewChild('open') element: ElementRef;

  pickupOption$: Observable<PickupOption | undefined>;
  disableControls$: Observable<boolean>;
  storeDetails$: Observable<{
    name: string | undefined;
    displayName: string | undefined;
  }>;
  availableForPickup$: Observable<boolean>;
  subscription = new Subscription();
  cartId: string;
  cartType: CartType;
  entryNumber: number;
  productCode: string;
  quantity: number;
  userId: string;
  private displayNameIsSet = false;
  page?: string;
  readonly CartType = CartType;
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected launchDialogService: LaunchDialogService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected pickupOptionFacade: PickupOptionFacade,
    protected preferredStoreFacade: PreferredStoreFacade,
    protected vcr: ViewContainerRef,
    protected cmsService: CmsService,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    @Optional()
    protected outlet: OutletContextData<{
      item: OrderEntry;
      cartType: CartType;
    }>
  ) {
    // Intentional empty constructor
  }

  ngOnInit() {
    const outletContext =
      this.outlet?.context$?.pipe(
        map((context) => {
          this.cartType = context.cartType;
          return context.item;
        }),
        filter(orderEntryWithRequiredFields)
      ) ?? EMPTY;

    this.cmsService
      .getCurrentPage()
      .pipe(
        filter<Page>(Boolean),
        take(1),
        tap((cmsPage) => {
          this.page = cmsPage.pageId;
          this.pickupOptionFacade.setPageContext(cmsPage.pageId ?? '');
        })
      )
      .subscribe();

    this.availableForPickup$ = outletContext.pipe(
      map((orderEntry) => !!orderEntry.product.availableForPickup),
      startWith(false)
    );

    this.pickupOption$ = outletContext.pipe(
      withLatestFrom(
        this.activeCartFacade.getActive().pipe(filter(cartWithIdAndUserId))
      ),
      tap(([orderEntry, cart]) => {
        this.entryNumber = orderEntry.entryNumber;
        this.quantity = orderEntry.quantity;
        this.productCode = orderEntry.product.code;
        this.cartId = cart.user.uid === 'anonymous' ? cart.guid : cart.code;
        this.userId = cart.user.uid;
      }),
      switchMap(([orderEntry]) => {
        const pickupOption: PickupOption = orderEntry.deliveryPointOfService
          ? 'pickup'
          : 'delivery';
        this.pickupOptionFacade.setPickupOption(this.entryNumber, pickupOption);
        return this.pickupOptionFacade.getPickupOption(this.entryNumber);
      })
    );

    this.disableControls$ = this.activeCartFacade.getEntries().pipe(
      map((entries) => entries.map((entry) => entry.product?.code)),
      switchMap((productCodes) =>
        outletContext.pipe(
          map((orderEntry) => orderEntry?.product.code),
          map(
            (orderEntry) =>
              productCodes.filter((productCode) => productCode === orderEntry)
                .length > 1
          )
        )
      )
    );

    this.storeDetails$ = outletContext.pipe(
      map((orderEntry) => ({
        storeName: orderEntry.deliveryPointOfService?.name,
        productCode: orderEntry.product.code,
      })),
      switchMap(({ storeName, productCode }) =>
        iif(
          () => !!storeName,
          of(storeName as string).pipe(
            tap((_storeName) => {
              return this.pickupLocationsSearchService.loadStoreDetails(
                _storeName
              );
            }),
            concatMap((_storeName) =>
              this.pickupLocationsSearchService.getStoreDetails(_storeName)
            ),
            filter((storeDetails) => !!storeDetails),
            tap((storeDetails) => {
              this.intendedPickupLocationService.setIntendedLocation(
                productCode,
                {
                  ...storeDetails,
                  pickupOption: 'pickup',
                }
              );
            })
          ),
          this.intendedPickupLocationService
            .getIntendedLocation(productCode)
            .pipe(
              map((intendedLocation) => ({
                intendedLocation,
                givenProductCode: productCode,
              })),
              switchMap(({ intendedLocation, givenProductCode }) =>
                iif(
                  () => !!intendedLocation && !!intendedLocation.displayName,
                  of({
                    displayName: getProperty(intendedLocation, 'displayName'),
                    name: getProperty(intendedLocation, 'name'),
                  }),
                  this.preferredStoreFacade
                    .getPreferredStoreWithProductInStock(productCode)
                    .pipe(
                      map(({ name }) => name),
                      tap((_storeName) =>
                        this.pickupLocationsSearchService.loadStoreDetails(
                          _storeName
                        )
                      ),
                      concatMap((_storeName: string) =>
                        this.pickupLocationsSearchService.getStoreDetails(
                          _storeName
                        )
                      ),
                      filter((storeDetails) => !!storeDetails),
                      tap((storeDetails) => {
                        this.intendedPickupLocationService.setIntendedLocation(
                          givenProductCode,
                          {
                            ...storeDetails,
                            pickupOption: 'delivery',
                          }
                        );
                      })
                    )
                )
              )
            )
        )
      ),
      map(({ displayName, name }) => ({ displayName, name })),
      tap((_) => (this.displayNameIsSet = true))
    );
  }

  onPickupOptionChange(pickupOption: PickupOption): void {
    this.pickupOptionFacade.setPickupOption(this.entryNumber, pickupOption);
    if (pickupOption === 'delivery') {
      this.activeCartFacade.updateEntry(
        this.entryNumber,
        this.quantity,
        undefined,
        true
      );
      return;
    }
    [pickupOption]
      .filter((option) => option === 'pickup')
      .forEach(() => {
        this.subscription.add(
          this.storeDetails$
            .pipe(
              filter(({ name }) => !!name),
              tap(({ name }) =>
                this.activeCartFacade.updateEntry(
                  this.entryNumber,
                  this.quantity,
                  name,
                  true
                )
              )
            )
            .subscribe()
        );
      });

    if (!this.displayNameIsSet) {
      this.openDialog();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
