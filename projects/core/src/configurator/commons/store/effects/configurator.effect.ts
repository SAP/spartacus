import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ProductConfiguration } from '../../../../model/configurator.model';
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
      const config: ProductConfiguration = {
        complete: true,
        consistent: true,
        productCode: payload.productCode,
      };
      return of(new CreateConfigurationSuccess(config));
    })
  );

  constructor(private actions$: Actions) {}
}
