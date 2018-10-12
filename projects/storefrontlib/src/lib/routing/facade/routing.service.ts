import { Injectable } from '@angular/core';
import * as fromStore from '../store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  readonly redirectUrl$: Observable<string> = this.store.pipe(
    select(fromStore.getRedirectUrl)
  );

  constructor(private store: Store<fromStore.RouterState>) {}

  public go(path: any[], query?: object, extras?: NavigationExtras) {
    this.store.dispatch(
      new fromStore.Go({
        path,
        query,
        extras
      })
    );
  }

  clearRedirectUrl() {
    this.store.dispatch(new fromStore.ClearRedirectUrl());
  }

  back() {
    this.store.dispatch(new fromStore.Back());
  }
}
