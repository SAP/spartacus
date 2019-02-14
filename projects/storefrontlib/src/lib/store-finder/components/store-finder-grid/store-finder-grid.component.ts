import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { StoreFinderService, LongitudeLatitude } from '@spartacus/core';
import { RoutingService } from '@spartacus/core';
@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
  styleUrls: ['./store-finder-grid.component.scss']
})
export class StoreFinderGridComponent implements OnInit, OnDestroy {
  locations$: any;
  isLoading$: Observable<boolean>;
  locationsSub: Subscription;
  defaultLocation: LongitudeLatitude;
  country: string;
  region: string;

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.storeFinderService.getViewAllStoresLoading();
    this.locations$ = this.storeFinderService.getViewAllStoresEntities();

    if (this.route.snapshot.params.country) {
      this.storeFinderService.findStoresAction(
        '',
        this.defaultLocation,
        {
          pageSize: -1
        },
        this.route.snapshot.params.country
      );
    }
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

  ngOnDestroy() {}
}
