import { Injectable } from '@angular/core';
import * as fromStore from '../store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavigationExtras } from '@angular/router';
import { UrlTranslatorService } from '../configurable-routes/url-translator/url-translator.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  readonly routerState$: Observable<any> = this.store.pipe(
    select(fromStore.getRouterState)
  );

  readonly redirectUrl$: Observable<string> = this.store.pipe(
    select(fromStore.getRedirectUrl)
  );

  constructor(
    private store: Store<fromStore.RouterState>,
    private urlTranslator: UrlTranslatorService
  ) {}

  public go(path: any[], query?: object, extras?: NavigationExtras) {
    this.store.dispatch(
      new fromStore.Go({
        path,
        query,
        extras
      })
    );
  }

  public goToPage(
    nestedRoutesNames: string[],
    nestedRoutesParams?: object[],
    query?: object,
    extras?: NavigationExtras
  ) {
    const path = this.urlTranslator.translate(
      nestedRoutesNames,
      nestedRoutesParams
    );
    this.go(path, query, extras);
  }

  back() {
    const isLastPageInApp =
      document.referrer.indexOf(window.location.origin) > -1;
    if (isLastPageInApp) {
      this.store.dispatch(new fromStore.Back());
      return;
    }
    this.go(['/']);
    return;
  }

  forward() {
    this.store.dispatch(new fromStore.Forward());
  }

  clearRedirectUrl() {
    this.store.dispatch(new fromStore.ClearRedirectUrl());
  }

  saveRedirectUrl(url: string) {
    this.store.dispatch(new fromStore.SaveRedirectUrl(url));
  }
}
