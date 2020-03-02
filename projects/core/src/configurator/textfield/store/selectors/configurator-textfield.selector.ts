import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import {
  ConfigurationTextfieldLoaderState,
  CONFIGURATION_TEXTFIELD_FEATURE,
  StateWithConfigurationTextfield,
} from '../configuration-textfield-state';

const getConfigurationContentSelector = (
  state: ConfigurationTextfieldLoaderState
) => state.active.value.content;

const getConfigurationsState: MemoizedSelector<
  StateWithConfigurationTextfield,
  ConfigurationTextfieldLoaderState
> = createFeatureSelector<ConfigurationTextfieldLoaderState>(
  CONFIGURATION_TEXTFIELD_FEATURE
);

export const getConfigurationContent: MemoizedSelector<
  StateWithConfigurationTextfield,
  ConfiguratorTextfield.Configuration
> = createSelector(getConfigurationsState, getConfigurationContentSelector);
