import {ErrorHandler, Injectable} from "@angular/core";
import {Actions, createEffect} from "@ngrx/effects";
import {filter, tap,} from "rxjs/operators";
import {EntityFailAction} from "../state/utils/entity-loader";
import {EntityScopedLoaderActions} from "../state/utils/scoped-loader/entity-scoped-loader.actions";
import EntityScopedFailAction = EntityScopedLoaderActions.EntityScopedFailAction;

@Injectable()
export class CxErrorHandlerEffect {

  error$ = createEffect(() =>
    this.actions$.pipe(
      filter((action) => action instanceof EntityFailAction || action instanceof EntityScopedFailAction),
      tap((_error) => {
        // this.errorHandler.handleError(_error);
      })
    ), {dispatch: false}
  );

  constructor(protected actions$: Actions,
              protected errorHandler: ErrorHandler) {
  }
}
