/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { CardModule, FormErrorsModule, IconModule, SpinnerModule, NgSelectA11yModule, } from '@spartacus/storefront';
import { CheckoutPaymentFormComponent } from './checkout-payment-form.component';
import * as i0 from "@angular/core";
export class CheckoutPaymentFormModule {
}
CheckoutPaymentFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutPaymentFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentFormModule, declarations: [CheckoutPaymentFormComponent], imports: [NgSelectA11yModule,
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        CardModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        FormErrorsModule], exports: [CheckoutPaymentFormComponent] });
CheckoutPaymentFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentFormModule, imports: [NgSelectA11yModule,
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        CardModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NgSelectA11yModule,
                        CommonModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        CardModule,
                        I18nModule,
                        IconModule,
                        SpinnerModule,
                        FormErrorsModule,
                    ],
                    declarations: [CheckoutPaymentFormComponent],
                    exports: [CheckoutPaymentFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMvY2hlY2tvdXQtcGF5bWVudC1tZXRob2QvY2hlY2tvdXQtcGF5bWVudC1mb3JtL2NoZWNrb3V0LXBheW1lbnQtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUNMLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLGFBQWEsRUFDYixrQkFBa0IsR0FDbkIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFpQmpGLE1BQU0sT0FBTyx5QkFBeUI7O3NIQUF6Qix5QkFBeUI7dUhBQXpCLHlCQUF5QixpQkFIckIsNEJBQTRCLGFBVnpDLGtCQUFrQjtRQUNsQixZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGNBQWM7UUFDZCxVQUFVO1FBQ1YsVUFBVTtRQUNWLFVBQVU7UUFDVixhQUFhO1FBQ2IsZ0JBQWdCLGFBR1IsNEJBQTRCO3VIQUUzQix5QkFBeUIsWUFibEMsa0JBQWtCO1FBQ2xCLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLFVBQVU7UUFDVixVQUFVO1FBQ1YsVUFBVTtRQUNWLGFBQWE7UUFDYixnQkFBZ0I7MkZBS1AseUJBQXlCO2tCQWZyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxrQkFBa0I7d0JBQ2xCLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixVQUFVO3dCQUNWLGFBQWE7d0JBQ2IsZ0JBQWdCO3FCQUNqQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztvQkFDNUMsT0FBTyxFQUFFLENBQUMsNEJBQTRCLENBQUM7aUJBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENhcmRNb2R1bGUsXG4gIEZvcm1FcnJvcnNNb2R1bGUsXG4gIEljb25Nb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG4gIE5nU2VsZWN0QTExeU1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENoZWNrb3V0UGF5bWVudEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NoZWNrb3V0LXBheW1lbnQtZm9ybS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmdTZWxlY3RBMTF5TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE5nU2VsZWN0TW9kdWxlLFxuICAgIENhcmRNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2hlY2tvdXRQYXltZW50Rm9ybUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDaGVja291dFBheW1lbnRGb3JtQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRQYXltZW50Rm9ybU1vZHVsZSB7fVxuIl19