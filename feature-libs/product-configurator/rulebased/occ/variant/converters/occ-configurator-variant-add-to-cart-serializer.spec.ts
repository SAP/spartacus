import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import { OccConfiguratorVariantAddToCartSerializer } from './occ-configurator-variant-add-to-cart-serializer';

describe('OccConfiguratorVariantAddToCartSerializer', () => {
  let occConfiguratorVariantAddToCartSerializer: OccConfiguratorVariantAddToCartSerializer;

  const USER_ID = 'theUser';
  const CART_ID = '98876';
  const PRODUCT_CODE = 'CPQ_LAPTOP';
  const QUANTITY = 1;
  const CONFIG_ID = '12314';

  const sourceParameters: Configurator.AddToCartParameters = {
    userId: USER_ID,
    cartId: CART_ID,
    productCode: PRODUCT_CODE,
    quantity: QUANTITY,
    configId: CONFIG_ID,
    owner: ConfiguratorModelUtils.createInitialOwner(),
  };

  const targetParameters: OccConfigurator.AddToCartParameters = {
    userId: USER_ID,
    cartId: CART_ID,
    product: { code: PRODUCT_CODE },
    quantity: QUANTITY,
    configId: CONFIG_ID,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccConfiguratorVariantAddToCartSerializer],
    });

    occConfiguratorVariantAddToCartSerializer = TestBed.inject(
      OccConfiguratorVariantAddToCartSerializer as Type<OccConfiguratorVariantAddToCartSerializer>
    );
  });

  it('should convert addToCart parameters to occAddToCartParameters', () => {
    const convertedParameters =
      occConfiguratorVariantAddToCartSerializer.convert(sourceParameters);
    expect(convertedParameters.userId).toEqual(targetParameters.userId);
    expect(convertedParameters.configId).toEqual(targetParameters.configId);
    expect(convertedParameters.product?.code).toEqual(
      targetParameters.product?.code
    );
  });
});
