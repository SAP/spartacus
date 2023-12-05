/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../order-details.service";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
export class OrderDetailReorderComponent {
    constructor(orderDetailsService, launchDialogService, vcr) {
        this.orderDetailsService = orderDetailsService;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
    onReorderClick(order) {
        this.launchDialog(order.code);
    }
    launchDialog(orderCode) {
        const dialog = this.launchDialogService.openDialog("REORDER" /* LAUNCH_CALLER.REORDER */, this.element, this.vcr, { orderCode });
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
OrderDetailReorderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailReorderComponent, deps: [{ token: i1.OrderDetailsService }, { token: i2.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailReorderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderDetailReorderComponent, selector: "cx-order-details-reorder", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"order.code\">\n    <div class=\"cx-nav row\">\n      <div class=\"col-xs-12 col-md-10 col-lg-8\">\n        <button\n          #element\n          class=\"btn btn-primary\"\n          (click)=\"onReorderClick(order)\"\n        >\n          {{ 'reorder.button' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailReorderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-reorder', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <ng-container *ngIf=\"order.code\">\n    <div class=\"cx-nav row\">\n      <div class=\"col-xs-12 col-md-10 col-lg-8\">\n        <button\n          #element\n          class=\"btn btn-primary\"\n          (click)=\"onReorderClick(order)\"\n        >\n          {{ 'reorder.button' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderDetailsService }, { type: i2.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlsLXJlb3JkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvb3JkZXItZGV0YWlscy9vcmRlci1kZXRhaWwtcmVvcmRlci9vcmRlci1kZXRhaWwtcmVvcmRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbC1yZW9yZGVyL29yZGVyLWRldGFpbC1yZW9yZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFJVCxTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQVF0QyxNQUFNLE9BQU8sMkJBQTJCO0lBQ3RDLFlBQ1ksbUJBQXdDLEVBQ3hDLG1CQUF3QyxFQUN4QyxHQUFxQjtRQUZyQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFJdkIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBSHpDLENBQUM7SUFNSixRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxZQUFZLENBQUMsU0FBaUI7UUFDNUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsd0NBRWhELElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLEdBQUcsRUFDUixFQUFFLFNBQVMsRUFBRSxDQUNkLENBQUM7UUFFRixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzt3SEFwQ1UsMkJBQTJCOzRHQUEzQiwyQkFBMkIsb0tDekJ4QyxrYkFlQTsyRkRVYSwyQkFBMkI7a0JBTHZDLFNBQVM7K0JBQ0UsMEJBQTBCLG1CQUVuQix1QkFBdUIsQ0FBQyxNQUFNOzJLQVN6QixPQUFPO3NCQUE1QixTQUFTO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhdW5jaERpYWxvZ1NlcnZpY2UsIExBVU5DSF9DQUxMRVIgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzU2VydmljZSB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZGVyLWRldGFpbHMtcmVvcmRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9vcmRlci1kZXRhaWwtcmVvcmRlci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckRldGFpbFJlb3JkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvcmRlckRldGFpbHNTZXJ2aWNlOiBPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB2Y3I6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7fVxuXG4gIEBWaWV3Q2hpbGQoJ2VsZW1lbnQnKSBlbGVtZW50OiBFbGVtZW50UmVmO1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBvcmRlciQ6IE9ic2VydmFibGU8YW55PjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9yZGVyJCA9IHRoaXMub3JkZXJEZXRhaWxzU2VydmljZS5nZXRPcmRlckRldGFpbHMoKTtcbiAgfVxuXG4gIG9uUmVvcmRlckNsaWNrKG9yZGVyOiBhbnkpIHtcbiAgICB0aGlzLmxhdW5jaERpYWxvZyhvcmRlci5jb2RlKTtcbiAgfVxuXG4gIGxhdW5jaERpYWxvZyhvcmRlckNvZGU6IHN0cmluZykge1xuICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5vcGVuRGlhbG9nKFxuICAgICAgTEFVTkNIX0NBTExFUi5SRU9SREVSLFxuICAgICAgdGhpcy5lbGVtZW50LFxuICAgICAgdGhpcy52Y3IsXG4gICAgICB7IG9yZGVyQ29kZSB9XG4gICAgKTtcblxuICAgIGlmIChkaWFsb2cpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChkaWFsb2cucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9yZGVyJCB8IGFzeW5jIGFzIG9yZGVyXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJvcmRlci5jb2RlXCI+XG4gICAgPGRpdiBjbGFzcz1cImN4LW5hdiByb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMTIgY29sLW1kLTEwIGNvbC1sZy04XCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAjZWxlbWVudFxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICAoY2xpY2spPVwib25SZW9yZGVyQ2xpY2sob3JkZXIpXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7ICdyZW9yZGVyLmJ1dHRvbicgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuIl19