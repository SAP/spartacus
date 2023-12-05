/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, EventEmitter, HostListener, Output, } from '@angular/core';
import { PersistFocusDirective } from '../persist/persist-focus.directive';
import * as i0 from "@angular/core";
import * as i1 from "./escape-focus.service";
/**
 * Directive to focus the host element whenever the `escape` key is captured.
 * UiEvents bubble up by nature, which is why the `cxEscGroup` can be used
 * on a tree of elements. Each time the escape key is used, the focus will
 * move up in the DOM tree.
 *
 */
export class EscapeFocusDirective extends PersistFocusDirective {
    /**
     * Handles the escape key event.
     * @param event the native keyboard event which contains the escape keydown event
     */
    handleEscape(event) {
        if (this.service.shouldFocus(this.config)) {
            this.service.handleEscape(this.host, this.config, event);
        }
        this.esc.emit(this.service.shouldFocus(this.config));
    }
    constructor(elementRef, service) {
        super(elementRef, service);
        this.elementRef = elementRef;
        this.service = service;
        this.defaultConfig = { focusOnEscape: true };
        this.esc = new EventEmitter();
    }
    ngOnInit() {
        if (this.service.shouldFocus(this.config)) {
            this.requiredTabindex = -1;
        }
        super.ngOnInit();
    }
}
EscapeFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EscapeFocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.EscapeFocusService }], target: i0.ɵɵFactoryTarget.Directive });
EscapeFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: EscapeFocusDirective, outputs: { esc: "esc" }, host: { listeners: { "keydown.escape": "handleEscape($event)" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EscapeFocusDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.EscapeFocusService }]; }, propDecorators: { esc: [{
                type: Output
            }], handleEscape: [{
                type: HostListener,
                args: ['keydown.escape', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNjYXBlLWZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2ExMXkva2V5Ym9hcmQtZm9jdXMvZXNjYXBlL2VzY2FwZS1mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLFlBQVksRUFFWixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7OztBQUczRTs7Ozs7O0dBTUc7QUFFSCxNQUFNLE9BQU8sb0JBQ1gsU0FBUSxxQkFBcUI7SUFVN0I7OztPQUdHO0lBRUgsWUFBWSxDQUFDLEtBQW9CO1FBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxZQUNZLFVBQXNCLEVBQ3RCLE9BQTJCO1FBRXJDLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFIakIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQXJCN0Isa0JBQWEsR0FBc0IsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFLM0QsUUFBRyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFtQjVDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7O2lIQW5DVSxvQkFBb0I7cUdBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxTQUFTO2tJQVVFLEdBQUc7c0JBQVosTUFBTTtnQkFPUCxZQUFZO3NCQURYLFlBQVk7dUJBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFc2NhcGVGb2N1c0NvbmZpZyB9IGZyb20gJy4uL2tleWJvYXJkLWZvY3VzLm1vZGVsJztcbmltcG9ydCB7IFBlcnNpc3RGb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4uL3BlcnNpc3QvcGVyc2lzdC1mb2N1cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRXNjYXBlRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9lc2NhcGUtZm9jdXMuc2VydmljZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGZvY3VzIHRoZSBob3N0IGVsZW1lbnQgd2hlbmV2ZXIgdGhlIGBlc2NhcGVgIGtleSBpcyBjYXB0dXJlZC5cbiAqIFVpRXZlbnRzIGJ1YmJsZSB1cCBieSBuYXR1cmUsIHdoaWNoIGlzIHdoeSB0aGUgYGN4RXNjR3JvdXBgIGNhbiBiZSB1c2VkXG4gKiBvbiBhIHRyZWUgb2YgZWxlbWVudHMuIEVhY2ggdGltZSB0aGUgZXNjYXBlIGtleSBpcyB1c2VkLCB0aGUgZm9jdXMgd2lsbFxuICogbW92ZSB1cCBpbiB0aGUgRE9NIHRyZWUuXG4gKlxuICovXG5ARGlyZWN0aXZlKCkgLy8gc2VsZWN0b3I6ICdbY3hFc2NGb2N1c10nLFxuZXhwb3J0IGNsYXNzIEVzY2FwZUZvY3VzRGlyZWN0aXZlXG4gIGV4dGVuZHMgUGVyc2lzdEZvY3VzRGlyZWN0aXZlXG4gIGltcGxlbWVudHMgT25Jbml0XG57XG4gIHByb3RlY3RlZCBkZWZhdWx0Q29uZmlnOiBFc2NhcGVGb2N1c0NvbmZpZyA9IHsgZm9jdXNPbkVzY2FwZTogdHJ1ZSB9O1xuXG4gIC8vIEBJbnB1dCgnY3hFc2NGb2N1cycpXG4gIHByb3RlY3RlZCBjb25maWc6IEVzY2FwZUZvY3VzQ29uZmlnO1xuXG4gIEBPdXRwdXQoKSBlc2MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGVzY2FwZSBrZXkgZXZlbnQuXG4gICAqIEBwYXJhbSBldmVudCB0aGUgbmF0aXZlIGtleWJvYXJkIGV2ZW50IHdoaWNoIGNvbnRhaW5zIHRoZSBlc2NhcGUga2V5ZG93biBldmVudFxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lc2NhcGUnLCBbJyRldmVudCddKVxuICBoYW5kbGVFc2NhcGUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZXJ2aWNlLnNob3VsZEZvY3VzKHRoaXMuY29uZmlnKSkge1xuICAgICAgdGhpcy5zZXJ2aWNlLmhhbmRsZUVzY2FwZSh0aGlzLmhvc3QsIHRoaXMuY29uZmlnLCBldmVudCk7XG4gICAgfVxuICAgIHRoaXMuZXNjLmVtaXQodGhpcy5zZXJ2aWNlLnNob3VsZEZvY3VzKHRoaXMuY29uZmlnKSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgc2VydmljZTogRXNjYXBlRm9jdXNTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHNlcnZpY2UpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuc2VydmljZS5zaG91bGRGb2N1cyh0aGlzLmNvbmZpZykpIHtcbiAgICAgIHRoaXMucmVxdWlyZWRUYWJpbmRleCA9IC0xO1xuICAgIH1cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG59XG4iXX0=