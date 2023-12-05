/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule, } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { CONFIG_INITIALIZER, } from '../config/config-initializer/config-initializer';
import { RoutingConfig } from './configurable-routes';
import { ConfigurableRoutesService } from './configurable-routes/configurable-routes.service';
import { SecurePortalConfigInitializer } from './configurable-routes/secure-portal-config/secure-portal-config-initializer';
import { effects } from './store/effects/index';
import { CustomSerializer, reducerProvider, reducerToken, } from './store/reducers/router.reducer';
import { ROUTING_FEATURE } from './store/routing-state';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
import * as i3 from "@ngrx/router-store";
export function initConfigurableRoutes(service) {
    const result = () => service.init(); // workaround for AOT compilation (see https://stackoverflow.com/a/51977115)
    return result;
}
export function initSecurePortalConfig(configInitializer, routingConfig) {
    if (routingConfig.routing?.protected === undefined) {
        return configInitializer;
    }
    return null;
}
export class RoutingModule {
    static forRoot() {
        return {
            ngModule: RoutingModule,
            providers: [
                reducerProvider,
                {
                    provide: RouterStateSerializer,
                    useClass: CustomSerializer,
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: initConfigurableRoutes,
                    deps: [ConfigurableRoutesService],
                    multi: true,
                },
                {
                    provide: CONFIG_INITIALIZER,
                    useFactory: initSecurePortalConfig,
                    deps: [SecurePortalConfigInitializer, RoutingConfig],
                    multi: true,
                },
            ],
        };
    }
}
RoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RoutingModule, imports: [i1.StoreFeatureModule, i2.EffectsFeatureModule, i3.StoreRouterConnectingModule] });
RoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingModule, imports: [StoreModule.forFeature(ROUTING_FEATURE, reducerToken),
        EffectsModule.forFeature(effects),
        StoreRouterConnectingModule.forRoot({
            routerState: 1 /* RouterState.Minimal */,
            stateKey: ROUTING_FEATURE, // name of reducer key
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        StoreModule.forFeature(ROUTING_FEATURE, reducerToken),
                        EffectsModule.forFeature(effects),
                        StoreRouterConnectingModule.forRoot({
                            routerState: 1 /* RouterState.Minimal */,
                            stateKey: ROUTING_FEATURE, // name of reducer key
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9yb3V0aW5nL3JvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZUFBZSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBRUwscUJBQXFCLEVBQ3JCLDJCQUEyQixHQUM1QixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUVMLGtCQUFrQixHQUNuQixNQUFNLGlEQUFpRCxDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQztBQUM1SCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsWUFBWSxHQUNiLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQUV4RCxNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLE9BQWtDO0lBRWxDLE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLDRFQUE0RTtJQUNqSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUNwQyxpQkFBZ0QsRUFDaEQsYUFBNEI7SUFFNUIsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsS0FBSyxTQUFTLEVBQUU7UUFDbEQsT0FBTyxpQkFBaUIsQ0FBQztLQUMxQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVlELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmO29CQUNFLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLEVBQUUsc0JBQXNCO29CQUNsQyxJQUFJLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDakMsS0FBSyxFQUFFLElBQUk7aUJBQ1o7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsVUFBVSxFQUFFLHNCQUFzQjtvQkFDbEMsSUFBSSxFQUFFLENBQUMsNkJBQTZCLEVBQUUsYUFBYSxDQUFDO29CQUNwRCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzBHQXhCVSxhQUFhOzJHQUFiLGFBQWE7MkdBQWIsYUFBYSxZQVJ0QixXQUFXLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7UUFDckQsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDakMsMkJBQTJCLENBQUMsT0FBTyxDQUFDO1lBQ2xDLFdBQVcsNkJBQXFCO1lBQ2hDLFFBQVEsRUFBRSxlQUFlLEVBQUUsc0JBQXNCO1NBQ2xELENBQUM7MkZBR08sYUFBYTtrQkFWekIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsV0FBVyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDO3dCQUNyRCxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQzt3QkFDakMsMkJBQTJCLENBQUMsT0FBTyxDQUFDOzRCQUNsQyxXQUFXLDZCQUFxQjs0QkFDaEMsUUFBUSxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7eUJBQ2xELENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3RzTW9kdWxlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQge1xuICBSb3V0ZXJTdGF0ZSxcbiAgUm91dGVyU3RhdGVTZXJpYWxpemVyLFxuICBTdG9yZVJvdXRlckNvbm5lY3RpbmdNb2R1bGUsXG59IGZyb20gJ0BuZ3J4L3JvdXRlci1zdG9yZSc7XG5pbXBvcnQgeyBTdG9yZU1vZHVsZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIENvbmZpZ0luaXRpYWxpemVyLFxuICBDT05GSUdfSU5JVElBTElaRVIsXG59IGZyb20gJy4uL2NvbmZpZy9jb25maWctaW5pdGlhbGl6ZXIvY29uZmlnLWluaXRpYWxpemVyJztcbmltcG9ydCB7IFJvdXRpbmdDb25maWcgfSBmcm9tICcuL2NvbmZpZ3VyYWJsZS1yb3V0ZXMnO1xuaW1wb3J0IHsgQ29uZmlndXJhYmxlUm91dGVzU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhYmxlLXJvdXRlcy9jb25maWd1cmFibGUtcm91dGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VjdXJlUG9ydGFsQ29uZmlnSW5pdGlhbGl6ZXIgfSBmcm9tICcuL2NvbmZpZ3VyYWJsZS1yb3V0ZXMvc2VjdXJlLXBvcnRhbC1jb25maWcvc2VjdXJlLXBvcnRhbC1jb25maWctaW5pdGlhbGl6ZXInO1xuaW1wb3J0IHsgZWZmZWN0cyB9IGZyb20gJy4vc3RvcmUvZWZmZWN0cy9pbmRleCc7XG5pbXBvcnQge1xuICBDdXN0b21TZXJpYWxpemVyLFxuICByZWR1Y2VyUHJvdmlkZXIsXG4gIHJlZHVjZXJUb2tlbixcbn0gZnJvbSAnLi9zdG9yZS9yZWR1Y2Vycy9yb3V0ZXIucmVkdWNlcic7XG5pbXBvcnQgeyBST1VUSU5HX0ZFQVRVUkUgfSBmcm9tICcuL3N0b3JlL3JvdXRpbmctc3RhdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdENvbmZpZ3VyYWJsZVJvdXRlcyhcbiAgc2VydmljZTogQ29uZmlndXJhYmxlUm91dGVzU2VydmljZVxuKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IHJlc3VsdCA9ICgpID0+IHNlcnZpY2UuaW5pdCgpOyAvLyB3b3JrYXJvdW5kIGZvciBBT1QgY29tcGlsYXRpb24gKHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTE5NzcxMTUpXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0U2VjdXJlUG9ydGFsQ29uZmlnKFxuICBjb25maWdJbml0aWFsaXplcjogU2VjdXJlUG9ydGFsQ29uZmlnSW5pdGlhbGl6ZXIsXG4gIHJvdXRpbmdDb25maWc6IFJvdXRpbmdDb25maWdcbik6IENvbmZpZ0luaXRpYWxpemVyIHwgbnVsbCB7XG4gIGlmIChyb3V0aW5nQ29uZmlnLnJvdXRpbmc/LnByb3RlY3RlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGNvbmZpZ0luaXRpYWxpemVyO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZShST1VUSU5HX0ZFQVRVUkUsIHJlZHVjZXJUb2tlbiksXG4gICAgRWZmZWN0c01vZHVsZS5mb3JGZWF0dXJlKGVmZmVjdHMpLFxuICAgIFN0b3JlUm91dGVyQ29ubmVjdGluZ01vZHVsZS5mb3JSb290KHtcbiAgICAgIHJvdXRlclN0YXRlOiBSb3V0ZXJTdGF0ZS5NaW5pbWFsLFxuICAgICAgc3RhdGVLZXk6IFJPVVRJTkdfRkVBVFVSRSwgLy8gbmFtZSBvZiByZWR1Y2VyIGtleVxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSb3V0aW5nTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxSb3V0aW5nTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBSb3V0aW5nTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHJlZHVjZXJQcm92aWRlcixcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFJvdXRlclN0YXRlU2VyaWFsaXplcixcbiAgICAgICAgICB1c2VDbGFzczogQ3VzdG9tU2VyaWFsaXplcixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBpbml0Q29uZmlndXJhYmxlUm91dGVzLFxuICAgICAgICAgIGRlcHM6IFtDb25maWd1cmFibGVSb3V0ZXNTZXJ2aWNlXSxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENPTkZJR19JTklUSUFMSVpFUixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBpbml0U2VjdXJlUG9ydGFsQ29uZmlnLFxuICAgICAgICAgIGRlcHM6IFtTZWN1cmVQb3J0YWxDb25maWdJbml0aWFsaXplciwgUm91dGluZ0NvbmZpZ10sXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==