/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, HostListener, Input, Optional, } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class AtMessageDirective {
    constructor(elementRef, templateRef, globalMessageService) {
        this.elementRef = elementRef;
        this.templateRef = templateRef;
        this.globalMessageService = globalMessageService;
    }
    get host() {
        return !!this.templateRef
            ? this.templateRef.elementRef.nativeElement.parentElement
            : this.elementRef.nativeElement;
    }
    /**
     * Emit assistive global meesage to improve screen reader vocalization.
     * @param event
     */
    handleClick(event) {
        event?.preventDefault();
        if (event?.target === this.host && this.cxAtMessage) {
            const message = Array.isArray(this.cxAtMessage)
                ? this.cxAtMessage.join('\n')
                : this.cxAtMessage;
            this.globalMessageService
                .get()
                .pipe(take(1))
                .subscribe((globalMessageEntities) => {
                // Override current assitive message.
                if (globalMessageEntities[GlobalMessageType.MSG_TYPE_ASSISTIVE]) {
                    this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ASSISTIVE);
                }
                this.globalMessageService.add(message, GlobalMessageType.MSG_TYPE_ASSISTIVE);
            });
        }
    }
}
AtMessageDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AtMessageDirective, deps: [{ token: i0.ElementRef }, { token: i0.TemplateRef, optional: true }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Directive });
AtMessageDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: AtMessageDirective, selector: "[cxAtMessage]", inputs: { cxAtMessage: "cxAtMessage" }, host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AtMessageDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxAtMessage]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.TemplateRef, decorators: [{
                    type: Optional
                }] }, { type: i1.GlobalMessageService }]; }, propDecorators: { cxAtMessage: [{
                type: Input
            }], handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaXN0aXZlLXRlY2hub2xvZ3ktbWVzc2FnZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL2Fzc2lzdGl2ZS10ZWNobm9sb2d5LW1lc3NhZ2UvYXNzaXN0aXZlLXRlY2hub2xvZ3ktbWVzc2FnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFDTCxRQUFRLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLGlCQUFpQixHQUNsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBS3RDLE1BQU0sT0FBTyxrQkFBa0I7SUFNN0IsWUFDWSxVQUFtQyxFQUN2QixXQUFxQyxFQUNqRCxvQkFBMEM7UUFGMUMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDdkIsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO1FBQ2pELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7SUFDbkQsQ0FBQztJQUVKLElBQWMsSUFBSTtRQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVztZQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWE7WUFDekQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7O09BR0c7SUFFSCxXQUFXLENBQUMsS0FBaUI7UUFDM0IsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDO1FBRXhCLElBQUksS0FBSyxFQUFFLE1BQU0sS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUVyQixJQUFJLENBQUMsb0JBQW9CO2lCQUN0QixHQUFHLEVBQUU7aUJBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixTQUFTLENBQUMsQ0FBQyxxQkFBNEMsRUFBRSxFQUFFO2dCQUMxRCxxQ0FBcUM7Z0JBQ3JDLElBQUkscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsRUFBRTtvQkFDL0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FDOUIsaUJBQWlCLENBQUMsa0JBQWtCLENBQ3JDLENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsT0FBTyxFQUNQLGlCQUFpQixDQUFDLGtCQUFrQixDQUNyQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7OytHQS9DVSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUg5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7MEJBU0ksUUFBUTsrRUFKRixXQUFXO3NCQUFuQixLQUFLO2dCQW1CTixXQUFXO3NCQURWLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgR2xvYmFsTWVzc2FnZUVudGl0aWVzLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY3hBdE1lc3NhZ2VdJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRNZXNzYWdlRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIFVzYWdlIFtjeEF0TWVzc2FnZV09XCIndHJhbnNsYXRhYmxlS2V5JyB8IGN4VHJhbnNsYXRlXCJcbiAgICovXG4gIEBJbnB1dCgpIGN4QXRNZXNzYWdlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIGdldCBob3N0KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gISF0aGlzLnRlbXBsYXRlUmVmXG4gICAgICA/IHRoaXMudGVtcGxhdGVSZWYuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnRcbiAgICAgIDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogRW1pdCBhc3Npc3RpdmUgZ2xvYmFsIG1lZXNhZ2UgdG8gaW1wcm92ZSBzY3JlZW4gcmVhZGVyIHZvY2FsaXphdGlvbi5cbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQ/LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoZXZlbnQ/LnRhcmdldCA9PT0gdGhpcy5ob3N0ICYmIHRoaXMuY3hBdE1lc3NhZ2UpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBBcnJheS5pc0FycmF5KHRoaXMuY3hBdE1lc3NhZ2UpXG4gICAgICAgID8gdGhpcy5jeEF0TWVzc2FnZS5qb2luKCdcXG4nKVxuICAgICAgICA6IHRoaXMuY3hBdE1lc3NhZ2U7XG5cbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2VcbiAgICAgICAgLmdldCgpXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGdsb2JhbE1lc3NhZ2VFbnRpdGllczogR2xvYmFsTWVzc2FnZUVudGl0aWVzKSA9PiB7XG4gICAgICAgICAgLy8gT3ZlcnJpZGUgY3VycmVudCBhc3NpdGl2ZSBtZXNzYWdlLlxuICAgICAgICAgIGlmIChnbG9iYWxNZXNzYWdlRW50aXRpZXNbR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQVNTSVNUSVZFXSkge1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5yZW1vdmUoXG4gICAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0FTU0lTVElWRVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQVNTSVNUSVZFXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=