import { Component, OnInit, Optional } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { PickupOption } from '@spartacus/pickup-in-store/root';
import { OutletContextData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-pickup-options-container',
  templateUrl: 'cart-pickup-options-container.component.html',
})
export class CartPickupOptionsContainerComponent implements OnInit {
  pickupOption$: Observable<PickupOption>;
  constructor(@Optional() protected outlet: OutletContextData<OrderEntry>) {}

  ngOnInit() {
    this.pickupOption$ = this.outlet?.context$.pipe(
      map(
        (item): PickupOption =>
          item?.deliveryPointOfService ? 'pickup' : 'delivery'
      )
    );
  }
}
