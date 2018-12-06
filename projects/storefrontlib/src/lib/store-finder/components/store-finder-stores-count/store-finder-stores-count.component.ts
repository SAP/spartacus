import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StoreFinderService } from '../../services/store-finder.service';

import * as fromStore from '../../store';

@Component({
  selector: 'cx-store-finder-stores-count',
  templateUrl: './store-finder-stores-count.component.html',
  styleUrls: ['./store-finder-stores-count.component.scss']
})
export class StoreFinderStoresCountComponent implements OnInit {
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
    this.isLoading$ = this.store.pipe(
      select(fromStore.getViewAllStoresLoading)
    );
  }
}
