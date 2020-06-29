import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GenericConfigurator, RoutingService } from '@spartacus/core';
import {
  ConfigRouterExtractorService,
  ConfigurationRouter,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorTextfieldService } from '../../facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';

@Component({
  selector: 'cx-config-textfield-add-to-cart-button',
  templateUrl: './config-textfield-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTextfieldAddToCartButtonComponent {
  routerData$: Observable<ConfigurationRouter.Data>;
  constructor(
    private configuratorTextfieldService: ConfiguratorTextfieldService,
    private routingService: RoutingService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {
    this.routerData$ = this.configRouterExtractorService.extractRouterData();
  }

  @Input() configuration: ConfiguratorTextfield.Configuration;
  @Input() productCode: string;

  /**
   * Adds a textfield configuration to the cart or updates it
   * @param configuration Textfield configuration (knows whether it belongs to product or cart entry,
   * thus component can tell whether to add or to update)
   */
  onAddToCart(configuration: ConfiguratorTextfield.Configuration): void {
    const owner: GenericConfigurator.Owner = configuration.owner;
    switch (owner.type) {
      case GenericConfigurator.OwnerType.PRODUCT:
        this.configuratorTextfieldService.addToCart(owner.id, configuration);
        break;
      case GenericConfigurator.OwnerType.CART_ENTRY:
        this.configuratorTextfieldService.updateCartEntry(
          owner.id,
          configuration
        );
        break;
    }

    this.routingService.go({ cxRoute: 'cart' });
  }

  /**
   * Returns button description. Button will display 'addToCart' or 'done' in case router data indicates that owner is a cart entry
   * @param routerData Data extracted from routing that we use to decide whether configuration belongs to cart or to product
   * @returns Resource key of button description
   */
  getButtonText(configuration: ConfiguratorTextfield.Configuration): string {
    return configuration.owner.type === GenericConfigurator.OwnerType.CART_ENTRY
      ? 'configuratorTextfield.addToCart.buttonUpdateCart'
      : 'configuratorTextfield.addToCart.button';
  }
}
