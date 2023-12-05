/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { CartValidationWarningsComponent } from './cart-validation-warnings.component';
import * as i0 from "@angular/core";
export class CartValidationWarningsModule {
}
CartValidationWarningsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationWarningsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartValidationWarningsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartValidationWarningsModule, declarations: [CartValidationWarningsComponent], imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule], exports: [CartValidationWarningsComponent] });
CartValidationWarningsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationWarningsModule, imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationWarningsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule],
                    exports: [CartValidationWarningsComponent],
                    declarations: [CartValidationWarningsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC12YWxpZGF0aW9uLXdhcm5pbmdzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy92YWxpZGF0aW9uL2NhcnQtd2FybmluZ3MvY2FydC12YWxpZGF0aW9uLXdhcm5pbmdzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOztBQU92RixNQUFNLE9BQU8sNEJBQTRCOzt5SEFBNUIsNEJBQTRCOzBIQUE1Qiw0QkFBNEIsaUJBRnhCLCtCQUErQixhQUZwQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVSxhQUM3RCwrQkFBK0I7MEhBRzlCLDRCQUE0QixZQUo3QixZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVTsyRkFJNUQsNEJBQTRCO2tCQUx4QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUM7b0JBQ3hFLE9BQU8sRUFBRSxDQUFDLCtCQUErQixDQUFDO29CQUMxQyxZQUFZLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDYXJ0VmFsaWRhdGlvbldhcm5pbmdzQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJ0LXZhbGlkYXRpb24td2FybmluZ3MuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBJMThuTW9kdWxlLCBVcmxNb2R1bGUsIEljb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbQ2FydFZhbGlkYXRpb25XYXJuaW5nc0NvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW0NhcnRWYWxpZGF0aW9uV2FybmluZ3NDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJ0VmFsaWRhdGlvbldhcm5pbmdzTW9kdWxlIHt9XG4iXX0=