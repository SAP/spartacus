import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  RoutingService,
  StoreFinderService,
  GeoPoint,
  SearchConfig,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
})
export class StoreFinderGridComponent implements OnInit, OnDestroy {
  locations$: any;
  isLoading$: Observable<boolean>;
  defaultLocation: GeoPoint;
  country: string;
  region: string;

  subscription: Subscription;
  searchConfig: SearchConfig = {
    pageSize: 24,
    currentPage: 0,
  };

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.storeFinderService.getViewAllStoresLoading();
    this.locations$ = this.storeFinderService.getViewAllStoresEntities();
    this.findStores();
  }

  viewStore(location: any): void {
    this.routingService.go([this.prepareRouteUrl(location)]);
  }

  prepareRouteUrl(location: any): string {
    const countryParam = this.route.snapshot.params.country
      ? `country/${this.route.snapshot.params.country}/`
      : '';
    const regionParam = this.route.snapshot.params.region
      ? `region/${this.route.snapshot.params.region}/`
      : '';
    const locationName = location.name.replace(/ /g, '-').toLocaleLowerCase();
    return `store-finder/${countryParam}${regionParam}${locationName}`;
  }

  viewPage(pageNumber: number) {
    this.searchConfig = { ...this.searchConfig, currentPage: pageNumber };
    this.findStores();
  }

  findStores() {
    this.storeFinderService.findStoresAction(
      '',
      this.searchConfig,
      this.defaultLocation,
      this.route.snapshot.params.country
    );
  }

  ngOnDestroy() {}
}
