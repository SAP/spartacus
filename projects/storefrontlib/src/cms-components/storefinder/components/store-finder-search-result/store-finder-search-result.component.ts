import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  GeoPoint,
  SearchConfig,
  StoreFinderSearchQuery,
  StoreFinderService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-store-finder-search-result',
  templateUrl: './store-finder-search-result.component.html',
})
export class StoreFinderSearchResultComponent implements OnInit, OnDestroy {
  locations: any;
  searchQuery: StoreFinderSearchQuery;
  locations$: Observable<any>;
  isLoading$: Observable<any>;
  geolocation: GeoPoint;
  subscription: Subscription;
  useMyLocation: boolean;
  countryCode: string = null;
  searchConfig: SearchConfig = {
    currentPage: 0,
  };

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params =>
      this.initialize(params)
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  viewPage(pageNumber: number) {
    this.searchConfig = { ...this.searchConfig, currentPage: pageNumber };
    this.storeFinderService.findStoresAction(
      this.searchQuery.queryText,
      this.searchConfig,
      this.geolocation,
      this.countryCode,
      this.useMyLocation
    );
  }

  private initialize(params: Params) {
    this.searchQuery = this.parseParameters(params);
    this.useMyLocation = params && params.useMyLocation ? true : false;
    this.searchConfig = { ...this.searchConfig, currentPage: 0 };
    this.storeFinderService.findStoresAction(
      this.searchQuery.queryText,
      this.searchConfig,
      this.geolocation,
      this.countryCode,
      this.useMyLocation
    );

    this.isLoading$ = this.storeFinderService.getStoresLoading();
    this.locations$ = this.storeFinderService.getFindStoresEntities();
  }

  private parseParameters(queryParams: {
    [key: string]: any;
  }): StoreFinderSearchQuery {
    let searchQuery: StoreFinderSearchQuery;

    if (queryParams.query) {
      searchQuery = { queryText: queryParams.query };
    } else {
      searchQuery = { queryText: '' };
    }

    searchQuery.useMyLocation =
      queryParams.useMyLocation != null &&
      queryParams.useMyLocation.toUpperCase() === 'TRUE';

    return searchQuery;
  }
}
