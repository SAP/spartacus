import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  GenericConfigurator,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

@Component({
  selector: 'cx-config-add-to-cart-button',
  templateUrl: './config-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAddToCartButtonComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;
  hasBeenAddedToCart$: Observable<any>;
  isOverview$: Observable<any>;
  configuratorType$: Observable<string>;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorCommonsService.getConfiguration(owner)
        )
      );
    this.configuratorType$ = this.configRouterExtractorService.getConfiguratorType(
      this.routingService
    );

    this.hasBeenAddedToCart$ = this.configRouterExtractorService.hasBeenAddedToCart(
      this.routingService
    );

    this.isOverview$ = this.configRouterExtractorService.isOverview(
      this.routingService
    );
  }

  private navigateToCart() {
    this.routingService.go('cart');
  }

  private navigateToOverview(
    configuratorType: string,
    configuration: Configurator.Configuration
  ) {
    this.routingService.go(
      'configureOverview' +
        configuratorType +
        '/cartEntry/entityKey/' +
        configuration.nextOwner.id,
      {}
    );
  }

  private displayConfirmationMessage() {
    this.globalMessageService.add(
      { key: 'configurator.addToCart.confirmation' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  onAddToCart(
    owner: GenericConfigurator.Owner,
    configId: string,
    configuratorType: string
  ) {
    this.configRouterExtractorService
      .hasBeenAddedToCart(this.routingService)
      .pipe(take(1))
      .subscribe(config => {
        if (config.hasBeenAdded) {
          this.navigateToCart();
        } else {
          this.configuratorCommonsService.addToCart(
            owner.id,
            configId,
            owner.key
          );

          this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(
              filter(configuration => configuration.nextOwner !== undefined),
              take(1)
            )
            .subscribe(configuration => {
              this.isOverview$.pipe(take(1)).subscribe(isOverview => {
                if (isOverview.isOverview) {
                  this.navigateToCart();
                } else {
                  this.navigateToOverview(configuratorType, configuration);
                }
                this.displayConfirmationMessage();
              });
              this.configuratorCommonsService.removeConfiguration(owner);
              this.configuratorCommonsService.removeUiState(owner);
            });
        }
      });
  }
}
