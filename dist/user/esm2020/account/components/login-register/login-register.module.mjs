/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, NotAuthGuard, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { PageSlotModule } from '@spartacus/storefront';
import { LoginRegisterComponent } from './login-register.component';
import * as i0 from "@angular/core";
export class LoginRegisterModule {
}
LoginRegisterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRegisterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LoginRegisterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: LoginRegisterModule, declarations: [LoginRegisterComponent], imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule] });
LoginRegisterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRegisterModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturningCustomerRegisterComponent: {
                    component: LoginRegisterComponent,
                    guards: [NotAuthGuard],
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginRegisterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturningCustomerRegisterComponent: {
                                    component: LoginRegisterComponent,
                                    guards: [NotAuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [LoginRegisterComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tcmVnaXN0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvYWNjb3VudC9jb21wb25lbnRzL2xvZ2luLXJlZ2lzdGVyL2xvZ2luLXJlZ2lzdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxVQUFVLEVBQ1YsWUFBWSxFQUNaLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBZ0JwRSxNQUFNLE9BQU8sbUJBQW1COztnSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUIsaUJBRmYsc0JBQXNCLGFBWDNCLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxVQUFVO2lIQWFoRSxtQkFBbUIsYUFabkI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isa0NBQWtDLEVBQUU7b0JBQ2xDLFNBQVMsRUFBRSxzQkFBc0I7b0JBQ2pDLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDdkI7YUFDRjtTQUNGLENBQUM7S0FDSCxZQVZTLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxVQUFVOzJGQWFoRSxtQkFBbUI7a0JBZC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztvQkFDNUUsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isa0NBQWtDLEVBQUU7b0NBQ2xDLFNBQVMsRUFBRSxzQkFBc0I7b0NBQ2pDLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQztpQ0FDdkI7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIE5vdEF1dGhHdWFyZCxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBhZ2VTbG90TW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IExvZ2luUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tICcuL2xvZ2luLXJlZ2lzdGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZSwgVXJsTW9kdWxlLCBQYWdlU2xvdE1vZHVsZSwgSTE4bk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBSZXR1cm5pbmdDdXN0b21lclJlZ2lzdGVyQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBMb2dpblJlZ2lzdGVyQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW05vdEF1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtMb2dpblJlZ2lzdGVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5SZWdpc3Rlck1vZHVsZSB7fVxuIl19