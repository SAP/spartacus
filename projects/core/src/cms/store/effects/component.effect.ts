import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  groupBy,
  map,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';
import { CmsComponent } from '../../../model/cms.model';
import { RoutingService } from '../../../routing/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CmsComponentConnector } from '../../connectors/component/cms-component.connector';
import { CmsActions } from '../actions/index';

@Injectable()
export class ComponentEffects {
  constructor(
    private actions$: Actions,
    private cmsComponentLoader: CmsComponentConnector,
    private routingService: RoutingService
  ) {}

  @Effect()
  loadComponent$: Observable<
    | CmsActions.LoadCmsComponentSuccess<CmsComponent>
    | CmsActions.LoadCmsComponentFail
  > = this.actions$.pipe(
    ofType(CmsActions.LOAD_CMS_COMPONENT),
    map((action: CmsActions.LoadCmsComponent) => action.payload),
    groupBy(uid => uid),
    mergeMap(group =>
      group.pipe(
        switchMap(uid =>
          this.routingService.getRouterState().pipe(
            filter(routerState => routerState !== undefined),
            map(routerState => routerState.state.context),
            take(1),
            mergeMap(pageContext =>
              this.cmsComponentLoader.get(uid, pageContext).pipe(
                map(data => new CmsActions.LoadCmsComponentSuccess(data, uid)),
                catchError(error =>
                  of(
                    new CmsActions.LoadCmsComponentFail(
                      uid,
                      makeErrorSerializable(error)
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}
