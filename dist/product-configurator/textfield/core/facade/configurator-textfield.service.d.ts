import { Store } from '@ngrx/store';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { CommonConfigurator, CommonConfiguratorUtilsService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { StateWithConfigurationTextfield } from '../state/configuration-textfield-state';
import * as i0 from "@angular/core";
export declare class ConfiguratorTextfieldService {
    protected store: Store<StateWithConfigurationTextfield>;
    protected activeCartService: ActiveCartFacade;
    protected configuratorUtils: CommonConfiguratorUtilsService;
    protected userIdService: UserIdService;
    constructor(store: Store<StateWithConfigurationTextfield>, activeCartService: ActiveCartFacade, configuratorUtils: CommonConfiguratorUtilsService, userIdService: UserIdService);
    protected ensureConfigurationDefined: (value?: ConfiguratorTextfield.Configuration) => ConfiguratorTextfield.Configuration;
    /**
     * Creates a default textfield configuration for a product specified by the configuration owner.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    createConfiguration(owner: CommonConfigurator.Owner): Observable<ConfiguratorTextfield.Configuration>;
    /**
     * Updates a textfield configuration, specified by the changed attribute.
     *
     * @param changedAttribute - Changed attribute
     */
    updateConfiguration(changedAttribute: ConfiguratorTextfield.ConfigurationInfo): void;
    /**
     * Adds the textfield configuration to the cart
     *
     * @param productCode - Product code of the configuration root product. Cart entry carries refers to this product
     * @param configuration Textfield configuration
     */
    addToCart(productCode: string, configuration: ConfiguratorTextfield.Configuration): void;
    /**
     * Updates a cart entry, specified by its cart entry number.
     *
     * @param cartEntryNumber - Cart entry number
     * @param configuration Textfield configuration (list of alphanumeric attributes)
     */
    updateCartEntry(cartEntryNumber: string, configuration: ConfiguratorTextfield.Configuration): void;
    /**
     * Returns a textfield configuration for a cart entry.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    readConfigurationForCartEntry(owner: CommonConfigurator.Owner): Observable<ConfiguratorTextfield.Configuration>;
    /**
     * Returns the textfield configuration attached to an order entry.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    readConfigurationForOrderEntry(owner: CommonConfigurator.Owner): Observable<ConfiguratorTextfield.Configuration>;
    /**
     * Creates a textfield configuration supposed to be sent to the backend when an attribute
     * has been changed
     * @param changedAttribute Attribute changed by the end user
     * @param oldConfiguration Existing configuration to which the attribute change is applied to
     * @returns Textfield configuration (merge of existing configuration and the changed attribute)
     */
    createNewConfigurationWithChange(changedAttribute: ConfiguratorTextfield.ConfigurationInfo, oldConfiguration: ConfiguratorTextfield.Configuration): ConfiguratorTextfield.Configuration;
    protected isConfigurationInitial(configuration?: ConfiguratorTextfield.Configuration): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorTextfieldService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorTextfieldService>;
}
