import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { ConfiguratorProductScope } from '../../core/model/configurator-product-scope';

@Component({
  selector: 'cx-configure-product',
  templateUrl: './configure-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureProductComponent {
  product$: Observable<Product> = this.currentProductService.getProduct(
    ConfiguratorProductScope.CONFIGURATOR
  );
  ownerTypeProduct: CommonConfigurator.OwnerType =
    CommonConfigurator.OwnerType.PRODUCT;

  constructor(protected currentProductService: CurrentProductService) {}
}
