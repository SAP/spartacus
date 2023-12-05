/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { ConfiguratorModelUtils, } from '@spartacus/product-configurator/common';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { ConfiguratorTextfieldActions } from '../state/actions/index';
import { ConfiguratorTextFieldSelectors } from '../state/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@spartacus/product-configurator/common";
import * as i4 from "@spartacus/core";
export class ConfiguratorTextfieldService {
    constructor(store, activeCartService, configuratorUtils, userIdService) {
        this.store = store;
        this.activeCartService = activeCartService;
        this.configuratorUtils = configuratorUtils;
        this.userIdService = userIdService;
        this.ensureConfigurationDefined = (configuration) => configuration ?? {
            configurationInfos: [],
            owner: ConfiguratorModelUtils.createInitialOwner(),
        };
    }
    /**
     * Creates a default textfield configuration for a product specified by the configuration owner.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    createConfiguration(owner) {
        return this.store.pipe(select(ConfiguratorTextFieldSelectors.getConfigurationsState), tap((configurationState) => {
            const configuration = configurationState.loaderState.value;
            const isAvailableForProduct = configuration !== undefined &&
                !ConfiguratorModelUtils.isInitialOwner(configuration.owner);
            const isLoading = configurationState.loaderState.loading;
            if (!isAvailableForProduct && !isLoading) {
                this.store.dispatch(new ConfiguratorTextfieldActions.CreateConfiguration({
                    productCode: owner.id,
                    owner: owner,
                }));
            }
        }), map((configurationState) => configurationState.loaderState.value), filter((configuration) => !this.isConfigurationInitial(configuration)), 
        //save to assume configuration is defined, see previous filter
        map(this.ensureConfigurationDefined));
    }
    /**
     * Updates a textfield configuration, specified by the changed attribute.
     *
     * @param changedAttribute - Changed attribute
     */
    updateConfiguration(changedAttribute) {
        this.store
            .pipe(select(ConfiguratorTextFieldSelectors.getConfigurationContent), take(1))
            .subscribe((oldConfiguration) => {
            if (oldConfiguration) {
                this.store.dispatch(new ConfiguratorTextfieldActions.UpdateConfiguration(this.createNewConfigurationWithChange(changedAttribute, oldConfiguration)));
            }
        });
    }
    /**
     * Adds the textfield configuration to the cart
     *
     * @param productCode - Product code of the configuration root product. Cart entry carries refers to this product
     * @param configuration Textfield configuration
     */
    addToCart(productCode, configuration) {
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
                    cartId: this.configuratorUtils.getCartId(cart),
                    productCode: productCode,
                    configuration: configuration,
                    quantity: 1,
                };
                this.store.dispatch(new ConfiguratorTextfieldActions.AddToCart(addToCartParameters));
            });
        });
    }
    /**
     * Updates a cart entry, specified by its cart entry number.
     *
     * @param cartEntryNumber - Cart entry number
     * @param configuration Textfield configuration (list of alphanumeric attributes)
     */
    updateCartEntry(cartEntryNumber, configuration) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const updateCartParameters = {
                    userId: userId,
                    cartId: this.configuratorUtils.getCartId(cart),
                    cartEntryNumber: cartEntryNumber,
                    configuration: configuration,
                };
                this.store.dispatch(new ConfiguratorTextfieldActions.UpdateCartEntryConfiguration(updateCartParameters));
            });
        });
    }
    /**
     * Returns a textfield configuration for a cart entry.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    readConfigurationForCartEntry(owner) {
        return this.activeCartService.requireLoadedCart().pipe(switchMap((cart) => this.userIdService
            .getUserId()
            .pipe(take(1), map((userId) => ({ cart, userId: userId })))
            .pipe(map((cont) => ({
            userId: cont.userId,
            cartId: this.configuratorUtils.getCartId(cont.cart),
            cartEntryNumber: owner.id,
            owner: owner,
        })), tap((readFromCartEntryParameters) => this.store.dispatch(new ConfiguratorTextfieldActions.ReadCartEntryConfiguration(readFromCartEntryParameters))), switchMap(() => this.store.pipe(select(ConfiguratorTextFieldSelectors.getConfigurationContent))), filter((configuration) => !this.isConfigurationInitial(configuration)), 
        //save to assume that the configuration exists, see previous filter
        map(this.ensureConfigurationDefined))));
    }
    /**
     * Returns the textfield configuration attached to an order entry.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    readConfigurationForOrderEntry(owner) {
        const ownerIdParts = this.configuratorUtils.decomposeOwnerId(owner.id);
        const readFromOrderEntryParameters = {
            userId: OCC_USER_ID_CURRENT,
            orderId: ownerIdParts.documentId,
            orderEntryNumber: ownerIdParts.entryNumber,
            owner: owner,
        };
        this.store.dispatch(new ConfiguratorTextfieldActions.ReadOrderEntryConfiguration(readFromOrderEntryParameters));
        return this.store.pipe(select(ConfiguratorTextFieldSelectors.getConfigurationContent), filter((configuration) => !this.isConfigurationInitial(configuration)), map(this.ensureConfigurationDefined));
    }
    /**
     * Creates a textfield configuration supposed to be sent to the backend when an attribute
     * has been changed
     * @param changedAttribute Attribute changed by the end user
     * @param oldConfiguration Existing configuration to which the attribute change is applied to
     * @returns Textfield configuration (merge of existing configuration and the changed attribute)
     */
    createNewConfigurationWithChange(changedAttribute, oldConfiguration) {
        const newConfiguration = {
            configurationInfos: [],
            owner: oldConfiguration.owner,
        };
        oldConfiguration.configurationInfos.forEach((info) => {
            if (info.configurationLabel === changedAttribute.configurationLabel) {
                changedAttribute.status =
                    ConfiguratorTextfield.ConfigurationStatus.SUCCESS;
                newConfiguration.configurationInfos.push(changedAttribute);
            }
            else {
                newConfiguration.configurationInfos.push(info);
            }
        });
        return newConfiguration;
    }
    isConfigurationInitial(configuration) {
        return (configuration === undefined ||
            ConfiguratorModelUtils.isInitialOwner(configuration.owner));
    }
}
ConfiguratorTextfieldService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldService, deps: [{ token: i1.Store }, { token: i2.ActiveCartFacade }, { token: i3.CommonConfiguratorUtilsService }, { token: i4.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorTextfieldService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ActiveCartFacade }, { type: i3.CommonConfiguratorUtilsService }, { type: i4.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXRleHRmaWVsZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3RleHRmaWVsZC9jb3JlL2ZhY2FkZS9jb25maWd1cmF0b3ItdGV4dGZpZWxkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEVBQUUsbUJBQW1CLEVBQWlCLE1BQU0saUJBQWlCLENBQUM7QUFDckUsT0FBTyxFQUdMLHNCQUFzQixHQUN2QixNQUFNLHdDQUF3QyxDQUFDO0FBRWhELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDOUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQUsxRSxNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDLFlBQ1ksS0FBNkMsRUFDN0MsaUJBQW1DLEVBQ25DLGlCQUFpRCxFQUNqRCxhQUE0QjtRQUg1QixVQUFLLEdBQUwsS0FBSyxDQUF3QztRQUM3QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBZ0M7UUFDakQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFHOUIsK0JBQTBCLEdBRU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUMzRCxhQUFhLElBQUk7WUFDZixrQkFBa0IsRUFBRSxFQUFFO1lB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Qzs7eUhBOVBVLDRCQUE0Qjs2SEFBNUIsNEJBQTRCLGNBRjNCLE1BQU07MkZBRVAsNEJBQTRCO2tCQUh4QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHNlbGVjdCwgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBBY3RpdmVDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBPQ0NfVVNFUl9JRF9DVVJSRU5ULCBVc2VySWRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENvbW1vbkNvbmZpZ3VyYXRvcixcbiAgQ29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLFxuICBDb25maWd1cmF0b3JNb2RlbFV0aWxzLFxufSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JUZXh0ZmllbGQgfSBmcm9tICcuLi9tb2RlbC9jb25maWd1cmF0b3ItdGV4dGZpZWxkLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclRleHRmaWVsZEFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFN0YXRlV2l0aENvbmZpZ3VyYXRpb25UZXh0ZmllbGQgfSBmcm9tICcuLi9zdGF0ZS9jb25maWd1cmF0aW9uLXRleHRmaWVsZC1zdGF0ZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JUZXh0RmllbGRTZWxlY3RvcnMgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yVGV4dGZpZWxkU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoQ29uZmlndXJhdGlvblRleHRmaWVsZD4sXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRTZXJ2aWNlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JVdGlsczogQ29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgZW5zdXJlQ29uZmlndXJhdGlvbkRlZmluZWQ6IChcbiAgICB2YWx1ZT86IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uXG4gICkgPT4gQ29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb24gPSAoY29uZmlndXJhdGlvbikgPT5cbiAgICBjb25maWd1cmF0aW9uID8/IHtcbiAgICAgIGNvbmZpZ3VyYXRpb25JbmZvczogW10sXG4gICAgICBvd25lcjogQ29uZmlndXJhdG9yTW9kZWxVdGlscy5jcmVhdGVJbml0aWFsT3duZXIoKSxcbiAgICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVmYXVsdCB0ZXh0ZmllbGQgY29uZmlndXJhdGlvbiBmb3IgYSBwcm9kdWN0IHNwZWNpZmllZCBieSB0aGUgY29uZmlndXJhdGlvbiBvd25lci5cbiAgICpcbiAgICogQHBhcmFtIG93bmVyIC0gQ29uZmlndXJhdGlvbiBvd25lclxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbj59XG4gICAqL1xuICBjcmVhdGVDb25maWd1cmF0aW9uKFxuICAgIG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXJcbiAgKTogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoQ29uZmlndXJhdG9yVGV4dEZpZWxkU2VsZWN0b3JzLmdldENvbmZpZ3VyYXRpb25zU3RhdGUpLFxuICAgICAgdGFwKChjb25maWd1cmF0aW9uU3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb25TdGF0ZS5sb2FkZXJTdGF0ZS52YWx1ZTtcbiAgICAgICAgY29uc3QgaXNBdmFpbGFibGVGb3JQcm9kdWN0ID1cbiAgICAgICAgICBjb25maWd1cmF0aW9uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAhQ29uZmlndXJhdG9yTW9kZWxVdGlscy5pc0luaXRpYWxPd25lcihjb25maWd1cmF0aW9uLm93bmVyKTtcbiAgICAgICAgY29uc3QgaXNMb2FkaW5nID0gY29uZmlndXJhdGlvblN0YXRlLmxvYWRlclN0YXRlLmxvYWRpbmc7XG4gICAgICAgIGlmICghaXNBdmFpbGFibGVGb3JQcm9kdWN0ICYmICFpc0xvYWRpbmcpIHtcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRvclRleHRmaWVsZEFjdGlvbnMuQ3JlYXRlQ29uZmlndXJhdGlvbih7XG4gICAgICAgICAgICAgIHByb2R1Y3RDb2RlOiBvd25lci5pZCwgLy9vd25lciBJZCBpcyB0aGUgcHJvZHVjdCBjb2RlIGluIHRoaXMgY2FzZVxuICAgICAgICAgICAgICBvd25lcjogb3duZXIsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbWFwKChjb25maWd1cmF0aW9uU3RhdGUpID0+IGNvbmZpZ3VyYXRpb25TdGF0ZS5sb2FkZXJTdGF0ZS52YWx1ZSksXG4gICAgICBmaWx0ZXIoKGNvbmZpZ3VyYXRpb24pID0+ICF0aGlzLmlzQ29uZmlndXJhdGlvbkluaXRpYWwoY29uZmlndXJhdGlvbikpLFxuICAgICAgLy9zYXZlIHRvIGFzc3VtZSBjb25maWd1cmF0aW9uIGlzIGRlZmluZWQsIHNlZSBwcmV2aW91cyBmaWx0ZXJcbiAgICAgIG1hcCh0aGlzLmVuc3VyZUNvbmZpZ3VyYXRpb25EZWZpbmVkKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhIHRleHRmaWVsZCBjb25maWd1cmF0aW9uLCBzcGVjaWZpZWQgYnkgdGhlIGNoYW5nZWQgYXR0cmlidXRlLlxuICAgKlxuICAgKiBAcGFyYW0gY2hhbmdlZEF0dHJpYnV0ZSAtIENoYW5nZWQgYXR0cmlidXRlXG4gICAqL1xuICB1cGRhdGVDb25maWd1cmF0aW9uKFxuICAgIGNoYW5nZWRBdHRyaWJ1dGU6IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uSW5mb1xuICApOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlXG4gICAgICAucGlwZShcbiAgICAgICAgc2VsZWN0KENvbmZpZ3VyYXRvclRleHRGaWVsZFNlbGVjdG9ycy5nZXRDb25maWd1cmF0aW9uQ29udGVudCksXG4gICAgICAgIHRha2UoMSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKG9sZENvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgICAgaWYgKG9sZENvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRvclRleHRmaWVsZEFjdGlvbnMuVXBkYXRlQ29uZmlndXJhdGlvbihcbiAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOZXdDb25maWd1cmF0aW9uV2l0aENoYW5nZShcbiAgICAgICAgICAgICAgICBjaGFuZ2VkQXR0cmlidXRlLFxuICAgICAgICAgICAgICAgIG9sZENvbmZpZ3VyYXRpb25cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIHRleHRmaWVsZCBjb25maWd1cmF0aW9uIHRvIHRoZSBjYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBwcm9kdWN0Q29kZSAtIFByb2R1Y3QgY29kZSBvZiB0aGUgY29uZmlndXJhdGlvbiByb290IHByb2R1Y3QuIENhcnQgZW50cnkgY2FycmllcyByZWZlcnMgdG8gdGhpcyBwcm9kdWN0XG4gICAqIEBwYXJhbSBjb25maWd1cmF0aW9uIFRleHRmaWVsZCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBhZGRUb0NhcnQoXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZyxcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvblxuICApOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlXG4gICAgICAucmVxdWlyZUxvYWRlZENhcnQoKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGNhcnQpID0+IHtcbiAgICAgICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAgICAgLmdldFVzZXJJZCgpXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFkZFRvQ2FydFBhcmFtZXRlcnM6IENvbmZpZ3VyYXRvclRleHRmaWVsZC5BZGRUb0NhcnRQYXJhbWV0ZXJzID1cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgICAgIGNhcnRJZDogdGhpcy5jb25maWd1cmF0b3JVdGlscy5nZXRDYXJ0SWQoY2FydCksXG4gICAgICAgICAgICAgICAgcHJvZHVjdENvZGU6IHByb2R1Y3RDb2RlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb246IGNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICAgICAgcXVhbnRpdHk6IDEsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICBuZXcgQ29uZmlndXJhdG9yVGV4dGZpZWxkQWN0aW9ucy5BZGRUb0NhcnQoYWRkVG9DYXJ0UGFyYW1ldGVycylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGEgY2FydCBlbnRyeSwgc3BlY2lmaWVkIGJ5IGl0cyBjYXJ0IGVudHJ5IG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIGNhcnRFbnRyeU51bWJlciAtIENhcnQgZW50cnkgbnVtYmVyXG4gICAqIEBwYXJhbSBjb25maWd1cmF0aW9uIFRleHRmaWVsZCBjb25maWd1cmF0aW9uIChsaXN0IG9mIGFscGhhbnVtZXJpYyBhdHRyaWJ1dGVzKVxuICAgKi9cbiAgdXBkYXRlQ2FydEVudHJ5KFxuICAgIGNhcnRFbnRyeU51bWJlcjogc3RyaW5nLFxuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uXG4gICk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2VcbiAgICAgIC5yZXF1aXJlTG9hZGVkQ2FydCgpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoY2FydCkgPT4ge1xuICAgICAgICB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgICAgICAuZ2V0VXNlcklkKClcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlQ2FydFBhcmFtZXRlcnM6IENvbmZpZ3VyYXRvclRleHRmaWVsZC5VcGRhdGVDYXJ0RW50cnlQYXJhbWV0ZXJzID1cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgICAgIGNhcnRJZDogdGhpcy5jb25maWd1cmF0b3JVdGlscy5nZXRDYXJ0SWQoY2FydCksXG4gICAgICAgICAgICAgICAgY2FydEVudHJ5TnVtYmVyOiBjYXJ0RW50cnlOdW1iZXIsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbjogY29uZmlndXJhdGlvbixcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgIG5ldyBDb25maWd1cmF0b3JUZXh0ZmllbGRBY3Rpb25zLlVwZGF0ZUNhcnRFbnRyeUNvbmZpZ3VyYXRpb24oXG4gICAgICAgICAgICAgICAgdXBkYXRlQ2FydFBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB0ZXh0ZmllbGQgY29uZmlndXJhdGlvbiBmb3IgYSBjYXJ0IGVudHJ5LlxuICAgKlxuICAgKiBAcGFyYW0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uPn1cbiAgICovXG4gIHJlYWRDb25maWd1cmF0aW9uRm9yQ2FydEVudHJ5KFxuICAgIG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXJcbiAgKTogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLnJlcXVpcmVMb2FkZWRDYXJ0KCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY2FydCkgPT5cbiAgICAgICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAgICAgLmdldFVzZXJJZCgpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgbWFwKCh1c2VySWQpID0+ICh7IGNhcnQsIHVzZXJJZDogdXNlcklkIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCgoY29udCkgPT4gKHtcbiAgICAgICAgICAgICAgdXNlcklkOiBjb250LnVzZXJJZCxcbiAgICAgICAgICAgICAgY2FydElkOiB0aGlzLmNvbmZpZ3VyYXRvclV0aWxzLmdldENhcnRJZChjb250LmNhcnQpLFxuICAgICAgICAgICAgICBjYXJ0RW50cnlOdW1iZXI6IG93bmVyLmlkLFxuICAgICAgICAgICAgICBvd25lcjogb3duZXIsXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0YXAoKHJlYWRGcm9tQ2FydEVudHJ5UGFyYW1ldGVycykgPT5cbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICBuZXcgQ29uZmlndXJhdG9yVGV4dGZpZWxkQWN0aW9ucy5SZWFkQ2FydEVudHJ5Q29uZmlndXJhdGlvbihcbiAgICAgICAgICAgICAgICAgIHJlYWRGcm9tQ2FydEVudHJ5UGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgICAgICB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICAgICAgICAgICAgc2VsZWN0KENvbmZpZ3VyYXRvclRleHRGaWVsZFNlbGVjdG9ycy5nZXRDb25maWd1cmF0aW9uQ29udGVudClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgKGNvbmZpZ3VyYXRpb24pID0+ICF0aGlzLmlzQ29uZmlndXJhdGlvbkluaXRpYWwoY29uZmlndXJhdGlvbilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICAvL3NhdmUgdG8gYXNzdW1lIHRoYXQgdGhlIGNvbmZpZ3VyYXRpb24gZXhpc3RzLCBzZWUgcHJldmlvdXMgZmlsdGVyXG4gICAgICAgICAgICBtYXAodGhpcy5lbnN1cmVDb25maWd1cmF0aW9uRGVmaW5lZClcbiAgICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0ZXh0ZmllbGQgY29uZmlndXJhdGlvbiBhdHRhY2hlZCB0byBhbiBvcmRlciBlbnRyeS5cbiAgICpcbiAgICogQHBhcmFtIHtDb21tb25Db25maWd1cmF0b3IuT3duZXJ9IG93bmVyIC0gQ29uZmlndXJhdGlvbiBvd25lclxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbj59XG4gICAqL1xuICByZWFkQ29uZmlndXJhdGlvbkZvck9yZGVyRW50cnkoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclxuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uPiB7XG4gICAgY29uc3Qgb3duZXJJZFBhcnRzID0gdGhpcy5jb25maWd1cmF0b3JVdGlscy5kZWNvbXBvc2VPd25lcklkKG93bmVyLmlkKTtcbiAgICBjb25zdCByZWFkRnJvbU9yZGVyRW50cnlQYXJhbWV0ZXJzOiBDb21tb25Db25maWd1cmF0b3IuUmVhZENvbmZpZ3VyYXRpb25Gcm9tT3JkZXJFbnRyeVBhcmFtZXRlcnMgPVxuICAgICAge1xuICAgICAgICB1c2VySWQ6IE9DQ19VU0VSX0lEX0NVUlJFTlQsXG4gICAgICAgIG9yZGVySWQ6IG93bmVySWRQYXJ0cy5kb2N1bWVudElkLFxuICAgICAgICBvcmRlckVudHJ5TnVtYmVyOiBvd25lcklkUGFydHMuZW50cnlOdW1iZXIsXG4gICAgICAgIG93bmVyOiBvd25lcixcbiAgICAgIH07XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBDb25maWd1cmF0b3JUZXh0ZmllbGRBY3Rpb25zLlJlYWRPcmRlckVudHJ5Q29uZmlndXJhdGlvbihcbiAgICAgICAgcmVhZEZyb21PcmRlckVudHJ5UGFyYW1ldGVyc1xuICAgICAgKVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChDb25maWd1cmF0b3JUZXh0RmllbGRTZWxlY3RvcnMuZ2V0Q29uZmlndXJhdGlvbkNvbnRlbnQpLFxuICAgICAgZmlsdGVyKChjb25maWd1cmF0aW9uKSA9PiAhdGhpcy5pc0NvbmZpZ3VyYXRpb25Jbml0aWFsKGNvbmZpZ3VyYXRpb24pKSxcbiAgICAgIG1hcCh0aGlzLmVuc3VyZUNvbmZpZ3VyYXRpb25EZWZpbmVkKVxuICAgICk7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSB0ZXh0ZmllbGQgY29uZmlndXJhdGlvbiBzdXBwb3NlZCB0byBiZSBzZW50IHRvIHRoZSBiYWNrZW5kIHdoZW4gYW4gYXR0cmlidXRlXG4gICAqIGhhcyBiZWVuIGNoYW5nZWRcbiAgICogQHBhcmFtIGNoYW5nZWRBdHRyaWJ1dGUgQXR0cmlidXRlIGNoYW5nZWQgYnkgdGhlIGVuZCB1c2VyXG4gICAqIEBwYXJhbSBvbGRDb25maWd1cmF0aW9uIEV4aXN0aW5nIGNvbmZpZ3VyYXRpb24gdG8gd2hpY2ggdGhlIGF0dHJpYnV0ZSBjaGFuZ2UgaXMgYXBwbGllZCB0b1xuICAgKiBAcmV0dXJucyBUZXh0ZmllbGQgY29uZmlndXJhdGlvbiAobWVyZ2Ugb2YgZXhpc3RpbmcgY29uZmlndXJhdGlvbiBhbmQgdGhlIGNoYW5nZWQgYXR0cmlidXRlKVxuICAgKi9cbiAgY3JlYXRlTmV3Q29uZmlndXJhdGlvbldpdGhDaGFuZ2UoXG4gICAgY2hhbmdlZEF0dHJpYnV0ZTogQ29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb25JbmZvLFxuICAgIG9sZENvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uXG4gICk6IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uIHtcbiAgICBjb25zdCBuZXdDb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgIGNvbmZpZ3VyYXRpb25JbmZvczogW10sXG4gICAgICBvd25lcjogb2xkQ29uZmlndXJhdGlvbi5vd25lcixcbiAgICB9O1xuICAgIG9sZENvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbkluZm9zLmZvckVhY2goKGluZm8pID0+IHtcbiAgICAgIGlmIChpbmZvLmNvbmZpZ3VyYXRpb25MYWJlbCA9PT0gY2hhbmdlZEF0dHJpYnV0ZS5jb25maWd1cmF0aW9uTGFiZWwpIHtcbiAgICAgICAgY2hhbmdlZEF0dHJpYnV0ZS5zdGF0dXMgPVxuICAgICAgICAgIENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uU3RhdHVzLlNVQ0NFU1M7XG4gICAgICAgIG5ld0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbkluZm9zLnB1c2goY2hhbmdlZEF0dHJpYnV0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25JbmZvcy5wdXNoKGluZm8pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBuZXdDb25maWd1cmF0aW9uO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ29uZmlndXJhdGlvbkluaXRpYWwoXG4gICAgY29uZmlndXJhdGlvbj86IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBjb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQgfHxcbiAgICAgIENvbmZpZ3VyYXRvck1vZGVsVXRpbHMuaXNJbml0aWFsT3duZXIoY29uZmlndXJhdGlvbi5vd25lcilcbiAgICApO1xuICB9XG59XG4iXX0=