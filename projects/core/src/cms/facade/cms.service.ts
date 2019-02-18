import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import * as fromStore from '../store';
import {
  filter,
  tap,
  map,
  take,
  withLatestFrom,
  multicast,
  refCount
} from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Page } from '../model/page.model';
import { ContentSlotData } from '../model/content-slot-data.model';
import { DefaultPageService } from '../services/default-page.service';
import { StateWithCms } from '../store/cms-state';
import { CmsComponent } from '../../occ/occ-models/cms-component.models';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private _launchInSmartEdit = false;

  private components: {
    [uid: string]: Observable<CmsComponent>;
  } = {};

  constructor(
    private store: Store<StateWithCms>,
    private defaultPageService: DefaultPageService
  ) {}

  /**
   * Set _launchInSmartEdit value
   */
  set launchInSmartEdit(value) {
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
    if (!this.components[uid]) {
      this.components[uid] = this.store.pipe(
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
        filter(Boolean),
        // TODO: Replace next two lines with shareReplay(1, undefined, true) when RxJS 6.4 will be in use
        multicast(() => new ReplaySubject(1)),
        refCount()
      );
    }

    return this.components[uid] as Observable<T>;
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
  loadNavigationItems(
    rootUid: string,
    itemList: { id: string; superType: string }[]
  ) {
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
  refreshLatestPage() {
    this.store.dispatch(new fromStore.RefreshLatestPage());
  }

  /**
   * Refresh cms component's content
   * @param uid : component uid
   */
  refreshComponent(uid: string) {
    this.store.dispatch(new fromStore.LoadComponent(uid));
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
}
