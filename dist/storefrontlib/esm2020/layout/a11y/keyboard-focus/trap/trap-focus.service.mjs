/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { TrapFocus, } from '../keyboard-focus.model';
import { TabFocusService } from '../tab/tab-focus.service';
import * as i0 from "@angular/core";
export class TrapFocusService extends TabFocusService {
    /**
     * Indicates whether any of the child elements of the host are focusable.
     *
     * @param host `HTMLElement` that is used to query the focusable elements.
     */
    hasFocusableChildren(host) {
        return this.findFocusable(host).length > 0;
    }
    /**
     * Focus the next or previous element of all available focusable elements.
     * The focus is _trapped_ in case there's no next or previous available element.
     * The focus will automatically move the start or end of the list.
     */
    moveFocus(host, config, increment, event) {
        const focusable = this.findFocusable(host);
        let index = focusable.findIndex((v) => v === event.target) + increment;
        const shouldMoveFocus = (index >= 0 && index < focusable.length) ||
            (index < 0 && this.getTrapStart(config.trap)) ||
            (index >= focusable.length && this.getTrapEnd(config.trap));
        if (shouldMoveFocus) {
            if (index >= focusable.length) {
                index = 0;
            }
            if (index < 0) {
                index = focusable.length - 1;
            }
            event.preventDefault();
            event.stopPropagation();
            const el = focusable[index];
            el.focus();
        }
    }
    getTrapStart(trap) {
        return trap === true || trap === TrapFocus.start;
    }
    getTrapEnd(trap) {
        return trap === true || trap === TrapFocus.end;
    }
}
TrapFocusService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrapFocusService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
TrapFocusService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrapFocusService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrapFocusService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhcC1mb2N1cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvYTExeS9rZXlib2FyZC1mb2N1cy90cmFwL3RyYXAtZm9jdXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsU0FBUyxHQUdWLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUszRCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsZUFBZTtJQUNuRDs7OztPQUlHO0lBQ0gsb0JBQW9CLENBQUMsSUFBaUI7UUFDcEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTLENBQ1AsSUFBaUIsRUFDakIsTUFBdUIsRUFDdkIsU0FBcUIsRUFDckIsS0FBYztRQUVkLE1BQU0sU0FBUyxHQUFrQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFELElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBRXZFLE1BQU0sZUFBZSxHQUNuQixDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDeEMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUU5RCxJQUFJLGVBQWUsRUFBRTtZQUNuQixJQUFJLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO2dCQUM3QixLQUFLLEdBQUcsQ0FBQyxDQUFDO2FBQ1g7WUFDRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQzlCO1lBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV4QixNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFNUIsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ1o7SUFDSCxDQUFDO0lBRVMsWUFBWSxDQUFDLElBQStCO1FBQ3BELE9BQU8sSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssU0FBUyxDQUFDLEtBQUssQ0FBQztJQUNuRCxDQUFDO0lBRVMsVUFBVSxDQUFDLElBQStCO1FBQ2xELE9BQU8sSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUNqRCxDQUFDOzs2R0FyRFUsZ0JBQWdCO2lIQUFoQixnQkFBZ0IsY0FGZixNQUFNOzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNT1ZFX0ZPQ1VTLFxuICBUcmFwRm9jdXMsXG4gIFRyYXBGb2N1c0NvbmZpZyxcbiAgVHJhcEZvY3VzVHlwZSxcbn0gZnJvbSAnLi4va2V5Ym9hcmQtZm9jdXMubW9kZWwnO1xuaW1wb3J0IHsgVGFiRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vdGFiL3RhYi1mb2N1cy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFRyYXBGb2N1c1NlcnZpY2UgZXh0ZW5kcyBUYWJGb2N1c1NlcnZpY2Uge1xuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgYW55IG9mIHRoZSBjaGlsZCBlbGVtZW50cyBvZiB0aGUgaG9zdCBhcmUgZm9jdXNhYmxlLlxuICAgKlxuICAgKiBAcGFyYW0gaG9zdCBgSFRNTEVsZW1lbnRgIHRoYXQgaXMgdXNlZCB0byBxdWVyeSB0aGUgZm9jdXNhYmxlIGVsZW1lbnRzLlxuICAgKi9cbiAgaGFzRm9jdXNhYmxlQ2hpbGRyZW4oaG9zdDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5maW5kRm9jdXNhYmxlKGhvc3QpLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXMgdGhlIG5leHQgb3IgcHJldmlvdXMgZWxlbWVudCBvZiBhbGwgYXZhaWxhYmxlIGZvY3VzYWJsZSBlbGVtZW50cy5cbiAgICogVGhlIGZvY3VzIGlzIF90cmFwcGVkXyBpbiBjYXNlIHRoZXJlJ3Mgbm8gbmV4dCBvciBwcmV2aW91cyBhdmFpbGFibGUgZWxlbWVudC5cbiAgICogVGhlIGZvY3VzIHdpbGwgYXV0b21hdGljYWxseSBtb3ZlIHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGxpc3QuXG4gICAqL1xuICBtb3ZlRm9jdXMoXG4gICAgaG9zdDogSFRNTEVsZW1lbnQsXG4gICAgY29uZmlnOiBUcmFwRm9jdXNDb25maWcsXG4gICAgaW5jcmVtZW50OiBNT1ZFX0ZPQ1VTLFxuICAgIGV2ZW50OiBVSUV2ZW50XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGZvY3VzYWJsZTogSFRNTEVsZW1lbnRbXSA9IHRoaXMuZmluZEZvY3VzYWJsZShob3N0KTtcblxuICAgIGxldCBpbmRleCA9IGZvY3VzYWJsZS5maW5kSW5kZXgoKHYpID0+IHYgPT09IGV2ZW50LnRhcmdldCkgKyBpbmNyZW1lbnQ7XG5cbiAgICBjb25zdCBzaG91bGRNb3ZlRm9jdXMgPVxuICAgICAgKGluZGV4ID49IDAgJiYgaW5kZXggPCBmb2N1c2FibGUubGVuZ3RoKSB8fFxuICAgICAgKGluZGV4IDwgMCAmJiB0aGlzLmdldFRyYXBTdGFydChjb25maWcudHJhcCkpIHx8XG4gICAgICAoaW5kZXggPj0gZm9jdXNhYmxlLmxlbmd0aCAmJiB0aGlzLmdldFRyYXBFbmQoY29uZmlnLnRyYXApKTtcblxuICAgIGlmIChzaG91bGRNb3ZlRm9jdXMpIHtcbiAgICAgIGlmIChpbmRleCA+PSBmb2N1c2FibGUubGVuZ3RoKSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgaW5kZXggPSBmb2N1c2FibGUubGVuZ3RoIC0gMTtcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBjb25zdCBlbCA9IGZvY3VzYWJsZVtpbmRleF07XG5cbiAgICAgIGVsLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldFRyYXBTdGFydCh0cmFwOiBUcmFwRm9jdXNUeXBlIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRyYXAgPT09IHRydWUgfHwgdHJhcCA9PT0gVHJhcEZvY3VzLnN0YXJ0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFRyYXBFbmQodHJhcDogVHJhcEZvY3VzVHlwZSB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cmFwID09PSB0cnVlIHx8IHRyYXAgPT09IFRyYXBGb2N1cy5lbmQ7XG4gIH1cbn1cbiJdfQ==