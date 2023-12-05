/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CONFIG_INITIALIZER, } from '../config/config-initializer/config-initializer';
import { provideDefaultConfigFactory } from '../config/config-providers';
import { provideConfigValidator } from '../config/config-validator/config-validator';
import { StateModule } from '../state/index';
import { baseSiteConfigValidator } from './config/base-site-config-validator';
import { SiteContextConfigInitializer } from './config/config-loader/site-context-config-initializer';
import { defaultSiteContextConfigFactory } from './config/default-site-context-config';
import { SiteContextConfig } from './config/site-context-config';
import { SiteContextEventModule } from './events/site-context-event.module';
import { BASE_SITE_CONTEXT_ID } from './providers/context-ids';
import { contextInitializerProviders } from './providers/context-initializer-providers';
import { contextServiceMapProvider } from './providers/context-service-map';
import { contextServiceProviders } from './providers/context-service-providers';
import { siteContextParamsProviders } from './providers/site-context-params-providers';
import { SiteContextStoreModule } from './store/site-context-store.module';
import * as i0 from "@angular/core";
/**
 * Initializes the site context config
 */
export function initSiteContextConfig(configInitializer, config) {
    /**
     * Load config for `context` from backend only when there is no static config for `context.baseSite`
     */
    if (!config.context || !config.context[BASE_SITE_CONTEXT_ID]) {
        return configInitializer;
    }
    return null;
}
export class SiteContextModule {
    static forRoot() {
        return {
            ngModule: SiteContextModule,
            providers: [
                provideDefaultConfigFactory(defaultSiteContextConfigFactory),
                contextServiceMapProvider,
                ...contextServiceProviders,
                ...siteContextParamsProviders,
                provideConfigValidator(baseSiteConfigValidator),
                {
                    provide: CONFIG_INITIALIZER,
                    useFactory: initSiteContextConfig,
                    deps: [SiteContextConfigInitializer, SiteContextConfig],
                    multi: true,
                },
                ...contextInitializerProviders,
            ],
        };
    }
}
SiteContextModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SiteContextModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SiteContextModule, imports: [StateModule, SiteContextStoreModule, SiteContextEventModule] });
SiteContextModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextModule, imports: [StateModule, SiteContextStoreModule, SiteContextEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [StateModule, SiteContextStoreModule, SiteContextEventModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3NpdGUtY29udGV4dC9zaXRlLWNvbnRleHQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBRUwsa0JBQWtCLEdBQ25CLE1BQU0saURBQWlELENBQUM7QUFDekQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztBQUUzRTs7R0FFRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsaUJBQStDLEVBQy9DLE1BQXlCO0lBRXpCOztPQUVHO0lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFDNUQsT0FBTyxpQkFBaUIsQ0FBQztLQUMxQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUtELE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsMkJBQTJCLENBQUMsK0JBQStCLENBQUM7Z0JBQzVELHlCQUF5QjtnQkFDekIsR0FBRyx1QkFBdUI7Z0JBQzFCLEdBQUcsMEJBQTBCO2dCQUM3QixzQkFBc0IsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDL0M7b0JBQ0UsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsVUFBVSxFQUFFLHFCQUFxQjtvQkFDakMsSUFBSSxFQUFFLENBQUMsNEJBQTRCLEVBQUUsaUJBQWlCLENBQUM7b0JBQ3ZELEtBQUssRUFBRSxJQUFJO2lCQUNaO2dCQUNELEdBQUcsMkJBQTJCO2FBQy9CO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzhHQW5CVSxpQkFBaUI7K0dBQWpCLGlCQUFpQixZQUZsQixXQUFXLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCOytHQUUxRCxpQkFBaUIsWUFGbEIsV0FBVyxFQUFFLHNCQUFzQixFQUFFLHNCQUFzQjsyRkFFMUQsaUJBQWlCO2tCQUg3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsQ0FBQztpQkFDdkUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29uZmlnSW5pdGlhbGl6ZXIsXG4gIENPTkZJR19JTklUSUFMSVpFUixcbn0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy1pbml0aWFsaXplci9jb25maWctaW5pdGlhbGl6ZXInO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5IH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy1wcm92aWRlcnMnO1xuaW1wb3J0IHsgcHJvdmlkZUNvbmZpZ1ZhbGlkYXRvciB9IGZyb20gJy4uL2NvbmZpZy9jb25maWctdmFsaWRhdG9yL2NvbmZpZy12YWxpZGF0b3InO1xuaW1wb3J0IHsgU3RhdGVNb2R1bGUgfSBmcm9tICcuLi9zdGF0ZS9pbmRleCc7XG5pbXBvcnQgeyBiYXNlU2l0ZUNvbmZpZ1ZhbGlkYXRvciB9IGZyb20gJy4vY29uZmlnL2Jhc2Utc2l0ZS1jb25maWctdmFsaWRhdG9yJztcbmltcG9ydCB7IFNpdGVDb250ZXh0Q29uZmlnSW5pdGlhbGl6ZXIgfSBmcm9tICcuL2NvbmZpZy9jb25maWctbG9hZGVyL3NpdGUtY29udGV4dC1jb25maWctaW5pdGlhbGl6ZXInO1xuaW1wb3J0IHsgZGVmYXVsdFNpdGVDb250ZXh0Q29uZmlnRmFjdG9yeSB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtc2l0ZS1jb250ZXh0LWNvbmZpZyc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dENvbmZpZyB9IGZyb20gJy4vY29uZmlnL3NpdGUtY29udGV4dC1jb25maWcnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRFdmVudE1vZHVsZSB9IGZyb20gJy4vZXZlbnRzL3NpdGUtY29udGV4dC1ldmVudC5tb2R1bGUnO1xuaW1wb3J0IHsgQkFTRV9TSVRFX0NPTlRFWFRfSUQgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250ZXh0LWlkcyc7XG5pbXBvcnQgeyBjb250ZXh0SW5pdGlhbGl6ZXJQcm92aWRlcnMgfSBmcm9tICcuL3Byb3ZpZGVycy9jb250ZXh0LWluaXRpYWxpemVyLXByb3ZpZGVycyc7XG5pbXBvcnQgeyBjb250ZXh0U2VydmljZU1hcFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvY29udGV4dC1zZXJ2aWNlLW1hcCc7XG5pbXBvcnQgeyBjb250ZXh0U2VydmljZVByb3ZpZGVycyB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbnRleHQtc2VydmljZS1wcm92aWRlcnMnO1xuaW1wb3J0IHsgc2l0ZUNvbnRleHRQYXJhbXNQcm92aWRlcnMgfSBmcm9tICcuL3Byb3ZpZGVycy9zaXRlLWNvbnRleHQtcGFyYW1zLXByb3ZpZGVycyc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dFN0b3JlTW9kdWxlIH0gZnJvbSAnLi9zdG9yZS9zaXRlLWNvbnRleHQtc3RvcmUubW9kdWxlJztcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgc2l0ZSBjb250ZXh0IGNvbmZpZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNpdGVDb250ZXh0Q29uZmlnKFxuICBjb25maWdJbml0aWFsaXplcjogU2l0ZUNvbnRleHRDb25maWdJbml0aWFsaXplcixcbiAgY29uZmlnOiBTaXRlQ29udGV4dENvbmZpZ1xuKTogQ29uZmlnSW5pdGlhbGl6ZXIgfCBudWxsIHtcbiAgLyoqXG4gICAqIExvYWQgY29uZmlnIGZvciBgY29udGV4dGAgZnJvbSBiYWNrZW5kIG9ubHkgd2hlbiB0aGVyZSBpcyBubyBzdGF0aWMgY29uZmlnIGZvciBgY29udGV4dC5iYXNlU2l0ZWBcbiAgICovXG4gIGlmICghY29uZmlnLmNvbnRleHQgfHwgIWNvbmZpZy5jb250ZXh0W0JBU0VfU0lURV9DT05URVhUX0lEXSkge1xuICAgIHJldHVybiBjb25maWdJbml0aWFsaXplcjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1N0YXRlTW9kdWxlLCBTaXRlQ29udGV4dFN0b3JlTW9kdWxlLCBTaXRlQ29udGV4dEV2ZW50TW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2l0ZUNvbnRleHRNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFNpdGVDb250ZXh0TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTaXRlQ29udGV4dE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdFNpdGVDb250ZXh0Q29uZmlnRmFjdG9yeSksXG4gICAgICAgIGNvbnRleHRTZXJ2aWNlTWFwUHJvdmlkZXIsXG4gICAgICAgIC4uLmNvbnRleHRTZXJ2aWNlUHJvdmlkZXJzLFxuICAgICAgICAuLi5zaXRlQ29udGV4dFBhcmFtc1Byb3ZpZGVycyxcbiAgICAgICAgcHJvdmlkZUNvbmZpZ1ZhbGlkYXRvcihiYXNlU2l0ZUNvbmZpZ1ZhbGlkYXRvciksXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDT05GSUdfSU5JVElBTElaRVIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogaW5pdFNpdGVDb250ZXh0Q29uZmlnLFxuICAgICAgICAgIGRlcHM6IFtTaXRlQ29udGV4dENvbmZpZ0luaXRpYWxpemVyLCBTaXRlQ29udGV4dENvbmZpZ10sXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIC4uLmNvbnRleHRJbml0aWFsaXplclByb3ZpZGVycyxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19