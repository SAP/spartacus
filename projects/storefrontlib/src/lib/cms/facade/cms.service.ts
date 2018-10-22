import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import { filter, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  constructor(private store: Store<fromStore.CmsState>) {}

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
}
