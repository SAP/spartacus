import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  styleUrls: ['./store-finder-search.component.scss']
})
export class StoreFinderSearchComponent {
  searchBox: FormControl = new FormControl();

  constructor(private routing: RoutingService, private route: ActivatedRoute) {}

  findStores(address: string) {
    this.routing.go(['find'], { query: address }, { relativeTo: this.route });
  }

  viewStoresWithMyLoc() {
    this.routing.go(
      ['find'],
      { useMyLocation: true },
      { relativeTo: this.route }
    );
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.findStores(this.searchBox.value);
    }
  }
}
