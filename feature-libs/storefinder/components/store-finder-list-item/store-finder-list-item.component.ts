import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';

@Component({
  selector: 'cx-store-finder-list-item',
  templateUrl: './store-finder-list-item.component.html',
})
export class StoreFinderListItemComponent extends AbstractStoreItemComponent {
  @Input()
  locationIndex: number | null = null;
  @Input()
  listOrderLabel: any;
  @Input()
  displayDistance: boolean;
  @Input()
  useClickEvent: boolean;
  @Output()
  storeItemClick: EventEmitter<number> = new EventEmitter();

  constructor(protected storeFinderService: StoreFinderService) {
    super(storeFinderService);
  }

  handleStoreItemClick() {
    if (this.locationIndex !== null) {
      this.storeItemClick.emit(this.locationIndex);
    }
  }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleStoreItemClick();
    }
  }
}
