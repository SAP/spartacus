import { CommonConfigurator } from './../../core/model/common-configurator.model';
import { getOwnerKey } from './common-configurator-model-utils';
describe('CommonConfiguratorModelUtils', () => {
  const PRODUCT_CODE = 'CONF_LAPTOP';

  it('should check defined string successfully', () => {
    expect(
      getOwnerKey(CommonConfigurator.OwnerType.PRODUCT, PRODUCT_CODE)
    ).toBe(CommonConfigurator.OwnerType.PRODUCT + '/' + PRODUCT_CODE);
  });
});
