import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeoPoint } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreFinderGridComponent implements OnInit {
  defaultLocation: GeoPoint;
  country: string;
  region: string;

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}
  locations$: any;
  isLoading$: Observable<boolean>;

  ngOnInit() {
    this.defaultLocation = {};
    this.isLoading$ = this.storeFinderService.getViewAllStoresLoading();
    this.locations$ = this.storeFinderService
      .getFindStoresEntities()
      .pipe(map((data) => data.findStoresEntities));
    this.findStores();
  }

  protected findStores() {
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
}
