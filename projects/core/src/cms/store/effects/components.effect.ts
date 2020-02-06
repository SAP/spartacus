import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { from, merge, Observable, of } from 'rxjs';
import { catchError, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthActions } from '../../../auth/store/actions/index';
import { FeatureConfigService } from '../../../features-config/services/feature-config.service';
import { CmsComponent } from '../../../model/cms.model';
import { PageContext } from '../../../routing/index';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { bufferDebounceTime } from '../../../util/buffer-debounce-time';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { withdrawOn } from '../../../util/withdraw-on';
import { CmsComponentConnector } from '../../connectors/component/cms-component.connector';
import { serializePageContext } from '../../utils/cms-utils';
import { CmsActions } from '../actions/index';

@Injectable()
export class ComponentsEffects {
  constructor(
    private actions$: Actions,
    private cmsComponentLoader: CmsComponentConnector,
    private featureConfigService: FeatureConfigService
  ) {}

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
        ofType<CmsActions.LoadCmsComponent>(CmsActions.LOAD_CMS_COMPONENT),
        groupBy(actions => serializePageContext(actions.payload.pageContext)),
        mergeMap(actionGroup =>
          actionGroup.pipe(
            bufferDebounceTime(debounce, scheduler),
            mergeMap(actions =>
              this.loadComponentsEffect(
                actions.map(action => action.payload.uid),
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
    // TODO: remove, deprecated behavior since 1.4
    if (!this.featureConfigService.isLevel('1.4')) {
      return merge(
        ...componentUids.map(uid =>
          this.cmsComponentLoader.get(uid, pageContext).pipe(
            map(
              component =>
                new CmsActions.LoadCmsComponentSuccess({
                  component,
                  uid: component.uid,
                  pageContext,
                })
            ),
            catchError(error =>
              of(
                new CmsActions.LoadCmsComponentFail({
                  uid,
                  error: makeErrorSerializable(error),
                  pageContext,
                })
              )
            )
          )
        )
      );
    }
    // END OF (TODO: remove, deprecated behavior since 1.4)

    return this.cmsComponentLoader.getList(componentUids, pageContext).pipe(
      switchMap(components =>
        from(
          components.map(
            component =>
              new CmsActions.LoadCmsComponentSuccess({
                component,
                uid: component.uid,
                pageContext,
              })
          )
        )
      ),
      catchError(error =>
        from(
          componentUids.map(
            uid =>
              new CmsActions.LoadCmsComponentFail({
                uid,
                error: makeErrorSerializable(error),
                pageContext,
              })
          )
        )
      )
    );
  }
}
