/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FacetGroupCollapsedState, } from '../facet.model';
import * as i0 from "@angular/core";
import * as i1 from "./product-facet.service";
/**
 * Provides access to the facets as well as their UI state. The UI state
 * represents user related changes on the facets, such as expanding or
 * collapsing a facet group or expanding the number of _visible_ facet values.
 */
export class FacetService {
    constructor(productFacetService) {
        this.productFacetService = productFacetService;
        /**
         * An internal map where we keep the UI state of the facets.
         */
        this.facetState = new Map();
        this.codec = new HttpUrlEncodingCodec();
        /**
         * Observes the facets for the given page and configures the initial UI state.
         *
         * Facets are configured on each emission so that we keep the facet UI state.
         * This is mainly done to keep the state during usage of the facet, but also
         * benefitial when the facets are rebuild while using them.
         */
        this.facetList$ = this.productFacetService.facetList$.pipe(tap((facetList) => {
            facetList.facets?.forEach((facet) => this.initialize(facet));
        }));
    }
    /**
     * Returns the observed UI state for the facet.
     *
     * The state is initialized using the `initialize` method.
     */
    getState(facet) {
        this.initialize(facet);
        return facet.name ? this.facetState.get(facet.name) ?? of({}) : of({});
    }
    /**
     * Returns the UI state for the facet.
     *
     * The state is initialized using the `initialize` method.
     */
    getStateSnapshot(facet) {
        return this.getState(facet).value;
    }
    /**
     * Toggles the facet expanded state. If the expanded state becomes false,
     * the visible values will decrease to the top values only.
     *
     * If the optional value argument is provided the expanded state will be set
     * to this value, regardless of the current `expanded` state.
     */
    toggle(facet, isExpanded) {
        const state = this.getStateSnapshot(facet);
        const toggledState = {
            toggled: isExpanded
                ? FacetGroupCollapsedState.COLLAPSED
                : FacetGroupCollapsedState.EXPANDED,
        };
        if (toggledState.toggled === FacetGroupCollapsedState.COLLAPSED) {
            toggledState.maxVisible = state.topVisible;
        }
        this.updateState(facet, toggledState);
    }
    /**
     * Increases the visible values to the maximum values of the facet.
     */
    increaseVisibleValues(facet) {
        this.updateState(facet, { maxVisible: facet.values?.length });
    }
    /**
     * Decreases the visible values to the topValueCount.
     *
     * The topValueCount defaults to 6, but can be controlled in
     * the backend as well.
     */
    decreaseVisibleValues(facet) {
        this.updateState(facet, { maxVisible: facet.topValueCount });
    }
    /**
     * Persists the facet state and initializes the default values for the top
     * and max visible values.
     */
    initialize(facet) {
        const topFacets = facet.topValueCount && facet.topValueCount > 0
            ? facet.topValueCount
            : facet.values?.length || 0;
        if (facet.name && !this.hasState(facet)) {
            this.facetState.set(facet.name, new BehaviorSubject({
                topVisible: topFacets,
                maxVisible: topFacets,
            }));
        }
    }
    /**
     * Updates the state of the facet in the local facet map.
     */
    updateState(facet, property) {
        const state = { ...this.getStateSnapshot(facet), ...property };
        if (facet.name) {
            this.facetState.get(facet.name)?.next(state);
        }
    }
    hasState(facet) {
        if (facet.name) {
            return this.facetState.has(facet.name);
        }
        return false;
    }
    getLinkParams(query) {
        return {
            // to avoid encoding issues with facets that have space (' ') in their name,
            // we replace the decoded '+' back to empty space ' '.
            // For more, see https://github.com/SAP/spartacus/issues/7348
            query: this.codec
                .decodeValue(this.decodeUriComponentSafe(query))
                .replace(/\+/g, ' '),
        };
    }
    decodeUriComponentSafe(query) {
        return query.replace(/%(?![0-9a-fA-F]{2})/g, '%25');
    }
}
FacetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FacetService, deps: [{ token: i1.ProductFacetService }], target: i0.ɵɵFactoryTarget.Injectable });
FacetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FacetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FacetService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductFacetService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvcHJvZHVjdC9wcm9kdWN0LWxpc3QvcHJvZHVjdC1mYWNldC1uYXZpZ2F0aW9uL3NlcnZpY2VzL2ZhY2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFFTCx3QkFBd0IsR0FFekIsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBR3hCOzs7O0dBSUc7QUFJSCxNQUFNLE9BQU8sWUFBWTtJQVF2QixZQUFzQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQVA5RDs7V0FFRztRQUNPLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBK0MsQ0FBQztRQUUzRCxVQUFLLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1FBSXREOzs7Ozs7V0FNRztRQUNILGVBQVUsR0FBMEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2hCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQWIrRCxDQUFDO0lBZWxFOzs7O09BSUc7SUFDSCxR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O0lBRUQsYUFBYSxDQUFDLEtBQWE7UUFDekIsT0FBTztZQUNMLDRFQUE0RTtZQUM1RSxzREFBc0Q7WUFDdEQsNkRBQTZEO1lBQzdELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDZCxXQUFXLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMvQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztTQUN2QixDQUFDO0lBQ0osQ0FBQztJQUVTLHNCQUFzQixDQUFDLEtBQWE7UUFDNUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7O3lHQXBJVSxZQUFZOzZHQUFaLFlBQVksY0FGWCxNQUFNOzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cFVybEVuY29kaW5nQ29kZWMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBGYWNldENvbGxhcHNlU3RhdGUsXG4gIEZhY2V0R3JvdXBDb2xsYXBzZWRTdGF0ZSxcbiAgRmFjZXRMaXN0LFxufSBmcm9tICcuLi9mYWNldC5tb2RlbCc7XG5pbXBvcnQgeyBQcm9kdWN0RmFjZXRTZXJ2aWNlIH0gZnJvbSAnLi9wcm9kdWN0LWZhY2V0LnNlcnZpY2UnO1xuXG4vKipcbiAqIFByb3ZpZGVzIGFjY2VzcyB0byB0aGUgZmFjZXRzIGFzIHdlbGwgYXMgdGhlaXIgVUkgc3RhdGUuIFRoZSBVSSBzdGF0ZVxuICogcmVwcmVzZW50cyB1c2VyIHJlbGF0ZWQgY2hhbmdlcyBvbiB0aGUgZmFjZXRzLCBzdWNoIGFzIGV4cGFuZGluZyBvclxuICogY29sbGFwc2luZyBhIGZhY2V0IGdyb3VwIG9yIGV4cGFuZGluZyB0aGUgbnVtYmVyIG9mIF92aXNpYmxlXyBmYWNldCB2YWx1ZXMuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBGYWNldFNlcnZpY2Uge1xuICAvKipcbiAgICogQW4gaW50ZXJuYWwgbWFwIHdoZXJlIHdlIGtlZXAgdGhlIFVJIHN0YXRlIG9mIHRoZSBmYWNldHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgZmFjZXRTdGF0ZSA9IG5ldyBNYXA8c3RyaW5nLCBCZWhhdmlvclN1YmplY3Q8RmFjZXRDb2xsYXBzZVN0YXRlPj4oKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29kZWMgPSBuZXcgSHR0cFVybEVuY29kaW5nQ29kZWMoKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcHJvZHVjdEZhY2V0U2VydmljZTogUHJvZHVjdEZhY2V0U2VydmljZSkge31cblxuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhlIGZhY2V0cyBmb3IgdGhlIGdpdmVuIHBhZ2UgYW5kIGNvbmZpZ3VyZXMgdGhlIGluaXRpYWwgVUkgc3RhdGUuXG4gICAqXG4gICAqIEZhY2V0cyBhcmUgY29uZmlndXJlZCBvbiBlYWNoIGVtaXNzaW9uIHNvIHRoYXQgd2Uga2VlcCB0aGUgZmFjZXQgVUkgc3RhdGUuXG4gICAqIFRoaXMgaXMgbWFpbmx5IGRvbmUgdG8ga2VlcCB0aGUgc3RhdGUgZHVyaW5nIHVzYWdlIG9mIHRoZSBmYWNldCwgYnV0IGFsc29cbiAgICogYmVuZWZpdGlhbCB3aGVuIHRoZSBmYWNldHMgYXJlIHJlYnVpbGQgd2hpbGUgdXNpbmcgdGhlbS5cbiAgICovXG4gIGZhY2V0TGlzdCQ6IE9ic2VydmFibGU8RmFjZXRMaXN0PiA9IHRoaXMucHJvZHVjdEZhY2V0U2VydmljZS5mYWNldExpc3QkLnBpcGUoXG4gICAgdGFwKChmYWNldExpc3QpID0+IHtcbiAgICAgIGZhY2V0TGlzdC5mYWNldHM/LmZvckVhY2goKGZhY2V0KSA9PiB0aGlzLmluaXRpYWxpemUoZmFjZXQpKTtcbiAgICB9KVxuICApO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBvYnNlcnZlZCBVSSBzdGF0ZSBmb3IgdGhlIGZhY2V0LlxuICAgKlxuICAgKiBUaGUgc3RhdGUgaXMgaW5pdGlhbGl6ZWQgdXNpbmcgdGhlIGBpbml0aWFsaXplYCBtZXRob2QuXG4gICAqL1xuICBnZXRTdGF0ZShmYWNldDogRmFjZXQpOiBPYnNlcnZhYmxlPEZhY2V0Q29sbGFwc2VTdGF0ZT4ge1xuICAgIHRoaXMuaW5pdGlhbGl6ZShmYWNldCk7XG4gICAgcmV0dXJuIGZhY2V0Lm5hbWUgPyB0aGlzLmZhY2V0U3RhdGUuZ2V0KGZhY2V0Lm5hbWUpID8/IG9mKHt9KSA6IG9mKHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBVSSBzdGF0ZSBmb3IgdGhlIGZhY2V0LlxuICAgKlxuICAgKiBUaGUgc3RhdGUgaXMgaW5pdGlhbGl6ZWQgdXNpbmcgdGhlIGBpbml0aWFsaXplYCBtZXRob2QuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0U3RhdGVTbmFwc2hvdChmYWNldDogRmFjZXQpOiBGYWNldENvbGxhcHNlU3RhdGUge1xuICAgIHJldHVybiAodGhpcy5nZXRTdGF0ZShmYWNldCkgYXMgQmVoYXZpb3JTdWJqZWN0PEZhY2V0Q29sbGFwc2VTdGF0ZT4pLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGZhY2V0IGV4cGFuZGVkIHN0YXRlLiBJZiB0aGUgZXhwYW5kZWQgc3RhdGUgYmVjb21lcyBmYWxzZSxcbiAgICogdGhlIHZpc2libGUgdmFsdWVzIHdpbGwgZGVjcmVhc2UgdG8gdGhlIHRvcCB2YWx1ZXMgb25seS5cbiAgICpcbiAgICogSWYgdGhlIG9wdGlvbmFsIHZhbHVlIGFyZ3VtZW50IGlzIHByb3ZpZGVkIHRoZSBleHBhbmRlZCBzdGF0ZSB3aWxsIGJlIHNldFxuICAgKiB0byB0aGlzIHZhbHVlLCByZWdhcmRsZXNzIG9mIHRoZSBjdXJyZW50IGBleHBhbmRlZGAgc3RhdGUuXG4gICAqL1xuICB0b2dnbGUoZmFjZXQ6IEZhY2V0LCBpc0V4cGFuZGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlU25hcHNob3QoZmFjZXQpO1xuXG4gICAgY29uc3QgdG9nZ2xlZFN0YXRlID0ge1xuICAgICAgdG9nZ2xlZDogaXNFeHBhbmRlZFxuICAgICAgICA/IEZhY2V0R3JvdXBDb2xsYXBzZWRTdGF0ZS5DT0xMQVBTRURcbiAgICAgICAgOiBGYWNldEdyb3VwQ29sbGFwc2VkU3RhdGUuRVhQQU5ERUQsXG4gICAgfSBhcyBGYWNldENvbGxhcHNlU3RhdGU7XG5cbiAgICBpZiAodG9nZ2xlZFN0YXRlLnRvZ2dsZWQgPT09IEZhY2V0R3JvdXBDb2xsYXBzZWRTdGF0ZS5DT0xMQVBTRUQpIHtcbiAgICAgIHRvZ2dsZWRTdGF0ZS5tYXhWaXNpYmxlID0gc3RhdGUudG9wVmlzaWJsZTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVN0YXRlKGZhY2V0LCB0b2dnbGVkU3RhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlYXNlcyB0aGUgdmlzaWJsZSB2YWx1ZXMgdG8gdGhlIG1heGltdW0gdmFsdWVzIG9mIHRoZSBmYWNldC5cbiAgICovXG4gIGluY3JlYXNlVmlzaWJsZVZhbHVlcyhmYWNldDogRmFjZXQpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKGZhY2V0LCB7IG1heFZpc2libGU6IGZhY2V0LnZhbHVlcz8ubGVuZ3RoIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlY3JlYXNlcyB0aGUgdmlzaWJsZSB2YWx1ZXMgdG8gdGhlIHRvcFZhbHVlQ291bnQuXG4gICAqXG4gICAqIFRoZSB0b3BWYWx1ZUNvdW50IGRlZmF1bHRzIHRvIDYsIGJ1dCBjYW4gYmUgY29udHJvbGxlZCBpblxuICAgKiB0aGUgYmFja2VuZCBhcyB3ZWxsLlxuICAgKi9cbiAgZGVjcmVhc2VWaXNpYmxlVmFsdWVzKGZhY2V0OiBGYWNldCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoZmFjZXQsIHsgbWF4VmlzaWJsZTogZmFjZXQudG9wVmFsdWVDb3VudCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJzaXN0cyB0aGUgZmFjZXQgc3RhdGUgYW5kIGluaXRpYWxpemVzIHRoZSBkZWZhdWx0IHZhbHVlcyBmb3IgdGhlIHRvcFxuICAgKiBhbmQgbWF4IHZpc2libGUgdmFsdWVzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGluaXRpYWxpemUoZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG4gICAgY29uc3QgdG9wRmFjZXRzID1cbiAgICAgIGZhY2V0LnRvcFZhbHVlQ291bnQgJiYgZmFjZXQudG9wVmFsdWVDb3VudCA+IDBcbiAgICAgICAgPyBmYWNldC50b3BWYWx1ZUNvdW50XG4gICAgICAgIDogZmFjZXQudmFsdWVzPy5sZW5ndGggfHwgMDtcbiAgICBpZiAoZmFjZXQubmFtZSAmJiAhdGhpcy5oYXNTdGF0ZShmYWNldCkpIHtcbiAgICAgIHRoaXMuZmFjZXRTdGF0ZS5zZXQoXG4gICAgICAgIGZhY2V0Lm5hbWUsXG4gICAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Qoe1xuICAgICAgICAgIHRvcFZpc2libGU6IHRvcEZhY2V0cyxcbiAgICAgICAgICBtYXhWaXNpYmxlOiB0b3BGYWNldHMsXG4gICAgICAgIH0gYXMgRmFjZXRDb2xsYXBzZVN0YXRlKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgc3RhdGUgb2YgdGhlIGZhY2V0IGluIHRoZSBsb2NhbCBmYWNldCBtYXAuXG4gICAqL1xuICBwcm90ZWN0ZWQgdXBkYXRlU3RhdGUoZmFjZXQ6IEZhY2V0LCBwcm9wZXJ0eTogRmFjZXRDb2xsYXBzZVN0YXRlKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhdGUgPSB7IC4uLnRoaXMuZ2V0U3RhdGVTbmFwc2hvdChmYWNldCksIC4uLnByb3BlcnR5IH07XG4gICAgaWYgKGZhY2V0Lm5hbWUpIHtcbiAgICAgIHRoaXMuZmFjZXRTdGF0ZS5nZXQoZmFjZXQubmFtZSk/Lm5leHQoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBoYXNTdGF0ZShmYWNldDogRmFjZXQpOiBib29sZWFuIHtcbiAgICBpZiAoZmFjZXQubmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZmFjZXRTdGF0ZS5oYXMoZmFjZXQubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldExpbmtQYXJhbXMocXVlcnk6IHN0cmluZyk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICAvLyB0byBhdm9pZCBlbmNvZGluZyBpc3N1ZXMgd2l0aCBmYWNldHMgdGhhdCBoYXZlIHNwYWNlICgnICcpIGluIHRoZWlyIG5hbWUsXG4gICAgICAvLyB3ZSByZXBsYWNlIHRoZSBkZWNvZGVkICcrJyBiYWNrIHRvIGVtcHR5IHNwYWNlICcgJy5cbiAgICAgIC8vIEZvciBtb3JlLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL1NBUC9zcGFydGFjdXMvaXNzdWVzLzczNDhcbiAgICAgIHF1ZXJ5OiB0aGlzLmNvZGVjXG4gICAgICAgIC5kZWNvZGVWYWx1ZSh0aGlzLmRlY29kZVVyaUNvbXBvbmVudFNhZmUocXVlcnkpKVxuICAgICAgICAucmVwbGFjZSgvXFwrL2csICcgJyksXG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWNvZGVVcmlDb21wb25lbnRTYWZlKHF1ZXJ5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBxdWVyeS5yZXBsYWNlKC8lKD8hWzAtOWEtZkEtRl17Mn0pL2csICclMjUnKTtcbiAgfVxufVxuIl19