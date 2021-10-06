import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GeoPoint, SearchConfig } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import {
  StoreFinderSearchQuery,
  StoreFinderService,
  StoreFinderConfig,
} from '@spartacus/storefinder/core';

@Component({
  selector: 'cx-store-finder-search-result',
  templateUrl: './store-finder-search-result.component.html',
})
export class StoreFinderSearchResultComponent implements OnInit, OnDestroy {
  locations: any;
  subscription: Subscription;
  useMyLocation: boolean;
  countryCode: string = null;
  searchConfig: SearchConfig = {
    currentPage: 0,
  };
  radius: number;
  searchQuery: StoreFinderSearchQuery;
  geolocation: GeoPoint;
  locations$: Observable<any>;
  isLoading$: Observable<any>;

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute,
    protected config: StoreFinderConfig
  ) {}

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe((params) =>
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
      this.useMyLocation,
      this.radius
    );
  }

  private initialize(params: Params) {
    this.searchQuery = this.parseParameters(params);
    this.useMyLocation = params && params.useMyLocation ? true : false;
    this.searchConfig = { ...this.searchConfig, currentPage: 0 };
    this.radius = this.config.googleMaps.radius;
    this.storeFinderService.findStoresAction(
      this.searchQuery.queryText,
      this.searchConfig,
      this.geolocation,
      this.countryCode,
      this.useMyLocation,
      this.radius
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
