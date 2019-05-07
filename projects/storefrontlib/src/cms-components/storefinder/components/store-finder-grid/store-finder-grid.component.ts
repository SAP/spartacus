import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LongitudeLatitude,
  RoutingService,
  StoreFinderService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
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
          pageSize: -1,
        },
        this.route.snapshot.params.country
      );
    }
  }

  viewStore(location: any): void {
    if (this.route.snapshot.params.region) {
      this.routingService.go(
        ['region', this.route.snapshot.params.region, location.name],
        undefined,
        { relativeTo: this.route }
      );
      return;
    }
    this.routingService.go(['region', '', location.name], undefined, {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {}
}
