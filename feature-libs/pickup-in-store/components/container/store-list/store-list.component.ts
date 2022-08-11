import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { PointOfServiceStock } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PatchDeliveryOptionPayload,
  PickupLocationsSearchFacade,
  PickupOption,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-store-list',
  templateUrl: 'store-list.component.html',
})
export class StoreListComponent implements OnInit {
  @Input()
  productCode: string;
  @Output()
  storeSelected: EventEmitter<null> = new EventEmitter<null>();

  stores$: Observable<PointOfServiceStock[]>;
  hasSearchStarted$: Observable<boolean>;
  isSearchRunning$: Observable<boolean>;
  cartId: string;
  pickupOption: PickupOption;
  name: string;
  entryNumber: number;
  userId: string;
  quantity?: number;

  constructor(
    private readonly pickupLocationsSearchService: PickupLocationsSearchFacade,
    private readonly preferredStoreService: PreferredStoreService,
    private readonly intendedPickupLocationService: IntendedPickupLocationFacade,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  ngOnInit() {
    this.stores$ = this.pickupLocationsSearchService.getSearchResults(
      this.productCode
    );
    this.hasSearchStarted$ = this.pickupLocationsSearchService.hasSearchStarted(
      this.productCode
    );
    this.isSearchRunning$ = this.pickupLocationsSearchService.isSearchRunning();

    this.activeCartFacade
      .getActive()
      .pipe(
        tap((cart) => {
          this.cartId = cart.guid ?? '';
          this.userId = cart?.user?.uid ?? '';
          cart.entries &&
            cart.entries.forEach((entry) => {
              if (entry?.product?.code === this.productCode) {
                this.entryNumber = entry?.entryNumber ?? -1;
                this.quantity = entry.quantity;
              }
            });
        })
      )
      .subscribe();
  }

  onSelectStore(store: PointOfServiceStock) {
    const { stockInfo: _, ...pointOfService } = store;
    const { name, displayName } = pointOfService;

    const data: PatchDeliveryOptionPayload = {
      cartId: this.cartId,
      pickupOption: 'pickup',
      name: name ?? '',
      entryNumber: this.entryNumber,
      userId: this.userId,
      productCode: this.productCode,
      quantity: this.quantity,
    };

    this.preferredStoreService.setPreferredStore({ name, displayName });
    this.intendedPickupLocationService.setIntendedLocation(this.productCode, {
      ...pointOfService,
      pickupOption: 'pickup',
    });

    this.pickupLocationsSearchService.patchDeliveryOption(data);

    this.storeSelected.emit();
  }
}
