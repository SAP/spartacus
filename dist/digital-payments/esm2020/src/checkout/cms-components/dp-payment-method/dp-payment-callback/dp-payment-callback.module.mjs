/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DpPaymentCallbackComponent } from './dp-payment-callback.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class DpPaymentCallbackModule {
}
DpPaymentCallbackModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DpPaymentCallbackModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackModule, declarations: [DpPaymentCallbackComponent], imports: [CommonModule, SpinnerModule, I18nModule], exports: [DpPaymentCallbackComponent] });
DpPaymentCallbackModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackModule, imports: [CommonModule, SpinnerModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SpinnerModule, I18nModule],
                    declarations: [DpPaymentCallbackComponent],
                    exports: [DpPaymentCallbackComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHAtcGF5bWVudC1jYWxsYmFjay5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2RpZ2l0YWwtcGF5bWVudHMvc3JjL2NoZWNrb3V0L2Ntcy1jb21wb25lbnRzL2RwLXBheW1lbnQtbWV0aG9kL2RwLXBheW1lbnQtY2FsbGJhY2svZHAtcGF5bWVudC1jYWxsYmFjay5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBTy9DLE1BQU0sT0FBTyx1QkFBdUI7O29IQUF2Qix1QkFBdUI7cUhBQXZCLHVCQUF1QixpQkFIbkIsMEJBQTBCLGFBRC9CLFlBQVksRUFBRSxhQUFhLEVBQUUsVUFBVSxhQUV2QywwQkFBMEI7cUhBRXpCLHVCQUF1QixZQUp4QixZQUFZLEVBQUUsYUFBYSxFQUFFLFVBQVU7MkZBSXRDLHVCQUF1QjtrQkFMbkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQztvQkFDbEQsWUFBWSxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQzFDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBEcFBheW1lbnRDYWxsYmFja0NvbXBvbmVudCB9IGZyb20gJy4vZHAtcGF5bWVudC1jYWxsYmFjay5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNwaW5uZXJNb2R1bGUsIEkxOG5Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtEcFBheW1lbnRDYWxsYmFja0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtEcFBheW1lbnRDYWxsYmFja0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIERwUGF5bWVudENhbGxiYWNrTW9kdWxlIHt9XG4iXX0=