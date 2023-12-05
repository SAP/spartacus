/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/index';
import { StarRatingComponent } from './star-rating.component';
import * as i0 from "@angular/core";
export class StarRatingModule {
}
StarRatingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StarRatingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StarRatingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StarRatingModule, declarations: [StarRatingComponent], imports: [CommonModule, IconModule, I18nModule], exports: [StarRatingComponent] });
StarRatingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StarRatingModule, imports: [CommonModule, IconModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StarRatingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, IconModule, I18nModule],
                    declarations: [StarRatingComponent],
                    exports: [StarRatingComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9zdGFyLXJhdGluZy9zdGFyLXJhdGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBTzlELE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFIWixtQkFBbUIsYUFEeEIsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLGFBRXBDLG1CQUFtQjs4R0FFbEIsZ0JBQWdCLFlBSmpCLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVTsyRkFJbkMsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUMvQyxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDbkMsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEljb25Nb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jbXMtY29tcG9uZW50cy9taXNjL2luZGV4JztcbmltcG9ydCB7IFN0YXJSYXRpbmdDb21wb25lbnQgfSBmcm9tICcuL3N0YXItcmF0aW5nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEljb25Nb2R1bGUsIEkxOG5Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtTdGFyUmF0aW5nQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1N0YXJSYXRpbmdDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBTdGFyUmF0aW5nTW9kdWxlIHt9XG4iXX0=