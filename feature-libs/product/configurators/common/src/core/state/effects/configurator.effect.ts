import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  Configurator,
  ConfiguratorCommonsConnector,
  GenericConfigUtilsService,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  switchMapTo,
  take,
} from 'rxjs/operators';
import { ConfiguratorActions } from '../actions/index';
import { StateWithConfiguration } from '../configuration-state';
import { ConfiguratorSelectors } from '../selectors/index';
import { ConfiguratorUtilsService } from './../../facade/utils/configurator-utils.service';

@Injectable()
/**
 * Common configurator effects, used for complex configurators like variant configurator
 * and CPQ
 */
export class ConfiguratorEffects {
  @Effect()
  createConfiguration$: Observable<
    | ConfiguratorActions.CreateConfigurationSuccess
    | ConfiguratorActions.CreateConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.CREATE_CONFIGURATION),
    mergeMap((action: ConfiguratorActions.CreateConfiguration) => {
      return this.configuratorCommonsConnector
        .createConfiguration(action.payload.id)
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            this.store.dispatch(
              new ConfiguratorActions.UpdatePriceSummary(configuration)
            );

            return [
              new ConfiguratorActions.CreateConfigurationSuccess(configuration),
            ];
          }),
          catchError((error) => [
            new ConfiguratorActions.CreateConfigurationFail({
              ownerKey: action.payload.key,
              error: normalizeHttpError(error),
            }),
          ])
        );
    })
  );

  @Effect()
  readConfiguration$: Observable<
    | ConfiguratorActions.ReadConfigurationSuccess
    | ConfiguratorActions.ReadConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.READ_CONFIGURATION),

    mergeMap((action: ConfiguratorActions.ReadConfiguration) => {
      return this.configuratorCommonsConnector
        .readConfiguration(
          action.payload.configuration.configId,
          action.payload.groupId,
          action.payload.configuration.owner
        )
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            return [
              new ConfiguratorActions.ReadConfigurationSuccess(configuration),
            ];
          }),
          catchError((error) => [
            new ConfiguratorActions.ReadConfigurationFail({
              ownerKey: action.payload.configuration.owner.key,
              error: normalizeHttpError(error),
            }),
          ])
        );
    })
  );

  @Effect()
  updateConfiguration$: Observable<
    | ConfiguratorActions.UpdateConfigurationSuccess
    | ConfiguratorActions.UpdateConfigurationFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_CONFIGURATION),
    map((action: ConfiguratorActions.UpdateConfiguration) => action.payload),
    //mergeMap here as we need to process each update
    //(which only sends one changed attribute at a time),
    //so we must not cancel inner emissions
    mergeMap((payload: Configurator.Configuration) => {
      return this.configuratorCommonsConnector
        .updateConfiguration(payload)
        .pipe(
          map((configuration: Configurator.Configuration) => {
            return new ConfiguratorActions.UpdateConfigurationSuccess(
              configuration
            );
          }),
          catchError((error) => {
            const errorPayload = normalizeHttpError(error);
            return [
              new ConfiguratorActions.UpdateConfigurationFail({
                configuration: payload,
                error: errorPayload,
              }),
            ];
          })
        );
    })
  );

  @Effect()
  updatePriceSummary$: Observable<
    | ConfiguratorActions.UpdatePriceSummarySuccess
    | ConfiguratorActions.UpdatePriceSummaryFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_PRICE_SUMMARY),
    map(
      (action: { type: string; payload?: Configurator.Configuration }) =>
        action.payload
    ),
    mergeMap((payload) => {
      return this.configuratorCommonsConnector.readPriceSummary(payload).pipe(
        map((configuration: Configurator.Configuration) => {
          return new ConfiguratorActions.UpdatePriceSummarySuccess(
            configuration
          );
        }),
        catchError((error) => {
          const errorPayload = normalizeHttpError(error);
          return [
            new ConfiguratorActions.UpdatePriceSummaryFail({
              ownerKey: payload.owner.key,
              error: errorPayload,
            }),
          ];
        })
      );
    })
  );

  @Effect()
  getOverview$: Observable<
    | ConfiguratorActions.GetConfigurationOverviewSuccess
    | ConfiguratorActions.GetConfigurationOverviewFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.GET_CONFIGURATION_OVERVIEW),
    map(
      (action: ConfiguratorActions.GetConfigurationOverview) => action.payload
    ),
    mergeMap((payload) => {
      return this.configuratorCommonsConnector
        .getConfigurationOverview(payload.configId)
        .pipe(
          map((overview: Configurator.Overview) => {
            return new ConfiguratorActions.GetConfigurationOverviewSuccess({
              ownerKey: payload.owner.key,
              overview: overview,
            });
          }),
          catchError((error) => {
            const errorPayload = normalizeHttpError(error);
            return [
              new ConfiguratorActions.GetConfigurationOverviewFail({
                ownerKey: payload.owner.key,
                error: errorPayload,
              }),
            ];
          })
        );
    })
  );

  @Effect()
  updateConfigurationSuccess$: Observable<
    | ConfiguratorActions.UpdateConfigurationFinalizeSuccess
    | ConfiguratorActions.UpdatePriceSummary
    | ConfiguratorActions.ChangeGroup
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS),
    map(
      (action: ConfiguratorActions.UpdateConfigurationSuccess) => action.payload
    ),
    mergeMap((payload: Configurator.Configuration) => {
      return this.store.pipe(
        select(ConfiguratorSelectors.hasPendingChanges(payload.owner.key)),
        take(1),
        filter((hasPendingChanges) => hasPendingChanges === false),
        switchMapTo(
          this.store.pipe(
            select(ConfiguratorSelectors.getCurrentGroup(payload.owner.key)),
            take(1),
            map((currentGroupId) => {
              const groupIdFromPayload = this.getGroupWithAttributes(
                payload.groups
              );
              const parentGroupFromPayload = this.configuratorGroupUtilsService.getParentGroup(
                payload.groups,
                this.configuratorGroupUtilsService.getGroupById(
                  payload.groups,
                  groupIdFromPayload
                ),
                null
              );
              return {
                currentGroupId,
                groupIdFromPayload,
                parentGroupFromPayload,
              };
            }),
            switchMap((container) => {
              //changeGroup because in cases where a queue of updates exists with a group navigation in between,
              //we need to ensure that the last update determines the current group.
              const updateFinalizeSuccessAction = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
                payload
              );
              const updatePriceSummaryAction = new ConfiguratorActions.UpdatePriceSummary(
                payload
              );
              return container.currentGroupId === container.groupIdFromPayload
                ? [updateFinalizeSuccessAction, updatePriceSummaryAction]
                : [
                    updateFinalizeSuccessAction,
                    updatePriceSummaryAction,
                    new ConfiguratorActions.ChangeGroup({
                      configuration: payload,
                      groupId: container.groupIdFromPayload,
                      parentGroupId: container.parentGroupFromPayload?.id,
                    }),
                  ];
            })
          )
        )
      );
    })
  );

  @Effect()
  updateConfigurationFail$: Observable<
    ConfiguratorActions.UpdateConfigurationFinalizeFail
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_CONFIGURATION_FAIL),
    map(
      (action: ConfiguratorActions.UpdateConfigurationFail) => action.payload
    ),
    mergeMap((payload) => {
      return this.store.pipe(
        select(
          ConfiguratorSelectors.hasPendingChanges(
            payload.configuration.owner.key
          )
        ),
        take(1),
        filter((hasPendingChanges) => hasPendingChanges === false),
        map(
          () =>
            new ConfiguratorActions.UpdateConfigurationFinalizeFail(
              payload.configuration
            )
        )
      );
    })
  );

  @Effect()
  handleErrorOnUpdate$: Observable<
    ConfiguratorActions.ReadConfiguration
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.UPDATE_CONFIGURATION_FINALIZE_FAIL),
    map(
      (action: ConfiguratorActions.UpdateConfigurationFinalizeFail) =>
        action.payload
    ),
    map(
      (payload) =>
        new ConfiguratorActions.ReadConfiguration({
          configuration: payload,
          groupId: undefined,
        })
    )
  );

  @Effect()
  groupChange$: Observable<
    | ConfiguratorActions.SetCurrentGroup
    | ConfiguratorActions.SetMenuParentGroup
    | ConfiguratorActions.ReadConfigurationFail
    | ConfiguratorActions.ReadConfigurationSuccess
  > = this.actions$.pipe(
    ofType(ConfiguratorActions.CHANGE_GROUP),
    switchMap((action: ConfiguratorActions.ChangeGroup) => {
      return this.store.pipe(
        select(
          ConfiguratorSelectors.hasPendingChanges(
            action.payload.configuration.owner.key
          )
        ),
        take(1),
        filter((hasPendingChanges) => hasPendingChanges === false),
        switchMap(() => {
          return this.configuratorCommonsConnector
            .readConfiguration(
              action.payload.configuration.configId,
              action.payload.groupId,
              action.payload.configuration.owner
            )
            .pipe(
              switchMap((configuration: Configurator.Configuration) => {
                return [
                  new ConfiguratorActions.SetCurrentGroup({
                    entityKey: action.payload.configuration.owner.key,
                    currentGroup: action.payload.groupId,
                  }),
                  new ConfiguratorActions.SetMenuParentGroup({
                    entityKey: action.payload.configuration.owner.key,
                    menuParentGroup: action.payload.parentGroupId,
                  }),
                  new ConfiguratorActions.ReadConfigurationSuccess(
                    configuration
                  ),
                ];
              }),
              catchError((error) => [
                new ConfiguratorActions.ReadConfigurationFail({
                  ownerKey: action.payload.configuration.owner.key,
                  error: normalizeHttpError(error),
                }),
              ])
            );
        })
      );
    })
  );

  getGroupWithAttributes(groups: Configurator.Group[]): string {
    const groupWithAttributes: Configurator.Group = groups
      .filter((currentGroup) => currentGroup.attributes.length > 0)
      .pop();
    let id: string;
    if (groupWithAttributes) {
      id = groupWithAttributes.id;
    } else {
      id = groups
        .filter((currentGroup) => currentGroup.subGroups.length > 0)
        .flatMap((currentGroup) =>
          this.getGroupWithAttributes(currentGroup.subGroups)
        )
        .filter((groupId) => groupId) //Filter undefined strings
        .pop();
    }
    return id;
  }

  constructor(
    protected actions$: Actions,
    protected configuratorCommonsConnector: ConfiguratorCommonsConnector,
    protected genericConfigUtilsService: GenericConfigUtilsService,
    protected configuratorGroupUtilsService: ConfiguratorUtilsService,
    protected store: Store<StateWithConfiguration>
  ) {}
}
