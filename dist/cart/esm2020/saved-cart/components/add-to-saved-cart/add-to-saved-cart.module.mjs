/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { AddToSavedCartComponent } from './add-to-saved-cart.component';
import * as i0 from "@angular/core";
export class AddToSavedCartModule {
}
AddToSavedCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToSavedCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AddToSavedCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AddToSavedCartModule, declarations: [AddToSavedCartComponent], imports: [CommonModule, RouterModule, I18nModule, UrlModule], exports: [AddToSavedCartComponent] });
AddToSavedCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToSavedCartModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AddToSavedCartsComponent: {
                    component: AddToSavedCartComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, I18nModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToSavedCartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, I18nModule, UrlModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AddToSavedCartsComponent: {
                                    component: AddToSavedCartComponent,
                                },
                            },
                        }),
                    ],
                    exports: [AddToSavedCartComponent],
                    declarations: [AddToSavedCartComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXRvLXNhdmVkLWNhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvc2F2ZWQtY2FydC9jb21wb25lbnRzL2FkZC10by1zYXZlZC1jYXJ0L2FkZC10by1zYXZlZC1jYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQWdCeEUsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLGlCQUZoQix1QkFBdUIsYUFYNUIsWUFBWSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxhQVVqRCx1QkFBdUI7a0hBR3RCLG9CQUFvQixhQVpwQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYix3QkFBd0IsRUFBRTtvQkFDeEIsU0FBUyxFQUFFLHVCQUF1QjtpQkFDbkM7YUFDRjtTQUNGLENBQUM7S0FDSCxZQVRTLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVM7MkZBYWhELG9CQUFvQjtrQkFkaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUM7b0JBQzVELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHdCQUF3QixFQUFFO29DQUN4QixTQUFTLEVBQUUsdUJBQXVCO2lDQUNuQzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUNsQyxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBBZGRUb1NhdmVkQ2FydENvbXBvbmVudCB9IGZyb20gJy4vYWRkLXRvLXNhdmVkLWNhcnQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBJMThuTW9kdWxlLCBVcmxNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQWRkVG9TYXZlZENhcnRzQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBBZGRUb1NhdmVkQ2FydENvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGV4cG9ydHM6IFtBZGRUb1NhdmVkQ2FydENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW0FkZFRvU2F2ZWRDYXJ0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQWRkVG9TYXZlZENhcnRNb2R1bGUge31cbiJdfQ==