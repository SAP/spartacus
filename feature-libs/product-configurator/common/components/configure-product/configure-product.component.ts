import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { Product } from '@spartacus/core';
import {
  CurrentProductService,
  ProductListItemContext,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { ConfiguratorProductScope } from '../../core/model/configurator-product-scope';

@Component({
  selector: 'cx-configure-product',
  templateUrl: './configure-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureProductComponent {
  product$: Observable<Product> = this.productListItemContext
    ? this.productListItemContext.product$
    : this.currentProductService
    ? this.currentProductService.getProduct(
        ConfiguratorProductScope.CONFIGURATOR
      )
    : of(null);

  ownerTypeProduct: CommonConfigurator.OwnerType =
    CommonConfigurator.OwnerType.PRODUCT;

  constructor(
    @Optional() protected productListItemContext: ProductListItemContext, // when on PLP
    @Optional() protected currentProductService: CurrentProductService // when on PDP
  ) {}
}
