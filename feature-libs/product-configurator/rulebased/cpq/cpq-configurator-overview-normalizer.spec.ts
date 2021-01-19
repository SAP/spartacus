import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LanguageService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Configurator } from '../core/model/configurator.model';
import { CpqConfiguratorOverviewNormalizer } from './cpq-configurator-overview-normalizer';
import { CpqConfiguratorUtilitiesService } from './cpq-configurator-utilities.service';
import { Cpq } from './cpq.models';

const ATTR_NAME = 'name of attribute';
const attr: Cpq.Attribute = {
  name: ATTR_NAME,
  stdAttrCode: 11,
  pA_ID: 111,
};

const GRP_DESCR = 'description of tab';
const tab: Cpq.Tab = {
  id: 1,
  name: GRP_DESCR,
  attributes: [attr, { stdAttrCode: 12, pA_ID: 122 }],
};

const PRODUCT_CODE = 'PCODE';
const input: Cpq.Configuration = {
  productSystemId: PRODUCT_CODE,
  incompleteAttributes: ['Camera Body'],
  numberOfConflicts: 2,
  tabs: [tab, { id: 2 }],
};

const singleSelectionValues: Cpq.Value[] = [
  { paV_ID: 1, valueDisplay: 'another value', selected: false },
  { paV_ID: 2, valueDisplay: 'selected value', selected: true },
  { paV_ID: 3, valueDisplay: 'yet another value', selected: false },
];

const singleSelectionProductValues: Cpq.Value[] = [
  {
    paV_ID: 1,
    valueDisplay: 'another product',
    productSystemId: 'pCode1',
    selected: false,
  },
  {
    paV_ID: 2,
    valueDisplay: 'selected product',
    productSystemId: 'pCode2',
    selected: true,
  },
  {
    paV_ID: 3,
    valueDisplay: 'yet another product',
    productSystemId: 'pCode3',
    selected: false,
  },
];

const multiSelectionValues: Cpq.Value[] = [
  { paV_ID: 1, valueDisplay: 'another value', selected: false },
  { paV_ID: 2, valueDisplay: 'selected value', selected: true },
  { paV_ID: 3, valueDisplay: 'yet another value', selected: false },
  { paV_ID: 4, valueDisplay: 'another selected value', selected: true },
];

const multiSelectionProductValues: Cpq.Value[] = [
  {
    paV_ID: 1,
    valueDisplay: 'another product',
    productSystemId: 'pCode1',
    selected: false,
  },
  {
    paV_ID: 2,
    valueDisplay: 'selected product',
    productSystemId: 'pCode2',
    selected: true,
  },
  {
    paV_ID: 3,
    valueDisplay: 'yet another product',
    productSystemId: 'pCode3',
    selected: false,
  },
  {
    paV_ID: 4,
    valueDisplay: 'another selected product',
    productSystemId: 'pCode4',
    selected: true,
  },
];

