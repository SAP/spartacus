import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  implements OnInit, OnDestroy {
  location: any;
  private ngUnsubscribe = new Subject();

  constructor(
    private store: Store<fromStore.StoresState>,
    protected storeDataService: StoreDataService,
    private route: ActivatedRoute
  ) {
    super(storeDataService);
  }

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromStore.getFindStoresEntities),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((storesState: fromStore.StoresState) => {
        const stores = fromStore.getFindStoresEntities(storesState).stores;
        if (stores) {
          this.location = stores.filter(
            (store: any) => store.name === this.route.snapshot.params.store
          )[0];
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
