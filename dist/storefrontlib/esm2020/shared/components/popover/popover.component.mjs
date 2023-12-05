/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, TemplateRef, } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { PopoverEvent } from './popover.model';
import * as i0 from "@angular/core";
import * as i1 from "../../services/positioning/positioning.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "../../../layout/a11y/keyboard-focus/focus.directive";
import * as i6 from "../../../cms-components/misc/icon/icon.component";
export class PopoverComponent {
    /**
     * Listens for click inside popover component wrapper.
     */
    insideClick() {
        this.eventSubject.next(PopoverEvent.INSIDE_CLICK);
    }
    /**
     * Listens for every document click and ignores clicks
     * inside component.
     */
    outsideClick(event) {
        if (!this.isClickedOnPopover(event) && !this.isClickedOnDirective(event)) {
            this.eventSubject.next(PopoverEvent.OUTSIDE_CLICK);
        }
    }
    /**
     * Listens for `escape` keydown event.
     */
    escapeKeydown() {
        this.eventSubject.next(PopoverEvent.ESCAPE_KEYDOWN);
    }
    isClickedOnPopover(event) {
        return this.popoverInstance.location.nativeElement.contains(event.target);
    }
    isClickedOnDirective(event) {
        return this.triggerElement.nativeElement.contains(event.target);
    }
    /**
     * Emits close event trigger.
     */
    close(event) {
        event.preventDefault();
        if (event instanceof MouseEvent) {
            this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_CLICK);
        }
        else {
            this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_KEYDOWN);
        }
    }
    /**
     * Method uses `Renderer2` service to listen window scroll event.
     *
     * Registered only if property `positionOnScroll` is set to `true`.
     */
    triggerScrollEvent() {
        this.scrollEventUnlistener = this.renderer.listen(this.winRef.nativeWindow, 'scroll', () => this.positionPopover());
    }
    /**
     * Method uses positioning service calculation and based on that
     * updates class name for popover component instance.
     */
    positionPopover() {
        this.popoverClass = this.positioningService.positionElements(this.triggerElement.nativeElement, this.popoverInstance.location.nativeElement, this.positioningService.getPositioningClass(this.position, this.autoPositioning), this.appendToBody);
        this.changeDetectionRef.markForCheck();
        this.baseClass = `${this.customClass} ${this.popoverClass} opened`;
    }
    ngOnInit() {
        if (!this.customClass) {
            this.customClass = 'cx-popover';
        }
        if (!this.position) {
            this.position = 'top';
        }
        if (this.autoPositioning === undefined) {
            this.autoPositioning = true;
        }
        this.baseClass = `${this.customClass}`;
        this.resizeSub = this.winRef.resize$.subscribe(() => {
            this.positionPopover();
        });
        this.routeChangeSub = this.router.events
            .pipe(filter((event) => event instanceof NavigationStart))
            .subscribe(() => {
            this.eventSubject.next(PopoverEvent.ROUTE_CHANGE);
        });
        if (this.positionOnScroll) {
            this.triggerScrollEvent();
        }
    }
    /**
     * indicates if passed content is a TemplateRef or string.
     */
    isTemplate(content) {
        return content instanceof TemplateRef;
    }
    isString(content) {
        return !(content instanceof TemplateRef);
    }
    ngAfterViewChecked() {
        this.positionPopover();
    }
    ngOnDestroy() {
        if (this.resizeSub) {
            this.resizeSub.unsubscribe();
        }
        if (this.routeChangeSub) {
            this.routeChangeSub.unsubscribe();
        }
        if (this.scrollEventUnlistener) {
            this.scrollEventUnlistener();
        }
    }
    constructor(positioningService, winRef, changeDetectionRef, renderer, router) {
        this.positioningService = positioningService;
        this.winRef = winRef;
        this.changeDetectionRef = changeDetectionRef;
        this.renderer = renderer;
        this.router = router;
        /**
         * Icon types for close button icon.
         */
        this.iconTypes = ICON_TYPE;
    }
}
PopoverComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PopoverComponent, deps: [{ token: i1.PositioningService }, { token: i2.WindowRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Component });
PopoverComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PopoverComponent, selector: "cx-popover", host: { listeners: { "click": "insideClick()", "document:click": "outsideClick($event)", "keydown.escape": "escapeKeydown()" }, properties: { "className": "this.baseClass" } }, ngImport: i0, template: "<div class=\"arrow\"></div>\n<div class=\"popover-body\" [cxFocus]=\"focusConfig\">\n  <div class=\"cx-close-row\">\n    <button\n      *ngIf=\"displayCloseButton\"\n      type=\"button\"\n      class=\"close\"\n      (keydown.enter)=\"close($event)\"\n      (keydown.space)=\"close($event)\"\n      (click)=\"close($event)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n  <ng-container *ngIf=\"isTemplate(content)\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </ng-container>\n  <span *ngIf=\"isString(content)\">{{ content }}</span>\n</div>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i5.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i6.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-popover', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"arrow\"></div>\n<div class=\"popover-body\" [cxFocus]=\"focusConfig\">\n  <div class=\"cx-close-row\">\n    <button\n      *ngIf=\"displayCloseButton\"\n      type=\"button\"\n      class=\"close\"\n      (keydown.enter)=\"close($event)\"\n      (keydown.space)=\"close($event)\"\n      (click)=\"close($event)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n  <ng-container *ngIf=\"isTemplate(content)\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </ng-container>\n  <span *ngIf=\"isString(content)\">{{ content }}</span>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.PositioningService }, { type: i2.WindowRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i3.Router }]; }, propDecorators: { baseClass: [{
                type: HostBinding,
                args: ['className']
            }], insideClick: [{
                type: HostListener,
                args: ['click']
            }], outsideClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }], escapeKeydown: [{
                type: HostListener,
                args: ['keydown.escape']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBR1QsV0FBVyxFQUNYLFlBQVksRUFJWixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBRzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFHekUsT0FBTyxFQUFFLFlBQVksRUFBbUIsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7QUFPaEUsTUFBTSxPQUFPLGdCQUFnQjtJQXNHM0I7O09BRUc7SUFFSCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7O09BR0c7SUFFSCxZQUFZLENBQUMsS0FBaUI7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4RSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFFSCxhQUFhO1FBQ1gs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QVc7Z0JBTXhCLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxPQUFPO2dCQVVyQixZQUFZO3NCQURYLFlBQVk7dUJBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBVzFDLGFBQWE7c0JBRFosWUFBWTt1QkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU3RhcnQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICcuLi8uLi8uLi9jbXMtY29tcG9uZW50cy9taXNjL2ljb24vaWNvbi5tb2RlbCc7XG5pbXBvcnQgeyBGb2N1c0NvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2tleWJvYXJkLWZvY3VzLm1vZGVsJztcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Bvc2l0aW9uaW5nL3Bvc2l0aW9uaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wb3ZlckV2ZW50LCBQb3BvdmVyUG9zaXRpb24gfSBmcm9tICcuL3BvcG92ZXIubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1wb3BvdmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdDaGVja2VkIHtcbiAgLyoqXG4gICAqIFN0cmluZyBvciB0ZW1wbGF0ZSB0byBiZSByZW5kZXJlZCBpbnNpZGUgcG9wb3ZlciB3cmFwcGVyIGNvbXBvbmVudC5cbiAgICovXG4gIGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEVsZW1lbnQgd2hpY2ggdHJpZ2dlcnMgZGlzcGxheWluZyBwb3BvdmVyIGNvbXBvbmVudC5cbiAgICogVGhpcyBwcm9wZXJ0eSBpcyBuZWVkZWQgdG8gY2FsY3VsYXRlIHZhbGlkIHBvc2l0aW9uIGZvciBwb3BvdmVyLlxuICAgKi9cbiAgdHJpZ2dlckVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgaW5pdGlhdGVkIHBvcG92ZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwb3BvdmVySW5zdGFuY2U6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29tcG9uZW50PjtcblxuICAvKipcbiAgICogRmxhZyB3aGljaCBpbmZvcm1zIHBvc2l0aW9uaW5nIHNlcnZpY2UgaWYgcG9wb3ZlciBjb21wb25lbnRcbiAgICogc2hvdWxkIGJlIGFwcGVuZGVkIHRvIGJvZHkuIE90aGVyd2lzZSBwb3BvdmVyIGlzIGRpc3BsYXllZCByaWdodCBhZnRlclxuICAgKiB0cmlnZ2VyIGVsZW1lbnQgaW4gRE9NLlxuICAgKi9cbiAgYXBwZW5kVG9Cb2R5PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIHByZWZlcnJlZCBwbGFjZW1lbnQgb2YgdGhlIHBvcG92ZXIuIERlZmF1bHQgcG9wb3ZlciBwb3NpdGlvbiBpcyAndG9wJy5cbiAgICpcbiAgICogQWxsb3dlZCBwb3BvdmVyIHBvc2l0aW9uczogJ2F1dG8nLCAndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JyxcbiAgICogJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCcsICdib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLFxuICAgKiAnbGVmdC10b3AnLCAnbGVmdC1ib3R0b20nLCAncmlnaHQtdG9wJywgJ3JpZ2h0LWJvdHRvbScuXG4gICAqL1xuICBwb3NpdGlvbj86IFBvcG92ZXJQb3NpdGlvbjtcblxuICAvKipcbiAgICogRmxhZyB1c2VkIHRvIGRlZmluZSBpZiBwb3BvdmVyIHNob3VsZCBsb29rIGZvciB0aGUgYmVzdCBwbGFjZW1lbnRcbiAgICogaW4gY2FzZSBpZiB0aGVyZSBpcyBub3QgZW5vdWdoIHNwYWNlIGluIHZpZXdwb3J0IGZvciBwcmVmZXJyZWQgcG9zaXRpb24uXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQgdGhpcyBwcm9wZXJ0eSBpcyBzZXQgdG8gYHRydWVgLlxuICAgKlxuICAgKiBWYWx1ZSBvZiB0aGlzIGZsYWcgaXMgb21pdHRlZCBpZiBwcmVmZXJyZWQgcG9zaXRpb24gaXMgc2V0IHRvIGBhdXRvYC5cbiAgICovXG4gIGF1dG9Qb3NpdGlvbmluZz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEN1c3RvbSBjbGFzcyBuYW1lIHBhc3NlZCB0byBwb3BvdmVyIGNvbXBvbmVudC5cbiAgICpcbiAgICogSWYgdGhpcyBwcm9wZXJ0eSBpcyBub3Qgc2V0IHRoZSBkZWZhdWx0IHBvcG92ZXIgY2xhc3MgaXMgYGN4LXBvcG92ZXJgLlxuICAgKi9cbiAgY3VzdG9tQ2xhc3M/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEZsYWcgdXNlZCB0byBzaG93L2hpZGUgY2xvc2UgYnV0dG9uIGluIHBvcG92ZXIgY29tcG9uZW50LlxuICAgKi9cbiAgZGlzcGxheUNsb3NlQnV0dG9uPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQWZ0ZXIgcG9wb3ZlciBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWQgcG9zaXRpb24gbmVlZHMgdG8gYmUgY2hhbmdpbmcgZHluYW1pY2FsbHlcbiAgICogaW4gY2FzZSBpZiBhbnkgdmlld3BvcnQgY2hhbmdlcyBoYXBwZW5lZC5cbiAgICovXG4gIHJlc2l6ZVN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBBZnRlciBwb3BvdmVyIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZCBwb3BvdmVyIHNob3VsZCBiZSBjbG9zZWQgaW4gY2FzZVxuICAgKiBpZiBjdXJyZW50IHJvdXRlIGhhcyBiZWVuIGNoYW5nZWQuXG4gICAqL1xuICByb3V0ZUNoYW5nZVN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBDbGFzcyBuYW1lIGdlbmVyYXRlZCBieSBwb3NpdGlvbmluZyBzZXJ2aWNlIGluZGljYXRpbmcgcG9zaXRpb24gb2YgcG9wb3Zlci5cbiAgICovXG4gIHBvcG92ZXJDbGFzczogUG9wb3ZlclBvc2l0aW9uO1xuXG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIGZvciBhMTF5IGltcHJvdmVtZW50cy5cbiAgICovXG4gIGZvY3VzQ29uZmlnOiBGb2N1c0NvbmZpZztcblxuICAvKipcbiAgICogRmxhZyBpbmRpY2F0ZXMgaWYgcG9wb3ZlciBzaG91bGQgYmUgcmUtcG9zaXRpb25lZCBvbiBzY3JvbGwgZXZlbnQuXG4gICAqL1xuICBwb3NpdGlvbk9uU2Nyb2xsPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWNvbiB0eXBlcyBmb3IgY2xvc2UgYnV0dG9uIGljb24uXG4gICAqL1xuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG5cbiAgLyoqXG4gICAqIFN1YmplY3Qgd2hpY2ggZW1pdHMgc3BlY2lmaWMgdHlwZSBvZiBgUG9wb3ZlckV2ZW50YC5cbiAgICovXG4gIGV2ZW50U3ViamVjdDogU3ViamVjdDxQb3BvdmVyRXZlbnQ+O1xuXG4gIC8qKlxuICAgKiBTY3JvbGwgZXZlbnQgdW5saXN0ZW5lci5cbiAgICovXG4gIHNjcm9sbEV2ZW50VW5saXN0ZW5lcjogKCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQmluZGluZyBjbGFzcyBuYW1lIHByb3BlcnR5LlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzc05hbWUnKSBiYXNlQ2xhc3M6IHN0cmluZztcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgY2xpY2sgaW5zaWRlIHBvcG92ZXIgY29tcG9uZW50IHdyYXBwZXIuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIGluc2lkZUNsaWNrKCkge1xuICAgIHRoaXMuZXZlbnRTdWJqZWN0Lm5leHQoUG9wb3ZlckV2ZW50LklOU0lERV9DTElDSyk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlcnkgZG9jdW1lbnQgY2xpY2sgYW5kIGlnbm9yZXMgY2xpY2tzXG4gICAqIGluc2lkZSBjb21wb25lbnQuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG91dHNpZGVDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5pc0NsaWNrZWRPblBvcG92ZXIoZXZlbnQpICYmICF0aGlzLmlzQ2xpY2tlZE9uRGlyZWN0aXZlKGV2ZW50KSkge1xuICAgICAgdGhpcy5ldmVudFN1YmplY3QubmV4dChQb3BvdmVyRXZlbnQuT1VUU0lERV9DTElDSyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgZm9yIGBlc2NhcGVgIGtleWRvd24gZXZlbnQuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVzY2FwZScpXG4gIGVzY2FwZUtleWRvd24oKSB7XG4gICAgdGhpcy5ldmVudFN1YmplY3QubmV4dChQb3BvdmVyRXZlbnQuRVNDQVBFX0tFWURPV04pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ2xpY2tlZE9uUG9wb3ZlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIHJldHVybiB0aGlzLnBvcG92ZXJJbnN0YW5jZS5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDbGlja2VkT25EaXJlY3RpdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy50cmlnZ2VyRWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgY2xvc2UgZXZlbnQgdHJpZ2dlci5cbiAgICovXG4gIGNsb3NlKGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCB8IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICB0aGlzLmV2ZW50U3ViamVjdC5uZXh0KFBvcG92ZXJFdmVudC5DTE9TRV9CVVRUT05fQ0xJQ0spO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV2ZW50U3ViamVjdC5uZXh0KFBvcG92ZXJFdmVudC5DTE9TRV9CVVRUT05fS0VZRE9XTik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB1c2VzIGBSZW5kZXJlcjJgIHNlcnZpY2UgdG8gbGlzdGVuIHdpbmRvdyBzY3JvbGwgZXZlbnQuXG4gICAqXG4gICAqIFJlZ2lzdGVyZWQgb25seSBpZiBwcm9wZXJ0eSBgcG9zaXRpb25PblNjcm9sbGAgaXMgc2V0IHRvIGB0cnVlYC5cbiAgICovXG4gIHRyaWdnZXJTY3JvbGxFdmVudCgpIHtcbiAgICB0aGlzLnNjcm9sbEV2ZW50VW5saXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgdGhpcy53aW5SZWYubmF0aXZlV2luZG93LFxuICAgICAgJ3Njcm9sbCcsXG4gICAgICAoKSA9PiB0aGlzLnBvc2l0aW9uUG9wb3ZlcigpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdXNlcyBwb3NpdGlvbmluZyBzZXJ2aWNlIGNhbGN1bGF0aW9uIGFuZCBiYXNlZCBvbiB0aGF0XG4gICAqIHVwZGF0ZXMgY2xhc3MgbmFtZSBmb3IgcG9wb3ZlciBjb21wb25lbnQgaW5zdGFuY2UuXG4gICAqL1xuICBwb3NpdGlvblBvcG92ZXIoKSB7XG4gICAgdGhpcy5wb3BvdmVyQ2xhc3MgPSB0aGlzLnBvc2l0aW9uaW5nU2VydmljZS5wb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgdGhpcy50cmlnZ2VyRWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgdGhpcy5wb3BvdmVySW5zdGFuY2UubG9jYXRpb24ubmF0aXZlRWxlbWVudCxcbiAgICAgIHRoaXMucG9zaXRpb25pbmdTZXJ2aWNlLmdldFBvc2l0aW9uaW5nQ2xhc3MoXG4gICAgICAgIHRoaXMucG9zaXRpb24sXG4gICAgICAgIHRoaXMuYXV0b1Bvc2l0aW9uaW5nXG4gICAgICApLFxuICAgICAgdGhpcy5hcHBlbmRUb0JvZHlcbiAgICApO1xuXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb25SZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5iYXNlQ2xhc3MgPSBgJHt0aGlzLmN1c3RvbUNsYXNzfSAke3RoaXMucG9wb3ZlckNsYXNzfSBvcGVuZWRgO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmN1c3RvbUNsYXNzKSB7XG4gICAgICB0aGlzLmN1c3RvbUNsYXNzID0gJ2N4LXBvcG92ZXInO1xuICAgIH1cbiAgICBpZiAoIXRoaXMucG9zaXRpb24pIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSAndG9wJztcbiAgICB9XG4gICAgaWYgKHRoaXMuYXV0b1Bvc2l0aW9uaW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXV0b1Bvc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmJhc2VDbGFzcyA9IGAke3RoaXMuY3VzdG9tQ2xhc3N9YDtcblxuICAgIHRoaXMucmVzaXplU3ViID0gdGhpcy53aW5SZWYucmVzaXplJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5wb3NpdGlvblBvcG92ZXIoKTtcbiAgICB9KTtcblxuICAgIHRoaXMucm91dGVDaGFuZ2VTdWIgPSB0aGlzLnJvdXRlci5ldmVudHNcbiAgICAgIC5waXBlKGZpbHRlcigoZXZlbnQpID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50U3ViamVjdC5uZXh0KFBvcG92ZXJFdmVudC5ST1VURV9DSEFOR0UpO1xuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvbk9uU2Nyb2xsKSB7XG4gICAgICB0aGlzLnRyaWdnZXJTY3JvbGxFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBpbmRpY2F0ZXMgaWYgcGFzc2VkIGNvbnRlbnQgaXMgYSBUZW1wbGF0ZVJlZiBvciBzdHJpbmcuXG4gICAqL1xuICBpc1RlbXBsYXRlKGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pOiBjb250ZW50IGlzIFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIHJldHVybiBjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gIH1cblxuICBpc1N0cmluZyhjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KTogY29udGVudCBpcyBzdHJpbmcge1xuICAgIHJldHVybiAhKGNvbnRlbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZik7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5wb3NpdGlvblBvcG92ZXIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlc2l6ZVN1Yikge1xuICAgICAgdGhpcy5yZXNpemVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yb3V0ZUNoYW5nZVN1Yikge1xuICAgICAgdGhpcy5yb3V0ZUNoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjcm9sbEV2ZW50VW5saXN0ZW5lcikge1xuICAgICAgdGhpcy5zY3JvbGxFdmVudFVubGlzdGVuZXIoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcG9zaXRpb25pbmdTZXJ2aWNlOiBQb3NpdGlvbmluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlclxuICApIHt9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj5cbjxkaXYgY2xhc3M9XCJwb3BvdmVyLWJvZHlcIiBbY3hGb2N1c109XCJmb2N1c0NvbmZpZ1wiPlxuICA8ZGl2IGNsYXNzPVwiY3gtY2xvc2Utcm93XCI+XG4gICAgPGJ1dHRvblxuICAgICAgKm5nSWY9XCJkaXNwbGF5Q2xvc2VCdXR0b25cIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImNsb3NlXCJcbiAgICAgIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIlxuICAgICAgKGtleWRvd24uc3BhY2UpPVwiY2xvc2UoJGV2ZW50KVwiXG4gICAgICAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLkNMT1NFXCI+PC9jeC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVGVtcGxhdGUoY29udGVudClcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPHNwYW4gKm5nSWY9XCJpc1N0cmluZyhjb250ZW50KVwiPnt7IGNvbnRlbnQgfX08L3NwYW4+XG48L2Rpdj5cbiJdfQ==