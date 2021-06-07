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

  it('should throw error if owner id is not present when creating an owner key', () => {
    expect(function () {
      ConfiguratorModelUtils.getOwnerKey(
        CommonConfigurator.OwnerType.PRODUCT,
        undefined
      );
    }).toThrow();
    expect(function () {
      ConfiguratorModelUtils.getOwnerKey(
        CommonConfigurator.OwnerType.CART_ENTRY,
        undefined
      );
    }).toThrow();
    expect(function () {
      ConfiguratorModelUtils.getOwnerKey(
        CommonConfigurator.OwnerType.ORDER_ENTRY,
        undefined
      );
    }).toThrow();
  });

  it('should create initial owner with only key defined', () => {
    const owner = ConfiguratorModelUtils.createInitialOwner();
    expect(owner.key).toBe('INITIAL');
    expect(owner.type).toBeUndefined();
    expect(owner.id).toBe('INITIAL');
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
