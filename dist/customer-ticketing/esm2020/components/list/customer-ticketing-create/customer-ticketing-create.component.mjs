/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/core";
export class CustomerTicketingCreateComponent {
    constructor(launchDialogService, vcr) {
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.subscription = new Subscription();
    }
    openCreateNewTicketDialog() {
        const dialog = this.launchDialogService.openDialog("CUSTOMER_TICKETING_CREATE" /* LAUNCH_CALLER.CUSTOMER_TICKETING_CREATE */, this.element, this.vcr);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
CustomerTicketingCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateComponent, deps: [{ token: i1.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingCreateComponent, selector: "cx-customer-ticketing-create", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<button\n  #element\n  class=\"btn btn-primary cx-customer-ticketing-create\"\n  (click)=\"openCreateNewTicketDialog()\"\n>\n  {{ 'createCustomerTicket.addRequest' | cxTranslate }}\n</button>\n", dependencies: [{ kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-create', template: "<button\n  #element\n  class=\"btn btn-primary cx-customer-ticketing-create\"\n  (click)=\"openCreateNewTicketDialog()\"\n>\n  {{ 'createCustomerTicket.addRequest' | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLWNyZWF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY3VzdG9tZXItdGlja2V0aW5nL2NvbXBvbmVudHMvbGlzdC9jdXN0b21lci10aWNrZXRpbmctY3JlYXRlL2N1c3RvbWVyLXRpY2tldGluZy1jcmVhdGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2N1c3RvbWVyLXRpY2tldGluZy9jb21wb25lbnRzL2xpc3QvY3VzdG9tZXItdGlja2V0aW5nLWNyZWF0ZS9jdXN0b21lci10aWNrZXRpbmctY3JlYXRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUdULFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU10QyxNQUFNLE9BQU8sZ0NBQWdDO0lBSzNDLFlBQ1ksbUJBQXdDLEVBQ3hDLEdBQXFCO1FBRHJCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFOdkIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBT3pDLENBQUM7SUFFSix5QkFBeUI7UUFDdkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsNEVBRWhELElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO1FBQ0YsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDekQ7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7NkhBdkJVLGdDQUFnQztpSEFBaEMsZ0NBQWdDLHdLQ3JCN0MsbU1BT0E7MkZEY2EsZ0NBQWdDO2tCQUo1QyxTQUFTOytCQUNFLDhCQUE4Qjt5SUFNbEIsT0FBTztzQkFBNUIsU0FBUzt1QkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYXVuY2hEaWFsb2dTZXJ2aWNlLCBMQVVOQ0hfQ0FMTEVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY3VzdG9tZXItdGlja2V0aW5nLWNyZWF0ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jdXN0b21lci10aWNrZXRpbmctY3JlYXRlLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdDcmVhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2VsZW1lbnQnKSBlbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB2Y3I6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7fVxuXG4gIG9wZW5DcmVhdGVOZXdUaWNrZXREaWFsb2coKSB7XG4gICAgY29uc3QgZGlhbG9nID0gdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLm9wZW5EaWFsb2coXG4gICAgICBMQVVOQ0hfQ0FMTEVSLkNVU1RPTUVSX1RJQ0tFVElOR19DUkVBVEUsXG4gICAgICB0aGlzLmVsZW1lbnQsXG4gICAgICB0aGlzLnZjclxuICAgICk7XG4gICAgaWYgKGRpYWxvZykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKGRpYWxvZy5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGJ1dHRvblxuICAjZWxlbWVudFxuICBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBjeC1jdXN0b21lci10aWNrZXRpbmctY3JlYXRlXCJcbiAgKGNsaWNrKT1cIm9wZW5DcmVhdGVOZXdUaWNrZXREaWFsb2coKVwiXG4+XG4gIHt7ICdjcmVhdGVDdXN0b21lclRpY2tldC5hZGRSZXF1ZXN0JyB8IGN4VHJhbnNsYXRlIH19XG48L2J1dHRvbj5cbiJdfQ==