import { ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { Facet, FacetValue } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import { FocusDirective } from '../../../../../layout/a11y/keyboard-focus/focus.directive';
import { FacetCollapseState } from '../facet.model';
import { FacetService } from '../services/facet.service';
import * as i0 from "@angular/core";
export declare class FacetComponent {
    protected facetService: FacetService;
    protected elementRef: ElementRef<HTMLElement>;
    protected cd: ChangeDetectorRef;
    protected _facet: Facet;
    state$: Observable<FacetCollapseState>;
    /** configurable icon that is used to collapse the facet group  */
    expandIcon: ICON_TYPE;
    collapseIcon: ICON_TYPE;
    isMultiSelect: boolean;
    values: QueryList<ElementRef<HTMLElement>>;
    keyboardFocus: FocusDirective;
    set facet(value: Facet);
    get facet(): Facet;
    constructor(facetService: FacetService, elementRef: ElementRef<HTMLElement>, cd: ChangeDetectorRef);
    /**
     * Handles clicking the heading of the facet group, which means toggling
     * the visibility of the group (collapse / expand) and optionally focusing
     * the group.
     */
    toggleGroup(event: UIEvent): void;
    get isExpanded(): boolean;
    openLink(event: KeyboardEvent): void;
    /**
     * Increases the number of visible values for the facet. This is delegated
     * to `facetService.increaseVisibleValues`.
     */
    increaseVisibleValues(): void;
    /**
     * Decreases the number of visible values for the facet. This is delegated
     * to `facetService.decreaseVisibleValues`.
     */
    decreaseVisibleValues(): void;
    getLinkParams(value: FacetValue): {
        [key: string]: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<FacetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FacetComponent, "cx-facet", never, { "expandIcon": "expandIcon"; "collapseIcon": "collapseIcon"; "facet": "facet"; }, {}, never, never, false, never>;
}
