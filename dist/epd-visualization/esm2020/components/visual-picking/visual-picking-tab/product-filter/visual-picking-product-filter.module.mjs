/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { VisualPickingProductFilterComponent } from './visual-picking-product-filter.component';
import { VisualPickingProductFilterService } from './visual-picking-product-filter.service';
import * as i0 from "@angular/core";
export class VisualPickingProductFilterModule {
}
VisualPickingProductFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualPickingProductFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterModule, declarations: [VisualPickingProductFilterComponent], imports: [CommonModule, FormsModule, IconModule, UrlModule, I18nModule], exports: [VisualPickingProductFilterComponent] });
VisualPickingProductFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterModule, providers: [VisualPickingProductFilterService], imports: [CommonModule, FormsModule, IconModule, UrlModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, IconModule, UrlModule, I18nModule],
                    providers: [VisualPickingProductFilterService],
                    declarations: [VisualPickingProductFilterComponent],
                    exports: [VisualPickingProductFilterComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXBpY2tpbmctcHJvZHVjdC1maWx0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9jb21wb25lbnRzL3Zpc3VhbC1waWNraW5nL3Zpc3VhbC1waWNraW5nLXRhYi9wcm9kdWN0LWZpbHRlci92aXN1YWwtcGlja2luZy1wcm9kdWN0LWZpbHRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFRNUYsTUFBTSxPQUFPLGdDQUFnQzs7NkhBQWhDLGdDQUFnQzs4SEFBaEMsZ0NBQWdDLGlCQUg1QixtQ0FBbUMsYUFGeEMsWUFBWSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsYUFHNUQsbUNBQW1DOzhIQUVsQyxnQ0FBZ0MsYUFKaEMsQ0FBQyxpQ0FBaUMsQ0FBQyxZQURwQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVTsyRkFLM0QsZ0NBQWdDO2tCQU41QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUM7b0JBQ3ZFLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO29CQUM5QyxZQUFZLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztvQkFDbkQsT0FBTyxFQUFFLENBQUMsbUNBQW1DLENBQUM7aUJBQy9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIFVybE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFZpc3VhbFBpY2tpbmdQcm9kdWN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aXN1YWwtcGlja2luZy1wcm9kdWN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlzdWFsUGlja2luZ1Byb2R1Y3RGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi92aXN1YWwtcGlja2luZy1wcm9kdWN0LWZpbHRlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEljb25Nb2R1bGUsIFVybE1vZHVsZSwgSTE4bk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1Zpc3VhbFBpY2tpbmdQcm9kdWN0RmlsdGVyU2VydmljZV0sXG4gIGRlY2xhcmF0aW9uczogW1Zpc3VhbFBpY2tpbmdQcm9kdWN0RmlsdGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1Zpc3VhbFBpY2tpbmdQcm9kdWN0RmlsdGVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgVmlzdWFsUGlja2luZ1Byb2R1Y3RGaWx0ZXJNb2R1bGUge31cbiJdfQ==