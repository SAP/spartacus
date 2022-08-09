import { Component, OnInit, Optional } from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import {
  PatchDeliveryOptionPayload,
  PickupLocationsSearchFacade,
  PickupOption,
} from '@spartacus/pickup-in-store/root';
import { OutletContextData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-pickup-options-container',
  templateUrl: 'cart-pickup-options-container.component.html',
})
export class CartPickupOptionsContainerComponent implements OnInit {
  pickupOption$: Observable<PickupOption>;
  displayName$: Observable<string>;
  cartId: string;
  name: string;
  entryNumber: number;
  productCode: string;
  quantity: number;
  userId: string;

  constructor(
    @Optional() protected outlet: OutletContextData<OrderEntry>,
    protected storeDetails: PickupLocationsSearchFacade,
    protected activeCartFacade: ActiveCartFacade
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
      map((store) => store?.displayName ?? '')
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
      name: this.name,
      entryNumber: this.entryNumber,
      userId: this.userId,
      productCode: this.productCode,
      quantity: this.quantity,
    };

    this.storeDetails.patchDeliveryOption(data);
  }

  /**
   *
   * @TODO: This has to be implemented.
   */
  onPickupLocationChange(data: any): void {
    console.log(data);
  }
}
