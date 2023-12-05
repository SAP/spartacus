/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { CardModule, DatePickerModule } from '@spartacus/storefront';
import { DeliveryModeDatePickerComponent } from './delivery-mode-date-picker/delivery-mode-date-picker.component';
import { OrderOverviewDeliveryDateComponent } from './order-overview-delivery-date/order-overview-delivery-date.component';
import * as i0 from "@angular/core";
export class RequestedDeliveryDateComponentsModule {
}
RequestedDeliveryDateComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RequestedDeliveryDateComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateComponentsModule, declarations: [DeliveryModeDatePickerComponent,
        OrderOverviewDeliveryDateComponent], imports: [CommonModule,
        DatePickerModule,
        I18nModule,
        ReactiveFormsModule,
        CardModule], exports: [DeliveryModeDatePickerComponent,
        OrderOverviewDeliveryDateComponent] });
RequestedDeliveryDateComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateComponentsModule, imports: [CommonModule,
        DatePickerModule,
        I18nModule,
        ReactiveFormsModule,
        CardModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        DatePickerModule,
                        I18nModule,
                        ReactiveFormsModule,
                        CardModule,
                    ],
                    declarations: [
                        DeliveryModeDatePickerComponent,
                        OrderOverviewDeliveryDateComponent,
                    ],
                    exports: [
                        DeliveryModeDatePickerComponent,
                        OrderOverviewDeliveryDateComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUtY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUvcm9vdC9jb21wb25lbnRzL3JlcXVlc3RlZC1kZWxpdmVyeS1kYXRlLWNvbXBvbmVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHVFQUF1RSxDQUFDOztBQW1CM0gsTUFBTSxPQUFPLHFDQUFxQzs7a0lBQXJDLHFDQUFxQzttSUFBckMscUNBQXFDLGlCQVI5QywrQkFBK0I7UUFDL0Isa0NBQWtDLGFBUmxDLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQixVQUFVLGFBT1YsK0JBQStCO1FBQy9CLGtDQUFrQzttSUFHekIscUNBQXFDLFlBZjlDLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQixVQUFVOzJGQVdELHFDQUFxQztrQkFqQmpELFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixVQUFVO3dCQUNWLG1CQUFtQjt3QkFDbkIsVUFBVTtxQkFDWDtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osK0JBQStCO3dCQUMvQixrQ0FBa0M7cUJBQ25DO29CQUNELE9BQU8sRUFBRTt3QkFDUCwrQkFBK0I7d0JBQy9CLGtDQUFrQztxQkFDbkM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENhcmRNb2R1bGUsIERhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgRGVsaXZlcnlNb2RlRGF0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGVsaXZlcnktbW9kZS1kYXRlLXBpY2tlci9kZWxpdmVyeS1tb2RlLWRhdGUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlck92ZXJ2aWV3RGVsaXZlcnlEYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1vdmVydmlldy1kZWxpdmVyeS1kYXRlL29yZGVyLW92ZXJ2aWV3LWRlbGl2ZXJ5LWRhdGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBEYXRlUGlja2VyTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEZWxpdmVyeU1vZGVEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgIE9yZGVyT3ZlcnZpZXdEZWxpdmVyeURhdGVDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWxpdmVyeU1vZGVEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgIE9yZGVyT3ZlcnZpZXdEZWxpdmVyeURhdGVDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbXBvbmVudHNNb2R1bGUge31cbiJdfQ==