/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, } from '@angular/core';
import { ScrollBehavior, } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { ICON_TYPE } from '../../misc/icon/icon.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../../cms-structure/page/model/cms-component-data";
import * as i3 from "../../../layout/a11y/index";
import * as i4 from "../../misc/icon/icon.component";
export class ScrollToTopComponent {
    onScroll() {
        if (this.window) {
            this.display = this.window.scrollY > this.displayThreshold;
        }
    }
    constructor(winRef, componentData, selectFocusUtility) {
        this.winRef = winRef;
        this.componentData = componentData;
        this.selectFocusUtility = selectFocusUtility;
        this.iconTypes = ICON_TYPE;
        this.window = this.winRef.nativeWindow;
        this.scrollBehavior = ScrollBehavior.SMOOTH;
        this.displayThreshold = (this.window?.innerHeight ?? 400) / 2;
    }
    ngOnInit() {
        this.setConfig();
    }
    setConfig() {
        this.componentData.data$.pipe(take(1)).subscribe((data) => {
            this.scrollBehavior = data.scrollBehavior ?? this.scrollBehavior;
            this.displayThreshold = data.displayThreshold ?? this.displayThreshold;
        });
    }
    /**
     * Scroll back to the top of the page and set focus on top most focusable element.
     */
    scrollToTop() {
        // Focus first focusable element within the html body
        this.selectFocusUtility
            .findFirstFocusable(this.winRef.document.body, { autofocus: '' })
            ?.focus();
        this.window?.scrollTo({
            top: 0,
            behavior: this.scrollBehavior,
        });
    }
}
ScrollToTopComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScrollToTopComponent, deps: [{ token: i1.WindowRef }, { token: i2.CmsComponentData }, { token: i3.SelectFocusUtility }], target: i0.ɵɵFactoryTarget.Component });
ScrollToTopComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ScrollToTopComponent, selector: "cx-scroll-to-top", host: { listeners: { "window:scroll": "onScroll($event)" }, properties: { "class.display": "this.display" } }, ngImport: i0, template: "<button\n  [attr.aria-label]=\"'navigation.scrollToTop' | cxTranslate\"\n  class=\"cx-scroll-to-top-btn\"\n  (click)=\"scrollToTop()\"\n>\n  <span aria-hidden=\"true\">\n    <cx-icon class=\"caret-up-icon\" [type]=\"iconTypes.CARET_UP\"></cx-icon>\n  </span>\n</button>\n", dependencies: [{ kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScrollToTopComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-scroll-to-top', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  [attr.aria-label]=\"'navigation.scrollToTop' | cxTranslate\"\n  class=\"cx-scroll-to-top-btn\"\n  (click)=\"scrollToTop()\"\n>\n  <span aria-hidden=\"true\">\n    <cx-icon class=\"caret-up-icon\" [type]=\"iconTypes.CARET_UP\"></cx-icon>\n  </span>\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: i2.CmsComponentData }, { type: i3.SelectFocusUtility }]; }, propDecorators: { display: [{
                type: HostBinding,
                args: ['class.display']
            }], onScroll: [{
                type: HostListener,
                args: ['window:scroll', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXRvLXRvcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL25hdmlnYXRpb24vc2Nyb2xsLXRvLXRvcC9zY3JvbGwtdG8tdG9wLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbmF2aWdhdGlvbi9zY3JvbGwtdG8tdG9wL3Njcm9sbC10by10b3AuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFdBQVcsRUFDWCxZQUFZLEdBRWIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLGNBQWMsR0FDZixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7OztBQVF2RCxNQUFNLE9BQU8sb0JBQW9CO0lBVy9CLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUM1RDtJQUNILENBQUM7SUFFRCxZQUNZLE1BQWlCLEVBQ2pCLGFBQXdELEVBQ3hELGtCQUFzQztRQUZ0QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLGtCQUFhLEdBQWIsYUFBYSxDQUEyQztRQUN4RCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBbkJsRCxjQUFTLEdBQUcsU0FBUyxDQUFDO1FBS1osV0FBTSxHQUF1QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN0RCxtQkFBYyxHQUFtQixjQUFjLENBQUMsTUFBTSxDQUFDO1FBQ3ZELHFCQUFnQixHQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBYXhFLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFUyxTQUFTO1FBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUNqRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDVCxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDakUsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUVaLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxDQUFDO1lBQ04sUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQzlCLENBQUMsQ0FBQztJQUNMLENBQUM7O2lIQS9DVSxvQkFBb0I7cUdBQXBCLG9CQUFvQix1S0M1QmpDLGlSQVNBOzJGRG1CYSxvQkFBb0I7a0JBTGhDLFNBQVM7K0JBQ0Usa0JBQWtCLG1CQUVYLHVCQUF1QixDQUFDLE1BQU07Z0tBTS9DLE9BQU87c0JBRE4sV0FBVzt1QkFBQyxlQUFlO2dCQVE1QixRQUFRO3NCQURQLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFdpbmRvd1JlZixcbiAgQ21zU2Nyb2xsVG9Ub3BDb21wb25lbnQsXG4gIFNjcm9sbEJlaGF2aW9yLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENtc0NvbXBvbmVudERhdGEgfSBmcm9tICcuLi8uLi8uLi9jbXMtc3RydWN0dXJlL3BhZ2UvbW9kZWwvY21zLWNvbXBvbmVudC1kYXRhJztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJy4uLy4uL21pc2MvaWNvbi9pY29uLm1vZGVsJztcbmltcG9ydCB7IFNlbGVjdEZvY3VzVXRpbGl0eSB9IGZyb20gJy4uLy4uLy4uL2xheW91dC9hMTF5L2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtc2Nyb2xsLXRvLXRvcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zY3JvbGwtdG8tdG9wLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFRvVG9wQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaWNvblR5cGVzID0gSUNPTl9UWVBFO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzcGxheScpXG4gIGRpc3BsYXk6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgcHJvdGVjdGVkIHdpbmRvdzogV2luZG93IHwgdW5kZWZpbmVkID0gdGhpcy53aW5SZWYubmF0aXZlV2luZG93O1xuICBwcm90ZWN0ZWQgc2Nyb2xsQmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yID0gU2Nyb2xsQmVoYXZpb3IuU01PT1RIO1xuICBwcm90ZWN0ZWQgZGlzcGxheVRocmVzaG9sZDogbnVtYmVyID0gKHRoaXMud2luZG93Py5pbm5lckhlaWdodCA/PyA0MDApIC8gMjtcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c2Nyb2xsJywgWyckZXZlbnQnXSlcbiAgb25TY3JvbGwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMud2luZG93KSB7XG4gICAgICB0aGlzLmRpc3BsYXkgPSB0aGlzLndpbmRvdy5zY3JvbGxZID4gdGhpcy5kaXNwbGF5VGhyZXNob2xkO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgY29tcG9uZW50RGF0YTogQ21zQ29tcG9uZW50RGF0YTxDbXNTY3JvbGxUb1RvcENvbXBvbmVudD4sXG4gICAgcHJvdGVjdGVkIHNlbGVjdEZvY3VzVXRpbGl0eTogU2VsZWN0Rm9jdXNVdGlsaXR5XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldENvbmZpZygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldENvbmZpZygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbXBvbmVudERhdGEuZGF0YSQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsQmVoYXZpb3IgPSBkYXRhLnNjcm9sbEJlaGF2aW9yID8/IHRoaXMuc2Nyb2xsQmVoYXZpb3I7XG4gICAgICB0aGlzLmRpc3BsYXlUaHJlc2hvbGQgPSBkYXRhLmRpc3BsYXlUaHJlc2hvbGQgPz8gdGhpcy5kaXNwbGF5VGhyZXNob2xkO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCBiYWNrIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UgYW5kIHNldCBmb2N1cyBvbiB0b3AgbW9zdCBmb2N1c2FibGUgZWxlbWVudC5cbiAgICovXG4gIHNjcm9sbFRvVG9wKCk6IHZvaWQge1xuICAgIC8vIEZvY3VzIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50IHdpdGhpbiB0aGUgaHRtbCBib2R5XG4gICAgdGhpcy5zZWxlY3RGb2N1c1V0aWxpdHlcbiAgICAgIC5maW5kRmlyc3RGb2N1c2FibGUodGhpcy53aW5SZWYuZG9jdW1lbnQuYm9keSwgeyBhdXRvZm9jdXM6ICcnIH0pXG4gICAgICA/LmZvY3VzKCk7XG5cbiAgICB0aGlzLndpbmRvdz8uc2Nyb2xsVG8oe1xuICAgICAgdG9wOiAwLFxuICAgICAgYmVoYXZpb3I6IHRoaXMuc2Nyb2xsQmVoYXZpb3IsXG4gICAgfSk7XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgW2F0dHIuYXJpYS1sYWJlbF09XCInbmF2aWdhdGlvbi5zY3JvbGxUb1RvcCcgfCBjeFRyYW5zbGF0ZVwiXG4gIGNsYXNzPVwiY3gtc2Nyb2xsLXRvLXRvcC1idG5cIlxuICAoY2xpY2spPVwic2Nyb2xsVG9Ub3AoKVwiXG4+XG4gIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgIDxjeC1pY29uIGNsYXNzPVwiY2FyZXQtdXAtaWNvblwiIFt0eXBlXT1cImljb25UeXBlcy5DQVJFVF9VUFwiPjwvY3gtaWNvbj5cbiAgPC9zcGFuPlxuPC9idXR0b24+XG4iXX0=