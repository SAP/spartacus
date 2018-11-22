import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchConfig } from '../../models/search-config';
import { SearchQuery } from '../../models/search-query';
import { LongitudeLatitude } from '../../models/longitude-latitude';
import { StoreFinderService } from '../../services/store-finder.service';

import * as fromStore from '../../store';

@Component({
  selector: 'cx-store-finder-search-result',
  templateUrl: './store-finder-search-result.component.html',
  styleUrls: ['./store-finder-search-result.component.scss']
})
export class StoreFinderSearchResultComponent implements OnInit, OnDestroy {
  locations: any;
  searchQuery: SearchQuery;
  locations$: Observable<any>;
  isLoading$: Observable<any>;
  geolocation: LongitudeLatitude;
  ngUnsubscribe: Subscription;
  searchConfig: SearchConfig = {
    currentPage: 0
  };

  constructor(
    private store: Store<fromStore.StoresState>,
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.initialize(params));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }

  viewPage(pageNumber: number) {
    this.searchConfig = { ...this.searchConfig, currentPage: pageNumber };
    this.store.dispatch(
      new fromStore.FindStores({
        queryText: this.searchQuery.queryText,
        longitudeLatitude: this.geolocation,
        searchConfig: this.searchConfig
      })
    );
  }

  private initialize(params: Params) {
    this.searchQuery = this.parseParameters(params);
    this.storeFinderService.findStores(
      this.searchQuery.queryText,
      this.searchQuery.useMyLocation
    );

    this.isLoading$ = this.store.pipe(select(fromStore.getStoresLoading));
    this.locations$ = this.store.pipe(select(fromStore.getFindStoresEntities));
    this.ngUnsubscribe = this.locations$
      .pipe(map(data => data.geolocation))
      .subscribe(geoData => (this.geolocation = geoData));
  }

  private parseParameters(queryParams: { [key: string]: any }): SearchQuery {
    let searchQuery: SearchQuery;

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
