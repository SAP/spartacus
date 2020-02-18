import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facet, SearchState } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { ProductListComponentService } from '../container/product-list-component.service';
export interface FacetCollapseState {
  collapseGroup?: boolean;
  collapseTopValues?: boolean;

  top?: number;
  visible?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FacetService {
  protected COLLAPSE_GROUP_BY_DEFAULT = false;
  protected COLLAPSE_TOP_VALUES_BY_DEFAULT = true;

  protected queryCodec: HttpUrlEncodingCodec = new HttpUrlEncodingCodec();

  facetState = new Map<string, BehaviorSubject<FacetCollapseState>>();

  constructor(
    protected productListComponentService: ProductListComponentService
  ) {}

  toggleValue(searchState: SearchState) {
    this.productListComponentService.setQuery(searchState.query.value);
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
          collapseGroup: this.COLLAPSE_GROUP_BY_DEFAULT,
          collapseTopValues: this.COLLAPSE_TOP_VALUES_BY_DEFAULT,
        })
      );
    }
    return this.facetState.get(facet.name);
  }

  toggleGroup(facet: Facet) {
    const state = this.getState(facet).value;
    state.collapseGroup = !state.collapseGroup;

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
    stateValue.visible = 0;
    state.next(stateValue);
  }
}
