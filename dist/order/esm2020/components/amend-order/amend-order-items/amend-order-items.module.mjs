/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { FormErrorsModule, ItemCounterModule, MediaModule, } from '@spartacus/storefront';
import { CancelOrReturnItemsComponent } from './amend-order-items.component';
import * as i0 from "@angular/core";
export class AmendOrderItemsModule {
}
AmendOrderItemsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderItemsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AmendOrderItemsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderItemsModule, declarations: [CancelOrReturnItemsComponent], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        MediaModule,
        ItemCounterModule,
        FeaturesConfigModule,
        FormErrorsModule], exports: [CancelOrReturnItemsComponent] });
AmendOrderItemsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderItemsModule, imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        MediaModule,
        ItemCounterModule,
        FeaturesConfigModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmendOrderItemsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        I18nModule,
                        MediaModule,
                        ItemCounterModule,
                        FeaturesConfigModule,
                        FormErrorsModule,
                    ],
                    declarations: [CancelOrReturnItemsComponent],
                    exports: [CancelOrReturnItemsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1lbmQtb3JkZXItaXRlbXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvYW1lbmQtb3JkZXIvYW1lbmQtb3JkZXItaXRlbXMvYW1lbmQtb3JkZXItaXRlbXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsV0FBVyxHQUNaLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBZTdFLE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixpQkFIakIsNEJBQTRCLGFBUnpDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLFdBQVc7UUFDWCxpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLGdCQUFnQixhQUdSLDRCQUE0QjttSEFFM0IscUJBQXFCLFlBWDlCLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLFdBQVc7UUFDWCxpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLGdCQUFnQjsyRkFLUCxxQkFBcUI7a0JBYmpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLGdCQUFnQjtxQkFDakI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQTRCLENBQUM7b0JBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUN4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZlYXR1cmVzQ29uZmlnTW9kdWxlLCBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1FcnJvcnNNb2R1bGUsXG4gIEl0ZW1Db3VudGVyTW9kdWxlLFxuICBNZWRpYU1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENhbmNlbE9yUmV0dXJuSXRlbXNDb21wb25lbnQgfSBmcm9tICcuL2FtZW5kLW9yZGVyLWl0ZW1zLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIE1lZGlhTW9kdWxlLFxuICAgIEl0ZW1Db3VudGVyTW9kdWxlLFxuICAgIEZlYXR1cmVzQ29uZmlnTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NhbmNlbE9yUmV0dXJuSXRlbXNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2FuY2VsT3JSZXR1cm5JdGVtc0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIEFtZW5kT3JkZXJJdGVtc01vZHVsZSB7fVxuIl19