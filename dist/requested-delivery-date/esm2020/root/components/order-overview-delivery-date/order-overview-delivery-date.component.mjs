/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Optional } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DateValidationService } from '../shared/date-validation.service';
import * as i0 from "@angular/core";
import * as i1 from "../shared/date-validation.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@angular/common";
export class OrderOverviewDeliveryDateComponent {
    constructor(dateValidationService, translation, orderOutlet) {
        this.dateValidationService = dateValidationService;
        this.translation = translation;
        this.orderOutlet = orderOutlet;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        if (this.orderOutlet?.context$) {
            this.subscription.add(this.orderOutlet.context$.subscribe((context) => (this.order = context?.item)));
        }
    }
    isRequestedDeliveryDatePresent() {
        return this.dateValidationService.isDateStringValid(this.order?.requestedRetrievalAt);
    }
    getRequestedDeliveryDateCardContent(isoDate) {
        return this.translation
            .translate('requestedDeliveryDate.readOnlyTextLabel')
            .pipe(filter(() => Boolean(isoDate)), map((textTitle) => {
            return {
                title: textTitle,
                text: [isoDate],
            };
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
OrderOverviewDeliveryDateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOverviewDeliveryDateComponent, deps: [{ token: i1.DateValidationService }, { token: i2.TranslationService }, { token: i3.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OrderOverviewDeliveryDateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderOverviewDeliveryDateComponent, selector: "cx-order-overview-delivery-date", ngImport: i0, template: "<ng-container *ngIf=\"order && isRequestedDeliveryDatePresent()\">\n  <cx-card\n    [content]=\"\n      getRequestedDeliveryDateCardContent(order?.requestedRetrievalAt | cxDate)\n        | async\n    \"\n  ></cx-card>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOverviewDeliveryDateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-overview-delivery-date', template: "<ng-container *ngIf=\"order && isRequestedDeliveryDatePresent()\">\n  <cx-card\n    [content]=\"\n      getRequestedDeliveryDateCardContent(order?.requestedRetrievalAt | cxDate)\n        | async\n    \"\n  ></cx-card>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.DateValidationService }, { type: i2.TranslationService }, { type: i3.OutletContextData, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItb3ZlcnZpZXctZGVsaXZlcnktZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUvcm9vdC9jb21wb25lbnRzL29yZGVyLW92ZXJ2aWV3LWRlbGl2ZXJ5LWRhdGUvb3JkZXItb3ZlcnZpZXctZGVsaXZlcnktZGF0ZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUvcm9vdC9jb21wb25lbnRzL29yZGVyLW92ZXJ2aWV3LWRlbGl2ZXJ5LWRhdGUvb3JkZXItb3ZlcnZpZXctZGVsaXZlcnktZGF0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBcUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXJELE9BQU8sRUFBUSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7O0FBTTFFLE1BQU0sT0FBTyxrQ0FBa0M7SUFDN0MsWUFDWSxxQkFBNEMsRUFDNUMsV0FBK0IsRUFDbkIsV0FBK0I7UUFGM0MsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDbkIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBRzdDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUZ6QyxDQUFDO0lBS0osUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDakMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQzFDLENBQ0YsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELDhCQUE4QjtRQUM1QixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FDakQsSUFBSSxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FDakMsQ0FBQztJQUNKLENBQUM7SUFFRCxtQ0FBbUMsQ0FDakMsT0FBc0I7UUFFdEIsT0FBTyxJQUFJLENBQUMsV0FBVzthQUNwQixTQUFTLENBQUMseUNBQXlDLENBQUM7YUFDcEQsSUFBSSxDQUNILE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFDOUIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDaEIsT0FBTztnQkFDTCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ1IsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7K0hBNUNVLGtDQUFrQzttSEFBbEMsa0NBQWtDLHVFQ2xCL0MsOE9BUUE7MkZEVWEsa0NBQWtDO2tCQUo5QyxTQUFTOytCQUNFLGlDQUFpQzs7MEJBT3hDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IENhcmQsIE91dGxldENvbnRleHREYXRhIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEYXRlVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvZGF0ZS12YWxpZGF0aW9uLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmRlci1vdmVydmlldy1kZWxpdmVyeS1kYXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL29yZGVyLW92ZXJ2aWV3LWRlbGl2ZXJ5LWRhdGUuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlck92ZXJ2aWV3RGVsaXZlcnlEYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZGF0ZVZhbGlkYXRpb25TZXJ2aWNlOiBEYXRlVmFsaWRhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIG9yZGVyT3V0bGV0PzogT3V0bGV0Q29udGV4dERhdGFcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIG9yZGVyOiBPcmRlcjtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcmRlck91dGxldD8uY29udGV4dCQpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgdGhpcy5vcmRlck91dGxldC5jb250ZXh0JC5zdWJzY3JpYmUoXG4gICAgICAgICAgKGNvbnRleHQpID0+ICh0aGlzLm9yZGVyID0gY29udGV4dD8uaXRlbSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBpc1JlcXVlc3RlZERlbGl2ZXJ5RGF0ZVByZXNlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVZhbGlkYXRpb25TZXJ2aWNlLmlzRGF0ZVN0cmluZ1ZhbGlkKFxuICAgICAgdGhpcy5vcmRlcj8ucmVxdWVzdGVkUmV0cmlldmFsQXRcbiAgICApO1xuICB9XG5cbiAgZ2V0UmVxdWVzdGVkRGVsaXZlcnlEYXRlQ2FyZENvbnRlbnQoXG4gICAgaXNvRGF0ZTogc3RyaW5nIHwgbnVsbFxuICApOiBPYnNlcnZhYmxlPENhcmQ+IHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGlvblxuICAgICAgLnRyYW5zbGF0ZSgncmVxdWVzdGVkRGVsaXZlcnlEYXRlLnJlYWRPbmx5VGV4dExhYmVsJylcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gQm9vbGVhbihpc29EYXRlKSksXG4gICAgICAgIG1hcCgodGV4dFRpdGxlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiB0ZXh0VGl0bGUsXG4gICAgICAgICAgICB0ZXh0OiBbaXNvRGF0ZV0sXG4gICAgICAgICAgfSBhcyBDYXJkO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJvcmRlciAmJiBpc1JlcXVlc3RlZERlbGl2ZXJ5RGF0ZVByZXNlbnQoKVwiPlxuICA8Y3gtY2FyZFxuICAgIFtjb250ZW50XT1cIlxuICAgICAgZ2V0UmVxdWVzdGVkRGVsaXZlcnlEYXRlQ2FyZENvbnRlbnQob3JkZXI/LnJlcXVlc3RlZFJldHJpZXZhbEF0IHwgY3hEYXRlKVxuICAgICAgICB8IGFzeW5jXG4gICAgXCJcbiAgPjwvY3gtY2FyZD5cbjwvbmctY29udGFpbmVyPlxuIl19