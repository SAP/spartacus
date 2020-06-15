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
import {
  ConfigRouterExtractorService,
  ConfigurationRouter,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';

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

  onAddToCart(owner: GenericConfigurator.Owner) {
    switch (owner.type) {
      case GenericConfigurator.OwnerType.PRODUCT:
        this.configuratorTextfieldService.addToCart(owner.id);
        break;
      case GenericConfigurator.OwnerType.CART_ENTRY:
        this.configuratorTextfieldService.updateCartEntry(owner.id);
        break;
    }

    this.routingService.go({ cxRoute: 'cart' });
  }
}
