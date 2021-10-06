import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LanguageService, TranslationService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Observable, of } from 'rxjs';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorNormalizerUtilsService } from './cpq-configurator-normalizer-utils.service';
import { CpqConfiguratorOverviewNormalizer } from './cpq-configurator-overview-normalizer';

const ATTR_NAME = 'name of attribute';
const attr: Cpq.Attribute = {
  name: ATTR_NAME,
  stdAttrCode: 11,
  pA_ID: 111,
  values: [],
};

const GRP_DESCR = 'description of tab';
const GENERAL_GRP_DESCR = 'General';
const tab: Cpq.Tab = {
  id: 1,
  displayName: GRP_DESCR,
  attributes: [attr, { stdAttrCode: 12, pA_ID: 122, values: [] }],
};

const PRODUCT_CODE = 'PCODE';

const ERROR_MSG = 'This is an error message';
const CONFLICT_MSG = 'conflict message';
const VALIDATION_MSG = 'this is a failed validation';
const INVALID_MSG = 'This is an invalid message';
const INCOMPLETE_ATTR_1 = 'Attribute1';
const INCOMPLETE_ATTR_2 = 'Attribute2';
const INCOMPLETE_MSG = 'incomplete message';

const completeAndConsistentInput: Cpq.Configuration = {
  productSystemId: PRODUCT_CODE,
  tabs: [tab, { id: 2 }],
  currencyISOCode: 'USD',
  currencySign: '$',
  responder: { totalPrice: '$3333.33', baseProductPrice: '1000' },
  numberOfConflicts: 0,
};

const input: Cpq.Configuration = {
  ...completeAndConsistentInput,
  incompleteMessages: [INCOMPLETE_MSG],
  incompleteAttributes: [INCOMPLETE_ATTR_1, INCOMPLETE_ATTR_2],
  invalidMessages: [INVALID_MSG],
  failedValidations: [VALIDATION_MSG],
  errorMessages: [ERROR_MSG],
  conflictMessages: [CONFLICT_MSG],
};

const singleSelectionValues: Cpq.Value[] = [
  { paV_ID: 1, valueDisplay: 'another value', selected: false },
  { paV_ID: 2, valueDisplay: 'selected value', selected: true },
  { paV_ID: 3, valueDisplay: 'yet another value', selected: false },
];

const valuepCode1: Cpq.Value = {
  paV_ID: 1,
  valueDisplay: 'another product',
  productSystemId: 'pCode1',
  selected: false,
};
const valuepCode1WoValueDisplay: Cpq.Value = {
  paV_ID: 1,
  productSystemId: 'pCode1',
  selected: false,
};

