import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { PageContext, RoutingService } from '../../../routing/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CmsComponentConnector } from '../../connectors/component/cms-component.connector';
import { CmsActions } from '../actions/index';
import { bufferDebounceTime } from '../../../util/buffer-debounce-time';
import { AuthActions } from '../../../auth/store/actions/index';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { withdrawOn } from '../../../util/withdraw-on';
import { Action } from '@ngrx/store';
import { CmsComponent } from '../../../model/cms.model';

@Injectable()
export class ComponentEffects {
  constructor(
    private actions$: Actions,
    private cmsComponentLoader: CmsComponentConnector,
    private routingService: RoutingService
  ) {}

  private currentPageContext$: Observable<
    PageContext
  > = this.routingService.getRouterState().pipe(
    filter(routerState => routerState !== undefined),
    map(routerState => routerState.state.context)
  );

  private contextChange$: Observable<Action> = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      AuthActions.LOGOUT,
      AuthActions.LOGIN
    )
  );

  loadComponent$ = createEffect(
    () => ({ scheduler, debounce = 0 } = {}): Observable<
      | CmsActions.LoadCmsComponentSuccess<CmsComponent>
      | CmsActions.LoadCmsComponentFail
    > =>
      this.actions$.pipe(
        ofType(CmsActions.LOAD_CMS_COMPONENT),
        map((action: CmsActions.LoadCmsComponent) => action.payload),
        bufferDebounceTime(debounce, scheduler),
        withLatestFrom(this.currentPageContext$),
        mergeMap(([componentUids, pageContext]) =>
          this.loadComponentsEffect(componentUids, pageContext)
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
    return this.cmsComponentLoader.getList(componentUids, pageContext).pipe(
      switchMap(components =>
        from(
          components.map(
            component =>
              new CmsActions.LoadCmsComponentSuccess(component, component.uid)
          )
        )
      ),
      catchError(error =>
        from(
          componentUids.map(
            uid =>
              new CmsActions.LoadCmsComponentFail(
                uid,
                makeErrorSerializable(error)
              )
          )
        )
      )
    );
  }
}
