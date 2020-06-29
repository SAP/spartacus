import { Component } from '@angular/core';
import {
  ConfiguratorCommonsService,
  Product,
  ProductService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../misc/icon/index';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

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
    switchMap((configuration) =>
      this.productService.get(configuration.productCode)
    )
  );
  showMore = false;
  iconTypes = ICON_TYPE;

  constructor(
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private productService: ProductService
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
