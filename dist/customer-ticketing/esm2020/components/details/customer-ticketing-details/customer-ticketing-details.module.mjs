/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CustomerTicketingDetailsComponent } from './customer-ticketing-details.component';
import * as i0 from "@angular/core";
export class CustomerTicketingDetailsModule {
}
CustomerTicketingDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDetailsModule, declarations: [CustomerTicketingDetailsComponent], imports: [CommonModule, I18nModule, UrlModule, CardModule, SpinnerModule], exports: [CustomerTicketingDetailsComponent] });
CustomerTicketingDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDetailsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SupportTicketDetailsComponent: {
                    component: CustomerTicketingDetailsComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, UrlModule, CardModule, SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, UrlModule, CardModule, SpinnerModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SupportTicketDetailsComponent: {
                                    component: CustomerTicketingDetailsComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CustomerTicketingDetailsComponent],
                    exports: [CustomerTicketingDetailsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLWRldGFpbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2N1c3RvbWVyLXRpY2tldGluZy9jb21wb25lbnRzL2RldGFpbHMvY3VzdG9tZXItdGlja2V0aW5nLWRldGFpbHMvY3VzdG9tZXItdGlja2V0aW5nLWRldGFpbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFpQjNGLE1BQU0sT0FBTyw4QkFBOEI7OzJIQUE5Qiw4QkFBOEI7NEhBQTlCLDhCQUE4QixpQkFIMUIsaUNBQWlDLGFBWHRDLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxhQUFhLGFBWTlELGlDQUFpQzs0SEFFaEMsOEJBQThCLGFBYjlCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLDZCQUE2QixFQUFFO29CQUM3QixTQUFTLEVBQUUsaUNBQWlDO29CQUM1QyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFWUyxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsYUFBYTsyRkFjN0QsOEJBQThCO2tCQWYxQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7b0JBQ3pFLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLDZCQUE2QixFQUFFO29DQUM3QixTQUFTLEVBQUUsaUNBQWlDO29DQUM1QyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUNBQ3BCOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsaUNBQWlDLENBQUM7b0JBQ2pELE9BQU8sRUFBRSxDQUFDLGlDQUFpQyxDQUFDO2lCQUM3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2FyZE1vZHVsZSwgU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEN1c3RvbWVyVGlja2V0aW5nRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY3VzdG9tZXItdGlja2V0aW5nLWRldGFpbHMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgVXJsTW9kdWxlLCBDYXJkTW9kdWxlLCBTcGlubmVyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFN1cHBvcnRUaWNrZXREZXRhaWxzQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDdXN0b21lclRpY2tldGluZ0RldGFpbHNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0N1c3RvbWVyVGlja2V0aW5nRGV0YWlsc0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDdXN0b21lclRpY2tldGluZ0RldGFpbHNDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lclRpY2tldGluZ0RldGFpbHNNb2R1bGUge31cbiJdfQ==