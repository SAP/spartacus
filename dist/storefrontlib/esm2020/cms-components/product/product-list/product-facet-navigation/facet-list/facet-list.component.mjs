/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetGroupCollapsedState } from '../facet.model';
import * as i0 from "@angular/core";
import * as i1 from "../services/facet.service";
import * as i2 from "@angular/common";
import * as i3 from "../../../../misc/icon/icon.component";
import * as i4 from "../facet/facet.component";
import * as i5 from "../../../../../layout/a11y/keyboard-focus/focus.directive";
import * as i6 from "@spartacus/core";
export class FacetListComponent {
    /**
     * Indicates that the facet navigation is rendered in dialog.
     */
    set isDialog(value) {
        this._isDialog = value;
        if (value) {
            this.renderer.addClass(document.body, 'modal-open');
        }
    }
    get isDialog() {
        return this._isDialog;
    }
    handleClick() {
        this.close();
    }
    constructor(facetService, elementRef, renderer) {
        this.facetService = facetService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        /** Emits when the list must close */
        this.closeList = new EventEmitter();
        /** The list of all facet and values related to the products in the list */
        this.facetList$ = this.facetService.facetList$;
        this.iconTypes = ICON_TYPE;
        this.dialogFocusConfig = {
            trap: true,
            block: true,
            focusOnEscape: true,
            autofocus: 'cx-facet',
        };
    }
    /**
     * Toggles the facet group in case it is not expanded.
     */
    expandFacetGroup(facet, ref) {
        if (!ref.isExpanded) {
            this.facetService.toggle(facet, ref.isExpanded);
        }
    }
    /**
     * Indicates that the facet group has been expanded.
     */
    isExpanded(facet) {
        return this.facetService
            .getState(facet)
            .pipe(map((value) => value.toggled === FacetGroupCollapsedState.EXPANDED));
    }
    /**
     * Indicates that the facet group has been collapsed.
     */
    isCollapsed(facet) {
        return this.facetService
            .getState(facet)
            .pipe(map((value) => value.toggled === FacetGroupCollapsedState.COLLAPSED));
    }
    close(event) {
        this.renderer.removeClass(document.body, 'modal-open');
        this.closeList.emit(event);
    }
    block(event) {
        event?.stopPropagation();
    }
}
FacetListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FacetListComponent, deps: [{ token: i1.FacetService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
FacetListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: FacetListComponent, selector: "cx-facet-list", inputs: { isDialog: "isDialog" }, outputs: { closeList: "closeList" }, host: { listeners: { "click": "handleClick()" } }, ngImport: i0, template: "<section\n  class=\"inner\"\n  *ngIf=\"(facetList$ | async)?.facets as facets\"\n  [attr.aria-label]=\"'productFacetNavigation.filterBy.facet' | cxTranslate\"\n  [cxFocus]=\"isDialog ? dialogFocusConfig : {}\"\n  [tabindex]=\"-1\"\n  (esc)=\"close($event)\"\n  (click)=\"block($event)\"\n>\n  <div class=\"list-header\">\n    <h4>\n      {{ 'productList.filterBy.label' | cxTranslate }}\n    </h4>\n    <button\n      type=\"button\"\n      class=\"close\"\n      [attr.aria-label]=\"'common.close' | cxTranslate\"\n      (click)=\"close()\"\n    >\n      <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n\n  <!--\n      Here we'd like to introduce configurable facet components,\n      either by using specific configuration or generic sproutlets\n  -->\n  <cx-facet\n    *ngFor=\"let facet of facets\"\n    #facetRef\n    [facet]=\"facet\"\n    [class.expanded]=\"isExpanded(facet) | async\"\n    [class.collapsed]=\"isCollapsed(facet) | async\"\n    role=\"group\"\n    attr.aria-label=\"{{\n      'productFacetNavigation.ariaLabelItemsAvailable'\n        | cxTranslate\n          : {\n              name: facet.name,\n              count: facet?.values?.length\n            }\n    }}\"\n  ></cx-facet>\n</section>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i4.FacetComponent, selector: "cx-facet", inputs: ["expandIcon", "collapseIcon", "facet"] }, { kind: "directive", type: i5.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FacetListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-facet-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<section\n  class=\"inner\"\n  *ngIf=\"(facetList$ | async)?.facets as facets\"\n  [attr.aria-label]=\"'productFacetNavigation.filterBy.facet' | cxTranslate\"\n  [cxFocus]=\"isDialog ? dialogFocusConfig : {}\"\n  [tabindex]=\"-1\"\n  (esc)=\"close($event)\"\n  (click)=\"block($event)\"\n>\n  <div class=\"list-header\">\n    <h4>\n      {{ 'productList.filterBy.label' | cxTranslate }}\n    </h4>\n    <button\n      type=\"button\"\n      class=\"close\"\n      [attr.aria-label]=\"'common.close' | cxTranslate\"\n      (click)=\"close()\"\n    >\n      <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n\n  <!--\n      Here we'd like to introduce configurable facet components,\n      either by using specific configuration or generic sproutlets\n  -->\n  <cx-facet\n    *ngFor=\"let facet of facets\"\n    #facetRef\n    [facet]=\"facet\"\n    [class.expanded]=\"isExpanded(facet) | async\"\n    [class.collapsed]=\"isCollapsed(facet) | async\"\n    role=\"group\"\n    attr.aria-label=\"{{\n      'productFacetNavigation.ariaLabelItemsAvailable'\n        | cxTranslate\n          : {\n              name: facet.name,\n              count: facet?.values?.length\n            }\n    }}\"\n  ></cx-facet>\n</section>\n" }]
        }], ctorParameters: function () { return [{ type: i1.FacetService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { isDialog: [{
                type: Input
            }], closeList: [{
                type: Output
            }], handleClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvcHJvZHVjdC1saXN0L3Byb2R1Y3QtZmFjZXQtbmF2aWdhdGlvbi9mYWNldC1saXN0L2ZhY2V0LWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWZhY2V0LW5hdmlnYXRpb24vZmFjZXQtbGlzdC9mYWNldC1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsd0JBQXdCLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFTckUsTUFBTSxPQUFPLGtCQUFrQjtJQUU3Qjs7T0FFRztJQUNILElBQ0ksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBaUJzQixXQUFXO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxZQUNZLFlBQTBCLEVBQzFCLFVBQXNCLEVBQ3RCLFFBQW1CO1FBRm5CLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXRCL0IscUNBQXFDO1FBQzNCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpDLDJFQUEyRTtRQUMzRSxlQUFVLEdBQTBCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO1FBRWpFLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFFdEIsc0JBQWlCLEdBQWdCO1lBQy9CLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLElBQUk7WUFDWCxhQUFhLEVBQUUsSUFBSTtZQUNuQixTQUFTLEVBQUUsVUFBVTtTQUN0QixDQUFDO0lBVUMsQ0FBQztJQUVKOztPQUVHO0lBQ0gsZ0JBQWdCLENBQUMsS0FBWSxFQUFFLEdBQW1CO1FBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVLENBQUMsS0FBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxZQUFZO2FBQ3JCLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDZixJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUNwRSxDQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLEtBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsWUFBWTthQUNyQixRQUFRLENBQUMsS0FBSyxDQUFDO2FBQ2YsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FDckUsQ0FBQztJQUNOLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBZTtRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBa0I7UUFDdEIsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7OytHQWhGVSxrQkFBa0I7bUdBQWxCLGtCQUFrQiwrS0M5Qi9CLGt2Q0E0Q0E7MkZEZGEsa0JBQWtCO2tCQUw5QixTQUFTOytCQUNFLGVBQWUsbUJBRVIsdUJBQXVCLENBQUMsTUFBTTtvSkFRM0MsUUFBUTtzQkFEWCxLQUFLO2dCQWFJLFNBQVM7c0JBQWxCLE1BQU07Z0JBY2dCLFdBQVc7c0JBQWpDLFlBQVk7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmFjZXQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRm9jdXNDb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9sYXlvdXQvYTExeS9rZXlib2FyZC1mb2N1cy9pbmRleCc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICcuLi8uLi8uLi8uLi9taXNjL2ljb24vaWNvbi5tb2RlbCc7XG5pbXBvcnQgeyBGYWNldEdyb3VwQ29sbGFwc2VkU3RhdGUsIEZhY2V0TGlzdCB9IGZyb20gJy4uL2ZhY2V0Lm1vZGVsJztcbmltcG9ydCB7IEZhY2V0Q29tcG9uZW50IH0gZnJvbSAnLi4vZmFjZXQvZmFjZXQuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2ZhY2V0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1mYWNldC1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZhY2V0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRMaXN0Q29tcG9uZW50IHtcbiAgcHJpdmF0ZSBfaXNEaWFsb2c6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgZmFjZXQgbmF2aWdhdGlvbiBpcyByZW5kZXJlZCBpbiBkaWFsb2cuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgaXNEaWFsb2codmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0RpYWxvZyA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc0RpYWxvZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNEaWFsb2c7XG4gIH1cblxuICAvKiogRW1pdHMgd2hlbiB0aGUgbGlzdCBtdXN0IGNsb3NlICovXG4gIEBPdXRwdXQoKSBjbG9zZUxpc3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqIFRoZSBsaXN0IG9mIGFsbCBmYWNldCBhbmQgdmFsdWVzIHJlbGF0ZWQgdG8gdGhlIHByb2R1Y3RzIGluIHRoZSBsaXN0ICovXG4gIGZhY2V0TGlzdCQ6IE9ic2VydmFibGU8RmFjZXRMaXN0PiA9IHRoaXMuZmFjZXRTZXJ2aWNlLmZhY2V0TGlzdCQ7XG5cbiAgaWNvblR5cGVzID0gSUNPTl9UWVBFO1xuXG4gIGRpYWxvZ0ZvY3VzQ29uZmlnOiBGb2N1c0NvbmZpZyA9IHtcbiAgICB0cmFwOiB0cnVlLFxuICAgIGJsb2NrOiB0cnVlLFxuICAgIGZvY3VzT25Fc2NhcGU6IHRydWUsXG4gICAgYXV0b2ZvY3VzOiAnY3gtZmFjZXQnLFxuICB9O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgaGFuZGxlQ2xpY2soKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGZhY2V0U2VydmljZTogRmFjZXRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgZmFjZXQgZ3JvdXAgaW4gY2FzZSBpdCBpcyBub3QgZXhwYW5kZWQuXG4gICAqL1xuICBleHBhbmRGYWNldEdyb3VwKGZhY2V0OiBGYWNldCwgcmVmOiBGYWNldENvbXBvbmVudCkge1xuICAgIGlmICghcmVmLmlzRXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuZmFjZXRTZXJ2aWNlLnRvZ2dsZShmYWNldCwgcmVmLmlzRXhwYW5kZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgZmFjZXQgZ3JvdXAgaGFzIGJlZW4gZXhwYW5kZWQuXG4gICAqL1xuICBpc0V4cGFuZGVkKGZhY2V0OiBGYWNldCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmZhY2V0U2VydmljZVxuICAgICAgLmdldFN0YXRlKGZhY2V0KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgodmFsdWUpID0+IHZhbHVlLnRvZ2dsZWQgPT09IEZhY2V0R3JvdXBDb2xsYXBzZWRTdGF0ZS5FWFBBTkRFRClcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoYXQgdGhlIGZhY2V0IGdyb3VwIGhhcyBiZWVuIGNvbGxhcHNlZC5cbiAgICovXG4gIGlzQ29sbGFwc2VkKGZhY2V0OiBGYWNldCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmZhY2V0U2VydmljZVxuICAgICAgLmdldFN0YXRlKGZhY2V0KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgodmFsdWUpID0+IHZhbHVlLnRvZ2dsZWQgPT09IEZhY2V0R3JvdXBDb2xsYXBzZWRTdGF0ZS5DT0xMQVBTRUQpXG4gICAgICApO1xuICB9XG5cbiAgY2xvc2UoZXZlbnQ/OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xuICAgIHRoaXMuY2xvc2VMaXN0LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYmxvY2soZXZlbnQ/OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQ/LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG59XG4iLCI8c2VjdGlvblxuICBjbGFzcz1cImlubmVyXCJcbiAgKm5nSWY9XCIoZmFjZXRMaXN0JCB8IGFzeW5jKT8uZmFjZXRzIGFzIGZhY2V0c1wiXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiJ3Byb2R1Y3RGYWNldE5hdmlnYXRpb24uZmlsdGVyQnkuZmFjZXQnIHwgY3hUcmFuc2xhdGVcIlxuICBbY3hGb2N1c109XCJpc0RpYWxvZyA/IGRpYWxvZ0ZvY3VzQ29uZmlnIDoge31cIlxuICBbdGFiaW5kZXhdPVwiLTFcIlxuICAoZXNjKT1cImNsb3NlKCRldmVudClcIlxuICAoY2xpY2spPVwiYmxvY2soJGV2ZW50KVwiXG4+XG4gIDxkaXYgY2xhc3M9XCJsaXN0LWhlYWRlclwiPlxuICAgIDxoND5cbiAgICAgIHt7ICdwcm9kdWN0TGlzdC5maWx0ZXJCeS5sYWJlbCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvaDQ+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImNsb3NlXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbW1vbi5jbG9zZScgfCBjeFRyYW5zbGF0ZVwiXG4gICAgICAoY2xpY2spPVwiY2xvc2UoKVwiXG4gICAgPlxuICAgICAgPGN4LWljb24gYXJpYS1oaWRkZW49XCJ0cnVlXCIgW3R5cGVdPVwiaWNvblR5cGVzLkNMT1NFXCI+PC9jeC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cblxuICA8IS0tXG4gICAgICBIZXJlIHdlJ2QgbGlrZSB0byBpbnRyb2R1Y2UgY29uZmlndXJhYmxlIGZhY2V0IGNvbXBvbmVudHMsXG4gICAgICBlaXRoZXIgYnkgdXNpbmcgc3BlY2lmaWMgY29uZmlndXJhdGlvbiBvciBnZW5lcmljIHNwcm91dGxldHNcbiAgLS0+XG4gIDxjeC1mYWNldFxuICAgICpuZ0Zvcj1cImxldCBmYWNldCBvZiBmYWNldHNcIlxuICAgICNmYWNldFJlZlxuICAgIFtmYWNldF09XCJmYWNldFwiXG4gICAgW2NsYXNzLmV4cGFuZGVkXT1cImlzRXhwYW5kZWQoZmFjZXQpIHwgYXN5bmNcIlxuICAgIFtjbGFzcy5jb2xsYXBzZWRdPVwiaXNDb2xsYXBzZWQoZmFjZXQpIHwgYXN5bmNcIlxuICAgIHJvbGU9XCJncm91cFwiXG4gICAgYXR0ci5hcmlhLWxhYmVsPVwie3tcbiAgICAgICdwcm9kdWN0RmFjZXROYXZpZ2F0aW9uLmFyaWFMYWJlbEl0ZW1zQXZhaWxhYmxlJ1xuICAgICAgICB8IGN4VHJhbnNsYXRlXG4gICAgICAgICAgOiB7XG4gICAgICAgICAgICAgIG5hbWU6IGZhY2V0Lm5hbWUsXG4gICAgICAgICAgICAgIGNvdW50OiBmYWNldD8udmFsdWVzPy5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICB9fVwiXG4gID48L2N4LWZhY2V0PlxuPC9zZWN0aW9uPlxuIl19