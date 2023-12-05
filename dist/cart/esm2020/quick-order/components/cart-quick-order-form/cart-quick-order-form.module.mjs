/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CartQuickOrderFormComponent } from './cart-quick-order-form.component';
import * as i0 from "@angular/core";
export class CartQuickOrderFormModule {
}
CartQuickOrderFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartQuickOrderFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartQuickOrderFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartQuickOrderFormModule, declarations: [CartQuickOrderFormComponent], imports: [CommonModule, ReactiveFormsModule, I18nModule, FormErrorsModule], exports: [CartQuickOrderFormComponent] });
CartQuickOrderFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartQuickOrderFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CartQuickOrderFormComponent: {
                    component: CartQuickOrderFormComponent,
                },
            },
        }),
    ], imports: [CommonModule, ReactiveFormsModule, I18nModule, FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartQuickOrderFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ReactiveFormsModule, I18nModule, FormErrorsModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CartQuickOrderFormComponent: {
                                    component: CartQuickOrderFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [CartQuickOrderFormComponent],
                    exports: [CartQuickOrderFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1xdWljay1vcmRlci1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3F1aWNrLW9yZGVyL2NvbXBvbmVudHMvY2FydC1xdWljay1vcmRlci1mb3JtL2NhcnQtcXVpY2stb3JkZXItZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBYSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFnQmhGLE1BQU0sT0FBTyx3QkFBd0I7O3FIQUF4Qix3QkFBd0I7c0hBQXhCLHdCQUF3QixpQkFIcEIsMkJBQTJCLGFBVmhDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLGFBVy9ELDJCQUEyQjtzSEFFMUIsd0JBQXdCLGFBWnhCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLDJCQUEyQixFQUFFO29CQUMzQixTQUFTLEVBQUUsMkJBQTJCO2lCQUN2QzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBVFMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxnQkFBZ0I7MkZBYTlELHdCQUF3QjtrQkFkcEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixDQUFDO29CQUMxRSxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYiwyQkFBMkIsRUFBRTtvQ0FDM0IsU0FBUyxFQUFFLDJCQUEyQjtpQ0FDdkM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztvQkFDM0MsT0FBTyxFQUFFLENBQUMsMkJBQTJCLENBQUM7aUJBQ3ZDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENhcnRRdWlja09yZGVyRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY2FydC1xdWljay1vcmRlci1mb3JtLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIEkxOG5Nb2R1bGUsIEZvcm1FcnJvcnNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ2FydFF1aWNrT3JkZXJGb3JtQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDYXJ0UXVpY2tPcmRlckZvcm1Db21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDYXJ0UXVpY2tPcmRlckZvcm1Db21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2FydFF1aWNrT3JkZXJGb3JtQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FydFF1aWNrT3JkZXJGb3JtTW9kdWxlIHt9XG4iXX0=