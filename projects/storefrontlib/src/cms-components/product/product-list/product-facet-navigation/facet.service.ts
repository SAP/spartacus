import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facet, FacetValue, SearchState } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductFacetService } from './product-facet.service';
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

  focussed;

  readonly facets$: Observable<Facet[]> = this.productFacetService.facets$;
  readonly breadcrumbs$: Observable<any> = this.productFacetService
    .breadcrumbs$;

  constructor(private productFacetService: ProductFacetService) {}

  toggleValue(searchState: SearchState) {
    this.productFacetService.setQuery(searchState.query.value);
  }

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
          // focussed:
          //   this.focussed &&
          //   this.focussed.facet &&
          //   this.focussed.facet.name === facet.name,
        } as FacetCollapseState)
      );
    }
    return this.facetState.get(facet.name);
  }

  toggleGroup(facet: Facet, isFocussed?: boolean) {
    const state = this.getState(facet).value;

    state.expanded = isFocussed || !state.expanded;

    this.focussed = { facet };
    state.focussed = true;

    // if (!state.collapseGroup) {
    //   state.visible = state.top;
    // } else {
    //   state.visible = 0;
    // }
    if (!state.visible) {
      state.visible = state.top;
    }
    this.getState(facet).next(state);
  }

  /**
   * Removes the focus from the current focussed facet
   */
  clearFocus(): void {
    if (this.focussed && this.focussed.facet) {
      const state = this.getState(this.focussed.facet).value;
      state.focussed = false;
      this.getState(this.focussed.facet).next(state);
      this.focussed = null;
    }
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

  storeFocus(facet: Facet, value: FacetValue) {
    console.log('store focus for', facet, value.name);
    this.focussed = { facet, value: value.name };
  }

  getLinkParams(query: string) {
    return { query: this.queryCodec.decodeValue(query) };
  }

  protected initialize(facet: Facet) {
    const state = this.getState(facet);
    const stateValue = state.value;
    stateValue.top = facet.topValueCount;
    stateValue.visible = 0;
    state.next(stateValue);
  }
}
