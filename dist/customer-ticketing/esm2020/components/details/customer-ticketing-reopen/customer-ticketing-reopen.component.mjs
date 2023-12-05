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
export class CustomerTicketingReopenComponent {
    constructor(customerTicketingFacade, launchDialogService, vcr) {
        this.customerTicketingFacade = customerTicketingFacade;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.subscription = new Subscription();
        this.enableReopenButton$ = this.customerTicketingFacade
            .getTicket()
            .pipe(map((ticket) => ticket?.status?.id === "CLOSED" /* STATUS.CLOSED */ &&
            ticket.availableStatusTransitions?.some((status) => status.id.toUpperCase() === "INPROCESS" /* STATUS.INPROCESS */ ||
                status.id.toUpperCase() === "OPEN" /* STATUS.OPEN */)));
    }
    openDialog() {
        const dialog = this.launchDialogService.openDialog("CUSTOMER_TICKETING_REOPEN" /* LAUNCH_CALLER.CUSTOMER_TICKETING_REOPEN */, this.element, this.vcr);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
CustomerTicketingReopenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenComponent, deps: [{ token: i1.CustomerTicketingFacade }, { token: i2.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingReopenComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingReopenComponent, selector: "cx-customer-ticketing-reopen", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<div class=\"col-xs-12 col-md-5 col-lg-4\" *ngIf=\"enableReopenButton$ | async\">\n  <button #element class=\"btn btn-block btn-secondary\" (click)=\"openDialog()\">\n    {{ 'customerTicketingDetails.reopenRequest' | cxTranslate }}\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-reopen', template: "<div class=\"col-xs-12 col-md-5 col-lg-4\" *ngIf=\"enableReopenButton$ | async\">\n  <button #element class=\"btn btn-block btn-secondary\" (click)=\"openDialog()\">\n    {{ 'customerTicketingDetails.reopenRequest' | cxTranslate }}\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CustomerTicketingFacade }, { type: i2.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLXJlb3Blbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY3VzdG9tZXItdGlja2V0aW5nL2NvbXBvbmVudHMvZGV0YWlscy9jdXN0b21lci10aWNrZXRpbmctcmVvcGVuL2N1c3RvbWVyLXRpY2tldGluZy1yZW9wZW4uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2N1c3RvbWVyLXRpY2tldGluZy9jb21wb25lbnRzL2RldGFpbHMvY3VzdG9tZXItdGlja2V0aW5nLXJlb3Blbi9jdXN0b21lci10aWNrZXRpbmctcmVvcGVuLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUdULFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQU12QixPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQU0zQyxNQUFNLE9BQU8sZ0NBQWdDO0lBb0IzQyxZQUNZLHVCQUFnRCxFQUNoRCxtQkFBd0MsRUFDeEMsR0FBcUI7UUFGckIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBdEJ2QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJNUMsd0JBQW1CLEdBQ2pCLElBQUksQ0FBQyx1QkFBdUI7YUFDekIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUNILEdBQUcsQ0FDRCxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQ1QsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLGlDQUFrQjtZQUNwQyxNQUFNLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUNyQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQ1QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsdUNBQXFCO2dCQUM1QyxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSw2QkFBZ0IsQ0FDMUMsQ0FDSixDQUNGLENBQUM7SUFNSCxDQUFDO0lBRUosVUFBVTtRQUNSLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLDRFQUVoRCxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztRQUVGLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OzZIQXhDVSxnQ0FBZ0M7aUhBQWhDLGdDQUFnQyx3S0N6QjdDLGdRQUtBOzJGRG9CYSxnQ0FBZ0M7a0JBSjVDLFNBQVM7K0JBQ0UsOEJBQThCOytLQU1sQixPQUFPO3NCQUE1QixTQUFTO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEN1c3RvbWVyVGlja2V0aW5nRmFjYWRlLFxuICBTVEFUVVMsXG59IGZyb20gJ0BzcGFydGFjdXMvY3VzdG9tZXItdGlja2V0aW5nL3Jvb3QnO1xuaW1wb3J0IHsgTGF1bmNoRGlhbG9nU2VydmljZSwgTEFVTkNIX0NBTExFUiB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY3VzdG9tZXItdGlja2V0aW5nLXJlb3BlbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jdXN0b21lci10aWNrZXRpbmctcmVvcGVuLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdSZW9wZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2VsZW1lbnQnKSBlbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIGVuYWJsZVJlb3BlbkJ1dHRvbiQ6IE9ic2VydmFibGU8Ym9vbGVhbiB8IHVuZGVmaW5lZD4gPVxuICAgIHRoaXMuY3VzdG9tZXJUaWNrZXRpbmdGYWNhZGVcbiAgICAgIC5nZXRUaWNrZXQoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICAodGlja2V0KSA9PlxuICAgICAgICAgICAgdGlja2V0Py5zdGF0dXM/LmlkID09PSBTVEFUVVMuQ0xPU0VEICYmXG4gICAgICAgICAgICB0aWNrZXQuYXZhaWxhYmxlU3RhdHVzVHJhbnNpdGlvbnM/LnNvbWUoXG4gICAgICAgICAgICAgIChzdGF0dXMpID0+XG4gICAgICAgICAgICAgICAgc3RhdHVzLmlkLnRvVXBwZXJDYXNlKCkgPT09IFNUQVRVUy5JTlBST0NFU1MgfHxcbiAgICAgICAgICAgICAgICBzdGF0dXMuaWQudG9VcHBlckNhc2UoKSA9PT0gU1RBVFVTLk9QRU5cbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY3VzdG9tZXJUaWNrZXRpbmdGYWNhZGU6IEN1c3RvbWVyVGlja2V0aW5nRmFjYWRlLFxuICAgIHByb3RlY3RlZCBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB2Y3I6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7fVxuXG4gIG9wZW5EaWFsb2coKSB7XG4gICAgY29uc3QgZGlhbG9nID0gdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLm9wZW5EaWFsb2coXG4gICAgICBMQVVOQ0hfQ0FMTEVSLkNVU1RPTUVSX1RJQ0tFVElOR19SRU9QRU4sXG4gICAgICB0aGlzLmVsZW1lbnQsXG4gICAgICB0aGlzLnZjclxuICAgICk7XG5cbiAgICBpZiAoZGlhbG9nKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoZGlhbG9nLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1tZC01IGNvbC1sZy00XCIgKm5nSWY9XCJlbmFibGVSZW9wZW5CdXR0b24kIHwgYXN5bmNcIj5cbiAgPGJ1dHRvbiAjZWxlbWVudCBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLXNlY29uZGFyeVwiIChjbGljayk9XCJvcGVuRGlhbG9nKClcIj5cbiAgICB7eyAnY3VzdG9tZXJUaWNrZXRpbmdEZXRhaWxzLnJlb3BlblJlcXVlc3QnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9idXR0b24+XG48L2Rpdj5cbiJdfQ==