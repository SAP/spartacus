/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { ReplaySubject, Subject } from 'rxjs';
import * as i0 from "@angular/core";
const DEFAULT_INFO_TIMEOUT = 3000;
export class MessageService {
    constructor() {
        this.data$ = new ReplaySubject();
    }
    get() {
        return this.data$;
    }
    add(message) {
        message = { ...this.getDefaultMessage(message), ...message };
        message.events = new Subject();
        this.data$.next(message);
        return message.events;
    }
    close(message) {
        message?.next({ close: true });
    }
    /**
     * Sets the message type to INFO, and adds a default timeout
     * for info messages.
     */
    getDefaultMessage(message) {
        const defaultMessage = {
            type: GlobalMessageType.MSG_TYPE_INFO,
        };
        if (!message.type ||
            (message.type === GlobalMessageType.MSG_TYPE_INFO && !message.timeout)) {
            defaultMessage.timeout = DEFAULT_INFO_TIMEOUT;
        }
        return defaultMessage;
    }
    clear() {
        this.data$.next(undefined); // TODO: CXSPA-3088 Type incongruity
    }
}
MessageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MessageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9tZXNzYWdlL3NlcnZpY2VzL21lc3NhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQWMsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHMUQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUM7QUFHbEMsTUFBTSxPQUFPLGNBQWM7SUFEM0I7UUFLWSxVQUFLLEdBQXFCLElBQUksYUFBYSxFQUFFLENBQUM7S0FxQ3pEO0lBbkNDLEdBQUc7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxPQUFVO1FBQ1osT0FBTyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQztRQUM3RCxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksT0FBTyxFQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBeUM7UUFDN0MsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7O09BR0c7SUFDTyxpQkFBaUIsQ0FBQyxPQUFVO1FBQ3BDLE1BQU0sY0FBYyxHQUFnQjtZQUNsQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsYUFBYTtTQUN0QyxDQUFDO1FBQ0YsSUFDRSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ2IsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLGlCQUFpQixDQUFDLGFBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFDdEU7WUFDQSxjQUFjLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1NBQy9DO1FBQ0QsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUF5QixDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7SUFDbEYsQ0FBQzs7MkdBeENVLGNBQWM7K0dBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUQxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2xvYmFsTWVzc2FnZVR5cGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWVzc2FnZURhdGEsIE1lc3NhZ2VFdmVudERhdGEgfSBmcm9tICcuLi9tZXNzYWdlLm1vZGVsJztcblxuY29uc3QgREVGQVVMVF9JTkZPX1RJTUVPVVQgPSAzMDAwO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlcnZpY2U8XG4gIE8gZXh0ZW5kcyBNZXNzYWdlRXZlbnREYXRhID0gTWVzc2FnZUV2ZW50RGF0YSxcbiAgVCBleHRlbmRzIE1lc3NhZ2VEYXRhPE8+ID0gTWVzc2FnZURhdGE8Tz5cbj4ge1xuICBwcm90ZWN0ZWQgZGF0YSQ6IFJlcGxheVN1YmplY3Q8VD4gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuXG4gIGdldCgpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhJDtcbiAgfVxuXG4gIGFkZChtZXNzYWdlOiBUKTogU3ViamVjdDxPPiB7XG4gICAgbWVzc2FnZSA9IHsgLi4udGhpcy5nZXREZWZhdWx0TWVzc2FnZShtZXNzYWdlKSwgLi4ubWVzc2FnZSB9O1xuICAgIG1lc3NhZ2UuZXZlbnRzID0gbmV3IFN1YmplY3Q8Tz4oKTtcbiAgICB0aGlzLmRhdGEkLm5leHQobWVzc2FnZSk7XG4gICAgcmV0dXJuIG1lc3NhZ2UuZXZlbnRzO1xuICB9XG5cbiAgY2xvc2UobWVzc2FnZTogU3ViamVjdDxNZXNzYWdlRXZlbnREYXRhPiB8IG51bGwpIHtcbiAgICBtZXNzYWdlPy5uZXh0KHsgY2xvc2U6IHRydWUgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbWVzc2FnZSB0eXBlIHRvIElORk8sIGFuZCBhZGRzIGEgZGVmYXVsdCB0aW1lb3V0XG4gICAqIGZvciBpbmZvIG1lc3NhZ2VzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldERlZmF1bHRNZXNzYWdlKG1lc3NhZ2U6IFQpOiBNZXNzYWdlRGF0YSB7XG4gICAgY29uc3QgZGVmYXVsdE1lc3NhZ2U6IE1lc3NhZ2VEYXRhID0ge1xuICAgICAgdHlwZTogR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfSU5GTyxcbiAgICB9O1xuICAgIGlmIChcbiAgICAgICFtZXNzYWdlLnR5cGUgfHxcbiAgICAgIChtZXNzYWdlLnR5cGUgPT09IEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0lORk8gJiYgIW1lc3NhZ2UudGltZW91dClcbiAgICApIHtcbiAgICAgIGRlZmF1bHRNZXNzYWdlLnRpbWVvdXQgPSBERUZBVUxUX0lORk9fVElNRU9VVDtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRNZXNzYWdlO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5kYXRhJC5uZXh0KHVuZGVmaW5lZCBhcyB1bmtub3duIGFzIFQpOyAvLyBUT0RPOiBDWFNQQS0zMDg4IFR5cGUgaW5jb25ncnVpdHlcbiAgfVxufVxuIl19