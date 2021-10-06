import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of, queueScheduler, using } from 'rxjs';
import {
  catchError,
  filter,
  observeOn,
  pluck,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CmsComponent } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { PageContext } from '../../routing/models/page-context.model';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { isNotUndefined } from '../../util/type-guards';
import { ContentSlotData } from '../model/content-slot-data.model';
import { NodeItem } from '../model/node-item.model';
import { Page } from '../model/page.model';
import { CmsActions } from '../store/actions/index';
import { StateWithCms } from '../store/cms-state';
import { CmsSelectors } from '../store/selectors/index';
import { serializePageContext } from '../utils/cms-utils';

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  private components: {
    [uid: string]: {
      [pageContext: string]: Observable<CmsComponent>;
    };
  } = {};

  constructor(
    protected store: Store<StateWithCms>,
    protected routingService: RoutingService
  ) {}

  /**
   * Get current CMS page data
   */
  getCurrentPage(): Observable<Page> {
    return this.routingService
      .getPageContext()
      .pipe(
        switchMap((pageContext) =>
          this.store.select(CmsSelectors.getPageData(pageContext))
        )
      );
  }

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
  getComponentData<T extends CmsComponent | null>(
    uid: string,
    pageContext?: PageContext
  ): Observable<T> {
    const context = serializePageContext(pageContext, true);
    if (!this.components[uid]) {
      // create the component data structure, if it doesn't already exist
      this.components[uid] = {};
    }

    const component = this.components[uid];
    if (!component[context]) {
      // create the component data and assign it to the component's context
      component[context] = this.createComponentData(uid, pageContext);
    }

    return component[context] as Observable<T>;
  }

  private createComponentData<T extends CmsComponent>(
    uid: string,
    pageContext?: PageContext
  ): Observable<T> {
    if (!pageContext) {
      return this.routingService.getPageContext().pipe(
        filter((currentContext) => !!currentContext),
        switchMap((currentContext) =>
          this.getComponentData<T>(uid, currentContext)
        )
      );
    }

    const context = serializePageContext(pageContext, true);

    const loading$ = combineLatest([
      this.routingService.getNextPageContext(),
      this.store.pipe(
        select(CmsSelectors.componentsLoaderStateSelectorFactory(uid, context))
      ),
    ]).pipe(
      observeOn(queueScheduler),
      tap(([nextContext, loadingState]) => {
        const attemptedLoad =
          loadingState.loading || loadingState.success || loadingState.error;
        // if the requested context is the same as the one that's currently being navigated to
        // (as it might already been triggered and might be available shortly from page data)
        // TODO(issue:3649), TODO(issue:3668) - this optimization could be removed
        const couldBeLoadedWithPageData = nextContext
          ? serializePageContext(nextContext, true) === context
          : false;

        if (!attemptedLoad && !couldBeLoadedWithPageData) {
          this.store.dispatch(
            new CmsActions.LoadCmsComponent({ uid, pageContext })
          );
        }
      })
    );

    const component$ = this.store.pipe(
      select(CmsSelectors.componentsSelectorFactory(uid, context)),
      filter(isNotUndefined)
    ) as Observable<T | null>;

    return using(
      () => loading$.subscribe(),
      () => component$
    ).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Given the position, get the content slot data
   * @param position : content slot position
   */
  getContentSlot(position: string): Observable<ContentSlotData> {
    return this.routingService
      .getPageContext()
      .pipe(
        switchMap((pageContext) =>
          this.store.pipe(
            select(
              CmsSelectors.getCurrentSlotSelectorFactory(pageContext, position)
            ),
            filter(Boolean)
          )
        )
      );
  }

  /**
   * Given navigation node uid, get items (with id and type) inside the navigation entries
   * @param navigationNodeUid : uid of the navigation node
   */
  getNavigationEntryItems(navigationNodeUid: string): Observable<NodeItem> {
    return this.store.pipe(
      select(CmsSelectors.getNavigationEntryItems(navigationNodeUid))
    );
  }

  /**
   * Load navigation items data
   * @param rootUid : the uid of the root navigation node
   * @param itemList : list of items (with id and type)
   */
  loadNavigationItems(
    rootUid: string,
    itemList: { id: string; superType: string }[]
  ): void {
    this.store.dispatch(
      new CmsActions.LoadCmsNavigationItems({
        nodeId: rootUid,
        items: itemList,
      })
    );
  }

  /**
   * Refresh the content of the latest cms page
   */
  refreshLatestPage(): void {
    this.routingService
      .getPageContext()
      .pipe(take(1))
      .subscribe((pageContext) =>
        this.store.dispatch(new CmsActions.LoadCmsPageData(pageContext))
      );
  }

  /**
   * Refresh the cms page content by page Id
   * @param pageId
   */
  refreshPageById(pageId: string): void {
    const pageContext: PageContext = { id: pageId };
    this.store.dispatch(new CmsActions.LoadCmsPageData(pageContext));
  }

  /**
   * Refresh cms component's content
   * @param uid component uid
   * @param pageContext an optional parameter that enables the caller to specify for which context the component should be refreshed.
   * If not specified, 'current' page context is used.
   */
  refreshComponent(uid: string, pageContext?: PageContext): void {
    this.store.dispatch(new CmsActions.LoadCmsComponent({ uid, pageContext }));
  }

  /**
   * Given pageContext, return the CMS page data
   * @param pageContext
   */
  getPageState(pageContext: PageContext): Observable<Page> {
    return this.store.pipe(select(CmsSelectors.getPageData(pageContext)));
  }

  /**
   * Given pageContext, return the CMS page data
   * @param pageContext
   */
  getPageComponentTypes(pageContext: PageContext): Observable<string[]> {
    return this.store.pipe(
      select(CmsSelectors.getPageComponentTypes(pageContext))
    );
  }

  /**
   * Given pageContext, return whether the CMS page data exists or not
   * @param pageContext
   */
  hasPage(pageContext: PageContext, forceReload = false): Observable<boolean> {
    return this.store.pipe(
      select(CmsSelectors.getPageStateIndexLoaderState(pageContext)),
      tap((entity: LoaderState<string>) => {
        const attemptedLoad = entity.loading || entity.success || entity.error;
        const shouldReload = forceReload && !entity.loading;
        if (!attemptedLoad || shouldReload) {
          this.store.dispatch(new CmsActions.LoadCmsPageData(pageContext));
          forceReload = false;
        }
      }),
      filter((entity) => {
        if (!entity.hasOwnProperty('value')) {
          // if we have incomplete state from SSR failed load transfer state,
          // we should wait for reload and actual value
          return false;
        }
        return entity.success || (entity.error && !entity.loading);
      }),
      pluck('success'),
      catchError(() => of(false))
    );
  }

  /**
   * Given pageContext, return the CMS page data
   **/
  getPage(pageContext: PageContext, forceReload = false): Observable<Page> {
    return this.hasPage(pageContext, forceReload).pipe(
      switchMap((hasPage) =>
        hasPage ? this.getPageState(pageContext) : of(null)
      )
    );
  }

  getPageIndex(pageContext: PageContext): Observable<string> {
    return this.store.pipe(
      select(CmsSelectors.getPageStateIndexValue(pageContext))
    );
  }

  setPageFailIndex(pageContext: PageContext, value: string): void {
    this.store.dispatch(new CmsActions.CmsSetPageFailIndex(pageContext, value));
  }
}
