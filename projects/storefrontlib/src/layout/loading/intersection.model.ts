import { DeferLoadingStrategy } from '@spartacus/core';

export interface IntersectionOptions {
  deferLoading?: DeferLoadingStrategy;
  /**
   * The root margin effects when an element intersects, an increased
   * margin will faster intersects the element with the view port.
   */
  rootMargin?: string;
  /**
   * Either a single number or an array of numbers which indicate at what percentage of the target's visibility
   * the observer's callback should be executed.
   */
  threshold?: number | number[];
}
