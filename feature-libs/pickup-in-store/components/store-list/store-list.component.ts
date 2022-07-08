import { Component, OnInit } from '@angular/core';
import { PointOfServiceStock } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-store-list',
  templateUrl: 'store-list.component.html',
})
export class StoreListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  stores$: Observable<PointOfServiceStock[]>;
  searchHasBeenPerformed$: Observable<boolean>;

  constructor(
    private readonly pickupInStoreService: PickupInStoreFacade,
    private readonly preferredStoreService: PreferredStoreService
  ) {}

  ngOnInit() {
    this.stores$ = this.pickupInStoreService.getStores();
    this.isLoading$ = this.pickupInStoreService.getStockLoading();
    this.searchHasBeenPerformed$ =
      this.pickupInStoreService.getSearchHasBeenPerformed();
  }

  onSelectStore(storeName: string) {
    this.preferredStoreService.setPreferredStore(storeName);
  }
}
