import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import * as ConfiguratorTextfieldActions from './configurator-textfield.action';

const PRODUCT_CODE = 'HT-1010';
describe('ConfiguratorTextfieldActions', () => {
  it('should provide create action with proper type', () => {
    const createAction: ConfiguratorTextfieldActions.ConfiguratorActions =
      new ConfiguratorTextfieldActions.CreateConfiguration({
        productCode: PRODUCT_CODE,
        owner: ConfiguratorModelUtils.createInitialOwner(),
      });
    expect(createAction.type).toBe(
      ConfiguratorTextfieldActions.CREATE_CONFIGURATION
    );
  });

  it('should provide create success action with proper type', () => {
    const createAction: ConfiguratorTextfieldActions.ConfiguratorActions =
      new ConfiguratorTextfieldActions.CreateConfigurationSuccess({
        configurationInfos: [],
        owner: ConfiguratorModelUtils.createInitialOwner(),
      });
    expect(createAction.type).toBe(
      ConfiguratorTextfieldActions.CREATE_CONFIGURATION_SUCCESS
    );
  });

  it('should provide create fail action with proper type', () => {
    const createAction: ConfiguratorTextfieldActions.ConfiguratorActions =
      new ConfiguratorTextfieldActions.CreateConfigurationFail({});
    expect(createAction.type).toBe(
      ConfiguratorTextfieldActions.CREATE_CONFIGURATION_FAIL
    );
  });

  it('should provide update action with proper type', () => {
    const updateAction: ConfiguratorTextfieldActions.ConfiguratorActions =
      new ConfiguratorTextfieldActions.UpdateConfiguration({
        configurationInfos: [],
        owner: ConfiguratorModelUtils.createInitialOwner(),
      });
    expect(updateAction.type).toBe(
      ConfiguratorTextfieldActions.UPDATE_CONFIGURATION
    );
  });

  it('should provide create action that carries productCode as a payload', () => {
    const productCode = 'CONF_LAPTOP';
    const createAction = new ConfiguratorTextfieldActions.CreateConfiguration({
      productCode: productCode,
      owner: ConfiguratorModelUtils.createInitialOwner(),
    });
    expect(createAction.payload.productCode).toBe(productCode);
  });
});
