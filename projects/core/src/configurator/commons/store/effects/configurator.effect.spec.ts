import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { ProductConfiguration } from 'projects/core/src/model/configurator.model';
import { Observable } from 'rxjs';
import * as fromConfigurationReducers from '../../store/reducers/index';
import { ConfiguratorActions } from '../actions';
import { CONFIGURATION_FEATURE } from '../configuration-state';
import * as fromEffects from './configurator.effect';

describe('ConfiguratorEffect', () => {
  let configEffects: fromEffects.ConfiguratorEffects;
  const productCode = 'CONF_LAPTOP';
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_FEATURE,
          fromConfigurationReducers.getReducers()
        ),
      ],

      providers: [
        fromEffects.ConfiguratorEffects,
        provideMockActions(() => actions$),
      ],
    });

    configEffects = TestBed.get(fromEffects.ConfiguratorEffects as Type<
      fromEffects.ConfiguratorEffects
    >);
  });
  it('should provide configuration effects', () => {
    expect(configEffects).toBeTruthy();
  });

  it('should create a configuration for a product', () => {
    const payloadInput = { productCode: productCode };
    const action = new ConfiguratorActions.CreateConfiguration(payloadInput);
    const payloadResult: ProductConfiguration = {
      complete: true,
      consistent: true,
      productCode: productCode,
    };
    const completion = new ConfiguratorActions.CreateConfigurationSuccess(
      payloadResult
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });
});
