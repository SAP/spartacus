/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthHttpHeaderService, AuthService, AuthStorageService, provideDefaultConfig, } from '@spartacus/core';
import { AsmLoaderModule } from './asm-loader.module';
import { defaultAsmConfig } from './config/default-asm-config';
import { UserIdHttpHeaderInterceptor } from './interceptors/user-id-http-header.interceptor';
import { AsmAuthHttpHeaderService } from './services/asm-auth-http-header.service';
import { AsmAuthStorageService } from './services/asm-auth-storage.service';
import { AsmAuthService } from './services/asm-auth.service';
import * as i0 from "@angular/core";
export class AsmRootModule {
}
AsmRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmRootModule, imports: [AsmLoaderModule] });
AsmRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmRootModule, providers: [
        provideDefaultConfig(defaultAsmConfig),
        {
            provide: AuthStorageService,
            useExisting: AsmAuthStorageService,
        },
        {
            provide: AuthService,
            useExisting: AsmAuthService,
        },
        {
            provide: AuthHttpHeaderService,
            useExisting: AsmAuthHttpHeaderService,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: UserIdHttpHeaderInterceptor,
            multi: true,
        },
    ], imports: [AsmLoaderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AsmLoaderModule],
                    providers: [
                        provideDefaultConfig(defaultAsmConfig),
                        {
                            provide: AuthStorageService,
                            useExisting: AsmAuthStorageService,
                        },
                        {
                            provide: AuthService,
                            useExisting: AsmAuthService,
                        },
                        {
                            provide: AuthHttpHeaderService,
                            useExisting: AsmAuthHttpHeaderService,
                        },
                        {
                            provide: HTTP_INTERCEPTORS,
                            useExisting: UserIdHttpHeaderInterceptor,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9yb290L2FzbS1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsb0JBQW9CLEdBQ3JCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzdGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUF5QjdELE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsWUF0QmQsZUFBZTsyR0FzQmQsYUFBYSxhQXJCYjtRQUNULG9CQUFvQixDQUFDLGdCQUFnQixDQUFDO1FBQ3RDO1lBQ0UsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixXQUFXLEVBQUUscUJBQXFCO1NBQ25DO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixXQUFXLEVBQUUsY0FBYztTQUM1QjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixXQUFXLEVBQUUsd0JBQXdCO1NBQ3RDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLFlBcEJTLGVBQWU7MkZBc0JkLGFBQWE7a0JBdkJ6QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLGdCQUFnQixDQUFDO3dCQUN0Qzs0QkFDRSxPQUFPLEVBQUUsa0JBQWtCOzRCQUMzQixXQUFXLEVBQUUscUJBQXFCO3lCQUNuQzt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsV0FBVzs0QkFDcEIsV0FBVyxFQUFFLGNBQWM7eUJBQzVCO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxxQkFBcUI7NEJBQzlCLFdBQVcsRUFBRSx3QkFBd0I7eUJBQ3RDO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSwyQkFBMkI7NEJBQ3hDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXV0aEh0dHBIZWFkZXJTZXJ2aWNlLFxuICBBdXRoU2VydmljZSxcbiAgQXV0aFN0b3JhZ2VTZXJ2aWNlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEFzbUxvYWRlck1vZHVsZSB9IGZyb20gJy4vYXNtLWxvYWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgZGVmYXVsdEFzbUNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtYXNtLWNvbmZpZyc7XG5pbXBvcnQgeyBVc2VySWRIdHRwSGVhZGVySW50ZXJjZXB0b3IgfSBmcm9tICcuL2ludGVyY2VwdG9ycy91c2VyLWlkLWh0dHAtaGVhZGVyLmludGVyY2VwdG9yJztcbmltcG9ydCB7IEFzbUF1dGhIdHRwSGVhZGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXNtLWF1dGgtaHR0cC1oZWFkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBc21BdXRoU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2FzbS1hdXRoLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBc21BdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXNtLWF1dGguc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtBc21Mb2FkZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0QXNtQ29uZmlnKSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBdXRoU3RvcmFnZVNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQXV0aFNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogQXNtQXV0aFNlcnZpY2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBdXRoSHR0cEhlYWRlclNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogQXNtQXV0aEh0dHBIZWFkZXJTZXJ2aWNlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogVXNlcklkSHR0cEhlYWRlckludGVyY2VwdG9yLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXNtUm9vdE1vZHVsZSB7fVxuIl19