import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreFinderService } from '../../services/store-finder.service';
import { WindowRef } from '../../services/window-ref';
import { SearchQuery } from '../../models/search-query';

@Component({
  selector: 'y-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  styleUrls: ['./store-finder-search.component.scss']
})
export class StoreFinderSearchComponent {
  @Output()
  persistSearchQuery: EventEmitter<SearchQuery> = new EventEmitter<
    SearchQuery
  >();
  @Output()
  showMapList: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchBox: FormControl = new FormControl();

  constructor(
    private storeFinderService: StoreFinderService,
    private winRef: WindowRef
  ) {}

  findStores(address: string) {
    this.storeFinderService.findStores(address);
    this.persistSearchQuery.emit({ queryText: address });
    this.showMapList.emit(true);
  }

  viewAllStores() {
    this.storeFinderService.viewAllStores();
    this.showMapList.emit(false);
  }

  viewStoresWithMyLoc() {
    this.winRef.nativeWindow.navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        this.storeFinderService.findStores('', {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
        const searchQuery: SearchQuery = {
          queryText: '',
          longitudeLatitude: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }
        };
        this.persistSearchQuery.emit(searchQuery);
      }
    );
    this.showMapList.emit(true);
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.findStores(this.searchBox.value);
    }
  }
}
