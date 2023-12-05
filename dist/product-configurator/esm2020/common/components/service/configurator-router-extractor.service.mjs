/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { ConfiguratorModelUtils } from '../../shared/utils/configurator-model-utils';
import { ConfiguratorRouter } from './configurator-router-data';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/utils/common-configurator-utils.service";
import * as i2 from "@spartacus/core";
/**
 * Service to extract the configuration owner key from the current route
 */
export class ConfiguratorRouterExtractorService {
    constructor(configUtilsService, routingService) {
        this.configUtilsService = configUtilsService;
        this.routingService = routingService;
        this.ROUTE_FRAGMENT_CONFIGURE = 'configure';
        this.ROUTE_FRAGMENT_OVERVIEW = 'configureOverview';
    }
    extractRouterData() {
        return this.routingService.getRouterState().pipe(filter((routingData) => routingData.state.params.entityKey), 
        //we don't need to cover the intermediate router states where a future route is already known.
        //only changes to the URL are relevant. Otherwise we get wrong hits where e.g. the config form fires although
        //the OV already loads
        filter((routingData) => routingData.nextState === undefined), map((routingData) => {
            const owner = this.createOwnerFromRouterState(routingData);
            const semanticRoute = routingData.state.semanticRoute;
            const routerData = {
                owner: owner,
                isOwnerCartEntry: owner.type === CommonConfigurator.OwnerType.CART_ENTRY,
                displayOnly: routingData.state.params.displayOnly,
                resolveIssues: routingData.state.queryParams?.resolveIssues === 'true',
                skipConflicts: routingData.state.queryParams?.skipConflicts === 'true',
                forceReload: routingData.state.queryParams?.forceReload === 'true',
                expMode: routingData.state.queryParams?.expMode === 'true',
                displayRestartDialog: routingData.state.queryParams?.displayRestartDialog === 'true',
                configIdTemplate: routingData.state.queryParams?.configIdTemplate,
                navigationId: routingData.navigationId,
                pageType: semanticRoute &&
                    semanticRoute.includes(this.ROUTE_FRAGMENT_OVERVIEW)
                    ? ConfiguratorRouter.PageType.OVERVIEW
                    : ConfiguratorRouter.PageType.CONFIGURATION,
            };
            return routerData;
        }));
    }
    createOwnerFromRouterState(routerState) {
        const owner = ConfiguratorModelUtils.createInitialOwner();
        const params = routerState.state.params;
        if (params.ownerType) {
            const entityKey = params.entityKey;
            owner.type = params.ownerType;
            owner.id = entityKey;
        }
        else {
            owner.type = CommonConfigurator.OwnerType.PRODUCT;
            owner.id = params.rootProduct;
        }
        const semanticRoute = routerState.state.semanticRoute;
        if (semanticRoute) {
            const configuratorType = this.getConfiguratorTypeFromSemanticRoute(semanticRoute);
            owner.configuratorType = configuratorType;
        }
        this.configUtilsService.setOwnerKey(owner);
        return owner;
    }
    /**
     * Compiles the configurator type from the semantic route
     * @param semanticRoute Consists of a prefix that indicates if target is interactive configuration or overview and
     *                      the commerce configurator type as postfix.
     *                      Example: configureTEXTFIELD or configureOverviewCPQCONFIGURATOR
     * @returns Configurator type
     */
    getConfiguratorTypeFromSemanticRoute(semanticRoute) {
        if (semanticRoute.startsWith(this.ROUTE_FRAGMENT_OVERVIEW)) {
            return semanticRoute.split(this.ROUTE_FRAGMENT_OVERVIEW)[1];
        }
        else if (semanticRoute.startsWith(this.ROUTE_FRAGMENT_CONFIGURE)) {
            return semanticRoute.split(this.ROUTE_FRAGMENT_CONFIGURE)[1];
        }
        else {
            throw new Error('Not able to determine configurator type');
        }
    }
}
ConfiguratorRouterExtractorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterExtractorService, deps: [{ token: i1.CommonConfiguratorUtilsService }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorRouterExtractorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterExtractorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterExtractorService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.CommonConfiguratorUtilsService }, { type: i2.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXJvdXRlci1leHRyYWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24vY29tcG9uZW50cy9zZXJ2aWNlL2NvbmZpZ3VyYXRvci1yb3V0ZXItZXh0cmFjdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUVoRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUVoRTs7R0FFRztBQUVILE1BQU0sT0FBTyxrQ0FBa0M7SUFHN0MsWUFDWSxrQkFBa0QsRUFDbEQsY0FBOEI7UUFEOUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFnQztRQUNsRCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFKdkIsNkJBQXdCLEdBQUcsV0FBVyxDQUFDO1FBQ3ZDLDRCQUF1QixHQUFHLG1CQUFtQixDQUFDO0lBSTlELENBQUM7SUFFSixpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUM5QyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUMzRCw4RkFBOEY7UUFDOUYsNkdBQTZHO1FBQzdHLHNCQUFzQjtRQUN0QixNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcs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SUFBSSxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1lBQ2xFLE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5RDthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQzs7K0hBdkZVLGtDQUFrQzttSUFBbEMsa0NBQWtDLGNBRHJCLE1BQU07MkZBQ25CLGtDQUFrQztrQkFEOUMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJTdGF0ZSwgUm91dGluZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL2NvbW1vbi1jb25maWd1cmF0b3IubW9kZWwnO1xuaW1wb3J0IHsgQ29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NvbW1vbi1jb25maWd1cmF0b3ItdXRpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JNb2RlbFV0aWxzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NvbmZpZ3VyYXRvci1tb2RlbC11dGlscyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JSb3V0ZXIgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1yb3V0ZXItZGF0YSc7XG5cbi8qKlxuICogU2VydmljZSB0byBleHRyYWN0IHRoZSBjb25maWd1cmF0aW9uIG93bmVyIGtleSBmcm9tIHRoZSBjdXJyZW50IHJvdXRlXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBST1VURV9GUkFHTUVOVF9DT05GSUdVUkUgPSAnY29uZmlndXJlJztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IFJPVVRFX0ZSQUdNRU5UX09WRVJWSUVXID0gJ2NvbmZpZ3VyZU92ZXJ2aWV3JztcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZ1V0aWxzU2VydmljZTogQ29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIGV4dHJhY3RSb3V0ZXJEYXRhKCk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yUm91dGVyLkRhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yb3V0aW5nU2VydmljZS5nZXRSb3V0ZXJTdGF0ZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHJvdXRpbmdEYXRhKSA9PiByb3V0aW5nRGF0YS5zdGF0ZS5wYXJhbXMuZW50aXR5S2V5KSxcbiAgICAgIC8vd2UgZG9uJ3QgbmVlZCB0byBjb3ZlciB0aGUgaW50ZXJtZWRpYXRlIHJvdXRlciBzdGF0ZXMgd2hlcmUgYSBmdXR1cmUgcm91dGUgaXMgYWxyZWFkeSBrbm93bi5cbiAgICAgIC8vb25seSBjaGFuZ2VzIHRvIHRoZSBVUkwgYXJlIHJlbGV2YW50LiBPdGhlcndpc2Ugd2UgZ2V0IHdyb25nIGhpdHMgd2hlcmUgZS5nLiB0aGUgY29uZmlnIGZvcm0gZmlyZXMgYWx0aG91Z2hcbiAgICAgIC8vdGhlIE9WIGFscmVhZHkgbG9hZHNcbiAgICAgIGZpbHRlcigocm91dGluZ0RhdGEpID0+IHJvdXRpbmdEYXRhLm5leHRTdGF0ZSA9PT0gdW5kZWZpbmVkKSxcbiAgICAgIG1hcCgocm91dGluZ0RhdGEpID0+IHtcbiAgICAgICAgY29uc3Qgb3duZXIgPSB0aGlzLmNyZWF0ZU93bmVyRnJvbVJvdXRlclN0YXRlKHJvdXRpbmdEYXRhKTtcbiAgICAgICAgY29uc3Qgc2VtYW50aWNSb3V0ZSA9IHJvdXRpbmdEYXRhLnN0YXRlLnNlbWFudGljUm91dGU7XG4gICAgICAgIGNvbnN0IHJvdXRlckRhdGE6IENvbmZpZ3VyYXRvclJvdXRlci5EYXRhID0ge1xuICAgICAgICAgIG93bmVyOiBvd25lcixcbiAgICAgICAgICBpc093bmVyQ2FydEVudHJ5OlxuICAgICAgICAgICAgb3duZXIudHlwZSA9PT0gQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyVHlwZS5DQVJUX0VOVFJZLFxuICAgICAgICAgIGRpc3BsYXlPbmx5OiByb3V0aW5nRGF0YS5zdGF0ZS5wYXJhbXMuZGlzcGxheU9ubHksXG4gICAgICAgICAgcmVzb2x2ZUlzc3VlczpcbiAgICAgICAgICAgIHJvdXRpbmdEYXRhLnN0YXRlLnF1ZXJ5UGFyYW1zPy5yZXNvbHZlSXNzdWVzID09PSAndHJ1ZScsXG4gICAgICAgICAgc2tpcENvbmZsaWN0czpcbiAgICAgICAgICAgIHJvdXRpbmdEYXRhLnN0YXRlLnF1ZXJ5UGFyYW1zPy5za2lwQ29uZmxpY3RzID09PSAndHJ1ZScsXG4gICAgICAgICAgZm9yY2VSZWxvYWQ6IHJvdXRpbmdEYXRhLnN0YXRlLnF1ZXJ5UGFyYW1zPy5mb3JjZVJlbG9hZCA9PT0gJ3RydWUnLFxuICAgICAgICAgIGV4cE1vZGU6IHJvdXRpbmdEYXRhLnN0YXRlLnF1ZXJ5UGFyYW1zPy5leHBNb2RlID09PSAndHJ1ZScsXG4gICAgICAgICAgZGlzcGxheVJlc3RhcnREaWFsb2c6XG4gICAgICAgICAgICByb3V0aW5nRGF0YS5zdGF0ZS5xdWVyeVBhcmFtcz8uZGlzcGxheVJlc3RhcnREaWFsb2cgPT09ICd0cnVlJyxcbiAgICAgICAgICBjb25maWdJZFRlbXBsYXRlOiByb3V0aW5nRGF0YS5zdGF0ZS5xdWVyeVBhcmFtcz8uY29uZmlnSWRUZW1wbGF0ZSxcbiAgICAgICAgICBuYXZpZ2F0aW9uSWQ6IHJvdXRpbmdEYXRhLm5hdmlnYXRpb25JZCxcbiAgICAgICAgICBwYWdlVHlwZTpcbiAgICAgICAgICAgIHNlbWFudGljUm91dGUgJiZcbiAgICAgICAgICAgIHNlbWFudGljUm91dGUuaW5jbHVkZXModGhpcy5ST1VURV9GUkFHTUVOVF9PVkVSVklFVylcbiAgICAgICAgICAgICAgPyBDb25maWd1cmF0b3JSb3V0ZXIuUGFnZVR5cGUuT1ZFUlZJRVdcbiAgICAgICAgICAgICAgOiBDb25maWd1cmF0b3JSb3V0ZXIuUGFnZVR5cGUuQ09ORklHVVJBVElPTixcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcm91dGVyRGF0YTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZU93bmVyRnJvbVJvdXRlclN0YXRlKFxuICAgIHJvdXRlclN0YXRlOiBSb3V0ZXJTdGF0ZVxuICApOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIge1xuICAgIGNvbnN0IG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIgPVxuICAgICAgQ29uZmlndXJhdG9yTW9kZWxVdGlscy5jcmVhdGVJbml0aWFsT3duZXIoKTtcbiAgICBjb25zdCBwYXJhbXMgPSByb3V0ZXJTdGF0ZS5zdGF0ZS5wYXJhbXM7XG4gICAgaWYgKHBhcmFtcy5vd25lclR5cGUpIHtcbiAgICAgIGNvbnN0IGVudGl0eUtleSA9IHBhcmFtcy5lbnRpdHlLZXk7XG4gICAgICBvd25lci50eXBlID0gcGFyYW1zLm93bmVyVHlwZTtcblxuICAgICAgb3duZXIuaWQgPSBlbnRpdHlLZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG93bmVyLnR5cGUgPSBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlLlBST0RVQ1Q7XG4gICAgICBvd25lci5pZCA9IHBhcmFtcy5yb290UHJvZHVjdDtcbiAgICB9XG4gICAgY29uc3Qgc2VtYW50aWNSb3V0ZSA9IHJvdXRlclN0YXRlLnN0YXRlLnNlbWFudGljUm91dGU7XG4gICAgaWYgKHNlbWFudGljUm91dGUpIHtcbiAgICAgIGNvbnN0IGNvbmZpZ3VyYXRvclR5cGUgPVxuICAgICAgICB0aGlzLmdldENvbmZpZ3VyYXRvclR5cGVGcm9tU2VtYW50aWNSb3V0ZShzZW1hbnRpY1JvdXRlKTtcbiAgICAgIG93bmVyLmNvbmZpZ3VyYXRvclR5cGUgPSBjb25maWd1cmF0b3JUeXBlO1xuICAgIH1cbiAgICB0aGlzLmNvbmZpZ1V0aWxzU2VydmljZS5zZXRPd25lcktleShvd25lcik7XG4gICAgcmV0dXJuIG93bmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGVzIHRoZSBjb25maWd1cmF0b3IgdHlwZSBmcm9tIHRoZSBzZW1hbnRpYyByb3V0ZVxuICAgKiBAcGFyYW0gc2VtYW50aWNSb3V0ZSBDb25zaXN0cyBvZiBhIHByZWZpeCB0aGF0IGluZGljYXRlcyBpZiB0YXJnZXQgaXMgaW50ZXJhY3RpdmUgY29uZmlndXJhdGlvbiBvciBvdmVydmlldyBhbmRcbiAgICogICAgICAgICAgICAgICAgICAgICAgdGhlIGNvbW1lcmNlIGNvbmZpZ3VyYXRvciB0eXBlIGFzIHBvc3RmaXguXG4gICAqICAgICAgICAgICAgICAgICAgICAgIEV4YW1wbGU6IGNvbmZpZ3VyZVRFWFRGSUVMRCBvciBjb25maWd1cmVPdmVydmlld0NQUUNPTkZJR1VSQVRPUlxuICAgKiBAcmV0dXJucyBDb25maWd1cmF0b3IgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldENvbmZpZ3VyYXRvclR5cGVGcm9tU2VtYW50aWNSb3V0ZShcbiAgICBzZW1hbnRpY1JvdXRlOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICBpZiAoc2VtYW50aWNSb3V0ZS5zdGFydHNXaXRoKHRoaXMuUk9VVEVfRlJBR01FTlRfT1ZFUlZJRVcpKSB7XG4gICAgICByZXR1cm4gc2VtYW50aWNSb3V0ZS5zcGxpdCh0aGlzLlJPVVRFX0ZSQUdNRU5UX09WRVJWSUVXKVsxXTtcbiAgICB9IGVsc2UgaWYgKHNlbWFudGljUm91dGUuc3RhcnRzV2l0aCh0aGlzLlJPVVRFX0ZSQUdNRU5UX0NPTkZJR1VSRSkpIHtcbiAgICAgIHJldHVybiBzZW1hbnRpY1JvdXRlLnNwbGl0KHRoaXMuUk9VVEVfRlJBR01FTlRfQ09ORklHVVJFKVsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYWJsZSB0byBkZXRlcm1pbmUgY29uZmlndXJhdG9yIHR5cGUnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==