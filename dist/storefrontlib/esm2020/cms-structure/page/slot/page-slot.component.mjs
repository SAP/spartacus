/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./page-slot.service";
import * as i3 from "@angular/common";
import * as i4 from "../../outlet/outlet.directive";
import * as i5 from "../component/component-wrapper.directive";
/**
 * The `PageSlotComponent` is used to render the CMS page slot and it's components.
 *
 * The Page slot host element will be supplemented with css classes so that the layout
 * can be fully controlled by customers:
 * - The page slot _position_ is added as a css class by default.
 * - The `cx-pending` is added for as long as the slot hasn't start loading.
 * - The `page-fold` style class is added for the page slot which is configured as the page fold.
 */
export class PageSlotComponent {
    /**
     * The position represents the unique key for a page slot on a single page, but can
     * be reused cross pages.
     *
     * The position is used to find the CMS components for the page slot. It is also
     * added as an additional CSS class so that layout can be applied.
     */
    set position(value) {
        this.position$.next(value);
    }
    get position() {
        return this.position$.value;
    }
    constructor(cmsService, dynamicAttributeService, renderer, elementRef, cd, pageSlotService) {
        this.cmsService = cmsService;
        this.dynamicAttributeService = dynamicAttributeService;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.cd = cd;
        this.pageSlotService = pageSlotService;
        /**
         * Indicates that the page slot is the last page slot above the fold.
         */
        this.isPageFold = false;
        /**
         * Indicates that the components of the page slot haven't been loaded as long
         * as the isPending state is true.
         */
        this.isPending = true;
        /**
         * Indicates that the page slot doesn't contain any components. This is no
         * longer used in spartacus, but kept for backwards compatibility.
         */
        this.hasComponents = false;
        this.position$ = new BehaviorSubject(undefined);
        this.slot$ = this.position$.pipe(filter(isNotUndefined), switchMap((position) => this.cmsService.getContentSlot(position)), distinctUntilChanged(this.isDistinct));
        /** Observes the components for the given page slot. */
        this.components$ = this.slot$.pipe(map((slot) => slot?.components ?? []));
        this.subscription = new Subscription();
        /** Keeps track of the pending components that must be loaded for the page slot */
        this.pendingComponentCount = 0;
    }
    ngOnInit() {
        this.subscription.add(this.slot$.pipe(tap((slot) => this.decorate(slot))).subscribe((value) => {
            this.components = value?.components || [];
            this.cd.markForCheck();
        }));
    }
    decorate(slot) {
        let cls = this.class || '';
        if (this.lastPosition && cls.indexOf(this.lastPosition) > -1) {
            cls = cls.replace(this.lastPosition, '');
        }
        if (this.position$.value) {
            cls += ` ${this.position$.value}`;
            this.lastPosition = this.position$.value;
        }
        // host bindings
        this.pending = slot?.components?.length || 0;
        this.hasComponents = slot?.components
            ? slot?.components?.length > 0
            : false;
        if (cls && cls !== this.class) {
            this.class = cls;
        }
        if (slot) {
            this.dynamicAttributeService.addAttributesToSlot(this.elementRef.nativeElement, this.renderer, slot);
        }
    }
    /**
     * Sets the pending count for the page slot components. Once all pending components are
     * loaded, the `isPending` flag is updated, so that the associated class can be updated
     */
    set pending(count) {
        this.pendingComponentCount = count;
        this.isPending = this.pendingComponentCount > 0;
    }
    get pending() {
        return this.pendingComponentCount;
    }
    /*
     * Is triggered when a component is added to the view. This is used to
     * update the pending count
     */
    isLoaded(loadState) {
        if (loadState) {
            this.pending--;
            this.cd.markForCheck();
        }
    }
    /**
     * The `DeferLoadingStrategy` indicates whether the component should be
     * rendered instantly or whether it should be deferred.
     */
    getComponentDeferOptions(componentType) {
        return this.pageSlotService.getComponentDeferOptions(this.position, componentType);
    }
    isDistinct(old, current) {
        return Boolean(current.components &&
            old.components &&
            old.components.length === current.components.length &&
            !old.components.find((el, index) => el.uid !== current.components?.[index].uid));
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
PageSlotComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageSlotComponent, deps: [{ token: i1.CmsService }, { token: i1.DynamicAttributeService }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.PageSlotService }], target: i0.ɵɵFactoryTarget.Component });
PageSlotComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PageSlotComponent, selector: "cx-page-slot,[cx-page-slot]", inputs: { position: "position", class: "class", isPageFold: "isPageFold", hasComponents: "hasComponents" }, host: { properties: { "attr.position": "this.position", "class": "this.class", "class.page-fold": "this.isPageFold", "class.cx-pending": "this.isPending", "class.has-components": "this.hasComponents" } }, ngImport: i0, template: "<ng-template\n  *ngIf=\"position\"\n  [cxOutlet]=\"position\"\n  [cxOutletContext]=\"{ components$: components$ }\"\n>\n  <ng-container *ngFor=\"let component of components\">\n    <ng-template\n      *ngIf=\"component.flexType\"\n      [cxOutlet]=\"component.flexType\"\n      [cxOutletContext]=\"{ component: component }\"\n      [cxOutletDefer]=\"getComponentDeferOptions(component.flexType)\"\n      (loaded)=\"isLoaded($event)\"\n    >\n      <ng-container [cxComponentWrapper]=\"component\"></ng-container>\n    </ng-template>\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "directive", type: i5.ComponentWrapperDirective, selector: "[cxComponentWrapper]", inputs: ["cxComponentWrapper"], outputs: ["cxComponentRef"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageSlotComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-page-slot,[cx-page-slot]', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template\n  *ngIf=\"position\"\n  [cxOutlet]=\"position\"\n  [cxOutletContext]=\"{ components$: components$ }\"\n>\n  <ng-container *ngFor=\"let component of components\">\n    <ng-template\n      *ngIf=\"component.flexType\"\n      [cxOutlet]=\"component.flexType\"\n      [cxOutletContext]=\"{ component: component }\"\n      [cxOutletDefer]=\"getComponentDeferOptions(component.flexType)\"\n      (loaded)=\"isLoaded($event)\"\n    >\n      <ng-container [cxComponentWrapper]=\"component\"></ng-container>\n    </ng-template>\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i1.DynamicAttributeService }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.PageSlotService }]; }, propDecorators: { position: [{
                type: HostBinding,
                args: ['attr.position']
            }, {
                type: Input
            }], class: [{
                type: Input
            }, {
                type: HostBinding
            }], isPageFold: [{
                type: HostBinding,
                args: ['class.page-fold']
            }, {
                type: Input
            }], isPending: [{
                type: HostBinding,
                args: ['class.cx-pending']
            }], hasComponents: [{
                type: HostBinding,
                args: ['class.has-components']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbG90LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL3Nsb3QvcGFnZS1zbG90LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL3Nsb3QvcGFnZS1zbG90LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxXQUFXLEVBQ1gsS0FBSyxHQUlOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFLTCxjQUFjLEdBQ2YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBSXhCOzs7Ozs7OztHQVFHO0FBTUgsTUFBTSxPQUFPLGlCQUFpQjtJQUM1Qjs7Ozs7O09BTUc7SUFDSCxJQUVJLFFBQVEsQ0FBQyxLQUF5QjtRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBOENELFlBQ1ksVUFBc0IsRUFDdEIsdUJBQWdELEVBQ2hELFFBQW1CLEVBQ25CLFVBQXNCLEVBQ3RCLEVBQXFCLEVBQ3JCLGVBQWdDO1FBTGhDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNo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QUFpQjtrR0FBakIsaUJBQWlCLDRYQ2pEOUIsMmpCQWlCQTsyRkRnQ2EsaUJBQWlCO2tCQUw3QixTQUFTOytCQUNFLDZCQUE2QixtQkFFdEIsdUJBQXVCLENBQUMsTUFBTTtzUEFZM0MsUUFBUTtzQkFGWCxXQUFXO3VCQUFDLGVBQWU7O3NCQUMzQixLQUFLO2dCQVdrQixLQUFLO3NCQUE1QixLQUFLOztzQkFBSSxXQUFXO2dCQUtvQixVQUFVO3NCQUFsRCxXQUFXO3VCQUFDLGlCQUFpQjs7c0JBQUcsS0FBSztnQkFNTCxTQUFTO3NCQUF6QyxXQUFXO3VCQUFDLGtCQUFrQjtnQkFNZSxhQUFhO3NCQUExRCxXQUFXO3VCQUFDLHNCQUFzQjs7c0JBQUcsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zU2VydmljZSxcbiAgQ29udGVudFNsb3RDb21wb25lbnREYXRhLFxuICBDb250ZW50U2xvdERhdGEsXG4gIER5bmFtaWNBdHRyaWJ1dGVTZXJ2aWNlLFxuICBpc05vdFVuZGVmaW5lZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHN3aXRjaE1hcCxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbnRlcnNlY3Rpb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vbGF5b3V0L2xvYWRpbmcvaW50ZXJzZWN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFBhZ2VTbG90U2VydmljZSB9IGZyb20gJy4vcGFnZS1zbG90LnNlcnZpY2UnO1xuXG4vKipcbiAqIFRoZSBgUGFnZVNsb3RDb21wb25lbnRgIGlzIHVzZWQgdG8gcmVuZGVyIHRoZSBDTVMgcGFnZSBzbG90IGFuZCBpdCdzIGNvbXBvbmVudHMuXG4gKlxuICogVGhlIFBhZ2Ugc2xvdCBob3N0IGVsZW1lbnQgd2lsbCBiZSBzdXBwbGVtZW50ZWQgd2l0aCBjc3MgY2xhc3NlcyBzbyB0aGF0IHRoZSBsYXlvdXRcbiAqIGNhbiBiZSBmdWxseSBjb250cm9sbGVkIGJ5IGN1c3RvbWVyczpcbiAqIC0gVGhlIHBhZ2Ugc2xvdCBfcG9zaXRpb25fIGlzIGFkZGVkIGFzIGEgY3NzIGNsYXNzIGJ5IGRlZmF1bHQuXG4gKiAtIFRoZSBgY3gtcGVuZGluZ2AgaXMgYWRkZWQgZm9yIGFzIGxvbmcgYXMgdGhlIHNsb3QgaGFzbid0IHN0YXJ0IGxvYWRpbmcuXG4gKiAtIFRoZSBgcGFnZS1mb2xkYCBzdHlsZSBjbGFzcyBpcyBhZGRlZCBmb3IgdGhlIHBhZ2Ugc2xvdCB3aGljaCBpcyBjb25maWd1cmVkIGFzIHRoZSBwYWdlIGZvbGQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXBhZ2Utc2xvdCxbY3gtcGFnZS1zbG90XScsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYWdlLXNsb3QuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUGFnZVNsb3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gcmVwcmVzZW50cyB0aGUgdW5pcXVlIGtleSBmb3IgYSBwYWdlIHNsb3Qgb24gYSBzaW5nbGUgcGFnZSwgYnV0IGNhblxuICAgKiBiZSByZXVzZWQgY3Jvc3MgcGFnZXMuXG4gICAqXG4gICAqIFRoZSBwb3NpdGlvbiBpcyB1c2VkIHRvIGZpbmQgdGhlIENNUyBjb21wb25lbnRzIGZvciB0aGUgcGFnZSBzbG90LiBJdCBpcyBhbHNvXG4gICAqIGFkZGVkIGFzIGFuIGFkZGl0aW9uYWwgQ1NTIGNsYXNzIHNvIHRoYXQgbGF5b3V0IGNhbiBiZSBhcHBsaWVkLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnBvc2l0aW9uJylcbiAgQElucHV0KClcbiAgc2V0IHBvc2l0aW9uKHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnBvc2l0aW9uJC5uZXh0KHZhbHVlKTtcbiAgfVxuICBnZXQgcG9zaXRpb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbiQudmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogTWFpbnRhaW5zIGNzcyBjbGFzc2VzIGludHJvZHVjZWQgYnkgdGhlIGhvc3QgYW5kIGFkZHMgYWRkaXRpb25hbCBjbGFzc2VzLlxuICAgKi9cbiAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCkgY2xhc3M6IHN0cmluZztcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoYXQgdGhlIHBhZ2Ugc2xvdCBpcyB0aGUgbGFzdCBwYWdlIHNsb3QgYWJvdmUgdGhlIGZvbGQuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBhZ2UtZm9sZCcpIEBJbnB1dCgpIGlzUGFnZUZvbGQgPSBmYWxzZTtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoYXQgdGhlIGNvbXBvbmVudHMgb2YgdGhlIHBhZ2Ugc2xvdCBoYXZlbid0IGJlZW4gbG9hZGVkIGFzIGxvbmdcbiAgICogYXMgdGhlIGlzUGVuZGluZyBzdGF0ZSBpcyB0cnVlLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jeC1wZW5kaW5nJykgaXNQZW5kaW5nID0gdHJ1ZTtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoYXQgdGhlIHBhZ2Ugc2xvdCBkb2Vzbid0IGNvbnRhaW4gYW55IGNvbXBvbmVudHMuIFRoaXMgaXMgbm9cbiAgICogbG9uZ2VyIHVzZWQgaW4gc3BhcnRhY3VzLCBidXQga2VwdCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhhcy1jb21wb25lbnRzJykgQElucHV0KCkgaGFzQ29tcG9uZW50cyA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBwb3NpdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuICBjb21wb25lbnRzOiBDb250ZW50U2xvdENvbXBvbmVudERhdGFbXTtcblxuICBwcm90ZWN0ZWQgc2xvdCQ6IE9ic2VydmFibGU8Q29udGVudFNsb3REYXRhPiA9IHRoaXMucG9zaXRpb24kLnBpcGUoXG4gICAgZmlsdGVyKGlzTm90VW5kZWZpbmVkKSxcbiAgICBzd2l0Y2hNYXAoKHBvc2l0aW9uKSA9PiB0aGlzLmNtc1NlcnZpY2UuZ2V0Q29udGVudFNsb3QocG9zaXRpb24pKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCh0aGlzLmlzRGlzdGluY3QpXG4gICk7XG5cbiAgLyoqIE9ic2VydmVzIHRoZSBjb21wb25lbnRzIGZvciB0aGUgZ2l2ZW4gcGFnZSBzbG90LiAqL1xuICBjb21wb25lbnRzJDogT2JzZXJ2YWJsZTxDb250ZW50U2xvdENvbXBvbmVudERhdGFbXT4gPSB0aGlzLnNsb3QkLnBpcGUoXG4gICAgbWFwKChzbG90KSA9PiBzbG90Py5jb21wb25lbnRzID8/IFtdKVxuICApO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAvKiogS2VlcHMgdHJhY2sgb2YgdGhlIHBlbmRpbmcgY29tcG9uZW50cyB0aGF0IG11c3QgYmUgbG9hZGVkIGZvciB0aGUgcGFnZSBzbG90ICovXG4gIHByaXZhdGUgcGVuZGluZ0NvbXBvbmVudENvdW50ID0gMDtcblxuICAvKiogVHJhY2tzIHRoZSBsYXN0IHVzZWQgcG9zaXRpb24sIGluIGNhc2UgdGhlIHBhZ2Ugc2xvdCBpcyB1c2VkIGR5bmFtaWNhbGx5ICovXG4gIHByaXZhdGUgbGFzdFBvc2l0aW9uOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjbXNTZXJ2aWNlOiBDbXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBkeW5hbWljQXR0cmlidXRlU2VydmljZTogRHluYW1pY0F0dHJpYnV0ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgcGFnZVNsb3RTZXJ2aWNlOiBQYWdlU2xvdFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuc2xvdCQucGlwZSh0YXAoKHNsb3QpID0+IHRoaXMuZGVjb3JhdGUoc2xvdCkpKS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IHZhbHVlPy5jb21wb25lbnRzIHx8IFtdO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRlY29yYXRlKHNsb3Q6IENvbnRlbnRTbG90RGF0YSk6IHZvaWQge1xuICAgIGxldCBjbHMgPSB0aGlzLmNsYXNzIHx8ICcnO1xuXG4gICAgaWYgKHRoaXMubGFzdFBvc2l0aW9uICYmIGNscy5pbmRleE9mKHRoaXMubGFzdFBvc2l0aW9uKSA+IC0xKSB7XG4gICAgICBjbHMgPSBjbHMucmVwbGFjZSh0aGlzLmxhc3RQb3NpdGlvbiwgJycpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wb3NpdGlvbiQudmFsdWUpIHtcbiAgICAgIGNscyArPSBgICR7dGhpcy5wb3NpdGlvbiQudmFsdWV9YDtcbiAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiQudmFsdWU7XG4gICAgfVxuXG4gICAgLy8gaG9zdCBiaW5kaW5nc1xuICAgIHRoaXMucGVuZGluZyA9IHNsb3Q/LmNvbXBvbmVudHM/Lmxlbmd0aCB8fCAwO1xuICAgIHRoaXMuaGFzQ29tcG9uZW50cyA9IHNsb3Q/LmNvbXBvbmVudHNcbiAgICAgID8gc2xvdD8uY29tcG9uZW50cz8ubGVuZ3RoID4gMFxuICAgICAgOiBmYWxzZTtcbiAgICBpZiAoY2xzICYmIGNscyAhPT0gdGhpcy5jbGFzcykge1xuICAgICAgdGhpcy5jbGFzcyA9IGNscztcbiAgICB9XG5cbiAgICBpZiAoc2xvdCkge1xuICAgICAgdGhpcy5keW5hbWljQXR0cmlidXRlU2VydmljZS5hZGRBdHRyaWJ1dGVzVG9TbG90KFxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgdGhpcy5yZW5kZXJlcixcbiAgICAgICAgc2xvdFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGVuZGluZyBjb3VudCBmb3IgdGhlIHBhZ2Ugc2xvdCBjb21wb25lbnRzLiBPbmNlIGFsbCBwZW5kaW5nIGNvbXBvbmVudHMgYXJlXG4gICAqIGxvYWRlZCwgdGhlIGBpc1BlbmRpbmdgIGZsYWcgaXMgdXBkYXRlZCwgc28gdGhhdCB0aGUgYXNzb2NpYXRlZCBjbGFzcyBjYW4gYmUgdXBkYXRlZFxuICAgKi9cbiAgcHJvdGVjdGVkIHNldCBwZW5kaW5nKGNvdW50OiBudW1iZXIpIHtcbiAgICB0aGlzLnBlbmRpbmdDb21wb25lbnRDb3VudCA9IGNvdW50O1xuICAgIHRoaXMuaXNQZW5kaW5nID0gdGhpcy5wZW5kaW5nQ29tcG9uZW50Q291bnQgPiAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBwZW5kaW5nKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ0NvbXBvbmVudENvdW50O1xuICB9XG5cbiAgLypcbiAgICogSXMgdHJpZ2dlcmVkIHdoZW4gYSBjb21wb25lbnQgaXMgYWRkZWQgdG8gdGhlIHZpZXcuIFRoaXMgaXMgdXNlZCB0b1xuICAgKiB1cGRhdGUgdGhlIHBlbmRpbmcgY291bnRcbiAgICovXG4gIGlzTG9hZGVkKGxvYWRTdGF0ZTogYm9vbGVhbikge1xuICAgIGlmIChsb2FkU3RhdGUpIHtcbiAgICAgIHRoaXMucGVuZGluZy0tO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGBEZWZlckxvYWRpbmdTdHJhdGVneWAgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBzaG91bGQgYmVcbiAgICogcmVuZGVyZWQgaW5zdGFudGx5IG9yIHdoZXRoZXIgaXQgc2hvdWxkIGJlIGRlZmVycmVkLlxuICAgKi9cbiAgZ2V0Q29tcG9uZW50RGVmZXJPcHRpb25zKGNvbXBvbmVudFR5cGU6IHN0cmluZyk6IEludGVyc2VjdGlvbk9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLnBhZ2VTbG90U2VydmljZS5nZXRDb21wb25lbnREZWZlck9wdGlvbnMoXG4gICAgICB0aGlzLnBvc2l0aW9uLFxuICAgICAgY29tcG9uZW50VHlwZVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNEaXN0aW5jdChcbiAgICBvbGQ6IENvbnRlbnRTbG90RGF0YSxcbiAgICBjdXJyZW50OiBDb250ZW50U2xvdERhdGFcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEJvb2xlYW4oXG4gICAgICBjdXJyZW50LmNvbXBvbmVudHMgJiZcbiAgICAgICAgb2xkLmNvbXBvbmVudHMgJiZcbiAgICAgICAgb2xkLmNvbXBvbmVudHMubGVuZ3RoID09PSBjdXJyZW50LmNvbXBvbmVudHMubGVuZ3RoICYmXG4gICAgICAgICFvbGQuY29tcG9uZW50cy5maW5kKFxuICAgICAgICAgIChlbCwgaW5kZXgpID0+IGVsLnVpZCAhPT0gY3VycmVudC5jb21wb25lbnRzPy5baW5kZXhdLnVpZFxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8bmctdGVtcGxhdGVcbiAgKm5nSWY9XCJwb3NpdGlvblwiXG4gIFtjeE91dGxldF09XCJwb3NpdGlvblwiXG4gIFtjeE91dGxldENvbnRleHRdPVwieyBjb21wb25lbnRzJDogY29tcG9uZW50cyQgfVwiXG4+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbXBvbmVudCBvZiBjb21wb25lbnRzXCI+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAqbmdJZj1cImNvbXBvbmVudC5mbGV4VHlwZVwiXG4gICAgICBbY3hPdXRsZXRdPVwiY29tcG9uZW50LmZsZXhUeXBlXCJcbiAgICAgIFtjeE91dGxldENvbnRleHRdPVwieyBjb21wb25lbnQ6IGNvbXBvbmVudCB9XCJcbiAgICAgIFtjeE91dGxldERlZmVyXT1cImdldENvbXBvbmVudERlZmVyT3B0aW9ucyhjb21wb25lbnQuZmxleFR5cGUpXCJcbiAgICAgIChsb2FkZWQpPVwiaXNMb2FkZWQoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciBbY3hDb21wb25lbnRXcmFwcGVyXT1cImNvbXBvbmVudFwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==