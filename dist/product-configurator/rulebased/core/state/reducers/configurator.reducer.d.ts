import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';
export declare const initialState: Configurator.Configuration;
export declare const initialStatePendingChanges = 0;
export declare function configuratorReducer(state: Configurator.Configuration | undefined, action: ConfiguratorActions.ConfiguratorAction | ConfiguratorActions.ConfiguratorCartAction | ConfiguratorActions.ConfiguratorVariantAction): Configurator.Configuration;
