import { Component, Input, OnInit } from '@angular/core';
import {
  StoreEntities,
  StoreFinderSearchQuery,
  StoreFinderService,
} from '@spartacus/storefinder/core';
import { Observable } from 'rxjs';

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
      this.findStores(this._storeSearch);
    }
  }
  get storeSearch(): StoreFinderSearchQuery {
    return this._storeSearch;
  }

  constructor(private readonly storeFinderService: StoreFinderService) {}

  ngOnInit() {
    this.locations$ = this.storeFinderService.getFindStoresEntities();
    this.isLoading$ = this.storeFinderService.getStoresLoading();
  }

  findStores(storeFinderSearchQuery: StoreFinderSearchQuery): void {
    this.storeFinderService.findStoresAction(
      storeFinderSearchQuery?.queryText ?? '',
      {},
      undefined,
      undefined,
      !!storeFinderSearchQuery?.useMyLocation,
      50000
    );
  }
}
