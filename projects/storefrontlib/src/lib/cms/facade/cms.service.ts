import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import { filter, tap, map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Page } from '../models/page.model';
import { DefaultPageService } from '../services/default-page.service';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  readonly currentPage$: Observable<Page> = this.store.pipe(
    select(fromStore.getLatestPage)
  );

  constructor(
    private store: Store<fromStore.CmsState>,
    private defaultPageService: DefaultPageService
  ) {}

  getComponentData(uid: string): Observable<any> {
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

  getContentSlot(position: string) {
    return this.store.pipe(
      select(fromStore.currentSlotSelectorFactory(position)),
      filter(Boolean)
    );
  }

  getNavigationEntryItems(navigationNodeUid: string): Observable<any> {
    return this.store.pipe(
      select(fromStore.itemsSelectorFactory(navigationNodeUid))
    );
  }

  loadNavigationItems(rootUid: string, itemList: any[]) {
    this.store.dispatch(
      new fromStore.LoadNavigationItems({
        nodeId: rootUid,
        items: itemList
      })
    );
  }

  hasPage(pageContext) {
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
