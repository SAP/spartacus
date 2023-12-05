/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOnNavigateConfig } from './config/default-on-navigate-config';
import { OnNavigateService } from './on-navigate.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class AppRoutingModule {
}
AppRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AppRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AppRoutingModule, imports: [i1.RouterModule] });
AppRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppRoutingModule, providers: [
        provideDefaultConfig(defaultOnNavigateConfig),
        {
            provide: APP_INITIALIZER,
            useFactory: onNavigateFactory,
            deps: [OnNavigateService],
            multi: true,
        },
    ], imports: [RouterModule.forRoot([], {
            anchorScrolling: 'enabled',
            initialNavigation: 'enabledBlocking',
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forRoot([], {
                            anchorScrolling: 'enabled',
                            initialNavigation: 'enabledBlocking',
                        }),
                    ],
                    providers: [
                        provideDefaultConfig(defaultOnNavigateConfig),
                        {
                            provide: APP_INITIALIZER,
                            useFactory: onNavigateFactory,
                            deps: [OnNavigateService],
                            multi: true,
                        },
                    ],
                }]
        }] });
export function onNavigateFactory(onNavigateService) {
    const isReady = () => onNavigateService.initializeWithConfig();
    return isReady;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9yb3V0ZXIvYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQW1CMUQsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsYUFWaEI7UUFDVCxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQztRQUM3QztZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxpQkFBaUI7WUFDN0IsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDekIsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLFlBYkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDdkIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsaUJBQWlCLEVBQUUsaUJBQWlCO1NBQ3JDLENBQUM7MkZBWU8sZ0JBQWdCO2tCQWpCNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7NEJBQ3ZCLGVBQWUsRUFBRSxTQUFTOzRCQUMxQixpQkFBaUIsRUFBRSxpQkFBaUI7eUJBQ3JDLENBQUM7cUJBQ0g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLHVCQUF1QixDQUFDO3dCQUM3Qzs0QkFDRSxPQUFPLEVBQUUsZUFBZTs0QkFDeEIsVUFBVSxFQUFFLGlCQUFpQjs0QkFDN0IsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUM7NEJBQ3pCLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGOztBQUdELE1BQU0sVUFBVSxpQkFBaUIsQ0FDL0IsaUJBQW9DO0lBRXBDLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDL0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEFQUF9JTklUSUFMSVpFUiwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBkZWZhdWx0T25OYXZpZ2F0ZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtb24tbmF2aWdhdGUtY29uZmlnJztcbmltcG9ydCB7IE9uTmF2aWdhdGVTZXJ2aWNlIH0gZnJvbSAnLi9vbi1uYXZpZ2F0ZS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck1vZHVsZS5mb3JSb290KFtdLCB7XG4gICAgICBhbmNob3JTY3JvbGxpbmc6ICdlbmFibGVkJyxcbiAgICAgIGluaXRpYWxOYXZpZ2F0aW9uOiAnZW5hYmxlZEJsb2NraW5nJyxcbiAgICB9KSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdE9uTmF2aWdhdGVDb25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgIHVzZUZhY3Rvcnk6IG9uTmF2aWdhdGVGYWN0b3J5LFxuICAgICAgZGVwczogW09uTmF2aWdhdGVTZXJ2aWNlXSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUge31cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGVGYWN0b3J5KFxuICBvbk5hdmlnYXRlU2VydmljZTogT25OYXZpZ2F0ZVNlcnZpY2Vcbik6ICgpID0+IHZvaWQge1xuICBjb25zdCBpc1JlYWR5ID0gKCkgPT4gb25OYXZpZ2F0ZVNlcnZpY2UuaW5pdGlhbGl6ZVdpdGhDb25maWcoKTtcbiAgcmV0dXJuIGlzUmVhZHk7XG59XG4iXX0=