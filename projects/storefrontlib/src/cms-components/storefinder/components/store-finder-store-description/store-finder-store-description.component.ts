import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreDataService, StoreFinderService } from '@spartacus/core';
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

  constructor(
    protected storeDataService: StoreDataService,
    protected storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {
    super(storeDataService);
  }

  ngOnInit() {
    this.requestStoresData();
    this.location$ = this.storeFinderService.getFindStoresEntities();
    this.isLoading$ = this.storeFinderService.getStoresLoading();
  }

  requestStoresData() {
    const storeId = this.route.snapshot.params.store;
    this.storeFinderService.viewStoreById(storeId);
  }
}
