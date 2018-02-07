import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as componentActions from '../actions/component.action';
import * as fromServices from '../../services';
import { OccCmsService } from '../../services/occ-cms.service';

@Injectable()
export class ComponentEffects {
  @Effect()
  loadComponent$: Observable<any> = this.actions$
    .ofType(componentActions.LOAD_COMPONENT)
    .pipe(
      map((action: componentActions.LoadComponent) => action.payload),
      switchMap(uid => {
        return this.occCmsService
          .loadComponent(uid)
          .pipe(
            map(data => new componentActions.LoadComponentSuccess(data)),
            catchError(error =>
              of(new componentActions.LoadComponentFail(error))
            )
          );
      })
    );

  constructor(
    private actions$: Actions,
    private occCmsService: fromServices.OccCmsService
  ) {}
}
