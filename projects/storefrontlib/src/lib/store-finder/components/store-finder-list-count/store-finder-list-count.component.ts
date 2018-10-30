import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';

@Component({
  selector: 'y-store-finder-list-count',
  templateUrl: './store-finder-list-count.component.html',
  styleUrls: ['./store-finder-list-count.component.scss']
})
export class StoreFinderListCountComponent implements OnInit {
  locations$: Observable<any>;

  constructor(private store: Store<fromStore.StoresState>) {}

  ngOnInit() {
    this.locations$ = this.store.pipe(
      select(fromStore.getViewAllStoresEntities)
    );
  }
}
