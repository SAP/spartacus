import { EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PaginationModel } from '@spartacus/core';
import { PaginationBuilder } from './pagination.builder';
import { PaginationItem, PaginationItemType } from './pagination.model';
import * as i0 from "@angular/core";
/**
 * The `PaginationComponent` is a generic component that is used for
 * all lists in Spartacus that require pagination. The component supports
 * all common features, which can be configured or hidden by CSS.
 */
export declare class PaginationComponent {
    private paginationBuilder;
    private activatedRoute;
    /** The (optional) pageRoute used for the anchor links created in the pagination   */
    pageRoute: string;
    /** The (optional) query parameter which is added to the page route.  */
    queryParam: string;
    /**
     * Whenever there's a default page specified, the routing logic
     * will omit the page number in routeLink or parameters.
     */
    defaultPage: number | undefined;
    private _pagination;
    get pagination(): PaginationModel;
    set pagination(value: PaginationModel | undefined);
    viewPageEvent: EventEmitter<number>;
    pages: PaginationItem[];
    constructor(paginationBuilder: PaginationBuilder, activatedRoute: ActivatedRoute);
    protected render(pagination: PaginationModel): void;
    /**
     * Format aria-label based on pagination item type.
     *
     * @param label string
     * @param type PaginationItemType
     * @returns string
     */
    getAriaLabel(label?: string, type?: PaginationItemType): string;
    /**
     * Indicates whether the given item is the current item.
     *
     * @param item PaginationItem
     * @returns boolean
     */
    isCurrent(item: PaginationItem): boolean;
    /**
     * Indicates whether the pagination item is inactive. This is used
     * to disabled a link or set the tabindex to `-1`.
     *
     * Defaults to true
     *
     * @param item PaginationItem
     * @returns returns -1 in case of a disabled
     */
    isInactive(item: PaginationItem): boolean;
    getQueryParams(item: PaginationItem): Params;
    pageChange(page: PaginationItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaginationComponent, "cx-pagination", never, { "pageRoute": "pageRoute"; "queryParam": "queryParam"; "defaultPage": "defaultPage"; "pagination": "pagination"; }, { "viewPageEvent": "viewPageEvent"; }, never, never, false, never>;
}
