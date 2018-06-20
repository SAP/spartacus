import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  filter,
  mergeMap,
  take
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRouting from '../../../routing/store';

import * as componentActions from '../actions/component.action';
import * as fromServices from '../../services';

@Injectable()
export class ComponentEffects {
  @Effect()
  loadComponent$: Observable<any> = this.actions$
    .ofType(componentActions.LOAD_COMPONENT)
    .pipe(
      map((action: componentActions.LoadComponent) => action.payload),
      switchMap(uid => {
        return this.routingStore
          .select(fromRouting.getRouterState)
          .pipe(
            filter(routerState => routerState !== undefined),
            map(routerState => routerState.state.context),
            take(1),
            mergeMap(pageContext =>
              this.occCmsService
                .loadComponent(uid, pageContext)
                .pipe(
                  map(data => new componentActions.LoadComponentSuccess(data)),
                  catchError(error =>
                    of(new componentActions.LoadComponentFail(error))
                  )
                )
            )
          );
      })
    );

  constructor(
    private actions$: Actions,
    private occCmsService: fromServices.OccCmsService,
    private routingStore: Store<fromRouting.State>
  ) {}
}
