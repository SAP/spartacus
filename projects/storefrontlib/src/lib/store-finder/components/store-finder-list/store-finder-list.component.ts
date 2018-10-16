import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromStore from '../../store';
import { SearchConfig } from '../../models/search-config';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';
import { StoreDataService } from '../../services/store-data.service';

@Component({
  selector: 'y-store-finder-list',
  templateUrl: './store-finder-list.component.html',
  styleUrls: ['./store-finder-list.component.scss']
})
export class StoreFinderListComponent implements OnInit, OnDestroy {
  @Input()
  query;

  locations: any;
  searchConfig: SearchConfig = {
    currentPage: 0
  };
  selectedStore: number;
  ngUnsubscribe: Subscription;

  @ViewChild('storeMap')
  storeMap: StoreFinderMapComponent;

  constructor(
    private store: Store<fromStore.StoresState>,
    private storeDataService: StoreDataService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit(): void {
    this.ngUnsubscribe = this.store
      .pipe(select(fromStore.getFindStoresEntities))
      .subscribe(locations => {
        this.locations = locations;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
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
    this.selectedStore = index;
    this.storeMap.centerMap(
      this.storeDataService.getStoreLatitude(this.locations.stores[index]),
      this.storeDataService.getStoreLongitude(this.locations.stores[index])
    );
  }

  selectStoreItemList(index: number): void {
    this.selectedStore = index;
    const storeListItem = this.document.getElementById('item-' + index);
    storeListItem.scrollIntoView();
  }
}
