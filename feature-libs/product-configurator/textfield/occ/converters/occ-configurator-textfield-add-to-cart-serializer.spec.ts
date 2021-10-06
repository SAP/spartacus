import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { OccConfiguratorTextfieldAddToCartSerializer } from './occ-configurator-textfield-add-to-cart-serializer';

describe('OccConfiguratorTextfieldAddToCartSerializer', () => {
  let occConfiguratorVariantAddToCartSerializer: OccConfiguratorTextfieldAddToCartSerializer;

  const USER_ID = 'theUser';
  const CART_ID = '98876';
  const PRODUCT_CODE = 'CPQ_LAPTOP';
  const QUANTITY = 1;
  const LABEL1 = 'LABEL1';
  const VALUE1 = 'VALUE1';
  const TEXTFIELD = 'TEXTFIELD';

  const configuration: ConfiguratorTextfield.Configuration = {
    configurationInfos: [
      {
        configurationLabel: LABEL1,
        configurationValue: VALUE1,
        status: ConfiguratorTextfield.ConfigurationStatus.SUCCESS,
      },
    ],
    owner: ConfiguratorModelUtils.createInitialOwner(),
  };

  const sourceParameters: ConfiguratorTextfield.AddToCartParameters = {
    userId: USER_ID,
    cartId: CART_ID,
    productCode: PRODUCT_CODE,
    quantity: QUANTITY,
    configuration: configuration,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccConfiguratorTextfieldAddToCartSerializer],
    });

    occConfiguratorVariantAddToCartSerializer = TestBed.inject(
      OccConfiguratorTextfieldAddToCartSerializer as Type<OccConfiguratorTextfieldAddToCartSerializer>
    );
  });

  it('should convert addToCart parameters to occAddToCartParameters', () => {
    const convertedParameters =
      occConfiguratorVariantAddToCartSerializer.convert(sourceParameters);
    expect(convertedParameters.userId).toEqual(sourceParameters.userId);
    expect(convertedParameters.product?.code).toEqual(
      sourceParameters.productCode
    );
    const configurationInfos = convertedParameters.configurationInfos;
    if (configurationInfos) {
      expect(configurationInfos[0].configuratorType).toEqual(TEXTFIELD);
      expect(configurationInfos[0].configurationLabel).toEqual(LABEL1);
    } else {
      fail();
    }
  });
});
