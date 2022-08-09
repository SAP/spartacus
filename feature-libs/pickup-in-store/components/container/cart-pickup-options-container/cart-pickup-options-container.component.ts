import {
  Component,
  ElementRef,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { Product } from '@spartacus/core';
import { PointOfServiceNames, PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PatchDeliveryOptionPayload,
  PickupLocationsSearchFacade,
  PickupOption,
} from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  OutletContextData,
  LAUNCH_CALLER,
  CurrentProductService,
} from '@spartacus/storefront';
import { combineLatest, iif, Observable, of, Subscription } from 'rxjs';
import { filter, map, switchMap, take, tap, startWith } from 'rxjs/operators';

function isProductWithCode(
  product: Product | null
): product is Required<Pick<Product, 'code'>> & Product {
  return !!product?.code;
}
function hasNames(
  store: PointOfServiceNames | undefined
): store is Required<PointOfServiceNames> {
  return !!store?.name && !!store?.displayName;
}
@Component({
  selector: 'cx-cart-pickup-options-container',
  templateUrl: 'cart-pickup-options-container.component.html',
})
export class CartPickupOptionsContainerComponent implements OnInit {
  @ViewChild('open') element: ElementRef;
  subscription = new Subscription();
  pickupOption$: Observable<PickupOption>;
  displayName$: Observable<string>;
  cartId: string;
  name: string;
  entryNumber: number;
  productCode: string;
  quantity: number;
  userId: string;
  displayPickupLocation$: Observable<string | undefined>;
  availableForPickup = false;
  // private displayNameIsSet = false;

  constructor(
    @Optional() protected outlet: OutletContextData<OrderEntry>,
    protected storeDetails: PickupLocationsSearchFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected currentProductService: CurrentProductService,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    protected launchDialogService: LaunchDialogService,
    protected preferredStoreService: PreferredStoreService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.pickupOption$ = this.outlet?.context$.pipe(
      tap(
        (outletContextData) =>
          (this.entryNumber = outletContextData.entryNumber ?? -1)
      ),
      tap(
        (outletContextData) =>
          (this.quantity = outletContextData.quantity ?? -1)
      ),
      tap(
        (outletContextData) =>
          (this.productCode = outletContextData?.product?.code ?? '')
      ),
      tap(
        (outletContextData) =>
          (this.name = outletContextData?.deliveryPointOfService?.name ?? '')
      ),
      map(
        (item): PickupOption =>
          item?.deliveryPointOfService ? 'pickup' : 'delivery'
      )
    );

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

    this.displayName$ = this.outlet?.context$.pipe(
      map((entry) => entry?.deliveryPointOfService?.name),
      filter((name): name is string => !!name),
      tap((storeName) => this.storeDetails.loadStoreDetails(storeName)),
      switchMap((storeName) => this.storeDetails.getStoreDetails(storeName)),
      map((store) => store?.displayName ?? '')
    );

    this.activeCartFacade
      .getActive()
      .pipe(
        tap((cart) => (this.cartId = cart.guid ?? '')),
        tap((cart) => (this.userId = cart?.user?.uid ?? ''))
      )
      .subscribe();
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
            !!intendedLocation?.displayName,
          of(intendedLocation?.displayName),
          of(this.preferredStoreService.getPreferredStore()).pipe(
            filter(hasNames),
            tap((preferredStore) => {
              this.pickupLocationsSearchService.stockLevelAtStore(
                productCode,
                preferredStore.name
              );
            }),
            switchMap((preferredStore) =>
              this.pickupLocationsSearchService
                .getStockLevelAtStore(productCode, preferredStore.name)
                .pipe(
                  filter((stock) => !!stock?.stockLevel),
                  map((_) => preferredStore.displayName)
                )
            )
          )
        )
      ),
      // tap(() => (this.displayNameIsSet = true))
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

  onPickupOptionChange(pickupOption: PickupOption): void {
    this.openDialog();
    const data: PatchDeliveryOptionPayload = {
      cartId: this.cartId,
      pickupOption,
      name: this.name,
      entryNumber: this.entryNumber,
      userId: this.userId,
      productCode: this.productCode,
      quantity: this.quantity,
    };

    this.storeDetails.patchDeliveryOption(data);
  }

  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      this.element,
      this.vcr,
      { productCode: this.productCode }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  /**
   *
   * @TODO: This has to be implemented.
   */
  onPickupLocationChange(_data: any): void {
    console.log('Cart modal window');
  }
}
