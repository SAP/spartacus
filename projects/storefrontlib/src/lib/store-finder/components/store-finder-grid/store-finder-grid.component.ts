import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { StoreFinderService } from '@spartacus/core';
import { RoutingService } from '@spartacus/core';
@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
  styleUrls: ['./store-finder-grid.component.scss']
})
export class StoreFinderGridComponent implements OnInit, OnDestroy {
  locations: any;
  isLoading$: Observable<boolean>;
  locationsSub: Subscription;

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

    this.locationsSub = this.storeFinderService
      .getFindStoresEntities()
      .subscribe(locations => {
        if (locations.findStoresEntities !== undefined) {
          if (
            locations.findStoresEntities.pointOfServices &&
            locations.findStoresEntities.pointOfServices.length === 1
          ) {
            this.viewStore(locations.findStoresEntities.pointOfServices[0]);
          }
          this.locations = locations;
        }
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
            region: '',
            country: this.route.snapshot.params.country,
            store: location.name
          }
        }
      ]
    });
  }

  ngOnDestroy() {
    if (this.locationsSub) {
      this.locationsSub.unsubscribe();
    }
  }
}
