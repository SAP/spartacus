import { StateLoaderActions } from '../../../../state/utils/index';
import { CONFIGURATION_DATA } from '../configuration-state';
import { ConfiguratorActions } from './index';

describe('ConfiguratorActions', () => {
  it('should provide create action with proper type', () => {
    const createAction = new ConfiguratorActions.CreateConfiguration({});
    expect(createAction.type).toBe(ConfiguratorActions.CREATE_CONFIGURATION);
  });

  it('should provide create action that carries productCode as a payload', () => {
    const productCode = 'CONF_LAPTOP';
    const createAction = new ConfiguratorActions.CreateConfiguration({
      productCode: productCode,
    });
    expect(createAction.payload.productCode).toBe(productCode);
  });

  describe('ReadConfiguration Actions', () => {
    describe('ReadConfiguration', () => {
      it('Should create the action', () => {
        const payload = {
          configId: '15468-5464-9852-54682',
        };
        const action = new ConfiguratorActions.ReadConfiguration(payload);
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION,
          payload: payload,
          meta: StateLoaderActions.loadMeta(CONFIGURATION_DATA),
        });
      });
    });

    describe('ReadConfigurationFail', () => {
      it('Should create the action', () => {
        const error = 'anError';
        const action = new ConfiguratorActions.ReadConfigurationFail(error);
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CONFIGURATION_DATA, error),
        });
      });
    });

    describe('ReadConfigurationSuccess', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.ReadConfigurationSuccess({});
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION_SUCCESS,
          payload: {},
          meta: StateLoaderActions.successMeta(CONFIGURATION_DATA),
        });
      });
    });
  });

  describe('UpdateConfiguration Actions', () => {
    describe('UpdateConfiguration', () => {
      it('Should create the action', () => {
        const payload = {
          configId: '15468-5464-9852-54682',
        };
        const action = new ConfiguratorActions.UpdateConfiguration(payload);
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.UPDATE_CONFIGURATION,
          payload: payload,
          meta: StateLoaderActions.loadMeta(CONFIGURATION_DATA),
        });
      });
    });

    describe('UpdateConfigurationFail', () => {
      it('Should create the action', () => {
        const error = 'anError';
        const action = new ConfiguratorActions.UpdateConfigurationFail(error);
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.UPDATE_CONFIGURATION_FAIL,
          payload: error,
          meta: StateLoaderActions.failMeta(CONFIGURATION_DATA, error),
        });
      });
    });

    describe('UpdateConfigurationSuccess', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.UpdateConfigurationSuccess({});
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS,
          payload: {},
          meta: StateLoaderActions.successMeta(CONFIGURATION_DATA),
        });
      });
    });
  });
});
