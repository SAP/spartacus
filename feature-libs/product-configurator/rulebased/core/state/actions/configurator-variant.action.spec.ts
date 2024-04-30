import {
  CommonConfigurator,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { Configurator } from '../../model/configurator.model';
import * as ConfiguratorVariantActions from './configurator-variant.action';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '15468-5464-9852-54682';
const OWNER_KEY = 'product/' + PRODUCT_CODE;

const OWNER: CommonConfigurator.Owner = {
  id: PRODUCT_CODE,
  type: CommonConfigurator.OwnerType.PRODUCT,
  key: OWNER_KEY,
  configuratorType: ConfiguratorType.VARIANT,
};

const CONFIGURATION = ConfiguratorTestUtils.createConfiguration(
  CONFIG_ID,
  OWNER
);

const VARIANTS: Configurator.Variant[] = [{ productCode: 'CONF_LAPTOP_A' }];

describe('ConfiguratorVariantActions', () => {
  it('should provide variant search action with proper type', () => {
    const action = new ConfiguratorVariantActions.SearchVariants(CONFIGURATION);
    expect(action.type).toBe(ConfiguratorVariantActions.SEARCH_VARIANTS);
  });

  it('should provide variant search success action with proper type', () => {
    const action = new ConfiguratorVariantActions.SearchVariantsSuccess({
      ownerKey: OWNER_KEY,
      variants: VARIANTS,
    });
    expect(action.type).toBe(
      ConfiguratorVariantActions.SEARCH_VARIANTS_SUCCESS
    );
  });

  it('should provide variant search fail action with proper type', () => {
    const action = new ConfiguratorVariantActions.SearchVariantsFail({
      ownerKey: CONFIGURATION.owner.key,
      error: new Error('Error'),
    });
    expect(action.type).toBe(ConfiguratorVariantActions.SEARCH_VARIANTS_FAIL);
  });
});
