/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, ViewChild } from '@angular/core';
import { MessagingComponent, } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/customer-ticketing/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
export class CustomerTicketingMessagesComponent {
    constructor(customerTicketingConfig, customerTicketingFacade, eventService) {
        this.customerTicketingConfig = customerTicketingConfig;
        this.customerTicketingFacade = customerTicketingFacade;
        this.eventService = eventService;
        this.ticketDetails$ = this.customerTicketingFacade.getTicket();
        this.subscription = new Subscription();
        this.messageEvents$ = this.prepareMessageEvents();
        this.messagingConfigs = this.prepareMessagingConfigs();
    }
    onSend(event) {
        const mustWaitForAttachment = (event.files instanceof FileList && event.files?.length > 0) ?? false;
        this.subscription.add(this.customerTicketingFacade
            .createTicketEvent(this.prepareTicketEvent(event.message), mustWaitForAttachment)
            .subscribe((createdEvent) => {
            if (event.files && event.files?.length && createdEvent.code) {
                this.customerTicketingFacade.uploadAttachment(event.files.item(0), createdEvent.code);
            }
            this.messagingComponent?.resetForm();
        }));
    }
    downloadAttachment(event) {
        this.subscription.add(this.customerTicketingFacade
            .downloadAttachment(event.messageCode, event.attachmentId)
            .subscribe((data) => {
            const downloadURL = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = event.fileName ?? '';
            link.click();
        }));
    }
    prepareMessageEvents() {
        return this.ticketDetails$.pipe(map((ticket) => ticket?.ticketEvents?.map((event) => ({
            ...event,
            text: event.message ?? '',
            rightAlign: event.addedByAgent || false,
            attachments: event.ticketEventAttachments ?? [],
        })) ?? []));
    }
    prepareMessagingConfigs() {
        return {
            attachmentRestrictions: this.customerTicketingConfig.customerTicketing?.attachmentRestrictions,
            charactersLimit: this.customerTicketingConfig.customerTicketing?.inputCharactersLimit,
            enableFileUploadOption: true,
            displayAddMessageSection: this.ticketDetails$.pipe(map((ticket) => ticket?.status?.id !== "CLOSED" /* STATUS.CLOSED */)),
        };
    }
    prepareTicketEvent(messageText) {
        return {
            message: messageText,
        };
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
CustomerTicketingMessagesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesComponent, deps: [{ token: i1.CustomerTicketingConfig }, { token: i1.CustomerTicketingFacade }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Component });
CustomerTicketingMessagesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingMessagesComponent, selector: "cx-customer-ticketing-messages", viewQueries: [{ propertyName: "messagingComponent", first: true, predicate: MessagingComponent, descendants: true }], ngImport: i0, template: "<cx-messaging\n  [messageEvents$]=\"messageEvents$\"\n  [messagingConfigs]=\"messagingConfigs\"\n  (send)=\"onSend($event)\"\n  (downloadAttachment)=\"downloadAttachment($event)\"\n></cx-messaging>\n", dependencies: [{ kind: "component", type: i3.MessagingComponent, selector: "cx-messaging", inputs: ["messageEvents$", "scrollToInput", "messagingConfigs"], outputs: ["send", "downloadAttachment"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-ticketing-messages', template: "<cx-messaging\n  [messageEvents$]=\"messageEvents$\"\n  [messagingConfigs]=\"messagingConfigs\"\n  (send)=\"onSend($event)\"\n  (downloadAttachment)=\"downloadAttachment($event)\"\n></cx-messaging>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CustomerTicketingConfig }, { type: i1.CustomerTicketingFacade }, { type: i2.EventService }]; }, propDecorators: { messagingComponent: [{
                type: ViewChild,
                args: [MessagingComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLW1lc3NhZ2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jdXN0b21lci10aWNrZXRpbmcvY29tcG9uZW50cy9kZXRhaWxzL2N1c3RvbWVyLXRpY2tldGluZy1tZXNzYWdlcy9jdXN0b21lci10aWNrZXRpbmctbWVzc2FnZXMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2N1c3RvbWVyLXRpY2tldGluZy9jb21wb25lbnRzL2RldGFpbHMvY3VzdG9tZXItdGlja2V0aW5nLW1lc3NhZ2VzL2N1c3RvbWVyLXRpY2tldGluZy1tZXNzYWdlcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEUsT0FBTyxFQUVMLGtCQUFrQixHQUVuQixNQUFNLHVCQUF1QixDQUFDO0FBUS9CLE9BQU8sRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUtyQyxNQUFNLE9BQU8sa0NBQWtDO0lBTTdDLFlBQ1ksdUJBQWdELEVBQ2hELHVCQUFnRCxFQUNoRCxZQUEwQjtRQUYxQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFOdEMsbUJBQWMsR0FDWixJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxFQUFFLENBQUM7UUFRM0MsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxDLG1CQUFjLEdBQW9DLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTlFLHFCQUFnQixH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QUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzsrSEE5RlUsa0NBQWtDO21IQUFsQyxrQ0FBa0MsMEhBQ2xDLGtCQUFrQixnREMzQi9CLHlNQU1BOzJGRG9CYSxrQ0FBa0M7a0JBSjlDLFNBQVM7K0JBQ0UsZ0NBQWdDOytLQUlYLGtCQUFrQjtzQkFBaEQsU0FBUzt1QkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWVzc2FnZUV2ZW50LFxuICBNZXNzYWdpbmdDb21wb25lbnQsXG4gIE1lc3NhZ2luZ0NvbmZpZ3MsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQge1xuICBDdXN0b21lclRpY2tldGluZ0NvbmZpZyxcbiAgQ3VzdG9tZXJUaWNrZXRpbmdGYWNhZGUsXG4gIFNUQVRVUyxcbiAgVGlja2V0RGV0YWlscyxcbiAgVGlja2V0RXZlbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY3VzdG9tZXItdGlja2V0aW5nL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jdXN0b21lci10aWNrZXRpbmctbWVzc2FnZXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXItdGlja2V0aW5nLW1lc3NhZ2VzLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdNZXNzYWdlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoTWVzc2FnaW5nQ29tcG9uZW50KSBtZXNzYWdpbmdDb21wb25lbnQ6IE1lc3NhZ2luZ0NvbXBvbmVudDtcblxuICB0aWNrZXREZXRhaWxzJDogT2JzZXJ2YWJsZTxUaWNrZXREZXRhaWxzIHwgdW5kZWZpbmVkPiA9XG4gICAgdGhpcy5jdXN0b21lclRpY2tldGluZ0ZhY2FkZS5nZXRUaWNrZXQoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY3VzdG9tZXJUaWNrZXRpbmdDb25maWc6IEN1c3RvbWVyVGlja2V0aW5nQ29uZmlnLFxuICAgIHByb3RlY3RlZCBjdXN0b21lclRpY2tldGluZ0ZhY2FkZTogQ3VzdG9tZXJUaWNrZXRpbmdGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlXG4gICkge31cblxuICBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgbWVzc2FnZUV2ZW50cyQ6IE9ic2VydmFibGU8QXJyYXk8TWVzc2FnZUV2ZW50Pj4gPSB0aGlzLnByZXBhcmVNZXNzYWdlRXZlbnRzKCk7XG5cbiAgbWVzc2FnaW5nQ29uZmlnczogTWVzc2FnaW5nQ29uZmlncyA9IHRoaXMucHJlcGFyZU1lc3NhZ2luZ0NvbmZpZ3MoKTtcblxuICBvblNlbmQoZXZlbnQ6IHsgZmlsZXM6IEZpbGVMaXN0IHwgdW5kZWZpbmVkOyBtZXNzYWdlOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IG11c3RXYWl0Rm9yQXR0YWNobWVudCA9XG4gICAgICAoZXZlbnQuZmlsZXMgaW5zdGFuY2VvZiBGaWxlTGlzdCAmJiBldmVudC5maWxlcz8ubGVuZ3RoID4gMCkgPz8gZmFsc2U7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5jdXN0b21lclRpY2tldGluZ0ZhY2FkZVxuICAgICAgICAuY3JlYXRlVGlja2V0RXZlbnQoXG4gICAgICAgICAgdGhpcy5wcmVwYXJlVGlja2V0RXZlbnQoZXZlbnQubWVzc2FnZSksXG4gICAgICAgICAgbXVzdFdhaXRGb3JBdHRhY2htZW50XG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoY3JlYXRlZEV2ZW50OiBUaWNrZXRFdmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5maWxlcyAmJiBldmVudC5maWxlcz8ubGVuZ3RoICYmIGNyZWF0ZWRFdmVudC5jb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyVGlja2V0aW5nRmFjYWRlLnVwbG9hZEF0dGFjaG1lbnQoXG4gICAgICAgICAgICAgIGV2ZW50LmZpbGVzLml0ZW0oMCkgYXMgRmlsZSxcbiAgICAgICAgICAgICAgY3JlYXRlZEV2ZW50LmNvZGVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWVzc2FnaW5nQ29tcG9uZW50Py5yZXNldEZvcm0oKTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZG93bmxvYWRBdHRhY2htZW50KGV2ZW50OiB7XG4gICAgbWVzc2FnZUNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBhdHRhY2htZW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBmaWxlTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB9KSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5jdXN0b21lclRpY2tldGluZ0ZhY2FkZVxuICAgICAgICAuZG93bmxvYWRBdHRhY2htZW50KGV2ZW50Lm1lc3NhZ2VDb2RlLCBldmVudC5hdHRhY2htZW50SWQpXG4gICAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICBjb25zdCBkb3dubG9hZFVSTCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGRhdGEgYXMgQmxvYik7XG4gICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICBsaW5rLmhyZWYgPSBkb3dubG9hZFVSTDtcbiAgICAgICAgICBsaW5rLmRvd25sb2FkID0gZXZlbnQuZmlsZU5hbWUgPz8gJyc7XG4gICAgICAgICAgbGluay5jbGljaygpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJlcGFyZU1lc3NhZ2VFdmVudHMoKTogT2JzZXJ2YWJsZTxBcnJheTxNZXNzYWdlRXZlbnQ+PiB7XG4gICAgcmV0dXJuIHRoaXMudGlja2V0RGV0YWlscyQucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKHRpY2tldCkgPT5cbiAgICAgICAgICB0aWNrZXQ/LnRpY2tldEV2ZW50cz8ubWFwKFxuICAgICAgICAgICAgKGV2ZW50OiBUaWNrZXRFdmVudCk6IE1lc3NhZ2VFdmVudCA9PiAoe1xuICAgICAgICAgICAgICAuLi5ldmVudCxcbiAgICAgICAgICAgICAgdGV4dDogZXZlbnQubWVzc2FnZSA/PyAnJyxcbiAgICAgICAgICAgICAgcmlnaHRBbGlnbjogZXZlbnQuYWRkZWRCeUFnZW50IHx8IGZhbHNlLFxuICAgICAgICAgICAgICBhdHRhY2htZW50czogZXZlbnQudGlja2V0RXZlbnRBdHRhY2htZW50cyA/PyBbXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSA/PyBbXVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJlcGFyZU1lc3NhZ2luZ0NvbmZpZ3MoKTogTWVzc2FnaW5nQ29uZmlncyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGF0dGFjaG1lbnRSZXN0cmljdGlvbnM6XG4gICAgICAgIHRoaXMuY3VzdG9tZXJUaWNrZXRpbmdDb25maWcuY3VzdG9tZXJUaWNrZXRpbmc/LmF0dGFjaG1lbnRSZXN0cmljdGlvbnMsXG4gICAgICBjaGFyYWN0ZXJzTGltaXQ6XG4gICAgICAgIHRoaXMuY3VzdG9tZXJUaWNrZXRpbmdDb25maWcuY3VzdG9tZXJUaWNrZXRpbmc/LmlucHV0Q2hhcmFjdGVyc0xpbWl0LFxuICAgICAgZW5hYmxlRmlsZVVwbG9hZE9wdGlvbjogdHJ1ZSxcbiAgICAgIGRpc3BsYXlBZGRNZXNzYWdlU2VjdGlvbjogdGhpcy50aWNrZXREZXRhaWxzJC5waXBlKFxuICAgICAgICBtYXAoKHRpY2tldCkgPT4gdGlja2V0Py5zdGF0dXM/LmlkICE9PSBTVEFUVVMuQ0xPU0VEKVxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIHByZXBhcmVUaWNrZXRFdmVudChtZXNzYWdlVGV4dDogc3RyaW5nKTogVGlja2V0RXZlbnQge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiBtZXNzYWdlVGV4dCxcbiAgICB9O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxjeC1tZXNzYWdpbmdcbiAgW21lc3NhZ2VFdmVudHMkXT1cIm1lc3NhZ2VFdmVudHMkXCJcbiAgW21lc3NhZ2luZ0NvbmZpZ3NdPVwibWVzc2FnaW5nQ29uZmlnc1wiXG4gIChzZW5kKT1cIm9uU2VuZCgkZXZlbnQpXCJcbiAgKGRvd25sb2FkQXR0YWNobWVudCk9XCJkb3dubG9hZEF0dGFjaG1lbnQoJGV2ZW50KVwiXG4+PC9jeC1tZXNzYWdpbmc+XG4iXX0=