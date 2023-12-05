import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Facet } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FacetCollapseState, FacetList } from '../facet.model';
import { ProductFacetService } from './product-facet.service';
import * as i0 from "@angular/core";
/**
 * Provides access to the facets as well as their UI state. The UI state
 * represents user related changes on the facets, such as expanding or
 * collapsing a facet group or expanding the number of _visible_ facet values.
 */
export declare class FacetService {
    protected productFacetService: ProductFacetService;
    /**
     * An internal map where we keep the UI state of the facets.
     */
    protected facetState: Map<string, BehaviorSubject<FacetCollapseState>>;
    protected readonly codec: HttpUrlEncodingCodec;
    constructor(productFacetService: ProductFacetService);
    /**
     * Observes the facets for the given page and configures the initial UI state.
     *
     * Facets are configured on each emission so that we keep the facet UI state.
     * This is mainly done to keep the state during usage of the facet, but also
     * benefitial when the facets are rebuild while using them.
     */
    facetList$: Observable<FacetList>;
    /**
     * Returns the observed UI state for the facet.
     *
     * The state is initialized using the `initialize` method.
     */
    getState(facet: Facet): Observable<FacetCollapseState>;
    /**
     * Returns the UI state for the facet.
     *
     * The state is initialized using the `initialize` method.
     */
    protected getStateSnapshot(facet: Facet): FacetCollapseState;
    /**
     * Toggles the facet expanded state. If the expanded state becomes false,
     * the visible values will decrease to the top values only.
     *
     * If the optional value argument is provided the expanded state will be set
     * to this value, regardless of the current `expanded` state.
     */
    toggle(facet: Facet, isExpanded: boolean): void;
    /**
     * Increases the visible values to the maximum values of the facet.
     */
    increaseVisibleValues(facet: Facet): void;
    /**
     * Decreases the visible values to the topValueCount.
     *
     * The topValueCount defaults to 6, but can be controlled in
     * the backend as well.
     */
    decreaseVisibleValues(facet: Facet): void;
    /**
     * Persists the facet state and initializes the default values for the top
     * and max visible values.
     */
    protected initialize(facet: Facet): void;
    /**
     * Updates the state of the facet in the local facet map.
     */
    protected updateState(facet: Facet, property: FacetCollapseState): void;
    protected hasState(facet: Facet): boolean;
    getLinkParams(query: string): {
        [key: string]: string;
    };
    protected decodeUriComponentSafe(query: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FacetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FacetService>;
}
