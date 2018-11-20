import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { WindowRef } from '../../services/window-ref';

@Component({
  selector: 'cx-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  styleUrls: ['./store-finder-search.component.scss']
})
export class StoreFinderSearchComponent {
  searchBox: FormControl = new FormControl();

  constructor(
    private winRef: WindowRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  findStores(address: string) {
    this.router.navigate(['find-stores'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        query: address
      }
    });
  }

  viewStoresWithMyLoc() {
    this.winRef.nativeWindow.navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        this.router.navigate(['find-stores'], {
          relativeTo: this.activatedRoute,
          queryParams: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      }
    );
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.findStores(this.searchBox.value);
    }
  }
}
