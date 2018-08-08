import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StoreLocation } from '../../models/location';
import * as fromStore from '../../store';

@Component({
  selector: 'y-store-finder',
  templateUrl: './store-finder.component.html',
  styleUrls: ['./store-finder.component.scss']
})
export class StoreFinderComponent implements OnInit {
  locations$: Observable<any>;
  current_date = new Date();

  constructor(private store: Store<fromStore.StoresState>) {}

  ngOnInit() {
    this.locations$ = this.store.select(fromStore.getAllStores);
  }

  getDirections(location: StoreLocation) {}
}
