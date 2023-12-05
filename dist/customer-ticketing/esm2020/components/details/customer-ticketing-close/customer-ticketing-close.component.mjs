/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/customer-ticketing/root";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
export class CustomerTicketingCloseComponent {
    constructor(customerTicketingFacade, launchDialogService, vcr) {
        this.customerTicketingFacade = customerTicketingFacade;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.subscription = new Subscription();
        this.enableCloseButton$ = this.customerTicketingFacade
            .getTicket()
            .pipe(map((ticket) => (ticket?.status?.id === "OPEN" /* STATUS.OPEN */ ||
            ticket?.status?.id === "INPROCESS" /* STATUS.INPROCESS */) &&
            ticket.availableStatusTransitions?.some((status) => status.id.toUpperCase() === "CLOSED" /* STATUS.CLOSED */)));
    }
    openDialog() {
        const dialog = this.launchDialogService.openDialog("CUSTOMER_TICKETING_CLOSE" /* LAUNCH_CALLER.CUSTOMER_TICKETING_CLOSE */, this.element, this.vcr);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
CustomerTicketingCloseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseComponent, deps: [{ token: i1.CustomerTicketingFacade }, { token: i2.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingCloseComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingCloseComponent, selector: "cx-customer-ticketing-close", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<div class=\"col-xs-12 col-md-5 col-lg-4\" *ngIf=\"enableCloseButton$ | async\">\n  <button #element class=\"btn btn-block btn-secondary\" (click)=\"openDialog()\">\n    {{ 'customerTicketingDetails.closeRequest' | cxTranslate }}\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-close', template: "<div class=\"col-xs-12 col-md-5 col-lg-4\" *ngIf=\"enableCloseButton$ | async\">\n  <button #element class=\"btn btn-block btn-secondary\" (click)=\"openDialog()\">\n    {{ 'customerTicketingDetails.closeRequest' | cxTranslate }}\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CustomerTicketingFacade }, { type: i2.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLWNsb3NlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jdXN0b21lci10aWNrZXRpbmcvY29tcG9uZW50cy9kZXRhaWxzL2N1c3RvbWVyLXRpY2tldGluZy1jbG9zZS9jdXN0b21lci10aWNrZXRpbmctY2xvc2UuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2N1c3RvbWVyLXRpY2tldGluZy9jb21wb25lbnRzL2RldGFpbHMvY3VzdG9tZXItdGlja2V0aW5nLWNsb3NlL2N1c3RvbWVyLXRpY2tldGluZy1jbG9zZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFHVCxTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFNdkIsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFNM0MsTUFBTSxPQUFPLCtCQUErQjtJQW1CMUMsWUFDWSx1QkFBZ0QsRUFDaEQsbUJBQXdDLEVBQ3hDLEdBQXFCO1FBRnJCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQXJCdkIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTVDLHVCQUFrQixHQUNoQixJQUFJLENBQUMsdUJBQXVCO2FBQ3pCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FDSCxHQUFHLENBQ0QsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNULENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLDZCQUFnQjtZQUNqQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsdUNBQXFCLENBQUM7WUFDMUMsTUFBTSxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FDckMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLGlDQUFrQixDQUN0RCxDQUNKLENBQ0YsQ0FBQztJQU1ILENBQUM7SUFFSixVQUFVO1FBQ1IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsMEVBRWhELElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO1FBRUYsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDekQ7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7NEhBdkNVLCtCQUErQjtnSEFBL0IsK0JBQStCLHVLQ3pCNUMsOFBBS0E7MkZEb0JhLCtCQUErQjtrQkFKM0MsU0FBUzsrQkFDRSw2QkFBNkI7K0tBTWpCLE9BQU87c0JBQTVCLFNBQVM7dUJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ3VzdG9tZXJUaWNrZXRpbmdGYWNhZGUsXG4gIFNUQVRVUyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jdXN0b21lci10aWNrZXRpbmcvcm9vdCc7XG5pbXBvcnQgeyBMYXVuY2hEaWFsb2dTZXJ2aWNlLCBMQVVOQ0hfQ0FMTEVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jdXN0b21lci10aWNrZXRpbmctY2xvc2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXItdGlja2V0aW5nLWNsb3NlLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdDbG9zZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgQFZpZXdDaGlsZCgnZWxlbWVudCcpIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgZW5hYmxlQ2xvc2VCdXR0b24kOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCB1bmRlZmluZWQ+ID1cbiAgICB0aGlzLmN1c3RvbWVyVGlja2V0aW5nRmFjYWRlXG4gICAgICAuZ2V0VGlja2V0KClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKHRpY2tldCkgPT5cbiAgICAgICAgICAgICh0aWNrZXQ/LnN0YXR1cz8uaWQgPT09IFNUQVRVUy5PUEVOIHx8XG4gICAgICAgICAgICAgIHRpY2tldD8uc3RhdHVzPy5pZCA9PT0gU1RBVFVTLklOUFJPQ0VTUykgJiZcbiAgICAgICAgICAgIHRpY2tldC5hdmFpbGFibGVTdGF0dXNUcmFuc2l0aW9ucz8uc29tZShcbiAgICAgICAgICAgICAgKHN0YXR1cykgPT4gc3RhdHVzLmlkLnRvVXBwZXJDYXNlKCkgPT09IFNUQVRVUy5DTE9TRURcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY3VzdG9tZXJUaWNrZXRpbmdGYWNhZGU6IEN1c3RvbWVyVGlja2V0aW5nRmFjYWRlLFxuICAgIHByb3RlY3RlZCBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB2Y3I6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7fVxuXG4gIG9wZW5EaWFsb2coKSB7XG4gICAgY29uc3QgZGlhbG9nID0gdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLm9wZW5EaWFsb2coXG4gICAgICBMQVVOQ0hfQ0FMTEVSLkNVU1RPTUVSX1RJQ0tFVElOR19DTE9TRSxcbiAgICAgIHRoaXMuZWxlbWVudCxcbiAgICAgIHRoaXMudmNyXG4gICAgKTtcblxuICAgIGlmIChkaWFsb2cpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChkaWFsb2cucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJjb2wteHMtMTIgY29sLW1kLTUgY29sLWxnLTRcIiAqbmdJZj1cImVuYWJsZUNsb3NlQnV0dG9uJCB8IGFzeW5jXCI+XG4gIDxidXR0b24gI2VsZW1lbnQgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1zZWNvbmRhcnlcIiAoY2xpY2spPVwib3BlbkRpYWxvZygpXCI+XG4gICAge3sgJ2N1c3RvbWVyVGlja2V0aW5nRGV0YWlscy5jbG9zZVJlcXVlc3QnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9idXR0b24+XG48L2Rpdj5cbiJdfQ==