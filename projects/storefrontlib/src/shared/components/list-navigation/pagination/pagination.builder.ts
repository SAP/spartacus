import { Injectable } from '@angular/core';
import { PaginationConfigService } from './config/pagination-config.service';
import { PaginationItem } from './pagination.model';

@Injectable({
  providedIn: 'root',
})
export class PaginationBuilder {
  constructor(protected config: PaginationConfigService) {}

  /**
   * Builds a list of `PaginationItem`, based on teh current page number, and
   * pagination options.
   *
   * @param pageCount the total number of pages
   * @param current the current page number
   */
  paginate(pageCount: number, current: number): PaginationItem[] {
    if (pageCount < 2) {
      return [];
    }

    const pages = this.buildRange(pageCount, current);
    this.addDots(pageCount, pages);
    this.addFirstLast(pageCount, pages);

    return pages;
  }

  /**
   * Returns the current page with surrounding pages (based on the `config.rangeCount`).
   * The current page is always centered to provide direct access to the previous and next page.
   *
   * @param current The current page is always centered in the range
   */
  buildRange(pageCount: number, current: number): PaginationItem[] {
    const pages: PaginationItem[] = [];

    const start = this.getStartOfRange(pageCount, current);
    const max = Math.min(this.config.rangeCount, pageCount);

    Array.from(Array(max)).forEach((_, i) => {
      pages.push({
        number: i + start,
        isPrimary: true,
        isCurrent: i + start === current,
      });
    });

    return pages;
  }

  /**
   * Adds dots before and after the page range, if configured (defaults to true).
   * If the dots only represent a single page, the page number is added instead of
   * the dots, unless the configuration requires dots always.
   *
   * @param start The first page of the page range.
   */
  private addDots(pageCount: number, pages: PaginationItem[]): void {
    if (!this.config.addDots) {
      return;
    }

    // before
    const start = pages[0].number;
    const firstOccurrence = this.config.addFirst ? 2 : 1;
    if (start > firstOccurrence) {
      pages.unshift({
        number: firstOccurrence,
        isGap: !(start === 1 + firstOccurrence && this.config.omitDotsForPage),
      });
    }

    // after
    const last = pages[pages.length - 1].number;
    const gapSizeEnd = this.config.addLast ? 1 : 0;
    if (last < pageCount) {
      pages.push({
        number: last + 1,
        isGap:
          pageCount - last > gapSizeEnd + (this.config.omitDotsForPage ? 1 : 0),
      });
    }

    return;
  }

  private addFirstLast(pageCount: number, pages: PaginationItem[]): void {
    if (this.config.addFirst && pages[0].number !== 1) {
      pages.unshift({
        number: 1,
      });
    }

    if (this.config.addLast && pages[pages.length - 1].number !== pageCount) {
      pages.push({
        number: pageCount,
      });
    }
  }

  /**
   * Resolves the first page of the range we need to build.
   * This is the page that is leading up to the range of the
   * current page.
   */
  private getStartOfRange(pageCount: number, current: number): number {
    // the least number of pages before and after the current
    const delta = Math.round((this.config.rangeCount - 1) / 2);

    // ensure that we start with at least the first page
    const minStart = Math.max(1, current - delta);
    // ensures that we start with at least 1 and do not pass the last range
    const maxStart = Math.max(1, pageCount - (this.config.rangeCount - 1));

    // ensure that we get at least a full range at the end
    return Math.min(maxStart, minStart);
  }
}
