import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { StoreFinderService } from '../../services/store-finder.service';

@Component({
  selector: 'y-store-finder-list-count',
  templateUrl: './store-finder-list-count.component.html',
  styleUrls: ['./store-finder-list-count.component.scss']
})
export class StoreFinderListCountComponent implements OnInit {
  locations: any;

  constructor(private store: Store<fromStore.StoresState>, private storeFinderService: StoreFinderService) {}

  ngOnInit() {
    this.store
      .select(fromStore.getViewAllStoresEntities)
      .subscribe(locations => (this.locations = locations));
  }

  viewAllStoresForCountry(countryIsoCode: string) {
    //this.storeFinderService.viewAllStoresForCountry(countryIsoCode);
  }

  viewAllStoresForRegion(countryIsoCode: string, regionIsoCode: string) {
    this.storeFinderService.viewAllStoresForRegion(countryIsoCode, regionIsoCode);
  }
}
