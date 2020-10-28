import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OccConfigurator } from '../occ-configurator.models';
import { Configurator } from './../../../core/model/configurator.model';
import { OccConfiguratorVariantUpdateCartEntrySerializer } from './occ-configurator-variant-update-cart-entry-serializer';

describe('OccConfiguratorVariantUpdateCartEntrySerializer', () => {
  let occConfiguratorVariantUpdateCartEntrySerializer: OccConfiguratorVariantUpdateCartEntrySerializer;

  const USER_ID = 'theUser';
  const CART_ID = '98876';
  const PRODUCT_CODE = 'CPQ_LAPTOP';
  const QUANTITY = 1;
  const CONFIG_ID = '12314';
  const ENTRY_NUMBER = '12314';
  const CONFIGURATOR_TYPE = 'CPQCONFIGURATOR';

  const sourceParameters: Configurator.UpdateConfigurationForCartEntryParameters = {
    userId: USER_ID,
    cartId: CART_ID,
    configuration: { productCode: PRODUCT_CODE, configId: CONFIG_ID },
  };

  const targetParameters: OccConfigurator.UpdateConfigurationForCartEntryParameters = {
    userId: USER_ID,
    cartId: CART_ID,
    product: { code: PRODUCT_CODE },
    quantity: QUANTITY,
    configId: CONFIG_ID,
    entryNumber: ENTRY_NUMBER,
    configurationInfos: [{ configuratorType: CONFIGURATOR_TYPE }],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccConfiguratorVariantUpdateCartEntrySerializer],
    });

    occConfiguratorVariantUpdateCartEntrySerializer = TestBed.get(
      OccConfiguratorVariantUpdateCartEntrySerializer as Type<
        OccConfiguratorVariantUpdateCartEntrySerializer
      >
    );
  });

  it('should convert updateCartEntry parameters to occ updateConfigurationForCartEntryParameters', () => {
    const convertedParameters = occConfiguratorVariantUpdateCartEntrySerializer.convert(
      sourceParameters
    );
    expect(convertedParameters.userId).toEqual(targetParameters.userId);
    expect(convertedParameters.configId).toEqual(targetParameters.configId);
    expect(convertedParameters.product.code).toEqual(
      targetParameters.product.code
    );
    expect(convertedParameters.configurationInfos[0].configuratorType).toEqual(
      CONFIGURATOR_TYPE
    );
  });
});
