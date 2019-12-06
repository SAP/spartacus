import { Component, Input } from '@angular/core';

import { PointOfService, StoreDataService } from '@spartacus/core';

import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';

@Component({
  selector: 'cx-store-finder-store-description',
  templateUrl: './store-finder-store-description.component.html',
})
export class StoreFinderStoreDescriptionComponent extends AbstractStoreItemComponent {
  @Input() location: PointOfService;
  @Input() disableMap: boolean;

  constructor(protected storeDataService: StoreDataService) {
    super(storeDataService);
  }
}
