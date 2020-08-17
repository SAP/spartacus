import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facet } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  FacetCollapseState,
  FacetGroupCollapsedState,
  FacetList,
} from '../facet.model';
import { ProductFacetService } from './product-facet.service';

/**
 * Provides access to the facets as well as their UI state. The UI state
 * represents user related changes on the facets, such as expanding or
 * collapsing a facet group or expanding the number of _visible_ facet values.
 */
@Injectable({
  providedIn: 'root',
})
export class FacetService {
  /**
   * An internal map where we keep the UI state of the facets.
   */
  protected facetState = new Map<string, BehaviorSubject<FacetCollapseState>>();

  constructor(protected productFacetService: ProductFacetService) {}

  /**
   * Observes the facets for the given page and configures the initial UI state.
   *
   * Facets are configured on each emission so that we keep the facet UI state.
   * This is mainly done to keep the state during usage of the facet, but also
   * benefitial when the facets are rebuild while using them.
   */
  facetList$: Observable<FacetList> = this.productFacetService.facetList$.pipe(
    tap((facetList) => {
      facetList.facets.forEach((facet) => this.initialize(facet));
    })
  );

  /**
   * Returns the observed UI state for the facet.
   *
   * The state is initialized using the `initialize` method.
   */
  getState(facet: Facet): Observable<FacetCollapseState> {
    this.initialize(facet);
    return this.facetState.get(facet.name);
  }

  /**
   * Returns the UI state for the facet.
   *
   * The state is initialized using the `initialize` method.
   */
  protected getStateSnapshot(facet: Facet): FacetCollapseState {
    return (this.getState(facet) as BehaviorSubject<FacetCollapseState>).value;
  }

  /**
   * Toggles the facet expanded state. If the expanded state becomes false,
   * the visible values will decrease to the top values only.
   *
   * If the optional value argument is provided the expanded state will be set
   * to this value, regardless of the current `expanded` state.
   */
  toggle(facet: Facet, isExpanded: boolean): void {
    const state = this.getStateSnapshot(facet);

    const toggledState = {
      toggled: isExpanded
        ? FacetGroupCollapsedState.COLLAPSED
        : FacetGroupCollapsedState.EXPANDED,
    } as FacetCollapseState;

    if (toggledState.toggled === FacetGroupCollapsedState.COLLAPSED) {
      toggledState.maxVisible = state.topVisible;
    }

    this.updateState(facet, toggledState);
  }

  /**
   * Increases the visible values to the maximum values of the facet.
   */
  increaseVisibleValues(facet: Facet): void {
    this.updateState(facet, { maxVisible: facet.values.length });
  }

  /**
   * Decreases the visible values to the topValueCount.
   *
   * The topValueCount defaults to 6, but can be controlled in
   * the backend as well.
   */
  decreaseVisibleValues(facet: Facet): void {
    this.updateState(facet, { maxVisible: facet.topValueCount });
  }

  /**
   * Persists the facet state and initializes the default values for the top
   * and max visible values.
   */
  protected initialize(facet: Facet): void {
    const topFacets =
      facet.topValueCount > 0 ? facet.topValueCount : facet.values?.length || 0;
    if (!this.hasState(facet)) {
      this.facetState.set(
        facet.name,
        new BehaviorSubject({
          topVisible: topFacets,
          maxVisible: topFacets,
        } as FacetCollapseState)
      );
    }
  }

  /**
   * Updates the state of the facet in the local facet map.
   */
  protected updateState(facet: Facet, property: FacetCollapseState): void {
    const state = { ...this.getStateSnapshot(facet), ...property };
    this.facetState.get(facet.name).next(state);
  }

  protected hasState(facet: Facet): boolean {
    return this.facetState.has(facet.name);
  }

  getLinkParams(query: string): { [key: string]: string } {
    return {
      // to avoid encoding issues with facets that have space (' ') in their name,
      // we replace the decoded '+' back to empty space ' '.
      // For more, see https://github.com/SAP/spartacus/issues/7348
      query: new HttpUrlEncodingCodec().decodeValue(query).replace(/\+/g, ' '),
    };
  }
}