const singleSelectionProductValues: Cpq.Value[] = [
  valuepCode1,
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

class MockTranslationService {
  translate(): Observable<string> {
    return of('General');
  }
}

describe('CpqConfiguratorOverviewNormalizer', () => {
  let serviceUnderTest: CpqConfiguratorOverviewNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CpqConfiguratorOverviewNormalizer,
        CpqConfiguratorNormalizerUtilsService,
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
      ],
    });

    serviceUnderTest = TestBed.inject(
      CpqConfiguratorOverviewNormalizer as Type<CpqConfiguratorOverviewNormalizer>
    );
  });

  it('should be created', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should map product code', () => {
    expect(serviceUnderTest.convert(input).productCode).toEqual(PRODUCT_CODE);
  });

  it('should calculate total number of issues', () => {
    expect(serviceUnderTest.convert(input).totalNumberOfIssues).toBe(6);
  });

  it('should have zero issues if complete and consistent', () => {
    expect(
      serviceUnderTest.convert(completeAndConsistentInput).totalNumberOfIssues
    ).toBe(0);
  });

  it('should prepare price summary', () => {
    const convertedPriceSummary = serviceUnderTest.convert(input).priceSummary;
    expect(convertedPriceSummary?.currentTotal?.formattedValue).toBe(
      '$3,333.33'
    );
    expect(convertedPriceSummary?.basePrice?.formattedValue).toBe('$1,000.00');
    expect(convertedPriceSummary?.selectedOptions?.formattedValue).toBe(
      '$2,333.33'
    );
  });

  it('should convert tabs to groups ignoring empty one', () => {
    expect(serviceUnderTest.convert(input).groups?.length).toBe(1);
  });

  it('should map tab ID', () => {
    expect(serviceUnderTest['convertTab'](tab, CURRENCY).id).toBe('1');
  });

  it('should map tab description', () => {
    expect(serviceUnderTest['convertTab'](tab, CURRENCY).groupDescription).toBe(
      GRP_DESCR
    );
  });

  it('should map tab description for General group', () => {
    const generalTab: Cpq.Tab = {
      id: 0,
    };
    expect(
      serviceUnderTest['convertTab'](generalTab, CURRENCY).groupDescription
    ).toBe(GENERAL_GRP_DESCR);
  });

  it('should convert attributes', () => {
    expect(
      serviceUnderTest['convertTab'](tab, CURRENCY).attributes?.length
    ).toBe(2);
  });

  it('should map attribute name', () => {
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].attribute
    ).toEqual(ATTR_NAME);
  });

  it('should map attribute name for every value', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs[0].attribute).toEqual(ATTR_NAME);
    expect(ovAttrs[1].attribute).toEqual(ATTR_NAME);
    expect(ovAttrs[0].attribute).toEqual(ovAttrs[1].attribute);
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

  it('should map attribute type BUNDLE in mix case', () => {
    const mixedValues: Cpq.Value[] = [
      {
        paV_ID: 1,
        valueDisplay: 'first value',
        productSystemId: 'productSystemId',
        selected: false,
      },
      { paV_ID: 2, valueDisplay: 'second value', selected: true },
    ];
    attr.values = mixedValues;
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].type
    ).toEqual(Configurator.AttributeOverviewType.BUNDLE);
  });

  it('should map user input as attribute value', () => {
    attr.userInput = 'input';
    attr.displayAs = Cpq.DisplayAs.INPUT;
    attr.dataType = Cpq.DataType.INPUT_STRING;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('input');
    expect(ovAttrs[0].productCode).toBeUndefined();
  });

  it('should map user input with not supported DataType as NOT_IMPLEMENTED', () => {
    attr.userInput = 'input';
    attr.displayAs = Cpq.DisplayAs.INPUT;
    attr.dataType = Cpq.DataType.INPUT_NUMBER;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('NOT_IMPLEMENTED');
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

  it('should map ReadOnly as NOT_IMPLEMENTED', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.READ_ONLY;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('NOT_IMPLEMENTED');
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
    expect(ovAttrs[0].valuePrice?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePrice?.value).toBe(123.45);
    expect(ovAttrs[0].valuePrice?.formattedValue).toBe('$123.45');
    expect(ovAttrs[0].valuePriceTotal?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePriceTotal?.value).toBe(370.35);
    expect(ovAttrs[0].valuePriceTotal?.formattedValue).toBe('$370.35');
  });

  it('should map quantity and price for attribute with quantity on value level', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    attr.dataType = Cpq.DataType.QTY_VALUE_LEVEL;
    attr.isLineItem = true;
    attr.quantity = '1';
    attr.values[1].quantity = '3';
    attr.values[1].price = '123.45';
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(2);
    expect(ovAttrs[0].quantity).toEqual(3);
    expect(ovAttrs[0].valuePrice?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePrice?.value).toBe(123.45);
    expect(ovAttrs[0].valuePrice?.formattedValue).toBe('$123.45');
    expect(ovAttrs[0].valuePriceTotal?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePriceTotal?.value).toBe(370.35);
    expect(ovAttrs[0].valuePriceTotal?.formattedValue).toBe('$370.35');
  });

  it('should map price for user input attribute', () => {
    attr.displayAs = Cpq.DisplayAs.INPUT;
    attr.dataType = Cpq.DataType.INPUT_STRING;
    attr.userInput = 'User Input';
    attr.values = [{ paV_ID: 1, selected: true, price: '123.45' }];
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].quantity).toEqual(1);
    expect(ovAttrs[0].valuePrice?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePrice?.value).toBe(123.45);
    expect(ovAttrs[0].valuePrice?.formattedValue).toBe('$123.45');
    expect(ovAttrs[0].valuePriceTotal?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePriceTotal?.value).toBe(123.45);
    expect(ovAttrs[0].valuePriceTotal?.formattedValue).toBe('$123.45');
  });

  describe('extractValue', () => {
    it('should fill attribute overview value with valueDisplay if available', () => {
      attr.values = singleSelectionProductValues;
      const attributeOverview = serviceUnderTest['extractValue'](
        valuepCode1,
        attr,
        CURRENCY
      );
      expect(attributeOverview.value).toBe(valuepCode1.valueDisplay);
    });
    it('should fill attribute overview value with id if valueDisplay is not available', () => {
      attr.values = [valuepCode1WoValueDisplay];
      const attributeOverview = serviceUnderTest['extractValue'](
        valuepCode1WoValueDisplay,
        attr,
        CURRENCY
      );
      expect(attributeOverview.value).toBe(
        valuepCode1WoValueDisplay.paV_ID.toString()
      );
    });
  });

  describe('extractValueUserInput', () => {
    it('should fill attribute overview value with userInput if available', () => {
      attr.userInput = 'Hullo';
      const attributeOverview = serviceUnderTest['extractValueUserInput'](
        attr,
        CURRENCY
      );
      expect(attributeOverview.value).toBe(attr.userInput);
    });
  });

  describe('extractValueUserInput', () => {
    it('should fill attribute overview value with id if userInput is not available', () => {
      attr.userInput = undefined;
      attr.stdAttrCode = 23;
      const attributeOverview = serviceUnderTest['extractValueUserInput'](
        attr,
        CURRENCY
      );
      expect(attributeOverview.value).toBe(attr.stdAttrCode.toString());
    });
  });
});
