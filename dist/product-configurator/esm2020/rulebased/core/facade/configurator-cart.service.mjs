/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { OCC_USER_ID_CURRENT, } from '@spartacus/core';
import { delayWhen, filter, map, take, tap } from 'rxjs/operators';
import { ConfiguratorActions } from '../state/actions/index';
import { ConfiguratorSelectors } from '../state/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@spartacus/product-configurator/common";
import * as i4 from "@spartacus/checkout/base/root";
import * as i5 from "@spartacus/core";
import * as i6 from "./utils/configurator-utils.service";
export class ConfiguratorCartService {
    constructor(store, activeCartService, commonConfigUtilsService, checkoutQueryFacade, userIdService, configuratorUtilsService) {
        this.store = store;
        this.activeCartService = activeCartService;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.userIdService = userIdService;
        this.configuratorUtilsService = configuratorUtilsService;
    }
    /**
     * Reads a configuration that is attached to a cart entry, dispatching the respective action.
     *
     * @param owner Configuration owner
     * @returns Observable of product configurations
     */
    readConfigurationForCartEntry(owner) {
        return this.store.pipe(select(ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(owner.key)), 
        //needed as we cannot read the cart in general and for the OV
        //in parallel, this can lead to cache issues with promotions
        delayWhen(() => this.activeCartService.isStable().pipe(filter((stable) => stable))), delayWhen(() => this.checkoutQueryFacade.getCheckoutDetailsState().pipe(map((state) => state.loading), filter((loading) => !loading))), tap((configurationState) => {
            if (this.configurationNeedsReading(configurationState)) {
                this.activeCartService
                    .requireLoadedCart()
                    .pipe(take(1))
                    .subscribe((cart) => {
                    this.userIdService
                        .getUserId()
                        .pipe(take(1))
                        .subscribe((userId) => {
                        const readFromCartEntryParameters = {
                            userId: userId,
                            cartId: this.commonConfigUtilsService.getCartId(cart),
                            cartEntryNumber: owner.id,
                            owner: owner,
                        };
                        this.store.dispatch(new ConfiguratorActions.ReadCartEntryConfiguration(readFromCartEntryParameters));
                    });
                });
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtilsService.getConfigurationFromState(configurationState)));
    }
    /**
     * Reads a configuration that is attached to an order entry, dispatching the respective action.
     *
     * @param owner Configuration owner
     * @returns Observable of product configurations
     */
    readConfigurationForOrderEntry(owner) {
        return this.store.pipe(select(ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(owner.key)), tap((configurationState) => {
            if (this.configurationNeedsReading(configurationState)) {
                const ownerIdParts = this.commonConfigUtilsService.decomposeOwnerId(owner.id);
                const readFromOrderEntryParameters = {
                    userId: OCC_USER_ID_CURRENT,
                    orderId: ownerIdParts.documentId,
                    orderEntryNumber: ownerIdParts.entryNumber,
                    owner: owner,
                };
                this.store.dispatch(new ConfiguratorActions.ReadOrderEntryConfiguration(readFromOrderEntryParameters));
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtilsService.getConfigurationFromState(configurationState)));
    }
    /**
     * Adds a configuration to the cart, specified by the product code, a configuration ID and configuration owner key.
     *
     * @param productCode - Product code
     * @param configId - Configuration ID
     * @param owner - Configuration owner
     * @param quantity - Quantity
     */
    addToCart(productCode, configId, owner, quantity) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const addToCartParameters = {
                    userId: userId,
                    cartId: this.commonConfigUtilsService.getCartId(cart),
                    productCode: productCode,
                    quantity: quantity ?? 1,
                    configId: configId,
                    owner: owner,
                };
                this.store.dispatch(new ConfiguratorActions.AddToCart(addToCartParameters));
            });
        });
    }
    /**
     * Updates a cart entry, specified by the configuration.
     * The cart entry number for the entry that owns the configuration can be told
     * from the configuration's owner ID
     *
     * @param configuration - Configuration
     */
    updateCartEntry(configuration) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const parameters = {
                    userId: userId,
                    cartId: this.commonConfigUtilsService.getCartId(cart),
                    cartEntryNumber: configuration.owner.id,
                    configuration: configuration,
                };
                this.store.dispatch(new ConfiguratorActions.UpdateCartEntry(parameters));
            });
        });
    }
    /**
     * Can be used to check if the active cart has any product configuration issues.
     *
     * @returns True if and only if there is at least one cart entry with product configuration issues
     */
    activeCartHasIssues() {
        return this.activeCartService.requireLoadedCart().pipe(map((cart) => {
            return cart ? cart.entries : [];
        }), map((entries) => entries
            ? entries.filter((entry) => this.commonConfigUtilsService.getNumberOfIssues(entry))
            : []), map((entries) => entries.length > 0));
    }
    /**
     * Retrieves cart entry by a cart entry number.
     *
     * @param {string} entryNumber - Entry number
     * @returns {Observable<OrderEntry | undefined>} - Cart entry
     */
    getEntry(entryNumber) {
        return this.activeCartService.requireLoadedCart().pipe(map((cart) => {
            return cart.entries ? cart.entries : [];
        }), map((entries) => {
            const filteredEntries = entries.filter((entry) => entry.entryNumber?.toString() === entryNumber);
            return filteredEntries
                ? filteredEntries[filteredEntries.length - 1]
                : undefined;
        }));
    }
    /**
     * Remove all configurations that are linked to cart entries
     */
    removeCartBoundConfigurations() {
        this.store.dispatch(new ConfiguratorActions.RemoveCartBoundConfigurations());
    }
    isConfigurationCreated(configuration) {
        const configId = configuration.configId;
        return configId.length !== 0;
    }
    configurationNeedsReading(configurationState) {
        const configuration = configurationState.value;
        return (configuration === undefined ||
            (!this.isConfigurationCreated(configuration) &&
                !configurationState.loading &&
                !configurationState.error));
    }
}
ConfiguratorCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartService, deps: [{ token: i1.Store }, { token: i2.ActiveCartFacade }, { token: i3.CommonConfiguratorUtilsService }, { token: i4.CheckoutQueryFacade }, { token: i5.UserIdService }, { token: i6.ConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ActiveCartFacade }, { type: i3.CommonConfiguratorUtilsService }, { type: i4.CheckoutQueryFacade }, { type: i5.UserIdService }, { type: i6.ConfiguratorUtilsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNhcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWNhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBRzVDLE9BQU8sRUFDTCxtQkFBbUIsR0FHcEIsTUFBTSxpQkFBaUIsQ0FBQztBQU16QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7OztBQUlqRSxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBQ1ksS0FBbUMsRUFDbkMsaUJBQW1DLEVBQ25DLHdCQUF3RCxFQUN4RCxtQkFBd0MsRUFDeEMsYUFBNEIsRUFDNUIsd0JBQWtEO1FBTGxELFVBQUssR0FBTCxLQUFLLENBQThCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFnQztRQUN4RCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7SUFDM0QsQ0FBQztJQUVKOzs7OztPQUtHO0lBQ0gsNkJBQTZCLENBQzNCLEtBQStCO1FBRS9CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENB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LE1BQU0sUUFBUSxHQUFXLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDaEQsT0FBTyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRVMseUJBQXlCLENBQ2pDLGtCQUFzRTtRQUV0RSxNQUFNLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7UUFDL0MsT0FBTyxDQUNMLGFBQWEsS0FBSyxTQUFTO1lBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDO2dCQUMxQyxDQUFDLGtCQUFrQixDQUFDLE9BQU87Z0JBQzNCLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQzdCLENBQUM7SUFDSixDQUFDOztvSEFyUVUsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FEVixNQUFNOzJGQUNuQix1QkFBdUI7a0JBRG5DLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUsIE9yZGVyRW50cnkgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IENoZWNrb3V0UXVlcnlGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBPQ0NfVVNFUl9JRF9DVVJSRU5ULFxuICBTdGF0ZVV0aWxzLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29tbW9uQ29uZmlndXJhdG9yLFxuICBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5V2hlbiwgZmlsdGVyLCBtYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUvYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBTdGF0ZVdpdGhDb25maWd1cmF0b3IgfSBmcm9tICcuLi9zdGF0ZS9jb25maWd1cmF0b3Itc3RhdGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yU2VsZWN0b3JzIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2luZGV4JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclV0aWxzU2VydmljZSB9IGZyb20gJy4vdXRpbHMvY29uZmlndXJhdG9yLXV0aWxzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZTxTdGF0ZVdpdGhDb25maWd1cmF0b3I+LFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0U2VydmljZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY29tbW9uQ29uZmlnVXRpbHNTZXJ2aWNlOiBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0UXVlcnlGYWNhZGU6IENoZWNrb3V0UXVlcnlGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvclV0aWxzU2VydmljZTogQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogUmVhZHMgYSBjb25maWd1cmF0aW9uIHRoYXQgaXMgYXR0YWNoZWQgdG8gYSBjYXJ0IGVudHJ5LCBkaXNwYXRjaGluZyB0aGUgcmVzcGVjdGl2ZSBhY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSBvd25lciBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgcHJvZHVjdCBjb25maWd1cmF0aW9uc1xuICAgKi9cbiAgcmVhZENvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnkoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclxuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgQ29uZmlndXJhdG9yU2VsZWN0b3JzLmdldENvbmZpZ3VyYXRpb25Qcm9jZXNzTG9hZGVyU3RhdGVGYWN0b3J5KFxuICAgICAgICAgIG93bmVyLmtleVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgLy9uZWVkZWQgYXMgd2UgY2Fubm90IHJlYWQgdGhlIGNhcnQgaW4gZ2VuZXJhbCBhbmQgZm9yIHRoZSBPVlxuICAgICAgLy9pbiBwYXJhbGxlbCwgdGhpcyBjYW4gbGVhZCB0byBjYWNoZSBpc3N1ZXMgd2l0aCBwcm9tb3Rpb25zXG4gICAgICBkZWxheVdoZW4oKCkgPT5cbiAgICAgICAgdGhpcy5hY3RpdmVDYXJ0U2VydmljZS5pc1N0YWJsZSgpLnBpcGUoZmlsdGVyKChzdGFibGUpID0+IHN0YWJsZSkpXG4gICAgICApLFxuICAgICAgZGVsYXlXaGVuKCgpID0+XG4gICAgICAgIHRoaXMuY2hlY2tvdXRRdWVyeUZhY2FkZS5nZXRDaGVja291dERldGFpbHNTdGF0ZSgpLnBpcGUoXG4gICAgICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUubG9hZGluZyksXG4gICAgICAgICAgZmlsdGVyKChsb2FkaW5nKSA9PiAhbG9hZGluZylcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIHRhcCgoY29uZmlndXJhdGlvblN0YXRlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25OZWVkc1JlYWRpbmcoY29uZmlndXJhdGlvblN0YXRlKSkge1xuICAgICAgICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2VcbiAgICAgICAgICAgIC5yZXF1aXJlTG9hZGVkQ2FydCgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2FydCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgICAgICAgICAgICAuZ2V0VXNlcklkKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVhZEZyb21DYXJ0RW50cnlQYXJhbWV0ZXJzOiBDb21tb25Db25maWd1cmF0b3IuUmVhZENvbmZpZ3VyYXRpb25Gcm9tQ2FydEVudHJ5UGFyYW1ldGVycyA9XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICBjYXJ0SWQ6IHRoaXMuY29tbW9uQ29uZmlnVXRpbHNTZXJ2aWNlLmdldENhcnRJZChjYXJ0KSxcbiAgICAgICAgICAgICAgICAgICAgICBjYXJ0RW50cnlOdW1iZXI6IG93bmVyLmlkLFxuICAgICAgICAgICAgICAgICAgICAgIG93bmVyOiBvd25lcixcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDb25maWd1cmF0b3JBY3Rpb25zLlJlYWRDYXJ0RW50cnlDb25maWd1cmF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRGcm9tQ2FydEVudHJ5UGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKFxuICAgICAgICAoY29uZmlndXJhdGlvblN0YXRlKSA9PlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb25TdGF0ZS52YWx1ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgdGhpcy5pc0NvbmZpZ3VyYXRpb25DcmVhdGVkKGNvbmZpZ3VyYXRpb25TdGF0ZS52YWx1ZSlcbiAgICAgICksXG4gICAgICAvL3NhdmUgdG8gYXNzdW1lIGNvbmZpZ3VyYXRpb24gaXMgZGVmaW5lZCBhZnRlciBwcmV2aW91cyBmaWx0ZXJcbiAgICAgIG1hcCgoY29uZmlndXJhdGlvblN0YXRlKSA9PlxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvclV0aWxzU2VydmljZS5nZXRDb25maWd1cmF0aW9uRnJvbVN0YXRlKFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb25TdGF0ZVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyBhIGNvbmZpZ3VyYXRpb24gdGhhdCBpcyBhdHRhY2hlZCB0byBhbiBvcmRlciBlbnRyeSwgZGlzcGF0Y2hpbmcgdGhlIHJlc3BlY3RpdmUgYWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gb3duZXIgQ29uZmlndXJhdGlvbiBvd25lclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIHByb2R1Y3QgY29uZmlndXJhdGlvbnNcbiAgICovXG4gIHJlYWRDb25maWd1cmF0aW9uRm9yT3JkZXJFbnRyeShcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBDb25maWd1cmF0b3JTZWxlY3RvcnMuZ2V0Q29uZmlndXJhdGlvblByb2Nlc3NMb2FkZXJTdGF0ZUZhY3RvcnkoXG4gICAgICAgICAgb3duZXIua2V5XG4gICAgICAgIClcbiAgICAgICksXG4gICAgICB0YXAoKGNvbmZpZ3VyYXRpb25TdGF0ZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uTmVlZHNSZWFkaW5nKGNvbmZpZ3VyYXRpb25TdGF0ZSkpIHtcbiAgICAgICAgICBjb25zdCBvd25lcklkUGFydHMgPSB0aGlzLmNvbW1vbkNvbmZpZ1V0aWxzU2VydmljZS5kZWNvbXBvc2VPd25lcklkKFxuICAgICAgICAgICAgb3duZXIuaWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHJlYWRGcm9tT3JkZXJFbnRyeVBhcmFtZXRlcnM6IENvbW1vbkNvbmZpZ3VyYXRvci5SZWFkQ29uZmlndXJhdGlvbkZyb21PcmRlckVudHJ5UGFyYW1ldGVycyA9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHVzZXJJZDogT0NDX1VTRVJfSURfQ1VSUkVOVCxcbiAgICAgICAgICAgICAgb3JkZXJJZDogb3duZXJJZFBhcnRzLmRvY3VtZW50SWQsXG4gICAgICAgICAgICAgIG9yZGVyRW50cnlOdW1iZXI6IG93bmVySWRQYXJ0cy5lbnRyeU51bWJlcixcbiAgICAgICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuUmVhZE9yZGVyRW50cnlDb25maWd1cmF0aW9uKFxuICAgICAgICAgICAgICByZWFkRnJvbU9yZGVyRW50cnlQYXJhbWV0ZXJzXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBmaWx0ZXIoXG4gICAgICAgIChjb25maWd1cmF0aW9uU3RhdGUpID0+XG4gICAgICAgICAgY29uZmlndXJhdGlvblN0YXRlLnZhbHVlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICB0aGlzLmlzQ29uZmlndXJhdGlvbkNyZWF0ZWQoY29uZmlndXJhdGlvblN0YXRlLnZhbHVlKVxuICAgICAgKSxcbiAgICAgIC8vc2F2ZSB0byBhc3N1bWUgY29uZmlndXJhdGlvbiBpcyBkZWZpbmVkIGFmdGVyIHByZXZpb3VzIGZpbHRlclxuICAgICAgbWFwKChjb25maWd1cmF0aW9uU3RhdGUpID0+XG4gICAgICAgIHRoaXMuY29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb25Gcm9tU3RhdGUoXG4gICAgICAgICAgY29uZmlndXJhdGlvblN0YXRlXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjb25maWd1cmF0aW9uIHRvIHRoZSBjYXJ0LCBzcGVjaWZpZWQgYnkgdGhlIHByb2R1Y3QgY29kZSwgYSBjb25maWd1cmF0aW9uIElEIGFuZCBjb25maWd1cmF0aW9uIG93bmVyIGtleS5cbiAgICpcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlIC0gUHJvZHVjdCBjb2RlXG4gICAqIEBwYXJhbSBjb25maWdJZCAtIENvbmZpZ3VyYXRpb24gSURcbiAgICogQHBhcmFtIG93bmVyIC0gQ29uZmlndXJhdGlvbiBvd25lclxuICAgKiBAcGFyYW0gcXVhbnRpdHkgLSBRdWFudGl0eVxuICAgKi9cbiAgYWRkVG9DYXJ0KFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmcsXG4gICAgY29uZmlnSWQ6IHN0cmluZyxcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyLFxuICAgIHF1YW50aXR5PzogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2VcbiAgICAgIC5yZXF1aXJlTG9hZGVkQ2FydCgpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoY2FydCkgPT4ge1xuICAgICAgICB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgICAgICAuZ2V0VXNlcklkKClcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWRkVG9DYXJ0UGFyYW1ldGVyczogQ29uZmlndXJhdG9yLkFkZFRvQ2FydFBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgICBjYXJ0SWQ6IHRoaXMuY29tbW9uQ29uZmlnVXRpbHNTZXJ2aWNlLmdldENhcnRJZChjYXJ0KSxcbiAgICAgICAgICAgICAgcHJvZHVjdENvZGU6IHByb2R1Y3RDb2RlLFxuICAgICAgICAgICAgICBxdWFudGl0eTogcXVhbnRpdHkgPz8gMSxcbiAgICAgICAgICAgICAgY29uZmlnSWQ6IGNvbmZpZ0lkLFxuICAgICAgICAgICAgICBvd25lcjogb3duZXIsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuQWRkVG9DYXJ0KGFkZFRvQ2FydFBhcmFtZXRlcnMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhIGNhcnQgZW50cnksIHNwZWNpZmllZCBieSB0aGUgY29uZmlndXJhdGlvbi5cbiAgICogVGhlIGNhcnQgZW50cnkgbnVtYmVyIGZvciB0aGUgZW50cnkgdGhhdCBvd25zIHRoZSBjb25maWd1cmF0aW9uIGNhbiBiZSB0b2xkXG4gICAqIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24ncyBvd25lciBJRFxuICAgKlxuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbiAtIENvbmZpZ3VyYXRpb25cbiAgICovXG4gIHVwZGF0ZUNhcnRFbnRyeShjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbik6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2VcbiAgICAgIC5yZXF1aXJlTG9hZGVkQ2FydCgpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoY2FydCkgPT4ge1xuICAgICAgICB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgICAgICAuZ2V0VXNlcklkKClcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1ldGVyczogQ29uZmlndXJhdG9yLlVwZGF0ZUNvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnlQYXJhbWV0ZXJzID1cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgICAgIGNhcnRJZDogdGhpcy5jb21tb25Db25maWdVdGlsc1NlcnZpY2UuZ2V0Q2FydElkKGNhcnQpLFxuICAgICAgICAgICAgICAgIGNhcnRFbnRyeU51bWJlcjogY29uZmlndXJhdGlvbi5vd25lci5pZCxcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uOiBjb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICBuZXcgQ29uZmlndXJhdG9yQWN0aW9ucy5VcGRhdGVDYXJ0RW50cnkocGFyYW1ldGVycylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW4gYmUgdXNlZCB0byBjaGVjayBpZiB0aGUgYWN0aXZlIGNhcnQgaGFzIGFueSBwcm9kdWN0IGNvbmZpZ3VyYXRpb24gaXNzdWVzLlxuICAgKlxuICAgKiBAcmV0dXJucyBUcnVlIGlmIGFuZCBvbmx5IGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSBjYXJ0IGVudHJ5IHdpdGggcHJvZHVjdCBjb25maWd1cmF0aW9uIGlzc3Vlc1xuICAgKi9cbiAgYWN0aXZlQ2FydEhhc0lzc3VlcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0U2VydmljZS5yZXF1aXJlTG9hZGVkQ2FydCgpLnBpcGUoXG4gICAgICBtYXAoKGNhcnQpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcnQgPyBjYXJ0LmVudHJpZXMgOiBbXTtcbiAgICAgIH0pLFxuICAgICAgbWFwKChlbnRyaWVzKSA9PlxuICAgICAgICBlbnRyaWVzXG4gICAgICAgICAgPyBlbnRyaWVzLmZpbHRlcigoZW50cnkpID0+XG4gICAgICAgICAgICAgIHRoaXMuY29tbW9uQ29uZmlnVXRpbHNTZXJ2aWNlLmdldE51bWJlck9mSXNzdWVzKGVudHJ5KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogW11cbiAgICAgICksXG4gICAgICBtYXAoKGVudHJpZXMpID0+IGVudHJpZXMubGVuZ3RoID4gMClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBjYXJ0IGVudHJ5IGJ5IGEgY2FydCBlbnRyeSBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbnRyeU51bWJlciAtIEVudHJ5IG51bWJlclxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxPcmRlckVudHJ5IHwgdW5kZWZpbmVkPn0gLSBDYXJ0IGVudHJ5XG4gICAqL1xuICBnZXRFbnRyeShlbnRyeU51bWJlcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2UucmVxdWlyZUxvYWRlZENhcnQoKS5waXBlKFxuICAgICAgbWFwKChjYXJ0KSA9PiB7XG4gICAgICAgIHJldHVybiBjYXJ0LmVudHJpZXMgPyBjYXJ0LmVudHJpZXMgOiBbXTtcbiAgICAgIH0pLFxuICAgICAgbWFwKChlbnRyaWVzKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkRW50cmllcyA9IGVudHJpZXMuZmlsdGVyKFxuICAgICAgICAgIChlbnRyeSkgPT4gZW50cnkuZW50cnlOdW1iZXI/LnRvU3RyaW5nKCkgPT09IGVudHJ5TnVtYmVyXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEVudHJpZXNcbiAgICAgICAgICA/IGZpbHRlcmVkRW50cmllc1tmaWx0ZXJlZEVudHJpZXMubGVuZ3RoIC0gMV1cbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIGNvbmZpZ3VyYXRpb25zIHRoYXQgYXJlIGxpbmtlZCB0byBjYXJ0IGVudHJpZXNcbiAgICovXG4gIHJlbW92ZUNhcnRCb3VuZENvbmZpZ3VyYXRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgQ29uZmlndXJhdG9yQWN0aW9ucy5SZW1vdmVDYXJ0Qm91bmRDb25maWd1cmF0aW9ucygpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NvbmZpZ3VyYXRpb25DcmVhdGVkKFxuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uXG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNvbmZpZ0lkOiBTdHJpbmcgPSBjb25maWd1cmF0aW9uLmNvbmZpZ0lkO1xuICAgIHJldHVybiBjb25maWdJZC5sZW5ndGggIT09IDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29uZmlndXJhdGlvbk5lZWRzUmVhZGluZyhcbiAgICBjb25maWd1cmF0aW9uU3RhdGU6IFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+XG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uU3RhdGUudmFsdWU7XG4gICAgcmV0dXJuIChcbiAgICAgIGNvbmZpZ3VyYXRpb24gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgKCF0aGlzLmlzQ29uZmlndXJhdGlvbkNyZWF0ZWQoY29uZmlndXJhdGlvbikgJiZcbiAgICAgICAgIWNvbmZpZ3VyYXRpb25TdGF0ZS5sb2FkaW5nICYmXG4gICAgICAgICFjb25maWd1cmF0aW9uU3RhdGUuZXJyb3IpXG4gICAgKTtcbiAgfVxufVxuIl19