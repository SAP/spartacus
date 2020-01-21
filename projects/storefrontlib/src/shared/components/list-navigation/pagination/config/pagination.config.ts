export abstract class PaginationOptions {
  pagination?: PaginationConfig;
}

export interface PaginationConfig {
  /**
   * The range of direct accessible pages in the pagination, default to 3.
   *
   * `« 4 (5) 6 »`
   */
  rangeCount?: number;

  /**
   * Adds a gap before the page range, the gap is typically rendered as
   * dots.
   *
   * `1 ...  4 (5) 6 ... 18`
   */
  addDots?: boolean;

  /**
   * If the gap only represents a single page, we rather add the page.
   * This typically happens on the 4th page (in case the range is 3):
   *
   * Instead of having `1 ...  3 (4) 5`, we'd have `1 2 3 (4) 5`.
   */
  omitDotsForSinglePage?: boolean;

  /** Adds a button to go the first page.*/
  addStart?: boolean;

  /** Adds a button to go the last page.*/
  addEnd?: boolean;

  /** Adds a previous button in the UI to go the previous page.*/
  addPrevious?: boolean;

  /** Adds a next button in the UI to go the next page.*/
  addNext?: boolean;

  /**
   * Add the first page always, to provide easy access to the start at any time.
   *
   * Defaults to false.
   */
  addFirst?: boolean;

  /**
   * Add the last page always, to provide easy access to the last page at any time.
   *
   * Defaults to false.
   */
  addLast?: boolean;
}
