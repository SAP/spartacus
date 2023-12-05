/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, ViewChild, } from '@angular/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/order/root";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
export class ConsignmentTrackingComponent {
    constructor(orderHistoryFacade, launchDialogService, vcr) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.consignmentStatus = [
            'SHIPPED',
            'IN_TRANSIT',
            'DELIVERY_COMPLETED',
            'DELIVERY_REJECTED',
            'DELIVERING',
        ];
    }
    ngOnInit() {
        this.consignmentTracking$ =
            this.orderHistoryFacade.getConsignmentTracking();
    }
    openTrackingDialog(consignment) {
        if (consignment.code) {
            this.orderHistoryFacade.loadConsignmentTracking(this.orderCode, consignment.code);
        }
        const modalInstanceData = {
            tracking$: this.consignmentTracking$,
            shipDate: consignment.statusDate,
        };
        const dialog = this.launchDialogService.openDialog("CONSIGNMENT_TRACKING" /* LAUNCH_CALLER.CONSIGNMENT_TRACKING */, this.element, this.vcr, modalInstanceData);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    ngOnDestroy() {
        this.orderHistoryFacade.clearConsignmentTracking();
    }
}
ConsignmentTrackingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsignmentTrackingComponent, deps: [{ token: i1.OrderHistoryFacade }, { token: i2.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
ConsignmentTrackingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConsignmentTrackingComponent, selector: "cx-consignment-tracking", inputs: { consignment: "consignment", orderCode: "orderCode" }, viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"consignment && consignment.status\">\n  <div *ngIf=\"consignmentStatus.includes(consignment.status)\">\n    <button\n      (click)=\"openTrackingDialog(consignment)\"\n      class=\"btn btn-secondary btn-track\"\n      type=\"button\"\n    >\n      {{ 'orderDetails.consignmentTracking.action' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsignmentTrackingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-consignment-tracking', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"consignment && consignment.status\">\n  <div *ngIf=\"consignmentStatus.includes(consignment.status)\">\n    <button\n      (click)=\"openTrackingDialog(consignment)\"\n      class=\"btn btn-secondary btn-track\"\n      type=\"button\"\n    >\n      {{ 'orderDetails.consignmentTracking.action' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderHistoryFacade }, { type: i2.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }], consignment: [{
                type: Input
            }], orderCode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc2lnbm1lbnQtdHJhY2tpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvb3JkZXItZGV0YWlscy9vcmRlci1kZXRhaWwtaXRlbXMvY29uc2lnbm1lbnQtdHJhY2tpbmcvY29uc2lnbm1lbnQtdHJhY2tpbmcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvb3JkZXItZGV0YWlscy9vcmRlci1kZXRhaWwtaXRlbXMvY29uc2lnbm1lbnQtdHJhY2tpbmcvY29uc2lnbm1lbnQtdHJhY2tpbmcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULEtBQUssRUFHTCxTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFRdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFPdEMsTUFBTSxPQUFPLDRCQUE0QjtJQWdCdkMsWUFDWSxrQkFBc0MsRUFDdEMsbUJBQXdDLEVBQ3hDLEdBQXFCO1FBRnJCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQWxCakMsc0JBQWlCLEdBQWE7WUFDNUIsU0FBUztZQUNULFlBQVk7WUFDWixvQkFBb0I7WUFDcEIsbUJBQW1CO1lBQ25CLFlBQVk7U0FDYixDQUFDO0lBYUMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsb0JBQW9CO1lBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxXQUF3QjtRQUN6QyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUM3QyxJQUFJLENBQUMsU0FBUyxFQUNkLFdBQVcsQ0FBQyxJQUFJLENBQ2pCLENBQUM7U0FDSDtRQUNELE1BQU0saUJBQWlCLEdBQUc7WUFDeEIsU0FBUyxFQUFFLElBQUksQ0FBQyxvQkFBb0I7WUFDcEMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxVQUFVO1NBQ2pDLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxrRUFFaEQsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsR0FBRyxFQUNSLGlCQUFpQixDQUNsQixDQUFDO1FBRUYsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNyRCxDQUFDOzt5SEFyRFUsNEJBQTRCOzZHQUE1Qiw0QkFBNEIsbU9DOUJ6QywwWEFXQTsyRkRtQmEsNEJBQTRCO2tCQUx4QyxTQUFTOytCQUNFLHlCQUF5QixtQkFFbEIsdUJBQXVCLENBQUMsTUFBTTswS0FVekIsT0FBTztzQkFBNUIsU0FBUzt1QkFBQyxTQUFTO2dCQUdwQixXQUFXO3NCQURWLEtBQUs7Z0JBR04sU0FBUztzQkFEUixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29uc2lnbm1lbnQsXG4gIENvbnNpZ25tZW50VHJhY2tpbmcsXG4gIE9yZGVySGlzdG9yeUZhY2FkZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IExhdW5jaERpYWxvZ1NlcnZpY2UsIExBVU5DSF9DQUxMRVIgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY29uc2lnbm1lbnQtdHJhY2tpbmcnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uc2lnbm1lbnQtdHJhY2tpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29uc2lnbm1lbnRUcmFja2luZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY29uc2lnbm1lbnRTdGF0dXM6IHN0cmluZ1tdID0gW1xuICAgICdTSElQUEVEJyxcbiAgICAnSU5fVFJBTlNJVCcsXG4gICAgJ0RFTElWRVJZX0NPTVBMRVRFRCcsXG4gICAgJ0RFTElWRVJZX1JFSkVDVEVEJyxcbiAgICAnREVMSVZFUklORycsXG4gIF07XG4gIEBWaWV3Q2hpbGQoJ2VsZW1lbnQnKSBlbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpXG4gIGNvbnNpZ25tZW50OiBDb25zaWdubWVudDtcbiAgQElucHV0KClcbiAgb3JkZXJDb2RlOiBzdHJpbmc7XG4gIGNvbnNpZ25tZW50VHJhY2tpbmckOiBPYnNlcnZhYmxlPENvbnNpZ25tZW50VHJhY2tpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvcmRlckhpc3RvcnlGYWNhZGU6IE9yZGVySGlzdG9yeUZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdmNyOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbnNpZ25tZW50VHJhY2tpbmckID1cbiAgICAgIHRoaXMub3JkZXJIaXN0b3J5RmFjYWRlLmdldENvbnNpZ25tZW50VHJhY2tpbmcoKTtcbiAgfVxuXG4gIG9wZW5UcmFja2luZ0RpYWxvZyhjb25zaWdubWVudDogQ29uc2lnbm1lbnQpIHtcbiAgICBpZiAoY29uc2lnbm1lbnQuY29kZSkge1xuICAgICAgdGhpcy5vcmRlckhpc3RvcnlGYWNhZGUubG9hZENvbnNpZ25tZW50VHJhY2tpbmcoXG4gICAgICAgIHRoaXMub3JkZXJDb2RlLFxuICAgICAgICBjb25zaWdubWVudC5jb2RlXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBtb2RhbEluc3RhbmNlRGF0YSA9IHtcbiAgICAgIHRyYWNraW5nJDogdGhpcy5jb25zaWdubWVudFRyYWNraW5nJCxcbiAgICAgIHNoaXBEYXRlOiBjb25zaWdubWVudC5zdGF0dXNEYXRlLFxuICAgIH07XG5cbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2Uub3BlbkRpYWxvZyhcbiAgICAgIExBVU5DSF9DQUxMRVIuQ09OU0lHTk1FTlRfVFJBQ0tJTkcsXG4gICAgICB0aGlzLmVsZW1lbnQsXG4gICAgICB0aGlzLnZjcixcbiAgICAgIG1vZGFsSW5zdGFuY2VEYXRhXG4gICAgKTtcblxuICAgIGlmIChkaWFsb2cpIHtcbiAgICAgIGRpYWxvZy5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMub3JkZXJIaXN0b3J5RmFjYWRlLmNsZWFyQ29uc2lnbm1lbnRUcmFja2luZygpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY29uc2lnbm1lbnQgJiYgY29uc2lnbm1lbnQuc3RhdHVzXCI+XG4gIDxkaXYgKm5nSWY9XCJjb25zaWdubWVudFN0YXR1cy5pbmNsdWRlcyhjb25zaWdubWVudC5zdGF0dXMpXCI+XG4gICAgPGJ1dHRvblxuICAgICAgKGNsaWNrKT1cIm9wZW5UcmFja2luZ0RpYWxvZyhjb25zaWdubWVudClcIlxuICAgICAgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tdHJhY2tcIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgPlxuICAgICAge3sgJ29yZGVyRGV0YWlscy5jb25zaWdubWVudFRyYWNraW5nLmFjdGlvbicgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuIl19