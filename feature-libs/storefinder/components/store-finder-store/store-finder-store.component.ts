import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PointOfService, RoutingService } from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ICON_TYPE } from '@spartacus/storefront';
import { StoreFinderService } from '@spartacus/storefinder/core';

@Component({
  selector: 'cx-store-finder-store',
  templateUrl: './store-finder-store.component.html',
})
export class StoreFinderStoreComponent implements OnInit, OnDestroy {
  location$: Observable<any>;
  isLoading$: Observable<any> = this.storeFinderService.getStoresLoading();
  isLoaded$: Observable<boolean> = this.storeFinderService.getStoresLoaded();
  iconTypes = ICON_TYPE;

  @Input() location: PointOfService;
  @Input() disableMap: boolean;

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) {}

  loadData: Subscription = combineLatest([
    this.isLoading$,
    this.isLoaded$,
  ]).subscribe(([loading, loaded]) => {
    if (!this.location && !loading && !loaded) {
      this.requestStoresData();
    }
  });

  ngOnInit() {
    if (!this.location) {
      this.requestStoresData();
      this.location$ = this.storeFinderService.getFindStoresEntities();
    }
  }

  requestStoresData() {
    this.storeFinderService.viewStoreById(this.route.snapshot.params.store);
  }

  goBack(): void {
    this.routingService.go([
      `store-finder/country/${this.route.snapshot.params.country}`,
    ]);
  }

  ngOnDestroy() {
    this.loadData.unsubscribe();
  }
}
