import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { StoreFinderService } from '../../services/store-finder.service';

@Component({
  selector: 'y-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
  styleUrls: ['./store-finder-grid.component.scss']
})
export class StoreFinderGridComponent implements OnInit {
  locations: any;

  constructor(
    private store: Store<fromStore.StoresState>,
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.country) {
      if (this.route.snapshot.params.region) {
        this.viewAllStoresForRegion(
          this.route.snapshot.params.country,
          this.route.snapshot.params.region
        );
      } else {
        this.viewAllStoresForCountry(this.route.snapshot.params.country);
      }
    }

    this.store.select(fromStore.getFindStoresEntities).subscribe(locations => {
      if (locations.pointOfServices && locations.pointOfServices.length === 1) {
        this.router.navigate([
          'store-finder',
          'country',
          this.route.snapshot.params.country,
          'region',
          this.route.snapshot.params.region,
          locations.pointOfServices[0].name
        ]);
      }
      this.locations = locations;
    });
  }

  viewStore(location: any): void {
    this.router.navigate([
      'store-finder',
      'country',
      this.route.snapshot.params.country,
      'region',
      this.route.snapshot.params.region,
      location.name
    ]);
  }

  viewAllStoresForCountry(countryIsoCode: string): void {
    this.storeFinderService.viewAllStoresForCountry(countryIsoCode);
  }

  viewAllStoresForRegion(countryIsoCode: string, regionIsoCode: string): void {
    this.storeFinderService.viewAllStoresForRegion(
      countryIsoCode,
      regionIsoCode
    );
  }
}
