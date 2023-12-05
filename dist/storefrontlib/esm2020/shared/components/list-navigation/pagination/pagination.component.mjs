/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { PaginationItemType } from './pagination.model';
import * as i0 from "@angular/core";
import * as i1 from "./pagination.builder";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
/**
 * The `PaginationComponent` is a generic component that is used for
 * all lists in Spartacus that require pagination. The component supports
 * all common features, which can be configured or hidden by CSS.
 */
export class PaginationComponent {
    get pagination() {
        return this._pagination;
    }
    set pagination(value) {
        if (value) {
            this._pagination = value;
            this.render(value);
        }
    }
    constructor(paginationBuilder, activatedRoute) {
        this.paginationBuilder = paginationBuilder;
        this.activatedRoute = activatedRoute;
        /** The (optional) pageRoute used for the anchor links created in the pagination   */
        this.pageRoute = '.';
        this.viewPageEvent = new EventEmitter();
        this.pages = [];
    }
    render(pagination) {
        if (!pagination) {
            return;
        }
        this.pages = this.paginationBuilder.paginate(pagination.totalPages ?? 0, pagination.currentPage ?? 0);
    }
    /**
     * Format aria-label based on pagination item type.
     *
     * @param label string
     * @param type PaginationItemType
     * @returns string
     */
    getAriaLabel(label, type) {
        // Convert 'Start' to First, and 'End' to Last for a more natural screen read.
        type = type === PaginationItemType.START ? PaginationItemType.FIRST : type;
        type = type === PaginationItemType.END ? PaginationItemType.LAST : type;
        return type === PaginationItemType.PAGE
            ? `${type} ${label}`
            : `${type} ${PaginationItemType.PAGE}`;
    }
    /**
     * Indicates whether the given item is the current item.
     *
     * @param item PaginationItem
     * @returns boolean
     */
    isCurrent(item) {
        return (item.type === PaginationItemType.PAGE &&
            item.number === this.pagination.currentPage);
    }
    /**
     * Indicates whether the pagination item is inactive. This is used
     * to disabled a link or set the tabindex to `-1`.
     *
     * Defaults to true
     *
     * @param item PaginationItem
     * @returns returns -1 in case of a disabled
     */
    isInactive(item) {
        return (!item.hasOwnProperty('number') ||
            item.number === this.pagination.currentPage);
    }
    getQueryParams(item) {
        const queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
        if (this.queryParam &&
            item.number !== undefined &&
            this.pagination.totalPages !== undefined &&
            item.number < this.pagination.totalPages &&
            !this.isCurrent(item)) {
            queryParams[this.queryParam] = item.number;
        }
        // omit the page number from the query parameters in case it's the default
        // to clean up the experience and avoid unnecessary polluting of the URL
        if (queryParams[this.queryParam] === this.defaultPage) {
            delete queryParams[this.queryParam];
        }
        return queryParams;
    }
    pageChange(page) {
        this.viewPageEvent.emit(page.number);
    }
}
PaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PaginationComponent, deps: [{ token: i1.PaginationBuilder }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
PaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PaginationComponent, selector: "cx-pagination", inputs: { pageRoute: "pageRoute", queryParam: "queryParam", defaultPage: "defaultPage", pagination: "pagination" }, outputs: { viewPageEvent: "viewPageEvent" }, ngImport: i0, template: "<a\n  *ngFor=\"let item of pages\"\n  [class]=\"item.type\"\n  [class.disabled]=\"isInactive(item)\"\n  [class.current]=\"isCurrent(item)\"\n  [routerLink]=\"pageRoute\"\n  [queryParams]=\"getQueryParams(item)\"\n  [tabIndex]=\"isInactive(item) ? -1 : 0\"\n  (click)=\"pageChange(item)\"\n  [attr.aria-label]=\"getAriaLabel(item.label, item.type)\"\n>\n  {{ item.label }}\n</a>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-pagination', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngFor=\"let item of pages\"\n  [class]=\"item.type\"\n  [class.disabled]=\"isInactive(item)\"\n  [class.current]=\"isCurrent(item)\"\n  [routerLink]=\"pageRoute\"\n  [queryParams]=\"getQueryParams(item)\"\n  [tabIndex]=\"isInactive(item) ? -1 : 0\"\n  (click)=\"pageChange(item)\"\n  [attr.aria-label]=\"getAriaLabel(item.label, item.type)\"\n>\n  {{ item.label }}\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: i1.PaginationBuilder }, { type: i2.ActivatedRoute }]; }, propDecorators: { pageRoute: [{
                type: Input
            }], queryParam: [{
                type: Input
            }], defaultPage: [{
                type: Input
            }], pagination: [{
                type: Input
            }], viewPageEvent: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL2xpc3QtbmF2aWdhdGlvbi9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9saXN0LW5hdmlnYXRpb24vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQWtCLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBRXhFOzs7O0dBSUc7QUFNSCxNQUFNLE9BQU8sbUJBQW1CO0lBYzlCLElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBYSxVQUFVLENBQUMsS0FBa0M7UUFDeEQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQU1ELFlBQ1UsaUJBQW9DLEVBQ3BDLGNBQThCO1FBRDlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBN0J4QyxxRkFBcUY7UUFDNUUsY0FBUyxHQUFXLEdBQUcsQ0FBQztRQXNCdkIsa0JBQWEsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUUzRSxVQUFLLEdBQXFCLEVBQUUsQ0FB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TSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBhZ2luYXRpb25Nb2RlbCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uQnVpbGRlciB9IGZyb20gJy4vcGFnaW5hdGlvbi5idWlsZGVyJztcbmltcG9ydCB7IFBhZ2luYXRpb25JdGVtLCBQYWdpbmF0aW9uSXRlbVR5cGUgfSBmcm9tICcuL3BhZ2luYXRpb24ubW9kZWwnO1xuXG4vKipcbiAqIFRoZSBgUGFnaW5hdGlvbkNvbXBvbmVudGAgaXMgYSBnZW5lcmljIGNvbXBvbmVudCB0aGF0IGlzIHVzZWQgZm9yXG4gKiBhbGwgbGlzdHMgaW4gU3BhcnRhY3VzIHRoYXQgcmVxdWlyZSBwYWdpbmF0aW9uLiBUaGUgY29tcG9uZW50IHN1cHBvcnRzXG4gKiBhbGwgY29tbW9uIGZlYXR1cmVzLCB3aGljaCBjYW4gYmUgY29uZmlndXJlZCBvciBoaWRkZW4gYnkgQ1NTLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbkNvbXBvbmVudCB7XG4gIC8qKiBUaGUgKG9wdGlvbmFsKSBwYWdlUm91dGUgdXNlZCBmb3IgdGhlIGFuY2hvciBsaW5rcyBjcmVhdGVkIGluIHRoZSBwYWdpbmF0aW9uICAgKi9cbiAgQElucHV0KCkgcGFnZVJvdXRlOiBzdHJpbmcgPSAnLic7XG5cbiAgLyoqIFRoZSAob3B0aW9uYWwpIHF1ZXJ5IHBhcmFtZXRlciB3aGljaCBpcyBhZGRlZCB0byB0aGUgcGFnZSByb3V0ZS4gICovXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW06IHN0cmluZztcblxuICAvKipcbiAgICogV2hlbmV2ZXIgdGhlcmUncyBhIGRlZmF1bHQgcGFnZSBzcGVjaWZpZWQsIHRoZSByb3V0aW5nIGxvZ2ljXG4gICAqIHdpbGwgb21pdCB0aGUgcGFnZSBudW1iZXIgaW4gcm91dGVMaW5rIG9yIHBhcmFtZXRlcnMuXG4gICAqL1xuICBASW5wdXQoKSBkZWZhdWx0UGFnZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX3BhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbDtcbiAgZ2V0IHBhZ2luYXRpb24oKTogUGFnaW5hdGlvbk1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnaW5hdGlvbjtcbiAgfVxuICBASW5wdXQoKSBzZXQgcGFnaW5hdGlvbih2YWx1ZTogUGFnaW5hdGlvbk1vZGVsIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9wYWdpbmF0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLnJlbmRlcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgpIHZpZXdQYWdlRXZlbnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgcGFnZXM6IFBhZ2luYXRpb25JdGVtW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2luYXRpb25CdWlsZGVyOiBQYWdpbmF0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIHJlbmRlcihwYWdpbmF0aW9uOiBQYWdpbmF0aW9uTW9kZWwpOiB2b2lkIHtcbiAgICBpZiAoIXBhZ2luYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMucGFnaW5hdGlvbkJ1aWxkZXIucGFnaW5hdGUoXG4gICAgICBwYWdpbmF0aW9uLnRvdGFsUGFnZXMgPz8gMCxcbiAgICAgIHBhZ2luYXRpb24uY3VycmVudFBhZ2UgPz8gMFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGFyaWEtbGFiZWwgYmFzZWQgb24gcGFnaW5hdGlvbiBpdGVtIHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbCBzdHJpbmdcbiAgICogQHBhcmFtIHR5cGUgUGFnaW5hdGlvbkl0ZW1UeXBlXG4gICAqIEByZXR1cm5zIHN0cmluZ1xuICAgKi9cbiAgZ2V0QXJpYUxhYmVsKGxhYmVsPzogc3RyaW5nLCB0eXBlPzogUGFnaW5hdGlvbkl0ZW1UeXBlKTogc3RyaW5nIHtcbiAgICAvLyBDb252ZXJ0ICdTdGFydCcgdG8gRmlyc3QsIGFuZCAnRW5kJyB0byBMYXN0IGZvciBhIG1vcmUgbmF0dXJhbCBzY3JlZW4gcmVhZC5cbiAgICB0eXBlID0gdHlwZSA9PT0gUGFnaW5hdGlvbkl0ZW1UeXBlLlNUQVJUID8gUGFnaW5hdGlvbkl0ZW1UeXBlLkZJUlNUIDogdHlwZTtcbiAgICB0eXBlID0gdHlwZSA9PT0gUGFnaW5hdGlvbkl0ZW1UeXBlLkVORCA/IFBhZ2luYXRpb25JdGVtVHlwZS5MQVNUIDogdHlwZTtcbiAgICByZXR1cm4gdHlwZSA9PT0gUGFnaW5hdGlvbkl0ZW1UeXBlLlBBR0VcbiAgICAgID8gYCR7dHlwZX0gJHtsYWJlbH1gXG4gICAgICA6IGAke3R5cGV9ICR7UGFnaW5hdGlvbkl0ZW1UeXBlLlBBR0V9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gaXRlbSBpcyB0aGUgY3VycmVudCBpdGVtLlxuICAgKlxuICAgKiBAcGFyYW0gaXRlbSBQYWdpbmF0aW9uSXRlbVxuICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAqL1xuICBpc0N1cnJlbnQoaXRlbTogUGFnaW5hdGlvbkl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXRlbS50eXBlID09PSBQYWdpbmF0aW9uSXRlbVR5cGUuUEFHRSAmJlxuICAgICAgaXRlbS5udW1iZXIgPT09IHRoaXMucGFnaW5hdGlvbi5jdXJyZW50UGFnZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBhZ2luYXRpb24gaXRlbSBpcyBpbmFjdGl2ZS4gVGhpcyBpcyB1c2VkXG4gICAqIHRvIGRpc2FibGVkIGEgbGluayBvciBzZXQgdGhlIHRhYmluZGV4IHRvIGAtMWAuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIHRydWVcbiAgICpcbiAgICogQHBhcmFtIGl0ZW0gUGFnaW5hdGlvbkl0ZW1cbiAgICogQHJldHVybnMgcmV0dXJucyAtMSBpbiBjYXNlIG9mIGEgZGlzYWJsZWRcbiAgICovXG4gIGlzSW5hY3RpdmUoaXRlbTogUGFnaW5hdGlvbkl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ251bWJlcicpIHx8XG4gICAgICBpdGVtLm51bWJlciA9PT0gdGhpcy5wYWdpbmF0aW9uLmN1cnJlbnRQYWdlXG4gICAgKTtcbiAgfVxuXG4gIGdldFF1ZXJ5UGFyYW1zKGl0ZW06IFBhZ2luYXRpb25JdGVtKTogUGFyYW1zIHtcbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNcbiAgICApO1xuICAgIGlmIChcbiAgICAgIHRoaXMucXVlcnlQYXJhbSAmJlxuICAgICAgaXRlbS5udW1iZXIgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdGhpcy5wYWdpbmF0aW9uLnRvdGFsUGFnZXMgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgaXRlbS5udW1iZXIgPCB0aGlzLnBhZ2luYXRpb24udG90YWxQYWdlcyAmJlxuICAgICAgIXRoaXMuaXNDdXJyZW50KGl0ZW0pXG4gICAgKSB7XG4gICAgICBxdWVyeVBhcmFtc1t0aGlzLnF1ZXJ5UGFyYW1dID0gaXRlbS5udW1iZXI7XG4gICAgfVxuICAgIC8vIG9taXQgdGhlIHBhZ2UgbnVtYmVyIGZyb20gdGhlIHF1ZXJ5IHBhcmFtZXRlcnMgaW4gY2FzZSBpdCdzIHRoZSBkZWZhdWx0XG4gICAgLy8gdG8gY2xlYW4gdXAgdGhlIGV4cGVyaWVuY2UgYW5kIGF2b2lkIHVubmVjZXNzYXJ5IHBvbGx1dGluZyBvZiB0aGUgVVJMXG4gICAgaWYgKHF1ZXJ5UGFyYW1zW3RoaXMucXVlcnlQYXJhbV0gPT09IHRoaXMuZGVmYXVsdFBhZ2UpIHtcbiAgICAgIGRlbGV0ZSBxdWVyeVBhcmFtc1t0aGlzLnF1ZXJ5UGFyYW1dO1xuICAgIH1cbiAgICByZXR1cm4gcXVlcnlQYXJhbXM7XG4gIH1cblxuICBwYWdlQ2hhbmdlKHBhZ2U6IFBhZ2luYXRpb25JdGVtKTogdm9pZCB7XG4gICAgdGhpcy52aWV3UGFnZUV2ZW50LmVtaXQocGFnZS5udW1iZXIpO1xuICB9XG59XG4iLCI8YVxuICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBwYWdlc1wiXG4gIFtjbGFzc109XCJpdGVtLnR5cGVcIlxuICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNJbmFjdGl2ZShpdGVtKVwiXG4gIFtjbGFzcy5jdXJyZW50XT1cImlzQ3VycmVudChpdGVtKVwiXG4gIFtyb3V0ZXJMaW5rXT1cInBhZ2VSb3V0ZVwiXG4gIFtxdWVyeVBhcmFtc109XCJnZXRRdWVyeVBhcmFtcyhpdGVtKVwiXG4gIFt0YWJJbmRleF09XCJpc0luYWN0aXZlKGl0ZW0pID8gLTEgOiAwXCJcbiAgKGNsaWNrKT1cInBhZ2VDaGFuZ2UoaXRlbSlcIlxuICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldEFyaWFMYWJlbChpdGVtLmxhYmVsLCBpdGVtLnR5cGUpXCJcbj5cbiAge3sgaXRlbS5sYWJlbCB9fVxuPC9hPlxuIl19