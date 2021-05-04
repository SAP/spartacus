import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { ConfiguratorModelUtils } from './configurator-model-utils';
describe('ConfiguratorModelUtils', () => {
  const PRODUCT_CODE = 'CONF_LAPTOP';

  it('should compile owner key', () => {
    expect(
      ConfiguratorModelUtils.getOwnerKey(
        CommonConfigurator.OwnerType.PRODUCT,
        PRODUCT_CODE
      )
    ).toBe(CommonConfigurator.OwnerType.PRODUCT + '/' + PRODUCT_CODE);
  });

  it('should create initial owner with only key defined', () => {
    const owner = ConfiguratorModelUtils.createInitialOwner();
    expect(owner.key).toBe('INITIAL');
    expect(owner.type).toBeUndefined();
    expect(owner.id).toBeUndefined();
  });

  it('should create owner from attributes', () => {
    const owner = ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.CART_ENTRY,
      PRODUCT_CODE
    );
    expect(owner.key).toBe(
      ConfiguratorModelUtils.getOwnerKey(
        CommonConfigurator.OwnerType.CART_ENTRY,
        PRODUCT_CODE
      )
    );
    expect(owner.type).toBe(CommonConfigurator.OwnerType.CART_ENTRY);
    expect(owner.id).toBe(PRODUCT_CODE);
  });
});
