/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { AsmCustomer360ProfileComponent } from './asm-customer-360-profile.component';
import * as i0 from "@angular/core";
export class AsmCustomer360ProfileModule {
}
AsmCustomer360ProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProfileModule, declarations: [AsmCustomer360ProfileComponent], imports: [CardModule, CommonModule, I18nModule], exports: [AsmCustomer360ProfileComponent] });
AsmCustomer360ProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProfileModule, imports: [CardModule, CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CardModule, CommonModule, I18nModule],
                    declarations: [AsmCustomer360ProfileComponent],
                    exports: [AsmCustomer360ProfileComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1wcm9maWxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY3VzdG9tZXItMzYwL2NvbXBvbmVudHMvc2VjdGlvbnMvYXNtLWN1c3RvbWVyLTM2MC1wcm9maWxlL2FzbS1jdXN0b21lci0zNjAtcHJvZmlsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7O0FBT3RGLE1BQU0sT0FBTywyQkFBMkI7O3dIQUEzQiwyQkFBMkI7eUhBQTNCLDJCQUEyQixpQkFIdkIsOEJBQThCLGFBRG5DLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxhQUVwQyw4QkFBOEI7eUhBRTdCLDJCQUEyQixZQUo1QixVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVU7MkZBSW5DLDJCQUEyQjtrQkFMdkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztvQkFDL0MsWUFBWSxFQUFFLENBQUMsOEJBQThCLENBQUM7b0JBQzlDLE9BQU8sRUFBRSxDQUFDLDhCQUE4QixDQUFDO2lCQUMxQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDYXJkTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwUHJvZmlsZUNvbXBvbmVudCB9IGZyb20gJy4vYXNtLWN1c3RvbWVyLTM2MC1wcm9maWxlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDYXJkTW9kdWxlLCBDb21tb25Nb2R1bGUsIEkxOG5Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtBc21DdXN0b21lcjM2MFByb2ZpbGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQXNtQ3VzdG9tZXIzNjBQcm9maWxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQXNtQ3VzdG9tZXIzNjBQcm9maWxlTW9kdWxlIHt9XG4iXX0=