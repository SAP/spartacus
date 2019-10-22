import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { makeErrorSerializable } from '../../../../util/serialization-utils';
import * as fromConfigurationReducers from '../../store/reducers/index';
import * as ConfiguratorActions from '../actions/configurator.action';
import { CONFIGURATION_FEATURE } from '../configuration-state';
import { Configurator } from './../../../../model/configurator.model';
import { ConfiguratorCommonsConnector } from './../../connectors/configurator-commons.connector';
import * as fromEffects from './configurator.effect';

const productCode = 'CONF_LAPTOP';
const configId = '1234-56-7890';
const productConfiguration: Configurator.Configuration = {
  configId: 'a',
  productCode: productCode,
  complete: true,
  consistent: true,
};

describe('ConfiguratorEffect', () => {
  let createMock: jasmine.Spy;
  let configEffects: fromEffects.ConfiguratorEffects;

  let actions$: Observable<any>;

  beforeEach(() => {
    createMock = jasmine.createSpy().and.returnValue(of(productConfiguration));
    class MockConnector {
      createConfiguration = createMock;

      readConfiguration(): Observable<Configurator.Configuration> {
        return of(productConfiguration);
      }

      updateConfiguration(): Observable<Configurator.Configuration> {
        return of(productConfiguration);
      }
    }
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_FEATURE,
          fromConfigurationReducers.getConfiguratorReducers()
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

  it('must not emit anything in case source action is not covered, createConfiguration', () => {
    const payloadInput = { productCode: productCode };
    const action = new ConfiguratorActions.CreateConfigurationSuccess(
      payloadInput
    );
    actions$ = hot('-a', { a: action });

    configEffects.createConfiguration$.subscribe(emitted => fail(emitted));
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

  it('should emit a success action with content for an action of type readConfiguration', () => {
    const payloadInput = { configId: configId };
    const action = new ConfiguratorActions.ReadConfiguration(payloadInput);

    const completion = new ConfiguratorActions.ReadConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configEffects.readConfiguration$).toBeObservable(expected);
  });

  it('must not emit anything in case source action is not covered, readConfiguration', () => {
    const payloadInput = { configId: configId };
    const action = new ConfiguratorActions.ReadConfigurationSuccess(
      payloadInput
    );
    actions$ = hot('-a', { a: action });

    configEffects.readConfiguration$.subscribe(emitted => fail(emitted));
  });

  it('should emit a success action with content for an action of type updateConfiguration', () => {
    const payloadInput = productConfiguration;
    const action = new ConfiguratorActions.UpdateConfiguration(payloadInput);

    const completion = new ConfiguratorActions.UpdateConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configEffects.updateConfiguration$).toBeObservable(expected);
  });

  it('must not emit anything in case source action is not covered, updateConfiguration', () => {
    const payloadInput = productConfiguration;
    const action = new ConfiguratorActions.UpdateConfigurationSuccess(
      payloadInput
    );
    actions$ = hot('-a', { a: action });

    configEffects.updateConfiguration$.subscribe(emitted => fail(emitted));
  });
});
