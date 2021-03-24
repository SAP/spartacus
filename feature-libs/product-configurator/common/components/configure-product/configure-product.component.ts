import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { Product, RoutingService } from '@spartacus/core';
import {
  CurrentProductService,
  ProductListItemContext,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { ConfiguratorProductScope } from '../../core/model/configurator-product-scope';

@Component({
  selector: 'cx-configure-product',
  templateUrl: './configure-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureProductComponent {
  nonConfigurable: Product = { configurable: false };
  product$: Observable<Product> = (this.productListItemContext
    ? this.productListItemContext.product$
    : this.currentProductService
    ? this.currentProductService.getProduct(
        ConfiguratorProductScope.CONFIGURATOR
      )
    : of(null)
  ).pipe(
    //needed because also currentProductService might return null
    map((product) => (product ? product : this.nonConfigurable))
  );

  ownerTypeProduct: CommonConfigurator.OwnerType =
    CommonConfigurator.OwnerType.PRODUCT;

  preventScrollingOnSpace(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }
  navigateToConfigurator(event: KeyboardEvent, product: Product): void {
    if (event.code === 'Enter' || event.code === 'Space') {
      this.routingService.go(
        {
          cxRoute: 'configure' + product.configuratorType,
          params: { ownerType: this.ownerTypeProduct, entityKey: product.code },
        },
        {}
      );
    }
  }
  constructor(
    protected routingService: RoutingService,
    @Optional() protected productListItemContext: ProductListItemContext, // when on PLP
    @Optional() protected currentProductService: CurrentProductService // when on PDP
  ) {}
}
