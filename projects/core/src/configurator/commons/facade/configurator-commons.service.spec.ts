import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as ConfiguratorActions from '../store/actions/configurator.action';
import { StateWithConfiguration } from '../store/configuration-state';
import { Configurator } from './../../../model/configurator.model';
import { ConfiguratorCommonsService } from './configurator-commons.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '1234-56-7890';
const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
};

describe('ConfiguratorCommonsService', () => {
  let serviceUnderTest: ConfiguratorCommonsService;
  let store: Store<StateWithConfiguration>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [ConfiguratorCommonsService],
    }).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.get(ConfiguratorCommonsService as Type<
      ConfiguratorCommonsService
    >);
    store = TestBed.get(Store as Type<Store<StateWithConfiguration>>);

    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'select').and.returnValue(of(productConfiguration));
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
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
    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.CreateConfiguration({
        productCode: productCode,
      })
    );
  });

  it('should read a configuration, accessing the store', () => {
    const configurationFromStore = serviceUnderTest.readConfiguration(
      CONFIG_ID
    );

    expect(configurationFromStore).toBeDefined();
    let productCode: string;
    configurationFromStore.subscribe(
      configuration => (productCode = configuration.productCode)
    );
    expect(productCode).toBe(PRODUCT_CODE);
    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.ReadConfiguration({
        configId: CONFIG_ID,
      })
    );
  });

  it('should update a configuration, accessing the store', () => {
    const configurationFromStore = serviceUnderTest.updateConfiguration(
      productConfiguration
    );

    expect(configurationFromStore).toBeDefined();
    let productCode: string;
    configurationFromStore.subscribe(
      configuration => (productCode = configuration.productCode)
    );
    expect(productCode).toBe(PRODUCT_CODE);
    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.UpdateConfiguration(productConfiguration)
    );
  });
});
