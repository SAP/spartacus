import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WindowRef } from '../../services/window-ref';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'y-store-finder-search',
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
    this.router.navigate(['findstores'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        query: address
      }
    });
  }

  viewStoresWithMyLoc() {
    this.winRef.nativeWindow.navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        this.router.navigate(['findstores'], {
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
