import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Configuration } from 'projects/core/src/model/configurator.model';
import { Observable, of } from 'rxjs';
import * as fromConfigurationReducers from '../../store/reducers/index';
import { ConfiguratorActions } from '../actions';
import { CONFIGURATION_FEATURE } from '../configuration-state';
import { ConfiguratorCommonsConnector } from './../../connectors/configurator-commons.connector';
import * as fromEffects from './configurator.effect';

const productCode = 'CONF_LAPTOP';
const productConfiguration: Configuration = {
  productCode: productCode,
  complete: true,
  consistent: true,
};

class MockConnector {
  createConfiguration(): Observable<Configuration> {
    return of(productConfiguration);
  }
}

describe('ConfiguratorEffect', () => {
  let configEffects: fromEffects.ConfiguratorEffects;

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
        {
          provide: ConfiguratorCommonsConnector,
          useClass: MockConnector,
        },
      ],
    });

    configEffects = TestBed.get(fromEffects.ConfiguratorEffects as Type<
      fromEffects.ConfiguratorEffects
    >);
  });

  it('should provide configuration effects', () => {
    expect(configEffects).toBeTruthy();
  });

  it('should a success action with content for an action of type createConfiguration', () => {
    const payloadInput = { productCode: productCode };
    const action = new ConfiguratorActions.CreateConfiguration(payloadInput);

    const completion = new ConfiguratorActions.CreateConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('must not emit anything in case source action is not covered ', () => {
    const payloadInput = { productCode: productCode };
    const action = new ConfiguratorActions.CreateConfigurationSuccess(
      payloadInput
    );
    actions$ = hot('-a', { a: action });

    configEffects.createConfiguration$.subscribe(emitted => fail(emitted));
  });
});
