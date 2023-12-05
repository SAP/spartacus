import { PaginationConfig } from './config/pagination.config';
import { PaginationItem, PaginationItemType, PaginationOptions } from './pagination.model';
import * as i0 from "@angular/core";
/**
 * Builds a pagination structures based on a pageCount and current page number.
 * There are various {@link PaginationConfig} options which can be used to configure
 * the behavior of the build. Alternatively, CSS can be used to further customize
 * the pagination.
 *
 * Examples:
 * The full blown pagination items contain the follow elements:
 *
 * `« ‹ 1 ... 4 (5) 6 ... 9 › »`
 *
 * This includes pagination items to the following pages:
 * - start page
 * - previous page
 * - first page
 * - page range
 * - last page
 * - next page
 * - end page
 *
 * All of those links are configurable, including the size of the page range.
 * The current page will always be centered in the page range to provide direct access
 * to the previous and next page.
 */
export declare class PaginationBuilder {
    protected paginationConfig: PaginationConfig;
    constructor(paginationConfig: PaginationConfig);
    /**
     * Builds a list of `PaginationItem`. The give pageCount and current are used
     * to build out the full pagination. There are various {@link PaginationConfig} options
     * which can be used to configure the behavior of the build. Alternatively, CSS
     * can be used to further specialize visibility of the pagination.
     *
     * @param pageCount The total number of pages
     * @param current The current page number, 0-index based
     * @returns An array of `PaginationItem`
     */
    paginate(pageCount: number, current: number): PaginationItem[];
    /**
     * Returns the current page with surrounding pages (based on the `config.rangeCount`).
     * The current page is always centered to provide direct access to the previous and next page.
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     * @param current The current page number, 0-index based
     */
    protected addPages(pages: PaginationItem[], pageCount: number, current: number): void;
    /**
     * Adds dots before and after the given pages, if configured (defaults to true).
     * If the dots only represent a single page, the page number is added instead of
     * the dots, unless the configuration requires dots always.
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     */
    protected addDots(pages: PaginationItem[], pageCount: number): void;
    /**
     * Helper method for addDots() whether to add the first gap.
     */
    protected addFirstGapToDots(pages: PaginationItem[]): ({
        label: string | undefined;
        type: PaginationItemType;
    } & {
        number: number;
    })[];
    /**
     * Helper method for addDots() whether to add the last gap.
     */
    protected addLastGapToDots(pages: PaginationItem[], pageCount: number): ({
        label: string | undefined;
        type: PaginationItemType;
    } & {
        number: number;
    })[];
    /**
     * Add links to the first and last page, if configured to do so.
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     *
     */
    protected addFirstLast(pages: PaginationItem[], pageCount: number): void;
    /**
     * Add links to the start, previous, next and last page, if configured to do so.
     * The order of the links can be configured by using the {@link PaginationConfig},
     * using the `PaginationNavigationPosition` (`BEFORE` or `AFTER`).
     * The `PaginationNavigationPosition` allows for 3 flavours:
     *
     * - by default the pagination starts with start and previous and ends with the next and end links
     * - BEFORE – all navigation links are added in the front of the pagination list
     * - AFTER – all navigation links are pushed to the end of the pagination list
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     * @param current The current page number, 0-index based
     *
     */
    protected addNavigation(pages: PaginationItem[], pageCount: number, current: number): void;
    /**
     * Returns the start and previous links, if applicable.
     */
    protected getBeforeLinks(current: number): PaginationItem[];
    /**
     * Returns the next and end links, if applicable.
     */
    protected getAfterLinks(pageCount: number, current: number): PaginationItem[];
    /**
     * Resolves the first page of the range we need to build.
     * This is the page that is leading up to the range of the
     * current page.
     *
     * @param pageCount The total number of pages.
     * @param current The current page number, 0-index based.
     */
    protected getStartOfRange(pageCount: number, current: number): number | null;
    /**
     * Returns the pagination configuration. The configuration is driven by the
     * (default) application configuration.
     *
     * The default application is limited to adding the start and end link:
     * ```ts
     *   addStart: true,
     *   addEnd: true
     * ```
     *
     * The application configuration is however merged into the following static configuration:
     * ```ts
     * {
     *   rangeCount: 3,
     *   dotsLabel: '...',
     *   startLabel: '«',
     *   previousLabel: '‹',
     *   nextLabel: '›',
     *   endLabel: '»'
     * }
     * ```
     */
    protected get config(): PaginationOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PaginationBuilder>;
}
