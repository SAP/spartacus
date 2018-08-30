import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { SearchConfig } from '../../models/search-config';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';
import { StoreDataService } from '../../services/store-data.service';

@Component({
  selector: 'y-store-finder-list',
  templateUrl: './store-finder-list.component.html',
  styleUrls: ['./store-finder-list.component.scss']
})
export class StoreFinderListComponent implements OnInit {
  @Input() query;

  locations: any;
  searchConfig: SearchConfig = {
    currentPage: 0
  };

  @ViewChild('storeMap') storeMap: StoreFinderMapComponent;

  constructor(
    private store: Store<fromStore.StoresState>,
    private storeDataService: StoreDataService
  ) {}

  ngOnInit() {
    this.store.select(fromStore.getAllStores).subscribe(locations => {
      this.locations = locations;
    });
  }

  viewPage(pageNumber: number) {
    this.searchConfig = { ...this.searchConfig, currentPage: pageNumber };
    this.store.dispatch(
      new fromStore.FindStores({
        queryText: this.query,
        searchConfig: this.searchConfig
      })
    );
  }

  centerStoreOnMapByIndex(index: number): void {
    this.storeMap.centerMap(
      this.storeDataService.getStoreLatitude(this.locations.stores[index]),
      this.storeDataService.getStoreLongitude(this.locations.stores[index])
    );
  }
}
