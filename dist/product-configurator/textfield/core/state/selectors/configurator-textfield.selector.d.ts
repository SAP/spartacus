import { MemoizedSelector } from '@ngrx/store';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
import { ConfigurationTextfieldState, StateWithConfigurationTextfield } from '../configuration-textfield-state';
export declare const getConfigurationsState: MemoizedSelector<StateWithConfigurationTextfield, ConfigurationTextfieldState>;
export declare const getConfigurationContent: MemoizedSelector<StateWithConfigurationTextfield, ConfiguratorTextfield.Configuration | undefined>;
