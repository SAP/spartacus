/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomer360ProductListingModule } from '../../asm-customer-360-product-listing/asm-customer-360-product-listing.module';
import { AsmCustomer360ProductInterestsComponent } from './asm-customer-360-product-interests.component';
import * as i0 from "@angular/core";
export class AsmCustomer360ProductInterestsModule {
}
AsmCustomer360ProductInterestsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductInterestsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ProductInterestsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductInterestsModule, declarations: [AsmCustomer360ProductInterestsComponent], imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule], exports: [AsmCustomer360ProductInterestsComponent] });
AsmCustomer360ProductInterestsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductInterestsModule, imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductInterestsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule],
                    declarations: [AsmCustomer360ProductInterestsComponent],
                    exports: [AsmCustomer360ProductInterestsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1wcm9kdWN0LWludGVyZXN0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1pbnRlcmVzdHMvYXNtLWN1c3RvbWVyLTM2MC1wcm9kdWN0LWludGVyZXN0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUNwSSxPQUFPLEVBQUUsdUNBQXVDLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQzs7QUFPekcsTUFBTSxPQUFPLG9DQUFvQzs7aUlBQXBDLG9DQUFvQztrSUFBcEMsb0NBQW9DLGlCQUhoQyx1Q0FBdUMsYUFENUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxrQ0FBa0MsYUFFNUQsdUNBQXVDO2tJQUV0QyxvQ0FBb0MsWUFKckMsWUFBWSxFQUFFLFVBQVUsRUFBRSxrQ0FBa0M7MkZBSTNELG9DQUFvQztrQkFMaEQsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGtDQUFrQyxDQUFDO29CQUN2RSxZQUFZLEVBQUUsQ0FBQyx1Q0FBdUMsQ0FBQztvQkFDdkQsT0FBTyxFQUFFLENBQUMsdUNBQXVDLENBQUM7aUJBQ25EIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBQcm9kdWN0TGlzdGluZ01vZHVsZSB9IGZyb20gJy4uLy4uL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1saXN0aW5nL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1saXN0aW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFByb2R1Y3RJbnRlcmVzdHNDb21wb25lbnQgfSBmcm9tICcuL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1pbnRlcmVzdHMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgQXNtQ3VzdG9tZXIzNjBQcm9kdWN0TGlzdGluZ01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0FzbUN1c3RvbWVyMzYwUHJvZHVjdEludGVyZXN0c0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtBc21DdXN0b21lcjM2MFByb2R1Y3RJbnRlcmVzdHNDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBc21DdXN0b21lcjM2MFByb2R1Y3RJbnRlcmVzdHNNb2R1bGUge31cbiJdfQ==