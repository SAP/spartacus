import { Component } from '@angular/core';
import {
  Product,
  ProductService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-exit-button',
  templateUrl: './configurator-exit-button.component.html',
})
export class ConfiguratorExitButtonComponent {
  product$: Observable<Product>;

  constructor(
    protected productService: ProductService,
    protected routingService: RoutingService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected breakpointService: BreakpointService,
    protected windowRef: WindowRef
  ) {}
  /**
   * the method navigates to the previous page when user clicks on the configurator exit button.
   * If there is no previous page to return to, it will navigate to the product detail page of the product
   * that is being configured.
   */
  goBack() {
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        ),
        switchMap((configuration: Configurator.Configuration) =>
          this.productService.get(
            configuration.productCode ? configuration.productCode : ''
          )
        ),
        filter((product) => product !== undefined),
        take(1)
      )
      .subscribe((product) =>
        this.routingService.go({ cxRoute: 'product', params: product })
      );
  }

  /**
   * Verifies whether the current screen size equals or is larger than breakpoint `BREAKPOINT.md`.
   *
   * @returns {Observable<boolean>} - If the given breakpoint equals or is larger than`BREAKPOINT.md` returns `true`, otherwise `false`.
   */
  isDesktop(): Observable<boolean> {
    return this.breakpointService?.isUp(BREAKPOINT.md);
  }

  /**
   * Verifies whether the current screen size equals or is smaller than breakpoint `BREAKPOINT.sm`.
   *
   * @returns {Observable<boolean>} - If the given breakpoint equals or is smaller than`BREAKPOINT.sm` returns `true`, otherwise `false`.
   */
  isMobile(): Observable<boolean> {
    return this.breakpointService?.isDown(BREAKPOINT.sm);
  }
}
