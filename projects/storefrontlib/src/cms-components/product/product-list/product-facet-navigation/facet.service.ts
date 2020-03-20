import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facet } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
export interface FacetCollapseState {
  expanded?: boolean;
  collapseTopValues?: boolean;
  focussed?: boolean;
  top?: number;
  visible?: number;
}

/**
 * Provides the user driven UI state for facets:
 * - expanded groups
 * - focussed groups
 * - expanded values
 * - focussed values
 */
@Injectable({
  providedIn: 'root',
})
export class FacetService {
  protected COLLAPSE_TOP_VALUES_BY_DEFAULT = true;

  protected queryCodec: HttpUrlEncodingCodec = new HttpUrlEncodingCodec();

  facetState = new Map<string, BehaviorSubject<FacetCollapseState>>();

  // focussed;

  // readonly facets$: Observable<Facet[]> = this.productFacetService.facets$;
  // readonly breadcrumbs$: Observable<any> = this.productFacetService
  //   .breadcrumbs$;

  // constructor(private productFacetService: ProductFacetService) {}

  // toggleValue(searchState: SearchState) {
  //   this.productFacetService.setQuery(searchState.query.value);
  // }

  getState(
    facet: Facet,
    initializeUiState = false
  ): BehaviorSubject<FacetCollapseState> {
    if (initializeUiState) {
      this.initialize(facet);
    }
    if (!this.facetState.get(facet.name)) {
      this.facetState.set(
        facet.name,
        new BehaviorSubject({
          expanded: facet.expanded,
          collapseTopValues: this.COLLAPSE_TOP_VALUES_BY_DEFAULT,
        } as FacetCollapseState)
      );
    }
    return this.facetState.get(facet.name);
  }

  toggleGroup(facet: Facet, isFocussed?: boolean) {
    const state = this.getState(facet).value;
    if (isFocussed !== undefined) {
      state.expanded = isFocussed;
    } else {
      state.expanded = !state.expanded;
    }
    if (!state.visible) {
      state.visible = state.top;
    }
    this.getState(facet).next(state);
  }

  increaseVisible(facet: Facet) {
    const state = this.getState(facet).value;
    state.visible =
      state.visible + 5 >= facet.values.length
        ? facet.values.length
        : state.visible + 5;
    this.getState(facet).next(state);
  }

  decreaseVisible(facet: Facet) {
    const state = this.getState(facet).value;
    state.visible =
      state.visible - 5 > state.top ? state.visible - 5 : state.top;
    this.getState(facet).next(state);
  }

  getLinkParams(query: string) {
    return { query: this.queryCodec.decodeValue(query) };
  }

  protected initialize(facet: Facet) {
    const state = this.getState(facet);
    const stateValue = state.value;
    stateValue.top = facet.topValueCount;

    if (!stateValue.visible) {
      stateValue.visible = stateValue.expanded ? stateValue.top : 0;
    }
    state.next(stateValue);
  }
}
