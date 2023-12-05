/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArgsModule } from '@spartacus/asm/core';
import { I18nModule } from '@spartacus/core';
import { StarRatingModule } from '@spartacus/storefront';
import { AsmCustomer360TableComponent } from './asm-customer-360-table.component';
import * as i0 from "@angular/core";
export class AsmCustomer360TableModule {
}
AsmCustomer360TableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360TableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360TableModule, declarations: [AsmCustomer360TableComponent], imports: [CommonModule, I18nModule, ArgsModule, StarRatingModule], exports: [AsmCustomer360TableComponent] });
AsmCustomer360TableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360TableModule, imports: [CommonModule, I18nModule, ArgsModule, StarRatingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360TableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, ArgsModule, StarRatingModule],
                    declarations: [AsmCustomer360TableComponent],
                    exports: [AsmCustomer360TableComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC10YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL2FzbS1jdXN0b21lci0zNjAtdGFibGUvYXNtLWN1c3RvbWVyLTM2MC10YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBT2xGLE1BQU0sT0FBTyx5QkFBeUI7O3NIQUF6Qix5QkFBeUI7dUhBQXpCLHlCQUF5QixpQkFIckIsNEJBQTRCLGFBRGpDLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixhQUV0RCw0QkFBNEI7dUhBRTNCLHlCQUF5QixZQUoxQixZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0I7MkZBSXJELHlCQUF5QjtrQkFMckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDakUsWUFBWSxFQUFFLENBQUMsNEJBQTRCLENBQUM7b0JBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUN4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXJnc01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL2NvcmUnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdGFyUmF0aW5nTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwVGFibGVDb21wb25lbnQgfSBmcm9tICcuL2FzbS1jdXN0b21lci0zNjAtdGFibGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgQXJnc01vZHVsZSwgU3RhclJhdGluZ01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0FzbUN1c3RvbWVyMzYwVGFibGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQXNtQ3VzdG9tZXIzNjBUYWJsZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIEFzbUN1c3RvbWVyMzYwVGFibGVNb2R1bGUge31cbiJdfQ==