import { Injectable } from '@angular/core';
import { PaginationItem } from './pagination.model';

@Injectable({
  providedIn: 'root',
})
export class PaginationBuilder {
  // the min range of numbers we generate
  protected range = 3;

  /**
   * builds a range of pages with potentially
   */
  paginate(current: number, total: number): PaginationItem[] {
    // return empty array if there's nothing to paginate
    if (total === 1) {
      return [];
    }

    const pages: PaginationItem[] = [];

    const start = this.getStartOfRange(current, total);

    const maxRange = Math.min(this.range, total);
    for (let i = start; i <= start + maxRange - 1; i++) {
      pages.push({
        number: i,
        isPrimary: true,
      });
    }

    this.insertStartItems(pages, start);
    this.insertEndItems(pages, total);

    return pages.map(page =>
      Object.assign(page, { isCurrent: page.number === current })
    );
  }

  /**
   * Resolves the first page of the range we need to build.
   * This is the page that is leading up to the range of the
   * current page.
   */
  private getStartOfRange(current: number, total: number): number {
    // the least number of pages before and after the current
    const delta = Math.round((this.range - 1) / 2);

    // ensure that we start with at least the first page
    const minStart = Math.max(1, current - delta);
    // ensures that we start with at least 1 and do not pass the last range
    const maxStart = Math.max(1, total - (this.range - 1));

    // ensure that we get at least a full range at the end
    return Math.min(maxStart, minStart);
  }

  /**
   * Inserts a few elements at the start of the pagination
   * - the first page always
   * - the 2nd page if we only skipped the 2nd page
   * - a gap (dots) in case we skipped numureous pages
   */
  private insertStartItems(pages: PaginationItem[], start: number): void {
    // add a gap if more than 1 number is skipped
    if (start > this.range) {
      pages.unshift({
        isGap: true,
      });
    }

    // add 2nd page if we start with 3, as it doesn't make any sense
    // to add dots for a single position
    if (this.isPage(pages[0], this.range)) {
      pages.unshift({
        number: 2,
      });
    }

    // always add the first if we haven't done so far
    if (pages[0].number !== 1) {
      pages.unshift({
        number: 1,
        isFirst: true,
      });
    }
  }

  /**
   * Inserts a few items at the end of the pagination:
   * - insert the last page
   * - a gap in case there are more than 1 page being skipped
   * - filling in the 2nd last page number in case only a single page skipped
   */
  private insertEndItems(pages: PaginationItem[], pageLength: number): void {
    // add dots if we only lack 1 number
    if (this.isPage(pages[pages.length - 1], pageLength - 2)) {
      pages.push({
        number: pageLength - 1,
      });
    }
    if (pages[pages.length - 1].number < pageLength - 2) {
      // if (start + this.range - 1 < total - 1) {
      pages.push({
        isGap: true,
      });
    }

    if (pages[pages.length - 1].number !== pageLength) {
      pages.push({
        number: pageLength,
        isLast: true,
      });
    }
  }

  private isPage(page: PaginationItem, pageNumber: number) {
    return !page.isGap && page.number === pageNumber;
  }
}
