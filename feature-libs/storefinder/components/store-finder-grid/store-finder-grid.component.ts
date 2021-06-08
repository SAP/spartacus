import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeoPoint } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StoreFinderService } from '@spartacus/storefinder/core';

@Component({
  selector: 'cx-store-finder-grid',
  templateUrl: './store-finder-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreFinderGridComponent implements OnInit {
  defaultLocation: GeoPoint;
  country: string;
  region: string;
  locations$: any;
  isLoading$: Observable<boolean>;

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading$ = this.storeFinderService.getStoresLoading();
    this.locations$ = this.storeFinderService.getFindStoresEntities();
    this.defaultLocation = {};
    this.findStores();
  }

  protected findStores(): void {
    if (this.route.snapshot.params.country) {
      this.storeFinderService.callFindStoresAction(this.route.snapshot.params);
    }
  }
}
