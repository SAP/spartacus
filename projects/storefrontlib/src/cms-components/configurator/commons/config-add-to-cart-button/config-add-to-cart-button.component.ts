import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../service/config-router-extractor.service';

@Component({
  selector: 'cx-config-add-to-cart-button',
  templateUrl: './config-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAddToCartButtonComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;
  hasBeenAddedToCart$: Observable<any>;
  configuratorType$: Observable<string>;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorCommonsService.getConfiguration(owner.key)
        )
      );
    this.configuratorType$ = this.configRouterExtractorService.getConfiguratorType(
      this.routingService
    );

    this.hasBeenAddedToCart$ = this.configRouterExtractorService.hasBeenAddedToCart(
      this.routingService
    );
  }

  onAddToCart(
    productCode: string,
    configId: string,
    ownerKey: string,
    configuratorType: string
  ) {
    this.configRouterExtractorService
      .hasBeenAddedToCart(this.routingService)
      .pipe(take(1))
      .subscribe(config => {
        if (config.hasBeenAdded) {
          this.routingService.go('cart');
        } else {
          this.configuratorCommonsService.addToCart(
            productCode,
            configId,
            ownerKey
          );
          this.configuratorCommonsService
            .getConfiguration(ownerKey)
            .pipe(
              filter(configuration => configuration.nextOwner !== undefined),
              take(1)
            )
            .subscribe(configuration => {
              this.routingService.go(
                'configureOverview' +
                  configuratorType +
                  '/cartEntry/entityKey/' +
                  configuration.nextOwner.id,
                {}
              );
            });
        }
      });
  }
}
