/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { ASM_FEATURE } from '@spartacus/asm/root';
import { provideDefaultConfig } from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { ASM_CUSTOMER_360_CORE_FEATURE, ASM_CUSTOMER_360_FEATURE, } from './feature-name';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SiteContextInterceptor } from './interceptors/site-context.interceptor';
import * as i0 from "@angular/core";
export class AsmCustomer360RootModule {
}
AsmCustomer360RootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360RootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360RootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360RootModule, imports: [PageComponentModule] });
AsmCustomer360RootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360RootModule, providers: [
        provideDefaultConfig({
            featureModules: {
                [ASM_CUSTOMER_360_FEATURE]: {
                    dependencies: [ASM_FEATURE],
                },
                [ASM_CUSTOMER_360_CORE_FEATURE]: ASM_CUSTOMER_360_FEATURE,
            },
        }),
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: SiteContextInterceptor,
            multi: true,
        },
    ], imports: [PageComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360RootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [PageComponentModule],
                    providers: [
                        provideDefaultConfig({
                            featureModules: {
                                [ASM_CUSTOMER_360_FEATURE]: {
                                    dependencies: [ASM_FEATURE],
                                },
                                [ASM_CUSTOMER_360_CORE_FEATURE]: ASM_CUSTOMER_360_FEATURE,
                            },
                        }),
                        {
                            provide: HTTP_INTERCEPTORS,
                            useExisting: SiteContextInterceptor,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY3VzdG9tZXItMzYwL3Jvb3QvYXNtLWN1c3RvbWVyLTM2MC1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUNMLDZCQUE2QixFQUM3Qix3QkFBd0IsR0FDekIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFvQmpGLE1BQU0sT0FBTyx3QkFBd0I7O3FIQUF4Qix3QkFBd0I7c0hBQXhCLHdCQUF3QixZQWpCekIsbUJBQW1CO3NIQWlCbEIsd0JBQXdCLGFBaEJ4QjtRQUNULG9CQUFvQixDQUFDO1lBQ25CLGNBQWMsRUFBRTtnQkFDZCxDQUFDLHdCQUF3QixDQUFDLEVBQUU7b0JBQzFCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztpQkFDNUI7Z0JBQ0QsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLHdCQUF3QjthQUMxRDtTQUNGLENBQUM7UUFDRjtZQUNFLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsWUFmUyxtQkFBbUI7MkZBaUJsQix3QkFBd0I7a0JBbEJwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUM5QixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUM7NEJBQ25CLGNBQWMsRUFBRTtnQ0FDZCxDQUFDLHdCQUF3QixDQUFDLEVBQUU7b0NBQzFCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztpQ0FDNUI7Z0NBQ0QsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLHdCQUF3Qjs2QkFDMUQ7eUJBQ0YsQ0FBQzt3QkFDRjs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsc0JBQXNCOzRCQUNuQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBU01fRkVBVFVSRSB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL3Jvb3QnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUGFnZUNvbXBvbmVudE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQge1xuICBBU01fQ1VTVE9NRVJfMzYwX0NPUkVfRkVBVFVSRSxcbiAgQVNNX0NVU1RPTUVSXzM2MF9GRUFUVVJFLFxufSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNpdGVDb250ZXh0SW50ZXJjZXB0b3IgfSBmcm9tICcuL2ludGVyY2VwdG9ycy9zaXRlLWNvbnRleHQuaW50ZXJjZXB0b3InO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbUGFnZUNvbXBvbmVudE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKHtcbiAgICAgIGZlYXR1cmVNb2R1bGVzOiB7XG4gICAgICAgIFtBU01fQ1VTVE9NRVJfMzYwX0ZFQVRVUkVdOiB7XG4gICAgICAgICAgZGVwZW5kZW5jaWVzOiBbQVNNX0ZFQVRVUkVdLFxuICAgICAgICB9LFxuICAgICAgICBbQVNNX0NVU1RPTUVSXzM2MF9DT1JFX0ZFQVRVUkVdOiBBU01fQ1VTVE9NRVJfMzYwX0ZFQVRVUkUsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IFNpdGVDb250ZXh0SW50ZXJjZXB0b3IsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBc21DdXN0b21lcjM2MFJvb3RNb2R1bGUge31cbiJdfQ==