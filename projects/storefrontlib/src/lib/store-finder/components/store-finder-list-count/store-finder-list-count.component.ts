import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'y-store-finder-list-count',
  templateUrl: './store-finder-list-count.component.html',
  styleUrls: ['./store-finder-list-count.component.scss']
})
export class StoreFinderListCountComponent implements OnInit {
  locations: any;
  constructor(private store: Store<fromStore.StoresState>) {}

  ngOnInit() {
    this.store
      .select(fromStore.getViewAllStoresEntities)
      .subscribe(locations => (this.locations = locations));
  }
}
