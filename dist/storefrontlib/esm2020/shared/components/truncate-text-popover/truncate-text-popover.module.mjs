/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { PopoverModule } from '../popover/popover.module';
import { TruncateTextPopoverComponent } from './truncate-text-popover.component';
import { TruncatePipe } from './truncate.pipe';
import * as i0 from "@angular/core";
export class TruncateTextPopoverModule {
}
TruncateTextPopoverModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncateTextPopoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TruncateTextPopoverModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TruncateTextPopoverModule, declarations: [TruncateTextPopoverComponent, TruncatePipe], imports: [CommonModule, I18nModule, PopoverModule], exports: [TruncateTextPopoverComponent, TruncatePipe] });
TruncateTextPopoverModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncateTextPopoverModule, imports: [CommonModule, I18nModule, PopoverModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncateTextPopoverModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, PopoverModule],
                    declarations: [TruncateTextPopoverComponent, TruncatePipe],
                    exports: [TruncateTextPopoverComponent, TruncatePipe],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUtdGV4dC1wb3BvdmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvdHJ1bmNhdGUtdGV4dC1wb3BvdmVyL3RydW5jYXRlLXRleHQtcG9wb3Zlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQU8vQyxNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCO3VIQUF6Qix5QkFBeUIsaUJBSHJCLDRCQUE0QixFQUFFLFlBQVksYUFEL0MsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLGFBRXZDLDRCQUE0QixFQUFFLFlBQVk7dUhBRXpDLHlCQUF5QixZQUoxQixZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWE7MkZBSXRDLHlCQUF5QjtrQkFMckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQztvQkFDbEQsWUFBWSxFQUFFLENBQUMsNEJBQTRCLEVBQUUsWUFBWSxDQUFDO29CQUMxRCxPQUFPLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxZQUFZLENBQUM7aUJBQ3REIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBvcG92ZXJNb2R1bGUgfSBmcm9tICcuLi9wb3BvdmVyL3BvcG92ZXIubW9kdWxlJztcbmltcG9ydCB7IFRydW5jYXRlVGV4dFBvcG92ZXJDb21wb25lbnQgfSBmcm9tICcuL3RydW5jYXRlLXRleHQtcG9wb3Zlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJ1bmNhdGVQaXBlIH0gZnJvbSAnLi90cnVuY2F0ZS5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgUG9wb3Zlck1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1RydW5jYXRlVGV4dFBvcG92ZXJDb21wb25lbnQsIFRydW5jYXRlUGlwZV0sXG4gIGV4cG9ydHM6IFtUcnVuY2F0ZVRleHRQb3BvdmVyQ29tcG9uZW50LCBUcnVuY2F0ZVBpcGVdLFxufSlcbmV4cG9ydCBjbGFzcyBUcnVuY2F0ZVRleHRQb3BvdmVyTW9kdWxlIHt9XG4iXX0=