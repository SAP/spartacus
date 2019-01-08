import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { StoreFinderService } from '@spartacus/core';
import { RoutingService } from '@spartacus/core';
@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
  styleUrls: ['./store-finder-grid.component.scss']
})
export class StoreFinderGridComponent implements OnInit {
  locations: any;
  isLoading$: Observable<any>;

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.country) {
      this.isLoading$ = this.storeFinderService.getStoresLoading();
      if (this.route.snapshot.params.region) {
        this.storeFinderService.viewAllStoresForRegion(
          this.route.snapshot.params.country,
          this.route.snapshot.params.region
        );
      } else {
        this.storeFinderService.viewAllStoresForCountry(
          this.route.snapshot.params.country
        );
      }
    }

    this.storeFinderService.getFindStoresEntities().subscribe(locations => {
      if (locations.pointOfServices && locations.pointOfServices.length === 1) {
        this.viewStore(locations.pointOfServices[0]);
      }
      this.locations = locations;
    });
  }

  viewStore(location: any): void {
    if (this.route.snapshot.params.region) {
      this.routingService.go({
        route: [
          'storeFinder',
          {
            name: 'storeDescription',
            params: {
              country: this.route.snapshot.params.country,
              region: this.route.snapshot.params.region,
              store: location.name
            }
          }
        ]
      });
      return;
    }
    this.routingService.go({
      route: [
        'storeFinder',
        {
          name: 'storeDescription',
          params: {
            country: this.route.snapshot.params.country,
            store: location.name
          }
        }
      ]
    });
  }
}
