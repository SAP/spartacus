import { Component, OnInit } from '@angular/core';
import {
  ConfiguratorCommonsService,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../misc/icon/index';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';
import { ConfigurationRouter } from '../../generic/service/config-router-data';

@Component({
  selector: 'cx-config-product-title',
  templateUrl: './config-product-title.component.html',
})
export class ConfigProductTitleComponent implements OnInit {
  product$: Observable<Product>;
  routerData$: Observable<ConfigurationRouter.Data>;
  isConfigurationLoading$: Observable<Boolean>;
  showMore = false;
  iconTypes = ICON_TYPE;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.routerData$ = this.configRouterExtractorService.extractRouterData(
      this.routingService
    );

    this.product$ = this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      ),
      switchMap((configuration) =>
        this.productService.get(configuration.productCode)
      )
    );

    this.isConfigurationLoading$ = this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.isConfigurationLoading(routerData.owner)
      )
    );
  }

  triggerDetails() {
    this.showMore = !this.showMore;
  }

  getProductImageURL(product: Product): string {
    return product.images?.PRIMARY?.['thumbnail']?.url;
  }

  getProductImageAlt(product: Product): string {
    return product.images?.PRIMARY?.['thumbnail']?.altText;
  }
}
