import {
  Component,
  ElementRef,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
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
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

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
  private displayNameIsSet = false;

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

    this.displayName$ = this.outlet?.context$.pipe(
      map((entry) => entry?.deliveryPointOfService?.name),
      filter((name): name is string => !!name),
      tap((storeName) => this.storeDetails.loadStoreDetails(storeName)),
      switchMap((storeName) => this.storeDetails.getStoreDetails(storeName)),
      map((store) => store?.displayName ?? ''),
      tap((_displayName) => (this.displayNameIsSet = true))
    );

    this.activeCartFacade
      .getActive()
      .pipe(
        tap((cart) => (this.cartId = cart.guid ?? '')),
        tap((cart) => (this.userId = cart?.user?.uid ?? ''))
      )
      .subscribe();
  }

  onPickupOptionChange(pickupOption: PickupOption): void {
    const data: PatchDeliveryOptionPayload = {
      cartId: this.cartId,
      pickupOption,
      entryNumber: this.entryNumber,
      userId: this.userId,
      productCode: this.productCode,
      quantity: this.quantity,
      name: 'pickup',
    };

    this.intendedPickupLocationService.setPickupOption(
      this.productCode,
      pickupOption
    );
    if (pickupOption === 'delivery') {
      this.intendedPickupLocationService.removeIntendedLocation(
        this.productCode
      );
      this.storeDetails.patchDeliveryOption(data);
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
}
