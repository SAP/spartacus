import { Injectable } from '@angular/core';

import * as fromStore from '../store';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(private store: Store<fromStore.RouterState>) {}

  public go(path: string, query: any) {
    this.store.dispatch(
      new fromStore.Go({
        path: [path, query]
      })
    );
  }
}
