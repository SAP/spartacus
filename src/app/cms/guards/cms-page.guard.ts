import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, map, take, switchMap, catchError } from 'rxjs/operators';
import * as fromStore from '../store';
import * as fromRouting from '../../routing/store';

import { Page } from '../models/page.model';
import { DefaultPageService } from './../services/default-page.service';
import { PageContext } from '../../routing/models/page-context.model';

@Injectable()
export class CmsPageGuards implements CanActivate {
  constructor(
    private store: Store<fromStore.CmsState>,
    private routingStore: Store<fromRouting.State>,
    private defaultPageService: DefaultPageService
  ) {}

  canActivate(): Observable<boolean> {
    let pageContext: PageContext;
    this.routingStore
      .select(fromRouting.getRouterState)
      .subscribe(routerState => (pageContext = routerState.state.context));

    return this.hasPage(pageContext).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  hasPage(pageContext: PageContext): Observable<boolean> {
    let tryTimes = 0;
    return this.store.select(fromStore.getPageEntities).pipe(
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
        if (found && tryTimes === 0) {
          this.store.dispatch(new fromStore.UpdateLatestPageKey(key));
        }
        return found;
      }),
      tap(found => {
        if (!found && tryTimes < 5) {
          tryTimes = tryTimes + 1;
          this.store.dispatch(new fromStore.LoadPageData(pageContext));
        }
      }),
      filter(found => found),
      take(1)
    );
  }
}
