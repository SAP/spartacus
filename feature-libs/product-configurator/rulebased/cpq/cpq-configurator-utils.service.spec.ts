import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CpqConfiguratorUtilsService } from './cpq-configurator-utils.service';
import { Cpq } from './cpq.models';
import { Configurator } from '../core/model/configurator.model';
import { LanguageService } from '@spartacus/core';

const CURRENCY = 'USD';

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('CpqConfiguratorUtilitiesService', () => {
  let cpqConfiguratorUtilsService: CpqConfiguratorUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CpqConfiguratorUtilsService,
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    });

    cpqConfiguratorUtilsService = TestBed.inject(
      CpqConfiguratorUtilsService as Type<CpqConfiguratorUtilsService>
    );
  });

  it('should be created', () => {
    expect(CpqConfiguratorUtilsService).toBeTruthy();
  });

  it('should prepare price', () => {
    const valueSelected: Cpq.Value = { paV_ID: 1, price: '123.45' };
    const valuePrice = cpqConfiguratorUtilsService.prepareValuePrice(
      valueSelected,
      CURRENCY
    );
    expect(valuePrice.currencyIso).toBe(CURRENCY);
    expect(valuePrice.value).toBe(123.45);
    expect(valuePrice.formattedValue).toBe('$123.45');
  });

  it('should prepare price when no price exists', () => {
    const valueSelected: Cpq.Value = { paV_ID: 1 };
    const valuePrice = cpqConfiguratorUtilsService.prepareValuePrice(
      valueSelected,
      CURRENCY
    );
    expect(valuePrice).toBeNull();
  });

  it('should calculate value price total', () => {
    const quantity = 3;
    const valuePrice: Configurator.PriceDetails = {
      currencyIso: CURRENCY,
      value: 123.45,
    };
    const valuePriceTotal = cpqConfiguratorUtilsService.calculateValuePriceTotal(
      quantity,
      valuePrice
    );
    expect(valuePriceTotal.currencyIso).toBe(CURRENCY);
    expect(valuePriceTotal.value).toBe(370.35);
    expect(valuePriceTotal.formattedValue).toBe('$370.35');
  });

  it('should calculate value price total when no quantity', () => {
    const quantity = null;
    const valuePrice: Configurator.PriceDetails = {
      currencyIso: CURRENCY,
      value: 123.45,
    };
    const valuePriceTotal = cpqConfiguratorUtilsService.calculateValuePriceTotal(
      quantity,
      valuePrice
    );
    expect(valuePriceTotal.currencyIso).toBe(CURRENCY);
    expect(valuePriceTotal.value).toBe(123.45);
    expect(valuePriceTotal.formattedValue).toBe('$123.45');
  });

  it('should calculate value price total when no value price', () => {
    const quantity = 3;
    const valuePrice: Configurator.PriceDetails = null;
    const valuePriceTotal = cpqConfiguratorUtilsService.calculateValuePriceTotal(
      quantity,
      valuePrice
    );
    expect(valuePriceTotal).toBeNull();
  });

  it('should prepare quantity for attribute with quantity on attribute level', () => {
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '2',
      dataType: Cpq.DataType.QTY_ATTRIBUTE_LEVEL,
      values: [{ paV_ID: 1, selected: true, quantity: '1' }],
    };
    const quantity = cpqConfiguratorUtilsService.prepareQuantity(
      cpqAttr.values[0],
      cpqAttr
    );
    expect(quantity).toBe(2);
  });

  it('should prepare quantity for attribute with quantity on value level', () => {
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      values: [{ paV_ID: 1, selected: true, quantity: '3' }],
    };
    const quantity = cpqConfiguratorUtilsService.prepareQuantity(
      cpqAttr.values[0],
      cpqAttr
    );
    expect(quantity).toBe(3);
  });

  it('should prepare quantity for Checkbox Lineitem attribute with quantity on value level', () => {
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.CHECK_BOX,
      isLineItem: true,
      values: [{ paV_ID: 1, selected: true, quantity: '3' }],
    };
    const quantity = cpqConfiguratorUtilsService.prepareQuantity(
      cpqAttr.values[0],
      cpqAttr
    );
    expect(quantity).toBe(3);
  });

  it('should prepare quantity for Checkbox Non-Lineitem attribute with quantity on value level', () => {
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.CHECK_BOX,
      isLineItem: false,
      values: [{ paV_ID: 1, selected: true, quantity: '3' }],
    };
    const quantity = cpqConfiguratorUtilsService.prepareQuantity(
      cpqAttr.values[0],
      cpqAttr
    );
    expect(quantity).toBeNull();
  });

  it('should prepare quantity for Radiobutton attribute with quantity on value level', () => {
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.RADIO_BUTTON,
      values: [{ paV_ID: 1, selected: true, quantity: '3' }],
    };
    const quantity = cpqConfiguratorUtilsService.prepareQuantity(
      cpqAttr.values[0],
      cpqAttr
    );
    expect(quantity).toBeNull();
  });

  it('should retrieve quantity null for attribute without quantity', () => {
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.N_A,
      values: [{ paV_ID: 1, selected: true, quantity: '1' }],
    };
    const quantity = cpqConfiguratorUtilsService.prepareQuantity(
      cpqAttr.values[0],
      cpqAttr
    );
    expect(quantity).toBeNull();
  });

  it('should format price retriving locale from language service', () => {
    const price: Configurator.PriceDetails = {
      currencyIso: CURRENCY,
      value: 123.45,
    };
    cpqConfiguratorUtilsService['formatPrice'](price);
    expect(price.formattedValue).toBe('$123.45');
  });

  it('should format price', () => {
    const price: Configurator.PriceDetails = {
      value: 1123.45,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorUtilsService['formatPriceForLocale'](price, locale);
    expect(price.formattedValue).toBe('$1,123.45');
  });

  it('should format price with missing fraction digits', () => {
    const price: Configurator.PriceDetails = {
      value: 123,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorUtilsService['formatPriceForLocale'](price, locale);
    expect(price.formattedValue).toBe('$123.00');
  });

  it('should format price with to many fraction digits', () => {
    const price: Configurator.PriceDetails = {
      value: 123.456,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorUtilsService['formatPriceForLocale'](price, locale);
    expect(price.formattedValue).toBe('$123.46');
  });

  it('should format negative price ', () => {
    const price: Configurator.PriceDetails = {
      value: -123.45,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorUtilsService['formatPriceForLocale'](price, locale);
    expect(price.formattedValue).toBe('-$123.45');
  });

  it('should calculate attribute price total', () => {
    const attribute: Configurator.Attribute = {
      name: 'AttributeName',
      values: [
        {
          selected: true,
          valuePriceTotal: { currencyIso: CURRENCY, value: 100 },
        },
        {
          selected: true,
          valuePriceTotal: { currencyIso: CURRENCY, value: 0.01 },
        },
        {
          selected: true,
        },
        {
          selected: false,
          valuePriceTotal: { currencyIso: CURRENCY, value: 200 },
        },
      ],
    };

    const attributePriceTotal = cpqConfiguratorUtilsService.calculateAttributePriceTotal(
      attribute,
      CURRENCY
    );
    expect(attributePriceTotal.currencyIso).toBe(CURRENCY);
    expect(attributePriceTotal.value).toBe(100.01);
    expect(attributePriceTotal.formattedValue).toBe('$100.01');
  });

  it('should convert CPQ dataType INPUT_STRING', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.INPUT_STRING,
    };
    expect(cpqConfiguratorUtilsService.convertDataType(attribute)).toBe(
      Configurator.DataType.INPUT_STRING
    );
  });

  it('should convert CPQ dataType INPUT_NUMBER', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.INPUT_NUMBER,
    };
    expect(cpqConfiguratorUtilsService.convertDataType(attribute)).toBe(
      Configurator.DataType.INPUT_NUMBER
    );
  });

  it('should convert CPQ dataType User Selection (N/A)', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.N_A,
    };
    expect(cpqConfiguratorUtilsService.convertDataType(attribute)).toBe(
      Configurator.DataType.USER_SELECTION_NO_QTY
    );
  });

  it('should convert CPQ dataType User Selection with Quantity on attribute level (QTY_ATTRIBUTE_LEVEL)', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.QTY_ATTRIBUTE_LEVEL,
    };
    expect(cpqConfiguratorUtilsService.convertDataType(attribute)).toBe(
      Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL
    );
  });

  it('should convert CPQ dataType User Selection with Quantity on value level (QTY_VALUE_LEVEL)', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.CHECK_BOX,
      isLineItem: true,
    };
    expect(cpqConfiguratorUtilsService.convertDataType(attribute)).toBe(
      Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL
    );
  });

  it('should convert CPQ dataType User Selection with Quantity on value level (QTY_VALUE_LEVEL) for non line item multi selection attribute', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.CHECK_BOX,
      isLineItem: false,
    };
    expect(cpqConfiguratorUtilsService.convertDataType(attribute)).toBe(
      Configurator.DataType.USER_SELECTION_NO_QTY
    );
  });

  it('should convert CPQ dataType User Selection with Quantity on value level (QTY_VALUE_LEVEL) for single selection attribute', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.RADIO_BUTTON,
    };
    expect(cpqConfiguratorUtilsService.convertDataType(attribute)).toBe(
      Configurator.DataType.USER_SELECTION_NO_QTY
    );
  });

  it('should convert CPQ not supported dataType to NOT_IMPLEMENTED', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: null,
    };
    expect(cpqConfiguratorUtilsService.convertDataType(attribute)).toBe(
      Configurator.DataType.NOT_IMPLEMENTED
    );
  });

  it('should prepare price summary', () => {
    const cpqConfiguration: Cpq.Configuration = {
      productSystemId: 'productSystemId',
      currencyISOCode: 'USD',
      currencySign: '$',
      responder: { totalPrice: '$3333.33', baseProductPrice: '1000.00' },
    };
    const expectedPriceSummary: Configurator.PriceSummary = {
      basePrice: {
        currencyIso: 'USD',
        formattedValue: '$1,000.00',
        value: 1000,
      },
      currentTotal: {
        currencyIso: 'USD',
        formattedValue: '$3,333.33',
        value: 3333.33,
      },
      selectedOptions: {
        currencyIso: 'USD',
        formattedValue: '$2,333.33',
        value: 2333.33,
      },
    };
    expect(
      cpqConfiguratorUtilsService.preparePriceSummary(cpqConfiguration)
    ).toEqual(expectedPriceSummary);
  });

  it('should prepare price summary when no base price exists', () => {
    const cpqConfiguration: Cpq.Configuration = {
      productSystemId: 'productSystemId',
      currencyISOCode: 'USD',
      currencySign: '$',
      responder: { totalPrice: '$3333.33' },
    };
    const expectedPriceSummary: Configurator.PriceSummary = {
      currentTotal: {
        currencyIso: 'USD',
        formattedValue: '$3,333.33',
        value: 3333.33,
      },
    };
    expect(
      cpqConfiguratorUtilsService.preparePriceSummary(cpqConfiguration)
    ).toEqual(expectedPriceSummary);
  });

  it('should prepare price summary when no total price exists', () => {
    const cpqConfiguration: Cpq.Configuration = {
      productSystemId: 'productSystemId',
      currencyISOCode: 'USD',
      currencySign: '$',
      responder: { baseProductPrice: '1000.00' },
    };
    const expectedPriceSummary: Configurator.PriceSummary = {
      basePrice: {
        currencyIso: 'USD',
        formattedValue: '$1,000.00',
        value: 1000,
      },
    };
    expect(
      cpqConfiguratorUtilsService.preparePriceSummary(cpqConfiguration)
    ).toEqual(expectedPriceSummary);
  });

  it('should prepare price summary when no currency ISO code exists', () => {
    const cpqConfiguration: Cpq.Configuration = {
      productSystemId: 'productSystemId',
      currencySign: '$',
      responder: { totalPrice: '$3333.33', baseProductPrice: '1000.00' },
    };
    const expectedPriceSummary: Configurator.PriceSummary = {};
    expect(
      cpqConfiguratorUtilsService.preparePriceSummary(cpqConfiguration)
    ).toEqual(expectedPriceSummary);
  });

  it('should retrieve attribute label', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      label: 'label',
      name: 'name',
    };
    expect(cpqConfiguratorUtilsService.retrieveAttributeLabel(attribute)).toBe(
      'label'
    );
  });

  it('should retrieve attribute name if no label available', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      name: 'name',
    };
    expect(cpqConfiguratorUtilsService.retrieveAttributeLabel(attribute)).toBe(
      'name'
    );
  });

  it('should retrieve empty string if neither attribute label nor attribute name are available', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
    };
    expect(cpqConfiguratorUtilsService.retrieveAttributeLabel(attribute)).toBe(
      ''
    );
  });
});
