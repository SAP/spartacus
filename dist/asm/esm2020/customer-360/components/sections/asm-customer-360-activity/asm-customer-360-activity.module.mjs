/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomer360TableModule } from '../../asm-customer-360-table/asm-customer-360-table.module';
import { AsmCustomer360ActivityComponent } from './asm-customer-360-activity.component';
import * as i0 from "@angular/core";
export class AsmCustomer360ActivityModule {
}
AsmCustomer360ActivityModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ActivityModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityModule, declarations: [AsmCustomer360ActivityComponent], imports: [CommonModule, AsmCustomer360TableModule, I18nModule], exports: [AsmCustomer360ActivityComponent] });
AsmCustomer360ActivityModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityModule, imports: [CommonModule, AsmCustomer360TableModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AsmCustomer360TableModule, I18nModule],
                    declarations: [AsmCustomer360ActivityComponent],
                    exports: [AsmCustomer360ActivityComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1hY3Rpdml0eS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtYWN0aXZpdHkvYXNtLWN1c3RvbWVyLTM2MC1hY3Rpdml0eS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFPeEYsTUFBTSxPQUFPLDRCQUE0Qjs7eUhBQTVCLDRCQUE0QjswSEFBNUIsNEJBQTRCLGlCQUh4QiwrQkFBK0IsYUFEcEMsWUFBWSxFQUFFLHlCQUF5QixFQUFFLFVBQVUsYUFFbkQsK0JBQStCOzBIQUU5Qiw0QkFBNEIsWUFKN0IsWUFBWSxFQUFFLHlCQUF5QixFQUFFLFVBQVU7MkZBSWxELDRCQUE0QjtrQkFMeEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLEVBQUUsVUFBVSxDQUFDO29CQUM5RCxZQUFZLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztvQkFDL0MsT0FBTyxFQUFFLENBQUMsK0JBQStCLENBQUM7aUJBQzNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwVGFibGVNb2R1bGUgfSBmcm9tICcuLi8uLi9hc20tY3VzdG9tZXItMzYwLXRhYmxlL2FzbS1jdXN0b21lci0zNjAtdGFibGUubW9kdWxlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwQWN0aXZpdHlDb21wb25lbnQgfSBmcm9tICcuL2FzbS1jdXN0b21lci0zNjAtYWN0aXZpdHkuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQXNtQ3VzdG9tZXIzNjBUYWJsZU1vZHVsZSwgSTE4bk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0FzbUN1c3RvbWVyMzYwQWN0aXZpdHlDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQXNtQ3VzdG9tZXIzNjBBY3Rpdml0eUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIEFzbUN1c3RvbWVyMzYwQWN0aXZpdHlNb2R1bGUge31cbiJdfQ==