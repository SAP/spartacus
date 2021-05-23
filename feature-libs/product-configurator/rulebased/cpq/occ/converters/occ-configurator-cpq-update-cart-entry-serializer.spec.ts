import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { ConfiguratorType } from 'feature-libs/product-configurator/common';
import { OccConfiguratorCpqUpdateCartEntrySerializer } from './occ-configurator-cpq-update-cart-entry-serializer';

describe('OccConfiguratorVariantUpdateCartEntrySerializer', () => {
  let converterUnderTest: OccConfiguratorCpqUpdateCartEntrySerializer;

  const USER_ID = 'theUser';
  const CART_ID = '98876';
  const CONFIG_ID = '12314';
  const ENTRY_NUMBER = '12314';

  const sourceParameters: Configurator.UpdateConfigurationForCartEntryParameters = {
    userId: USER_ID,
    cartId: CART_ID,
    configuration: {
      configId: CONFIG_ID,
      owner: { key: 'B', configuratorType: ConfiguratorType.CPQ },
    },
    cartEntryNumber: ENTRY_NUMBER,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccConfiguratorCpqUpdateCartEntrySerializer],
    });

    converterUnderTest = TestBed.inject(
      OccConfiguratorCpqUpdateCartEntrySerializer as Type<OccConfiguratorCpqUpdateCartEntrySerializer>
    );
  });

  it('should convert updateCartEntry parameters to occ updateConfigurationForCartEntryParameters', () => {
    const convertedParameters = converterUnderTest.convert(sourceParameters);
    expect(convertedParameters.cartId).toEqual(CART_ID);
    expect(convertedParameters.userId).toEqual(USER_ID);
    expect(convertedParameters.configId).toEqual(CONFIG_ID);
    expect(convertedParameters.entryNumber).toEqual(ENTRY_NUMBER);
  });
});
