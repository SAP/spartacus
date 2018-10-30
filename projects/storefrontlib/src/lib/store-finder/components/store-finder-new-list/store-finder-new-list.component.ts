import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import * as fromStore from '../../store';
import { SearchConfig } from '../../models/search-config';
import { StoreDataService } from '../../services/store-data.service';
import { SearchQuery } from '../../models/search-query';
import { ActivatedRoute } from '@angular/router';
import { StoreFinderService } from '../../services';

@Component({
  selector: 'y-store-finder-new-list',
  template: ` <div *ngIf="!(isLoading$ | async) && (locations$ | async) as locations; else loading">
  <y-store-finder-list [locations]=locations></y-store-finder-list>
  <div *ngIf="locations?.stores" class="row">
            <div class="col-md-6 offset-md-3 y-store-finder-list__pagination">
                <y-pagination [pagination]="locations.pagination" (viewPageEvent)="viewPage($event)"></y-pagination>
            </div>
        </div>
        </div>
        <ng-template #loading>
    <div class="y-store-finder-list__spinner">
        <y-spinner></y-spinner>
    </div>
</ng-template>`
})
export class StoreFinderNewListComponent implements OnInit, OnDestroy {
  locations: any;
  searchQuery: SearchQuery;
  locations$: Observable<any>;
  isLoading$: Observable<any>;
  searchConfig: SearchConfig = {
    currentPage: 0
  };

  constructor(
    private store: Store<fromStore.StoresState>,
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initialize();

    this.route.params.subscribe(() => {
      this.initialize();
    });
  }

  initialize() {
    this.searchQuery = { queryText: this.route.snapshot.params.query };
    this.storeFinderService.findStores(this.searchQuery.queryText);
    this.isLoading$ = this.store.pipe(select(fromStore.getStoresLoading));

    this.locations$ = this.store.pipe(select(fromStore.getFindStoresEntities));
  }

  ngOnDestroy(): void {}

  viewPage(pageNumber: number) {
    this.searchConfig = { ...this.searchConfig, currentPage: pageNumber };
    this.store.dispatch(
      new fromStore.FindStores({
        queryText: this.searchQuery.queryText,
        longitudeLatitude: this.searchQuery.longitudeLatitude,
        searchConfig: this.searchConfig
      })
    );
  }
}
