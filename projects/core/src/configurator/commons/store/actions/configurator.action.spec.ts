import { CREATE_CONFIGURATION } from './configurator.action';
import { ConfiguratorActions } from './index';

describe('ConfiguratorActions', () => {
  it('should provide create action with proper type', () => {
    const createAction = new ConfiguratorActions.CreateConfiguration({});
    expect(createAction.type).toBe(CREATE_CONFIGURATION);
  });

  it('should provide create action that carries productCode as a payload', () => {
    const productCode = 'CONF_LAPTOP';
    const createAction = new ConfiguratorActions.CreateConfiguration({
      productCode: productCode,
    });
    expect(createAction.payload.productCode).toBe(productCode);
  });
});
