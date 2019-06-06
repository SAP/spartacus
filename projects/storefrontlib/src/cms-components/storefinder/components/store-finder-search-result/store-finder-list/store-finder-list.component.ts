import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { StoreDataService, PointOfService } from '@spartacus/core';
import { StoreFinderMapComponent } from '../../store-finder-map/store-finder-map.component';
import { ICON_TYPE } from './../../../../misc/icon/icon.model';

@Component({
  selector: 'cx-store-finder-list',
  templateUrl: './store-finder-list.component.html',
})
export class StoreFinderListComponent {
  @Input()
  locations: any;
  @ViewChild('storeMap', { static: false })
  storeMap: StoreFinderMapComponent;

  selectedStore = 0;
  isDetailsModeVisible: boolean;
  storeDetails: PointOfService;

  iconTypes = ICON_TYPE;

  constructor(
    private storeDataService: StoreDataService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.isDetailsModeVisible = false;
  }

  centerStoreOnMapByIndex(index: number, location: PointOfService): void {
    this.showStoreDetails(location);
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

  showStoreDetails(location: PointOfService) {
    this.isDetailsModeVisible = true;
    this.storeDetails = location;
  }

  hideStoreDetails() {
    this.isDetailsModeVisible = false;
  }
}
