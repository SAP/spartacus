import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { StoreFinderMapComponent } from '../../store-finder-map/store-finder-map.component';
import { ICON_TYPE } from '@spartacus/storefront';
import { StoreFinderService } from '@spartacus/storefinder/core';

@Component({
  selector: 'cx-store-finder-list',
  templateUrl: './store-finder-list.component.html',
})
export class StoreFinderListComponent {
  @Input()
  locations: any;
  @Input()
  useMylocation: boolean;
  @ViewChild('storeMap')
  storeMap: StoreFinderMapComponent;

  selectedStore: PointOfService;
  selectedStoreIndex: number;
  isDetailsModeVisible: boolean;
  storeDetails: PointOfService;
  iconTypes = ICON_TYPE;

  constructor(
    private storeFinderService: StoreFinderService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.isDetailsModeVisible = false;
  }

  centerStoreOnMapByIndex(index: number, location: PointOfService): void {
    this.showStoreDetails(location);
    this.selectedStoreIndex = index;
    this.selectedStore = location;
    this.storeMap.centerMap(
      this.storeFinderService.getStoreLatitude(this.locations.stores[index]),
      this.storeFinderService.getStoreLongitude(this.locations.stores[index])
    );
  }

  selectStoreItemList(index: number): void {
    this.selectedStoreIndex = index;
    const storeListItem = this.document.getElementById('item-' + index);
    storeListItem.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  showStoreDetails(location: PointOfService) {
    this.isDetailsModeVisible = true;
    this.storeDetails = location;
  }

  hideStoreDetails() {
    this.isDetailsModeVisible = false;
    this.selectedStoreIndex = undefined;
    this.selectedStore = undefined;
    this.storeMap.renderMap();
  }
}
