import { Breadcrumb } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import { FacetList } from '../facet.model';
import { FacetService } from '../services/facet.service';
import * as i0 from "@angular/core";
/**
 * Active facets render the applied facet values as a list of focusable buttons
 * which can be used to remove the applied facet value.
 */
export declare class ActiveFacetsComponent {
    protected facetService: FacetService;
    role: string;
    labelledby: string;
    /** Active facets which are applied to the product results. */
    facetList$: Observable<FacetList>;
    /** Configurable icon which is used for the active facet close button */
    closeIcon: ICON_TYPE;
    constructor(facetService: FacetService);
    getLinkParams(facet: Breadcrumb): {
        [key: string]: string;
    };
    /**
     * The focus key is used to persist the focus on the facet when the DOM is being
     * recreated. We only apply the focus key for the given _active_ facet when there
     * the original facets is not available. This happens for non multi-valued facets.
     *
     * With this approach, the we keep the focus, either at the facet list or on the
     * active facets.
     */
    getFocusKey(facetList: FacetList, facet: Breadcrumb): string | undefined;
    /**
     * Purpose of this function is to allow keyboard users to click on a filter they
     * wish to remove by pressing spacebar. Event not handled natively by <a> elements.
     *
     * @param event spacebar keydown
     */
    removeFilterWithSpacebar(event?: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActiveFacetsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActiveFacetsComponent, "cx-active-facets", never, { "closeIcon": "closeIcon"; }, {}, never, never, false, never>;
}
