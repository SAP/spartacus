import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreDataService } from '@spartacus/core';

import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
@Component({
  selector: 'cx-store-finder-list-item',
  templateUrl: './store-finder-list-item.component.html',
})
export class StoreFinderListItemComponent extends AbstractStoreItemComponent {
  @Input()
  locationIndex: number = null;
  @Output()
  storeItemClick: EventEmitter<number> = new EventEmitter();
  iconTypes = ICON_TYPE;

  constructor(protected storeDataService: StoreDataService) {
    super(storeDataService);
  }

  handleStoreItemClick() {
    if (this.locationIndex !== null) {
      this.storeItemClick.emit(this.locationIndex);
    }
  }
}
