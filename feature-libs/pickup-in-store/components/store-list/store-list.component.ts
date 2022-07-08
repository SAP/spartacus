import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PointOfServiceStock } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupInStoreFacade,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-store-list',
  templateUrl: 'store-list.component.html',
})
export class StoreListComponent implements OnInit {
  @Input()
  productCode: string;
  @Output()
  storeSelected: EventEmitter<null> = new EventEmitter<null>();

  isLoading$: Observable<boolean>;
  stores$: Observable<PointOfServiceStock[]>;
  searchHasBeenPerformed$: Observable<boolean>;

  constructor(
    private readonly pickupInStoreService: PickupInStoreFacade,
    private readonly preferredStoreService: PreferredStoreService,
    private readonly intendedPickupLocationService: IntendedPickupLocationFacade
  ) {}

  ngOnInit() {
    this.stores$ = this.pickupInStoreService.getStores();
    this.isLoading$ = this.pickupInStoreService.getStockLoading();
    this.searchHasBeenPerformed$ =
      this.pickupInStoreService.getSearchHasBeenPerformed();
  }

  onSelectStore(store: PointOfServiceStock) {
    const { stockInfo: _, ...pointOfService } = store;
    this.preferredStoreService.setPreferredStore(pointOfService.name ?? '');
    this.intendedPickupLocationService.setIntendedLocation(
      this.productCode,
      pointOfService
    );
    this.storeSelected.emit();
  }
}
