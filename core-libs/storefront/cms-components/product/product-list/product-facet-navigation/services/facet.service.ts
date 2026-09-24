/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Breadcrumb, Facet } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  protected readonly codec = new HttpUrlEncodingCodec();

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
      facetList.facets?.forEach((facet) => this.initialize(facet));
    })
  );

  /**
   * Returns the observed UI state for the facet.
   *
   * The state is initialized using the `initialize` method.
   */
  getState(facet: Facet): Observable<FacetCollapseState> {
    this.initialize(facet);
    return facet.name ? (this.facetState.get(facet.name) ?? of({})) : of({});
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
    this.updateState(facet, { maxVisible: facet.values?.length });
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
      facet.topValueCount && facet.topValueCount > 0
        ? facet.topValueCount
        : facet.values?.length || 0;
    if (facet.name && !this.hasState(facet)) {
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
    if (facet.name) {
      this.facetState.get(facet.name)?.next(state);
    }
  }

  protected hasState(facet: Facet): boolean {
    if (facet.name) {
      return this.facetState.has(facet.name);
    }
    return false;
  }

  getLinkParams(query: string): { [key: string]: string } {
    return {
      // to avoid encoding issues with facets that have space (' ') in their name,
      // we replace the decoded '+' back to empty space ' '.
      // For more, see https://github.com/SAP/spartacus/issues/7348
      query: this.codec
        .decodeValue(this.decodeUriComponentSafe(query))
        .replace(/\+/g, ' '),
    };
  }

  /**
   * Returns the query that removes all the given active facets at once, while
   * preserving the free text search and category context.
   *
   * Each active facet exposes a `removeQuery` that removes only that single
   * facet, so any one of them already contains every _other_ active facet as
   * well as the context we want to keep (free text search, sort, category). We
   * therefore take one such query and strip every active facet's
   * `facetCode`/`facetValueCode` pair from it. Working on the code/value pairs
   * (rather than on individual `:`-separated tokens) keeps the pairing intact,
   * which matters once several facets are applied.
   */
  getResetQuery(activeFacets: Breadcrumb[]): string {
    const baseQuery = activeFacets
      .map((facet) => facet.removeQuery?.query?.value)
      .find((value): value is string => value != null);

    if (baseQuery == null) {
      return '';
    }

    let segments = baseQuery.split(':');
    activeFacets.forEach((facet) => {
      segments = this.removeFacetSegment(segments, facet);
    });

    return segments.join(':');
  }

  /**
   * Removes the `facetCode`/`facetValueCode` pair of the given facet from the
   * list of query segments, if present. The value comparison is
   * encoding-tolerant so that facet values containing spaces or special
   * characters are matched regardless of how they are encoded in the query.
   */
  protected removeFacetSegment(
    segments: string[],
    facet: Breadcrumb
  ): string[] {
    if (!facet.facetCode) {
      return segments;
    }

    const index = segments.findIndex(
      (segment, i) =>
        segment === facet.facetCode &&
        (facet.facetValueCode == null ||
          this.decodeSegment(segments[i + 1]) ===
            this.decodeSegment(facet.facetValueCode))
    );

    return index === -1
      ? segments
      : [...segments.slice(0, index), ...segments.slice(index + 2)];
  }

  protected decodeSegment(segment: string | undefined): string {
    return segment == null
      ? ''
      : this.codec
          .decodeValue(this.decodeUriComponentSafe(segment))
          .replace(/\+/g, ' ');
  }

  protected decodeUriComponentSafe(query: string): string {
    return query.replace(/%(?![0-9a-fA-F]{2})/g, '%25');
  }
}
