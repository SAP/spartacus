/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import * as i0 from "@angular/core";
import * as i1 from "../services/facet.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "../../../../misc/icon/icon.component";
import * as i5 from "../../../../../layout/a11y/keyboard-focus/focus.directive";
import * as i6 from "@spartacus/core";
/**
 * Active facets render the applied facet values as a list of focusable buttons
 * which can be used to remove the applied facet value.
 */
export class ActiveFacetsComponent {
    constructor(facetService) {
        this.facetService = facetService;
        this.role = 'group';
        this.labelledby = 'cx-active-facets-groupName';
        /** Active facets which are applied to the product results. */
        this.facetList$ = this.facetService.facetList$;
        /** Configurable icon which is used for the active facet close button */
        this.closeIcon = ICON_TYPE.CLOSE;
    }
    getLinkParams(facet) {
        return this.facetService.getLinkParams(facet.removeQuery?.query?.value ?? '');
    }
    /**
     * The focus key is used to persist the focus on the facet when the DOM is being
     * recreated. We only apply the focus key for the given _active_ facet when there
     * the original facets is not available. This happens for non multi-valued facets.
     *
     * With this approach, the we keep the focus, either at the facet list or on the
     * active facets.
     */
    getFocusKey(facetList, facet) {
        return facetList.facets?.find((f) => f.values?.find((val) => val.name === facet.facetValueName))
            ? ''
            : facet.facetValueName;
    }
    /**
     * Purpose of this function is to allow keyboard users to click on a filter they
     * wish to remove by pressing spacebar. Event not handled natively by <a> elements.
     *
     * @param event spacebar keydown
     */
    removeFilterWithSpacebar(event) {
        event?.preventDefault(); // Avoid spacebar scroll
        event?.target?.dispatchEvent(new MouseEvent('click', { cancelable: true }));
    }
}
ActiveFacetsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveFacetsComponent, deps: [{ token: i1.FacetService }], target: i0.ɵɵFactoryTarget.Component });
ActiveFacetsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ActiveFacetsComponent, selector: "cx-active-facets", inputs: { closeIcon: "closeIcon" }, host: { properties: { "attr.role": "this.role", "attr.aria-labelledby": "this.labelledby" } }, ngImport: i0, template: "<ng-container *ngIf=\"facetList$ | async as facetList\">\n  <div\n    id=\"cx-active-facets-groupName\"\n    *ngIf=\"facetList.activeFacets && facetList.activeFacets.length > 0\"\n  >\n    {{ 'productList.appliedFilter' | cxTranslate }}\n  </div>\n\n  <a\n    *ngFor=\"let facet of facetList?.activeFacets\"\n    routerLink=\"./\"\n    [queryParams]=\"getLinkParams(facet)\"\n    [cxFocus]=\"{ key: getFocusKey(facetList, facet) }\"\n    role=\"button\"\n    (keydown.space)=\"removeFilterWithSpacebar($event)\"\n    [attr.aria-label]=\"\n      'productList.activeFilter' | cxTranslate: { filter: facet.facetValueName }\n    \"\n  >\n    <span>{{ facet.facetValueName }}</span>\n    <cx-icon aria-hidden=\"true\" [type]=\"closeIcon\"></cx-icon>\n  </a>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i5.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.Default });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveFacetsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-active-facets', changeDetection: ChangeDetectionStrategy.Default, template: "<ng-container *ngIf=\"facetList$ | async as facetList\">\n  <div\n    id=\"cx-active-facets-groupName\"\n    *ngIf=\"facetList.activeFacets && facetList.activeFacets.length > 0\"\n  >\n    {{ 'productList.appliedFilter' | cxTranslate }}\n  </div>\n\n  <a\n    *ngFor=\"let facet of facetList?.activeFacets\"\n    routerLink=\"./\"\n    [queryParams]=\"getLinkParams(facet)\"\n    [cxFocus]=\"{ key: getFocusKey(facetList, facet) }\"\n    role=\"button\"\n    (keydown.space)=\"removeFilterWithSpacebar($event)\"\n    [attr.aria-label]=\"\n      'productList.activeFilter' | cxTranslate: { filter: facet.facetValueName }\n    \"\n  >\n    <span>{{ facet.facetValueName }}</span>\n    <cx-icon aria-hidden=\"true\" [type]=\"closeIcon\"></cx-icon>\n  </a>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.FacetService }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], labelledby: [{
                type: HostBinding,
                args: ['attr.aria-labelledby']
            }], closeIcon: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWZhY2V0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvcHJvZHVjdC1saXN0L3Byb2R1Y3QtZmFjZXQtbmF2aWdhdGlvbi9hY3RpdmUtZmFjZXRzL2FjdGl2ZS1mYWNldHMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWZhY2V0LW5hdmlnYXRpb24vYWN0aXZlLWZhY2V0cy9hY3RpdmUtZmFjZXRzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxXQUFXLEVBQ1gsS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvREFBb0QsQ0FBQzs7Ozs7Ozs7QUFJL0U7OztHQUdHO0FBTUgsTUFBTSxPQUFPLHFCQUFxQjtJQVdoQyxZQUFzQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVZ0QixTQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ0osZUFBVSxHQUM3Qyw0QkFBNEIsQ0FBQztRQUUvQiw4REFBOEQ7UUFDOUQsZUFBVSxHQUEwQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztRQUVqRSx3RUFBd0U7UUFDL0QsY0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFFYyxDQUFDO0lBRXBELGFBQWEsQ0FBQyxLQUFpQjtRQUM3QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUNwQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLElBQUksRUFBRSxDQUN0QyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxXQUFXLENBQUMsU0FBb0IsRUFBRSxLQUFpQjtRQUNqRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDbEMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUMzRDtZQUNDLENBQUMsQ0FBQyxFQUFFO1lBQ0osQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsd0JBQXdCLENBQUMsS0FBYTtRQUNwQyxLQUFLLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQyx3QkFBd0I7UUFDakQsS0FBSyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDOztrSEE1Q1UscUJBQXFCO3NHQUFyQixxQkFBcUIsMkxDM0JsQyxxd0JBdUJBOzJGRElhLHFCQUFxQjtrQkFMakMsU0FBUzsrQkFDRSxrQkFBa0IsbUJBRVgsdUJBQXVCLENBQUMsT0FBTzttR0FHdEIsSUFBSTtzQkFBN0IsV0FBVzt1QkFBQyxXQUFXO2dCQUNhLFVBQVU7c0JBQTlDLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU8xQixTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyZWFkY3J1bWIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSUNPTl9UWVBFIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY21zLWNvbXBvbmVudHMvbWlzYy9pY29uL2ljb24ubW9kZWwnO1xuaW1wb3J0IHsgRmFjZXRMaXN0IH0gZnJvbSAnLi4vZmFjZXQubW9kZWwnO1xuaW1wb3J0IHsgRmFjZXRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmFjZXQuc2VydmljZSc7XG5cbi8qKlxuICogQWN0aXZlIGZhY2V0cyByZW5kZXIgdGhlIGFwcGxpZWQgZmFjZXQgdmFsdWVzIGFzIGEgbGlzdCBvZiBmb2N1c2FibGUgYnV0dG9uc1xuICogd2hpY2ggY2FuIGJlIHVzZWQgdG8gcmVtb3ZlIHRoZSBhcHBsaWVkIGZhY2V0IHZhbHVlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1hY3RpdmUtZmFjZXRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FjdGl2ZS1mYWNldHMuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIEFjdGl2ZUZhY2V0c0NvbXBvbmVudCB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJykgcm9sZSA9ICdncm91cCc7XG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWxhYmVsbGVkYnknKSBsYWJlbGxlZGJ5ID1cbiAgICAnY3gtYWN0aXZlLWZhY2V0cy1ncm91cE5hbWUnO1xuXG4gIC8qKiBBY3RpdmUgZmFjZXRzIHdoaWNoIGFyZSBhcHBsaWVkIHRvIHRoZSBwcm9kdWN0IHJlc3VsdHMuICovXG4gIGZhY2V0TGlzdCQ6IE9ic2VydmFibGU8RmFjZXRMaXN0PiA9IHRoaXMuZmFjZXRTZXJ2aWNlLmZhY2V0TGlzdCQ7XG5cbiAgLyoqIENvbmZpZ3VyYWJsZSBpY29uIHdoaWNoIGlzIHVzZWQgZm9yIHRoZSBhY3RpdmUgZmFjZXQgY2xvc2UgYnV0dG9uICovXG4gIEBJbnB1dCgpIGNsb3NlSWNvbiA9IElDT05fVFlQRS5DTE9TRTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZmFjZXRTZXJ2aWNlOiBGYWNldFNlcnZpY2UpIHt9XG5cbiAgZ2V0TGlua1BhcmFtcyhmYWNldDogQnJlYWRjcnVtYikge1xuICAgIHJldHVybiB0aGlzLmZhY2V0U2VydmljZS5nZXRMaW5rUGFyYW1zKFxuICAgICAgZmFjZXQucmVtb3ZlUXVlcnk/LnF1ZXJ5Py52YWx1ZSA/PyAnJ1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZvY3VzIGtleSBpcyB1c2VkIHRvIHBlcnNpc3QgdGhlIGZvY3VzIG9uIHRoZSBmYWNldCB3aGVuIHRoZSBET00gaXMgYmVpbmdcbiAgICogcmVjcmVhdGVkLiBXZSBvbmx5IGFwcGx5IHRoZSBmb2N1cyBrZXkgZm9yIHRoZSBnaXZlbiBfYWN0aXZlXyBmYWNldCB3aGVuIHRoZXJlXG4gICAqIHRoZSBvcmlnaW5hbCBmYWNldHMgaXMgbm90IGF2YWlsYWJsZS4gVGhpcyBoYXBwZW5zIGZvciBub24gbXVsdGktdmFsdWVkIGZhY2V0cy5cbiAgICpcbiAgICogV2l0aCB0aGlzIGFwcHJvYWNoLCB0aGUgd2Uga2VlcCB0aGUgZm9jdXMsIGVpdGhlciBhdCB0aGUgZmFjZXQgbGlzdCBvciBvbiB0aGVcbiAgICogYWN0aXZlIGZhY2V0cy5cbiAgICovXG4gIGdldEZvY3VzS2V5KGZhY2V0TGlzdDogRmFjZXRMaXN0LCBmYWNldDogQnJlYWRjcnVtYikge1xuICAgIHJldHVybiBmYWNldExpc3QuZmFjZXRzPy5maW5kKChmKSA9PlxuICAgICAgZi52YWx1ZXM/LmZpbmQoKHZhbCkgPT4gdmFsLm5hbWUgPT09IGZhY2V0LmZhY2V0VmFsdWVOYW1lKVxuICAgIClcbiAgICAgID8gJydcbiAgICAgIDogZmFjZXQuZmFjZXRWYWx1ZU5hbWU7XG4gIH1cblxuICAvKipcbiAgICogUHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGFsbG93IGtleWJvYXJkIHVzZXJzIHRvIGNsaWNrIG9uIGEgZmlsdGVyIHRoZXlcbiAgICogd2lzaCB0byByZW1vdmUgYnkgcHJlc3Npbmcgc3BhY2ViYXIuIEV2ZW50IG5vdCBoYW5kbGVkIG5hdGl2ZWx5IGJ5IDxhPiBlbGVtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IHNwYWNlYmFyIGtleWRvd25cbiAgICovXG4gIHJlbW92ZUZpbHRlcldpdGhTcGFjZWJhcihldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQ/LnByZXZlbnREZWZhdWx0KCk7IC8vIEF2b2lkIHNwYWNlYmFyIHNjcm9sbFxuICAgIGV2ZW50Py50YXJnZXQ/LmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywgeyBjYW5jZWxhYmxlOiB0cnVlIH0pKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImZhY2V0TGlzdCQgfCBhc3luYyBhcyBmYWNldExpc3RcIj5cbiAgPGRpdlxuICAgIGlkPVwiY3gtYWN0aXZlLWZhY2V0cy1ncm91cE5hbWVcIlxuICAgICpuZ0lmPVwiZmFjZXRMaXN0LmFjdGl2ZUZhY2V0cyAmJiBmYWNldExpc3QuYWN0aXZlRmFjZXRzLmxlbmd0aCA+IDBcIlxuICA+XG4gICAge3sgJ3Byb2R1Y3RMaXN0LmFwcGxpZWRGaWx0ZXInIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9kaXY+XG5cbiAgPGFcbiAgICAqbmdGb3I9XCJsZXQgZmFjZXQgb2YgZmFjZXRMaXN0Py5hY3RpdmVGYWNldHNcIlxuICAgIHJvdXRlckxpbms9XCIuL1wiXG4gICAgW3F1ZXJ5UGFyYW1zXT1cImdldExpbmtQYXJhbXMoZmFjZXQpXCJcbiAgICBbY3hGb2N1c109XCJ7IGtleTogZ2V0Rm9jdXNLZXkoZmFjZXRMaXN0LCBmYWNldCkgfVwiXG4gICAgcm9sZT1cImJ1dHRvblwiXG4gICAgKGtleWRvd24uc3BhY2UpPVwicmVtb3ZlRmlsdGVyV2l0aFNwYWNlYmFyKCRldmVudClcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAncHJvZHVjdExpc3QuYWN0aXZlRmlsdGVyJyB8IGN4VHJhbnNsYXRlOiB7IGZpbHRlcjogZmFjZXQuZmFjZXRWYWx1ZU5hbWUgfVxuICAgIFwiXG4gID5cbiAgICA8c3Bhbj57eyBmYWNldC5mYWNldFZhbHVlTmFtZSB9fTwvc3Bhbj5cbiAgICA8Y3gtaWNvbiBhcmlhLWhpZGRlbj1cInRydWVcIiBbdHlwZV09XCJjbG9zZUljb25cIj48L2N4LWljb24+XG4gIDwvYT5cbjwvbmctY29udGFpbmVyPlxuIl19