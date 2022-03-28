import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { catchError, groupBy, mergeMap, switchMap } from 'rxjs/operators';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import { CmsComponent } from '../../../model/cms.model';
import { PageContext } from '../../../routing/index';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { bufferDebounceTime } from '../../../util/rxjs/buffer-debounce-time';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { withdrawOn } from '../../../util/rxjs/withdraw-on';
import { CmsComponentConnector } from '../../connectors/component/cms-component.connector';
import { serializePageContext } from '../../utils/cms-utils';
import { CmsActions } from '../actions/index';

@Injectable()
export class ComponentsEffects {
  constructor(
    private actions$: Actions,
    private cmsComponentConnector: CmsComponentConnector
  ) {}

  private contextChange$: Observable<Action> = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      AuthActions.LOGOUT,
      AuthActions.LOGIN
    )
  );

  loadComponent$ = createEffect(
    () =>
      ({ scheduler, debounce = 0 } = {}): Observable<
        | CmsActions.LoadCmsComponentSuccess<CmsComponent>
        | CmsActions.LoadCmsComponentFail
      > =>
        this.actions$.pipe(
          ofType<CmsActions.LoadCmsComponent>(CmsActions.LOAD_CMS_COMPONENT),
          groupBy((actions) =>
            serializePageContext(actions.payload.pageContext)
          ),
          mergeMap((actionGroup) =>
            actionGroup.pipe(
              bufferDebounceTime(debounce, scheduler),
              mergeMap((actions) =>
                this.loadComponentsEffect(
                  actions.map((action) => action.payload.uid),
                  actions[0].payload.pageContext
                )
              )
            )
          ),
          withdrawOn(this.contextChange$)
        )
  );

  private loadComponentsEffect(
    componentUids: string[],
    pageContext: PageContext
  ): Observable<
    | CmsActions.LoadCmsComponentSuccess<CmsComponent>
    | CmsActions.LoadCmsComponentFail
  > {
    return this.cmsComponentConnector.getList(componentUids, pageContext).pipe(
      switchMap((components) => {
        const actions: (
          | CmsActions.LoadCmsComponentSuccess<CmsComponent>
          | CmsActions.LoadCmsComponentFail
        )[] = [];
        const uidsLeft = new Set<string>(componentUids);
        for (const component of components) {
          actions.push(
            new CmsActions.LoadCmsComponentSuccess({
              component,
              uid: component.uid,
              pageContext,
            })
          );
          uidsLeft.delete(component.uid);
        }
        // we have to emit LoadCmsComponentFail for all component's uids that
        // are missing from the response
        uidsLeft.forEach((uid) => {
          actions.push(
            new CmsActions.LoadCmsComponentFail({
              uid,
              pageContext,
            })
          );
        });
        return from(actions);
      }),
      catchError((error) =>
        from(
          componentUids.map(
            (uid) =>
              new CmsActions.LoadCmsComponentFail({
                uid,
                error: normalizeHttpError(error),
                pageContext,
              })
          )
        )
      )
    );
  }
}
