import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationBuilder {
  // the min range of numbers we generate
  private range = 3;

  // the least number of pages before and after the current
  private delta = Math.round((this.range - 1) / 2);

  /**
   * builds a range of pages with potentially
   */
  paginate(current: number, total: number): number[] {
    // return empty array if there's nothing to paginate
    if (total === 1) {
      return [];
    }

    const pages: number[] = [];

    const start = this.getStartOfRange(current, total);

    const maxRange = Math.min(this.range, total);
    for (let i = start; i <= start + maxRange - 1; i++) {
      pages.push(i);
    }

    this.buildStart(pages, start);
    this.buildEnd(pages, total);

    return pages;
  }

  /**
   * Resolves the first page of the range we need to build.
   * This is the page that is leading up to the range of the
   * current page.
   */
  private getStartOfRange(current: number, total: number): number {
    // ensure that we start with at least the first page
    const minStart = Math.max(1, current - this.delta);
    // ensures that we start with at least 1 and do not pass the last range
    const maxStart = Math.max(1, total - (this.range - 1));

    // ensure that we get at least a full range at the end
    return Math.min(maxStart, minStart);
  }

  private buildStart(pages: number[], start: number): void {
    // add dots if we've skipped more the 1 number
    if (start > 3) {
      pages.unshift(-1);
    }

    // add 2nd page if we start with 3, as it doesn't make any sense
    // to add dots for a single position
    if (pages[0] === 3) {
      pages.unshift(2);
    }

    // always add the first if we haven't done so far
    if (pages[0] !== 1) {
      pages.unshift(1);
    }
  }

  private buildEnd(pages: number[], total: number): void {
    // add dots if we only lack 1 number
    if (pages[pages.length - 1] === total - 2) {
      pages.push(total - 1);
    }
    if (pages[pages.length - 1] < total - 2) {
      // if (start + this.range - 1 < total - 1) {
      pages.push(-1);
    }

    if (pages[pages.length - 1] !== total) {
      pages.push(total);
    }
  }
}

//   paginate(currentPage, lastPage) {
//     const delta = 1;
//     const range = [];

//     for (
//       let i = Math.max(2, currentPage - delta);
//       i <= Math.min(lastPage - 1, currentPage + delta);
//       i += 1
//     ) {
//       range.push(i);
//     }

//     if (currentPage - delta > 2) {
//       range.unshift('...');
//     }

//     if (currentPage + delta < lastPage - 1) {
//       range.push('...');
//     }

//     range.unshift(1);

//     if (lastPage !== 1) range.push(lastPage);

//     console.log(range);
//     return range;
//   }
// }
