import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'cx-config-product-title',
  templateUrl: './config-product-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigProductTitleComponent implements OnInit {
  product$: Observable<Product>;
  showMore = false;
  iconTypes = ICON_TYPE;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product$ = this.configRouterExtractorService
      .extractRouterData(this.routingService)
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        ),
        switchMap((configuration) =>
          this.productService.get(configuration.productCode)
        )
      );
  }

  click() {
    this.showMore = !this.showMore;
  }
}
