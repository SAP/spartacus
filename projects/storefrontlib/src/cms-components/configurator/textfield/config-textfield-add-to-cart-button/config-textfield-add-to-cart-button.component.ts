import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ConfiguratorTextfield,
  ConfiguratorTextfieldService,
  GenericConfigurator,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-config-textfield-add-to-cart-button',
  templateUrl: './config-textfield-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTextfieldAddToCartButtonComponent implements OnInit {
  constructor(
    private configuratorTextfieldService: ConfiguratorTextfieldService,
    private routingService: RoutingService
  ) {}

  @Input() configuration$: Observable<ConfiguratorTextfield.Configuration>;
  @Input() productCode: string;

  ngOnInit(): void {}

  onAddToCart(owner: GenericConfigurator.Owner) {
    switch (owner.type) {
      case GenericConfigurator.OwnerType.PRODUCT:
        this.configuratorTextfieldService.addToCart(owner.id);
        break;
      case GenericConfigurator.OwnerType.CART_ENTRY:
        //TODO:get configuration from cart for change confuration in cart
        break;
    }

    this.routingService.go({ cxRoute: 'cart' });
  }
}
