/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlModule, I18nModule } from '@spartacus/core';
import { ProductVariantSizeSelectorComponent } from './product-variant-size-selector.component';
import { RouterModule } from '@angular/router';
import * as i0 from "@angular/core";
export class ProductVariantSizeSelectorModule {
}
ProductVariantSizeSelectorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantSizeSelectorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantSizeSelectorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantSizeSelectorModule, declarations: [ProductVariantSizeSelectorComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule], exports: [ProductVariantSizeSelectorComponent] });
ProductVariantSizeSelectorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantSizeSelectorModule, imports: [CommonModule, RouterModule, UrlModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantSizeSelectorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule],
                    declarations: [ProductVariantSizeSelectorComponent],
                    exports: [ProductVariantSizeSelectorComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50LXNpemUtc2VsZWN0b3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvdmFyaWFudHMvY29tcG9uZW50cy92YXJpYW50LXNpemUtc2VsZWN0b3IvcHJvZHVjdC12YXJpYW50LXNpemUtc2VsZWN0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFPL0MsTUFBTSxPQUFPLGdDQUFnQzs7NkhBQWhDLGdDQUFnQzs4SEFBaEMsZ0NBQWdDLGlCQUg1QixtQ0FBbUMsYUFEeEMsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxhQUVqRCxtQ0FBbUM7OEhBRWxDLGdDQUFnQyxZQUpqQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVOzJGQUloRCxnQ0FBZ0M7a0JBTDVDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDO29CQUM1RCxZQUFZLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztvQkFDbkQsT0FBTyxFQUFFLENBQUMsbUNBQW1DLENBQUM7aUJBQy9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcmxNb2R1bGUsIEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjdFZhcmlhbnRTaXplU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICcuL3Byb2R1Y3QtdmFyaWFudC1zaXplLXNlbGVjdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFVybE1vZHVsZSwgSTE4bk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1Byb2R1Y3RWYXJpYW50U2l6ZVNlbGVjdG9yQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1Byb2R1Y3RWYXJpYW50U2l6ZVNlbGVjdG9yQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFZhcmlhbnRTaXplU2VsZWN0b3JNb2R1bGUge31cbiJdfQ==