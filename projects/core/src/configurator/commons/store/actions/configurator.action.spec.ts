import { StateEntityLoaderActions } from '../../../../state/utils/index';
import { CONFIGURATION_DATA } from '../configuration-state';
import * as ConfiguratorActions from './configurator.action';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '15468-5464-9852-54682';
const PAYLOAD = {
  productCode: PRODUCT_CODE,
  configId: CONFIG_ID,
};

describe('ConfiguratorActions', () => {
  it('should provide create action with proper type', () => {
    const createAction = new ConfiguratorActions.CreateConfiguration('');
    expect(createAction.type).toBe(ConfiguratorActions.CREATE_CONFIGURATION);
  });

  it('should provide create action that carries productCode as a payload', () => {
    const createAction = new ConfiguratorActions.CreateConfiguration(
      PRODUCT_CODE
    );
    expect(createAction.productCode).toBe(PRODUCT_CODE);
  });

  describe('ReadConfiguration Actions', () => {
    describe('ReadConfiguration', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.ReadConfiguration(PAYLOAD);
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION,
          payload: PAYLOAD,
          meta: StateEntityLoaderActions.entityLoadMeta(
            CONFIGURATION_DATA,
            PAYLOAD.productCode
          ),
        });
      });
    });

    describe('ReadConfigurationFail', () => {
      it('Should create the action', () => {
        const error = 'anError';
        const action = new ConfiguratorActions.ReadConfigurationFail(
          PRODUCT_CODE,
          error
        );
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION_FAIL,
          payload: error,
          meta: StateEntityLoaderActions.entityFailMeta(
            CONFIGURATION_DATA,
            PRODUCT_CODE,
            error
          ),
        });
      });
    });

    describe('ReadConfigurationSuccess', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.ReadConfigurationSuccess(
          PAYLOAD
        );
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION_SUCCESS,
          payload: PAYLOAD,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            CONFIGURATION_DATA,
            PAYLOAD.productCode
          ),
        });
      });
    });
  });

  describe('UpdateConfiguration Actions', () => {
    describe('UpdateConfiguration', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.UpdateConfiguration(PAYLOAD);
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.UPDATE_CONFIGURATION,
          payload: PAYLOAD,
          meta: StateEntityLoaderActions.entityLoadMeta(
            CONFIGURATION_DATA,
            PAYLOAD.productCode
          ),
        });
      });
    });

    describe('UpdateConfigurationFail', () => {
      it('Should create the action', () => {
        const error = 'anError';
        const action = new ConfiguratorActions.UpdateConfigurationFail(
          PRODUCT_CODE,
          error
        );
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.UPDATE_CONFIGURATION_FAIL,
          payload: error,
          meta: StateEntityLoaderActions.entityFailMeta(
            CONFIGURATION_DATA,
            PRODUCT_CODE,
            error
          ),
        });
      });
    });

    describe('UpdateConfigurationSuccess', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.UpdateConfigurationSuccess(
          PAYLOAD
        );
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS,
          payload: PAYLOAD,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            CONFIGURATION_DATA,
            PAYLOAD.productCode
          ),
        });
      });
    });
  });
});
