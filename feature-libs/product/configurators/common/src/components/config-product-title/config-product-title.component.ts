import { Component } from '@angular/core';
import { GenericConfigurator, Product, ProductService } from '@spartacus/core';
import { ConfigRouterExtractorService, ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from './../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-config-product-title',
  templateUrl: './config-product-title.component.html',
})
export class ConfigProductTitleComponent {
  product$: Observable<
    Product
  > = this.configRouterExtractorService.extractRouterData().pipe(
    switchMap((routerData) =>
      this.configuratorCommonsService.getConfiguration(routerData.owner)
    ),
    map((configuration) => {
      switch (configuration.owner.type) {
        case GenericConfigurator.OwnerType.PRODUCT:
        case GenericConfigurator.OwnerType.CART_ENTRY:
          return configuration.productCode;
        case GenericConfigurator.OwnerType.ORDER_ENTRY:
          return configuration.overview.productCode;
      }
    }),
    switchMap((productCode) => this.productService.get(productCode))
  );
  showMore = false;
  iconTypes = ICON_TYPE;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfigRouterExtractorService,
    protected productService: ProductService
  ) {}

  triggerDetails(): void {
    this.showMore = !this.showMore;
  }

  getProductImageURL(product: Product): string {
    return product.images?.PRIMARY?.['thumbnail']?.url;
  }

  getProductImageAlt(product: Product): string {
    return product.images?.PRIMARY?.['thumbnail']?.altText;
  }
}
