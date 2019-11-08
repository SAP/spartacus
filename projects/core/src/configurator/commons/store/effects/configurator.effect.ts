import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';
import { Configurator } from '../../../../model/configurator.model';
import { makeErrorSerializable } from '../../../../util/serialization-utils';
import { ConfiguratorCommonsConnector } from '../../connectors/configurator-commons.connector';
import * as ConfiguratorSelectors from '../../store/selectors/configurator.selector';
import {
  CreateConfigurationFail,
  CreateConfigurationSuccess,
  CREATE_CONFIGURATION,
  ReadConfiguration,
  ReadConfigurationFail,
  ReadConfigurationSuccess,
  READ_CONFIGURATION,
  UpdateConfigurationFail,
  UpdateConfigurationFinalizeFail,
  UpdateConfigurationFinalizeSuccess,
  UpdateConfigurationSuccess,
  UPDATE_CONFIGURATION,
  UPDATE_CONFIGURATION_FAIL,
  UPDATE_CONFIGURATION_FINALIZE_FAIL,
  UPDATE_CONFIGURATION_SUCCESS,
} from '../actions/configurator.action';
import { StateWithConfiguration } from '../configuration-state';

@Injectable()
export class ConfiguratorEffects {
  @Effect()
  createConfiguration$: Observable<
    CreateConfigurationSuccess | CreateConfigurationFail
  > = this.actions$.pipe(
    ofType(CREATE_CONFIGURATION),
    map((action: { type: string; productCode?: string }) => action.productCode),
    mergeMap(productCode => {
      return this.configuratorCommonsConnector
        .createConfiguration(productCode)
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            return [new CreateConfigurationSuccess(configuration)];
          }),
          catchError(error => [
            new CreateConfigurationFail(
              productCode,
              makeErrorSerializable(error)
            ),
          ])
        );
    })
  );

  @Effect()
  readConfiguration$: Observable<
    ReadConfigurationSuccess | ReadConfigurationFail
  > = this.actions$.pipe(
    ofType(READ_CONFIGURATION),
    map(
      (action: {
        type: string;
        payload?: { configId: string; productCode: string; groupId: string };
      }) => action.payload
    ),
    mergeMap(payload => {
      return this.configuratorCommonsConnector
        .readConfiguration(payload.configId, payload.groupId)
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            return [new ReadConfigurationSuccess(configuration)];
          }),
          catchError(error => [
            new ReadConfigurationFail(
              [payload.productCode, payload.groupId],
              makeErrorSerializable(error)
            ),
          ])
        );
    })
  );

  @Effect()
  updateConfiguration$: Observable<
    UpdateConfigurationSuccess | UpdateConfigurationFail
  > = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION),
    map(
      (action: { type: string; payload?: Configurator.Configuration }) =>
        action.payload
    ),
    //mergeMap here as we need to process each update
    //(which only sends one changed attribute at a time),
    //so we must not cancel inner emissions
    mergeMap(payload => {
      return this.configuratorCommonsConnector
        .updateConfiguration(payload)
        .pipe(
          map((configuration: Configurator.Configuration) => {
            return new UpdateConfigurationSuccess(configuration);
          }),
          catchError(error => {
            const errorPayload = makeErrorSerializable(error);
            errorPayload.configId = payload.configId;
            return [
              new UpdateConfigurationFail(payload.productCode, errorPayload),
            ];
          })
        );
    })
  );

  @Effect()
  updateConfigurationSuccess$: Observable<
    UpdateConfigurationFinalizeSuccess
  > = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION_SUCCESS),
    map(
      (action: { type: string; payload?: Configurator.Configuration }) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getPendingChanges),
        take(1),
        filter(pendingChanges => pendingChanges === 0),
        map(_pendingChanges => new UpdateConfigurationFinalizeSuccess(payload))
      );
    })
  );

  @Effect()
  updateConfigurationFail$: Observable<
    UpdateConfigurationFinalizeFail
  > = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION_FAIL),
    map(
      (action: { type: string; payload?: Configurator.Configuration }) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.store.pipe(
        select(ConfiguratorSelectors.getPendingChanges),
        take(1),
        filter(pendingChanges => pendingChanges === 0),
        map(_pendingChanges => new UpdateConfigurationFinalizeFail(payload))
      );
    })
  );

  @Effect()
  handleErrorOnUpdate$: Observable<ReadConfiguration> = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION_FINALIZE_FAIL),
    map(
      (action: { type: string; payload?: Configurator.Configuration }) =>
        action.payload
    ),
    map(payload => new ReadConfiguration({ configId: payload.configId }))
  );

  constructor(
    private actions$: Actions,
    private configuratorCommonsConnector: ConfiguratorCommonsConnector,
    private store: Store<StateWithConfiguration>
  ) {}
}
