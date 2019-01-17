import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  StoreFinderSearchConfig,
  StoreFinderSearchQuery,
  LongitudeLatitude,
  StoreFinderService
} from '@spartacus/core';
@Component({
  selector: 'cx-store-finder-search-result',
  templateUrl: './store-finder-search-result.component.html',
  styleUrls: ['./store-finder-search-result.component.scss']
})
export class StoreFinderSearchResultComponent implements OnInit, OnDestroy {
  locations: any;
  searchQuery: StoreFinderSearchQuery;
  locations$: Observable<any>;
  isLoading$: Observable<any>;
  geolocation: LongitudeLatitude;
  subscription: Subscription;
  searchConfig: StoreFinderSearchConfig = {
    currentPage: 0
  };

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.searchQuery = this.parseParameters(params);
      this.storeFinderService.findStores(
        this.searchQuery.queryText,
        this.searchQuery.useMyLocation
      );
    });

    this.isLoading$ = this.storeFinderService.getStoresLoading();
    this.locations$ = this.storeFinderService
      .getFindStoresEntities()
      .pipe(tap(data => (this.geolocation = data.geolocation)));
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
      this.geolocation,
      this.searchConfig
    );
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
