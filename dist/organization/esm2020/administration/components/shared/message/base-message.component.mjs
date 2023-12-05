/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Directive, HostBinding, Inject, PLATFORM_ID, } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "./message.model";
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class BaseMessageComponent {
    constructor(messageData, platformId) {
        this.messageData = messageData;
        this.platformId = platformId;
        this.terminated = false;
    }
    ngOnInit() {
        this.message = this.messageData.message ?? {};
        this.messageTitle = this.messageData.messageTitle;
        this.type = this.resolveType();
        this.messageIcon = this.messageData.messageIcon;
        if (this.messageData.timeout) {
            this.handleAutoHide();
        }
    }
    close() {
        this.messageData.events?.next({ close: true });
    }
    resolveType() {
        if (!this.messageData.type ||
            this.messageData.type === GlobalMessageType.MSG_TYPE_INFO) {
            return 'info';
        }
        if (this.messageData.type === GlobalMessageType.MSG_TYPE_ERROR) {
            return 'error';
        }
        if (this.messageData.type === GlobalMessageType.MSG_TYPE_WARNING) {
            return 'warning';
        }
    }
    handleAutoHide() {
        if (isPlatformBrowser(this.platformId)) {
            // we don't want to run this logic when doing SSR
            setTimeout(() => {
                this.close();
            }, this.messageData.timeout);
        }
    }
}
BaseMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseMessageComponent, deps: [{ token: i1.MessageData }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
BaseMessageComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: BaseMessageComponent, host: { properties: { "class": "this.type", "class.terminated": "this.terminated" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseMessageComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.MessageData }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { type: [{
                type: HostBinding,
                args: ['class']
            }], terminated: [{
                type: HostBinding,
                args: ['class.terminated']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1tZXNzYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9zaGFyZWQvbWVzc2FnZS9iYXNlLW1lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxNQUFNLEVBRU4sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBS2xFLGtFQUFrRTtBQUNsRSxNQUFNLE9BQWdCLG9CQUFvQjtJQVl4QyxZQUNZLFdBQXdCLEVBQ0gsVUFBZTtRQURwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNILGVBQVUsR0FBVixVQUFVLENBQUs7UUFaZixlQUFVLEdBQUcsS0FBSyxDQUFDO0lBYWpELENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBRWhELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRVMsV0FBVztRQUNuQixJQUNFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLGFBQWEsRUFDekQ7WUFDQSxPQUFPLE1BQU0sQ0FBQztTQUNmO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUU7WUFDOUQsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFO1lBQ2hFLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVTLGNBQWM7UUFDdEIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsaURBQWlEO1lBQ2pELFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOztpSEF0RG1CLG9CQUFvQiw2Q0FjOUIsV0FBVztxR0FkRCxvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFGekMsU0FBUzs7MEJBZ0JMLE1BQU07MkJBQUMsV0FBVzs0Q0FiQyxJQUFJO3NCQUF6QixXQUFXO3VCQUFDLE9BQU87Z0JBQ2EsVUFBVTtzQkFBMUMsV0FBVzt1QkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIE9uSW5pdCxcbiAgUExBVEZPUk1fSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2xvYmFsTWVzc2FnZVR5cGUsIFRyYW5zbGF0YWJsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgTWVzc2FnZURhdGEgfSBmcm9tICcuL21lc3NhZ2UubW9kZWwnO1xuXG5ARGlyZWN0aXZlKClcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VNZXNzYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXJtaW5hdGVkJykgdGVybWluYXRlZCA9IGZhbHNlO1xuXG4gIG1lc3NhZ2U6IFRyYW5zbGF0YWJsZTtcbiAgbWVzc2FnZVRpdGxlPzogVHJhbnNsYXRhYmxlO1xuXG4gIC8qKlxuICAgKiBJY29uIHVzZWQgdG8gZGlzcGxheSBuZXh0IHRvIHRoZSBtZXNzYWdlLlxuICAgKi9cbiAgbWVzc2FnZUljb246IElDT05fVFlQRSB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbWVzc2FnZURhdGE6IE1lc3NhZ2VEYXRhLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBhbnlcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMubWVzc2FnZURhdGEubWVzc2FnZSA/PyB7fTtcbiAgICB0aGlzLm1lc3NhZ2VUaXRsZSA9IHRoaXMubWVzc2FnZURhdGEubWVzc2FnZVRpdGxlO1xuICAgIHRoaXMudHlwZSA9IHRoaXMucmVzb2x2ZVR5cGUoKTtcbiAgICB0aGlzLm1lc3NhZ2VJY29uID0gdGhpcy5tZXNzYWdlRGF0YS5tZXNzYWdlSWNvbjtcblxuICAgIGlmICh0aGlzLm1lc3NhZ2VEYXRhLnRpbWVvdXQpIHtcbiAgICAgIHRoaXMuaGFuZGxlQXV0b0hpZGUoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLm1lc3NhZ2VEYXRhLmV2ZW50cz8ubmV4dCh7IGNsb3NlOiB0cnVlIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlc29sdmVUeXBlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMubWVzc2FnZURhdGEudHlwZSB8fFxuICAgICAgdGhpcy5tZXNzYWdlRGF0YS50eXBlID09PSBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9JTkZPXG4gICAgKSB7XG4gICAgICByZXR1cm4gJ2luZm8nO1xuICAgIH1cbiAgICBpZiAodGhpcy5tZXNzYWdlRGF0YS50eXBlID09PSBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUikge1xuICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgfVxuICAgIGlmICh0aGlzLm1lc3NhZ2VEYXRhLnR5cGUgPT09IEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX1dBUk5JTkcpIHtcbiAgICAgIHJldHVybiAnd2FybmluZyc7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZUF1dG9IaWRlKCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIHJ1biB0aGlzIGxvZ2ljIHdoZW4gZG9pbmcgU1NSXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfSwgdGhpcy5tZXNzYWdlRGF0YS50aW1lb3V0KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==