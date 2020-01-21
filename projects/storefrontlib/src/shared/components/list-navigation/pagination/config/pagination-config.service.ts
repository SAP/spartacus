import { Injectable } from '@angular/core';
import { PaginationConfig, PaginationOptions } from './pagination.config';

const DEFAULT_PAGINATION_OPTIONS: PaginationConfig = {
  rangeCount: 3,

  addFirst: true,
  addLast: true,

  addPrevious: true,
  addNext: true,

  addDots: true,
  omitDotsForSinglePage: true,

  addStart: true,
  addEnd: true,
};

/**
 * Utitilty class to provide easy access to the `PaginationOptions`. Most of these
 * options are boolean values, which are proxied in this class.
 */
@Injectable({
  providedIn: 'root',
})
export class PaginationConfigService {
  constructor(protected configOptions: PaginationOptions) {}

  get config(): PaginationConfig {
    return this.configOptions.pagination || {};
  }
  get rangeCount() {
    return this.config.rangeCount || DEFAULT_PAGINATION_OPTIONS.rangeCount;
  }

  get addDots(): boolean {
    return this.config.hasOwnProperty('addDots')
      ? this.config.addDots
      : DEFAULT_PAGINATION_OPTIONS.addDots;
  }

  get omitDotsForPage() {
    return this.config.hasOwnProperty('omitDotsForSinglePage')
      ? this.config.omitDotsForSinglePage
      : DEFAULT_PAGINATION_OPTIONS.omitDotsForSinglePage;
  }

  get addPrevious() {
    return this.config.hasOwnProperty('addPrevious')
      ? this.config.addPrevious
      : DEFAULT_PAGINATION_OPTIONS.addPrevious;
  }

  get addNext() {
    return this.config.hasOwnProperty('addNext')
      ? this.config.addNext
      : DEFAULT_PAGINATION_OPTIONS.addNext;
  }

  get addFirst() {
    return this.config.hasOwnProperty('addFirst')
      ? this.config.addFirst
      : DEFAULT_PAGINATION_OPTIONS.addFirst;
  }

  get addLast() {
    return this.config.hasOwnProperty('addLast')
      ? this.config.addLast
      : DEFAULT_PAGINATION_OPTIONS.addLast;
  }

  get addStart() {
    return this.config.hasOwnProperty('addStart')
      ? this.config.addStart
      : DEFAULT_PAGINATION_OPTIONS.addStart;
  }

  get addEnd() {
    return this.config.hasOwnProperty('addEnd')
      ? this.config.addEnd
      : DEFAULT_PAGINATION_OPTIONS.addEnd;
  }
}
