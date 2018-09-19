import { Component, OnInit } from '@angular/core';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';
import { StoreDataService } from '../../services';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ActivatedRoute } from '@angular/router';

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
      this.location = fromStore
        .getAllStores(storesState)
        .stores.filter(
          (store: any) => store.name === this.route.snapshot.params.store
        )[0];
    });
  }
}
