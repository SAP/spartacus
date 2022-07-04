import { Component, Input, OnInit } from '@angular/core';
import { PointOfServiceStock } from '@spartacus/core';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';
import { StoreFinderSearchQuery } from '@spartacus/storefinder/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-store-list',
  templateUrl: 'store-list.component.html',
})
export class StoreListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  stores$: Observable<PointOfServiceStock[]>;
  searchHasBeenPerformed$: Observable<boolean>;

  private _storeSearch: StoreFinderSearchQuery;
  @Input() set storeSearch(storeFinderSearchQuery: StoreFinderSearchQuery) {
    this._storeSearch = storeFinderSearchQuery;
  }
  get storeSearch(): StoreFinderSearchQuery {
    return this._storeSearch;
  }

  constructor(private readonly pickupInStoreService: PickupInStoreFacade) {}

  ngOnInit() {
    this.stores$ = this.pickupInStoreService.getStores();
    this.isLoading$ = this.pickupInStoreService.getStockLoading();
    this.searchHasBeenPerformed$ =
      this.pickupInStoreService.getSearchHasBeenPerformed();
  }
}
