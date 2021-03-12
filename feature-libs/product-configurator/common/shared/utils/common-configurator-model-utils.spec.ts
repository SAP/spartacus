import { CommonConfigurator } from './../../core/model/common-configurator.model';
import {
  createInitialOwner,
  createOwner,
  getOwnerKey,
} from './common-configurator-model-utils';
describe('CommonConfiguratorModelUtils', () => {
  const PRODUCT_CODE = 'CONF_LAPTOP';

  it('should compile owner key', () => {
    expect(
      getOwnerKey(CommonConfigurator.OwnerType.PRODUCT, PRODUCT_CODE)
    ).toBe(CommonConfigurator.OwnerType.PRODUCT + '/' + PRODUCT_CODE);
  });

  it('should create initial owner with only key defined', () => {
    const owner = createInitialOwner();
    expect(owner.key).toBe('INITIAL');
    expect(owner.type).toBeUndefined();
    expect(owner.id).toBeUndefined();
  });

  it('should create owner from attributes', () => {
    const owner = createOwner(
      CommonConfigurator.OwnerType.CART_ENTRY,
      PRODUCT_CODE
    );
    expect(owner.key).toBe(
      getOwnerKey(CommonConfigurator.OwnerType.CART_ENTRY, PRODUCT_CODE)
    );
    expect(owner.type).toBe(CommonConfigurator.OwnerType.CART_ENTRY);
    expect(owner.id).toBe(PRODUCT_CODE);
  });
});