const CURRENCY = 'USD';

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('CpqConfiguratorOverviewNormalizer', () => {
  let serviceUnderTest: CpqConfiguratorOverviewNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CpqConfiguratorOverviewNormalizer,
        CpqConfiguratorUtilitiesService,
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
      ],
    });

    serviceUnderTest = TestBed.inject(
      CpqConfiguratorOverviewNormalizer as Type<
        CpqConfiguratorOverviewNormalizer
      >
    );
  });

  it('should be created', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should map product code', () => {
    expect(serviceUnderTest.convert(input).productCode).toEqual(PRODUCT_CODE);
  });

  it('should calculate total number of issues', () => {
    expect(serviceUnderTest.convert(input).totalNumberOfIssues).toBe(3);
  });

  it('should convert tabs to groups ignoring empty one', () => {
    expect(serviceUnderTest.convert(input).groups.length).toBe(1);
  });

  it('should map tab ID', () => {
    expect(serviceUnderTest['convertTab'](tab, CURRENCY).id).toBe('1');
  });

  it('should map tab description', () => {
    expect(serviceUnderTest['convertTab'](tab, CURRENCY).groupDescription).toBe(
      GRP_DESCR
    );
  });

  it('should convert attributes', () => {
    expect(
      serviceUnderTest['convertTab'](tab, CURRENCY).attributes.length
    ).toBe(2);
  });

  it('should map attribute name', () => {
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].attribute
    ).toEqual(ATTR_NAME);
  });

  it('should map attribute name only for first value', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs[0].attribute).toEqual(ATTR_NAME);
    expect(ovAttrs[1].attribute).toBeUndefined();
  });

  it('should map attribute type GENREAL', () => {
    attr.values = singleSelectionValues;
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].type
    ).toEqual(Configurator.AttributeOverviewType.GENERAL);
  });

  it('should map attribute type BUNDLE', () => {
    attr.values = singleSelectionProductValues;
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].type
    ).toEqual(Configurator.AttributeOverviewType.BUNDLE);
  });

  it('should map user input as attribute value', () => {
    attr.userInput = 'input';
    attr.displayAs = Cpq.DisplayAs.INPUT;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('input');
    expect(ovAttrs[0].productCode).toBeUndefined();
  });

  it('should map RB selected value', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.RADIO_BUTTON;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('selected value');
    expect(ovAttrs[0].productCode).toBeUndefined();
  });

  it('should map RB selected product', () => {
    attr.values = singleSelectionProductValues;
    attr.displayAs = Cpq.DisplayAs.RADIO_BUTTON;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('selected product');
    expect(ovAttrs[0].productCode).toEqual('pCode2');
  });

  it('should map ReadOnly selected value', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.READ_ONLY;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('selected value');
    expect(ovAttrs[0].productCode).toBeUndefined();
  });

  it('should map DDLB selected value', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.DROPDOWN;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('selected value');
    expect(ovAttrs[0].productCode).toBeUndefined();
  });

  it('should map DDLB selected value ignoring "No option selected"', () => {
    attr.values = [
      { paV_ID: 0, valueDisplay: 'No option selected', selected: true },
      { paV_ID: 2, valueDisplay: 'another value', selected: false },
      { paV_ID: 3, valueDisplay: 'yet another value', selected: false },
    ];
    attr.displayAs = Cpq.DisplayAs.DROPDOWN;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(0);
  });

  it('should map CHECK_BOX selected values', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(2);
    expect(ovAttrs[0].value).toEqual('selected value');
    expect(ovAttrs[1].value).toEqual('another selected value');
    expect(ovAttrs[0].productCode).toBeUndefined();
    expect(ovAttrs[1].productCode).toBeUndefined();
  });

  it('should map CHECK_BOX selected products', () => {
    attr.values = multiSelectionProductValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(2);
    expect(ovAttrs[0].value).toEqual('selected product');
    expect(ovAttrs[1].value).toEqual('another selected product');
    expect(ovAttrs[0].productCode).toEqual('pCode2');
    expect(ovAttrs[1].productCode).toEqual('pCode4');
  });

  it('should map LIST_BOX as not implemented', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.LIST_BOX;
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].value
    ).toEqual('NOT_IMPLEMENTED');
  });

  it('should map LIST_BOX_MULTI as not implemented', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.LIST_BOX_MULTI;
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].value
    ).toEqual('NOT_IMPLEMENTED');
  });

  it('should map AUTO_COMPLETE_CUSTOM as not implemented', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.AUTO_COMPLETE_CUSTOM;
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].value
    ).toEqual('NOT_IMPLEMENTED');
  });

  it('should map quantity and price for attribute with quantity on attribute level', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.DROPDOWN;
    attr.dataType = Cpq.DataType.QTY_ATTRIBUTE_LEVEL;
    attr.quantity = '3';
    attr.values[1].quantity = '1';
    attr.values[1].price = '123.45';
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].quantity).toEqual(3);
    expect(ovAttrs[0].valuePrice.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePrice.value).toBe(123.45);
    expect(ovAttrs[0].valuePrice.formattedValue).toBe('$123.45');
    expect(ovAttrs[0].valuePriceTotal.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePriceTotal.value).toBe(370.35);
    expect(ovAttrs[0].valuePriceTotal.formattedValue).toBe('$370.35');
  });

  it('should map quantity and price for attribute with quantity on value level', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    attr.dataType = Cpq.DataType.QTY_VALUE_LEVEL;
    attr.quantity = '1';
    attr.values[1].quantity = '3';
    attr.values[1].price = '123.45';
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(2);
    expect(ovAttrs[0].quantity).toEqual(3);
    expect(ovAttrs[0].valuePrice.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePrice.value).toBe(123.45);
    expect(ovAttrs[0].valuePrice.formattedValue).toBe('$123.45');
    expect(ovAttrs[0].valuePriceTotal.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePriceTotal.value).toBe(370.35);
    expect(ovAttrs[0].valuePriceTotal.formattedValue).toBe('$370.35');
  });

  it('should map price for user input attribute', () => {
    attr.displayAs = Cpq.DisplayAs.INPUT;
    attr.dataType = Cpq.DataType.INPUT_STRING;
    attr.userInput = 'User Input';
    attr.values = [{ paV_ID: 1, selected: true, price: '123.45' }];
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].quantity).toEqual(null);
    expect(ovAttrs[0].valuePrice.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePrice.value).toBe(123.45);
    expect(ovAttrs[0].valuePrice.formattedValue).toBe('$123.45');
    expect(ovAttrs[0].valuePriceTotal.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePriceTotal.value).toBe(123.45);
    expect(ovAttrs[0].valuePriceTotal.formattedValue).toBe('$123.45');
  });
});
