import { Component } from '@angular/core';
import {
  Product,
  ProductService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { Location } from '@angular/common';

@Component({
  selector: 'cx-configurator-exit-button',
  templateUrl: './configurator-exit-button.component.html',
})
export class ConfiguratorExitButtonComponent {
  product$: Observable<Product>;
  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  constructor(
    protected productService: ProductService,
    protected routingService: RoutingService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected breakpointService: BreakpointService,
    protected windowRef: WindowRef,
    protected location: Location
  ) {}

  protected navigateToCart(): void {
    this.routingService.go('cart');
  }
  /**
   * Navigates to the product detail page of the product that is being configured.
   */
  exitConfiguration() {
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
        this.routerData$.pipe(take(1)).subscribe((routerData) => {
          if (
            routerData.owner.type === CommonConfigurator.OwnerType.CART_ENTRY
          ) {
            this.navigateToCart();
          } else {
            this.routingService.go({ cxRoute: 'product', params: product });
          }
        })
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

  /**
   * Verifies whether user is navigated from cart.
   *
   * @returns {boolean} - If user is in cart context, the method returns true
   */
  /*isNavigatedFromCart(): Observable<boolean> {
    return this.configRouterExtractorService
      .extractRouterData()
      .pipe(),
        switchMap(
          (routerData) =>
            routerData.owner.type === CommonConfigurator.OwnerType.CART_ENTRY
        )
      );
  }*/
}
