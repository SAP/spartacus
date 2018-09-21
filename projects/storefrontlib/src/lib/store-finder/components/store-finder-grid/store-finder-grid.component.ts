import { Component, OnInit, Input, ViewChild, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { StoreDataService } from '../../services/store-data.service';
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
    private storeDataService: StoreDataService,
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    console.log('hello, friend');
    if (this.route.snapshot.params.country) {
      console.log('daaaaaaaayo');
      if (this.route.snapshot.params.region) {
        console.log('me say daaaaaaAAAaAAaaaAyyyyoooooo');
        this.viewAllStoresForRegion(this.route.snapshot.params.country, this.route.snapshot.params.region);
      } else {
        this.viewAllStoresForCountry(this.route.snapshot.params.country);
      }
    }

    this.store.select(fromStore.getFindStoresEntities).subscribe(locations => {
      console.log(locations.pointOfServices);
      if (locations.pointOfServices && locations.pointOfServices.length === 1) {
        console.log("hello darkness my old friend")
        this.router.navigate(['store-finder','country',this.route.snapshot.params.country,
          'region', this.route.snapshot.params.region, locations.pointOfServices[0].name]);
      }
      this.locations = locations;
    });
  }

  viewAllStoresForCountry(countryIsoCode: string) {
    this.storeFinderService.viewAllStoresForCountry(countryIsoCode);
  }

  viewAllStoresForRegion(countryIsoCode: string, regionIsoCode: string) {
    this.storeFinderService.viewAllStoresForRegion(countryIsoCode, regionIsoCode);
  }
}
