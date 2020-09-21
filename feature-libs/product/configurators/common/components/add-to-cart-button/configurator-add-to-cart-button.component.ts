import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  GenericConfigurator,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ConfiguratorCartService } from '../../core/facade/configurator-cart.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from './../../core/model/configurator.model';
import { ConfiguratorRouter } from './../service/configurator-router-data';
import { ConfiguratorRouterExtractorService } from './../service/configurator-router-extractor.service';

@Component({
  selector: 'cx-configurator-add-to-cart-button',
  templateUrl: './configurator-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAddToCartButtonComponent {
  container$: Observable<{
    routerData: ConfiguratorRouter.Data;
    configuration: Configurator.Configuration;
    hasPendingChanges: boolean;
  }> = this.configRouterExtractorService.extractRouterData().pipe(
    switchMap((routerData) =>
      this.configuratorCommonsService
        .getConfiguration(routerData.owner)
        .pipe(map((configuration) => ({ routerData, configuration })))
        .pipe(
          switchMap((cont) =>
            this.configuratorCommonsService
              .hasPendingChanges(cont.configuration.owner)
              .pipe(
                map((hasPendingChanges) => ({
                  routerData: cont.routerData,
                  configuration: cont.configuration,
                  hasPendingChanges,
                }))
              )
          )
        )
    )
  );

  constructor(
    protected routingService: RoutingService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorCartService: ConfiguratorCartService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected globalMessageService: GlobalMessageService
  ) {}

  protected navigateToCart(): void {
    this.routingService.go('cart');
  }

  protected navigateToOverview(
    configuratorType: string,
    owner: GenericConfigurator.Owner
  ): void {
    this.routingService.go(
      {
        cxRoute: 'configureOverview' + configuratorType,
        params: { ownerType: 'cartEntry', entityKey: owner.id },
      },
      {}
    );
  }

  protected displayConfirmationMessage(key: string): void {
    this.globalMessageService.add(
      { key: key },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  /**
   * Performs the navigation to the corresponding location (cart or overview pages).
   *
   * @param {string} configuratorType - Configurator type
   * @param {GenericConfigurator.Owner} owner - Owner
   * @param {boolean} isAdd - Is add to cart
   * @param {boolean} isOverview - Is overview page
   * @param {boolean} showMessage - Show message
   */
  performNavigation(
    configuratorType: string,
    owner: GenericConfigurator.Owner,
    isAdd: boolean,
    isOverview: boolean,
    showMessage: boolean
  ): void {
    const messageKey = isAdd
      ? 'configurator.addToCart.confirmation'
      : 'configurator.addToCart.confirmationUpdate';
    if (isOverview) {
      this.navigateToCart();
    } else {
      this.navigateToOverview(configuratorType, owner);
    }
    if (showMessage) {
      this.displayConfirmationMessage(messageKey);
    }
  }

  /**
   * Decides on the resource key for the button. Depending on the business process (owner of the configuration) and the
   * need for a cart update, the text will differ
   * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
   * @param {Configurator.Configuration} configuration - Configuration
   * @returns {string} The resource key that controls the button description
   */
  getButtonResourceKey(
    routerData: ConfiguratorRouter.Data,
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
   * @param {Configurator.Configuration} configuration - Configuration
   * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state

   */
  onAddToCart(
    configuration: Configurator.Configuration,
    routerData: ConfiguratorRouter.Data
  ): void {
    const pageType = routerData.pageType;
    const configuratorType = routerData.configuratorType;
    const isOverview = pageType === ConfiguratorRouter.PageType.OVERVIEW;
    const isOwnerCartEntry =
      routerData.owner.type === GenericConfigurator.OwnerType.CART_ENTRY;
    const owner = configuration.owner;

    this.configuratorGroupsService.setGroupStatus(
      configuration.owner,
      configuration.interactionState.currentGroup,
      true
    );

    if (isOwnerCartEntry) {
      if (configuration.isCartEntryUpdateRequired) {
        this.configuratorCartService.updateCartEntry(configuration);
      }
      this.performNavigation(
        configuratorType,
        owner,
        false,
        isOverview,
        configuration.isCartEntryUpdateRequired
      );
      if (configuration.isCartEntryUpdateRequired) {
        this.configuratorCommonsService.removeConfiguration(owner);
      }
    } else {
      this.configuratorCartService.addToCart(
        owner.id,
        configuration.configId,
        owner.key
      );

      this.configuratorCommonsService
        .getConfiguration(owner)
        .pipe(
          tap((c) =>
            console.log(
              'CHHI next owner after addToCart: ' + JSON.stringify(c.nextOwner)
            )
          ),
          filter(
            (configWithNextOwner) => configWithNextOwner.nextOwner !== undefined
          ),
          take(1)
        )
        .subscribe((configWithNextOwner) => {
          console.log('CHHI before perform navigation');
          this.performNavigation(
            configuratorType,
            configWithNextOwner.nextOwner,
            true,
            isOverview,
            true
          );
          console.log('CHHI before remove for: ' + JSON.stringify(owner));
          this.configuratorCommonsService.removeConfiguration(owner);
        });
    }
  }
}
