import { Component, Input } from '@angular/core';
import { PointOfService } from '@spartacus/core';

@Component({
  selector: 'cx-pickup-delivery-info',
  templateUrl: './pickup-delivery-info.component.html',
  styleUrls: ['./pickup-delivery-info.component.scss'],
})
export class PickupDeliveryInfoComponent {
  @Input() storeDetails: PointOfService;
}
