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
const GROUP_ID_1 = '1234-56-7891';
const ATTRIBUTE_NAME_1 = 'Attribute_1';
const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  groups: [
    {
      id: GROUP_ID_1,
      attributes: [
        {
          name: ATTRIBUTE_NAME_1,
          uiType: Configurator.UiType.STRING,
          userInput: null,
        },
      ],
    },
  ],
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

    spyOn(serviceUnderTest, 'mergeChangesToNewObject').and.callThrough();
    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'pipe').and.returnValue(of(productConfiguration));
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
      new ConfiguratorActions.CreateConfiguration(productCode)
    );
  });

  it('should read a configuration, accessing the store', () => {
    const configurationFromStore = serviceUnderTest.readConfiguration(
      CONFIG_ID,
      PRODUCT_CODE
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
        productCode: PRODUCT_CODE,
      })
    );
  });

  it('should update a configuration, accessing the store', () => {
    const changedAttribute: Configurator.Attribute = {
      name: 'changedAttribute',
    };

    serviceUnderTest.updateConfiguration(
      PRODUCT_CODE,
      GROUP_ID_1,
      changedAttribute
    );
    expect(serviceUnderTest.mergeChangesToNewObject).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.UpdateConfiguration(
        serviceUnderTest.mergeChangesToNewObject(
          GROUP_ID_1,
          changedAttribute,
          productConfiguration
        )
      )
    );
  });
});
