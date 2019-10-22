import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Configurator } from '../../../../model/configurator.model';
import { makeErrorSerializable } from '../../../../util/serialization-utils';
import { ConfiguratorCommonsConnector } from '../../connectors/configurator-commons.connector';
import {
  CreateConfiguration,
  CreateConfigurationFail,
  CreateConfigurationSuccess,
  CREATE_CONFIGURATION,
  ReadConfiguration,
  ReadConfigurationFail,
  ReadConfigurationSuccess,
  READ_CONFIGURATION,
  UpdateConfiguration,
  UpdateConfigurationFail,
  UpdateConfigurationSuccess,
  UPDATE_CONFIGURATION,
} from '../actions/configurator.action';

@Injectable()
export class ConfiguratorEffects {
  @Effect()
  createConfiguration$: Observable<
    CreateConfiguration | CreateConfigurationSuccess | CreateConfigurationFail
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
            new CreateConfigurationFail(makeErrorSerializable(error)),
          ])
        );
    })
  );

  @Effect()
  readConfiguration$: Observable<
    ReadConfiguration | ReadConfigurationSuccess | ReadConfigurationFail
  > = this.actions$.pipe(
    ofType(READ_CONFIGURATION),
    map(
      (action: {
        type: string;
        payload?: { configId: string; productCode: string };
      }) => action.payload
    ),
    mergeMap(payload => {
      return this.configuratorCommonsConnector
        .readConfiguration(payload.configId)
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            return [new ReadConfigurationSuccess(configuration)];
          }),
          catchError(error => [
            new ReadConfigurationFail(
              payload.productCode,
              makeErrorSerializable(error)
            ),
          ])
        );
    })
  );

  @Effect()
  updateConfiguration$: Observable<
    UpdateConfiguration | UpdateConfigurationSuccess | UpdateConfigurationFail
  > = this.actions$.pipe(
    ofType(UPDATE_CONFIGURATION),
    map(
      (action: { type: string; payload?: Configurator.Configuration }) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.configuratorCommonsConnector
        .updateConfiguration(payload)
        .pipe(
          switchMap((configuration: Configurator.Configuration) => {
            return [new UpdateConfigurationSuccess(configuration)];
          }),
          catchError(error => [
            new UpdateConfigurationFail(
              payload.productCode,
              makeErrorSerializable(error)
            ),
          ])
        );
    })
  );

  constructor(
    private actions$: Actions,
    private configuratorCommonsConnector: ConfiguratorCommonsConnector
  ) {}
}
