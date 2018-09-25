import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  constructor(protected store: Store<fromStore.CmsState>) {}

  getComponentData(uid: string, shouldLoad: boolean): Observable<any> {
    return this.store.select(fromStore.componentSelectorFactory(uid)).pipe(
      tap(componentData => {
        if (componentData === undefined && shouldLoad) {
          this.store.dispatch(new fromStore.LoadComponent(uid));
        }
      }),
      filter(Boolean)
    );
  }
}
