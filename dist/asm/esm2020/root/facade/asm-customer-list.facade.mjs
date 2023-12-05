/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ASM_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class AsmCustomerListFacade {
}
AsmCustomerListFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomerListFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: AsmCustomerListFacade,
        feature: ASM_FEATURE,
        methods: [
            'getCustomerLists',
            'getCustomerListsState',
            'customerListCustomersSearch',
            'getCustomerListCustomersSearchResults',
            'getCustomerListCustomersSearchResultsLoading',
            'customerListCustomersSearchReset',
            'getCustomerListCustomersSearchResultsError',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: AsmCustomerListFacade,
                        feature: ASM_FEATURE,
                        methods: [
                            'getCustomerLists',
                            'getCustomerListsState',
                            'customerListCustomersSearch',
                            'getCustomerListCustomersSearchResults',
                            'getCustomerListCustomersSearchResultsLoading',
                            'customerListCustomersSearchReset',
                            'getCustomerListCustomersSearchResultsError',
                        ],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLWxpc3QuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9yb290L2ZhY2FkZS9hc20tY3VzdG9tZXItbGlzdC5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLGlCQUFpQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFxQjlDLE1BQU0sT0FBZ0IscUJBQXFCOztrSEFBckIscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FoQjdCLE1BQU0sY0FDTixHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7UUFDWixNQUFNLEVBQUUscUJBQXFCO1FBQzdCLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE9BQU8sRUFBRTtZQUNQLGtCQUFrQjtZQUNsQix1QkFBdUI7WUFDdkIsNkJBQTZCO1lBQzdCLHVDQUF1QztZQUN2Qyw4Q0FBOEM7WUFDOUMsa0NBQWtDO1lBQ2xDLDRDQUE0QztTQUM3QztLQUNGLENBQUM7MkZBRWdCLHFCQUFxQjtrQkFqQjFDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7d0JBQ1osTUFBTSx1QkFBdUI7d0JBQzdCLE9BQU8sRUFBRSxXQUFXO3dCQUNwQixPQUFPLEVBQUU7NEJBQ1Asa0JBQWtCOzRCQUNsQix1QkFBdUI7NEJBQ3ZCLDZCQUE2Qjs0QkFDN0IsdUNBQXVDOzRCQUN2Qyw4Q0FBOEM7NEJBQzlDLGtDQUFrQzs0QkFDbEMsNENBQTRDO3lCQUM3QztxQkFDRixDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmFjYWRlRmFjdG9yeSwgUXVlcnlTdGF0ZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBU01fRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBDdXN0b21lclNlYXJjaE9wdGlvbnMsIEN1c3RvbWVyU2VhcmNoUGFnZSB9IGZyb20gJy4uL21vZGVsL2FzbS5tb2RlbHMnO1xuaW1wb3J0IHsgQ3VzdG9tZXJMaXN0c1BhZ2UgfSBmcm9tICcuLi9tb2RlbC9jdXN0b21lci1saXN0Lm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IEFzbUN1c3RvbWVyTGlzdEZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IEFTTV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogW1xuICAgICAgICAnZ2V0Q3VzdG9tZXJMaXN0cycsXG4gICAgICAgICdnZXRDdXN0b21lckxpc3RzU3RhdGUnLFxuICAgICAgICAnY3VzdG9tZXJMaXN0Q3VzdG9tZXJzU2VhcmNoJyxcbiAgICAgICAgJ2dldEN1c3RvbWVyTGlzdEN1c3RvbWVyc1NlYXJjaFJlc3VsdHMnLFxuICAgICAgICAnZ2V0Q3VzdG9tZXJMaXN0Q3VzdG9tZXJzU2VhcmNoUmVzdWx0c0xvYWRpbmcnLFxuICAgICAgICAnY3VzdG9tZXJMaXN0Q3VzdG9tZXJzU2VhcmNoUmVzZXQnLFxuICAgICAgICAnZ2V0Q3VzdG9tZXJMaXN0Q3VzdG9tZXJzU2VhcmNoUmVzdWx0c0Vycm9yJyxcbiAgICAgIF0sXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFzbUN1c3RvbWVyTGlzdEZhY2FkZSB7XG4gIGFic3RyYWN0IGdldEN1c3RvbWVyTGlzdHMoKTogT2JzZXJ2YWJsZTxDdXN0b21lckxpc3RzUGFnZSB8IHVuZGVmaW5lZD47XG4gIGFic3RyYWN0IGdldEN1c3RvbWVyTGlzdHNTdGF0ZSgpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8Q3VzdG9tZXJMaXN0c1BhZ2U+PjtcbiAgYWJzdHJhY3QgY3VzdG9tZXJMaXN0Q3VzdG9tZXJzU2VhcmNoKG9wdGlvbnM6IEN1c3RvbWVyU2VhcmNoT3B0aW9ucyk6IHZvaWQ7XG4gIGFic3RyYWN0IGdldEN1c3RvbWVyTGlzdEN1c3RvbWVyc1NlYXJjaFJlc3VsdHMoKTogT2JzZXJ2YWJsZTxDdXN0b21lclNlYXJjaFBhZ2U+O1xuICBhYnN0cmFjdCBnZXRDdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXN1bHRzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBhYnN0cmFjdCBjdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXNldCgpOiB2b2lkO1xuICBhYnN0cmFjdCBnZXRDdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXN1bHRzRXJyb3IoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcbn1cbiJdfQ==