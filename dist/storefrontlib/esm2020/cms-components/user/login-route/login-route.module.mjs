/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent, PageLayoutModule, } from '../../../cms-structure/page/index';
import { LoginGuard } from './login.guard';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
/**
 * This module enables to quickly switch from Resource Owner Password Flow
 * to Implicit Flow or Authorization Code Flow. The `login` route in this case will be
 * responsible for initalizing the redirect to OAuth server to login.
 *
 * Instead of manually invoking OAuth redirect you only have to redirect to `login` page.
 */
export class LoginRouteModule {
}
LoginRouteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRouteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LoginRouteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: LoginRouteModule, imports: [PageLayoutModule, i1.RouterModule] });
LoginRouteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRouteModule, imports: [PageLayoutModule,
        RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [LoginGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'login' },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRouteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        PageLayoutModule,
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [LoginGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'login' },
                            },
                        ]),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tcm91dGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy91c2VyL2xvZ2luLXJvdXRlL2xvZ2luLXJvdXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixnQkFBZ0IsR0FDakIsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFFM0M7Ozs7OztHQU1HO0FBZUgsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLFlBWnpCLGdCQUFnQjs4R0FZUCxnQkFBZ0IsWUFaekIsZ0JBQWdCO1FBQ2hCLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDcEI7Z0JBQ0UsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3pCLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7YUFDM0I7U0FDRixDQUFDOzJGQUdPLGdCQUFnQjtrQkFkNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3dCQUNoQixZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNwQjtnQ0FDRSxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQ0FDekIsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTs2QkFDM0I7eUJBQ0YsQ0FBQztxQkFDSDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgUGFnZUxheW91dENvbXBvbmVudCxcbiAgUGFnZUxheW91dE1vZHVsZSxcbn0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9wYWdlL2luZGV4JztcbmltcG9ydCB7IExvZ2luR3VhcmQgfSBmcm9tICcuL2xvZ2luLmd1YXJkJztcblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBlbmFibGVzIHRvIHF1aWNrbHkgc3dpdGNoIGZyb20gUmVzb3VyY2UgT3duZXIgUGFzc3dvcmQgRmxvd1xuICogdG8gSW1wbGljaXQgRmxvdyBvciBBdXRob3JpemF0aW9uIENvZGUgRmxvdy4gVGhlIGBsb2dpbmAgcm91dGUgaW4gdGhpcyBjYXNlIHdpbGwgYmVcbiAqIHJlc3BvbnNpYmxlIGZvciBpbml0YWxpemluZyB0aGUgcmVkaXJlY3QgdG8gT0F1dGggc2VydmVyIHRvIGxvZ2luLlxuICpcbiAqIEluc3RlYWQgb2YgbWFudWFsbHkgaW52b2tpbmcgT0F1dGggcmVkaXJlY3QgeW91IG9ubHkgaGF2ZSB0byByZWRpcmVjdCB0byBgbG9naW5gIHBhZ2UuXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBQYWdlTGF5b3V0TW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtMb2dpbkd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdsb2dpbicgfSxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luUm91dGVNb2R1bGUge31cbiJdfQ==