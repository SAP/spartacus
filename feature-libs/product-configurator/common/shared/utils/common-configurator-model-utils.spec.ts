import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { getOwnerKey } from './common-configurator-model-utils';
describe('CommonConfiguratorStrictUtils', () => {
  const PRODUCT_CODE = 'CONF_LAPTOP';

  it('should check defined string successfully', () => {
    expect(
      getOwnerKey(CommonConfigurator.OwnerType.PRODUCT, PRODUCT_CODE)
    ).toBe(PRODUCT_CODE);
  });
});
