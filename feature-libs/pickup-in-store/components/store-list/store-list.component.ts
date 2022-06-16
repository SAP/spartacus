import { Component, Input, OnInit } from '@angular/core';
import { PickupInStoreFacade } from '@spartacus/pickup-in-store/root';
import {
  StoreEntities,
  StoreFinderSearchQuery,
} from '@spartacus/storefinder/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'cx-store-list',
  templateUrl: 'store-list.component.html',
})
export class StoreListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  locations$: Observable<StoreEntities>;

  private _storeSearch: StoreFinderSearchQuery;
  @Input() set storeSearch(storeFinderSearchQuery: StoreFinderSearchQuery) {
    this._storeSearch = storeFinderSearchQuery;
    if (this._storeSearch) {
      // this.findStores(this._storeSearch);
    }
  }
  get storeSearch(): StoreFinderSearchQuery {
    return this._storeSearch;
  }

  constructor(
    // private readonly storeFinderService: StoreFinderService,
    private readonly pickupInStoreService: PickupInStoreFacade
  ) {}

  ngOnInit() {
    console.log('StoreListComponent.ngOnInit');
    // this.pickupInStoreService.getStore({
    //   productCode: '300310300',
    //   latitude: 0,
    //   longitude: 0,
    // });
    console.log('StoreListComponent.ngOnInit done');

    this.locations$ = this.pickupInStoreService.getStockEntities();
    this.isLoading$ = of(false);

    //   // just whilst developing
    //   this.storeFinderService.findStoresAction(
    //     '',
    //     {},
    //     undefined,
    //     undefined,
    //     true,
    //     50000
    //   );
    // }

    // findStores(storeFinderSearchQuery: StoreFinderSearchQuery): void {
    //   this.storeFinderService.findStoresAction(
    //     storeFinderSearchQuery?.queryText ?? '',
    //     {},
    //     undefined,
    //     undefined,
    //     !!storeFinderSearchQuery?.useMyLocation,
    //     50000
    //   );
  }
}
