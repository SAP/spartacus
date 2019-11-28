import { Injectable } from '@angular/core';
import { Action, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsActions } from '../store/index';

@Injectable({
  providedIn: 'root',
})
export class CmsEventBuilder {
  constructor(protected actionsSubject: ActionsSubject) {}

  buildPageLoadEvent() {
    return this.create([CmsActions.LOAD_CMS_PAGE_DATA_SUCCESS]);
  }

  private create(actionTypes: string[]): Observable<any> {
    return this.actions(actionTypes).pipe(map((action: any) => action.payload));
  }

  private actions(actions: string[]): Observable<Action> {
    return this.actionsSubject.pipe(
      filter(data => actions.includes(data.type))
    );
  }
}
