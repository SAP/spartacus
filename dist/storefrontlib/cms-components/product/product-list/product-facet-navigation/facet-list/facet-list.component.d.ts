import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { Facet } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FocusConfig } from '../../../../../layout/a11y/keyboard-focus/index';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetList } from '../facet.model';
import { FacetComponent } from '../facet/facet.component';
import { FacetService } from '../services/facet.service';
import * as i0 from "@angular/core";
export declare class FacetListComponent {
    protected facetService: FacetService;
    protected elementRef: ElementRef;
    protected renderer: Renderer2;
    private _isDialog;
    /**
     * Indicates that the facet navigation is rendered in dialog.
     */
    set isDialog(value: boolean);
    get isDialog(): boolean;
    /** Emits when the list must close */
    closeList: EventEmitter<any>;
    /** The list of all facet and values related to the products in the list */
    facetList$: Observable<FacetList>;
    iconTypes: typeof ICON_TYPE;
    dialogFocusConfig: FocusConfig;
    handleClick(): void;
    constructor(facetService: FacetService, elementRef: ElementRef, renderer: Renderer2);
    /**
     * Toggles the facet group in case it is not expanded.
     */
    expandFacetGroup(facet: Facet, ref: FacetComponent): void;
    /**
     * Indicates that the facet group has been expanded.
     */
    isExpanded(facet: Facet): Observable<boolean>;
    /**
     * Indicates that the facet group has been collapsed.
     */
    isCollapsed(facet: Facet): Observable<boolean>;
    close(event?: boolean): void;
    block(event?: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FacetListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FacetListComponent, "cx-facet-list", never, { "isDialog": "isDialog"; }, { "closeList": "closeList"; }, never, never, false, never>;
}
