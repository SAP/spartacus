import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facet } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogMode, FacetCollapseState, FacetList } from '../facet.model';
import { ProductFacetService } from './product-facet.service';

/**
 * Provides access to the facets as well as UI state for the facets.
 */
@Injectable({
  providedIn: 'root',
})
export class FacetService {
  /** The dialog mode is used to distinquish the experience for mobile vs desktop */
  protected dialogMode: DialogMode;

  /**
   * Indicates the last used dialogMode, to differentiate the (default) facet
   * configuration.
   */
  protected lastUsedDialogMode: DialogMode;

  /**
   * An internal map where we keep the UI state of the facets.
   */
  protected facetState = new Map<string, BehaviorSubject<FacetCollapseState>>();

  // will likely be dropped once we move to cxRoute
  protected queryCodec: HttpUrlEncodingCodec = new HttpUrlEncodingCodec();

  constructor(protected productFacetService: ProductFacetService) {}

  getFacetList(dialogMode: DialogMode): Observable<FacetList> {
    this.dialogMode = dialogMode;
    return this.productFacetService.getFacetList().pipe(
      tap(facetList => {
        facetList.facets.forEach((facet, position) => {
          this.configureFacet(facet, position);
        });
        this.lastUsedDialogMode = this.dialogMode;
      })
    );
  }

  /**
   * Returns the UI state for the facet. The state is initialized
   * using the `initialize` method.
   */
  getState(facet: Facet): BehaviorSubject<FacetCollapseState> {
    this.initialize(facet);
    return this.facetState.get(facet.name);
  }

  /**
   * Toggles the facet expanded state. If the expanded state becomes false,
   * the visible values will decrease to the top values only.
   */
  toggleExpand(facet: Facet, force?: boolean) {
    const state = this.getState(facet).value;

    const toggledState = {
      expanded: force ?? !state.expanded,
    } as FacetCollapseState;

    if (!state.maxVisible) {
      toggledState.maxVisible = state.maxVisible = state.topVisible;
    }

    this.updateState(facet, toggledState);
  }

  /**
   * Increases the visible values to the maximum values of the facet.
   */
  increaseVisible(facet: Facet): void {
    this.updateState(facet, { maxVisible: facet.values.length });
  }

  /**
   * Decreases the visible values to the topValueCount.
   *
   * The topValueCount defaults to 6, but can be controlled in
   * the backend as well.
   */
  decreaseVisible(facet: Facet): void {
    this.updateState(facet, { maxVisible: facet.topValueCount });
  }

  /**
   * Configures the intial state of the facets.
   *
   * We only initialize the facet configuration once, and let the user
   * behaviour drive the future state of the facet.
   */
  protected configureFacet(facet: Facet, position: number) {
    if (!this.hasState(facet) || this.dialogMode !== this.lastUsedDialogMode) {
      this.initialize(facet, true);
    }

    // we do update the default expand state each time the facet is configured
    this.updateState(facet, {
      expandBydefault: this.isInitialExpanded(facet, position),
    });
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
   * Returns a boolean value to indicate whether the facet should be expanded
   *  _initially_. After the intial expanded state, the user driven state
   * rules cross different product lists.
   *
   * The default expanded state is either driven by the data (`facet.expanded`)
   * or defaults to `true` or `false`, depending on the position and whether it's
   * shown in a (popped) dialog or not.
   */
  protected isInitialExpanded(facet: Facet, position: number): boolean {
    return facet.expanded ?? this.dialogMode === DialogMode.POP
      ? false
      : position < 3;
  }

  /**
   *
   * Updates the state of the facet in the local facet map.
   */
  protected updateState(facet: Facet, ...property: any) {
    const state = Object.assign(this.getState(facet).value, ...property);
    this.getState(facet).next(state);
  }

  protected hasState(facet: Facet): boolean {
    return this.facetState.has(facet.name);
  }

  getLinkParams(query: string) {
    return { query: this.queryCodec.decodeValue(query) };
  }
}
