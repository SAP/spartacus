import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  styleUrls: ['./store-finder-search.component.scss']
})
export class StoreFinderSearchComponent {
  searchBox: FormControl = new FormControl();

  constructor(private routing: RoutingService) {}

  findStores(address: string) {
    this.routing.go(
      { route: ['storeFinder', 'searchResults'] },
      { query: address }
    );
  }

  viewStoresWithMyLoc() {
    this.routing.go(
      { route: ['storeFinder', 'searchResults'] },
      { useMyLocation: true }
    );
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.findStores(this.searchBox.value);
    }
  }
}
