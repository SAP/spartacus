import { Component, Input } from '@angular/core';
import { PointOfService } from '@spartacus/core';

@Component({
  selector: 'cx-store-address',
  templateUrl: 'store-address.component.html',
})
export class StoreAddressComponent {
  @Input()
  storeDetails: PointOfService = {};
}
