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
import { filter, map, switchMap, take } from 'rxjs/operators';
import { ConfigurationRouter } from '../../generic/service/config-router-data';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

@Component({
  selector: 'cx-config-add-to-cart-button',
  templateUrl: './config-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAddToCartButtonComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;
  routerData$: Observable<ConfigurationRouter.Data>;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        )
      );

    this.routerData$ = this.configRouterExtractorService.extractRouterData();
  }

  private navigateToCart() {
    this.routingService.go('cart');
  }

  private navigateToOverview(
    configuratorType: string,
    owner: GenericConfigurator.Owner
  ) {
    this.routingService.go(
      'configureOverview' +
        configuratorType +
        '/cartEntry/entityKey/' +
        owner.id,
      {}
    );
  }

  private displayConfirmationMessage(key: string) {
    this.globalMessageService.add(
      { key: key },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }
  /**
   * Decides on the resource key for the button. Depending on the business process (owner of the configuration) and the
   * need for a cart update, the text will differ
   * @param routerData
   * @param configuration
   * @returns {string} The resource key that controls the button description
   */
  public getButtonResourceKey(
    routerData: ConfigurationRouter.Data,
    configuration: Configurator.Configuration
  ): string {
    if (
      routerData.isOwnerCartEntry &&
      configuration.isCartEntryUpdateRequired
    ) {
      return 'configurator.addToCart.buttonUpdateCart';
    } else if (
      routerData.isOwnerCartEntry &&
      !configuration.isCartEntryUpdateRequired
    ) {
      return 'configurator.addToCart.buttonAfterAddToCart';
    } else {
      return 'configurator.addToCart.button';
    }
  }

  /**
   * Triggers action and navigation, both depending on the context. Might result in an addToCart, updateCartEntry,
   * just a cart navigation or a browser back navigation
   * @param configuration Configuration
   * @param configuratorType Configurator Type
   * @param pageType Page type, (overview or interactive configuration page)
   */
  public onAddToCart(
    configuration: Configurator.Configuration,
    configuratorType: string,
    pageType: string
  ) {
    const isOverview = pageType === ConfigurationRouter.PageType.OVERVIEW;
    const owner = configuration.owner;
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        map((routerData) => routerData.isOwnerCartEntry),
        take(1)
      )
      .subscribe((isOwnerCartEntry) => {
        if (isOwnerCartEntry) {
          if (configuration.isCartEntryUpdateRequired) {
            this.configuratorCommonsService.updateCartEntry(configuration);
          }
          this.performNavigation(
            configuratorType,
            configuration.owner,
            'configurator.addToCart.confirmationUpdate',
            isOverview,
            configuration.isCartEntryUpdateRequired
          );
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
                (configWithNextOwner) =>
                  configWithNextOwner.nextOwner !== undefined
              ),
              take(1)
            )
            .subscribe((configWithNextOwner) => {
              this.performNavigation(
                configuratorType,
                configWithNextOwner.nextOwner,
                'configurator.addToCart.confirmation',
                isOverview,
                true
              );
              this.configuratorCommonsService.removeConfiguration(owner);
            });
        }
      });
  }

  performNavigation(
    configuratorType: string,
    owner: GenericConfigurator.Owner,
    messageKey: string,
    isOverview: boolean,
    showMessage: boolean
  ) {
    if (isOverview) {
      this.navigateToCart();
    } else {
      this.navigateToOverview(configuratorType, owner);
    }
    if (showMessage) {
      this.displayConfirmationMessage(messageKey);
    }
  }
}
