import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ProductConfiguration } from '../../../../model/configurator.model';
import { ConfiguratorCommonsConnector } from '../../connectors/configurator-commons.connector';
import {
  CreateConfiguration,
  CreateConfigurationFail,
  CreateConfigurationSuccess,
  CREATE_CONFIGURATION,
} from '../actions/configurator.action';

@Injectable()
export class ConfiguratorEffects {
  @Effect()
  createConfiguration$: Observable<
    CreateConfiguration | CreateConfigurationSuccess | CreateConfigurationFail
  > = this.actions$.pipe(
    ofType(CREATE_CONFIGURATION),
    map(
      (action: { type: string; payload?: { productCode: string } }) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.configuratorCommonsConnector
        .createConfiguration(payload.productCode)
        .pipe(
          switchMap((configuration: ProductConfiguration) => {
            return [new CreateConfigurationSuccess(configuration)];
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private configuratorCommonsConnector: ConfiguratorCommonsConnector
  ) {}
}
