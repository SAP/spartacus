import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import {
  filter,
  tap,
  map,
  withLatestFrom,
  switchMap,
  take
} from 'rxjs/operators';

import * as fromStore from '../store';
import { PageContext, RoutingService } from '../../routing';
import { LoaderState } from '../../state';
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
    private store: Store<StateWithCms>,
    private routingService: RoutingService
  ) {
    // TODO:#1135 - delete?
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
  // TODO:#1135 - update test
  getCurrentPage(): Observable<Page> {
    return this.routingService
      .getPageContext()
      .pipe(
        switchMap(pageContext =>
          this.store.select(fromStore.getPageData(pageContext))
        )
      );
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
    return this.routingService.getPageContext().pipe(
      switchMap(pageContext =>
        this.store.pipe(
          select(fromStore.currentSlotSelectorFactory(pageContext, position)),
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
  // TODO:#1135 - update test
  refreshLatestPage(): void {
    this.routingService
      .getPageContext()
      .pipe(take(1))
      .subscribe(pageContext =>
        this.store.dispatch(new fromStore.LoadPageIndex(pageContext))
      );
  }

  /**
   * Refresh cms component's content
   * @param uid : component uid
   */
  refreshComponent(uid: string): void {
    this.store.dispatch(new fromStore.LoadComponent(uid));
  }

  /**
   * Given pageContext, return whether the CMS page data exists or not
   * @param pageContext
   */
  hasPage(pageContext: PageContext): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getIndexEntity(pageContext)),
      tap((entity: LoaderState<string>) => {
        const attemptedLoad = entity.loading || entity.success || entity.error;
        if (!attemptedLoad) {
          this.store.dispatch(new fromStore.LoadPageIndex(pageContext));
        }
      }),
      filter(entity => entity.success || entity.error),
      map(entity => entity.success)
    );
  }
}
