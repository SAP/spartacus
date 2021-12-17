import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  Order,
  RoutingService,
} from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCartService } from '../../core/facade/configurator-cart.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';

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
    protected globalMessageService: GlobalMessageService,
    protected orderFacade: OrderFacade,
    protected commonConfiguratorUtilsService: CommonConfiguratorUtilsService
  ) {}

  protected navigateToCart(): void {
    this.routingService.go('cart');
  }

  protected navigateToOverview(
    configuratorType: string,
    owner: CommonConfigurator.Owner
  ): void {
    this.routingService.go({
      cxRoute: 'configureOverview' + configuratorType,
      params: { ownerType: 'cartEntry', entityKey: owner.id },
    });
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
   * @param {CommonConfigurator.Owner} owner - Owner
   * @param {boolean} isAdd - Is add to cart
   * @param {boolean} isOverview - Is overview page
   * @param {boolean} showMessage - Show message
   */
  performNavigation(
    configuratorType: string,
    owner: CommonConfigurator.Owner,
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
    const configuratorType = configuration.owner.configuratorType;
    const isOverview = pageType === ConfiguratorRouter.PageType.OVERVIEW;
    const isOwnerCartEntry =
      routerData.owner.type === CommonConfigurator.OwnerType.CART_ENTRY;
    const owner = configuration.owner;

    const currentGroup = configuration.interactionState.currentGroup;
    if (currentGroup) {
      this.configuratorGroupsService.setGroupStatusVisited(
        configuration.owner,
        currentGroup
      );
    }
    this.container$
      .pipe(
        filter((cont) => !cont.hasPendingChanges),
        take(1)
      )
      .subscribe(() => {
        if (isOwnerCartEntry) {
          if (configuration.isCartEntryUpdateRequired) {
            this.configuratorCartService.updateCartEntry(configuration);
          }

          this.performNavigation(
            configuratorType,
            owner,
            false,
            isOverview,
            configuration.isCartEntryUpdateRequired ?? false
          );
          if (configuration.isCartEntryUpdateRequired) {
            this.configuratorCommonsService.removeConfiguration(owner);
          }
        } else {
          this.configuratorCartService.addToCart(
            owner.id,
            configuration.configId,
            owner
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
              //See preceeding filter operator: configWithNextOwner.nextOwner is always defined here
              const nextOwner =
                configWithNextOwner.nextOwner ??
                ConfiguratorModelUtils.createInitialOwner();

              this.performNavigation(
                configuratorType,
                nextOwner,
                true,
                isOverview,
                true
              );

              // we clean up the cart entry related configuration, as we might have a
              // configuration for the same cart entry number stored already.
              // (Cart entries might have been deleted)

              // we do not clean up the product bound configuration yet, as existing
              // observables would instantly trigger a re-create.
              // Cleaning up this obsolete product bound configuration will only happen
              // when a new config form requests a new observable for a product bound
              // configuration

              this.configuratorCommonsService.removeConfiguration(nextOwner);
            });
        }
      });
  }
  leaveConfigurationOverview(): void {
    this.container$.pipe(take(1)).subscribe((container) => {
      if (
        container.routerData.owner.type ===
        CommonConfigurator.OwnerType.ORDER_ENTRY
      ) {
        this.goToOrderDetails(container.routerData.owner);
      } else {
        this.routingService.go({ cxRoute: 'checkoutReviewOrder' });
      }
    });
  }

  protected goToOrderDetails(owner: CommonConfigurator.Owner): void {
    this.orderFacade.loadOrderDetails(
      this.commonConfiguratorUtilsService.decomposeOwnerId(owner.id).documentId
    );
    this.orderFacade
      .getOrderDetails()
      .pipe(
        filter((order: Order) => order !== undefined),
        take(1)
      )
      .subscribe((order: Order) =>
        this.routingService.go({ cxRoute: 'orderDetails', params: order })
      );
  }
}
