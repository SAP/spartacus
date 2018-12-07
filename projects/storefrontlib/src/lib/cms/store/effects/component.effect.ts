import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  filter,
  mergeMap,
  take
} from 'rxjs/operators';

import * as componentActions from '../actions/component.action';
import { OccCmsService } from '../../services/occ-cms.service';
import { RoutingService } from '@spartacus/core';

@Injectable()
export class ComponentEffects {
  @Effect()
  loadComponent$: Observable<any> = this.actions$.pipe(
    ofType(componentActions.LOAD_COMPONENT),
    map((action: componentActions.LoadComponent) => action.payload),
    switchMap(uid => {
      return this.routingService.getRouterState().pipe(
        filter(routerState => routerState !== undefined),
        map(routerState => routerState.state.context),
        take(1),
        mergeMap(pageContext =>
          this.occCmsService.loadComponent(uid, pageContext).pipe(
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
    private occCmsService: OccCmsService,
    private routingService: RoutingService
  ) {}
}
