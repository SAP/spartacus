/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, IconModule, ListNavigationModule, SpinnerModule, } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CustomerTicketingListComponent } from './customer-ticketing-list.component';
import { CustomerTicketingCreateModule } from '../customer-ticketing-create/customer-ticketing-create.module';
import * as i0 from "@angular/core";
export class CustomerTicketingListModule {
}
CustomerTicketingListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingListModule, declarations: [CustomerTicketingListComponent], imports: [CustomerTicketingCreateModule,
        CommonModule,
        I18nModule,
        UrlModule,
        CardModule,
        IconModule,
        ListNavigationModule,
        RouterModule,
        SpinnerModule], exports: [CustomerTicketingListComponent] });
CustomerTicketingListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingListModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SupportTicketHistoryComponent: {
                    component: CustomerTicketingListComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CustomerTicketingCreateModule,
        CommonModule,
        I18nModule,
        UrlModule,
        CardModule,
        IconModule,
        ListNavigationModule,
        RouterModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CustomerTicketingCreateModule,
                        CommonModule,
                        I18nModule,
                        UrlModule,
                        CardModule,
                        IconModule,
                        ListNavigationModule,
                        RouterModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SupportTicketHistoryComponent: {
                                    component: CustomerTicketingListComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CustomerTicketingListComponent],
                    exports: [CustomerTicketingListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLWxpc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2N1c3RvbWVyLXRpY2tldGluZy9jb21wb25lbnRzL2xpc3QvY3VzdG9tZXItdGlja2V0aW5nLWxpc3QvY3VzdG9tZXItdGlja2V0aW5nLWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsVUFBVSxFQUNWLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQzs7QUEyQjlHLE1BQU0sT0FBTywyQkFBMkI7O3dIQUEzQiwyQkFBMkI7eUhBQTNCLDJCQUEyQixpQkFIdkIsOEJBQThCLGFBcEIzQyw2QkFBNkI7UUFDN0IsWUFBWTtRQUNaLFVBQVU7UUFDVixTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7UUFDVixvQkFBb0I7UUFDcEIsWUFBWTtRQUNaLGFBQWEsYUFhTCw4QkFBOEI7eUhBRTdCLDJCQUEyQixhQWIzQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYiw2QkFBNkIsRUFBRTtvQkFDN0IsU0FBUyxFQUFFLDhCQUE4QjtvQkFDekMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBbkJDLDZCQUE2QjtRQUM3QixZQUFZO1FBQ1osVUFBVTtRQUNWLFNBQVM7UUFDVCxVQUFVO1FBQ1YsVUFBVTtRQUNWLG9CQUFvQjtRQUNwQixZQUFZO1FBQ1osYUFBYTsyRkFlSiwyQkFBMkI7a0JBekJ2QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCw2QkFBNkI7d0JBQzdCLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixvQkFBb0I7d0JBQ3BCLFlBQVk7d0JBQ1osYUFBYTtxQkFDZDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYiw2QkFBNkIsRUFBRTtvQ0FDN0IsU0FBUyxFQUFFLDhCQUE4QjtvQ0FDekMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lDQUNwQjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLDhCQUE4QixDQUFDO29CQUM5QyxPQUFPLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztpQkFDMUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENhcmRNb2R1bGUsXG4gIEljb25Nb2R1bGUsXG4gIExpc3ROYXZpZ2F0aW9uTW9kdWxlLFxuICBTcGlubmVyTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQ21zQ29uZmlnLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tZXJUaWNrZXRpbmdMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jdXN0b21lci10aWNrZXRpbmctbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VzdG9tZXJUaWNrZXRpbmdDcmVhdGVNb2R1bGUgfSBmcm9tICcuLi9jdXN0b21lci10aWNrZXRpbmctY3JlYXRlL2N1c3RvbWVyLXRpY2tldGluZy1jcmVhdGUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEN1c3RvbWVyVGlja2V0aW5nQ3JlYXRlTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgTGlzdE5hdmlnYXRpb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBTdXBwb3J0VGlja2V0SGlzdG9yeUNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ3VzdG9tZXJUaWNrZXRpbmdMaXN0Q29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDdXN0b21lclRpY2tldGluZ0xpc3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ3VzdG9tZXJUaWNrZXRpbmdMaXN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdMaXN0TW9kdWxlIHt9XG4iXX0=