import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeoPoint } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StoreFinderService } from '@spartacus/misc/storefinder/core';

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

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading$ = this.storeFinderService.getViewAllStoresLoading();
    this.locations$ = this.storeFinderService.getViewAllStoresEntities();
    this.defaultLocation = {};

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

  ngOnDestroy() {}
}
