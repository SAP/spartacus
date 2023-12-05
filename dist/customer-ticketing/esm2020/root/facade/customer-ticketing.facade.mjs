/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CUSTOMER_TICKETING_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class CustomerTicketingFacade {
}
CustomerTicketingFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CustomerTicketingFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CustomerTicketingFacade,
        feature: CUSTOMER_TICKETING_FEATURE,
        methods: [
            'getTicketState',
            'getTicket',
            'getTicketsState',
            'getTickets',
            'createTicketEvent',
            'getTicketCategoriesState',
            'getTicketCategories',
            'getTicketAssociatedObjectsState',
            'getTicketAssociatedObjects',
            'createTicket',
            'uploadAttachment',
            'downloadAttachment',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CustomerTicketingFacade,
                        feature: CUSTOMER_TICKETING_FEATURE,
                        methods: [
                            'getTicketState',
                            'getTicket',
                            'getTicketsState',
                            'getTickets',
                            'createTicketEvent',
                            'getTicketCategoriesState',
                            'getTicketCategories',
                            'getTicketAssociatedObjectsState',
                            'getTicketAssociatedObjects',
                            'createTicket',
                            'uploadAttachment',
                            'downloadAttachment',
                        ],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jdXN0b21lci10aWNrZXRpbmcvcm9vdC9mYWNhZGUvY3VzdG9tZXItdGlja2V0aW5nLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFFNUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBK0I3RCxNQUFNLE9BQWdCLHVCQUF1Qjs7b0hBQXZCLHVCQUF1Qjt3SEFBdkIsdUJBQXVCLGNBckIvQixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLHVCQUF1QjtRQUMvQixPQUFPLEVBQUUsMEJBQTBCO1FBQ25DLE9BQU8sRUFBRTtZQUNQLGdCQUFnQjtZQUNoQixXQUFXO1lBQ1gsaUJBQWlCO1lBQ2pCLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsMEJBQTBCO1lBQzFCLHFCQUFxQjtZQUNyQixpQ0FBaUM7WUFDakMsNEJBQTRCO1lBQzVCLGNBQWM7WUFDZCxrQkFBa0I7WUFDbEIsb0JBQW9CO1NBQ3JCO0tBQ0YsQ0FBQzsyRkFFZ0IsdUJBQXVCO2tCQXRCNUMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQzt3QkFDWixNQUFNLHlCQUF5Qjt3QkFDL0IsT0FBTyxFQUFFLDBCQUEwQjt3QkFDbkMsT0FBTyxFQUFFOzRCQUNQLGdCQUFnQjs0QkFDaEIsV0FBVzs0QkFDWCxpQkFBaUI7NEJBQ2pCLFlBQVk7NEJBQ1osbUJBQW1COzRCQUNuQiwwQkFBMEI7NEJBQzFCLHFCQUFxQjs0QkFDckIsaUNBQWlDOzRCQUNqQyw0QkFBNEI7NEJBQzVCLGNBQWM7NEJBQ2Qsa0JBQWtCOzRCQUNsQixvQkFBb0I7eUJBQ3JCO3FCQUNGLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5LCBRdWVyeVN0YXRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENVU1RPTUVSX1RJQ0tFVElOR19GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7XG4gIEFzc29jaWF0ZWRPYmplY3QsXG4gIENhdGVnb3J5LFxuICBUaWNrZXREZXRhaWxzLFxuICBUaWNrZXRFdmVudCxcbiAgVGlja2V0TGlzdCxcbiAgVGlja2V0U3RhcnRlcixcbn0gZnJvbSAnLi4vbW9kZWwnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IEN1c3RvbWVyVGlja2V0aW5nRmFjYWRlLFxuICAgICAgZmVhdHVyZTogQ1VTVE9NRVJfVElDS0VUSU5HX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdnZXRUaWNrZXRTdGF0ZScsXG4gICAgICAgICdnZXRUaWNrZXQnLFxuICAgICAgICAnZ2V0VGlja2V0c1N0YXRlJyxcbiAgICAgICAgJ2dldFRpY2tldHMnLFxuICAgICAgICAnY3JlYXRlVGlja2V0RXZlbnQnLFxuICAgICAgICAnZ2V0VGlja2V0Q2F0ZWdvcmllc1N0YXRlJyxcbiAgICAgICAgJ2dldFRpY2tldENhdGVnb3JpZXMnLFxuICAgICAgICAnZ2V0VGlja2V0QXNzb2NpYXRlZE9iamVjdHNTdGF0ZScsXG4gICAgICAgICdnZXRUaWNrZXRBc3NvY2lhdGVkT2JqZWN0cycsXG4gICAgICAgICdjcmVhdGVUaWNrZXQnLFxuICAgICAgICAndXBsb2FkQXR0YWNobWVudCcsXG4gICAgICAgICdkb3dubG9hZEF0dGFjaG1lbnQnLFxuICAgICAgXSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdGYWNhZGUge1xuICBhYnN0cmFjdCBnZXRUaWNrZXRTdGF0ZSgpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8VGlja2V0RGV0YWlscyB8IHVuZGVmaW5lZD4+O1xuXG4gIGFic3RyYWN0IGdldFRpY2tldCgpOiBPYnNlcnZhYmxlPFRpY2tldERldGFpbHMgfCB1bmRlZmluZWQ+O1xuXG4gIGFic3RyYWN0IGdldFRpY2tldHNTdGF0ZShcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxuICAgIGN1cnJlbnRQYWdlPzogbnVtYmVyLFxuICAgIHNvcnQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxRdWVyeVN0YXRlPFRpY2tldExpc3QgfCB1bmRlZmluZWQ+PjtcblxuICBhYnN0cmFjdCBnZXRUaWNrZXRzKFxuICAgIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgY3VycmVudFBhZ2U/OiBudW1iZXIsXG4gICAgc29ydD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFRpY2tldExpc3QgfCB1bmRlZmluZWQ+O1xuXG4gIGFic3RyYWN0IGdldFRpY2tldENhdGVnb3JpZXNTdGF0ZSgpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8Q2F0ZWdvcnlbXT4+O1xuXG4gIGFic3RyYWN0IGdldFRpY2tldENhdGVnb3JpZXMoKTogT2JzZXJ2YWJsZTxDYXRlZ29yeVtdPjtcblxuICBhYnN0cmFjdCBnZXRUaWNrZXRBc3NvY2lhdGVkT2JqZWN0c1N0YXRlKCk6IE9ic2VydmFibGU8XG4gICAgUXVlcnlTdGF0ZTxBc3NvY2lhdGVkT2JqZWN0W10+XG4gID47XG5cbiAgYWJzdHJhY3QgZ2V0VGlja2V0QXNzb2NpYXRlZE9iamVjdHMoKTogT2JzZXJ2YWJsZTxBc3NvY2lhdGVkT2JqZWN0W10+O1xuXG4gIGFic3RyYWN0IGNyZWF0ZVRpY2tldCh0aWNrZXQ6IFRpY2tldFN0YXJ0ZXIpOiBPYnNlcnZhYmxlPFRpY2tldERldGFpbHM+O1xuXG4gIGFic3RyYWN0IGNyZWF0ZVRpY2tldEV2ZW50KFxuICAgIHRpY2tldEV2ZW50OiBUaWNrZXRFdmVudCxcbiAgICBjb250YWluc0F0dGFjaG1lbnQ/OiBib29sZWFuXG4gICk6IE9ic2VydmFibGU8VGlja2V0RXZlbnQ+O1xuXG4gIGFic3RyYWN0IHVwbG9hZEF0dGFjaG1lbnQoXG4gICAgZmlsZTogRmlsZSxcbiAgICBldmVudENvZGU6IHN0cmluZyxcbiAgICB0aWNrZXRJZD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHVua25vd24+O1xuXG4gIGFic3RyYWN0IGRvd25sb2FkQXR0YWNobWVudChcbiAgICBldmVudENvZGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBhdHRhY2htZW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZFxuICApOiBPYnNlcnZhYmxlPHVua25vd24+O1xufVxuIl19