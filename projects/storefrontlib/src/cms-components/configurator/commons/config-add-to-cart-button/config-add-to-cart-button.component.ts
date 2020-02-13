import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
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
  ownerCheck$: Observable<any>;
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

    this.ownerCheck$ = this.configRouterExtractorService.isOwnerCartEntry(
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
    configuration: Configurator.Configuration,
    configuratorType: string
  ) {
    const owner = configuration.owner;
    this.configRouterExtractorService
      .isOwnerCartEntry(this.routingService)
      .pipe(take(1))
      .subscribe(config => {
        if (config.isOwnerCartEntry) {
          this.configuratorCommonsService.updateCartEntry(configuration);
          this.navigateToCart();
        } else {
          this.configuratorCommonsService.addToCart(
            owner.id,
            configuration.configId,
            owner.key
          );

          this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(
              filter(
                configWithNextOwner =>
                  configWithNextOwner.nextOwner !== undefined
              ),
              take(1)
            )
            .subscribe(configWithNextOwner => {
              this.isOverview$.pipe(take(1)).subscribe(isOverview => {
                if (isOverview.isOverview) {
                  this.navigateToCart();
                } else {
                  this.navigateToOverview(
                    configuratorType,
                    configWithNextOwner
                  );
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
