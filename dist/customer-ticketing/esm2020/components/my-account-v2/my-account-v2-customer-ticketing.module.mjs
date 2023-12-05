/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig, AuthGuard, I18nModule, UrlModule, } from '@spartacus/core';
import { MyAccountV2CustomerTicketingComponent } from './my-account-v2-customer-ticketing.component';
import { SpinnerModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class MyAccountV2CustomerTicketingModule {
}
MyAccountV2CustomerTicketingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2CustomerTicketingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyAccountV2CustomerTicketingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2CustomerTicketingModule, declarations: [MyAccountV2CustomerTicketingComponent], imports: [CommonModule, I18nModule, UrlModule, SpinnerModule, RouterModule], exports: [MyAccountV2CustomerTicketingComponent] });
MyAccountV2CustomerTicketingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2CustomerTicketingModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MyAccountViewRequestsComponent: {
                    component: MyAccountV2CustomerTicketingComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, UrlModule, SpinnerModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2CustomerTicketingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MyAccountV2CustomerTicketingComponent],
                    exports: [MyAccountV2CustomerTicketingComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MyAccountViewRequestsComponent: {
                                    component: MyAccountV2CustomerTicketingComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    imports: [CommonModule, I18nModule, UrlModule, SpinnerModule, RouterModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktYWNjb3VudC12Mi1jdXN0b21lci10aWNrZXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2N1c3RvbWVyLXRpY2tldGluZy9jb21wb25lbnRzL215LWFjY291bnQtdjIvbXktYWNjb3VudC12Mi1jdXN0b21lci10aWNrZXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxvQkFBb0IsRUFFcEIsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNyRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFpQi9DLE1BQU0sT0FBTyxrQ0FBa0M7OytIQUFsQyxrQ0FBa0M7Z0lBQWxDLGtDQUFrQyxpQkFkOUIscUNBQXFDLGFBWTFDLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxZQUFZLGFBWGhFLHFDQUFxQztnSUFhcEMsa0NBQWtDLGFBWmxDO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLDhCQUE4QixFQUFFO29CQUM5QixTQUFTLEVBQUUscUNBQXFDO29CQUNoRCxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFDUyxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsWUFBWTsyRkFFL0Qsa0NBQWtDO2tCQWY5QyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHFDQUFxQyxDQUFDO29CQUNyRCxPQUFPLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztvQkFDaEQsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsOEJBQThCLEVBQUU7b0NBQzlCLFNBQVMsRUFBRSxxQ0FBcUM7b0NBQ2hELE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQ0FDcEI7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDO2lCQUM1RSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgQ21zQ29uZmlnLFxuICBBdXRoR3VhcmQsXG4gIEkxOG5Nb2R1bGUsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE15QWNjb3VudFYyQ3VzdG9tZXJUaWNrZXRpbmdDb21wb25lbnQgfSBmcm9tICcuL215LWFjY291bnQtdjItY3VzdG9tZXItdGlja2V0aW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTcGlubmVyTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtNeUFjY291bnRWMkN1c3RvbWVyVGlja2V0aW5nQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW015QWNjb3VudFYyQ3VzdG9tZXJUaWNrZXRpbmdDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgTXlBY2NvdW50Vmlld1JlcXVlc3RzQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBNeUFjY291bnRWMkN1c3RvbWVyVGlja2V0aW5nQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJMThuTW9kdWxlLCBVcmxNb2R1bGUsIFNwaW5uZXJNb2R1bGUsIFJvdXRlck1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE15QWNjb3VudFYyQ3VzdG9tZXJUaWNrZXRpbmdNb2R1bGUge31cbiJdfQ==