import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import { filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  constructor(private store: Store<fromStore.CmsState>) {}

  getComponentData(
    uid: string,
    loadRequired: boolean = false
  ): Observable<any> {
    return this.store.select(fromStore.componentSelectorFactory(uid)).pipe(
      tap(componentData => {
        if (componentData === undefined && loadRequired) {
          this.store.dispatch(new fromStore.LoadComponent(uid));
        }
      }, filter(Boolean))
    );
  }
}
