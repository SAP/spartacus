import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  StoreDataService,
  StoreFinderService,
  PointOfService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';

@Component({
  selector: 'cx-store-finder-store-description',
  templateUrl: './store-finder-store-description.component.html',
})
export class StoreFinderStoreDescriptionComponent
  extends AbstractStoreItemComponent
  implements OnInit {
  location$: Observable<any>;
  isLoading$: Observable<any>;
  @Input() location: PointOfService;
  @Input() disableMap: boolean;

  constructor(
    protected storeDataService: StoreDataService,
    protected storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {
    super(storeDataService);
  }

  ngOnInit() {
    if (!this.location) {
      this.requestStoresData();
      this.location$ = this.storeFinderService.getFindStoresEntities();
      this.isLoading$ = this.storeFinderService.getStoresLoading();
    }
  }

  requestStoresData() {
    const storeId = this.route.snapshot.params.store;
    this.storeFinderService.viewStoreById(storeId);
  }
}
