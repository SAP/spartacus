import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { StateWithConfiguration } from '../store/configuration-state';
import { Configurator } from './../../../model/configurator.model';
import { ConfiguratorCommonsService } from './configurator-commons.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
class MockStore {
  dispatch() {}
  select(): Observable<Configurator.Configuration> {
    const productConfiguration: Configurator.Configuration = {
      configId: 'a',
      productCode: PRODUCT_CODE,
    };
    return of(productConfiguration);
  }
}
describe('ConfiguratorCommonsService', () => {
  let serviceUnderTest: ConfiguratorCommonsService;
  let store: Store<StateWithConfiguration>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],

      providers: [
        ConfiguratorCommonsService,
        {
          provide: Store,
          useClass: MockStore,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.get(ConfiguratorCommonsService as Type<
      ConfiguratorCommonsService
    >);
    store = TestBed.get(Store as Type<Store<StateWithConfiguration>>);
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
    expect(store).toBeDefined();
  });

  it('should create a configuration, accessing the store', () => {
    const configurationFromStore = serviceUnderTest.createConfiguration(
      PRODUCT_CODE
    );
    expect(configurationFromStore).toBeDefined();
    let productCode: string;
    configurationFromStore.subscribe(
      configuration => (productCode = configuration.productCode)
    );
    expect(productCode).toBe(PRODUCT_CODE);
  });
});
