import { Configurator } from '../../../../model/configurator.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import {
  ConfiguratorAction,
  CreateConfigurationSuccess,
  ReadCartEntryConfigurationSuccess,
  ReadConfigurationSuccess,
  RemoveConfiguration,
  UpdateCartEntry,
  UpdateCartEntrySuccess,
  UpdateConfiguration,
  UpdateConfigurationFail,
  UpdateConfigurationFinalizeSuccess,
  UpdateConfigurationSuccess,
} from './../actions/configurator.action';
import * as StateReduce from './configurator.reducer';
const productCode = 'CONF_LAPTOP';
const owner: GenericConfigurator.Owner = {
  type: GenericConfigurator.OwnerType.PRODUCT,
  id: productCode,
};
const configuration: Configurator.Configuration = {
  configId: 'ds',
  productCode: productCode,
  owner: owner,
  isCartEntryUpdateRequired: false,
};

describe('Configurator reducer', () => {
  describe('Undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = StateReduce;
      const action = {} as any;
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('CreateConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action: ConfiguratorAction = new CreateConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(configuration);
    });
  });
  describe('ReadCartEntryConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action: ConfiguratorAction = new ReadCartEntryConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(configuration);
    });
  });
  describe('ReadConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action: ConfiguratorAction = new ReadConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(configuration);
    });
  });
  describe('UpdateConfigurationSuccess action', () => {
    it('should not put configuration into the state because first we need to check for pending changes', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorAction = new UpdateConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('UpdateConfigurationFail action', () => {
    it('should not put configuration into the state', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorAction = new UpdateConfigurationFail({
        configuration: configuration,
        error: null,
      });
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('UpdateConfiguration action', () => {
    it('should not put configuration into the state because it is only triggering the update process', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorAction = new UpdateConfiguration(configuration);
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('UpdateConfigurationFinalizeSuccess action', () => {
    it('should put configuration into the state', () => {
      const action: ConfiguratorAction = new UpdateConfigurationFinalizeSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state.owner).toEqual(configuration.owner);
      expect(state.configId).toEqual(configuration.configId);
      expect(state.productCode).toEqual(configuration.productCode);
    });

    it('should set attribute that states that a cart update is required', () => {
      const action: ConfiguratorAction = new UpdateConfigurationFinalizeSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state.isCartEntryUpdateRequired).toEqual(true);
    });

    it('should remove the overview facet in order to trigger a re-read later on', () => {
      const action: ConfiguratorAction = new UpdateConfigurationFinalizeSuccess(
        configuration
      );
      const configurationWithOverview: Configurator.Configuration = {
        configId: 'A',
        overview: {},
      };
      const state = StateReduce.reducer(configurationWithOverview, action);

      expect(state.overview).toBeUndefined();
    });
  });

  describe('UpdateCartEntry action', () => {
    it('should set attribute that states that a cart update is not required anymore but an backend update is pending', () => {
      const params: Configurator.UpdateConfigurationForCartEntryParameters = {
        configuration: configuration,
      };
      const action: ConfiguratorAction = new UpdateCartEntry(params);
      const state = StateReduce.reducer(undefined, action);

      expect(state.isCartEntryUpdateRequired).toEqual(false);
      expect(state.isCartEntryUpdatePending).toEqual(true);
    });
  });

  describe('UpdateCartEntrySuccess action', () => {
    it('should remove attribute that states that an backend update is pending', () => {
      const action: ConfiguratorAction = new UpdateCartEntrySuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state.isCartEntryUpdatePending).toEqual(false);
    });
  });

  describe('RemoveConfiguration action', () => {
    it('should set the initial state', () => {
      const action1: ConfiguratorAction = new ReadConfigurationSuccess(
        configuration
      );
      let state = StateReduce.reducer(undefined, action1);

      expect(state.configId).toEqual('ds');

      const action2: ConfiguratorAction = new RemoveConfiguration({
        ownerKey: configuration.productCode,
      });
      state = StateReduce.reducer(undefined, action2);

      expect(state.configId).toEqual('');
    });
  });
});
