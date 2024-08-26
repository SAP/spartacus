import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CheckoutDeliveryModeComponent } from '@spartacus/checkout/base/components';
import {
  CheckoutServiceDetailsFacade,
  SERVICE_DELIVERY_MODE,
} from '@spartacus/s4-service/root';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './service-checkout-delivery-mode.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCheckoutDeliveryModeComponent extends CheckoutDeliveryModeComponent {
  protected checkoutServiceDetailsFacade = inject(CheckoutServiceDetailsFacade);

  hasServiceProducts$: Observable<boolean> = this.checkoutServiceDetailsFacade
    .getServiceProducts()
    .pipe(map((products) => products.length > 0));

  deliveryModesToExclude: String[] = ['pickup', SERVICE_DELIVERY_MODE];

  serviceDeliveryConfig = this.checkoutDeliveryModesFacade
    .getSupportedDeliveryModes()
    .pipe(
      map(([deliveryModes]) =>
        [deliveryModes].find((mode) => mode.code === SERVICE_DELIVERY_MODE)
      )
    );
}
