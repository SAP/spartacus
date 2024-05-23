/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Order, OrderHistoryFacade } from '@spartacus/order/root';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  ICON_TYPE,
  IntersectionOptions,
  IntersectionService,
  KeyboardFocusService,
} from '@spartacus/storefront';
import { Observable, Subscription, of } from 'rxjs';
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
import { ConfiguratorQuantityService } from '../../core/services/configurator-quantity.service';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

const CX_SELECTOR = 'cx-configurator-add-to-cart-button';

@Component({
  selector: CX_SELECTOR,
  templateUrl: './configurator-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAddToCartButtonComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  protected multiCartFacade = inject(MultiCartFacade);
  protected focusService = inject(KeyboardFocusService);
  protected activeCartFacade = inject(ActiveCartFacade);
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
    protected configuratorQuantityService: ConfiguratorQuantityService
  ) {}

  ngOnInit(): void {
    this.makeAddToCartButtonSticky();

    this.configuratorQuantityService
      .getQuantity()
      .pipe(take(1))
      .subscribe((quantity) => {
        this.quantityControl.setValue(quantity);
      });

    this.subscription.add(
      this.quantityControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(() =>
          this.configuratorQuantityService.setQuantity(
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
    owner: CommonConfigurator.Owner,
    productCode?: string
  ): void {
    this.routingService
      .go(
        {
          cxRoute: 'configureOverview' + configuratorType,
          params: { ownerType: 'cartEntry', entityKey: owner.id },
        },
        { queryParams: { productCode: productCode } }
      )
      .then(() => {
        this.focusOverviewInTabBar();
      });
  }

  protected focusOverviewInTabBar(): void {
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        ),
        filter((configuration) => configuration.overview != null),
        take(1),
        delay(0) //we need to consider the re-rendering of the page
      )
      .subscribe(() => {
        this.focusService.clear();
        this.configUtils.focusFirstActiveElement('cx-configurator-tab-bar');
      });
  }

  protected displayConfirmationMessage(key: string): void {
    this.globalMessageService.add(
      { key: key },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  protected isQuoteCartActive(): Observable<boolean> {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart) => cart.quoteCode !== undefined));
  }

  protected getTranslationKeyForAddToCart(
    isAddToCart: boolean
  ): Observable<string> {
    return this.isQuoteCartActive().pipe(
      map((isActive) => {
        if (isActive) {
          return 'configurator.addToCart.confirmationQuoteUpdate';
        } else {
          if (!isAddToCart) {
            return 'configurator.addToCart.confirmationUpdate';
          } else {
            return 'configurator.addToCart.confirmation';
          }
        }
      })
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
    showMessage: boolean,
    productCode?: string
  ): void {
    if (isOverview) {
      this.navigateToCart();
    } else {
      this.navigateToOverview(configuratorType, owner, productCode);
    }
    if (showMessage) {
      this.getTranslationKeyForAddToCart(isAdd)
        .pipe(take(1))
        .subscribe((translationKey) => {
          this.displayConfirmationMessage(translationKey);
        });
    }
  }

  /**
   * Decides on the resource key for the button. Depending on the business process (owner of the configuration) and the
   * need for a cart update, the text will differ.
   *
   * @param routerData - Reflects the current router state
   * @param configuration - Configuration
   * @param isQuoteActive - Is quote active
   * @returns - The resource key that controls the button description
   */
  getButtonResourceKey(
    routerData: ConfiguratorRouter.Data,
    configuration: Configurator.Configuration,
    isQuoteActive: boolean | null = false
  ): string {
    if (
      (routerData.isOwnerCartEntry || isQuoteActive) &&
      configuration.isCartEntryUpdateRequired
    ) {
      return 'configurator.addToCart.buttonUpdateCart';
    } else if (
      routerData.isOwnerCartEntry &&
      !configuration.isCartEntryUpdateRequired
    ) {
      if (isQuoteActive) {
        return 'configurator.addToCart.buttonForQuote';
      } else {
        return 'configurator.addToCart.buttonAfterAddToCart';
      }
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
    const productCode = !!routerData.productCode
      ? routerData.productCode
      : configuration.productCode;

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
          this.onUpdateCart(
            configuration,
            configuratorType,
            owner,
            isOverview,
            productCode
          );
        } else {
          this.onAddToCartForProduct(
            owner,
            configuration,
            configuratorType,
            isOverview,
            productCode
          );
        }
      });
  }

  protected onAddToCartForProduct(
    owner: CommonConfigurator.Owner,
    configuration: Configurator.Configuration,
    configuratorType: string,
    isOverview: boolean,
    productCode?: string
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
          isOverview,
          productCode
        );
      });
  }

  protected navigateForProductBound(
    configWithNextOwner: Configurator.Configuration,
    configuratorType: string,
    isOverview: boolean,
    productCode?: string
  ) {
    const nextOwner =
      configWithNextOwner.nextOwner ??
      ConfiguratorModelUtils.createInitialOwner();

    this.performNavigation(
      configuratorType,
      nextOwner,
      true,
      isOverview,
      true,
      productCode
    );

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
    isOverview: boolean,
    productCode?: string
  ) {
    if (configuration.isCartEntryUpdateRequired) {
      this.configuratorCartService.updateCartEntry(configuration);
    }

    this.performNavigation(
      configuratorType,
      owner,
      false,
      isOverview,
      configuration.isCartEntryUpdateRequired ?? false,
      productCode
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
      } else if (
        container.routerData.owner.type ===
        CommonConfigurator.OwnerType.QUOTE_ENTRY
      ) {
        this.goToQuoteDetails(container.routerData.owner);
      } else if (
        container.routerData.owner.type ===
        CommonConfigurator.OwnerType.SAVED_CART_ENTRY
      ) {
        this.goToSavedCartDetails(container.routerData.owner);
      } else if (
        container.routerData.owner.type ===
          CommonConfigurator.OwnerType.CART_ENTRY &&
        !container.routerData.navigateToCheckout
      ) {
        this.routingService.go({ cxRoute: 'cart' });
      } else if (
        container.routerData.owner.type === CommonConfigurator.OwnerType.PRODUCT
      ) {
        this.routingService.go({
          cxRoute: 'product',
          params: { code: container.routerData.owner.id },
        });
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

  protected goToQuoteDetails(owner: CommonConfigurator.Owner): void {
    const entryKeys = this.commonConfiguratorUtilsService.decomposeOwnerId(
      owner.id
    );
    this.routingService.go({
      cxRoute: 'quoteDetails',
      params: { quoteId: entryKeys.documentId },
    });
  }

  /**
   * Navigates to the quote that is attached to the saved cart. At the moment we
   * only support saved carts if linked to quotes.
   * @param owner Configuration owner
   */
  protected goToSavedCartDetails(owner: CommonConfigurator.Owner): void {
    const entryKeys = this.commonConfiguratorUtilsService.decomposeOwnerId(
      owner.id
    );
    this.multiCartFacade
      .getCart(entryKeys.documentId)
      .pipe(take(1))
      .subscribe((cart) => {
        this.routingService.go({
          cxRoute: 'quoteDetails',
          params: { quoteId: cart.quoteCode },
        });
      });
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
