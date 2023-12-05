/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PaginationItemType, PaginationNavigationPosition, } from './pagination.model';
import * as i0 from "@angular/core";
import * as i1 from "./config/pagination.config";
const FALLBACK_PAGINATION_OPTIONS = {
    rangeCount: 3,
    dotsLabel: '...',
    startLabel: '«',
    previousLabel: '‹',
    nextLabel: '›',
    endLabel: '»',
};
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
export class PaginationBuilder {
    constructor(paginationConfig) {
        this.paginationConfig = paginationConfig;
    }
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
    paginate(pageCount, current) {
        const pages = [];
        if (!pageCount || pageCount < 2) {
            return pages;
        }
        this.addPages(pages, pageCount, current);
        this.addDots(pages, pageCount);
        this.addFirstLast(pages, pageCount);
        this.addNavigation(pages, pageCount, current);
        return pages;
    }
    /**
     * Returns the current page with surrounding pages (based on the `config.rangeCount`).
     * The current page is always centered to provide direct access to the previous and next page.
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     * @param current The current page number, 0-index based
     */
    addPages(pages, pageCount, current) {
        const start = this.getStartOfRange(pageCount, current);
        if (this.config.rangeCount !== undefined && start !== null) {
            const max = Math.min(this.config.rangeCount, pageCount);
            Array.from(Array(max)).forEach((_, i) => {
                pages.push({
                    number: i + start,
                    label: String(i + start + 1),
                    type: PaginationItemType.PAGE,
                });
            });
        }
    }
    /**
     * Adds dots before and after the given pages, if configured (defaults to true).
     * If the dots only represent a single page, the page number is added instead of
     * the dots, unless the configuration requires dots always.
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     */
    addDots(pages, pageCount) {
        if (!this.config.addDots) {
            return;
        }
        pages.unshift(...this.addFirstGapToDots(pages));
        pages.push(...this.addLastGapToDots(pages, pageCount));
    }
    /**
     * Helper method for addDots() whether to add the first gap.
     */
    addFirstGapToDots(pages) {
        const firstItemNumber = pages[0].number;
        const gapNumber = Number(this.config.addFirst);
        if (firstItemNumber !== undefined && firstItemNumber > gapNumber) {
            const isGap = !this.config.substituteDotsForSingularPage ||
                firstItemNumber !== gapNumber + 1;
            const isSubstituted = this.config.addFirst &&
                this.config.substituteDotsForSingularPage &&
                gapNumber === 0;
            const type = isGap
                ? PaginationItemType.GAP
                : isSubstituted
                    ? PaginationItemType.FIRST
                    : PaginationItemType.PAGE;
            return [
                Object.assign({
                    label: isGap ? this.config.dotsLabel : String(gapNumber + 1),
                    type,
                }, isGap ? null : { number: gapNumber }),
            ];
        }
        else {
            return [];
        }
    }
    /**
     * Helper method for addDots() whether to add the last gap.
     */
    addLastGapToDots(pages, pageCount) {
        const pageNumber = pages[pages.length - 1].number;
        const nextPageNumber = pageNumber ? pageNumber + 1 : undefined;
        const last = pageCount - (Number(this.config.addLast) + 1);
        if (nextPageNumber && nextPageNumber <= last) {
            const isSubstituted = this.config.addLast &&
                this.config.substituteDotsForSingularPage &&
                nextPageNumber === last;
            const isGap = nextPageNumber <
                pageCount -
                    Number(this.config.substituteDotsForSingularPage) -
                    Number(this.config.addLast);
            const type = isGap
                ? PaginationItemType.GAP
                : isSubstituted
                    ? PaginationItemType.LAST
                    : PaginationItemType.PAGE;
            return [
                Object.assign({
                    label: isGap ? this.config.dotsLabel : String(nextPageNumber + 1),
                    type,
                }, isGap ? null : { number: nextPageNumber }),
            ];
        }
        else {
            return [];
        }
    }
    /**
     * Add links to the first and last page, if configured to do so.
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     *
     */
    addFirstLast(pages, pageCount) {
        if (this.config.addFirst && pages[0].number !== 0) {
            pages.unshift({
                number: 0,
                label: '1',
                type: PaginationItemType.FIRST,
            });
        }
        if (this.config.addLast &&
            pages[pages.length - 1].number !== pageCount - 1) {
            pages.push({
                number: pageCount - 1,
                label: String(pageCount),
                type: PaginationItemType.LAST,
            });
        }
    }
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
    addNavigation(pages, pageCount, current) {
        const before = this.getBeforeLinks(current);
        const after = this.getAfterLinks(pageCount, current);
        const pos = this.config.navigationPosition;
        if (!pos || pos === PaginationNavigationPosition.ASIDE) {
            pages.unshift(...before);
            pages.push(...after);
        }
        else {
            if (pos === PaginationNavigationPosition.BEFORE) {
                pages.unshift(...before, ...after);
            }
            if (pos === PaginationNavigationPosition.AFTER) {
                pages.push(...before, ...after);
            }
        }
    }
    /**
     * Returns the start and previous links, if applicable.
     */
    getBeforeLinks(current) {
        const list = [];
        if (this.config.addStart) {
            const start = () => {
                return Object.assign({
                    label: this.config.startLabel,
                    type: PaginationItemType.START,
                }, current > 0 ? { number: 0 } : null);
            };
            list.push(start());
        }
        if (this.config.addPrevious) {
            const previous = () => {
                return Object.assign({
                    label: this.config.previousLabel,
                    type: PaginationItemType.PREVIOUS,
                }, current > 0 ? { number: current - 1 } : null);
            };
            list.push(previous());
        }
        return list;
    }
    /**
     * Returns the next and end links, if applicable.
     */
    getAfterLinks(pageCount, current) {
        const list = [];
        if (this.config.addNext) {
            const next = () => {
                return Object.assign({
                    label: this.config.nextLabel,
                    type: PaginationItemType.NEXT,
                }, current < pageCount - 1 ? { number: current + 1 } : null);
            };
            list.push(next());
        }
        if (this.config.addEnd) {
            const end = () => {
                return Object.assign({
                    label: this.config.endLabel,
                    type: PaginationItemType.END,
                }, current < pageCount - 1 ? { number: pageCount - 1 } : null);
            };
            list.push(end());
        }
        return list;
    }
    /**
     * Resolves the first page of the range we need to build.
     * This is the page that is leading up to the range of the
     * current page.
     *
     * @param pageCount The total number of pages.
     * @param current The current page number, 0-index based.
     */
    getStartOfRange(pageCount, current) {
        if (this.config.rangeCount !== undefined) {
            const count = this.config.rangeCount - 1;
            // the least number of pages before and after the current
            const delta = Math.round(count / 2);
            // ensure that we start with at least the first page
            const minStart = Math.max(0, current - delta);
            // ensures that we start with at least 1 and do not pass the last range
            const maxStart = Math.max(0, pageCount - count - 1);
            // ensure that we get at least a full range at the end
            return Math.min(maxStart, minStart);
        }
        return null;
    }
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
    get config() {
        return Object.assign(FALLBACK_PAGINATION_OPTIONS, this.paginationConfig.pagination);
    }
}
PaginationBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PaginationBuilder, deps: [{ token: i1.PaginationConfig }], target: i0.ɵɵFactoryTarget.Injectable });
PaginationBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PaginationBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PaginationBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.PaginationConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9saXN0LW5hdmlnYXRpb24vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUVMLGtCQUFrQixFQUNsQiw0QkFBNEIsR0FFN0IsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBRTVCLE1BQU0sMkJBQTJCLEdBQXNCO0lBQ3JELFVBQVUsRUFBRSxDQUFDO0lBQ2IsU0FBUyxFQUFFLEtBQUs7SUFDaEIsVUFBVSxFQUFFLEdBQUc7SUFDZixhQUFhLEVBQUUsR0FBRztJQUNsQixTQUFTLEVBQUUsR0FBRztJQUNkLFFBQVEsRUFBRSxHQUFHO0NBQ2QsQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUlILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFBc0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFBRyxDQUFDO0lBRTVEOzs7Ozs7Ozs7T0FTRztJQUNILFFBQVEsQ0FBQyxTQUFpQixFQUFFLE9BQWU7UUFDekMsTUFBTSxLQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFT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QW5VVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvcGFnaW5hdGlvbi5jb25maWcnO1xuaW1wb3J0IHtcbiAgUGFnaW5hdGlvbkl0ZW0sXG4gIFBhZ2luYXRpb25JdGVtVHlwZSxcbiAgUGFnaW5hdGlvbk5hdmlnYXRpb25Qb3NpdGlvbixcbiAgUGFnaW5hdGlvbk9wdGlvbnMsXG59IGZyb20gJy4vcGFnaW5hdGlvbi5tb2RlbCc7XG5cbmNvbnN0IEZBTExCQUNLX1BBR0lOQVRJT05fT1BUSU9OUzogUGFnaW5hdGlvbk9wdGlvbnMgPSB7XG4gIHJhbmdlQ291bnQ6IDMsXG4gIGRvdHNMYWJlbDogJy4uLicsXG4gIHN0YXJ0TGFiZWw6ICfCqycsXG4gIHByZXZpb3VzTGFiZWw6ICfigLknLFxuICBuZXh0TGFiZWw6ICfigLonLFxuICBlbmRMYWJlbDogJ8K7Jyxcbn07XG5cbi8qKlxuICogQnVpbGRzIGEgcGFnaW5hdGlvbiBzdHJ1Y3R1cmVzIGJhc2VkIG9uIGEgcGFnZUNvdW50IGFuZCBjdXJyZW50IHBhZ2UgbnVtYmVyLlxuICogVGhlcmUgYXJlIHZhcmlvdXMge0BsaW5rIFBhZ2luYXRpb25Db25maWd9IG9wdGlvbnMgd2hpY2ggY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlXG4gKiB0aGUgYmVoYXZpb3Igb2YgdGhlIGJ1aWxkLiBBbHRlcm5hdGl2ZWx5LCBDU1MgY2FuIGJlIHVzZWQgdG8gZnVydGhlciBjdXN0b21pemVcbiAqIHRoZSBwYWdpbmF0aW9uLlxuICpcbiAqIEV4YW1wbGVzOlxuICogVGhlIGZ1bGwgYmxvd24gcGFnaW5hdGlvbiBpdGVtcyBjb250YWluIHRoZSBmb2xsb3cgZWxlbWVudHM6XG4gKlxuICogYMKrIOKAuSAxIC4uLiA0ICg1KSA2IC4uLiA5IOKAuiDCu2BcbiAqXG4gKiBUaGlzIGluY2x1ZGVzIHBhZ2luYXRpb24gaXRlbXMgdG8gdGhlIGZvbGxvd2luZyBwYWdlczpcbiAqIC0gc3RhcnQgcGFnZVxuICogLSBwcmV2aW91cyBwYWdlXG4gKiAtIGZpcnN0IHBhZ2VcbiAqIC0gcGFnZSByYW5nZVxuICogLSBsYXN0IHBhZ2VcbiAqIC0gbmV4dCBwYWdlXG4gKiAtIGVuZCBwYWdlXG4gKlxuICogQWxsIG9mIHRob3NlIGxpbmtzIGFyZSBjb25maWd1cmFibGUsIGluY2x1ZGluZyB0aGUgc2l6ZSBvZiB0aGUgcGFnZSByYW5nZS5cbiAqIFRoZSBjdXJyZW50IHBhZ2Ugd2lsbCBhbHdheXMgYmUgY2VudGVyZWQgaW4gdGhlIHBhZ2UgcmFuZ2UgdG8gcHJvdmlkZSBkaXJlY3QgYWNjZXNzXG4gKiB0byB0aGUgcHJldmlvdXMgYW5kIG5leHQgcGFnZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25CdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHBhZ2luYXRpb25Db25maWc6IFBhZ2luYXRpb25Db25maWcpIHt9XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyBhIGxpc3Qgb2YgYFBhZ2luYXRpb25JdGVtYC4gVGhlIGdpdmUgcGFnZUNvdW50IGFuZCBjdXJyZW50IGFyZSB1c2VkXG4gICAqIHRvIGJ1aWxkIG91dCB0aGUgZnVsbCBwYWdpbmF0aW9uLiBUaGVyZSBhcmUgdmFyaW91cyB7QGxpbmsgUGFnaW5hdGlvbkNvbmZpZ30gb3B0aW9uc1xuICAgKiB3aGljaCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdGhlIGJlaGF2aW9yIG9mIHRoZSBidWlsZC4gQWx0ZXJuYXRpdmVseSwgQ1NTXG4gICAqIGNhbiBiZSB1c2VkIHRvIGZ1cnRoZXIgc3BlY2lhbGl6ZSB2aXNpYmlsaXR5IG9mIHRoZSBwYWdpbmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gcGFnZUNvdW50IFRoZSB0b3RhbCBudW1iZXIgb2YgcGFnZXNcbiAgICogQHBhcmFtIGN1cnJlbnQgVGhlIGN1cnJlbnQgcGFnZSBudW1iZXIsIDAtaW5kZXggYmFzZWRcbiAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgYFBhZ2luYXRpb25JdGVtYFxuICAgKi9cbiAgcGFnaW5hdGUocGFnZUNvdW50OiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlcik6IFBhZ2luYXRpb25JdGVtW10ge1xuICAgIGNvbnN0IHBhZ2VzOiBQYWdpbmF0aW9uSXRlbVtdID0gW107XG4gICAgaWYgKCFwYWdlQ291bnQgfHwgcGFnZUNvdW50IDwgMikge1xuICAgICAgcmV0dXJuIHBhZ2VzO1xuICAgIH1cbiAgICB0aGlzLmFkZFBhZ2VzKHBhZ2VzLCBwYWdlQ291bnQsIGN1cnJlbnQpO1xuICAgIHRoaXMuYWRkRG90cyhwYWdlcywgcGFnZUNvdW50KTtcbiAgICB0aGlzLmFkZEZpcnN0TGFzdChwYWdlcywgcGFnZUNvdW50KTtcbiAgICB0aGlzLmFkZE5hdmlnYXRpb24ocGFnZXMsIHBhZ2VDb3VudCwgY3VycmVudCk7XG5cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBwYWdlIHdpdGggc3Vycm91bmRpbmcgcGFnZXMgKGJhc2VkIG9uIHRoZSBgY29uZmlnLnJhbmdlQ291bnRgKS5cbiAgICogVGhlIGN1cnJlbnQgcGFnZSBpcyBhbHdheXMgY2VudGVyZWQgdG8gcHJvdmlkZSBkaXJlY3QgYWNjZXNzIHRvIHRoZSBwcmV2aW91cyBhbmQgbmV4dCBwYWdlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFnZXMgVGhlIGxpc3Qgb2YgcGFnZSBpdGVtcyB0aGF0IGlzIHVzZWQgdG8gYW1lbmRcbiAgICogQHBhcmFtIHBhZ2VDb3VudCBUaGUgdG90YWwgbnVtYmVyIG9mIHBhZ2VzXG4gICAqIEBwYXJhbSBjdXJyZW50IFRoZSBjdXJyZW50IHBhZ2UgbnVtYmVyLCAwLWluZGV4IGJhc2VkXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkUGFnZXMoXG4gICAgcGFnZXM6IFBhZ2luYXRpb25JdGVtW10sXG4gICAgcGFnZUNvdW50OiBudW1iZXIsXG4gICAgY3VycmVudDogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5nZXRTdGFydE9mUmFuZ2UocGFnZUNvdW50LCBjdXJyZW50KTtcbiAgICBpZiAodGhpcy5jb25maWcucmFuZ2VDb3VudCAhPT0gdW5kZWZpbmVkICYmIHN0YXJ0ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1pbih0aGlzLmNvbmZpZy5yYW5nZUNvdW50LCBwYWdlQ291bnQpO1xuICAgICAgQXJyYXkuZnJvbShBcnJheShtYXgpKS5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgICAgIHBhZ2VzLnB1c2goe1xuICAgICAgICAgIG51bWJlcjogaSArIHN0YXJ0LFxuICAgICAgICAgIGxhYmVsOiBTdHJpbmcoaSArIHN0YXJ0ICsgMSksXG4gICAgICAgICAgdHlwZTogUGFnaW5hdGlvbkl0ZW1UeXBlLlBBR0UsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZG90cyBiZWZvcmUgYW5kIGFmdGVyIHRoZSBnaXZlbiBwYWdlcywgaWYgY29uZmlndXJlZCAoZGVmYXVsdHMgdG8gdHJ1ZSkuXG4gICAqIElmIHRoZSBkb3RzIG9ubHkgcmVwcmVzZW50IGEgc2luZ2xlIHBhZ2UsIHRoZSBwYWdlIG51bWJlciBpcyBhZGRlZCBpbnN0ZWFkIG9mXG4gICAqIHRoZSBkb3RzLCB1bmxlc3MgdGhlIGNvbmZpZ3VyYXRpb24gcmVxdWlyZXMgZG90cyBhbHdheXMuXG4gICAqXG4gICAqIEBwYXJhbSBwYWdlcyBUaGUgbGlzdCBvZiBwYWdlIGl0ZW1zIHRoYXQgaXMgdXNlZCB0byBhbWVuZFxuICAgKiBAcGFyYW0gcGFnZUNvdW50IFRoZSB0b3RhbCBudW1iZXIgb2YgcGFnZXNcbiAgICovXG4gIHByb3RlY3RlZCBhZGREb3RzKHBhZ2VzOiBQYWdpbmF0aW9uSXRlbVtdLCBwYWdlQ291bnQ6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb25maWcuYWRkRG90cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHBhZ2VzLnVuc2hpZnQoLi4udGhpcy5hZGRGaXJzdEdhcFRvRG90cyhwYWdlcykpO1xuICAgIHBhZ2VzLnB1c2goLi4udGhpcy5hZGRMYXN0R2FwVG9Eb3RzKHBhZ2VzLCBwYWdlQ291bnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgbWV0aG9kIGZvciBhZGREb3RzKCkgd2hldGhlciB0byBhZGQgdGhlIGZpcnN0IGdhcC5cbiAgICovXG4gIHByb3RlY3RlZCBhZGRGaXJzdEdhcFRvRG90cyhwYWdlczogUGFnaW5hdGlvbkl0ZW1bXSkge1xuICAgIGNvbnN0IGZpcnN0SXRlbU51bWJlciA9IHBhZ2VzWzBdLm51bWJlcjtcbiAgICBjb25zdCBnYXBOdW1iZXIgPSBOdW1iZXIodGhpcy5jb25maWcuYWRkRmlyc3QpO1xuICAgIGlmIChmaXJzdEl0ZW1OdW1iZXIgIT09IHVuZGVmaW5lZCAmJiBmaXJzdEl0ZW1OdW1iZXIgPiBnYXBOdW1iZXIpIHtcbiAgICAgIGNvbnN0IGlzR2FwID1cbiAgICAgICAgIXRoaXMuY29uZmlnLnN1YnN0aXR1dGVEb3RzRm9yU2luZ3VsYXJQYWdlIHx8XG4gICAgICAgIGZpcnN0SXRlbU51bWJlciAhPT0gZ2FwTnVtYmVyICsgMTtcbiAgICAgIGNvbnN0IGlzU3Vic3RpdHV0ZWQgPVxuICAgICAgICB0aGlzLmNvbmZpZy5hZGRGaXJzdCAmJlxuICAgICAgICB0aGlzLmNvbmZpZy5zdWJzdGl0dXRlRG90c0ZvclNpbmd1bGFyUGFnZSAmJlxuICAgICAgICBnYXBOdW1iZXIgPT09IDA7XG4gICAgICBjb25zdCB0eXBlID0gaXNHYXBcbiAgICAgICAgPyBQYWdpbmF0aW9uSXRlbVR5cGUuR0FQXG4gICAgICAgIDogaXNTdWJzdGl0dXRlZFxuICAgICAgICA/IFBhZ2luYXRpb25JdGVtVHlwZS5GSVJTVFxuICAgICAgICA6IFBhZ2luYXRpb25JdGVtVHlwZS5QQUdFO1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogaXNHYXAgPyB0aGlzLmNvbmZpZy5kb3RzTGFiZWwgOiBTdHJpbmcoZ2FwTnVtYmVyICsgMSksXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNHYXAgPyBudWxsIDogeyBudW1iZXI6IGdhcE51bWJlciB9XG4gICAgICAgICksXG4gICAgICBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgZm9yIGFkZERvdHMoKSB3aGV0aGVyIHRvIGFkZCB0aGUgbGFzdCBnYXAuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkTGFzdEdhcFRvRG90cyhwYWdlczogUGFnaW5hdGlvbkl0ZW1bXSwgcGFnZUNvdW50OiBudW1iZXIpIHtcbiAgICBjb25zdCBwYWdlTnVtYmVyID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgIGNvbnN0IG5leHRQYWdlTnVtYmVyID0gcGFnZU51bWJlciA/IHBhZ2VOdW1iZXIgKyAxIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGxhc3QgPSBwYWdlQ291bnQgLSAoTnVtYmVyKHRoaXMuY29uZmlnLmFkZExhc3QpICsgMSk7XG4gICAgaWYgKG5leHRQYWdlTnVtYmVyICYmIG5leHRQYWdlTnVtYmVyIDw9IGxhc3QpIHtcbiAgICAgIGNvbnN0IGlzU3Vic3RpdHV0ZWQgPVxuICAgICAgICB0aGlzLmNvbmZpZy5hZGRMYXN0ICYmXG4gICAgICAgIHRoaXMuY29uZmlnLnN1YnN0aXR1dGVEb3RzRm9yU2luZ3VsYXJQYWdlICYmXG4gICAgICAgIG5leHRQYWdlTnVtYmVyID09PSBsYXN0O1xuICAgICAgY29uc3QgaXNHYXAgPVxuICAgICAgICBuZXh0UGFnZU51bWJlciA8XG4gICAgICAgIHBhZ2VDb3VudCAtXG4gICAgICAgICAgTnVtYmVyKHRoaXMuY29uZmlnLnN1YnN0aXR1dGVEb3RzRm9yU2luZ3VsYXJQYWdlKSAtXG4gICAgICAgICAgTnVtYmVyKHRoaXMuY29uZmlnLmFkZExhc3QpO1xuXG4gICAgICBjb25zdCB0eXBlID0gaXNHYXBcbiAgICAgICAgPyBQYWdpbmF0aW9uSXRlbVR5cGUuR0FQXG4gICAgICAgIDogaXNTdWJzdGl0dXRlZFxuICAgICAgICA/IFBhZ2luYXRpb25JdGVtVHlwZS5MQVNUXG4gICAgICAgIDogUGFnaW5hdGlvbkl0ZW1UeXBlLlBBR0U7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiBpc0dhcCA/IHRoaXMuY29uZmlnLmRvdHNMYWJlbCA6IFN0cmluZyhuZXh0UGFnZU51bWJlciArIDEpLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzR2FwID8gbnVsbCA6IHsgbnVtYmVyOiBuZXh0UGFnZU51bWJlciB9XG4gICAgICAgICksXG4gICAgICBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBsaW5rcyB0byB0aGUgZmlyc3QgYW5kIGxhc3QgcGFnZSwgaWYgY29uZmlndXJlZCB0byBkbyBzby5cbiAgICpcbiAgICogQHBhcmFtIHBhZ2VzIFRoZSBsaXN0IG9mIHBhZ2UgaXRlbXMgdGhhdCBpcyB1c2VkIHRvIGFtZW5kXG4gICAqIEBwYXJhbSBwYWdlQ291bnQgVGhlIHRvdGFsIG51bWJlciBvZiBwYWdlc1xuICAgKlxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZEZpcnN0TGFzdChwYWdlczogUGFnaW5hdGlvbkl0ZW1bXSwgcGFnZUNvdW50OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5jb25maWcuYWRkRmlyc3QgJiYgcGFnZXNbMF0ubnVtYmVyICE9PSAwKSB7XG4gICAgICBwYWdlcy51bnNoaWZ0KHtcbiAgICAgICAgbnVtYmVyOiAwLFxuICAgICAgICBsYWJlbDogJzEnLFxuICAgICAgICB0eXBlOiBQYWdpbmF0aW9uSXRlbVR5cGUuRklSU1QsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcuYWRkTGFzdCAmJlxuICAgICAgcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV0ubnVtYmVyICE9PSBwYWdlQ291bnQgLSAxXG4gICAgKSB7XG4gICAgICBwYWdlcy5wdXNoKHtcbiAgICAgICAgbnVtYmVyOiBwYWdlQ291bnQgLSAxLFxuICAgICAgICBsYWJlbDogU3RyaW5nKHBhZ2VDb3VudCksXG4gICAgICAgIHR5cGU6IFBhZ2luYXRpb25JdGVtVHlwZS5MQVNULFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBsaW5rcyB0byB0aGUgc3RhcnQsIHByZXZpb3VzLCBuZXh0IGFuZCBsYXN0IHBhZ2UsIGlmIGNvbmZpZ3VyZWQgdG8gZG8gc28uXG4gICAqIFRoZSBvcmRlciBvZiB0aGUgbGlua3MgY2FuIGJlIGNvbmZpZ3VyZWQgYnkgdXNpbmcgdGhlIHtAbGluayBQYWdpbmF0aW9uQ29uZmlnfSxcbiAgICogdXNpbmcgdGhlIGBQYWdpbmF0aW9uTmF2aWdhdGlvblBvc2l0aW9uYCAoYEJFRk9SRWAgb3IgYEFGVEVSYCkuXG4gICAqIFRoZSBgUGFnaW5hdGlvbk5hdmlnYXRpb25Qb3NpdGlvbmAgYWxsb3dzIGZvciAzIGZsYXZvdXJzOlxuICAgKlxuICAgKiAtIGJ5IGRlZmF1bHQgdGhlIHBhZ2luYXRpb24gc3RhcnRzIHdpdGggc3RhcnQgYW5kIHByZXZpb3VzIGFuZCBlbmRzIHdpdGggdGhlIG5leHQgYW5kIGVuZCBsaW5rc1xuICAgKiAtIEJFRk9SRSDigJMgYWxsIG5hdmlnYXRpb24gbGlua3MgYXJlIGFkZGVkIGluIHRoZSBmcm9udCBvZiB0aGUgcGFnaW5hdGlvbiBsaXN0XG4gICAqIC0gQUZURVIg4oCTIGFsbCBuYXZpZ2F0aW9uIGxpbmtzIGFyZSBwdXNoZWQgdG8gdGhlIGVuZCBvZiB0aGUgcGFnaW5hdGlvbiBsaXN0XG4gICAqXG4gICAqIEBwYXJhbSBwYWdlcyBUaGUgbGlzdCBvZiBwYWdlIGl0ZW1zIHRoYXQgaXMgdXNlZCB0byBhbWVuZFxuICAgKiBAcGFyYW0gcGFnZUNvdW50IFRoZSB0b3RhbCBudW1iZXIgb2YgcGFnZXNcbiAgICogQHBhcmFtIGN1cnJlbnQgVGhlIGN1cnJlbnQgcGFnZSBudW1iZXIsIDAtaW5kZXggYmFzZWRcbiAgICpcbiAgICovXG4gIHByb3RlY3RlZCBhZGROYXZpZ2F0aW9uKFxuICAgIHBhZ2VzOiBQYWdpbmF0aW9uSXRlbVtdLFxuICAgIHBhZ2VDb3VudDogbnVtYmVyLFxuICAgIGN1cnJlbnQ6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICBjb25zdCBiZWZvcmUgPSB0aGlzLmdldEJlZm9yZUxpbmtzKGN1cnJlbnQpO1xuICAgIGNvbnN0IGFmdGVyID0gdGhpcy5nZXRBZnRlckxpbmtzKHBhZ2VDb3VudCwgY3VycmVudCk7XG4gICAgY29uc3QgcG9zID0gdGhpcy5jb25maWcubmF2aWdhdGlvblBvc2l0aW9uO1xuICAgIGlmICghcG9zIHx8IHBvcyA9PT0gUGFnaW5hdGlvbk5hdmlnYXRpb25Qb3NpdGlvbi5BU0lERSkge1xuICAgICAgcGFnZXMudW5zaGlmdCguLi5iZWZvcmUpO1xuICAgICAgcGFnZXMucHVzaCguLi5hZnRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwb3MgPT09IFBhZ2luYXRpb25OYXZpZ2F0aW9uUG9zaXRpb24uQkVGT1JFKSB7XG4gICAgICAgIHBhZ2VzLnVuc2hpZnQoLi4uYmVmb3JlLCAuLi5hZnRlcik7XG4gICAgICB9XG4gICAgICBpZiAocG9zID09PSBQYWdpbmF0aW9uTmF2aWdhdGlvblBvc2l0aW9uLkFGVEVSKSB7XG4gICAgICAgIHBhZ2VzLnB1c2goLi4uYmVmb3JlLCAuLi5hZnRlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHN0YXJ0IGFuZCBwcmV2aW91cyBsaW5rcywgaWYgYXBwbGljYWJsZS5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRCZWZvcmVMaW5rcyhjdXJyZW50OiBudW1iZXIpOiBQYWdpbmF0aW9uSXRlbVtdIHtcbiAgICBjb25zdCBsaXN0ID0gW107XG5cbiAgICBpZiAodGhpcy5jb25maWcuYWRkU3RhcnQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogdGhpcy5jb25maWcuc3RhcnRMYWJlbCxcbiAgICAgICAgICAgIHR5cGU6IFBhZ2luYXRpb25JdGVtVHlwZS5TVEFSVCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN1cnJlbnQgPiAwID8geyBudW1iZXI6IDAgfSA6IG51bGxcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgICBsaXN0LnB1c2goc3RhcnQoKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5hZGRQcmV2aW91cykge1xuICAgICAgY29uc3QgcHJldmlvdXMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmNvbmZpZy5wcmV2aW91c0xhYmVsLFxuICAgICAgICAgICAgdHlwZTogUGFnaW5hdGlvbkl0ZW1UeXBlLlBSRVZJT1VTLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3VycmVudCA+IDAgPyB7IG51bWJlcjogY3VycmVudCAtIDEgfSA6IG51bGxcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgICBsaXN0LnB1c2gocHJldmlvdXMoKSk7XG4gICAgfVxuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5leHQgYW5kIGVuZCBsaW5rcywgaWYgYXBwbGljYWJsZS5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRBZnRlckxpbmtzKFxuICAgIHBhZ2VDb3VudDogbnVtYmVyLFxuICAgIGN1cnJlbnQ6IG51bWJlclxuICApOiBQYWdpbmF0aW9uSXRlbVtdIHtcbiAgICBjb25zdCBsaXN0ID0gW107XG5cbiAgICBpZiAodGhpcy5jb25maWcuYWRkTmV4dCkge1xuICAgICAgY29uc3QgbmV4dCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6IHRoaXMuY29uZmlnLm5leHRMYWJlbCxcbiAgICAgICAgICAgIHR5cGU6IFBhZ2luYXRpb25JdGVtVHlwZS5ORVhULFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3VycmVudCA8IHBhZ2VDb3VudCAtIDEgPyB7IG51bWJlcjogY3VycmVudCArIDEgfSA6IG51bGxcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgICBsaXN0LnB1c2gobmV4dCgpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLmFkZEVuZCkge1xuICAgICAgY29uc3QgZW5kID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogdGhpcy5jb25maWcuZW5kTGFiZWwsXG4gICAgICAgICAgICB0eXBlOiBQYWdpbmF0aW9uSXRlbVR5cGUuRU5ELFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3VycmVudCA8IHBhZ2VDb3VudCAtIDEgPyB7IG51bWJlcjogcGFnZUNvdW50IC0gMSB9IDogbnVsbFxuICAgICAgICApO1xuICAgICAgfTtcbiAgICAgIGxpc3QucHVzaChlbmQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSBmaXJzdCBwYWdlIG9mIHRoZSByYW5nZSB3ZSBuZWVkIHRvIGJ1aWxkLlxuICAgKiBUaGlzIGlzIHRoZSBwYWdlIHRoYXQgaXMgbGVhZGluZyB1cCB0byB0aGUgcmFuZ2Ugb2YgdGhlXG4gICAqIGN1cnJlbnQgcGFnZS5cbiAgICpcbiAgICogQHBhcmFtIHBhZ2VDb3VudCBUaGUgdG90YWwgbnVtYmVyIG9mIHBhZ2VzLlxuICAgKiBAcGFyYW0gY3VycmVudCBUaGUgY3VycmVudCBwYWdlIG51bWJlciwgMC1pbmRleCBiYXNlZC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRTdGFydE9mUmFuZ2UocGFnZUNvdW50OiBudW1iZXIsIGN1cnJlbnQ6IG51bWJlcik6IG51bWJlciB8IG51bGwge1xuICAgIGlmICh0aGlzLmNvbmZpZy5yYW5nZUNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jb25maWcucmFuZ2VDb3VudCAtIDE7XG4gICAgICAvLyB0aGUgbGVhc3QgbnVtYmVyIG9mIHBhZ2VzIGJlZm9yZSBhbmQgYWZ0ZXIgdGhlIGN1cnJlbnRcbiAgICAgIGNvbnN0IGRlbHRhID0gTWF0aC5yb3VuZChjb3VudCAvIDIpO1xuXG4gICAgICAvLyBlbnN1cmUgdGhhdCB3ZSBzdGFydCB3aXRoIGF0IGxlYXN0IHRoZSBmaXJzdCBwYWdlXG4gICAgICBjb25zdCBtaW5TdGFydCA9IE1hdGgubWF4KDAsIGN1cnJlbnQgLSBkZWx0YSk7XG4gICAgICAvLyBlbnN1cmVzIHRoYXQgd2Ugc3RhcnQgd2l0aCBhdCBsZWFzdCAxIGFuZCBkbyBub3QgcGFzcyB0aGUgbGFzdCByYW5nZVxuICAgICAgY29uc3QgbWF4U3RhcnQgPSBNYXRoLm1heCgwLCBwYWdlQ291bnQgLSBjb3VudCAtIDEpO1xuXG4gICAgICAvLyBlbnN1cmUgdGhhdCB3ZSBnZXQgYXQgbGVhc3QgYSBmdWxsIHJhbmdlIGF0IHRoZSBlbmRcbiAgICAgIHJldHVybiBNYXRoLm1pbihtYXhTdGFydCwgbWluU3RhcnQpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYWdpbmF0aW9uIGNvbmZpZ3VyYXRpb24uIFRoZSBjb25maWd1cmF0aW9uIGlzIGRyaXZlbiBieSB0aGVcbiAgICogKGRlZmF1bHQpIGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24uXG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IGFwcGxpY2F0aW9uIGlzIGxpbWl0ZWQgdG8gYWRkaW5nIHRoZSBzdGFydCBhbmQgZW5kIGxpbms6XG4gICAqIGBgYHRzXG4gICAqICAgYWRkU3RhcnQ6IHRydWUsXG4gICAqICAgYWRkRW5kOiB0cnVlXG4gICAqIGBgYFxuICAgKlxuICAgKiBUaGUgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBpcyBob3dldmVyIG1lcmdlZCBpbnRvIHRoZSBmb2xsb3dpbmcgc3RhdGljIGNvbmZpZ3VyYXRpb246XG4gICAqIGBgYHRzXG4gICAqIHtcbiAgICogICByYW5nZUNvdW50OiAzLFxuICAgKiAgIGRvdHNMYWJlbDogJy4uLicsXG4gICAqICAgc3RhcnRMYWJlbDogJ8KrJyxcbiAgICogICBwcmV2aW91c0xhYmVsOiAn4oC5JyxcbiAgICogICBuZXh0TGFiZWw6ICfigLonLFxuICAgKiAgIGVuZExhYmVsOiAnwrsnXG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IGNvbmZpZygpOiBQYWdpbmF0aW9uT3B0aW9ucyB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICBGQUxMQkFDS19QQUdJTkFUSU9OX09QVElPTlMsXG4gICAgICB0aGlzLnBhZ2luYXRpb25Db25maWcucGFnaW5hdGlvblxuICAgICk7XG4gIH1cbn1cbiJdfQ==