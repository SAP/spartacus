import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import * as ConfiguratorActions from '../actions/configurator-textfield.action';
import {
  CONFIGURATION_FEATURE,
  StateWithConfiguration,
} from '../configuration-textfield-state';
import * as fromReducers from '../reducers/index';
import { ConfiguratorTextFieldSelectors } from './index';

describe('ConfiguratorTextfieldSelectors', () => {
  let store: Store<StateWithConfiguration>;
  const configuration: ConfiguratorTextfield.Configuration = {
    configurationInfos: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_FEATURE,
          fromReducers.getConfiguratorReducers()
        ),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithConfiguration>>);
  });

  it('should return empty content when selecting with content selector initially', () => {
    let result: ConfiguratorTextfield.Configuration;
    store
      .pipe(select(ConfiguratorTextFieldSelectors.getConfigurationContent))
      .subscribe(value => (result = value));

    expect(result).toEqual(null);
  });

  it('should return content from state when selecting with content selector', () => {
    let result: ConfiguratorTextfield.Configuration;
    store.dispatch(
      new ConfiguratorActions.CreateConfigurationSuccess(configuration)
    );

    store
      .pipe(select(ConfiguratorTextFieldSelectors.getConfigurationContent))
      .subscribe(value => (result = value));

    expect(result).toEqual(configuration);
  });
});
