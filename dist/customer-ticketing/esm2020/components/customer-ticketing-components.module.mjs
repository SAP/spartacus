/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketingCloseModule } from './details/customer-ticketing-close';
import { CustomerTicketingCreateModule } from './list/customer-ticketing-create';
import { defaultCustomerTicketingFormLayoutConfig } from './shared/customer-ticketing-dialog';
import { CustomerTicketingListModule } from './list/customer-ticketing-list';
import { CustomerTicketingDetailsModule } from './details/customer-ticketing-details';
import { CustomerTicketingReopenModule } from './details/customer-ticketing-reopen';
import { CustomerTicketingMessagesModule } from './details/customer-ticketing-messages';
import { MyAccountV2CustomerTicketingModule } from './my-account-v2';
import * as i0 from "@angular/core";
export class CustomerTicketingComponentsModule {
}
CustomerTicketingComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingComponentsModule, imports: [ReactiveFormsModule,
        FormErrorsModule,
        CustomerTicketingDetailsModule,
        CustomerTicketingCloseModule,
        CustomerTicketingReopenModule,
        CustomerTicketingListModule,
        CustomerTicketingMessagesModule,
        CustomerTicketingCreateModule,
        MyAccountV2CustomerTicketingModule] });
CustomerTicketingComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingComponentsModule, providers: [provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig)], imports: [ReactiveFormsModule,
        FormErrorsModule,
        CustomerTicketingDetailsModule,
        CustomerTicketingCloseModule,
        CustomerTicketingReopenModule,
        CustomerTicketingListModule,
        CustomerTicketingMessagesModule,
        CustomerTicketingCreateModule,
        MyAccountV2CustomerTicketingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ReactiveFormsModule,
                        FormErrorsModule,
                        CustomerTicketingDetailsModule,
                        CustomerTicketingCloseModule,
                        CustomerTicketingReopenModule,
                        CustomerTicketingListModule,
                        CustomerTicketingMessagesModule,
                        CustomerTicketingCreateModule,
                        MyAccountV2CustomerTicketingModule,
                    ],
                    providers: [provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2N1c3RvbWVyLXRpY2tldGluZy9jb21wb25lbnRzL2N1c3RvbWVyLXRpY2tldGluZy1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0NBQXdDLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RixPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFnQnJFLE1BQU0sT0FBTyxpQ0FBaUM7OzhIQUFqQyxpQ0FBaUM7K0hBQWpDLGlDQUFpQyxZQVoxQyxtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLDhCQUE4QjtRQUM5Qiw0QkFBNEI7UUFDNUIsNkJBQTZCO1FBQzdCLDJCQUEyQjtRQUMzQiwrQkFBK0I7UUFDL0IsNkJBQTZCO1FBQzdCLGtDQUFrQzsrSEFJekIsaUNBQWlDLGFBRmpDLENBQUMsb0JBQW9CLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxZQVZ6RSxtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLDhCQUE4QjtRQUM5Qiw0QkFBNEI7UUFDNUIsNkJBQTZCO1FBQzdCLDJCQUEyQjtRQUMzQiwrQkFBK0I7UUFDL0IsNkJBQTZCO1FBQzdCLGtDQUFrQzsyRkFJekIsaUNBQWlDO2tCQWQ3QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsOEJBQThCO3dCQUM5Qiw0QkFBNEI7d0JBQzVCLDZCQUE2Qjt3QkFDN0IsMkJBQTJCO3dCQUMzQiwrQkFBK0I7d0JBQy9CLDZCQUE2Qjt3QkFDN0Isa0NBQWtDO3FCQUNuQztvQkFDRCxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO2lCQUM1RSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUVycm9yc01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDdXN0b21lclRpY2tldGluZ0Nsb3NlTW9kdWxlIH0gZnJvbSAnLi9kZXRhaWxzL2N1c3RvbWVyLXRpY2tldGluZy1jbG9zZSc7XG5pbXBvcnQgeyBDdXN0b21lclRpY2tldGluZ0NyZWF0ZU1vZHVsZSB9IGZyb20gJy4vbGlzdC9jdXN0b21lci10aWNrZXRpbmctY3JlYXRlJztcbmltcG9ydCB7IGRlZmF1bHRDdXN0b21lclRpY2tldGluZ0Zvcm1MYXlvdXRDb25maWcgfSBmcm9tICcuL3NoYXJlZC9jdXN0b21lci10aWNrZXRpbmctZGlhbG9nJztcbmltcG9ydCB7IEN1c3RvbWVyVGlja2V0aW5nTGlzdE1vZHVsZSB9IGZyb20gJy4vbGlzdC9jdXN0b21lci10aWNrZXRpbmctbGlzdCc7XG5pbXBvcnQgeyBDdXN0b21lclRpY2tldGluZ0RldGFpbHNNb2R1bGUgfSBmcm9tICcuL2RldGFpbHMvY3VzdG9tZXItdGlja2V0aW5nLWRldGFpbHMnO1xuaW1wb3J0IHsgQ3VzdG9tZXJUaWNrZXRpbmdSZW9wZW5Nb2R1bGUgfSBmcm9tICcuL2RldGFpbHMvY3VzdG9tZXItdGlja2V0aW5nLXJlb3Blbic7XG5pbXBvcnQgeyBDdXN0b21lclRpY2tldGluZ01lc3NhZ2VzTW9kdWxlIH0gZnJvbSAnLi9kZXRhaWxzL2N1c3RvbWVyLXRpY2tldGluZy1tZXNzYWdlcyc7XG5pbXBvcnQgeyBNeUFjY291bnRWMkN1c3RvbWVyVGlja2V0aW5nTW9kdWxlIH0gZnJvbSAnLi9teS1hY2NvdW50LXYyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBDdXN0b21lclRpY2tldGluZ0RldGFpbHNNb2R1bGUsXG4gICAgQ3VzdG9tZXJUaWNrZXRpbmdDbG9zZU1vZHVsZSxcbiAgICBDdXN0b21lclRpY2tldGluZ1Jlb3Blbk1vZHVsZSxcbiAgICBDdXN0b21lclRpY2tldGluZ0xpc3RNb2R1bGUsXG4gICAgQ3VzdG9tZXJUaWNrZXRpbmdNZXNzYWdlc01vZHVsZSxcbiAgICBDdXN0b21lclRpY2tldGluZ0NyZWF0ZU1vZHVsZSxcbiAgICBNeUFjY291bnRWMkN1c3RvbWVyVGlja2V0aW5nTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q3VzdG9tZXJUaWNrZXRpbmdGb3JtTGF5b3V0Q29uZmlnKV0sXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyVGlja2V0aW5nQ29tcG9uZW50c01vZHVsZSB7fVxuIl19