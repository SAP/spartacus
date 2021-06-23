import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { ConfiguratorType } from 'feature-libs/product-configurator/common';
import { OccCpqConfigurator } from '../cpq-configurator-occ.models';
import { OccConfiguratorCpqAddToCartSerializer } from './occ-configurator-cpq-add-to-cart-serializer';

describe('OccConfiguratorCpqAddToCartSerializer', () => {
  let serializerUnderTest: OccConfiguratorCpqAddToCartSerializer;

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
    owner: {
      key: 'A',
      id: PRODUCT_CODE,
      configuratorType: ConfiguratorType.CPQ,
    },
  };

  const targetParameters: OccCpqConfigurator.AddToCartParameters = {
    userId: USER_ID,
    cartId: CART_ID,
    product: { code: PRODUCT_CODE },
    quantity: QUANTITY,
    configId: CONFIG_ID,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccConfiguratorCpqAddToCartSerializer],
    });

    serializerUnderTest = TestBed.inject(
      OccConfiguratorCpqAddToCartSerializer as Type<OccConfiguratorCpqAddToCartSerializer>
    );
  });

  it('should convert addToCart parameters to occAddToCartParameters', () => {
    const convertedParameters = serializerUnderTest.convert(sourceParameters);
    expect(convertedParameters.userId).toEqual(targetParameters.userId);
    expect(convertedParameters.configId).toEqual(targetParameters.configId);
    expect(convertedParameters.product.code).toEqual(
      targetParameters.product.code
    );
  });
});
