/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { ServiceWorkerModule, SwRegistrationOptions, } from '@angular/service-worker';
import { Config, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { AddToHomeScreenBannerComponent } from './components/add-to-home-screen-banner/add-to-home-screen-banner.component';
import { AddToHomeScreenBtnComponent } from './components/add-to-home-screen-btn/add-to-home-screen-btn.component';
import { defaultPWAModuleConfig } from './pwa.module-config';
import { AddToHomeScreenService } from './services/add-to-home-screen.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/service-worker";
export function pwaConfigurationFactory(pwaConfig) {
    return { enabled: (!isDevMode() && pwaConfig.pwa?.enabled) || false };
}
export function pwaFactory(addToHomeScreenService) {
    const result = () => addToHomeScreenService;
    return result;
}
export class PwaModule {
}
PwaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PwaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PwaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PwaModule, declarations: [AddToHomeScreenBtnComponent, AddToHomeScreenBannerComponent], imports: [CommonModule, i1.ServiceWorkerModule, I18nModule], exports: [AddToHomeScreenBtnComponent, AddToHomeScreenBannerComponent] });
PwaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PwaModule, providers: [
        provideDefaultConfig(defaultPWAModuleConfig),
        {
            provide: SwRegistrationOptions,
            useFactory: pwaConfigurationFactory,
            deps: [Config],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: pwaFactory,
            deps: [AddToHomeScreenService],
            multi: true,
        },
    ], imports: [CommonModule,
        ServiceWorkerModule.register('ngsw-worker.js'),
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PwaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ServiceWorkerModule.register('ngsw-worker.js'),
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultPWAModuleConfig),
                        {
                            provide: SwRegistrationOptions,
                            useFactory: pwaConfigurationFactory,
                            deps: [Config],
                        },
                        {
                            provide: APP_INITIALIZER,
                            useFactory: pwaFactory,
                            deps: [AddToHomeScreenService],
                            multi: true,
                        },
                    ],
                    declarations: [AddToHomeScreenBtnComponent, AddToHomeScreenBannerComponent],
                    exports: [AddToHomeScreenBtnComponent, AddToHomeScreenBannerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHdhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wd2EvcHdhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLHFCQUFxQixHQUN0QixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0UsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNEVBQTRFLENBQUM7QUFDNUgsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDbkgsT0FBTyxFQUFFLHNCQUFzQixFQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7QUFFL0UsTUFBTSxVQUFVLHVCQUF1QixDQUNyQyxTQUEwQjtJQUUxQixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ3hFLENBQUM7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUN4QixzQkFBOEM7SUFFOUMsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7SUFDNUMsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQXlCRCxNQUFNLE9BQU8sU0FBUzs7c0dBQVQsU0FBUzt1R0FBVCxTQUFTLGlCQUhMLDJCQUEyQixFQUFFLDhCQUE4QixhQWxCeEUsWUFBWSwwQkFFWixVQUFVLGFBaUJGLDJCQUEyQixFQUFFLDhCQUE4Qjt1R0FFMUQsU0FBUyxhQWpCVDtRQUNULG9CQUFvQixDQUFDLHNCQUFzQixDQUFDO1FBQzVDO1lBQ0UsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixVQUFVLEVBQUUsdUJBQXVCO1lBQ25DLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNmO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsZUFBZTtZQUN4QixVQUFVLEVBQUUsVUFBVTtZQUN0QixJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUM5QixLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsWUFqQkMsWUFBWTtRQUNaLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxVQUFVOzJGQW1CRCxTQUFTO2tCQXZCckIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUIsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7d0JBQzlDLFVBQVU7cUJBQ1g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLHNCQUFzQixDQUFDO3dCQUM1Qzs0QkFDRSxPQUFPLEVBQUUscUJBQXFCOzRCQUM5QixVQUFVLEVBQUUsdUJBQXVCOzRCQUNuQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7eUJBQ2Y7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLGVBQWU7NEJBQ3hCLFVBQVUsRUFBRSxVQUFVOzRCQUN0QixJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzs0QkFDOUIsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMkJBQTJCLEVBQUUsOEJBQThCLENBQUM7b0JBQzNFLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixFQUFFLDhCQUE4QixDQUFDO2lCQUN2RSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIGlzRGV2TW9kZSwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFNlcnZpY2VXb3JrZXJNb2R1bGUsXG4gIFN3UmVnaXN0cmF0aW9uT3B0aW9ucyxcbn0gZnJvbSAnQGFuZ3VsYXIvc2VydmljZS13b3JrZXInO1xuaW1wb3J0IHsgQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBBZGRUb0hvbWVTY3JlZW5CYW5uZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYWRkLXRvLWhvbWUtc2NyZWVuLWJhbm5lci9hZGQtdG8taG9tZS1zY3JlZW4tYmFubmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZGRUb0hvbWVTY3JlZW5CdG5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYWRkLXRvLWhvbWUtc2NyZWVuLWJ0bi9hZGQtdG8taG9tZS1zY3JlZW4tYnRuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0UFdBTW9kdWxlQ29uZmlnLCBQV0FNb2R1bGVDb25maWcgfSBmcm9tICcuL3B3YS5tb2R1bGUtY29uZmlnJztcbmltcG9ydCB7IEFkZFRvSG9tZVNjcmVlblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2FkZC10by1ob21lLXNjcmVlbi5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHB3YUNvbmZpZ3VyYXRpb25GYWN0b3J5KFxuICBwd2FDb25maWc6IFBXQU1vZHVsZUNvbmZpZ1xuKTogU3dSZWdpc3RyYXRpb25PcHRpb25zIHtcbiAgcmV0dXJuIHsgZW5hYmxlZDogKCFpc0Rldk1vZGUoKSAmJiBwd2FDb25maWcucHdhPy5lbmFibGVkKSB8fCBmYWxzZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHdhRmFjdG9yeShcbiAgYWRkVG9Ib21lU2NyZWVuU2VydmljZTogQWRkVG9Ib21lU2NyZWVuU2VydmljZVxuKTogYW55IHtcbiAgY29uc3QgcmVzdWx0ID0gKCkgPT4gYWRkVG9Ib21lU2NyZWVuU2VydmljZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBTZXJ2aWNlV29ya2VyTW9kdWxlLnJlZ2lzdGVyKCduZ3N3LXdvcmtlci5qcycpLFxuICAgIEkxOG5Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRQV0FNb2R1bGVDb25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFN3UmVnaXN0cmF0aW9uT3B0aW9ucyxcbiAgICAgIHVzZUZhY3Rvcnk6IHB3YUNvbmZpZ3VyYXRpb25GYWN0b3J5LFxuICAgICAgZGVwczogW0NvbmZpZ10sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICB1c2VGYWN0b3J5OiBwd2FGYWN0b3J5LFxuICAgICAgZGVwczogW0FkZFRvSG9tZVNjcmVlblNlcnZpY2VdLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQWRkVG9Ib21lU2NyZWVuQnRuQ29tcG9uZW50LCBBZGRUb0hvbWVTY3JlZW5CYW5uZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQWRkVG9Ib21lU2NyZWVuQnRuQ29tcG9uZW50LCBBZGRUb0hvbWVTY3JlZW5CYW5uZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBQd2FNb2R1bGUge31cbiJdfQ==