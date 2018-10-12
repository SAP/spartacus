import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';

import { StoreDataService } from '../../services/index';
import * as fromStore from '../../store';

@Component({
  selector: 'y-store-finder-store-description',
  templateUrl: './store-finder-store-description.component.html',
  styleUrls: ['./store-finder-store-description.component.scss']
})
export class StoreFinderStoreDescriptionComponent
  extends AbstractStoreItemComponent
  implements OnInit {
  location: any;

  constructor(
    private store: Store<fromStore.StoresState>,
    protected storeDataService: StoreDataService,
    private route: ActivatedRoute
  ) {
    super(storeDataService);
  }

  ngOnInit(): void {
    this.store.subscribe((storesState: fromStore.StoresState) => {
      const stores = fromStore.getFindStoresEntities(storesState)
        .pointOfServices;
      if (stores) {
        this.location = stores.filter(
          (store: any) => store.name === this.route.snapshot.params.store
        )[0];
      }
    });
  }
}
