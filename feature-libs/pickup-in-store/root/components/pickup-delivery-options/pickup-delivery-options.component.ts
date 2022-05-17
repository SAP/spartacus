import { Component, OnInit } from '@angular/core';
import { PickupInStoreFacade } from '../../facade/pickup-in-store.facade';

@Component({
  selector: 'cx-pickup-delivery-options',
  templateUrl: './pickup-delivery-options.component.html',
})
export class PickupDeliveryOptionsComponent implements OnInit {
  constructor(protected pickupInStoreFacade: PickupInStoreFacade) {}

  ngOnInit() {
    this.pickupInStoreFacade.getStore();
  }
}
