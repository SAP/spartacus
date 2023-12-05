import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CmsComponent } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { PageContext } from '../../routing/models/page-context.model';
import { ContentSlotData } from '../model/content-slot-data.model';
import { NodeItem } from '../model/node-item.model';
import { Page } from '../model/page.model';
import { StateWithCms } from '../store/cms-state';
import * as i0 from "@angular/core";
export declare class CmsService {
    protected store: Store<StateWithCms>;
    protected routingService: RoutingService;
    private components;
    constructor(store: Store<StateWithCms>, routingService: RoutingService);
    /**
     * Get current CMS page data
     */
    getCurrentPage(): Observable<Page>;
    /**
     * Get CMS component data by uid
     *
     * This method can be safely and optimally used to load multiple components data at the same time.
     * Calling getComponentData multiple times for different components will always result in optimized
     * back-end request: all components requested at the same time (in one event loop) will be loaded in one network call.
     *
     * In case the component data is not present, the method will load it.
     * Otherwise, if the page context is not provided, the current page context from the router state will be used instead.
     *
     * @param uid CMS component uid
     * @param pageContext if provided, it will be used to lookup the component data.
     */
    getComponentData<T extends CmsComponent | null>(uid: string, pageContext?: PageContext): Observable<T>;
    private createComponentData;
    /**
     * Given the position, get the content slot data
     * @param position : content slot position
     */
    getContentSlot(position: string): Observable<ContentSlotData>;
    /**
     * Given navigation node uid, get items (with id and type) inside the navigation entries
     * @param navigationNodeUid : uid of the navigation node
     */
    getNavigationEntryItems(navigationNodeUid: string): Observable<NodeItem>;
    /**
     * Load navigation items data
     * @param rootUid : the uid of the root navigation node
     * @param itemList : list of items (with id and type)
     */
    loadNavigationItems(rootUid: string, itemList: {
        id: string | undefined;
        superType: string | undefined;
    }[]): void;
    /**
     * Refresh the content of the latest cms page
     */
    refreshLatestPage(): void;
    /**
     * Refresh the cms page content by page Id
     * @param pageId
     */
    refreshPageById(pageId: string): void;
    /**
     * Refresh cms component's content
     * @param uid component uid
     * @param pageContext an optional parameter that enables the caller to specify for which context the component should be refreshed.
     * If not specified, 'current' page context is used.
     */
    refreshComponent(uid: string, pageContext?: PageContext): void;
    /**
     * Given pageContext, return the CMS page data
     * @param pageContext
     */
    getPageState(pageContext: PageContext): Observable<Page>;
    /**
     * Given pageContext, return the CMS page data
     * @param pageContext
     */
    getPageComponentTypes(pageContext: PageContext): Observable<string[]>;
    /**
     * Given pageContext, return whether the CMS page data exists or not
     * @param pageContext
     */
    hasPage(pageContext: PageContext, forceReload?: boolean): Observable<boolean>;
    /**
     * Given pageContext, return the CMS page data
     **/
    getPage(pageContext: PageContext, forceReload?: boolean): Observable<Page | null>;
    getPageIndex(pageContext: PageContext): Observable<string>;
    setPageFailIndex(pageContext: PageContext, value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsService>;
}
