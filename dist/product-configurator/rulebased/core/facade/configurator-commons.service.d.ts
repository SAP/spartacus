import { Store } from '@ngrx/store';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { LoggerService } from '@spartacus/core';
import { CommonConfigurator, CommonConfiguratorUtilsService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorCartService } from './configurator-cart.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorCommonsService {
    protected store: Store<StateWithConfigurator>;
    protected commonConfigUtilsService: CommonConfiguratorUtilsService;
    protected configuratorCartService: ConfiguratorCartService;
    protected activeCartService: ActiveCartFacade;
    protected configuratorUtils: ConfiguratorUtilsService;
    protected logger: LoggerService;
    constructor(store: Store<StateWithConfigurator>, commonConfigUtilsService: CommonConfiguratorUtilsService, configuratorCartService: ConfiguratorCartService, activeCartService: ActiveCartFacade, configuratorUtils: ConfiguratorUtilsService);
    /**
     * Verifies whether there are any pending configuration changes.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} Returns true if there are any pending changes, otherwise false
     */
    hasPendingChanges(owner: CommonConfigurator.Owner): Observable<boolean>;
    /**
     * Verifies whether the configuration is loading.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} Returns true if the configuration is loading, otherwise false
     */
    isConfigurationLoading(owner: CommonConfigurator.Owner): Observable<boolean>;
    /**
     * Returns a configuration for an owner. Emits only if there are valid configurations
     * available for the requested owner, does not trigger the re-read or
     * creation of the configuration in case it's not there
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<Configurator.Configuration>}
     */
    getConfiguration(owner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    /**
     * Returns a configuration if it exists or creates a new one.
     * Emits if there is a valid configuration available and triggers
     * the configuration creation or read from backend in case it is not
     * available
     *
     * @param owner - Configuration owner
     * @returns {Observable<Configurator.Configuration>}
     */
    getOrCreateConfiguration(owner: CommonConfigurator.Owner, configIdTemplate?: string): Observable<Configurator.Configuration>;
    /**
     * Updates a configuration, specified by the configuration owner key, group ID and a changed attribute.
     *
     * @param ownerKey - Configuration owner key
     * @param changedAttribute - Changes attribute
     */
    updateConfiguration(ownerKey: string, changedAttribute: Configurator.Attribute, updateType?: Configurator.UpdateType): void;
    /**
     * Returns a configuration with an overview. Emits valid configurations which
     * include the overview aspect
     *
     * @param configuration - Configuration
     * @returns Observable of configurations including the overview
     */
    getConfigurationWithOverview(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    /**
     * Updates configuration overview according to group and attribute filters
     *
     * @param configuration - Configuration. Can contain filters in its overview facet
     */
    updateConfigurationOverview(configuration: Configurator.Configuration): void;
    /**
     * Removes a configuration.
     *
     * @param owner - Configuration owner
     */
    removeConfiguration(owner: CommonConfigurator.Owner): void;
    /**
     * Dismisses conflict solver dialog
     *
     * @param owner - Configuration owner
     */
    dismissConflictSolverDialog(owner: CommonConfigurator.Owner): void;
    /**
     * Check if we need to launch conflict solver dialog
     *
     * @param owner - Configuration owner
     */
    checkConflictSolverDialog(owner: CommonConfigurator.Owner): void;
    /**
     * Checks if the configuration contains conflicts that are displayed as conflict groups. Note
     * that in case conflicts are displayed by the conflict solver dialog, they are not taken into
     * account for this method
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} - Returns true if the configuration has conflicts, otherwise false
     */
    hasConflicts(owner: CommonConfigurator.Owner): Observable<boolean>;
    /**
     * Forces the creation of a new default configuration for the given owner
     * @param owner - Configuration owner
     */
    forceNewConfiguration(owner: CommonConfigurator.Owner): void;
    protected getOrCreateConfigurationForProduct(owner: CommonConfigurator.Owner, configIdTemplate?: string): Observable<Configurator.Configuration>;
    protected hasConfigurationOverview(configuration: Configurator.Configuration): boolean;
    /**
     * Removes product bound configurations that is linked to state
     */
    removeProductBoundConfigurations(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorCommonsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorCommonsService>;
}
