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
    return this.store.pipe(
      select(fromStore.componentSelectorFactory(uid)),
      tap(componentData => {
        if (componentData === undefined) {
          this.store.dispatch(new fromStore.LoadComponent(uid));
        }
      }),
      filter(Boolean)
    );
  }
}
