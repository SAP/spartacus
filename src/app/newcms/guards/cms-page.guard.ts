import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap, filter, map, take, switchMap, catchError } from "rxjs/operators";
import * as fromStore from "../store";

import { Page } from "../models/page.model";
import { DefaultPageService } from "./../services/default-page.service";
import { GetPageContextService } from "../../routing/services/get-page-context.service";
import { PageContext } from "../../routing/models/page-context.model";

@Injectable()
export class CmsPageGuards implements CanActivate {
  constructor(
    private store: Store<fromStore.CmsState>,
    private getContextService: GetPageContextService,
    private defaultPageService: DefaultPageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    let pageContext = this.getContextService.getPageContext(route);
    return this.hasPage(pageContext).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  hasPage(pageContext: PageContext): Observable<boolean> {
    return this.store.select(fromStore.getPageEntities).pipe(
      map((entities: { [key: string]: Page }) => {
        let key = pageContext.id + "_" + pageContext.type;
        let found = !!entities[key];
        if (!found) {
          let defaultPageIds = this.defaultPageService.getDefaultPageIdsBytype(
            pageContext.type
          );
          if (defaultPageIds) {
            for (var i = 0, len = defaultPageIds.length; i < len; i++) {
              key = defaultPageIds[i] + "_" + pageContext.type;
              found = !!entities[key];
              if (found) break;
            }
          }
        }
        if (found) {
          this.store.dispatch(new fromStore.UpdateLatestPageKey(key));
        }
        return found;
      }),
      tap(found => {
        if (!found) {
          this.store.dispatch(new fromStore.LoadPageData(pageContext));
        }
      }),
      filter(found => found),
      take(1)
    );
  }
}
