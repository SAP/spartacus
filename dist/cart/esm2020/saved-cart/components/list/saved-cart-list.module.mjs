/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { ListNavigationModule, SpinnerModule } from '@spartacus/storefront';
import { SavedCartListComponent } from './saved-cart-list.component';
import * as i0 from "@angular/core";
export class SavedCartListModule {
}
SavedCartListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartListModule, declarations: [SavedCartListComponent], imports: [CommonModule,
        UrlModule,
        RouterModule,
        ListNavigationModule,
        I18nModule,
        SpinnerModule], exports: [SavedCartListComponent] });
SavedCartListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartListModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountSavedCartHistoryComponent: {
                    component: SavedCartListComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        UrlModule,
        RouterModule,
        ListNavigationModule,
        I18nModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        UrlModule,
                        RouterModule,
                        ListNavigationModule,
                        I18nModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountSavedCartHistoryComponent: {
                                    component: SavedCartListComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [SavedCartListComponent],
                    exports: [SavedCartListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3NhdmVkLWNhcnQvY29tcG9uZW50cy9saXN0L3NhdmVkLWNhcnQtbGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQXdCckUsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLGlCQUhmLHNCQUFzQixhQWpCbkMsWUFBWTtRQUNaLFNBQVM7UUFDVCxZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLFVBQVU7UUFDVixhQUFhLGFBYUwsc0JBQXNCO2lIQUVyQixtQkFBbUIsYUFibkI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsZ0NBQWdDLEVBQUU7b0JBQ2hDLFNBQVMsRUFBRSxzQkFBc0I7b0JBQ2pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDcEI7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWhCQyxZQUFZO1FBQ1osU0FBUztRQUNULFlBQVk7UUFDWixvQkFBb0I7UUFDcEIsVUFBVTtRQUNWLGFBQWE7MkZBZUosbUJBQW1CO2tCQXRCL0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixTQUFTO3dCQUNULFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixVQUFVO3dCQUNWLGFBQWE7cUJBQ2Q7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsZ0NBQWdDLEVBQUU7b0NBQ2hDLFNBQVMsRUFBRSxzQkFBc0I7b0NBQ2pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQ0FDcEI7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMaXN0TmF2aWdhdGlvbk1vZHVsZSwgU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBTYXZlZENhcnRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9zYXZlZC1jYXJ0LWxpc3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIExpc3ROYXZpZ2F0aW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIEFjY291bnRTYXZlZENhcnRIaXN0b3J5Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBTYXZlZENhcnRMaXN0Q29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtTYXZlZENhcnRMaXN0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1NhdmVkQ2FydExpc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBTYXZlZENhcnRMaXN0TW9kdWxlIHt9XG4iXX0=