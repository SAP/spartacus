import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facet } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FacetCollapseState, FacetList } from '../facet.model';
import { ProductFacetService } from './product-facet.service';

/**
 * Provides access to the facets as well as UI state for the facets.
 */
@Injectable({
  providedIn: 'root',
})
export class FacetService {
  /**
   * An internal map where we keep the UI state of the facets.
   */
  protected facetState = new Map<string, BehaviorSubject<FacetCollapseState>>();

  // will likely be dropped once we move to cxRoute
  protected queryCodec: HttpUrlEncodingCodec = new HttpUrlEncodingCodec();

  constructor(protected productFacetService: ProductFacetService) {}

  facetList$: Observable<FacetList> = this.productFacetService.facetList$.pipe(
    tap((facetList) => {
      // facets are configured on each emission so that we keep the facet UI state
      // this is mainly done to keep the state during usage of the facet, but also
      // benefitial to keep the state when the facets are rebuild while using them.
      facetList.facets.forEach((facet) => this.configureFacet(facet));
    })
  );

  /**
   * Returns the UI state for the facet.
   *
   * The state is initialized using the `initialize` method.
   */
  protected getStateSnapshot(facet: Facet): FacetCollapseState {
    this.initialize(facet);
    return this.facetState.get(facet.name).value;
  }

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
   * Toggles the facet expanded state. If the expanded state becomes false,
   * the visible values will decrease to the top values only.
   *
   * If the optional value argument is provided the expanded state will be set
   * to this value, regardless of the current `expanded` state.
   */
  toggleExpand(facet: Facet, value?: boolean) {
    const state = this.getStateSnapshot(facet);

    const toggledState = {
      toggled: value ?? !state.toggled,
    } as FacetCollapseState;

    if (!state.maxVisible) {
      toggledState.maxVisible = state.maxVisible = state.topVisible;
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
   * Configures the intial state of the facets.
   *
   * We only initialize the facet configuration once, and let the user
   * behaviour drive the future state of the facet.
   */
  protected configureFacet(facet: Facet) {
    if (!this.hasState(facet)) {
      this.initialize(facet, true);
    }

    // we do update the default expand state each time the facet is configured
    this.updateState(facet, {
      toggled: this.getStateSnapshot(facet).toggled,
    } as FacetCollapseState);
  }

  protected initialize(facet: Facet, forceInitialize: boolean = false) {
    if (!this.hasState(facet)) {
      this.facetState.set(
        facet.name,
        new BehaviorSubject({
          topVisible: facet.topValueCount,
          maxVisible: facet.topValueCount,
        })
      );
    } else if (forceInitialize) {
      this.updateState(facet, {
        topVisible: facet.topValueCount,
        maxVisible: facet.topValueCount,
      } as FacetCollapseState);
    }
  }

  /**
   *
   * Updates the state of the facet in the local facet map.
   */
  protected updateState(facet: Facet, property: FacetCollapseState) {
    const state = { ...this.getStateSnapshot(facet), ...property };
    this.facetState.get(facet.name).next(state);
  }

  protected hasState(facet: Facet): boolean {
    return this.facetState.has(facet.name);
  }

  getLinkParams(query: string) {
    return { query: this.queryCodec.decodeValue(query) };
  }
}
