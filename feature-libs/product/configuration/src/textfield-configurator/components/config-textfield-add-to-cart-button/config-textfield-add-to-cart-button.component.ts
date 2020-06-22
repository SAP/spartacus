import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
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
export class ConfigTextfieldAddToCartButtonComponent implements OnInit {
  routerData$: Observable<ConfigurationRouter.Data>;
  constructor(
    private configuratorTextfieldService: ConfiguratorTextfieldService,
    private routingService: RoutingService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  @Input() configuration$: Observable<ConfiguratorTextfield.Configuration>;
  @Input() productCode: string;

  ngOnInit(): void {
    this.routerData$ = this.configRouterExtractorService.extractRouterData(
      this.routingService
    );
  }
  /**
   * Adds a textfield configuration to the cart or updates it
   * @param owner Configuration owner, can be either product or cart entry
   */
  onAddToCart(configuration: ConfiguratorTextfield.Configuration) {
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
  getButtonText(routerData: ConfigurationRouter.Data): string {
    return routerData.isOwnerCartEntry
      ? 'configuratorTextfield.addToCart.buttonUpdateCart'
      : 'configuratorTextfield.addToCart.button';
  }
}
