/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ConfigInitializerService, provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';
import { CdcConsentManagementModule } from './consent-management/cdc-consent.module';
import { defaultCdcRoutingConfig } from './config/default-cdc-routing-config';
import { CDC_CORE_FEATURE, CDC_FEATURE } from './feature-name';
import { CdcLogoutGuard } from './guards/cdc-logout.guard';
import { CdcJsService } from './service/cdc-js.service';
import * as i0 from "@angular/core";
export function cdcJsFactory(cdcJsService, configInit) {
    const func = () => configInit
        .getStable('context', 'cdc')
        .pipe(tap(() => {
        cdcJsService.initialize();
    }))
        .toPromise();
    return func;
}
export function defaultCdcComponentsConfig() {
    const config = {
        featureModules: {
            [CDC_FEATURE]: {
                cmsComponents: ['GigyaRaasComponent'],
            },
            // by default core is bundled together with components
            [CDC_CORE_FEATURE]: CDC_FEATURE,
        },
    };
    return config;
}
export class CdcRootModule {
}
CdcRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcRootModule, imports: [CdcConsentManagementModule] });
CdcRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcRootModule, providers: [
        provideDefaultConfigFactory(defaultCdcComponentsConfig),
        { provide: LogoutGuard, useExisting: CdcLogoutGuard },
        {
            provide: APP_INITIALIZER,
            useFactory: cdcJsFactory,
            deps: [CdcJsService, ConfigInitializerService],
            multi: true,
        },
        provideDefaultConfig(defaultCdcRoutingConfig),
    ], imports: [CdcConsentManagementModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdcConsentManagementModule],
                    providers: [
                        provideDefaultConfigFactory(defaultCdcComponentsConfig),
                        { provide: LogoutGuard, useExisting: CdcLogoutGuard },
                        {
                            provide: APP_INITIALIZER,
                            useFactory: cdcJsFactory,
                            deps: [CdcJsService, ConfigInitializerService],
                            multi: true,
                        },
                        provideDefaultConfig(defaultCdcRoutingConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvcm9vdC9jZGMtcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFHTCx3QkFBd0IsRUFDeEIsb0JBQW9CLEVBQ3BCLDJCQUEyQixHQUM1QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDckYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBRXhELE1BQU0sVUFBVSxZQUFZLENBQzFCLFlBQTBCLEVBQzFCLFVBQW9DO0lBRXBDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUNoQixVQUFVO1NBQ1AsU0FBUyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7U0FDM0IsSUFBSSxDQUNILEdBQUcsQ0FBQyxHQUFHLEVBQUU7UUFDUCxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQ0g7U0FDQSxTQUFTLEVBQUUsQ0FBQztJQUNqQixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFVBQVUsMEJBQTBCO0lBQ3hDLE1BQU0sTUFBTSxHQUFjO1FBQ3hCLGNBQWMsRUFBRTtZQUNkLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2IsYUFBYSxFQUFFLENBQUMsb0JBQW9CLENBQUM7YUFDdEM7WUFDRCxzREFBc0Q7WUFDdEQsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFdBQVc7U0FDaEM7S0FDRixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQWdCRCxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLFlBYmQsMEJBQTBCOzJHQWF6QixhQUFhLGFBWmI7UUFDVCwyQkFBMkIsQ0FBQywwQkFBMEIsQ0FBQztRQUN2RCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtRQUNyRDtZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSx3QkFBd0IsQ0FBQztZQUM5QyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Qsb0JBQW9CLENBQUMsdUJBQXVCLENBQUM7S0FDOUMsWUFYUywwQkFBMEI7MkZBYXpCLGFBQWE7a0JBZHpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQ3JDLFNBQVMsRUFBRTt3QkFDVCwyQkFBMkIsQ0FBQywwQkFBMEIsQ0FBQzt3QkFDdkQsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUU7d0JBQ3JEOzRCQUNFLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixVQUFVLEVBQUUsWUFBWTs0QkFDeEIsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFLHdCQUF3QixDQUFDOzRCQUM5QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRCxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQztxQkFDOUM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIENvbmZpZyxcbiAgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTG9nb3V0R3VhcmQgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2RjQ29uc2VudE1hbmFnZW1lbnRNb2R1bGUgfSBmcm9tICcuL2NvbnNlbnQtbWFuYWdlbWVudC9jZGMtY29uc2VudC5tb2R1bGUnO1xuaW1wb3J0IHsgZGVmYXVsdENkY1JvdXRpbmdDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LWNkYy1yb3V0aW5nLWNvbmZpZyc7XG5pbXBvcnQgeyBDRENfQ09SRV9GRUFUVVJFLCBDRENfRkVBVFVSRSB9IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7IENkY0xvZ291dEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvY2RjLWxvZ291dC5ndWFyZCc7XG5pbXBvcnQgeyBDZGNKc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvY2RjLWpzLnNlcnZpY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2RjSnNGYWN0b3J5KFxuICBjZGNKc1NlcnZpY2U6IENkY0pzU2VydmljZSxcbiAgY29uZmlnSW5pdDogQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlXG4pOiAoKSA9PiBQcm9taXNlPENvbmZpZz4ge1xuICBjb25zdCBmdW5jID0gKCkgPT5cbiAgICBjb25maWdJbml0XG4gICAgICAuZ2V0U3RhYmxlKCdjb250ZXh0JywgJ2NkYycpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBjZGNKc1NlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnRvUHJvbWlzZSgpO1xuICByZXR1cm4gZnVuYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRDZGNDb21wb25lbnRzQ29uZmlnKCk6IENtc0NvbmZpZyB7XG4gIGNvbnN0IGNvbmZpZzogQ21zQ29uZmlnID0ge1xuICAgIGZlYXR1cmVNb2R1bGVzOiB7XG4gICAgICBbQ0RDX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHM6IFsnR2lneWFSYWFzQ29tcG9uZW50J10sXG4gICAgICB9LFxuICAgICAgLy8gYnkgZGVmYXVsdCBjb3JlIGlzIGJ1bmRsZWQgdG9nZXRoZXIgd2l0aCBjb21wb25lbnRzXG4gICAgICBbQ0RDX0NPUkVfRkVBVFVSRV06IENEQ19GRUFUVVJFLFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBjb25maWc7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDZGNDb25zZW50TWFuYWdlbWVudE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShkZWZhdWx0Q2RjQ29tcG9uZW50c0NvbmZpZyksXG4gICAgeyBwcm92aWRlOiBMb2dvdXRHdWFyZCwgdXNlRXhpc3Rpbmc6IENkY0xvZ291dEd1YXJkIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgdXNlRmFjdG9yeTogY2RjSnNGYWN0b3J5LFxuICAgICAgZGVwczogW0NkY0pzU2VydmljZSwgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlXSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENkY1JvdXRpbmdDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDZGNSb290TW9kdWxlIHt9XG4iXX0=