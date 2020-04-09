import { Breadcrumb, Facet } from '@spartacus/core';

/**
 * TODO: consider moving to a generic location
 */
export enum DialogMode {
  INLINE = 'INLINE',
  POP = 'POP',
}
/**
 * UI model that holds the full list of facet and active facets for
 * the product list.
 */
export interface FacetList {
  facets: Facet[];
  activeFacets?: Breadcrumb[];
}

export interface FacetCollapseState {
  /**
   * Indicates whether the facet is toggled to expand or collapse the facet values.
   * Whether the toggle results in an expanded or collapsed state, depends on the
   * experience, which is controlled in CSS.
   */
  toggled?: boolean;

  /**
   * The top number of facet values that will be visible.
   */
  topVisible?: number;

  /**
   * The max number of facet values which will be visible. This includes
   * the top visible number.
   */
  maxVisible?: number;
}
