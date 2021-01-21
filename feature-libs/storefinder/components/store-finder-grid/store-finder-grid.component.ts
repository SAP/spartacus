import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeoPoint } from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  FindStoresState,
  StoreFinderService,
} from '@spartacus/storefinder/core';

@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
})
export class StoreFinderGridComponent implements OnInit, OnDestroy {
  defaultLocation: GeoPoint;
  country: string;
  region: string;

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}

  isLoading$: Observable<boolean> = this.storeFinderService.getStoresLoading();
  locations$: Observable<
    FindStoresState
  > = this.storeFinderService.getFindStoresEntities();
  isLoaded$: Observable<boolean> = this.storeFinderService.getStoresLoaded();
  loadData: Subscription = combineLatest([
    this.isLoaded$,
    this.isLoading$,
  ]).subscribe(([loaded, loading]) => {
    if (!loaded && !loading) this.findStores();
  });

  ngOnInit() {
    this.defaultLocation = {};
    this.findStores();
  }

  findStores() {
    if (this.route.snapshot.params.country) {
      this.storeFinderService.findStoresAction(
        '',
        {
          pageSize: -1,
        },
        undefined,
        this.route.snapshot.params.country
      );
    }
  }
  ngOnDestroy() {
    this.loadData.unsubscribe();
  }
}
