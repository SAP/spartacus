import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
import * as ConfiguratorActions from '../actions/configurator-textfield.action';
import {
  CONFIGURATION_TEXTFIELD_FEATURE,
  StateWithConfigurationTextfield,
} from '../configuration-textfield-state';
import * as fromReducers from '../reducers/index';
import { ConfiguratorTextFieldSelectors } from './index';

describe('ConfiguratorTextfieldSelectors', () => {
  let store: Store<StateWithConfigurationTextfield>;
  const configuration: ConfiguratorTextfield.Configuration = {
    configurationInfos: [
      {
        configurationLabel: 'Colour',
        configurationValue: 'Black',
        status: ConfiguratorTextfield.ConfigurationStatus.SUCCESS,
      },
    ],
    owner: ConfiguratorModelUtils.createInitialOwner(),
  };
  const configurationInitial: ConfiguratorTextfield.Configuration = {
    configurationInfos: [],
    owner: ConfiguratorModelUtils.createInitialOwner(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_TEXTFIELD_FEATURE,
          fromReducers.getConfiguratorTextfieldReducers()
        ),
      ],
    });

    store = TestBed.inject(
      Store as Type<Store<StateWithConfigurationTextfield>>
    );
  });

  it('should return empty content when selecting with content selector initially', () => {
    let result;
    store
      .pipe(select(ConfiguratorTextFieldSelectors.getConfigurationContent))
      .subscribe((value) => {
        result = value;
        expect(result).toEqual(configurationInitial);
      });
  });

  it('should return content from state when selecting with content selector', () => {
    let result;
    store.dispatch(
      new ConfiguratorActions.CreateConfigurationSuccess(configuration)
    );

    store
      .pipe(select(ConfiguratorTextFieldSelectors.getConfigurationContent))
      .subscribe((value) => {
        result = value;
        expect(result).toEqual(configuration);
      });
  });
});
