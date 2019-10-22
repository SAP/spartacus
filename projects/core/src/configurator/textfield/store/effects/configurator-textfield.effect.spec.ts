import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import { makeErrorSerializable } from '../../../../util/serialization-utils';
import { ConfiguratorTextfieldConnector } from '../../connectors/configurator-textfield.connector';
import * as ConfiguratorActions from '../actions/configurator-textfield.action';
import { CONFIGURATION_TEXTFIELD_FEATURE } from '../configuration-textfield-state';
import * as reducers from '../reducers/index';
import * as fromEffects from './configurator-textfield.effect';

const productCode = 'CONF_LAPTOP';

const productConfiguration: ConfiguratorTextfield.Configuration = {
  attributes: [],
};

describe('ConfiguratorTextfieldEffect', () => {
  let createMock: jasmine.Spy;

  let configEffects: fromEffects.ConfiguratorTextfieldEffects;

  let actions$: Observable<any>;

  beforeEach(() => {
    createMock = jasmine.createSpy().and.returnValue(of(productConfiguration));
    class MockConnector {
      createConfiguration = createMock;
    }

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_TEXTFIELD_FEATURE,
          reducers.getConfiguratorTextfieldReducers()
        ),
      ],

      providers: [
        fromEffects.ConfiguratorTextfieldEffects,
        provideMockActions(() => actions$),
        {
          provide: ConfiguratorTextfieldConnector,
          useClass: MockConnector,
        },
      ],
    });

    configEffects = TestBed.get(
      fromEffects.ConfiguratorTextfieldEffects as Type<
        fromEffects.ConfiguratorTextfieldEffects
      >
    );
  });

  it('should provide configuration effects', () => {
    expect(configEffects).toBeTruthy();
  });

  it('should emit a success action with content for an action of type createConfiguration', () => {
    const payloadInput = { productCode: productCode };
    const action = new ConfiguratorActions.CreateConfiguration(payloadInput);

    const completion = new ConfiguratorActions.CreateConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('should emit a fail action in case something goes wrong', () => {
    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'notFound',
      status: 404,
    });
    createMock.and.returnValue(throwError(errorResponse));
    const payloadInput = { productCode: productCode };
    const action = new ConfiguratorActions.CreateConfiguration(payloadInput);

    const completionFailure = new ConfiguratorActions.CreateConfigurationFail(
      makeErrorSerializable(errorResponse)
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completionFailure });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('must not emit anything in case source action is not covered, createConfiguration', () => {
    const payloadInput = { productCode: productCode };
    const action = new ConfiguratorActions.CreateConfigurationSuccess(
      payloadInput
    );
    actions$ = hot('-a', { a: action });

    configEffects.createConfiguration$.subscribe(emitted => fail(emitted));
  });
});
