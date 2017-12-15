import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, catchError, switchMap } from "rxjs/operators";

import * as componentActions from "../actions/component.action";
import * as fromServices from "../../services";

@Injectable()
export class ComponentEffects {
  constructor(
    private actions$: Actions,
    private occCmsService: fromServices.OccCmsService
  ) {}

  @Effect()
  loadComponent$ = this.actions$.ofType(componentActions.LOAD_COMPONENT).pipe(
    map((action: componentActions.LoadComponent) => action.payload),
    switchMap(uid => {
      return this.occCmsService
        .loadComponent(uid)
        .pipe(
          map(res => new componentActions.LoadComponentSuccess(res.json())),
          catchError(error => of(new componentActions.LoadComponentFail(error)))
        );
    })
  );
}
