import { CmsNavigationComponent, CmsService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { NavigationNode } from './navigation-node.model';
import * as i0 from "@angular/core";
export declare class NavigationService {
    protected cmsService: CmsService;
    protected semanticPathService: SemanticPathService;
    constructor(cmsService: CmsService, semanticPathService: SemanticPathService);
    createNavigation(data$: Observable<CmsNavigationComponent>): Observable<NavigationNode>;
    /**
     * returns an observable with the `NavigationNode` for the given `CmsNavigationComponent`.
     * This function will load the navigation underlying entries and children if they haven't been
     * loaded so far.
     */
    getNavigationNode(data$: Observable<CmsNavigationComponent>): Observable<NavigationNode>;
    /**
     * Loads all navigation entry items' type and id. Dispatch action to load all these items
     * @param nodeData
     * @param root
     * @param itemsList
     */
    private loadNavigationEntryItems;
    /**
     * Create a new node tree for the view
     * @param nodeData
     * @param items
     */
    private populateNavigationNode;
    /**
     * The node link is driven by the first entry.
     */
    private populateLink;
    /**
     *
     * Gets the URL or link to a related item (category),
     * also taking into account content pages (contentPageLabelOrId)
     * and product pages (productCode)
     */
    protected getLink(item: any): string | string[] | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NavigationService>;
}
