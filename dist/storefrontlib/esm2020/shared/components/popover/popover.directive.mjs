/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, Input, Output, EventEmitter, HostListener, } from '@angular/core';
import { Subject } from 'rxjs';
import { PopoverComponent } from './popover.component';
import { PopoverEvent } from './popover.model';
import * as i0 from "@angular/core";
import * as i1 from "./popover.service";
import * as i2 from "@spartacus/core";
/**
 * Directive to bind popover with any DOM element.
 */
export class PopoverDirective {
    /**
     * Listen events fired on element binded to popover directive.
     *
     * Based on event type some a11y improvements can be made.
     * For example if popover was opened by `space` or `enter` key
     * dedicated `FocusConfig` can be set to autofocus first
     * focusable element in popover container.
     */
    handlePress(event) {
        event?.preventDefault();
        if (event?.target === this.element.nativeElement && !this.isOpen) {
            this.eventSubject.next(PopoverEvent.OPEN_BY_KEYBOARD);
        }
        else if (this.isOpen) {
            this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_KEYDOWN);
        }
    }
    handleTab() {
        if (!this.focusConfig?.trap && this.isOpen) {
            this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_KEYDOWN);
        }
    }
    handleEscape() {
        this.eventSubject.next(PopoverEvent.ESCAPE_KEYDOWN);
    }
    handleClick(event) {
        event?.preventDefault();
        if (event?.target === this.element.nativeElement && !this.isOpen) {
            this.eventSubject.next(PopoverEvent.OPEN);
        }
        else if (this.isOpen) {
            this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_CLICK);
        }
    }
    /**
     * Method performs open action for popover component.
     */
    open(event) {
        if (!this.cxPopoverOptions?.disable) {
            this.isOpen = true;
            this.focusConfig = this.popoverService.getFocusConfig(event, this.cxPopoverOptions?.appendToBody || false);
            this.renderPopover();
            this.openPopover.emit();
        }
    }
    /**
     * Method performs close action for popover component.
     */
    close() {
        this.isOpen = false;
        this.viewContainer.clear();
        this.closePopover.emit();
    }
    /**
     * Method subscribes for events emitted by popover component
     * and based on event performs specific action.
     */
    handlePopoverEvents() {
        this.eventSubject.subscribe((event) => {
            if (this.openTriggerEvents.includes(event)) {
                this.open(event);
            }
            if (this.focusPopoverTriggerEvents.includes(event)) {
                this.popoverContainer.location.nativeElement.focus();
            }
            if (this.closeTriggerEvents.includes(event)) {
                this.close();
            }
            if (this.focusDirectiveTriggerEvents.includes(event)) {
                this.popoverService.setFocusOnElement(this.element, this.focusConfig, this.cxPopoverOptions?.appendToBody);
            }
        });
    }
    /**
     * Method creates instance and pass parameters to popover component.
     */
    renderPopover() {
        const containerFactory = this.componentFactoryResolver.resolveComponentFactory(PopoverComponent);
        this.popoverContainer =
            this.viewContainer.createComponent(containerFactory);
        const componentInstance = this.popoverContainer.instance;
        if (componentInstance) {
            componentInstance.content = this.cxPopover;
            componentInstance.triggerElement = this.element;
            componentInstance.popoverInstance = this.popoverContainer;
            componentInstance.focusConfig = this.focusConfig;
            componentInstance.eventSubject = this.eventSubject;
            componentInstance.position = this.cxPopoverOptions?.placement;
            componentInstance.customClass = this.cxPopoverOptions?.class;
            componentInstance.appendToBody = this.cxPopoverOptions?.appendToBody;
            componentInstance.positionOnScroll =
                this.cxPopoverOptions?.positionOnScroll;
            componentInstance.displayCloseButton =
                this.cxPopoverOptions?.displayCloseButton;
            componentInstance.autoPositioning =
                this.cxPopoverOptions?.autoPositioning;
            if (this.cxPopoverOptions?.appendToBody) {
                this.renderer.appendChild(this.winRef.document.body, this.popoverContainer.location.nativeElement);
            }
            this.popoverContainer.changeDetectorRef.detectChanges();
        }
    }
    ngOnInit() {
        this.handlePopoverEvents();
    }
    constructor(element, viewContainer, componentFactoryResolver, renderer, changeDetectorRef, popoverService, winRef) {
        this.element = element;
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.popoverService = popoverService;
        this.winRef = winRef;
        /**
         * An event emitted when the popover is opened.
         */
        this.openPopover = new EventEmitter();
        /**
         * An event emitted when the popover is closed.
         */
        this.closePopover = new EventEmitter();
        /**
         * Subject which emits specific type of `PopoverEvent`.
         */
        this.eventSubject = new Subject();
        this.openTriggerEvents = [
            PopoverEvent.OPEN,
            PopoverEvent.OPEN_BY_KEYBOARD,
        ];
        this.focusPopoverTriggerEvents = [
            PopoverEvent.OPEN_BY_KEYBOARD,
        ];
        this.closeTriggerEvents = [
            PopoverEvent.ROUTE_CHANGE,
            PopoverEvent.ESCAPE_KEYDOWN,
            PopoverEvent.OUTSIDE_CLICK,
            PopoverEvent.CLOSE_BUTTON_KEYDOWN,
            PopoverEvent.CLOSE_BUTTON_CLICK,
        ];
        this.focusDirectiveTriggerEvents = [
            PopoverEvent.ESCAPE_KEYDOWN,
            PopoverEvent.CLOSE_BUTTON_KEYDOWN,
        ];
    }
}
PopoverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PopoverDirective, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.PopoverService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Directive });
PopoverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: PopoverDirective, selector: "[cxPopover]", inputs: { cxPopover: "cxPopover", cxPopoverOptions: "cxPopoverOptions" }, outputs: { openPopover: "openPopover", closePopover: "closePopover" }, host: { listeners: { "keydown.enter": "handlePress($event)", "keydown.space": "handlePress($event)", "keydown.tab": "handleTab()", "keydown.shift.tab": "handleTab()", "keydown.escape": "handleEscape()", "click": "handleClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PopoverDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxPopover]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.PopoverService }, { type: i2.WindowRef }]; }, propDecorators: { cxPopover: [{
                type: Input
            }], cxPopoverOptions: [{
                type: Input
            }], openPopover: [{
                type: Output
            }], closePopover: [{
                type: Output
            }], handlePress: [{
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.space', ['$event']]
            }], handleTab: [{
                type: HostListener,
                args: ['keydown.tab']
            }, {
                type: HostListener,
                args: ['keydown.shift.tab']
            }], handleEscape: [{
                type: HostListener,
                args: ['keydown.escape']
            }], handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQU9MLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxHQUViLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBa0IsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUcvRDs7R0FFRztBQUlILE1BQU0sT0FBTyxnQkFBZ0I7SUEwQzNCOzs7Ozs7O09BT0c7SUFHSCxXQUFXLENBQUMsS0FBb0I7UUFDOUIsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLElBQUksS0FBSyxFQUFFLE1BQU0sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkQ7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDM0Q7SUFDSCxDQUFDO0lBSUQsU0FBUztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxv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O2dCQUtJLFdBQVc7c0JBQXBCLE1BQU07Z0JBS0csWUFBWTtzQkFBckIsTUFBTTtnQkFpQ1AsV0FBVztzQkFGVixZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7c0JBQ3hDLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVl6QyxTQUFTO3NCQUZSLFlBQVk7dUJBQUMsYUFBYTs7c0JBQzFCLFlBQVk7dUJBQUMsbUJBQW1CO2dCQVFqQyxZQUFZO3NCQURYLFlBQVk7dUJBQUMsZ0JBQWdCO2dCQU05QixXQUFXO3NCQURWLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZvY3VzQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vbGF5b3V0L2ExMXkva2V5Ym9hcmQtZm9jdXMva2V5Ym9hcmQtZm9jdXMubW9kZWwnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbXBvbmVudCB9IGZyb20gJy4vcG9wb3Zlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wb3ZlckV2ZW50LCBQb3BvdmVyT3B0aW9ucyB9IGZyb20gJy4vcG9wb3Zlci5tb2RlbCc7XG5pbXBvcnQgeyBQb3BvdmVyU2VydmljZSB9IGZyb20gJy4vcG9wb3Zlci5zZXJ2aWNlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYmluZCBwb3BvdmVyIHdpdGggYW55IERPTSBlbGVtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY3hQb3BvdmVyXScsXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKipcbiAgICogVGVtcGxhdGUgb3Igc3RyaW5nIHRvIGJlIHJlbmRlcmVkIGluc2lkZSBwb3BvdmVyIHdyYXBwZXIgY29tcG9uZW50LlxuICAgKi9cbiAgQElucHV0KCkgY3hQb3BvdmVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIHNldCBmb3IgcG9wb3ZlciBjb21wb25lbnQuXG4gICAqL1xuICBASW5wdXQoKSBjeFBvcG92ZXJPcHRpb25zPzogUG9wb3Zlck9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcG9wb3ZlciBpcyBvcGVuZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgb3BlblBvcG92ZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb3BvdmVyIGlzIGNsb3NlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBjbG9zZVBvcG92ZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRmxhZyB1c2VkIHRvIGluZm9ybSBhYm91dCBjdXJyZW50IHN0YXRlIG9mIHBvcG92ZXIgY29tcG9uZW50LlxuICAgKiBQb3BvdmVyIGlzIGNsb3NlZCBieSBkZWZhdWx0LCBzbyB2YWx1ZSBpcyBzZXQgdG8gZmFsc2UuXG4gICAqL1xuICBpc09wZW46IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFBvcG92ZXIgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKi9cbiAgcG9wb3ZlckNvbnRhaW5lcjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb21wb25lbnQ+O1xuXG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIGZvciBhMTF5IGltcHJvdmVtZW50cy5cbiAgICovXG4gIGZvY3VzQ29uZmlnOiBGb2N1c0NvbmZpZztcblxuICAvKipcbiAgICogU3ViamVjdCB3aGljaCBlbWl0cyBzcGVjaWZpYyB0eXBlIG9mIGBQb3BvdmVyRXZlbnRgLlxuICAgKi9cbiAgZXZlbnRTdWJqZWN0OiBTdWJqZWN0PFBvcG92ZXJFdmVudD4gPSBuZXcgU3ViamVjdDxQb3BvdmVyRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIExpc3RlbiBldmVudHMgZmlyZWQgb24gZWxlbWVudCBiaW5kZWQgdG8gcG9wb3ZlciBkaXJlY3RpdmUuXG4gICAqXG4gICAqIEJhc2VkIG9uIGV2ZW50IHR5cGUgc29tZSBhMTF5IGltcHJvdmVtZW50cyBjYW4gYmUgbWFkZS5cbiAgICogRm9yIGV4YW1wbGUgaWYgcG9wb3ZlciB3YXMgb3BlbmVkIGJ5IGBzcGFjZWAgb3IgYGVudGVyYCBrZXlcbiAgICogZGVkaWNhdGVkIGBGb2N1c0NvbmZpZ2AgY2FuIGJlIHNldCB0byBhdXRvZm9jdXMgZmlyc3RcbiAgICogZm9jdXNhYmxlIGVsZW1lbnQgaW4gcG9wb3ZlciBjb250YWluZXIuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5zcGFjZScsIFsnJGV2ZW50J10pXG4gIGhhbmRsZVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQ/LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGV2ZW50Py50YXJnZXQgPT09IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50ICYmICF0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5ldmVudFN1YmplY3QubmV4dChQb3BvdmVyRXZlbnQuT1BFTl9CWV9LRVlCT0FSRCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5ldmVudFN1YmplY3QubmV4dChQb3BvdmVyRXZlbnQuQ0xPU0VfQlVUVE9OX0tFWURPV04pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24udGFiJylcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5zaGlmdC50YWInKVxuICBoYW5kbGVUYWIoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmZvY3VzQ29uZmlnPy50cmFwICYmIHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmV2ZW50U3ViamVjdC5uZXh0KFBvcG92ZXJFdmVudC5DTE9TRV9CVVRUT05fS0VZRE9XTik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lc2NhcGUnKVxuICBoYW5kbGVFc2NhcGUoKTogdm9pZCB7XG4gICAgdGhpcy5ldmVudFN1YmplY3QubmV4dChQb3BvdmVyRXZlbnQuRVNDQVBFX0tFWURPV04pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50Py5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChldmVudD8udGFyZ2V0ID09PSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCAmJiAhdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuZXZlbnRTdWJqZWN0Lm5leHQoUG9wb3ZlckV2ZW50Lk9QRU4pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuZXZlbnRTdWJqZWN0Lm5leHQoUG9wb3ZlckV2ZW50LkNMT1NFX0JVVFRPTl9DTElDSyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG9wZW5UcmlnZ2VyRXZlbnRzOiBQb3BvdmVyRXZlbnRbXSA9IFtcbiAgICBQb3BvdmVyRXZlbnQuT1BFTixcbiAgICBQb3BvdmVyRXZlbnQuT1BFTl9CWV9LRVlCT0FSRCxcbiAgXTtcblxuICBwcm90ZWN0ZWQgZm9jdXNQb3BvdmVyVHJpZ2dlckV2ZW50czogUG9wb3ZlckV2ZW50W10gPSBbXG4gICAgUG9wb3ZlckV2ZW50Lk9QRU5fQllfS0VZQk9BUkQsXG4gIF07XG5cbiAgcHJvdGVjdGVkIGNsb3NlVHJpZ2dlckV2ZW50czogUG9wb3ZlckV2ZW50W10gPSBbXG4gICAgUG9wb3ZlckV2ZW50LlJPVVRFX0NIQU5HRSxcbiAgICBQb3BvdmVyRXZlbnQuRVNDQVBFX0tFWURPV04sXG4gICAgUG9wb3ZlckV2ZW50Lk9VVFNJREVfQ0xJQ0ssXG4gICAgUG9wb3ZlckV2ZW50LkNMT1NFX0JVVFRPTl9LRVlET1dOLFxuICAgIFBvcG92ZXJFdmVudC5DTE9TRV9CVVRUT05fQ0xJQ0ssXG4gIF07XG5cbiAgcHJvdGVjdGVkIGZvY3VzRGlyZWN0aXZlVHJpZ2dlckV2ZW50czogUG9wb3ZlckV2ZW50W10gPSBbXG4gICAgUG9wb3ZlckV2ZW50LkVTQ0FQRV9LRVlET1dOLFxuICAgIFBvcG92ZXJFdmVudC5DTE9TRV9CVVRUT05fS0VZRE9XTixcbiAgXTtcblxuICAvKipcbiAgICogTWV0aG9kIHBlcmZvcm1zIG9wZW4gYWN0aW9uIGZvciBwb3BvdmVyIGNvbXBvbmVudC5cbiAgICovXG4gIG9wZW4oZXZlbnQ6IFBvcG92ZXJFdmVudCkge1xuICAgIGlmICghdGhpcy5jeFBvcG92ZXJPcHRpb25zPy5kaXNhYmxlKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLmZvY3VzQ29uZmlnID0gdGhpcy5wb3BvdmVyU2VydmljZS5nZXRGb2N1c0NvbmZpZyhcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIHRoaXMuY3hQb3BvdmVyT3B0aW9ucz8uYXBwZW5kVG9Cb2R5IHx8IGZhbHNlXG4gICAgICApO1xuICAgICAgdGhpcy5yZW5kZXJQb3BvdmVyKCk7XG4gICAgICB0aGlzLm9wZW5Qb3BvdmVyLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHBlcmZvcm1zIGNsb3NlIGFjdGlvbiBmb3IgcG9wb3ZlciBjb21wb25lbnQuXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIHRoaXMuY2xvc2VQb3BvdmVyLmVtaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2Qgc3Vic2NyaWJlcyBmb3IgZXZlbnRzIGVtaXR0ZWQgYnkgcG9wb3ZlciBjb21wb25lbnRcbiAgICogYW5kIGJhc2VkIG9uIGV2ZW50IHBlcmZvcm1zIHNwZWNpZmljIGFjdGlvbi5cbiAgICovXG4gIGhhbmRsZVBvcG92ZXJFdmVudHMoKSB7XG4gICAgdGhpcy5ldmVudFN1YmplY3Quc3Vic2NyaWJlKChldmVudDogUG9wb3ZlckV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5vcGVuVHJpZ2dlckV2ZW50cy5pbmNsdWRlcyhldmVudCkpIHtcbiAgICAgICAgdGhpcy5vcGVuKGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmZvY3VzUG9wb3ZlclRyaWdnZXJFdmVudHMuaW5jbHVkZXMoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRhaW5lci5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jbG9zZVRyaWdnZXJFdmVudHMuaW5jbHVkZXMoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmZvY3VzRGlyZWN0aXZlVHJpZ2dlckV2ZW50cy5pbmNsdWRlcyhldmVudCkpIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyU2VydmljZS5zZXRGb2N1c09uRWxlbWVudChcbiAgICAgICAgICB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgdGhpcy5mb2N1c0NvbmZpZyxcbiAgICAgICAgICB0aGlzLmN4UG9wb3Zlck9wdGlvbnM/LmFwcGVuZFRvQm9keVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBjcmVhdGVzIGluc3RhbmNlIGFuZCBwYXNzIHBhcmFtZXRlcnMgdG8gcG9wb3ZlciBjb21wb25lbnQuXG4gICAqL1xuICByZW5kZXJQb3BvdmVyKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lckZhY3RvcnkgPVxuICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUG9wb3ZlckNvbXBvbmVudCk7XG4gICAgdGhpcy5wb3BvdmVyQ29udGFpbmVyID1cbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29udGFpbmVyRmFjdG9yeSk7XG5cbiAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IHRoaXMucG9wb3ZlckNvbnRhaW5lci5pbnN0YW5jZTtcbiAgICBpZiAoY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLmNvbnRlbnQgPSB0aGlzLmN4UG9wb3ZlcjtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLnRyaWdnZXJFbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICAgICAgY29tcG9uZW50SW5zdGFuY2UucG9wb3Zlckluc3RhbmNlID0gdGhpcy5wb3BvdmVyQ29udGFpbmVyO1xuICAgICAgY29tcG9uZW50SW5zdGFuY2UuZm9jdXNDb25maWcgPSB0aGlzLmZvY3VzQ29uZmlnO1xuICAgICAgY29tcG9uZW50SW5zdGFuY2UuZXZlbnRTdWJqZWN0ID0gdGhpcy5ldmVudFN1YmplY3Q7XG4gICAgICBjb21wb25lbnRJbnN0YW5jZS5wb3NpdGlvbiA9IHRoaXMuY3hQb3BvdmVyT3B0aW9ucz8ucGxhY2VtZW50O1xuICAgICAgY29tcG9uZW50SW5zdGFuY2UuY3VzdG9tQ2xhc3MgPSB0aGlzLmN4UG9wb3Zlck9wdGlvbnM/LmNsYXNzO1xuICAgICAgY29tcG9uZW50SW5zdGFuY2UuYXBwZW5kVG9Cb2R5ID0gdGhpcy5jeFBvcG92ZXJPcHRpb25zPy5hcHBlbmRUb0JvZHk7XG4gICAgICBjb21wb25lbnRJbnN0YW5jZS5wb3NpdGlvbk9uU2Nyb2xsID1cbiAgICAgICAgdGhpcy5jeFBvcG92ZXJPcHRpb25zPy5wb3NpdGlvbk9uU2Nyb2xsO1xuICAgICAgY29tcG9uZW50SW5zdGFuY2UuZGlzcGxheUNsb3NlQnV0dG9uID1cbiAgICAgICAgdGhpcy5jeFBvcG92ZXJPcHRpb25zPy5kaXNwbGF5Q2xvc2VCdXR0b247XG4gICAgICBjb21wb25lbnRJbnN0YW5jZS5hdXRvUG9zaXRpb25pbmcgPVxuICAgICAgICB0aGlzLmN4UG9wb3Zlck9wdGlvbnM/LmF1dG9Qb3NpdGlvbmluZztcblxuICAgICAgaWYgKHRoaXMuY3hQb3BvdmVyT3B0aW9ucz8uYXBwZW5kVG9Cb2R5KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgdGhpcy53aW5SZWYuZG9jdW1lbnQuYm9keSxcbiAgICAgICAgICB0aGlzLnBvcG92ZXJDb250YWluZXIubG9jYXRpb24ubmF0aXZlRWxlbWVudFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcG92ZXJDb250YWluZXIuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaGFuZGxlUG9wb3ZlckV2ZW50cygpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJvdGVjdGVkIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHBvcG92ZXJTZXJ2aWNlOiBQb3BvdmVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWZcbiAgKSB7fVxufVxuIl19