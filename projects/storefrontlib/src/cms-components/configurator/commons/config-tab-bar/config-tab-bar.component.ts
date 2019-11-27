import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-config-tab-bar',
  templateUrl: './config-tab-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTabBarComponent {
  productCode$: Observable<string>;
  configuratorType$: Observable<string>;

  constructor(routingService: RoutingService, productService: ProductService) {
    this.productCode$ = routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.params.rootProduct));

    this.configuratorType$ = this.productCode$.pipe(
      switchMap(productCode => {
        console.warn(productCode);
        return productService.get(productCode);
      }),
      map(product => {
        console.warn(product);
        return product.configuratorType;
      })
    );
  }
}
