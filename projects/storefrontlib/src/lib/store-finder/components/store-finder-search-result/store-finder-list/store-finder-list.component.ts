import { Component, Input, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { StoreFinderMapComponent } from '../../store-finder-map/store-finder-map.component';
import { StoreDataService } from '@spartacus/core';

@Component({
  selector: 'cx-store-finder-list',
  templateUrl: './store-finder-list.component.html',
  styleUrls: ['./store-finder-list.component.scss']
})
export class StoreFinderListComponent {
  @Input()
  locations: any;
  @ViewChild('storeMap')
  storeMap: StoreFinderMapComponent;

  selectedStore: number;

  constructor(
    private storeDataService: StoreDataService,
    @Inject(DOCUMENT) private document: any
  ) {}

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
