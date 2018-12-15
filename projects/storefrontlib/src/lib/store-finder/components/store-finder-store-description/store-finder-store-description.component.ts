import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';
import { StoreDataService, StoreFinderService } from '../../services/index';

import * as fromStore from '../../store';

@Component({
  selector: 'cx-store-finder-store-description',
  templateUrl: './store-finder-store-description.component.html',
  styleUrls: ['./store-finder-store-description.component.scss']
})
export class StoreFinderStoreDescriptionComponent
  extends AbstractStoreItemComponent
  implements OnInit {
  location$: Observable<any>;
  isLoading$: Observable<any>;

  constructor(
    private store: Store<fromStore.StoresState>,
    protected storeDataService: StoreDataService,
    protected storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {
    super(storeDataService);
  }

  ngOnInit() {
    this.requestStoresData();
    this.location$ = this.store.pipe(select(fromStore.getFindStoresEntities));
    this.isLoading$ = this.store.pipe(select(fromStore.getStoresLoading));
  }

  requestStoresData() {
    const storeId = this.route.snapshot.params.store;
    this.storeFinderService.viewStoreById(storeId);
  }
}
