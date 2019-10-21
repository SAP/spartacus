import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ConfiguratorTextfield } from '../../../model/configurator-textfield.model';
import * as ConfiguratorActions from '../store/actions/configurator-textfield.action';
import { StateWithConfigurationTextfield } from '../store/configuration-textfield-state';
import * as ConfiguratorSelectors from '../store/selectors/configurator-textfield.selector';
import { ConfiguratorTextfieldService } from './configurator-textfield.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const ATTRIBUTE_NAME = 'AttributeName';

const productConfiguration: ConfiguratorTextfield.Configuration = {
  attributes: [{ name: ATTRIBUTE_NAME }],
};

describe('ConfiguratorTextfieldService', () => {
  let serviceUnderTest: ConfiguratorTextfieldService;
  let store: Store<StateWithConfigurationTextfield>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [ConfiguratorTextfieldService],
    }).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.get(ConfiguratorTextfieldService as Type<
      ConfiguratorTextfieldService
    >);
    store = TestBed.get(Store as Type<Store<StateWithConfigurationTextfield>>);

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

    configurationFromStore.subscribe(configuration =>
      expect(configuration.attributes.length).toBe(1)
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.CreateConfiguration({
        productCode: PRODUCT_CODE,
      })
    );
  });

  it('should access the store with selector', () => {
    serviceUnderTest.createConfiguration(PRODUCT_CODE);

    expect(store.select).toHaveBeenCalledWith(
      ConfiguratorSelectors.getConfigurationContent
    );
  });
});
