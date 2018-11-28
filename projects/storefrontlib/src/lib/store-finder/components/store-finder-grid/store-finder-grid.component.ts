import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StoreFinderService } from '../../services/store-finder.service';

import * as fromStore from '../../store';

@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
  styleUrls: ['./store-finder-grid.component.scss']
})
export class StoreFinderGridComponent implements OnInit {
  locations: any;
  isLoading$: Observable<any>;

  constructor(
    private store: Store<fromStore.StoresState>,
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.country) {
      this.isLoading$ = this.store.pipe(select(fromStore.getStoresLoading));
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

    this.store
      .pipe(select(fromStore.getFindStoresEntities))
      .subscribe(locations => {
        if (
          locations.pointOfServices &&
          locations.pointOfServices.length === 1
        ) {
          this.viewStore(locations.pointOfServices[0]);
        }
        this.locations = locations;
      });
  }

  viewStore(location: any): void {
    if (this.route.snapshot.params.region) {
      this.router.navigate([
        'store-finder',
        'country',
        this.route.snapshot.params.country,
        'region',
        this.route.snapshot.params.region,
        location.name
      ]);
      return;
    }
    this.router.navigate([
      'store-finder',
      'country',
      this.route.snapshot.params.country,
      location.name
    ]);
  }
}
