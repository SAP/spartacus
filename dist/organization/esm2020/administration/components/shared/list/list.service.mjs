/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { TableLayout, } from '@spartacus/storefront';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
export var CreateButtonType;
(function (CreateButtonType) {
    CreateButtonType["LINK"] = "LINK";
    CreateButtonType["BUTTON"] = "BUTTON";
})(CreateButtonType || (CreateButtonType = {}));
/**
 * The `ListService` deals with the table structure, list data and
 * pagination of tables inside the b2b organization.
 *
 * @property {OrganizationTableType} tableType
 *   Used to load the table structure configuration and generate table outlets.
 * @property {PaginationModel} pagination$
 *   The pagination state of the listing.
 */
export class ListService {
    get viewType() {
        return this.tableType;
    }
    get domainType() {
        return this._domainType ?? this.viewType;
    }
    constructor(tableService) {
        this.tableService = tableService;
        /**
         * The default table structure is used to add the default configuration for all
         * organization list related tables. This avoids a lot of boilerplate configuration.
         */
        this.defaultTableStructure = {
            options: { layout: TableLayout.VERTICAL_STACKED },
            lg: { options: { layout: TableLayout.VERTICAL } },
        };
        /**
         * The ghost data contains an empty list of objects that is used in the UI
         * to render the HTML elements.
         *
         * This list contains 10 items, so that the ghost will show 10 rows by default.
         */
        this.ghostData = { values: new Array(10) };
        this.notification$ = new Subject();
        /**
         * The pagination state of the listing.
         *
         * The pagination size defaults to 10, but can be overridden by the
         * table configuration for each entity type.
         */
        this.pagination$ = new BehaviorSubject({
            pageSize: 10,
        });
    }
    /**
     * Indicates the unique key for the item model. The key is different for various
     * organizations, i.e. `budget.code`, `user.uid`.
     */
    key() {
        return 'code';
    }
    /**
     * Loads the data by delegating to the `load` method, which must be implemented
     * in specific implementations of this abstract class.
     *
     * The load method is streamed from the `pagination$` stream, which is initialized
     * with default pagination and structure drive properties.
     */
    getData(...args) {
        return this.pagination$.pipe(
        // we merge any configured pagination from the table structure
        switchMap((pagination) => this.getStructure().pipe(map((config) => ({ ...pagination, ...config.options?.pagination })))), switchMap((pagination) => this.load(pagination, ...args)), startWith(this.ghostData));
    }
    /**
     * Returns the `TableStructure` for the `OrganizationTableType`.
     *
     * The table structure is build by the `TableService` based on configuration.
     * The `defaultTableStructure` is deep merged as a fallback configuration.
     */
    getStructure() {
        return this.tableService.buildStructure(this.viewType, this.defaultTableStructure);
    }
    /**
     * Views the page.
     */
    view(pagination, nextPage) {
        this.pagination$.next({ ...pagination, currentPage: nextPage });
    }
    /**
     * Updates the sort code for the PaginationModel.
     *
     * The `currentPage` is reset to 0.
     */
    sort(pagination, _obsoleteSort) {
        this.view(pagination, 0);
    }
    /**
     * Indicates whether the given data equals to the ghost data.
     *
     * This is used to validate the initial loading state, which is
     * different from the loading state; the loading state occurs
     * while sorting and paginating, where as the initial loading state
     * only happens at the very first load.
     */
    hasGhostData(data) {
        return data === this.ghostData;
    }
    /**
     * This method will return what kind of UI element to be used for create option in UI
     */
    getCreateButtonType() {
        return CreateButtonType.LINK;
    }
    /**
     * This method will be called when the button to create new item is clicked.
     */
    onCreateButtonClick() { }
    /**
     * This method will return the label for create button
     */
    getCreateButtonLabel() {
        return { key: 'organization.add' };
    }
}
ListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListService, deps: [{ token: i1.TableService }], target: i0.ɵɵFactoryTarget.Injectable });
ListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.TableService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9saXN0L2xpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBRUwsV0FBVyxHQUdaLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGVBQWUsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUczRCxNQUFNLENBQU4sSUFBWSxnQkFHWDtBQUhELFdBQVksZ0JBQWdCO0lBQzFCLGlDQUFhLENBQUE7SUFDYixxQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUczQjtBQUVEOzs7Ozs7OztHQVFHO0FBR0gsTUFBTSxPQUFnQixXQUFXO0lBa0MvQixJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQzNDLENBQUM7SUFZRCxZQUFzQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQW5EaEQ7OztXQUdHO1FBQ08sMEJBQXFCLEdBQWlDO1lBQzlELE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsZ0JBQWdCLEVBQUU7WUFDakQsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtTQUNsRCxDQUFDO1FBRUY7Ozs7O1dBS0c7UUFDTyxjQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQXNCLENBQUM7UUFFcEUsa0JBQWEsR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQXdCNUM7Ozs7O1dBS0c7UUFDTyxnQkFBVyxHQUF1QixJQUFJLGVBQWUsQ0FBQztZQUM5RCxRQUFRLEVBQUUsRUFBRTtTQUNELENBQUMsQ0FBQztJQUVvQyxDQUFDO0lBRXBEOzs7T0FHRztJQUNILEdBQUc7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsT0FBTyxDQUFDLEdBQUcsSUFBUztRQUNsQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtRQUMxQiw4REFBOEQ7UUFDOUQsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FDdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FDdEIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FDcEUsQ0FDRixFQUNELFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUN6RCxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUMxQixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQ3JDLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLHFCQUFxQixDQUMzQixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxDQUFDLFVBQWEsRUFBRSxRQUFpQjtRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBSSxDQUFDLFVBQWEsRUFBRSxhQUFzQjtRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFlBQVksQ0FBQyxJQUFrQztRQUM3QyxPQUFPLElBQUksS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2pDLENBQUM7SUFXRDs7T0FFRztJQUNILG1CQUFtQjtRQUNqQixPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUIsS0FBVSxDQUFDO0lBRTlCOztPQUVHO0lBQ0gsb0JBQW9CO1FBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzt3R0FySm1CLFdBQVc7NEdBQVgsV0FBVzsyRkFBWCxXQUFXO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW50aXRpZXNNb2RlbCwgUGFnaW5hdGlvbk1vZGVsLCBUcmFuc2xhdGFibGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgUmVzcG9uc2l2ZVRhYmxlQ29uZmlndXJhdGlvbixcbiAgVGFibGVMYXlvdXQsXG4gIFRhYmxlU2VydmljZSxcbiAgVGFibGVTdHJ1Y3R1cmUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25UYWJsZVR5cGUgfSBmcm9tICcuLi9vcmdhbml6YXRpb24ubW9kZWwnO1xuXG5leHBvcnQgZW51bSBDcmVhdGVCdXR0b25UeXBlIHtcbiAgTElOSyA9ICdMSU5LJyxcbiAgQlVUVE9OID0gJ0JVVFRPTicsXG59XG5cbi8qKlxuICogVGhlIGBMaXN0U2VydmljZWAgZGVhbHMgd2l0aCB0aGUgdGFibGUgc3RydWN0dXJlLCBsaXN0IGRhdGEgYW5kXG4gKiBwYWdpbmF0aW9uIG9mIHRhYmxlcyBpbnNpZGUgdGhlIGIyYiBvcmdhbml6YXRpb24uXG4gKlxuICogQHByb3BlcnR5IHtPcmdhbml6YXRpb25UYWJsZVR5cGV9IHRhYmxlVHlwZVxuICogICBVc2VkIHRvIGxvYWQgdGhlIHRhYmxlIHN0cnVjdHVyZSBjb25maWd1cmF0aW9uIGFuZCBnZW5lcmF0ZSB0YWJsZSBvdXRsZXRzLlxuICogQHByb3BlcnR5IHtQYWdpbmF0aW9uTW9kZWx9IHBhZ2luYXRpb24kXG4gKiAgIFRoZSBwYWdpbmF0aW9uIHN0YXRlIG9mIHRoZSBsaXN0aW5nLlxuICovXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMaXN0U2VydmljZTxULCBQID0gUGFnaW5hdGlvbk1vZGVsPiB7XG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCB0YWJsZSBzdHJ1Y3R1cmUgaXMgdXNlZCB0byBhZGQgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmb3IgYWxsXG4gICAqIG9yZ2FuaXphdGlvbiBsaXN0IHJlbGF0ZWQgdGFibGVzLiBUaGlzIGF2b2lkcyBhIGxvdCBvZiBib2lsZXJwbGF0ZSBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIGRlZmF1bHRUYWJsZVN0cnVjdHVyZTogUmVzcG9uc2l2ZVRhYmxlQ29uZmlndXJhdGlvbiA9IHtcbiAgICBvcHRpb25zOiB7IGxheW91dDogVGFibGVMYXlvdXQuVkVSVElDQUxfU1RBQ0tFRCB9LFxuICAgIGxnOiB7IG9wdGlvbnM6IHsgbGF5b3V0OiBUYWJsZUxheW91dC5WRVJUSUNBTCB9IH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBnaG9zdCBkYXRhIGNvbnRhaW5zIGFuIGVtcHR5IGxpc3Qgb2Ygb2JqZWN0cyB0aGF0IGlzIHVzZWQgaW4gdGhlIFVJXG4gICAqIHRvIHJlbmRlciB0aGUgSFRNTCBlbGVtZW50cy5cbiAgICpcbiAgICogVGhpcyBsaXN0IGNvbnRhaW5zIDEwIGl0ZW1zLCBzbyB0aGF0IHRoZSBnaG9zdCB3aWxsIHNob3cgMTAgcm93cyBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGdob3N0RGF0YSA9IHsgdmFsdWVzOiBuZXcgQXJyYXkoMTApIH0gYXMgRW50aXRpZXNNb2RlbDxUPjtcblxuICBub3RpZmljYXRpb24kOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKlxuICAgKiBUaGUgYHZpZXdUeXBlYCBpcyB1c2VkIHRvIGxvYWQgdGhlIHByb3BlciB0YWJsZSBjb25maWd1cmF0aW9uIGFuZCBsb2NhbGl6YXRpb25zIGZvciB0aGUgdmlldy5cbiAgICpcbiAgICogVE9ETzogcmVuYW1lIHRvIGB2aWV3VHlwZWBcbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB0YWJsZVR5cGU6IE9yZ2FuaXphdGlvblRhYmxlVHlwZTtcblxuICAvKipcbiAgICogVGhlIGRvbWFpbiB0eXBlIGlzIHVzZWQgdG8gYmluZCBmaWVsZHMgdG8gbG9jYWxpemVkIGZpZWxkcyBiYXNlZCBvbiB0aGUgZG9tYWluLlxuICAgKiBUaGlzIHR5cGUgZGlmZmVycyBmcm9tIHRoZSBgdmlld1R5cGVgLCB3aGljaCBpcyByZWxhdGVkIHRvIGEgc3BlY2lmaWMgdmlld1xuICAgKiBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9kb21haW5UeXBlOiBzdHJpbmc7XG5cbiAgZ2V0IHZpZXdUeXBlKCk6IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVUeXBlO1xuICB9XG5cbiAgZ2V0IGRvbWFpblR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZG9tYWluVHlwZSA/PyB0aGlzLnZpZXdUeXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwYWdpbmF0aW9uIHN0YXRlIG9mIHRoZSBsaXN0aW5nLlxuICAgKlxuICAgKiBUaGUgcGFnaW5hdGlvbiBzaXplIGRlZmF1bHRzIHRvIDEwLCBidXQgY2FuIGJlIG92ZXJyaWRkZW4gYnkgdGhlXG4gICAqIHRhYmxlIGNvbmZpZ3VyYXRpb24gZm9yIGVhY2ggZW50aXR5IHR5cGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgcGFnaW5hdGlvbiQ6IEJlaGF2aW9yU3ViamVjdDxQPiA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe1xuICAgIHBhZ2VTaXplOiAxMCxcbiAgfSBhcyBhbnkgYXMgUCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhlIHVuaXF1ZSBrZXkgZm9yIHRoZSBpdGVtIG1vZGVsLiBUaGUga2V5IGlzIGRpZmZlcmVudCBmb3IgdmFyaW91c1xuICAgKiBvcmdhbml6YXRpb25zLCBpLmUuIGBidWRnZXQuY29kZWAsIGB1c2VyLnVpZGAuXG4gICAqL1xuICBrZXkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ2NvZGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIHRoZSBkYXRhIGJ5IGRlbGVnYXRpbmcgdG8gdGhlIGBsb2FkYCBtZXRob2QsIHdoaWNoIG11c3QgYmUgaW1wbGVtZW50ZWRcbiAgICogaW4gc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zIG9mIHRoaXMgYWJzdHJhY3QgY2xhc3MuXG4gICAqXG4gICAqIFRoZSBsb2FkIG1ldGhvZCBpcyBzdHJlYW1lZCBmcm9tIHRoZSBgcGFnaW5hdGlvbiRgIHN0cmVhbSwgd2hpY2ggaXMgaW5pdGlhbGl6ZWRcbiAgICogd2l0aCBkZWZhdWx0IHBhZ2luYXRpb24gYW5kIHN0cnVjdHVyZSBkcml2ZSBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgZ2V0RGF0YSguLi5hcmdzOiBhbnkpOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8VD4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5wYWdpbmF0aW9uJC5waXBlKFxuICAgICAgLy8gd2UgbWVyZ2UgYW55IGNvbmZpZ3VyZWQgcGFnaW5hdGlvbiBmcm9tIHRoZSB0YWJsZSBzdHJ1Y3R1cmVcbiAgICAgIHN3aXRjaE1hcCgocGFnaW5hdGlvbikgPT5cbiAgICAgICAgdGhpcy5nZXRTdHJ1Y3R1cmUoKS5waXBlKFxuICAgICAgICAgIG1hcCgoY29uZmlnKSA9PiAoeyAuLi5wYWdpbmF0aW9uLCAuLi5jb25maWcub3B0aW9ucz8ucGFnaW5hdGlvbiB9KSlcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIHN3aXRjaE1hcCgocGFnaW5hdGlvbikgPT4gdGhpcy5sb2FkKHBhZ2luYXRpb24sIC4uLmFyZ3MpKSxcbiAgICAgIHN0YXJ0V2l0aCh0aGlzLmdob3N0RGF0YSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBUYWJsZVN0cnVjdHVyZWAgZm9yIHRoZSBgT3JnYW5pemF0aW9uVGFibGVUeXBlYC5cbiAgICpcbiAgICogVGhlIHRhYmxlIHN0cnVjdHVyZSBpcyBidWlsZCBieSB0aGUgYFRhYmxlU2VydmljZWAgYmFzZWQgb24gY29uZmlndXJhdGlvbi5cbiAgICogVGhlIGBkZWZhdWx0VGFibGVTdHJ1Y3R1cmVgIGlzIGRlZXAgbWVyZ2VkIGFzIGEgZmFsbGJhY2sgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIGdldFN0cnVjdHVyZSgpOiBPYnNlcnZhYmxlPFRhYmxlU3RydWN0dXJlPiB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVTZXJ2aWNlLmJ1aWxkU3RydWN0dXJlKFxuICAgICAgdGhpcy52aWV3VHlwZSxcbiAgICAgIHRoaXMuZGVmYXVsdFRhYmxlU3RydWN0dXJlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3cyB0aGUgcGFnZS5cbiAgICovXG4gIHZpZXcocGFnaW5hdGlvbjogUCwgbmV4dFBhZ2U/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2luYXRpb24kLm5leHQoeyAuLi5wYWdpbmF0aW9uLCBjdXJyZW50UGFnZTogbmV4dFBhZ2UgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgc29ydCBjb2RlIGZvciB0aGUgUGFnaW5hdGlvbk1vZGVsLlxuICAgKlxuICAgKiBUaGUgYGN1cnJlbnRQYWdlYCBpcyByZXNldCB0byAwLlxuICAgKi9cbiAgc29ydChwYWdpbmF0aW9uOiBQLCBfb2Jzb2xldGVTb3J0Pzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy52aWV3KHBhZ2luYXRpb24sIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBkYXRhIGVxdWFscyB0byB0aGUgZ2hvc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VkIHRvIHZhbGlkYXRlIHRoZSBpbml0aWFsIGxvYWRpbmcgc3RhdGUsIHdoaWNoIGlzXG4gICAqIGRpZmZlcmVudCBmcm9tIHRoZSBsb2FkaW5nIHN0YXRlOyB0aGUgbG9hZGluZyBzdGF0ZSBvY2N1cnNcbiAgICogd2hpbGUgc29ydGluZyBhbmQgcGFnaW5hdGluZywgd2hlcmUgYXMgdGhlIGluaXRpYWwgbG9hZGluZyBzdGF0ZVxuICAgKiBvbmx5IGhhcHBlbnMgYXQgdGhlIHZlcnkgZmlyc3QgbG9hZC5cbiAgICovXG4gIGhhc0dob3N0RGF0YShkYXRhOiBFbnRpdGllc01vZGVsPFQ+IHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRhdGEgPT09IHRoaXMuZ2hvc3REYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIE11c3QgYmUgaW1wbGVtZW50ZWQgdG8gbG9hZCB0aGUgYWN0dWFsIGxpc3RpbmcgZGF0YS4gQW4gdW5rbm93biBudW1iZXIgb2YgYXJndW1lbnRzXG4gICAqIGlzIHN1cHBvcnRlZCBmb3IgbG9hZGluZyB0aGUgZGF0YS4gVGhlc2UgYXJndW1lbnRzIGFyZSBwYXNzZWQgZnJvbSB0aGUgYGdldERhdGFgIG1ldGhvZC5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICAuLi5hcmdzOiBhbnlcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPFQ+IHwgdW5kZWZpbmVkPjtcblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gd2hhdCBraW5kIG9mIFVJIGVsZW1lbnQgdG8gYmUgdXNlZCBmb3IgY3JlYXRlIG9wdGlvbiBpbiBVSVxuICAgKi9cbiAgZ2V0Q3JlYXRlQnV0dG9uVHlwZSgpOiBDcmVhdGVCdXR0b25UeXBlIHtcbiAgICByZXR1cm4gQ3JlYXRlQnV0dG9uVHlwZS5MSU5LO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGJ1dHRvbiB0byBjcmVhdGUgbmV3IGl0ZW0gaXMgY2xpY2tlZC5cbiAgICovXG4gIG9uQ3JlYXRlQnV0dG9uQ2xpY2soKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgbGFiZWwgZm9yIGNyZWF0ZSBidXR0b25cbiAgICovXG4gIGdldENyZWF0ZUJ1dHRvbkxhYmVsKCk6IFRyYW5zbGF0YWJsZSB7XG4gICAgcmV0dXJuIHsga2V5OiAnb3JnYW5pemF0aW9uLmFkZCcgfTtcbiAgfVxufVxuIl19