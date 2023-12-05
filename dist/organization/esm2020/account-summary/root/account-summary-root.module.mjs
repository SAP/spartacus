/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultAccountSummaryRoutingConfig } from './config';
import { ORGANIZATION_ACCOUNT_SUMMARY_FEATURE } from './feature-name';
import { BlobErrorInterceptor } from './http-interceptors/blob-error.interceptor';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultAccountSummaryComponentsConfig() {
    const config = {
        featureModules: {
            [ORGANIZATION_ACCOUNT_SUMMARY_FEATURE]: {
                cmsComponents: [
                    'ManageAccountSummaryListComponent',
                    'AccountSummaryHeaderComponent',
                    'AccountSummaryDocumentComponent',
                ],
            },
        },
    };
    return config;
}
export class AccountSummaryRootModule {
}
AccountSummaryRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryRootModule, imports: [i1.RouterModule] });
AccountSummaryRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryRootModule, providers: [
        provideDefaultConfig(defaultAccountSummaryRoutingConfig),
        provideDefaultConfigFactory(defaultAccountSummaryComponentsConfig),
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: BlobErrorInterceptor,
            multi: true,
        },
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orgAccountSummaryDetails' },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orgAccountSummaryDetails' },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfig(defaultAccountSummaryRoutingConfig),
                        provideDefaultConfigFactory(defaultAccountSummaryComponentsConfig),
                        {
                            provide: HTTP_INTERCEPTORS,
                            useExisting: BlobErrorInterceptor,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hY2NvdW50LXN1bW1hcnkvcm9vdC9hY2NvdW50LXN1bW1hcnktcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxvQkFBb0IsRUFDcEIsMkJBQTJCLEdBQzVCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQzs7O0FBRWxGLDJFQUEyRTtBQUMzRSxNQUFNLFVBQVUscUNBQXFDO0lBQ25ELE1BQU0sTUFBTSxHQUFjO1FBQ3hCLGNBQWMsRUFBRTtZQUNkLENBQUMsb0NBQW9DLENBQUMsRUFBRTtnQkFDdEMsYUFBYSxFQUFFO29CQUNiLG1DQUFtQztvQkFDbkMsK0JBQStCO29CQUMvQixpQ0FBaUM7aUJBQ2xDO2FBQ0Y7U0FDRjtLQUNGLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBd0JELE1BQU0sT0FBTyx3QkFBd0I7O3FIQUF4Qix3QkFBd0I7c0hBQXhCLHdCQUF3QjtzSEFBeEIsd0JBQXdCLGFBVnhCO1FBQ1Qsb0JBQW9CLENBQUMsa0NBQWtDLENBQUM7UUFDeEQsMkJBQTJCLENBQUMscUNBQXFDLENBQUM7UUFDbEU7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLFlBbEJDLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDcEI7Z0JBQ0UsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQzNCLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRTthQUM5QztTQUNGLENBQUM7MkZBWU8sd0JBQXdCO2tCQXRCcEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWSxDQUFDLFFBQVEsQ0FBQzs0QkFDcEI7Z0NBQ0UsYUFBYTtnQ0FDYixJQUFJLEVBQUUsSUFBSTtnQ0FDVixXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0NBQzNCLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRTs2QkFDOUM7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMsa0NBQWtDLENBQUM7d0JBQ3hELDJCQUEyQixDQUFDLHFDQUFxQyxDQUFDO3dCQUNsRTs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsb0JBQW9COzRCQUNqQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnksXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDbXNQYWdlR3VhcmQsIFBhZ2VMYXlvdXRDb21wb25lbnQgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgZGVmYXVsdEFjY291bnRTdW1tYXJ5Um91dGluZ0NvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE9SR0FOSVpBVElPTl9BQ0NPVU5UX1NVTU1BUllfRkVBVFVSRSB9IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7IEJsb2JFcnJvckludGVyY2VwdG9yIH0gZnJvbSAnLi9odHRwLWludGVyY2VwdG9ycy9ibG9iLWVycm9yLmludGVyY2VwdG9yJztcblxuLy8gVE9ETzogSW5saW5lIHRoaXMgZmFjdG9yeSB3aGVuIHdlIHN0YXJ0IHJlbGVhc2luZyBJdnkgY29tcGlsZWQgbGlicmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEFjY291bnRTdW1tYXJ5Q29tcG9uZW50c0NvbmZpZygpOiBDbXNDb25maWcge1xuICBjb25zdCBjb25maWc6IENtc0NvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW09SR0FOSVpBVElPTl9BQ0NPVU5UX1NVTU1BUllfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogW1xuICAgICAgICAgICdNYW5hZ2VBY2NvdW50U3VtbWFyeUxpc3RDb21wb25lbnQnLFxuICAgICAgICAgICdBY2NvdW50U3VtbWFyeUhlYWRlckNvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRTdW1tYXJ5RG9jdW1lbnRDb21wb25lbnQnLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBjb25maWc7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdvcmdBY2NvdW50U3VtbWFyeURldGFpbHMnIH0sXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0QWNjb3VudFN1bW1hcnlSb3V0aW5nQ29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdEFjY291bnRTdW1tYXJ5Q29tcG9uZW50c0NvbmZpZyksXG4gICAge1xuICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogQmxvYkVycm9ySW50ZXJjZXB0b3IsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBY2NvdW50U3VtbWFyeVJvb3RNb2R1bGUge31cbiJdfQ==