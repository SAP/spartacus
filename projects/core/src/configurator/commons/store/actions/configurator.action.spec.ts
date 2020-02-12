import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Configurator } from '../../../../model/configurator.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import {
  StateEntityLoaderActions,
  StateEntityProcessesLoaderActions,
} from '../../../../state/utils/index';
import { GenericConfigUtilsService } from '../../../generic/utils/config-utils.service';
import { CONFIGURATION_DATA } from '../configuration-state';
import * as ConfiguratorActions from './configurator.action';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '15468-5464-9852-54682';
const GROUP_ID = 'GROUP1';
const CONFIGURATION: Configurator.Configuration = {
  productCode: PRODUCT_CODE,
  configId: CONFIG_ID,
  owner: { id: PRODUCT_CODE, type: GenericConfigurator.OwnerType.PRODUCT },
};

describe('ConfiguratorActions', () => {
  let configuratorUtils: GenericConfigUtilsService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({}).compileComponents();
    configuratorUtils = TestBed.get(GenericConfigUtilsService as Type<
      GenericConfigUtilsService
    >);
    configuratorUtils.setOwnerKey(CONFIGURATION.owner);
  }));
  it('should provide create action with proper type', () => {
    const createAction = new ConfiguratorActions.CreateConfiguration(
      PRODUCT_CODE,
      PRODUCT_CODE
    );
    expect(createAction.type).toBe(ConfiguratorActions.CREATE_CONFIGURATION);
  });

  it('should provide create action that carries productCode as a payload', () => {
    const createAction = new ConfiguratorActions.CreateConfiguration(
      PRODUCT_CODE,
      PRODUCT_CODE
    );
    expect(createAction.productCode).toBe(PRODUCT_CODE);
  });

  describe('ReadConfiguration Actions', () => {
    describe('ReadConfiguration', () => {
      it('Should create the action', () => {
        const action = new ConfiguratorActions.ReadConfiguration(
          CONFIGURATION,
          GROUP_ID
        );
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION,
          configuration: CONFIGURATION,
          groupId: GROUP_ID,
          meta: StateEntityLoaderActions.entityLoadMeta(
            CONFIGURATION_DATA,
            CONFIGURATION.owner.key
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
          CONFIGURATION
        );
        expect({ ...action }).toEqual({
          type: ConfiguratorActions.READ_CONFIGURATION_SUCCESS,
          payload: CONFIGURATION,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            CONFIGURATION_DATA,
            CONFIGURATION.owner.key
          ),
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
            entityType: CONFIGURATION_DATA,
            entityId: CONFIGURATION.owner.key,
            loader: { load: true },
            processesCountDiff: 1,
          },
        });
      });
    });

    describe('UpdateConfigurationFail', () => {
      it('Should create the action', () => {
        const error = 'anError';
        const action = new ConfiguratorActions.UpdateConfigurationFail(
          CONFIGURATION.owner.key,
          error
        );

        expect({ ...action }).toEqual({
          type: ConfiguratorActions.UPDATE_CONFIGURATION_FAIL,
          payload: error,
          meta: {
            entityType: CONFIGURATION_DATA,
            entityId: CONFIGURATION.owner.key,
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
          meta: StateEntityProcessesLoaderActions.entityProcessesDecrementMeta(
            CONFIGURATION_DATA,
            CONFIGURATION.owner.key
          ),
        });
      });
    });
  });

  describe('SetNextOwnerCartEntry', () => {
    const cartEntryNo = '3';
    it('should carry expected meta data', () => {
      const action = new ConfiguratorActions.SetNextOwnerCartEntry(
        CONFIGURATION,
        cartEntryNo
      );

      expect({ ...action }).toEqual({
        type: ConfiguratorActions.SET_NEXT_OWNER_CART_ENTRY,
        payload: CONFIGURATION,
        cartEntryNo: cartEntryNo,
        meta: StateEntityLoaderActions.entitySuccessMeta(
          CONFIGURATION_DATA,
          CONFIGURATION.owner.key
        ),
      });
    });
  });
});
