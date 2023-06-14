/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Order, OrderHistoryFacade } from '@spartacus/order/root';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  IntersectionOptions,
  IntersectionService,
} from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
} from 'rxjs/operators';
import { ConfiguratorCartService } from '../../core/facade/configurator-cart.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { UntypedFormControl } from '@angular/forms';
import { ConfiguratorQuantityService } from '../../core/services/configurator-quantity.service';

const CX_SELECTOR = 'cx-configurator-add-to-cart-button';

@Component({
  selector: CX_SELECTOR,
  templateUrl: './configurator-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAddToCartButtonComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  quantityControl = new UntypedFormControl(1);
  iconType = ICON_TYPE;

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

  // TODO (CXSPA-3392): make configuratorQuantityService a required dependency
  constructor(
    routingService: RoutingService,
    configuratorCommonsService: ConfiguratorCommonsService,
    configuratorCartService: ConfiguratorCartService,
    configuratorGroupsService: ConfiguratorGroupsService,
    configRouterExtractorService: ConfiguratorRouterExtractorService,
    globalMessageService: GlobalMessageService,
    orderHistoryFacade: OrderHistoryFacade,
    commonConfiguratorUtilsService: CommonConfiguratorUtilsService,
    configUtils: ConfiguratorStorefrontUtilsService,
    intersectionService: IntersectionService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    configuratorQuantityService: ConfiguratorQuantityService
  );

  /**
   * @deprecated since 6.1
   */
  constructor(
    routingService: RoutingService,
    configuratorCommonsService: ConfiguratorCommonsService,
    configuratorCartService: ConfiguratorCartService,
    configuratorGroupsService: ConfiguratorGroupsService,
    configRouterExtractorService: ConfiguratorRouterExtractorService,
    globalMessageService: GlobalMessageService,
    orderHistoryFacade: OrderHistoryFacade,
    commonConfiguratorUtilsService: CommonConfiguratorUtilsService,
    configUtils: ConfiguratorStorefrontUtilsService,
    intersectionService: IntersectionService
  );

  constructor(
    protected routingService: RoutingService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorCartService: ConfiguratorCartService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected globalMessageService: GlobalMessageService,
    protected orderHistoryFacade: OrderHistoryFacade,
    protected commonConfiguratorUtilsService: CommonConfiguratorUtilsService,
    protected configUtils: ConfiguratorStorefrontUtilsService,
    protected intersectionService: IntersectionService,
    @Optional()
    protected configuratorQuantityService?: ConfiguratorQuantityService
  ) {}

  ngOnInit(): void {
    this.makeAddToCartButtonSticky();

    if (this.configuratorQuantityService) {
      this.configuratorQuantityService
        .getQuantity()
        .pipe(take(1))
        .subscribe((quantity) => {
          this.quantityControl.setValue(quantity);
        });
    }

    this.subscription.add(
      this.quantityControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(() =>
          this.configuratorQuantityService?.setQuantity(
            this.quantityControl.value
          )
        )
    );
  }

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
   * need for a cart update, the text will differ.
   *
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
   * Verifies whether it is a cart entry.
   *
   * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
   * @returns {boolean} - 'true' if it is a cart entry, otherwise 'false'
   */
  isCartEntry(routerData: ConfiguratorRouter.Data): boolean {
    return routerData.isOwnerCartEntry ? routerData.isOwnerCartEntry : false;
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
          this.onUpdateCart(configuration, configuratorType, owner, isOverview);
        } else {
          this.onAddToCartForProduct(
            owner,
            configuration,
            configuratorType,
            isOverview
          );
        }
      });
  }

  protected onAddToCartForProduct(
    owner: CommonConfigurator.Owner,
    configuration: Configurator.Configuration,
    configuratorType: string,
    isOverview: boolean
  ) {
    const quantity = this.quantityControl.value;
    this.configuratorCartService.addToCart(
      owner.id,
      configuration.configId,
      owner,
      quantity
    );

    this.configuratorCommonsService
      .getConfiguration(owner)
      .pipe(
        filter(
          (configWithNextOwner) => configWithNextOwner.nextOwner !== undefined
        ),
        take(1)
      )
      .subscribe((configWithNextOwner) => {
        //See preceding filter operator: configWithNextOwner.nextOwner is always defined here
        this.navigateForProductBound(
          configWithNextOwner,
          configuratorType,
          isOverview
        );
      });
  }

  protected navigateForProductBound(
    configWithNextOwner: Configurator.Configuration,
    configuratorType: string,
    isOverview: boolean
  ) {
    const nextOwner =
      configWithNextOwner.nextOwner ??
      ConfiguratorModelUtils.createInitialOwner();

    this.performNavigation(configuratorType, nextOwner, true, isOverview, true);

    // we clean up the cart entry related configuration, as we might have a
    // configuration for the same cart entry number stored already.
    // (Cart entries might have been deleted)
    // Needs to happen only if we are on configuration page, navigation to
    // cart will anyhow delete.
    // We do not clean up the product bound configuration yet, as existing
    // observables would instantly trigger a re-create.
    // Cleaning up this obsolete product bound configuration (with link to the cart) will
    // only happen on leaving the configurator pages, see ConfiguratorRouterListener
    if (!isOverview) {
      this.configuratorCommonsService.removeConfiguration(nextOwner);
    }
  }

  protected onUpdateCart(
    configuration: Configurator.Configuration,
    configuratorType: string,
    owner: CommonConfigurator.Owner,
    isOverview: boolean
  ) {
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
    //Only remove if we are on configuration page, because on final cart navigation,
    //the configuration will anyhow be removed
    if (configuration.isCartEntryUpdateRequired && !isOverview) {
      this.configuratorCommonsService.removeConfiguration(owner);
    }
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
    this.orderHistoryFacade.loadOrderDetails(
      this.commonConfiguratorUtilsService.decomposeOwnerId(owner.id).documentId
    );
    this.orderHistoryFacade
      .getOrderDetails()
      .pipe(
        filter((order: Order) => order !== undefined),
        take(1)
      )
      .subscribe((order: Order) =>
        this.routingService.go({ cxRoute: 'orderDetails', params: order })
      );
  }

  extractConfigPrices(configuration: Configurator.Configuration) {
    const priceSummary = configuration.priceSummary;
    const basePrice = priceSummary?.basePrice?.formattedValue;
    const selectedOptions = priceSummary?.selectedOptions?.formattedValue;
    const totalPrice = priceSummary?.currentTotal?.formattedValue;
    const prices = {
      basePrice: basePrice,
      selectedOptions: selectedOptions,
      totalPrice: totalPrice,
    };
    if (!basePrice || basePrice === '-') {
      prices.basePrice = '0';
    }
    if (!selectedOptions || selectedOptions === '-') {
      prices.selectedOptions = '0';
    }
    if (!totalPrice || totalPrice === '-') {
      prices.totalPrice = '0';
    }
    return prices;
  }

  protected makeAddToCartButtonSticky(): void {
    // The add-to-cart button has to be shown at the bottom of the configuration view
    // and scrolled out together with the configuration view when it is moved to the top out from the viewport.
    // From the technical point of view it is controlled by checking whether the add-to-cart button intersects the price-summary or not:
    // the add-to-cart button has to be shown sticky, if intersects, and fixed, if not.
    // To avoid the situation where the add-to-cart button is shown fixed below the footer view
    // when the configuration view is scrolled out to the top on small mobile screens, we use the rootMargin parameter.
    // The first field of the rootMargin controls the delay in pixel after them the add-to-cart button has to be shown fixed again.
    // We set this value very high, so the add-to-cart button will never appear below the footer view even in case of small screens.
    const options: IntersectionOptions = {
      rootMargin: '9999px 0px -100px 0px',
    };

    this.subscription.add(
      this.container$
        .pipe(
          take(1),
          delay(0),
          map(() =>
            this.configUtils.getElement('cx-configurator-price-summary')
          ),
          switchMap((priceSummary) =>
            priceSummary
              ? this.intersectionService.isIntersecting(priceSummary, options)
              : of(undefined)
          ),
          filter((isIntersecting) => isIntersecting !== undefined)
        )
        .subscribe((isIntersecting) => {
          if (isIntersecting) {
            this.configUtils.changeStyling(CX_SELECTOR, 'position', 'sticky');
          } else {
            this.configUtils.changeStyling(CX_SELECTOR, 'position', 'fixed');
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
