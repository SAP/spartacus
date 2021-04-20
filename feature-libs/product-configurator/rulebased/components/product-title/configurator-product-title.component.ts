import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope, ProductService } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-configurator-product-title',
  templateUrl: './configurator-product-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorProductTitleComponent {
  product$: Observable<Product> = this.configRouterExtractorService
    .extractRouterData()
    .pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      ),
      map((configuration) => {
        switch (configuration.owner.type) {
          case CommonConfigurator.OwnerType.PRODUCT:
          case CommonConfigurator.OwnerType.CART_ENTRY:
            return configuration.productCode;
          case CommonConfigurator.OwnerType.ORDER_ENTRY:
            return configuration.overview?.productCode;
        }
      }),
      switchMap((productCode) =>
        productCode
          ? this.productService.get(productCode, ProductScope.LIST)
          : EMPTY
      )
    );
  showMore = false;
  iconTypes = ICON_TYPE;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected productService: ProductService
  ) {}

  triggerDetails(): void {
    this.showMore = !this.showMore;
  }

  /**
   TODO(issue: #11238): update @deprecated level to the release we are publishing with,
  It is still 3.1 only because app.module.ts states that we are on 3.1.
  Finally we must have 3.x, x>=2 here */
  /**
   * @deprecated since 3.1
   */
  getProductImageURL(product: Product): string {
    return product.images?.PRIMARY?.['thumbnail']?.url;
  }

  /**
   TODO(issue: #11238): update @deprecated level to the release we are publishing with,
   It is still 3.1 only because app.module.ts states that we are on 3.1.
   Finally we must have 3.x, x>=2 here */
  /**
   * @deprecated since 3.1
   */
  getProductImageAlt(product: Product): string {
    return product.images?.PRIMARY?.['thumbnail']?.altText;
  }
}
