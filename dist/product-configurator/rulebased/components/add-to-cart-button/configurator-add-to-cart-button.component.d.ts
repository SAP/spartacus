import { OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { OrderHistoryFacade } from '@spartacus/order/root';
import { CommonConfigurator, CommonConfiguratorUtilsService, ConfiguratorRouter, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { IntersectionService, ICON_TYPE } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorCartService } from '../../core/facade/configurator-cart.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { UntypedFormControl } from '@angular/forms';
import { ConfiguratorQuantityService } from '../../core/services/configurator-quantity.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorAddToCartButtonComponent implements OnInit, OnDestroy {
    protected routingService: RoutingService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorCartService: ConfiguratorCartService;
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected globalMessageService: GlobalMessageService;
    protected orderHistoryFacade: OrderHistoryFacade;
    protected commonConfiguratorUtilsService: CommonConfiguratorUtilsService;
    protected configUtils: ConfiguratorStorefrontUtilsService;
    protected intersectionService: IntersectionService;
    protected configuratorQuantityService?: ConfiguratorQuantityService | undefined;
    protected subscription: Subscription;
    quantityControl: UntypedFormControl;
    iconType: typeof ICON_TYPE;
    container$: Observable<{
        routerData: ConfiguratorRouter.Data;
        configuration: Configurator.Configuration;
        hasPendingChanges: boolean;
    }>;
    constructor(routingService: RoutingService, configuratorCommonsService: ConfiguratorCommonsService, configuratorCartService: ConfiguratorCartService, configuratorGroupsService: ConfiguratorGroupsService, configRouterExtractorService: ConfiguratorRouterExtractorService, globalMessageService: GlobalMessageService, orderHistoryFacade: OrderHistoryFacade, commonConfiguratorUtilsService: CommonConfiguratorUtilsService, configUtils: ConfiguratorStorefrontUtilsService, intersectionService: IntersectionService, configuratorQuantityService: ConfiguratorQuantityService);
    /**
     * @deprecated since 6.1
     */
    constructor(routingService: RoutingService, configuratorCommonsService: ConfiguratorCommonsService, configuratorCartService: ConfiguratorCartService, configuratorGroupsService: ConfiguratorGroupsService, configRouterExtractorService: ConfiguratorRouterExtractorService, globalMessageService: GlobalMessageService, orderHistoryFacade: OrderHistoryFacade, commonConfiguratorUtilsService: CommonConfiguratorUtilsService, configUtils: ConfiguratorStorefrontUtilsService, intersectionService: IntersectionService);
    ngOnInit(): void;
    protected navigateToCart(): void;
    protected navigateToOverview(configuratorType: string, owner: CommonConfigurator.Owner): void;
    protected displayConfirmationMessage(key: string): void;
    /**
     * Performs the navigation to the corresponding location (cart or overview pages).
     *
     * @param {string} configuratorType - Configurator type
     * @param {CommonConfigurator.Owner} owner - Owner
     * @param {boolean} isAdd - Is add to cart
     * @param {boolean} isOverview - Is overview page
     * @param {boolean} showMessage - Show message
     */
    performNavigation(configuratorType: string, owner: CommonConfigurator.Owner, isAdd: boolean, isOverview: boolean, showMessage: boolean): void;
    /**
     * Decides on the resource key for the button. Depending on the business process (owner of the configuration) and the
     * need for a cart update, the text will differ.
     *
     * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {string} The resource key that controls the button description
     */
    getButtonResourceKey(routerData: ConfiguratorRouter.Data, configuration: Configurator.Configuration): string;
    /**
     * Verifies whether it is a cart entry.
     *
     * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
     * @returns {boolean} - 'true' if it is a cart entry, otherwise 'false'
     */
    isCartEntry(routerData: ConfiguratorRouter.Data): boolean;
    /**
     * Triggers action and navigation, both depending on the context. Might result in an addToCart, updateCartEntry,
     * just a cart navigation or a browser back navigation
     * @param {Configurator.Configuration} configuration - Configuration
     * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
     */
    onAddToCart(configuration: Configurator.Configuration, routerData: ConfiguratorRouter.Data): void;
    protected onAddToCartForProduct(owner: CommonConfigurator.Owner, configuration: Configurator.Configuration, configuratorType: string, isOverview: boolean): void;
    protected navigateForProductBound(configWithNextOwner: Configurator.Configuration, configuratorType: string, isOverview: boolean): void;
    protected onUpdateCart(configuration: Configurator.Configuration, configuratorType: string, owner: CommonConfigurator.Owner, isOverview: boolean): void;
    leaveConfigurationOverview(): void;
    protected goToOrderDetails(owner: CommonConfigurator.Owner): void;
    extractConfigPrices(configuration: Configurator.Configuration): {
        basePrice: string | undefined;
        selectedOptions: string | undefined;
        totalPrice: string | undefined;
    };
    protected makeAddToCartButtonSticky(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAddToCartButtonComponent, [null, null, null, null, null, null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAddToCartButtonComponent, "cx-configurator-add-to-cart-button", never, {}, {}, never, never, false, never>;
}
