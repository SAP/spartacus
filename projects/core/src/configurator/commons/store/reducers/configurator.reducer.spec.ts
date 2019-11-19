import { Configurator } from '../../../../model/configurator.model';
import {
  ConfiguratorAction,
  CreateConfigurationSuccess,
  ReadConfigurationSuccess,
  RemoveConfiguration,
  UpdateConfiguration,
  UpdateConfigurationFail,
  UpdateConfigurationFinalizeSuccess,
  UpdateConfigurationSuccess,
} from './../actions/configurator.action';
import * as StateReduce from './configurator.reducer';

const configuration: Configurator.Configuration = {
  configId: 'ds',
  productCode: 'CONF_LAPTOP',
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
    it('should decrease pending changes counter', () => {
      const action: ConfiguratorAction = new UpdateConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducerPendingChanges(undefined, action);

      expect(state).toEqual(-1);
    });
  });
  describe('UpdateConfigurationFail action', () => {
    it('should not put configuration into the state', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorAction = new UpdateConfigurationFail(
        configuration.productCode,
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
    it('should decrease pending changes counter', () => {
      const action: ConfiguratorAction = new UpdateConfigurationFail(
        configuration.productCode,
        configuration
      );
      const state = StateReduce.reducerPendingChanges(undefined, action);

      expect(state).toEqual(-1);
    });
  });
  describe('UpdateConfiguration action', () => {
    it('should not put configuration into the state because it is only triggering the update process', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorAction = new UpdateConfiguration(configuration);
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
    it('should increase pending changes counter', () => {
      const action: ConfiguratorAction = new UpdateConfiguration(configuration);
      const state = StateReduce.reducerPendingChanges(undefined, action);

      expect(state).toEqual(1);
    });
  });
  describe('UpdateConfigurationFinalize action', () => {
    it('should put configuration into the state', () => {
      const action: ConfiguratorAction = new UpdateConfigurationFinalizeSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(configuration);
    });
  });
  describe('RemoveConfiguration action', () => {
    it('should set the initial state', () => {
      const action1: ConfiguratorAction = new ReadConfigurationSuccess(
        configuration
      );
      let state = StateReduce.reducer(undefined, action1);

      expect(state.configId).toEqual('ds');

      const action2: ConfiguratorAction = new RemoveConfiguration(
        configuration.productCode
      );
      state = StateReduce.reducer(undefined, action2);

      expect(state.configId).toEqual('');
    });
  });
});
