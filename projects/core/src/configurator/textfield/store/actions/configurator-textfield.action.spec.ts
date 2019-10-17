import * as ConfiguratorActions from './configurator-textfield.action';

describe('ConfiguratorTextfieldActions', () => {
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
});
