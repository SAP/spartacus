/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject, isDevMode } from '@angular/core';
import { select } from '@ngrx/store';
import { LoggerService } from '@spartacus/core';
import { CommonConfigurator, } from '@spartacus/product-configurator/common';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { ConfiguratorSelectors } from '../state/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/product-configurator/common";
import * as i3 from "./configurator-cart.service";
import * as i4 from "@spartacus/cart/base/root";
import * as i5 from "./utils/configurator-utils.service";
export class ConfiguratorCommonsService {
    constructor(store, commonConfigUtilsService, configuratorCartService, activeCartService, configuratorUtils) {
        this.store = store;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.configuratorCartService = configuratorCartService;
        this.activeCartService = activeCartService;
        this.configuratorUtils = configuratorUtils;
        this.logger = inject(LoggerService);
    }
    /**
     * Verifies whether there are any pending configuration changes.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} Returns true if there are any pending changes, otherwise false
     */
    hasPendingChanges(owner) {
        return this.store.pipe(select(ConfiguratorSelectors.hasPendingChanges(owner.key)));
    }
    /**
     * Verifies whether the configuration is loading.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} Returns true if the configuration is loading, otherwise false
     */
    isConfigurationLoading(owner) {
        return this.store.pipe(select(ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(owner.key)), map((configurationState) => configurationState.loading ?? false));
    }
    /**
     * Returns a configuration for an owner. Emits only if there are valid configurations
     * available for the requested owner, does not trigger the re-read or
     * creation of the configuration in case it's not there
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<Configurator.Configuration>}
     */
    getConfiguration(owner) {
        return this.store.pipe(select(ConfiguratorSelectors.getConfigurationFactory(owner.key)), filter((configuration) => this.configuratorUtils.isConfigurationCreated(configuration)));
    }
    /**
     * Returns a configuration if it exists or creates a new one.
     * Emits if there is a valid configuration available and triggers
     * the configuration creation or read from backend in case it is not
     * available
     *
     * @param owner - Configuration owner
     * @returns {Observable<Configurator.Configuration>}
     */
    getOrCreateConfiguration(owner, configIdTemplate) {
        switch (owner.type) {
            case CommonConfigurator.OwnerType.CART_ENTRY: {
                return this.configuratorCartService.readConfigurationForCartEntry(owner);
            }
            case CommonConfigurator.OwnerType.ORDER_ENTRY: {
                return this.configuratorCartService.readConfigurationForOrderEntry(owner);
            }
            default: {
                return this.getOrCreateConfigurationForProduct(owner, configIdTemplate);
            }
        }
    }
    /**
     * Updates a configuration, specified by the configuration owner key, group ID and a changed attribute.
     *
     * @param ownerKey - Configuration owner key
     * @param changedAttribute - Changes attribute
     */
    updateConfiguration(ownerKey, changedAttribute, updateType) {
        if (!updateType) {
            updateType = Configurator.UpdateType.ATTRIBUTE;
        }
        // in case cart updates pending: Do nothing, because an addToCart might
        // be in progress. Can happen if on slow networks addToCart was hit and
        // afterwards an attribute was changed before the OV navigation has
        // taken place
        this.activeCartService
            .getActive()
            .pipe(take(1), switchMap((cart) => this.activeCartService.isStable().pipe(take(1), tap((stable) => {
            if (isDevMode() && cart.code && !stable) {
                this.logger.warn('Cart is busy, no configuration updates possible');
            }
        }), filter((stable) => !cart.code || stable), switchMap(() => this.store.pipe(select(ConfiguratorSelectors.getConfigurationFactory(ownerKey)), take(1))))))
            .subscribe((configuration) => {
            this.store.dispatch(new ConfiguratorActions.UpdateConfiguration(this.configuratorUtils.createConfigurationExtract(changedAttribute, configuration, updateType)));
        });
    }
    /**
     * Returns a configuration with an overview. Emits valid configurations which
     * include the overview aspect
     *
     * @param configuration - Configuration
     * @returns Observable of configurations including the overview
     */
    getConfigurationWithOverview(configuration) {
        return this.store.pipe(select(ConfiguratorSelectors.getConfigurationFactory(configuration.owner.key)), filter((config) => this.configuratorUtils.isConfigurationCreated(config)), tap((configurationState) => {
            if (!this.hasConfigurationOverview(configurationState)) {
                this.store.dispatch(new ConfiguratorActions.GetConfigurationOverview(configuration));
            }
        }), filter((config) => this.hasConfigurationOverview(config)));
    }
    /**
     * Updates configuration overview according to group and attribute filters
     *
     * @param configuration - Configuration. Can contain filters in its overview facet
     */
    updateConfigurationOverview(configuration) {
        this.store.dispatch(new ConfiguratorActions.UpdateConfigurationOverview(configuration));
    }
    /**
     * Removes a configuration.
     *
     * @param owner - Configuration owner
     */
    removeConfiguration(owner) {
        this.store.dispatch(new ConfiguratorActions.RemoveConfiguration({ ownerKey: owner.key }));
    }
    /**
     * Dismisses conflict solver dialog
     *
     * @param owner - Configuration owner
     */
    dismissConflictSolverDialog(owner) {
        this.store.dispatch(new ConfiguratorActions.DissmissConflictDialoge(owner.key));
    }
    /**
     * Check if we need to launch conflict solver dialog
     *
     * @param owner - Configuration owner
     */
    checkConflictSolverDialog(owner) {
        this.store.dispatch(new ConfiguratorActions.CheckConflictDialoge(owner.key));
    }
    /**
     * Checks if the configuration contains conflicts that are displayed as conflict groups. Note
     * that in case conflicts are displayed by the conflict solver dialog, they are not taken into
     * account for this method
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} - Returns true if the configuration has conflicts, otherwise false
     */
    hasConflicts(owner) {
        return this.getConfiguration(owner).pipe(map((configuration) => 
        //We expect that the first group must always be the conflict group
        configuration.immediateConflictResolution === false &&
            configuration.groups[0]?.groupType ===
                Configurator.GroupType.CONFLICT_HEADER_GROUP));
    }
    /**
     * Forces the creation of a new default configuration for the given owner
     * @param owner - Configuration owner
     */
    forceNewConfiguration(owner) {
        this.store.dispatch(new ConfiguratorActions.RemoveConfiguration({
            ownerKey: owner.key,
        }));
        this.store.dispatch(new ConfiguratorActions.CreateConfiguration({
            owner: owner,
            configIdTemplate: undefined,
            forceReset: true,
        }));
    }
    getOrCreateConfigurationForProduct(owner, configIdTemplate) {
        return this.store.pipe(select(ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(owner.key)), tap((configurationState) => {
            if ((configurationState.value === undefined ||
                !this.configuratorUtils.isConfigurationCreated(configurationState.value)) &&
                configurationState.loading !== true &&
                configurationState.error !== true) {
                this.store.dispatch(new ConfiguratorActions.CreateConfiguration({
                    owner,
                    configIdTemplate,
                }));
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.configuratorUtils.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtils.getConfigurationFromState(configurationState)));
    }
    hasConfigurationOverview(configuration) {
        return configuration.overview !== undefined;
    }
    /**
     * Removes product bound configurations that is linked to state
     */
    removeProductBoundConfigurations() {
        this.store.dispatch(new ConfiguratorActions.RemoveProductBoundConfigurations());
    }
}
ConfiguratorCommonsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCommonsService, deps: [{ token: i1.Store }, { token: i2.CommonConfiguratorUtilsService }, { token: i3.ConfiguratorCartService }, { token: i4.ActiveCartFacade }, { token: i5.ConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCommonsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCommonsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCommonsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.CommonConfiguratorUtilsService }, { type: i3.ConfiguratorCartService }, { type: i4.ActiveCartFacade }, { type: i5.ConfiguratorUtilsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNvbW1vbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWNvbW1vbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBUyxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFDTCxrQkFBa0IsR0FFbkIsTUFBTSx3Q0FBd0MsQ0FBQztBQUVoRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7OztBQUtqRSxNQUFNLE9BQU8sMEJBQTBCO0lBR3JDLFlBQ1ksS0FBbUMsRUFDbkMsd0JBQXdELEVBQ3hELHVCQUFnRCxFQUNoRCxpQkFBbUMsRUFDbkMsaUJBQTJDO1FBSjNDLFVBQUssR0FBTCxLQUFLLENBQThCO1FBQ25DLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBZ0M7UUFDeEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBMEI7UUFQN0MsV0FBTSxHQUFH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SUFBSSxDQUFDLGlCQUFpQixDQUFDLHlCQUF5QixDQUFDLGtCQUFrQixDQUFDLENBQ3JFLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFUyx3QkFBd0IsQ0FDaEMsYUFBeUM7UUFFekMsT0FBTyxhQUFhLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQ0FBZ0M7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ2pCLElBQUksbUJBQW1CLENBQUMsZ0NBQWdDLEVBQUUsQ0FDM0QsQ0FBQztJQUNKLENBQUM7O3VIQXZUVSwwQkFBMEI7MkhBQTFCLDBCQUEwQixjQURiLE1BQU07MkZBQ25CLDBCQUEwQjtrQkFEdEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUsIHNlbGVjdCB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29tbW9uQ29uZmlndXJhdG9yLFxuICBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUvYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBTdGF0ZVdpdGhDb25maWd1cmF0b3IgfSBmcm9tICcuLi9zdGF0ZS9jb25maWd1cmF0b3Itc3RhdGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yU2VsZWN0b3JzIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2luZGV4JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0b3ItY2FydC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclV0aWxzU2VydmljZSB9IGZyb20gJy4vdXRpbHMvY29uZmlndXJhdG9yLXV0aWxzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aENvbmZpZ3VyYXRvcj4sXG4gICAgcHJvdGVjdGVkIGNvbW1vbkNvbmZpZ1V0aWxzU2VydmljZTogQ29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JDYXJ0U2VydmljZTogQ29uZmlndXJhdG9yQ2FydFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRTZXJ2aWNlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JVdGlsczogQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGVyZSBhcmUgYW55IHBlbmRpbmcgY29uZmlndXJhdGlvbiBjaGFuZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGJvb2xlYW4+fSBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIGFueSBwZW5kaW5nIGNoYW5nZXMsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgaGFzUGVuZGluZ0NoYW5nZXMob3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcik6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoQ29uZmlndXJhdG9yU2VsZWN0b3JzLmhhc1BlbmRpbmdDaGFuZ2VzKG93bmVyLmtleSkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjb25maWd1cmF0aW9uIGlzIGxvYWRpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBvd25lciAtIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICpcbiAgICogQHJldHVybnMge09ic2VydmFibGU8Ym9vbGVhbj59IFJldHVybnMgdHJ1ZSBpZiB0aGUgY29uZmlndXJhdGlvbiBpcyBsb2FkaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIGlzQ29uZmlndXJhdGlvbkxvYWRpbmcob3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcik6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoXG4gICAgICAgIENvbmZpZ3VyYXRvclNlbGVjdG9ycy5nZXRDb25maWd1cmF0aW9uUHJvY2Vzc0xvYWRlclN0YXRlRmFjdG9yeShcbiAgICAgICAgICBvd25lci5rZXlcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIG1hcCgoY29uZmlndXJhdGlvblN0YXRlKSA9PiBjb25maWd1cmF0aW9uU3RhdGUubG9hZGluZyA/PyBmYWxzZSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjb25maWd1cmF0aW9uIGZvciBhbiBvd25lci4gRW1pdHMgb25seSBpZiB0aGVyZSBhcmUgdmFsaWQgY29uZmlndXJhdGlvbnNcbiAgICogYXZhaWxhYmxlIGZvciB0aGUgcmVxdWVzdGVkIG93bmVyLCBkb2VzIG5vdCB0cmlnZ2VyIHRoZSByZS1yZWFkIG9yXG4gICAqIGNyZWF0aW9uIG9mIHRoZSBjb25maWd1cmF0aW9uIGluIGNhc2UgaXQncyBub3QgdGhlcmVcbiAgICpcbiAgICogQHBhcmFtIG93bmVyIC0gQ29uZmlndXJhdGlvbiBvd25lclxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj59XG4gICAqL1xuICBnZXRDb25maWd1cmF0aW9uKFxuICAgIG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXJcbiAgKTogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoQ29uZmlndXJhdG9yU2VsZWN0b3JzLmdldENvbmZpZ3VyYXRpb25GYWN0b3J5KG93bmVyLmtleSkpLFxuICAgICAgZmlsdGVyKChjb25maWd1cmF0aW9uKSA9PlxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvclV0aWxzLmlzQ29uZmlndXJhdGlvbkNyZWF0ZWQoY29uZmlndXJhdGlvbilcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjb25maWd1cmF0aW9uIGlmIGl0IGV4aXN0cyBvciBjcmVhdGVzIGEgbmV3IG9uZS5cbiAgICogRW1pdHMgaWYgdGhlcmUgaXMgYSB2YWxpZCBjb25maWd1cmF0aW9uIGF2YWlsYWJsZSBhbmQgdHJpZ2dlcnNcbiAgICogdGhlIGNvbmZpZ3VyYXRpb24gY3JlYXRpb24gb3IgcmVhZCBmcm9tIGJhY2tlbmQgaW4gY2FzZSBpdCBpcyBub3RcbiAgICogYXZhaWxhYmxlXG4gICAqXG4gICAqIEBwYXJhbSBvd25lciAtIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICogQHJldHVybnMge09ic2VydmFibGU8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+fVxuICAgKi9cbiAgZ2V0T3JDcmVhdGVDb25maWd1cmF0aW9uKFxuICAgIG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIsXG4gICAgY29uZmlnSWRUZW1wbGF0ZT86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPiB7XG4gICAgc3dpdGNoIChvd25lci50eXBlKSB7XG4gICAgICBjYXNlIENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclR5cGUuQ0FSVF9FTlRSWToge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JDYXJ0U2VydmljZS5yZWFkQ29uZmlndXJhdGlvbkZvckNhcnRFbnRyeShcbiAgICAgICAgICBvd25lclxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlLk9SREVSX0VOVFJZOiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlLnJlYWRDb25maWd1cmF0aW9uRm9yT3JkZXJFbnRyeShcbiAgICAgICAgICBvd25lclxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPckNyZWF0ZUNvbmZpZ3VyYXRpb25Gb3JQcm9kdWN0KG93bmVyLCBjb25maWdJZFRlbXBsYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhIGNvbmZpZ3VyYXRpb24sIHNwZWNpZmllZCBieSB0aGUgY29uZmlndXJhdGlvbiBvd25lciBrZXksIGdyb3VwIElEIGFuZCBhIGNoYW5nZWQgYXR0cmlidXRlLlxuICAgKlxuICAgKiBAcGFyYW0gb3duZXJLZXkgLSBDb25maWd1cmF0aW9uIG93bmVyIGtleVxuICAgKiBAcGFyYW0gY2hhbmdlZEF0dHJpYnV0ZSAtIENoYW5nZXMgYXR0cmlidXRlXG4gICAqL1xuICB1cGRhdGVDb25maWd1cmF0aW9uKFxuICAgIG93bmVyS2V5OiBzdHJpbmcsXG4gICAgY2hhbmdlZEF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSxcbiAgICB1cGRhdGVUeXBlPzogQ29uZmlndXJhdG9yLlVwZGF0ZVR5cGVcbiAgKTogdm9pZCB7XG4gICAgaWYgKCF1cGRhdGVUeXBlKSB7XG4gICAgICB1cGRhdGVUeXBlID0gQ29uZmlndXJhdG9yLlVwZGF0ZVR5cGUuQVRUUklCVVRFO1xuICAgIH1cbiAgICAvLyBpbiBjYXNlIGNhcnQgdXBkYXRlcyBwZW5kaW5nOiBEbyBub3RoaW5nLCBiZWNhdXNlIGFuIGFkZFRvQ2FydCBtaWdodFxuICAgIC8vIGJlIGluIHByb2dyZXNzLiBDYW4gaGFwcGVuIGlmIG9uIHNsb3cgbmV0d29ya3MgYWRkVG9DYXJ0IHdhcyBoaXQgYW5kXG4gICAgLy8gYWZ0ZXJ3YXJkcyBhbiBhdHRyaWJ1dGUgd2FzIGNoYW5nZWQgYmVmb3JlIHRoZSBPViBuYXZpZ2F0aW9uIGhhc1xuICAgIC8vIHRha2VuIHBsYWNlXG4gICAgdGhpcy5hY3RpdmVDYXJ0U2VydmljZVxuICAgICAgLmdldEFjdGl2ZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgc3dpdGNoTWFwKChjYXJ0KSA9PlxuICAgICAgICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2UuaXNTdGFibGUoKS5waXBlKFxuICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgIHRhcCgoc3RhYmxlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpc0Rldk1vZGUoKSAmJiBjYXJ0LmNvZGUgJiYgIXN0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICAgICAgICAgICAnQ2FydCBpcyBidXN5LCBubyBjb25maWd1cmF0aW9uIHVwZGF0ZXMgcG9zc2libGUnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBmaWx0ZXIoKHN0YWJsZSkgPT4gIWNhcnQuY29kZSB8fCBzdGFibGUpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUucGlwZShcbiAgICAgICAgICAgICAgICBzZWxlY3QoQ29uZmlndXJhdG9yU2VsZWN0b3JzLmdldENvbmZpZ3VyYXRpb25GYWN0b3J5KG93bmVyS2V5KSksXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChjb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuVXBkYXRlQ29uZmlndXJhdGlvbihcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdG9yVXRpbHMuY3JlYXRlQ29uZmlndXJhdGlvbkV4dHJhY3QoXG4gICAgICAgICAgICAgIGNoYW5nZWRBdHRyaWJ1dGUsXG4gICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICAgIHVwZGF0ZVR5cGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY29uZmlndXJhdGlvbiB3aXRoIGFuIG92ZXJ2aWV3LiBFbWl0cyB2YWxpZCBjb25maWd1cmF0aW9ucyB3aGljaFxuICAgKiBpbmNsdWRlIHRoZSBvdmVydmlldyBhc3BlY3RcbiAgICpcbiAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb24gLSBDb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgY29uZmlndXJhdGlvbnMgaW5jbHVkaW5nIHRoZSBvdmVydmlld1xuICAgKi9cbiAgZ2V0Q29uZmlndXJhdGlvbldpdGhPdmVydmlldyhcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgQ29uZmlndXJhdG9yU2VsZWN0b3JzLmdldENvbmZpZ3VyYXRpb25GYWN0b3J5KGNvbmZpZ3VyYXRpb24ub3duZXIua2V5KVxuICAgICAgKSxcbiAgICAgIGZpbHRlcigoY29uZmlnKSA9PiB0aGlzLmNvbmZpZ3VyYXRvclV0aWxzLmlzQ29uZmlndXJhdGlvbkNyZWF0ZWQoY29uZmlnKSksXG4gICAgICB0YXAoKGNvbmZpZ3VyYXRpb25TdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaGFzQ29uZmlndXJhdGlvbk92ZXJ2aWV3KGNvbmZpZ3VyYXRpb25TdGF0ZSkpIHtcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuR2V0Q29uZmlndXJhdGlvbk92ZXJ2aWV3KGNvbmZpZ3VyYXRpb24pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBmaWx0ZXIoKGNvbmZpZykgPT4gdGhpcy5oYXNDb25maWd1cmF0aW9uT3ZlcnZpZXcoY29uZmlnKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgY29uZmlndXJhdGlvbiBvdmVydmlldyBhY2NvcmRpbmcgdG8gZ3JvdXAgYW5kIGF0dHJpYnV0ZSBmaWx0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSBjb25maWd1cmF0aW9uIC0gQ29uZmlndXJhdGlvbi4gQ2FuIGNvbnRhaW4gZmlsdGVycyBpbiBpdHMgb3ZlcnZpZXcgZmFjZXRcbiAgICovXG4gIHVwZGF0ZUNvbmZpZ3VyYXRpb25PdmVydmlldyhjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbik6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgQ29uZmlndXJhdG9yQWN0aW9ucy5VcGRhdGVDb25maWd1cmF0aW9uT3ZlcnZpZXcoY29uZmlndXJhdGlvbilcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjb25maWd1cmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqL1xuICByZW1vdmVDb25maWd1cmF0aW9uKG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuUmVtb3ZlQ29uZmlndXJhdGlvbih7IG93bmVyS2V5OiBvd25lci5rZXkgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc21pc3NlcyBjb25mbGljdCBzb2x2ZXIgZGlhbG9nXG4gICAqXG4gICAqIEBwYXJhbSBvd25lciAtIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICovXG4gIGRpc21pc3NDb25mbGljdFNvbHZlckRpYWxvZyhvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBDb25maWd1cmF0b3JBY3Rpb25zLkRpc3NtaXNzQ29uZmxpY3REaWFsb2dlKG93bmVyLmtleSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHdlIG5lZWQgdG8gbGF1bmNoIGNvbmZsaWN0IHNvbHZlciBkaWFsb2dcbiAgICpcbiAgICogQHBhcmFtIG93bmVyIC0gQ29uZmlndXJhdGlvbiBvd25lclxuICAgKi9cbiAgY2hlY2tDb25mbGljdFNvbHZlckRpYWxvZyhvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBDb25maWd1cmF0b3JBY3Rpb25zLkNoZWNrQ29uZmxpY3REaWFsb2dlKG93bmVyLmtleSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgY29uZmlndXJhdGlvbiBjb250YWlucyBjb25mbGljdHMgdGhhdCBhcmUgZGlzcGxheWVkIGFzIGNvbmZsaWN0IGdyb3Vwcy4gTm90ZVxuICAgKiB0aGF0IGluIGNhc2UgY29uZmxpY3RzIGFyZSBkaXNwbGF5ZWQgYnkgdGhlIGNvbmZsaWN0IHNvbHZlciBkaWFsb2csIHRoZXkgYXJlIG5vdCB0YWtlbiBpbnRvXG4gICAqIGFjY291bnQgZm9yIHRoaXMgbWV0aG9kXG4gICAqXG4gICAqIEBwYXJhbSBvd25lciAtIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICpcbiAgICogQHJldHVybnMge09ic2VydmFibGU8Ym9vbGVhbj59IC0gUmV0dXJucyB0cnVlIGlmIHRoZSBjb25maWd1cmF0aW9uIGhhcyBjb25mbGljdHMsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgaGFzQ29uZmxpY3RzKG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb25maWd1cmF0aW9uKG93bmVyKS5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAoY29uZmlndXJhdGlvbikgPT5cbiAgICAgICAgICAvL1dlIGV4cGVjdCB0aGF0IHRoZSBmaXJzdCBncm91cCBtdXN0IGFsd2F5cyBiZSB0aGUgY29uZmxpY3QgZ3JvdXBcbiAgICAgICAgICBjb25maWd1cmF0aW9uLmltbWVkaWF0ZUNvbmZsaWN0UmVzb2x1dGlvbiA9PT0gZmFsc2UgJiZcbiAgICAgICAgICBjb25maWd1cmF0aW9uLmdyb3Vwc1swXT8uZ3JvdXBUeXBlID09PVxuICAgICAgICAgICAgQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9IRUFERVJfR1JPVVBcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlcyB0aGUgY3JlYXRpb24gb2YgYSBuZXcgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZvciB0aGUgZ2l2ZW4gb3duZXJcbiAgICogQHBhcmFtIG93bmVyIC0gQ29uZmlndXJhdGlvbiBvd25lclxuICAgKi9cbiAgZm9yY2VOZXdDb25maWd1cmF0aW9uKG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuUmVtb3ZlQ29uZmlndXJhdGlvbih7XG4gICAgICAgIG93bmVyS2V5OiBvd25lci5rZXksXG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBDb25maWd1cmF0b3JBY3Rpb25zLkNyZWF0ZUNvbmZpZ3VyYXRpb24oe1xuICAgICAgICBvd25lcjogb3duZXIsXG4gICAgICAgIGNvbmZpZ0lkVGVtcGxhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgZm9yY2VSZXNldDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRPckNyZWF0ZUNvbmZpZ3VyYXRpb25Gb3JQcm9kdWN0KFxuICAgIG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIsXG4gICAgY29uZmlnSWRUZW1wbGF0ZT86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgQ29uZmlndXJhdG9yU2VsZWN0b3JzLmdldENvbmZpZ3VyYXRpb25Qcm9jZXNzTG9hZGVyU3RhdGVGYWN0b3J5KFxuICAgICAgICAgIG93bmVyLmtleVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgdGFwKChjb25maWd1cmF0aW9uU3RhdGUpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChjb25maWd1cmF0aW9uU3RhdGUudmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgIXRoaXMuY29uZmlndXJhdG9yVXRpbHMuaXNDb25maWd1cmF0aW9uQ3JlYXRlZChcbiAgICAgICAgICAgICAgY29uZmlndXJhdGlvblN0YXRlLnZhbHVlXG4gICAgICAgICAgICApKSAmJlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb25TdGF0ZS5sb2FkaW5nICE9PSB0cnVlICYmXG4gICAgICAgICAgY29uZmlndXJhdGlvblN0YXRlLmVycm9yICE9PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICBuZXcgQ29uZmlndXJhdG9yQWN0aW9ucy5DcmVhdGVDb25maWd1cmF0aW9uKHtcbiAgICAgICAgICAgICAgb3duZXIsXG4gICAgICAgICAgICAgIGNvbmZpZ0lkVGVtcGxhdGUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKFxuICAgICAgICAoY29uZmlndXJhdGlvblN0YXRlKSA9PlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb25TdGF0ZS52YWx1ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JVdGlscy5pc0NvbmZpZ3VyYXRpb25DcmVhdGVkKFxuICAgICAgICAgICAgY29uZmlndXJhdGlvblN0YXRlLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIC8vc2F2ZSB0byBhc3N1bWUgY29uZmlndXJhdGlvbiBpcyBkZWZpbmVkIGFmdGVyIHByZXZpb3VzIGZpbHRlclxuICAgICAgbWFwKChjb25maWd1cmF0aW9uU3RhdGUpID0+XG4gICAgICAgIHRoaXMuY29uZmlndXJhdG9yVXRpbHMuZ2V0Q29uZmlndXJhdGlvbkZyb21TdGF0ZShjb25maWd1cmF0aW9uU3RhdGUpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYXNDb25maWd1cmF0aW9uT3ZlcnZpZXcoXG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb25cbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbmZpZ3VyYXRpb24ub3ZlcnZpZXcgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHByb2R1Y3QgYm91bmQgY29uZmlndXJhdGlvbnMgdGhhdCBpcyBsaW5rZWQgdG8gc3RhdGVcbiAgICovXG4gIHJlbW92ZVByb2R1Y3RCb3VuZENvbmZpZ3VyYXRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgQ29uZmlndXJhdG9yQWN0aW9ucy5SZW1vdmVQcm9kdWN0Qm91bmRDb25maWd1cmF0aW9ucygpXG4gICAgKTtcbiAgfVxufVxuIl19