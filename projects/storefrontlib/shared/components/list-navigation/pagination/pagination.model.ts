/**
 * Represents a page item for a pagination system. This is used
 * to store the model of each page.
 */
export interface PaginationItem {
  label?: string;
  type?: PaginationItemType;
  /** The number is used when the type is {@link PaginationItemType.PAGE} */
  number?: number;
}

/**
 * The item type is used to add semantic structure to the
 * PaginationItem, so that the UI understands the usage.
 */
export enum PaginationItemType {
  GAP = 'gap',
  FIRST = 'first',
  LAST = 'last',
  PREVIOUS = 'previous',
  NEXT = 'next',
  START = 'start',
  END = 'end',
  PAGE = 'page',
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

  /** Adds a link to skip to the start of the pages, defaults to false. */
  addStart?: boolean;
  /** A link to skip to the end of the pages, defaults to false. */
  addEnd?: boolean;
  /** A link to the previous page, defaults to false. */
  addPrevious?: boolean;
  /** A link to the previous page, defaults to false. */
  addNext?: boolean;

  navigationPosition?: PaginationNavigationPosition;

  /** A link to the first page can be added in case it is not included already, defaults to false. */
  addFirst?: boolean;
  /** A link to the last page can be added in case it is not included already, defaults to false. */
  addLast?: boolean;

  /**
   * Adds a gap before and after the pages. to visualize hidden pages. Defaults to false.
   *
   * `1 ...  4 (5) 6 ... 18`
   *
   * Defaults to false.
   */
  addDots?: boolean;

  /**
   * If the page dots only represents a single page, we rather add the page
   * as this would take the same amount of space. Some UX might want to use
   * the dots for consistency reasons, which why this option is configurable.
   *
   * This typically happens on the 4th page (in case the range is 3):
   * Instead of having:
   *
   *  `1 ...  3 (4) 5`
   *
   * we'd have
   *
   * `1 2 3 (4) 5`.
   *
   * Defaults to false.
   */
  substituteDotsForSingularPage?: boolean;

  /** Custom label for the start link, defaults to `«`. */
  startLabel?: string;
  /** Custom label for the previous link, defaults to `‹`. */
  previousLabel?: string;
  /** Custom label for the next link, defaults to `›`. */
  nextLabel?: string;
  /** Custom label for the end link, defaults to `»`. */
  endLabel?: string;
  /** Custom label for the dots, defaults to `...`. */
  dotsLabel?: string;
}

export enum PaginationNavigationPosition {
  ASIDE = 'aside',
  BEFORE = 'before',
  AFTER = 'after',
}
