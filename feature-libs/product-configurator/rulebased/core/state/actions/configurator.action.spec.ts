import { StateUtils } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Configurator } from '../../model/configurator.model';
import { CONFIGURATOR_DATA } from '../configurator-state';
import { ConfiguratorTestUtils } from './../../../testing/configurator-test-utils';
import * as ConfiguratorActions from './configurator.action';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '15468-5464-9852-54682';
const GROUP_ID = 'GROUP1';
const OWNER_KEY = 'product/' + PRODUCT_CODE;
const OWNER: CommonConfigurator.Owner = {
  id: PRODUCT_CODE,
  type: CommonConfigurator.OwnerType.PRODUCT,
  key: OWNER_KEY,
  configuratorType: ConfiguratorType.VARIANT,
};
const OVERVIEW: Configurator.Overview = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
};
const CONFIGURATION: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  productCode: PRODUCT_CODE,
};

describe('ConfiguratorActions', () => {
  it('should provide create action with proper type', () => {
    const createAction = new ConfiguratorActions.CreateConfiguration(OWNER);
    expect(createAction.type).toBe(ConfiguratorActions.CREATE_CONFIGURATION);
  });

  it('should provide create action that carries productCode as a payload', () => {
    const createAction = new ConfiguratorActions.CreateConfiguration(OWNER);
    expect(createAction.payload.id).toBe(PRODUCT_CODE);
  });

  describe('ReadConfiguration Actions', () => {
    describe('ReadConfiguration', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.ReadConfiguration({
          configuration: CONFIGURATION,
          groupId: GROUP_ID,
        });
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION,
          payload: {
            configuration: CONFIGURATION,
            groupId: GROUP_ID,
          },
          meta: StateUtils.entityLoadMeta(CONFIGURATOR_DATA, OWNER_KEY),
        });
      });
    });

    describe('ReadConfigurationFail', () => {
      it('Should create the action', () => {
        const error = 'anError';
        const action = new ConfiguratorActions.ReadConfigurationFail({
          ownerKey: PRODUCT_CODE,
          error: error,
        });
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION_FAIL,
          payload: {
            ownerKey: PRODUCT_CODE,
            error: error,
          },
          meta: StateUtils.entityFailMeta(
            CONFIGURATOR_DATA,
            PRODUCT_CODE,
            error
          ),
        });
      });
    });

    describe('ReadConfigurationSuccess', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.ReadConfigurationSuccess(
          CONFIGURATION
        );
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION_SUCCESS,
          payload: CONFIGURATION,
          meta: StateUtils.entitySuccessMeta(CONFIGURATOR_DATA, OWNER_KEY),
        });
      });
    });
  });

  describe('UpdateConfiguration Actions', () => {
    describe('UpdateConfiguration', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.UpdateConfiguration(
          CONFIGURATION
        );

        expect({ ...action }).toEqual({
          type: ConfiguratorActions.UPDATE_CONFIGURATION,
          payload: CONFIGURATION,
          meta: {
            entityType: CONFIGURATOR_DATA,
            entityId: OWNER_KEY,
            loader: { load: true },
            processesCountDiff: 1,
          },
        });
      });
    });

    describe('UpdateConfigurationFail', () => {
      it('Should create the action', () => {
        const error = 'anError';
        const action = new ConfiguratorActions.UpdateConfigurationFail({
          configuration: CONFIGURATION,
          error: error,
        });

        expect({ ...action }).toEqual({
          type: ConfiguratorActions.UPDATE_CONFIGURATION_FAIL,
          payload: {
            configuration: CONFIGURATION,
            error: error,
          },
          meta: {
            entityType: CONFIGURATOR_DATA,
            entityId: OWNER_KEY,
            loader: { error: error },
            processesCountDiff: -1,
          },
        });
      });
    });

    describe('UpdateConfigurationSuccess', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.UpdateConfigurationSuccess(
          CONFIGURATION
        );
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS,
          payload: CONFIGURATION,
          meta: StateUtils.entityProcessesDecrementMeta(
            CONFIGURATOR_DATA,
            OWNER_KEY
          ),
        });
      });
    });
  });

  describe('RemoveProductBoundConfigurations', () => {
    it('should remove product bound configurations', () => {
      const action = new ConfiguratorActions.RemoveProductBoundConfigurations();
      expect({ ...action }).toEqual({
        type: ConfiguratorActions.REMOVE_PRODUCT_BOUND_CONFIGURATIONS,
      });
    });
  });

  describe('UpdateConfigurationOverview actions', () => {
    it('should allow to create the main action with matching meta data', () => {
      const action = new ConfiguratorActions.UpdateConfigurationOverview(
        CONFIGURATION
      );

      expect({ ...action }).toEqual({
        type: ConfiguratorActions.UPDATE_CONFIGURATION_OVERVIEW,
        payload: CONFIGURATION,
        meta: {
          entityType: CONFIGURATOR_DATA,
          entityId: OWNER_KEY,
          loader: { load: true },
        },
      });
    });

    it('should allow to create the fail action', () => {
      const error = 'anError';
      const action = new ConfiguratorActions.UpdateConfigurationOverviewFail({
        ownerKey: CONFIGURATION.owner.key,
        error: error,
      });

      expect({ ...action }).toEqual({
        type: ConfiguratorActions.UPDATE_CONFIGURATION_OVERVIEW_FAIL,
        payload: {
          ownerKey: CONFIGURATION.owner.key,
          error: error,
        },
        meta: {
          entityType: CONFIGURATOR_DATA,
          entityId: OWNER_KEY,
          loader: { error: error },
        },
      });
    });

    it('should allow to create the success action', () => {
      const action = new ConfiguratorActions.UpdateConfigurationOverviewSuccess(
        { ownerKey: CONFIGURATION.owner.key, overview: OVERVIEW }
      );
      expect({ ...action }).toEqual({
        type: ConfiguratorActions.UPDATE_CONFIGURATION_OVERVIEW_SUCCESS,
        payload: { ownerKey: CONFIGURATION.owner.key, overview: OVERVIEW },
        meta: {
          entityType: CONFIGURATOR_DATA,
          entityId: OWNER_KEY,
          loader: { success: true },
        },
      });
    });
  });
});
