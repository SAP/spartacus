import { Store } from '@ngrx/store';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import { StateUtils, UserIdService } from '@spartacus/core';
import { CommonConfigurator, CommonConfiguratorUtilsService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorCartService {
    protected store: Store<StateWithConfigurator>;
    protected activeCartService: ActiveCartFacade;
    protected commonConfigUtilsService: CommonConfiguratorUtilsService;
    protected checkoutQueryFacade: CheckoutQueryFacade;
    protected userIdService: UserIdService;
    protected configuratorUtilsService: ConfiguratorUtilsService;
    constructor(store: Store<StateWithConfigurator>, activeCartService: ActiveCartFacade, commonConfigUtilsService: CommonConfiguratorUtilsService, checkoutQueryFacade: CheckoutQueryFacade, userIdService: UserIdService, configuratorUtilsService: ConfiguratorUtilsService);
    /**
     * Reads a configuration that is attached to a cart entry, dispatching the respective action.
     *
     * @param owner Configuration owner
     * @returns Observable of product configurations
     */
    readConfigurationForCartEntry(owner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    /**
     * Reads a configuration that is attached to an order entry, dispatching the respective action.
     *
     * @param owner Configuration owner
     * @returns Observable of product configurations
     */
    readConfigurationForOrderEntry(owner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    /**
     * Adds a configuration to the cart, specified by the product code, a configuration ID and configuration owner key.
     *
     * @param productCode - Product code
     * @param configId - Configuration ID
     * @param owner - Configuration owner
     * @param quantity - Quantity
     */
    addToCart(productCode: string, configId: string, owner: CommonConfigurator.Owner, quantity?: number): void;
    /**
     * Updates a cart entry, specified by the configuration.
     * The cart entry number for the entry that owns the configuration can be told
     * from the configuration's owner ID
     *
     * @param configuration - Configuration
     */
    updateCartEntry(configuration: Configurator.Configuration): void;
    /**
     * Can be used to check if the active cart has any product configuration issues.
     *
     * @returns True if and only if there is at least one cart entry with product configuration issues
     */
    activeCartHasIssues(): Observable<boolean>;
    /**
     * Retrieves cart entry by a cart entry number.
     *
     * @param {string} entryNumber - Entry number
     * @returns {Observable<OrderEntry | undefined>} - Cart entry
     */
    getEntry(entryNumber: string): Observable<OrderEntry | undefined>;
    /**
     * Remove all configurations that are linked to cart entries
     */
    removeCartBoundConfigurations(): void;
    protected isConfigurationCreated(configuration: Configurator.Configuration): boolean;
    protected configurationNeedsReading(configurationState: StateUtils.LoaderState<Configurator.Configuration>): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorCartService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorCartService>;
}
