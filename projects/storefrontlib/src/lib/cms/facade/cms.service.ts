import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import { filter, tap, map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Page } from '../models/page.model';
import { DefaultPageService } from '../services/default-page.service';
import { CmsComponent } from '@spartacus/core';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  constructor(
    private store: Store<fromStore.CmsState>,
    private defaultPageService: DefaultPageService
  ) {
    this.addSmartEditPageContract();
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
    const selector = fromStore.componentSelectorFactory(uid);
    return this.store.pipe(
      select(selector),
      tap(componentData => {
        if (componentData === undefined) {
          this.store.dispatch(new fromStore.LoadComponent(uid));
        }
      }),
      filter(Boolean)
    );
  }

  /**
   * Given the position, get CMS components (with uid and typecode) inside the content slot
   * @param position : content slot position
   */
  getContentSlot(
    position: string
  ): Observable<{ uid: string; typeCode: string }[]> {
    return this.store.pipe(
      select(fromStore.currentSlotSelectorFactory(position)),
      filter(Boolean)
    );
  }

  /**
   * Given navigation node uid, get items (with id and type) inside the navigation entries
   * @param navigationNodeUid : uid of the navigation node
   */
  getNavigationEntryItems(navigationNodeUid: string): Observable<any> {
    return this.store.pipe(
      select(fromStore.itemsSelectorFactory(navigationNodeUid))
    );
  }

  /**
   * Load navigation items data
   * @param rootUid : the uid of the root navigation node
   * @param itemList : list of items (with id and type)
   */
  loadNavigationItems(rootUid: string, itemList: any[]) {
    this.store.dispatch(
      new fromStore.LoadNavigationItems({
        nodeId: rootUid,
        items: itemList
      })
    );
  }

  /**
   * Given pageContext, return whether the CMS page data exists or not
   * @param pageContext
   */
  hasPage(pageContext): Observable<boolean> {
    let tryTimes = 0;

    return this.store.pipe(
      select(fromStore.getPageEntities),
      map((entities: { [key: string]: Page }) => {
        let key = pageContext.id + '_' + pageContext.type;
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
  }

  private addSmartEditPageContract() {
    this.getCurrentPage().subscribe(cmsPage => {
      if (cmsPage) {
        const previousContract = [];
        Array.from(document.body.classList).forEach(attr =>
          previousContract.push(attr)
        );
        previousContract.forEach(attr => document.body.classList.remove(attr));

        // now, we hard-coded catalog verion uuid.
        document.body.classList.add(`smartedit-page-uid-${cmsPage.pageId}`);
        document.body.classList.add(`smartedit-page-uuid-${cmsPage.uuid}`);
        document.body.classList.add(
          'smartedit-catalog-version-uuid-electronicsContentCatalog/Online'
        );
      }
    });
  }
}
