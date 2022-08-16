import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PointOfServiceStock } from '@spartacus/core';
import { storeHasStock } from '@spartacus/pickup-in-store/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-store',
  templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {
  @Input()
  storeDetails: PointOfServiceStock = {};
  @Output()
  storeSelected: EventEmitter<PointOfServiceStock> = new EventEmitter<PointOfServiceStock>();

  isInStock: boolean;
  iconTypes = ICON_TYPE;
  openHoursOpen = false;

  ngOnInit(): void {
    this.isInStock = storeHasStock(this.storeDetails);
  }

  selectStore(): boolean {
    this.storeSelected.emit(this.storeDetails);
    // return false to prevent this button adding to cart
    return false;
  }

  toggleOpenHours(): void {
    this.openHoursOpen = !this.openHoursOpen;
  }
}
