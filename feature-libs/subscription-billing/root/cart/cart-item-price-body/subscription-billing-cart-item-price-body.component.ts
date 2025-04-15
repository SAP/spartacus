import {
  Component,
  Inject,
  inject,
  Optional,
} from '@angular/core';
import { OutletContextData } from '@spartacus/storefront';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'cx-subscription-billing-cart-item-price-body',
  standalone: false,
  templateUrl: './subscription-billing-cart-item-price-body.component.html',
})
export class SubscriptionBillingCartItemPriceBodyComponent {

  // Inject OutletContextData dependency
  @Optional()
  @Inject(OutletContextData)
  protected outlet = inject(OutletContextData);
  context = toSignal<any>(this.outlet?.context$);
}
