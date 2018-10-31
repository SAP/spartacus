import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import { StoreFinderService } from '../../services';

@Component({
  selector: 'y-store-finder-list-count',
  templateUrl: './store-finder-list-count.component.html',
  styleUrls: ['./store-finder-list-count.component.scss']
})
export class StoreFinderListCountComponent implements OnInit {
  locations$: Observable<any>;
  isLoading$: Observable<any>;

  constructor(
    private store: Store<fromStore.StoresState>,
    private storeFinderService: StoreFinderService
  ) {}

  ngOnInit() {
    this.storeFinderService.viewAllStores();
    this.locations$ = this.store.pipe(
      select(fromStore.getViewAllStoresEntities)
    );
    this.isLoading$ = this.store.pipe(select(fromStore.getStoresLoading));
  }
}
