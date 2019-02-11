import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, tap, map, withLatestFrom } from 'rxjs/operators';

import * as fromStore from '../store';
import { PageType } from '../../occ';
import { PageContext } from '../../routing';
import { EntityLoaderState, LoaderState } from '../../state';
import { ContentSlotData } from '../model/content-slot-data.model';
import { NodeItem } from '../model/node-item.model';
import { Page } from '../model/page.model';
import { StateWithCms } from '../store/cms-state';
import { CmsComponent } from '../../occ/occ-models/cms-component.models';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private _launchInSmartEdit = false;

  constructor(
    private store: Store<StateWithCms> // TODO:#1135 - delete?
  ) {
    // private defaultPageService: DefaultPageService
  }

  /**
   * Set _launchInSmartEdit value
   */
  set launchInSmartEdit(value: boolean) {
    this._launchInSmartEdit = value;
  }

  /**
   * Whether the app launched in smart edit
   */
  isLaunchInSmartEdit(): boolean {
    return this._launchInSmartEdit;
  }

  /**
   * Get current CMS page data
   */
  getCurrentPage(): Observable<Page> {
    return this.store.pipe(select(fromStore.getLatestPage));
  }

  /**
   * Get CMS component data by uid
   * @param uid : CMS componet uid
   */
  getComponentData<T extends CmsComponent>(uid: string): Observable<T> {
    return this.store.pipe(
      select(fromStore.componentStateSelectorFactory(uid)),
      withLatestFrom(this.getCurrentPage()),
      tap(([componentState, currentPage]) => {
        const attemptedLoad =
          componentState.loading ||
          componentState.success ||
          componentState.error;
        if (!attemptedLoad && currentPage) {
          this.store.dispatch(new fromStore.LoadComponent(uid));
        }
      }),
      map(([productState]) => productState.value),
      filter(Boolean)
    );
  }

  /**
   * Given the position, get the content slot data
   * @param position : content slot position
   */
  getContentSlot(position: string): Observable<ContentSlotData> {
    return this.store.pipe(
      select(fromStore.currentSlotSelectorFactory(position)),
      filter(Boolean)
    );
  }

  /**
   * Given navigation node uid, get items (with id and type) inside the navigation entries
   * @param navigationNodeUid : uid of the navigation node
   */
  getNavigationEntryItems(navigationNodeUid: string): Observable<NodeItem> {
    return this.store.pipe(
      select(fromStore.itemsSelectorFactory(navigationNodeUid))
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
      new fromStore.LoadNavigationItems({
        nodeId: rootUid,
        items: itemList
      })
    );
  }

  /**
   * Refresh the content of the latest cms page
   */
  refreshLatestPage(): void {
    this.store.dispatch(new fromStore.RefreshLatestPage());
  }

  /**
   * Refresh cms component's content
   * @param uid : component uid
   */
  refreshComponent(uid: string): void {
    this.store.dispatch(new fromStore.LoadComponent(uid));
  }

  // TODO:#1135 - test
  private getIndexType(
    pageContext: PageContext
  ): Observable<EntityLoaderState<string>> {
    if (pageContext.type === PageType.CONTENT_PAGE) {
      return this.store.pipe(select(fromStore.getLoaderContentState));
    } else if (pageContext.type === PageType.PRODUCT_PAGE) {
      return this.store.pipe(select(fromStore.getLoaderProductState));
    } else if (pageContext.type === PageType.CATEGORY_PAGE) {
      return this.store.pipe(select(fromStore.getLoaderCategoryState));
    } else {
      return this.store.pipe(select(fromStore.getLoaderCatalogState));
    }
  }

  /**
   * Given pageContext, return whether the CMS page data exists or not
   * @param pageContext
   */
  hasPage(pageContext: PageContext): Observable<boolean> {
    // TODO:#1135 maybe implement three functions: one per cms type

    console.log({ pageContext });

    return this.getIndexType(pageContext).pipe(
      map(index => index.entities[pageContext.id]),
      tap((entity: LoaderState<string>) => {
        const attemptedLoad = entity.loading || entity.success || entity.error;
        if (!attemptedLoad) {
          this.store.dispatch(new fromStore.LoadPageData(pageContext));
        }
      }),
      tap(entity => {
        if (entity.success) {
          this.store.dispatch(new fromStore.UpdateLatestPageKey(entity.value));
        }
      }),
      filter(entity => entity.success || entity.error),
      map(entity => entity.success)
    );

    // TODO:#1135 - delete
    /*
    return this.store.pipe(
      select(fromStore.getPageEntities),
      map((entities: { [key: string]: Page }) => {
        console.log(`entities`, entities);
        let key = pageContext.id + '_' + pageContext.type;
        console.log(`key: ${key}`);
        let found = !!entities[key];
        if (!found) {
          const defaultPageIds = this.defaultPageService.getDefaultPageIdsBytype(
            pageContext.type
          );
          if (defaultPageIds) {
            for (let i = 0, len = defaultPageIds.length; i < len; i++) {
              key = defaultPageIds[i] + '_' + pageContext.type;
              found =
                entities[key] &&
                entities[key].seen.indexOf(pageContext.id) > -1;
              if (found) {
                break;
              }
            }
          }
        }
        // found page directly from store
        if (found && tryTimes === 0) {
          this.store.dispatch(new fromStore.UpdateLatestPageKey(key));
        }
        return found;
      }),
      tap(found => {
        // if not found, load this cms page
        if (!found) {
          tryTimes = tryTimes + 1;
          this.store.dispatch(new fromStore.LoadPageData(pageContext));
        }
      }),
      filter(found => found || tryTimes === 3),
      take(1)
    );
    */
  }
}
