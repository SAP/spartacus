import * as ConfiguratorTextfieldActions from './configurator-textfield.action';

describe('ConfiguratorTextfieldActions', () => {
  it('should provide create action with proper type', () => {
    const createAction: ConfiguratorTextfieldActions.ConfiguratorAction = new ConfiguratorTextfieldActions.CreateConfiguration(
      {}
    );
    expect(createAction.type).toBe(
      ConfiguratorTextfieldActions.CREATE_CONFIGURATION
    );
  });

  it('should provide create success action with proper type', () => {
    const createAction: ConfiguratorTextfieldActions.ConfiguratorAction = new ConfiguratorTextfieldActions.CreateConfigurationSuccess(
      {}
    );
    expect(createAction.type).toBe(
      ConfiguratorTextfieldActions.CREATE_CONFIGURATION_SUCCESS
    );
  });

  it('should provide create fail action with proper type', () => {
    const createAction: ConfiguratorTextfieldActions.ConfiguratorAction = new ConfiguratorTextfieldActions.CreateConfigurationFail(
      {}
    );
    expect(createAction.type).toBe(
      ConfiguratorTextfieldActions.CREATE_CONFIGURATION_FAIL
    );
  });

  it('should provide update action with proper type', () => {
    const updateAction: ConfiguratorTextfieldActions.ConfiguratorAction = new ConfiguratorTextfieldActions.UpdateConfiguration(
      {}
    );
    expect(updateAction.type).toBe(
      ConfiguratorTextfieldActions.UPDATE_CONFIGURATION
    );
  });

  it('should provide create action that carries productCode as a payload', () => {
    const productCode = 'CONF_LAPTOP';
    const createAction = new ConfiguratorTextfieldActions.CreateConfiguration({
      productCode: productCode,
    });
    expect(createAction.payload.productCode).toBe(productCode);
  });
});
