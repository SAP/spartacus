import { DeferLoadingStrategy } from '@spartacus/core';

export interface IntersectionOptions {
  deferLoading?: DeferLoadingStrategy;
  /**
   * The root margin effects when an element intersects, an increased
   * margin will faster intersects the element with the view port.
   */
  rootMargin?: string;
}
