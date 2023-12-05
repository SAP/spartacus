/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '@spartacus/storefront';
import { CartPickupOptionsContainerModule, defaultPickupOptionsDialogLayoutConfig, MyPreferredStoreModule, OrderConsignmentContainerModule, PdpPickupOptionsContainerModule, PickupInfoContainerModule, } from './container/index';
import { PickUpItemsDetailsModule } from './container/pickup-items-details';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
export class PickupInStoreComponentsModule {
}
PickupInStoreComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInStoreComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreComponentsModule, imports: [ReactiveFormsModule,
        PickupInfoContainerModule,
        MyPreferredStoreModule,
        PickUpItemsDetailsModule,
        PdpPickupOptionsContainerModule, i1.OutletModule, CartPickupOptionsContainerModule,
        OrderConsignmentContainerModule] });
PickupInStoreComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreComponentsModule, providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)], imports: [ReactiveFormsModule,
        PickupInfoContainerModule,
        MyPreferredStoreModule,
        PickUpItemsDetailsModule,
        PdpPickupOptionsContainerModule,
        OutletModule.forChild(),
        CartPickupOptionsContainerModule,
        OrderConsignmentContainerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ReactiveFormsModule,
                        PickupInfoContainerModule,
                        MyPreferredStoreModule,
                        PickUpItemsDetailsModule,
                        PdpPickupOptionsContainerModule,
                        OutletModule.forChild(),
                        CartPickupOptionsContainerModule,
                        OrderConsignmentContainerModule,
                    ],
                    providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWluLXN0b3JlLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb21wb25lbnRzL3BpY2t1cC1pbi1zdG9yZS1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUNMLGdDQUFnQyxFQUNoQyxzQ0FBc0MsRUFDdEMsc0JBQXNCLEVBQ3RCLCtCQUErQixFQUMvQiwrQkFBK0IsRUFDL0IseUJBQXlCLEdBQzFCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7OztBQWM1RSxNQUFNLE9BQU8sNkJBQTZCOzswSEFBN0IsNkJBQTZCOzJIQUE3Qiw2QkFBNkIsWUFYdEMsbUJBQW1CO1FBQ25CLHlCQUF5QjtRQUN6QixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLCtCQUErQixtQkFFL0IsZ0NBQWdDO1FBQ2hDLCtCQUErQjsySEFJdEIsNkJBQTZCLGFBRjdCLENBQUMsb0JBQW9CLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxZQVR2RSxtQkFBbUI7UUFDbkIseUJBQXlCO1FBQ3pCLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsK0JBQStCO1FBQy9CLFlBQVksQ0FBQyxRQUFRLEVBQUU7UUFDdkIsZ0NBQWdDO1FBQ2hDLCtCQUErQjsyRkFJdEIsNkJBQTZCO2tCQWJ6QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLHlCQUF5Qjt3QkFDekIsc0JBQXNCO3dCQUN0Qix3QkFBd0I7d0JBQ3hCLCtCQUErQjt3QkFDL0IsWUFBWSxDQUFDLFFBQVEsRUFBRTt3QkFDdkIsZ0NBQWdDO3dCQUNoQywrQkFBK0I7cUJBQ2hDO29CQUNELFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLHNDQUFzQyxDQUFDLENBQUM7aUJBQzFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPdXRsZXRNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHtcbiAgQ2FydFBpY2t1cE9wdGlvbnNDb250YWluZXJNb2R1bGUsXG4gIGRlZmF1bHRQaWNrdXBPcHRpb25zRGlhbG9nTGF5b3V0Q29uZmlnLFxuICBNeVByZWZlcnJlZFN0b3JlTW9kdWxlLFxuICBPcmRlckNvbnNpZ25tZW50Q29udGFpbmVyTW9kdWxlLFxuICBQZHBQaWNrdXBPcHRpb25zQ29udGFpbmVyTW9kdWxlLFxuICBQaWNrdXBJbmZvQ29udGFpbmVyTW9kdWxlLFxufSBmcm9tICcuL2NvbnRhaW5lci9pbmRleCc7XG5cbmltcG9ydCB7IFBpY2tVcEl0ZW1zRGV0YWlsc01vZHVsZSB9IGZyb20gJy4vY29udGFpbmVyL3BpY2t1cC1pdGVtcy1kZXRhaWxzJztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFBpY2t1cEluZm9Db250YWluZXJNb2R1bGUsXG4gICAgTXlQcmVmZXJyZWRTdG9yZU1vZHVsZSxcbiAgICBQaWNrVXBJdGVtc0RldGFpbHNNb2R1bGUsXG4gICAgUGRwUGlja3VwT3B0aW9uc0NvbnRhaW5lck1vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUuZm9yQ2hpbGQoKSxcbiAgICBDYXJ0UGlja3VwT3B0aW9uc0NvbnRhaW5lck1vZHVsZSxcbiAgICBPcmRlckNvbnNpZ25tZW50Q29udGFpbmVyTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0UGlja3VwT3B0aW9uc0RpYWxvZ0xheW91dENvbmZpZyldLFxufSlcbmV4cG9ydCBjbGFzcyBQaWNrdXBJblN0b3JlQ29tcG9uZW50c01vZHVsZSB7fVxuIl19