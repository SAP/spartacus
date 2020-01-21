export abstract class PaginationConfig {
  pagination?: PaginationOptions;
}

export interface PaginationOptions {
  /**
   * The range of direct accessible pages in the pagination.
   *
   * `« 4 (5) 6 »`
   *
   * Defaults to 3.
   */
  rangeCount?: number;

  /**
   * Adds dots before and after the current page range.
   *
   * `1 ...  4 (5) 6 ... 18`
   *
   * Defaults to true.
   */
  addDots?: boolean;

  /**
   * If the page dots only represents a single page, we rather add the page
   * as this would take the same amount of space. Some UX might want to use
   * the dots for consistency reasons, which why this option is configurable.
   *
   * This typically happens on the 4th page (in case the range is 3):
   * Instead of having `1 ...  3 (4) 5`, we'd have `1 2 3 (4) 5`.
   *
   * Defaults to true.
   */
  omitDotsForSinglePage?: boolean;

  /**
   * Adds a button to go the first page.
   *
   * Defaults to true.
   */
  addStart?: boolean;

  /**
   * Adds a button to go the last page.
   *
   * Defaults to true.
   */
  addEnd?: boolean;

  /**
   * Adds a previous button in the UI to go the previous page.
   *
   * Defaults to true.
   */
  addPrevious?: boolean;

  /**
   * Adds a next button in the UI to go the next page.
   *
   * Defaults to true.
   */
  addNext?: boolean;

  /**
   * Add the first page always, to provide easy access to the start at any time.
   *
   * Defaults to true.
   */
  addFirst?: boolean;

  /**
   * Add the last page always, to provide easy access to the last page at any time.
   *
   * Defaults to true.
   */
  addLast?: boolean;
}
