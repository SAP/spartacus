import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CPQ_CONFIGURATOR_NORMALIZER, CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER, CPQ_CONFIGURATOR_QUANTITY_SERIALIZER, CPQ_CONFIGURATOR_SERIALIZER, } from '../common/converters/cpq-configurator.converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
import * as i3 from "./cpq-configurator-endpoint.service";
export class CpqConfiguratorRestService {
    constructor(http, converterService, endpointService) {
        this.http = http;
        this.converterService = converterService;
        this.endpointService = endpointService;
    }
    /**
     * Creates a new runtime configuration for the given product id
     * and read this default configuration from the CPQ system.
     *
     * @param {string} productSystemId - Product system ID
     * @returns {Observable<Configurator.Configuration>} - Created configuration
     */
    createConfiguration(productSystemId) {
        return this.callConfigurationInit(productSystemId).pipe(switchMap((configCreatedResponse) => {
            return this.callConfigurationDisplay(configCreatedResponse.configurationId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
                return {
                    ...resultConfiguration,
                    configId: configCreatedResponse.configurationId,
                };
            }));
        }));
    }
    /**
     * Retrieves a configuration from the CPQ system by its configuration ID and for a certain tab.
     *
     * @param {string} configId - Configuration ID
     * @param {string} tabId - Tab ID
     * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
     */
    readConfiguration(configId, tabId) {
        return this.callConfigurationDisplay(configId, tabId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                configId: configId,
            };
        }));
    }
    /**
     * Retrieves an overview for a certain configuration by its configuration ID.
     *
     * @param {string} configId - Configuration ID
     * @returns {Observable<Configurator.Overview>} - Retrieved overview
     */
    readConfigurationOverview(configId) {
        return this.getConfigurationWithAllTabsAndAttributes(configId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                configId: configId,
            };
        }));
    }
    /**
     * This method is actually a workaround until CPQ provides and API to fetch
     * all selected attributes / attribute values grouped by all tabs.
     * It will fire a request for each tab to collect all required data.
     */
    getConfigurationWithAllTabsAndAttributes(configId) {
        return this.callConfigurationDisplay(configId).pipe(switchMap((currentTab) => {
            const tabRequests = [];
            if (currentTab.tabs && currentTab.tabs.length > 0) {
                // prepare requests for remaining tabs
                currentTab.tabs.forEach((tab) => {
                    if (tab.isSelected) {
                        // details of the currently selected tab are already fetched
                        tabRequests.push(of(currentTab));
                    }
                    else {
                        tabRequests.push(this.callConfigurationDisplay(configId, tab.id.toString()));
                    }
                });
            }
            else {
                // tabs are not defined in model, general tab is used
                tabRequests.push(of(currentTab));
            }
            // fire requests for remaining tabs and wait until all are finished
            return forkJoin(tabRequests);
        }), map(this.mergeTabResults));
    }
    mergeTabResults(tabReqResultList) {
        const config = {
            // first tab will be the current tab. It might not contain all error messages (bug in CPQ). So we just use the last tab.
            // this whole logic will be obsolete, as soon as CPQ provides and API to fetch everything.
            ...tabReqResultList[tabReqResultList.length - 1],
        };
        config.attributes = undefined;
        config.tabs = [];
        tabReqResultList.forEach((tabReqResult) => {
            let tab;
            const currentTab = tabReqResult.tabs?.find((tabEl) => tabEl.isSelected);
            if (currentTab && tabReqResult.tabs && tabReqResult.tabs.length > 0) {
                tab = {
                    ...currentTab,
                };
            }
            else {
                tab = {
                    id: 0,
                };
            }
            tab.attributes = tabReqResult.attributes;
            config.tabs?.push(tab);
        });
        return config;
    }
    /**
     * Updates an attribute of the runtime configuration for the given configuration id and attribute code
     * and read this default configuration from the CPQ system.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateAttribute(configuration) {
        const updateAttribute = this.converterService.convert(configuration, CPQ_CONFIGURATOR_SERIALIZER);
        return this.callUpdateAttribute(updateAttribute).pipe(switchMap(() => {
            return this.callConfigurationDisplay(configuration.configId, updateAttribute.tabId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
                return {
                    ...resultConfiguration,
                    configId: configuration.configId,
                };
            }));
        }));
    }
    /**
     * Updates a quantity for an attribute of the runtime configuration for the given configuration id and attribute code
     * and read this default configuration from the CPQ system.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateValueQuantity(configuration) {
        const updateValue = this.converterService.convert(configuration, CPQ_CONFIGURATOR_QUANTITY_SERIALIZER);
        return this.callUpdateValue(updateValue).pipe(switchMap(() => {
            return this.callConfigurationDisplay(configuration.configId, updateValue.tabId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
                return {
                    ...resultConfiguration,
                    configId: configuration.configId,
                };
            }));
        }));
    }
    callUpdateValue(updateValue) {
        return this.http.patch(this.endpointService.buildUrl('valueUpdate', {
            configId: updateValue.configurationId,
            attributeCode: updateValue.standardAttributeCode,
            valueCode: updateValue.attributeValueId,
        }), {
            Quantity: updateValue.quantity,
        }, this.endpointService.CPQ_MARKER_HEADER);
    }
    callConfigurationInit(productSystemId) {
        return this.http.post(this.endpointService.buildUrl('configurationInit'), {
            ProductSystemId: productSystemId,
        }, this.endpointService.CPQ_MARKER_HEADER);
    }
    callConfigurationDisplay(configId, tabId) {
        return this.http.get(this.endpointService.buildUrl('configurationDisplay', { configId: configId }, tabId ? [{ name: 'tabId', value: tabId }] : undefined), this.endpointService.CPQ_MARKER_HEADER);
    }
    callUpdateAttribute(updateAttribute) {
        return this.http.patch(this.endpointService.buildUrl('attributeUpdate', {
            configId: updateAttribute.configurationId,
            attributeCode: updateAttribute.standardAttributeCode,
        }), updateAttribute.changeAttributeValue, this.endpointService.CPQ_MARKER_HEADER);
    }
}
CpqConfiguratorRestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestService, deps: [{ token: i1.HttpClient }, { token: i2.ConverterService }, { token: i3.CpqConfiguratorEndpointService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorRestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.ConverterService }, { type: i3.CpqConfiguratorEndpointService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1yZXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NwcS9yZXN0L2NwcS1jb25maWd1cmF0b3ItcmVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFFBQVEsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLG9DQUFvQyxFQUNwQyxvQ0FBb0MsRUFDcEMsMkJBQTJCLEdBQzVCLE1BQU0sa0RBQWtELENBQUM7Ozs7O0FBSzFELE1BQU0sT0FBTywwQkFBMEI7SUFDckMsWUFDWSxJQUFnQixFQUNoQixnQkFBa0MsRUFDbEMsZUFBK0M7UUFGL0MsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFnQztJQUN4RCxDQUFDO0lBRUo7Ozs7OztPQU1HO0lBQ0gsbUJBQW1CLENBQ2pCLGVBQXVCO1FBRXZCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FDckQsU0FBUyxDQUFDLENBQUMscUJBQXFCLEVBQUUsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FDbEMscUJBQXFCLENBQUMsZUFBZSxDQUN0QyxDQUFDLElBQUksQ0FDSixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLEVBQzNELEdBQUcsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLEVBQUU7Z0JBQzFCLE9B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ZSxFQUFFLGVBQWU7U0FDakMsRUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUN2QyxDQUFDO0lBQ0osQ0FBQztJQUVTLHdCQUF3QixDQUNoQyxRQUFnQixFQUNoQixLQUFjO1FBRWQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQzNCLHNCQUFzQixFQUN0QixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFDdEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUN0RCxFQUNELElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQ3ZDLENBQUM7SUFDSixDQUFDO0lBRVMsbUJBQW1CLENBQzNCLGVBQW9DO1FBRXBDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQy9DLFFBQVEsRUFBRSxlQUFlLENBQUMsZUFBZTtZQUN6QyxhQUFhLEVBQUUsZUFBZSxDQUFDLHFCQUFxQjtTQUNyRCxDQUFDLEVBQ0YsZUFBZSxDQUFDLG9CQUFvQixFQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUN2QyxDQUFDO0lBQ0osQ0FBQzs7dUhBN1BVLDBCQUEwQjsySEFBMUIsMEJBQTBCLGNBRGIsTUFBTTsyRkFDbkIsMEJBQTBCO2tCQUR0QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXJTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDUFFfQ09ORklHVVJBVE9SX05PUk1BTElaRVIsXG4gIENQUV9DT05GSUdVUkFUT1JfT1ZFUlZJRVdfTk9STUFMSVpFUixcbiAgQ1BRX0NPTkZJR1VSQVRPUl9RVUFOVElUWV9TRVJJQUxJWkVSLFxuICBDUFFfQ09ORklHVVJBVE9SX1NFUklBTElaRVIsXG59IGZyb20gJy4uL2NvbW1vbi9jb252ZXJ0ZXJzL2NwcS1jb25maWd1cmF0b3IuY29udmVydGVycyc7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JFbmRwb2ludFNlcnZpY2UgfSBmcm9tICcuL2NwcS1jb25maWd1cmF0b3ItZW5kcG9pbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDcHEgfSBmcm9tICcuLi9jb21tb24vY3BxLm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ3BxQ29uZmlndXJhdG9yUmVzdFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyU2VydmljZTogQ29udmVydGVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZW5kcG9pbnRTZXJ2aWNlOiBDcHFDb25maWd1cmF0b3JFbmRwb2ludFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHJ1bnRpbWUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGdpdmVuIHByb2R1Y3QgaWRcbiAgICogYW5kIHJlYWQgdGhpcyBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgQ1BRIHN5c3RlbS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb2R1Y3RTeXN0ZW1JZCAtIFByb2R1Y3Qgc3lzdGVtIElEXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPn0gLSBDcmVhdGVkIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGNyZWF0ZUNvbmZpZ3VyYXRpb24oXG4gICAgcHJvZHVjdFN5c3RlbUlkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLmNhbGxDb25maWd1cmF0aW9uSW5pdChwcm9kdWN0U3lzdGVtSWQpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNvbmZpZ0NyZWF0ZWRSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsQ29uZmlndXJhdGlvbkRpc3BsYXkoXG4gICAgICAgICAgY29uZmlnQ3JlYXRlZFJlc3BvbnNlLmNvbmZpZ3VyYXRpb25JZFxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgdGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLnBpcGVhYmxlKENQUV9DT05GSUdVUkFUT1JfTk9STUFMSVpFUiksXG4gICAgICAgICAgbWFwKChyZXN1bHRDb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yZXN1bHRDb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgICBjb25maWdJZDogY29uZmlnQ3JlYXRlZFJlc3BvbnNlLmNvbmZpZ3VyYXRpb25JZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBjb25maWd1cmF0aW9uIGZyb20gdGhlIENQUSBzeXN0ZW0gYnkgaXRzIGNvbmZpZ3VyYXRpb24gSUQgYW5kIGZvciBhIGNlcnRhaW4gdGFiLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29uZmlnSWQgLSBDb25maWd1cmF0aW9uIElEXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0YWJJZCAtIFRhYiBJRFxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj59IC0gUmV0cmlldmVkIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHJlYWRDb25maWd1cmF0aW9uKFxuICAgIGNvbmZpZ0lkOiBzdHJpbmcsXG4gICAgdGFiSWQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLmNhbGxDb25maWd1cmF0aW9uRGlzcGxheShjb25maWdJZCwgdGFiSWQpLnBpcGUoXG4gICAgICB0aGlzLmNvbnZlcnRlclNlcnZpY2UucGlwZWFibGUoQ1BRX0NPTkZJR1VSQVRPUl9OT1JNQUxJWkVSKSxcbiAgICAgIG1hcCgocmVzdWx0Q29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnJlc3VsdENvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgY29uZmlnSWQ6IGNvbmZpZ0lkLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhbiBvdmVydmlldyBmb3IgYSBjZXJ0YWluIGNvbmZpZ3VyYXRpb24gYnkgaXRzIGNvbmZpZ3VyYXRpb24gSUQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb25maWdJZCAtIENvbmZpZ3VyYXRpb24gSURcbiAgICogQHJldHVybnMge09ic2VydmFibGU8Q29uZmlndXJhdG9yLk92ZXJ2aWV3Pn0gLSBSZXRyaWV2ZWQgb3ZlcnZpZXdcbiAgICovXG4gIHJlYWRDb25maWd1cmF0aW9uT3ZlcnZpZXcoXG4gICAgY29uZmlnSWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5PdmVydmlldz4ge1xuICAgIHJldHVybiB0aGlzLmdldENvbmZpZ3VyYXRpb25XaXRoQWxsVGFic0FuZEF0dHJpYnV0ZXMoY29uZmlnSWQpLnBpcGUoXG4gICAgICB0aGlzLmNvbnZlcnRlclNlcnZpY2UucGlwZWFibGUoQ1BRX0NPTkZJR1VSQVRPUl9PVkVSVklFV19OT1JNQUxJWkVSKSxcbiAgICAgIG1hcCgocmVzdWx0Q29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnJlc3VsdENvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgY29uZmlnSWQ6IGNvbmZpZ0lkLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGFjdHVhbGx5IGEgd29ya2Fyb3VuZCB1bnRpbCBDUFEgcHJvdmlkZXMgYW5kIEFQSSB0byBmZXRjaFxuICAgKiBhbGwgc2VsZWN0ZWQgYXR0cmlidXRlcyAvIGF0dHJpYnV0ZSB2YWx1ZXMgZ3JvdXBlZCBieSBhbGwgdGFicy5cbiAgICogSXQgd2lsbCBmaXJlIGEgcmVxdWVzdCBmb3IgZWFjaCB0YWIgdG8gY29sbGVjdCBhbGwgcmVxdWlyZWQgZGF0YS5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRDb25maWd1cmF0aW9uV2l0aEFsbFRhYnNBbmRBdHRyaWJ1dGVzKFxuICAgIGNvbmZpZ0lkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDcHEuQ29uZmlndXJhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLmNhbGxDb25maWd1cmF0aW9uRGlzcGxheShjb25maWdJZCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY3VycmVudFRhYikgPT4ge1xuICAgICAgICBjb25zdCB0YWJSZXF1ZXN0czogT2JzZXJ2YWJsZTxDcHEuQ29uZmlndXJhdGlvbj5bXSA9IFtdO1xuICAgICAgICBpZiAoY3VycmVudFRhYi50YWJzICYmIGN1cnJlbnRUYWIudGFicy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gcHJlcGFyZSByZXF1ZXN0cyBmb3IgcmVtYWluaW5nIHRhYnNcbiAgICAgICAgICBjdXJyZW50VGFiLnRhYnMuZm9yRWFjaCgodGFiKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFiLmlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgLy8gZGV0YWlscyBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHRhYiBhcmUgYWxyZWFkeSBmZXRjaGVkXG4gICAgICAgICAgICAgIHRhYlJlcXVlc3RzLnB1c2gob2YoY3VycmVudFRhYikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGFiUmVxdWVzdHMucHVzaChcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxDb25maWd1cmF0aW9uRGlzcGxheShjb25maWdJZCwgdGFiLmlkLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdGFicyBhcmUgbm90IGRlZmluZWQgaW4gbW9kZWwsIGdlbmVyYWwgdGFiIGlzIHVzZWRcbiAgICAgICAgICB0YWJSZXF1ZXN0cy5wdXNoKG9mKGN1cnJlbnRUYWIpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmaXJlIHJlcXVlc3RzIGZvciByZW1haW5pbmcgdGFicyBhbmQgd2FpdCB1bnRpbCBhbGwgYXJlIGZpbmlzaGVkXG4gICAgICAgIHJldHVybiBmb3JrSm9pbih0YWJSZXF1ZXN0cyk7XG4gICAgICB9KSxcbiAgICAgIG1hcCh0aGlzLm1lcmdlVGFiUmVzdWx0cylcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1lcmdlVGFiUmVzdWx0cyhcbiAgICB0YWJSZXFSZXN1bHRMaXN0OiBDcHEuQ29uZmlndXJhdGlvbltdXG4gICk6IENwcS5Db25maWd1cmF0aW9uIHtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAvLyBmaXJzdCB0YWIgd2lsbCBiZSB0aGUgY3VycmVudCB0YWIuIEl0IG1pZ2h0IG5vdCBjb250YWluIGFsbCBlcnJvciBtZXNzYWdlcyAoYnVnIGluIENQUSkuIFNvIHdlIGp1c3QgdXNlIHRoZSBsYXN0IHRhYi5cbiAgICAgIC8vIHRoaXMgd2hvbGUgbG9naWMgd2lsbCBiZSBvYnNvbGV0ZSwgYXMgc29vbiBhcyBDUFEgcHJvdmlkZXMgYW5kIEFQSSB0byBmZXRjaCBldmVyeXRoaW5nLlxuICAgICAgLi4udGFiUmVxUmVzdWx0TGlzdFt0YWJSZXFSZXN1bHRMaXN0Lmxlbmd0aCAtIDFdLFxuICAgIH07XG4gICAgY29uZmlnLmF0dHJpYnV0ZXMgPSB1bmRlZmluZWQ7XG4gICAgY29uZmlnLnRhYnMgPSBbXTtcbiAgICB0YWJSZXFSZXN1bHRMaXN0LmZvckVhY2goKHRhYlJlcVJlc3VsdCkgPT4ge1xuICAgICAgbGV0IHRhYjogQ3BxLlRhYjtcbiAgICAgIGNvbnN0IGN1cnJlbnRUYWIgPSB0YWJSZXFSZXN1bHQudGFicz8uZmluZCgodGFiRWwpID0+IHRhYkVsLmlzU2VsZWN0ZWQpO1xuICAgICAgaWYgKGN1cnJlbnRUYWIgJiYgdGFiUmVxUmVzdWx0LnRhYnMgJiYgdGFiUmVxUmVzdWx0LnRhYnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0YWIgPSB7XG4gICAgICAgICAgLi4uY3VycmVudFRhYixcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhYiA9IHtcbiAgICAgICAgICBpZDogMCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHRhYi5hdHRyaWJ1dGVzID0gdGFiUmVxUmVzdWx0LmF0dHJpYnV0ZXM7XG4gICAgICBjb25maWcudGFicz8ucHVzaCh0YWIpO1xuICAgIH0pO1xuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbiBhdHRyaWJ1dGUgb2YgdGhlIHJ1bnRpbWUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGdpdmVuIGNvbmZpZ3VyYXRpb24gaWQgYW5kIGF0dHJpYnV0ZSBjb2RlXG4gICAqIGFuZCByZWFkIHRoaXMgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gdGhlIENQUSBzeXN0ZW0uXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb24gLSBDb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPn0gLSBVcGRhdGVkIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHVwZGF0ZUF0dHJpYnV0ZShcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPiB7XG4gICAgY29uc3QgdXBkYXRlQXR0cmlidXRlOiBDcHEuVXBkYXRlQXR0cmlidXRlID0gdGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLmNvbnZlcnQoXG4gICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgQ1BRX0NPTkZJR1VSQVRPUl9TRVJJQUxJWkVSXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5jYWxsVXBkYXRlQXR0cmlidXRlKHVwZGF0ZUF0dHJpYnV0ZSkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxDb25maWd1cmF0aW9uRGlzcGxheShcbiAgICAgICAgICBjb25maWd1cmF0aW9uLmNvbmZpZ0lkLFxuICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZS50YWJJZFxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgdGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLnBpcGVhYmxlKENQUV9DT05GSUdVUkFUT1JfTk9STUFMSVpFUiksXG4gICAgICAgICAgbWFwKChyZXN1bHRDb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yZXN1bHRDb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgICBjb25maWdJZDogY29uZmlndXJhdGlvbi5jb25maWdJZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGEgcXVhbnRpdHkgZm9yIGFuIGF0dHJpYnV0ZSBvZiB0aGUgcnVudGltZSBjb25maWd1cmF0aW9uIGZvciB0aGUgZ2l2ZW4gY29uZmlndXJhdGlvbiBpZCBhbmQgYXR0cmlidXRlIGNvZGVcbiAgICogYW5kIHJlYWQgdGhpcyBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgQ1BRIHN5c3RlbS5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbn0gY29uZmlndXJhdGlvbiAtIENvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybnMge09ic2VydmFibGU8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+fSAtIFVwZGF0ZWQgY29uZmlndXJhdGlvblxuICAgKi9cbiAgdXBkYXRlVmFsdWVRdWFudGl0eShcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPiB7XG4gICAgY29uc3QgdXBkYXRlVmFsdWU6IENwcS5VcGRhdGVWYWx1ZSA9IHRoaXMuY29udmVydGVyU2VydmljZS5jb252ZXJ0KFxuICAgICAgY29uZmlndXJhdGlvbixcbiAgICAgIENQUV9DT05GSUdVUkFUT1JfUVVBTlRJVFlfU0VSSUFMSVpFUlxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuY2FsbFVwZGF0ZVZhbHVlKHVwZGF0ZVZhbHVlKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbENvbmZpZ3VyYXRpb25EaXNwbGF5KFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb24uY29uZmlnSWQsXG4gICAgICAgICAgdXBkYXRlVmFsdWUudGFiSWRcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHRoaXMuY29udmVydGVyU2VydmljZS5waXBlYWJsZShDUFFfQ09ORklHVVJBVE9SX05PUk1BTElaRVIpLFxuICAgICAgICAgIG1hcCgocmVzdWx0Q29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4ucmVzdWx0Q29uZmlndXJhdGlvbixcbiAgICAgICAgICAgICAgY29uZmlnSWQ6IGNvbmZpZ3VyYXRpb24uY29uZmlnSWQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2FsbFVwZGF0ZVZhbHVlKHVwZGF0ZVZhbHVlOiBDcHEuVXBkYXRlVmFsdWUpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2g8Q3BxLkNvbmZpZ3VyYXRpb25DcmVhdGVkUmVzcG9uc2VEYXRhPihcbiAgICAgIHRoaXMuZW5kcG9pbnRTZXJ2aWNlLmJ1aWxkVXJsKCd2YWx1ZVVwZGF0ZScsIHtcbiAgICAgICAgY29uZmlnSWQ6IHVwZGF0ZVZhbHVlLmNvbmZpZ3VyYXRpb25JZCxcbiAgICAgICAgYXR0cmlidXRlQ29kZTogdXBkYXRlVmFsdWUuc3RhbmRhcmRBdHRyaWJ1dGVDb2RlLFxuICAgICAgICB2YWx1ZUNvZGU6IHVwZGF0ZVZhbHVlLmF0dHJpYnV0ZVZhbHVlSWQsXG4gICAgICB9KSxcbiAgICAgIHtcbiAgICAgICAgUXVhbnRpdHk6IHVwZGF0ZVZhbHVlLnF1YW50aXR5LFxuICAgICAgfSxcbiAgICAgIHRoaXMuZW5kcG9pbnRTZXJ2aWNlLkNQUV9NQVJLRVJfSEVBREVSXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYWxsQ29uZmlndXJhdGlvbkluaXQoXG4gICAgcHJvZHVjdFN5c3RlbUlkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDcHEuQ29uZmlndXJhdGlvbkNyZWF0ZWRSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8Q3BxLkNvbmZpZ3VyYXRpb25DcmVhdGVkUmVzcG9uc2VEYXRhPihcbiAgICAgIHRoaXMuZW5kcG9pbnRTZXJ2aWNlLmJ1aWxkVXJsKCdjb25maWd1cmF0aW9uSW5pdCcpLFxuICAgICAge1xuICAgICAgICBQcm9kdWN0U3lzdGVtSWQ6IHByb2R1Y3RTeXN0ZW1JZCxcbiAgICAgIH0sXG4gICAgICB0aGlzLmVuZHBvaW50U2VydmljZS5DUFFfTUFSS0VSX0hFQURFUlxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2FsbENvbmZpZ3VyYXRpb25EaXNwbGF5KFxuICAgIGNvbmZpZ0lkOiBzdHJpbmcsXG4gICAgdGFiSWQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDcHEuQ29uZmlndXJhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PENwcS5Db25maWd1cmF0aW9uPihcbiAgICAgIHRoaXMuZW5kcG9pbnRTZXJ2aWNlLmJ1aWxkVXJsKFxuICAgICAgICAnY29uZmlndXJhdGlvbkRpc3BsYXknLFxuICAgICAgICB7IGNvbmZpZ0lkOiBjb25maWdJZCB9LFxuICAgICAgICB0YWJJZCA/IFt7IG5hbWU6ICd0YWJJZCcsIHZhbHVlOiB0YWJJZCB9XSA6IHVuZGVmaW5lZFxuICAgICAgKSxcbiAgICAgIHRoaXMuZW5kcG9pbnRTZXJ2aWNlLkNQUV9NQVJLRVJfSEVBREVSXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYWxsVXBkYXRlQXR0cmlidXRlKFxuICAgIHVwZGF0ZUF0dHJpYnV0ZTogQ3BxLlVwZGF0ZUF0dHJpYnV0ZVxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2g8YW55PihcbiAgICAgIHRoaXMuZW5kcG9pbnRTZXJ2aWNlLmJ1aWxkVXJsKCdhdHRyaWJ1dGVVcGRhdGUnLCB7XG4gICAgICAgIGNvbmZpZ0lkOiB1cGRhdGVBdHRyaWJ1dGUuY29uZmlndXJhdGlvbklkLFxuICAgICAgICBhdHRyaWJ1dGVDb2RlOiB1cGRhdGVBdHRyaWJ1dGUuc3RhbmRhcmRBdHRyaWJ1dGVDb2RlLFxuICAgICAgfSksXG4gICAgICB1cGRhdGVBdHRyaWJ1dGUuY2hhbmdlQXR0cmlidXRlVmFsdWUsXG4gICAgICB0aGlzLmVuZHBvaW50U2VydmljZS5DUFFfTUFSS0VSX0hFQURFUlxuICAgICk7XG4gIH1cbn1cbiJdfQ==