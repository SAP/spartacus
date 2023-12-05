/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { AsmCustomer360ProductItemModule } from '../asm-customer-360-product-item/asm-customer-360-product-item.module';
import { AsmCustomer360ProductListingComponent } from './asm-customer-360-product-listing.component';
import * as i0 from "@angular/core";
export class AsmCustomer360ProductListingModule {
}
AsmCustomer360ProductListingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductListingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ProductListingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductListingModule, declarations: [AsmCustomer360ProductListingComponent], imports: [CommonModule,
        I18nModule,
        MediaModule,
        AsmCustomer360ProductItemModule], exports: [AsmCustomer360ProductListingComponent] });
AsmCustomer360ProductListingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductListingModule, imports: [CommonModule,
        I18nModule,
        MediaModule,
        AsmCustomer360ProductItemModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductListingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        MediaModule,
                        AsmCustomer360ProductItemModule,
                    ],
                    declarations: [AsmCustomer360ProductListingComponent],
                    exports: [AsmCustomer360ProductListingComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1wcm9kdWN0LWxpc3RpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jdXN0b21lci0zNjAvY29tcG9uZW50cy9hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtbGlzdGluZy9hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtbGlzdGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUVBQXVFLENBQUM7QUFFeEgsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sOENBQThDLENBQUM7O0FBWXJHLE1BQU0sT0FBTyxrQ0FBa0M7OytIQUFsQyxrQ0FBa0M7Z0lBQWxDLGtDQUFrQyxpQkFIOUIscUNBQXFDLGFBTGxELFlBQVk7UUFDWixVQUFVO1FBQ1YsV0FBVztRQUNYLCtCQUErQixhQUd2QixxQ0FBcUM7Z0lBRXBDLGtDQUFrQyxZQVIzQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFdBQVc7UUFDWCwrQkFBK0I7MkZBS3RCLGtDQUFrQztrQkFWOUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsK0JBQStCO3FCQUNoQztvQkFDRCxZQUFZLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztvQkFDckQsT0FBTyxFQUFFLENBQUMscUNBQXFDLENBQUM7aUJBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE1lZGlhTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwUHJvZHVjdEl0ZW1Nb2R1bGUgfSBmcm9tICcuLi9hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtaXRlbS9hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtaXRlbS5tb2R1bGUnO1xuXG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFByb2R1Y3RMaXN0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi9hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtbGlzdGluZy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgTWVkaWFNb2R1bGUsXG4gICAgQXNtQ3VzdG9tZXIzNjBQcm9kdWN0SXRlbU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQXNtQ3VzdG9tZXIzNjBQcm9kdWN0TGlzdGluZ0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtBc21DdXN0b21lcjM2MFByb2R1Y3RMaXN0aW5nQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQXNtQ3VzdG9tZXIzNjBQcm9kdWN0TGlzdGluZ01vZHVsZSB7fVxuIl19