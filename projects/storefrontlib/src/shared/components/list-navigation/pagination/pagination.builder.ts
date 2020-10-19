import { Injectable } from '@angular/core';
import { PaginationConfig } from './config/pagination.config';
import {
  PaginationItem,
  PaginationItemType,
  PaginationNavigationPosition,
  PaginationOptions,
} from './pagination.model';

const FALLBACK_PAGINATION_OPTIONS: PaginationOptions = {
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
@Injectable({
  providedIn: 'root',
})
export class PaginationBuilder {
  constructor(protected paginationConfig: PaginationConfig) {}

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
  paginate(pageCount: number, current: number): PaginationItem[] {
    const pages: PaginationItem[] = [];
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
  protected addPages(
    pages: PaginationItem[],
    pageCount: number,
    current: number
  ): void {
    const start = this.getStartOfRange(pageCount, current);
    const max = Math.min(this.config.rangeCount, pageCount);
    Array.from(Array(max)).forEach((_, i) => {
      pages.push({
        number: i + start,
        label: String(i + start + 1),
        type: PaginationItemType.PAGE,
      });
    });
  }

  /**
   * Adds dots before and after the given pages, if configured (defaults to true).
   * If the dots only represent a single page, the page number is added instead of
   * the dots, unless the configuration requires dots always.
   *
   * @param pages The list of page items that is used to amend
   * @param pageCount The total number of pages
   */
  protected addDots(pages: PaginationItem[], pageCount: number): void {
    if (!this.config.addDots) {
      return;
    }

    const addFirstGap = () => {
      const firstItemNumber = pages[0].number;
      const gapNumber = this.config.addFirst ? 1 : 0;
      if (firstItemNumber > gapNumber) {
        const isGap =
          !this.config.substituteDotsForSingularPage ||
          firstItemNumber !== gapNumber + 1;
        const isSubstituted =
          this.config.addFirst &&
          this.config.substituteDotsForSingularPage &&
          gapNumber === 0;
        const type = isGap
          ? PaginationItemType.GAP
          : isSubstituted
          ? PaginationItemType.FIRST
          : PaginationItemType.PAGE;
        return [
          Object.assign(
            {
              label: isGap ? this.config.dotsLabel : String(gapNumber + 1),
              type,
            },
            isGap ? null : { number: gapNumber }
          ),
        ];
      } else return [];
    };

    const addLastGap = () => {
      const nextPageNumber = pages[pages.length - 1].number + 1;
      const last = pageCount - (this.config.addLast ? 2 : 1);
      if (nextPageNumber <= last) {
        const isSubstituted =
          this.config.addLast &&
          this.config.substituteDotsForSingularPage &&
          nextPageNumber === last;
        const isGap =
          nextPageNumber <
          pageCount -
            (this.config.substituteDotsForSingularPage ? 1 : 0) -
            (this.config.addLast ? 1 : 0);

        const type = isGap
          ? PaginationItemType.GAP
          : isSubstituted
          ? PaginationItemType.LAST
          : PaginationItemType.PAGE;
        return [
          Object.assign(
            {
              label: isGap ? this.config.dotsLabel : String(nextPageNumber + 1),
              type,
            },
            isGap ? null : { number: nextPageNumber }
          ),
        ];
      } else return [];
    };

    pages.unshift(...addFirstGap());
    pages.push(...addLastGap());
  }

  /**
   * Add links to the first and last page, if configured to do so.
   *
   * @param pages The list of page items that is used to amend
   * @param pageCount The total number of pages
   *
   */
  protected addFirstLast(pages: PaginationItem[], pageCount: number) {
    if (this.config.addFirst && pages[0].number !== 0) {
      pages.unshift({
        number: 0,
        label: '1',
        type: PaginationItemType.FIRST,
      });
    }
    if (
      this.config.addLast &&
      pages[pages.length - 1].number !== pageCount - 1
    ) {
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
   * - BEFORE – all navigation links are added in the front of the pagination list
   * - AFTER – all navigation links are pushed to the end of the pagination list
   *
   * @param pages The list of page items that is used to amend
   * @param pageCount The total number of pages
   * @param current The current page number, 0-index based
   *
   */
  protected addNavigation(
    pages: PaginationItem[],
    pageCount: number,
    current: number
  ): void {
    const before = this.getBeforeLinks(current);
    const after = this.getAfterLinks(pageCount, current);
    const pos = this.config.navigationPosition;
    if (!pos || pos === PaginationNavigationPosition.ASIDE) {
      pages.unshift(...before);
      pages.push(...after);
    } else {
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
  protected getBeforeLinks(current: number): PaginationItem[] {
    const list = [];

    if (this.config.addStart) {
      const start = () => {
        return Object.assign(
          {
            label: this.config.startLabel,
            type: PaginationItemType.START,
          },
          current > 0 ? { number: 0 } : null
        );
      };
      list.push(start());
    }
    if (this.config.addPrevious) {
      const previous = () => {
        return Object.assign(
          {
            label: this.config.previousLabel,
            type: PaginationItemType.PREVIOUS,
          },
          current > 0 ? { number: current - 1 } : null
        );
      };
      list.push(previous());
    }
    return list;
  }

  /**
   * Returns the next and end links, if applicable.
   */
  protected getAfterLinks(
    pageCount: number,
    current: number
  ): PaginationItem[] {
    const list = [];

    if (this.config.addNext) {
      const next = () => {
        return Object.assign(
          {
            label: this.config.nextLabel,
            type: PaginationItemType.NEXT,
          },
          current < pageCount - 1 ? { number: current + 1 } : null
        );
      };
      list.push(next());
    }
    if (this.config.addEnd) {
      const end = () => {
        return Object.assign(
          {
            label: this.config.endLabel,
            type: PaginationItemType.END,
          },
          current < pageCount - 1 ? { number: pageCount - 1 } : null
        );
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
  protected getStartOfRange(pageCount: number, current: number): number {
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
  protected get config(): PaginationOptions {
    return Object.assign(
      FALLBACK_PAGINATION_OPTIONS,
      this.paginationConfig.pagination
    );
  }
}
