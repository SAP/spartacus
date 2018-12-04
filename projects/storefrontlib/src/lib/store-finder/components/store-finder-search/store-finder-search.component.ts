import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { WindowRef } from '../../services/window-ref';
import { RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  styleUrls: ['./store-finder-search.component.scss']
})
export class StoreFinderSearchComponent {
  searchBox: FormControl = new FormControl();

  constructor(private winRef: WindowRef, private routing: RoutingService) {}

  findStores(address: string) {
    this.routing.translateAndGo(
      { route: ['storeFinder', 'searchResults'] },
      { query: address }
    );
  }

  viewStoresWithMyLoc() {
    this.winRef.nativeWindow.navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        this.routing.translateAndGo(
          { route: ['storeFinder', 'searchResults'] },
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        );
      }
    );
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.findStores(this.searchBox.value);
    }
  }
}
