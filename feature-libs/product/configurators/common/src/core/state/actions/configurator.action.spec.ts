import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import {
  Configurator,
  GenericConfigurator,
  GenericConfiguratorUtilsService,
  StateUtils,
} from '@spartacus/core';
import { CONFIGURATOR_DATA } from '../configurator-state';
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
  let configuratorUtils: GenericConfiguratorUtilsService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({}).compileComponents();
    configuratorUtils = TestBed.inject(
      GenericConfiguratorUtilsService as Type<GenericConfiguratorUtilsService>
    );
    configuratorUtils.setOwnerKey(CONFIGURATION.owner);
  }));
  it('should provide create action with proper type', () => {
    const createAction = new ConfiguratorActions.CreateConfiguration(
      CONFIGURATION.owner
    );
    expect(createAction.type).toBe(ConfiguratorActions.CREATE_CONFIGURATION);
  });

  it('should provide create action that carries productCode as a payload', () => {
    const createAction = new ConfiguratorActions.CreateConfiguration(
      CONFIGURATION.owner
    );
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
          meta: StateUtils.entityLoadMeta(
            CONFIGURATOR_DATA,
            CONFIGURATION.owner.key
          ),
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
          meta: StateUtils.entitySuccessMeta(
            CONFIGURATOR_DATA,
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
            entityType: CONFIGURATOR_DATA,
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
          meta: StateUtils.entityProcessesDecrementMeta(
            CONFIGURATOR_DATA,
            CONFIGURATION.owner.key
          ),
        });
      });
    });
  });
});
