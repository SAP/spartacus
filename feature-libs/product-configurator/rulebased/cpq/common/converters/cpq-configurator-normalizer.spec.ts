import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LanguageService, TranslationService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Observable, of } from 'rxjs';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorNormalizer } from './cpq-configurator-normalizer';
import { CpqConfiguratorNormalizerUtilsService } from './cpq-configurator-normalizer-utils.service';

const cpqProductSystemId = 'PRODUCT_SYSTEM_ID';

const cpqValuePavId = 1;
const cpqValueCode = 'VALUE_CODE';
const cpqValueCode2 = 'VALUE_CODE2';
const cpqValueDisplay = 'VALUE_DISPLAY';
const cpqValueDescription = 'VALUE_DESCRIPTION';
const cpqValueProductSystemId = 'VALUE_PRODUCT_SYSTEM_ID';

const cpqAttributePaId = 11;
const cpqAttributeStdAttrCode = 1;
const cpqAttributeDescription = 'VALUE_DESCRIPTION';
const cpqAttributeLabel = 'VALUE_LABEL';
const cpqAttributeRequired = true;
const cpqAttributeIsLineItem = true;
const cpqAttributeHasConflict = true;
const cpqAttributeUserInput = '';
const cpqAttributeQuantity = '1';

const cpqAttributePaId2 = 22;
const cpqAttributeStdAttrCode2 = 2;
const cpqAttributeDescription2 = 'VALUE_DESCRIPTION_2';
const cpqAttributeLabel2 = 'VALUE_LABEL_2';
const cpqAttributeRequired2 = false;
const cpqAttributeIsLineItem2 = false;
const cpqAttributeHasConflict2 = false;
const cpqAttributeUserInput2 = 'USER_INPUT_2';

const cpqGroupIdNumber = 1;
const cpqGroupId = '1';
const cpqGroupName = 'GROUP_NAME';
const cpqGroupDisplayName = 'GROUP_DISPLAY_NAME';
const cpqGroupIsIncomplete = false;

const cpqGroupId2Number = 2;
const cpqGroupId2 = '2';

const configuratorAttributeQuantity = Number(cpqAttributeQuantity);
const configuratorAttributeDataType =
  Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL;

const CURRENCY = 'USD';

const cpqValue: Cpq.Value = {
  paV_ID: cpqValuePavId,
  valueCode: cpqValueCode,
  valueDisplay: cpqValueDisplay,
  description: cpqValueDescription,
  productSystemId: cpqValueProductSystemId,
  selected: true,
  quantity: '2',
  price: '123.45',
};

const cpqValue2: Cpq.Value = {
  paV_ID: 2,
  valueCode: 'VALUE_CODE_2',
  valueDisplay: 'VALUE_DISPLAY_2',
  description: 'VALUE_DESCRIPTION_2',
  productSystemId: 'VALUE_PRODUCT_SYSTEM_ID_2',
  selected: false,
};

const cpqAttribute: Cpq.Attribute = {
  pA_ID: cpqAttributePaId,
  stdAttrCode: cpqAttributeStdAttrCode,
  description: cpqAttributeDescription,
  label: cpqAttributeLabel,
  displayAs: Cpq.DisplayAs.RADIO_BUTTON,
  required: cpqAttributeRequired,
  isEnabled: true,
  incomplete: true,
  isLineItem: cpqAttributeIsLineItem,
  hasConflict: cpqAttributeHasConflict,
  userInput: cpqAttributeUserInput,
  quantity: cpqAttributeQuantity,
  dataType: Cpq.DataType.QTY_ATTRIBUTE_LEVEL,
  values: [cpqValue, cpqValue2],
};

const cpqAttribute2: Cpq.Attribute = {
  pA_ID: cpqAttributePaId2,
  stdAttrCode: cpqAttributeStdAttrCode2,
  description: cpqAttributeDescription2,
  label: cpqAttributeLabel2,
  displayAs: Cpq.DisplayAs.INPUT,
  dataType: Cpq.DataType.INPUT_STRING,
  required: cpqAttributeRequired2,
  isEnabled: true,
  incomplete: false,
  isLineItem: cpqAttributeIsLineItem2,
  hasConflict: cpqAttributeHasConflict2,
  userInput: cpqAttributeUserInput2,
  values: [],
};

const cpqAttributes: Cpq.Attribute[] = [cpqAttribute];

const cpqTab: Cpq.Tab = {
  id: cpqGroupIdNumber,
  name: cpqGroupName,
  displayName: cpqGroupDisplayName,
  isIncomplete: cpqGroupIsIncomplete,
  isSelected: true,
};

const cpqTab2: Cpq.Tab = {
  id: cpqGroupId2Number,
  name: 'GROUP_NAME2',
  displayName: 'GROUP_DISPLAY_NAME2',
  isIncomplete: false,
  isSelected: false,
};
const TEST_ATTR_NAME = 'testattr';

const cpqConfiguration: Cpq.Configuration = {
  productSystemId: cpqProductSystemId,
  incompleteAttributes: [],
  numberOfConflicts: 0,
  tabs: [cpqTab, cpqTab2],
  attributes: [cpqAttribute],
  currencyISOCode: 'USD',
  currencySign: '$',
  responder: { totalPrice: '$3333.33', baseProductPrice: '1000' },
  hasFullConfigurationState: true,
};

const ERROR_MSG = 'This is an error message';
const CONFLICT_MSG = 'conflict message';
const VALIDATION_MSG = 'this is a failed validation';
const INVALID_MSG = 'This is an invalid message';
const INCOMPLETE_ATTR_1 = 'Attribute1';
const INCOMPLETE_ATTR_2 = 'Attribute2';
const INCOMPLETE_MSG = 'incomplete message';
const cpqConfigurationIncompleteInconsistent: Cpq.Configuration = {
  ...cpqConfiguration,
  incompleteMessages: [INCOMPLETE_MSG],
  incompleteAttributes: [INCOMPLETE_ATTR_1, INCOMPLETE_ATTR_2],
  invalidMessages: [INVALID_MSG],
  failedValidations: [VALIDATION_MSG],
  errorMessages: [ERROR_MSG],
  conflictMessages: [CONFLICT_MSG],
  numberOfConflicts: 1,
};

const cpqConfigurationCompleteInconsistent: Cpq.Configuration = {
  ...cpqConfiguration,
  incompleteMessages: [INCOMPLETE_MSG],
  incompleteAttributes: [],
  invalidMessages: [INVALID_MSG],
  failedValidations: [VALIDATION_MSG],
  errorMessages: [ERROR_MSG],
};

const cpqConfigurationIncompleteConsistent: Cpq.Configuration = {
  ...cpqConfiguration,
  incompleteAttributes: [TEST_ATTR_NAME],
  numberOfConflicts: 0,
};

const cpqConfigurationId = '1234-56-7890';

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

class MockTranslationService {
  translate(key: string, options: any): Observable<string> {
    if (key.endsWith('incomplete')) {
      return of(TEST_MESSAGE + options.attribute);
    } else {
      return of(key);
    }
  }
}

const TEST_MESSAGE = 'This is test test message for attribute ';

describe('CpqConfiguratorNormalizer', () => {
  let cpqConfiguratorNormalizer: CpqConfiguratorNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CpqConfiguratorNormalizer,
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

    cpqConfiguratorNormalizer = TestBed.inject(
      CpqConfiguratorNormalizer as Type<CpqConfiguratorNormalizer>
    );
  });

  it('should create an injectable normalizer instance', () => {
    expect(cpqConfiguratorNormalizer).toBeTruthy();
  });

  describe('convert', () => {
    it('should map product code, completeness, groups, prices and an empty configId', () => {
      const result = cpqConfiguratorNormalizer.convert(cpqConfiguration);
      expect(result.productCode).toBe(cpqProductSystemId);
      expect(result.complete).toBe(true);
      expect(result.consistent).toBe(true);
      expect(result.totalNumberOfIssues).toBe(0);
      expect(result.groups.length).toBe(2);
      expect(result.groups[0].id).toBe(cpqGroupId);
      expect(result.groups[0].attributes?.length).toBe(0);
      expect(result.groups[1].id).toBe(cpqGroupId2);
      expect(result.groups[1].attributes?.length).toBe(0);
      expect(result.priceSummary?.currentTotal?.formattedValue).toBe(
        '$3,333.33'
      );
      expect(result.priceSummary?.basePrice?.formattedValue).toBe('$1,000.00');
      expect(result.priceSummary?.selectedOptions?.formattedValue).toBe(
        '$2,333.33'
      );
      expect(result.configId).toBe('');
    });

    it('should assign each tab its own attributes when hasFullConfigurationState is true', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfiguration,
        hasFullConfigurationState: true,
        tabs: [
          {
            ...cpqTab,
            attributes: [cpqAttribute],
          },
          {
            ...cpqTab2,
            attributes: [cpqAttribute2],
          },
        ],
      });
      expect(result.groups[0].attributes?.length).toBe(1);
      expect(result.groups[0].attributes?.[0].name).toBe(
        cpqAttributePaId.toString()
      );
      expect(result.groups[1].attributes?.length).toBe(1);
      expect(result.groups[1].attributes?.[0].name).toBe(
        cpqAttributePaId2.toString()
      );
    });

    it('should copy configurationId onto configId', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfiguration,
        configurationId: cpqConfigurationId,
      });
      expect(result.configId).toBe(cpqConfigurationId);
    });

    it('should treat missing incompleteAttributes as a complete configuration', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfiguration,
        incompleteAttributes: undefined,
      });
      expect(result.complete).toBe(true);
    });

    it('should mark the configuration inconsistent when only invalidMessages are present (other issue lists empty)', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationIncompleteInconsistent,
        failedValidations: [],
        incompleteMessages: [],
        errorMessages: [],
      });
      expect(result.consistent).toBe(false);
    });

    it('should mark the configuration inconsistent when only invalidMessages are present (other issue lists undefined)', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationIncompleteInconsistent,
        failedValidations: undefined,
        incompleteMessages: undefined,
        errorMessages: undefined,
      });
      expect(result.consistent).toBe(false);
    });

    it('should mark the configuration inconsistent when only failedValidations are present (other issue lists empty)', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationIncompleteInconsistent,
        invalidMessages: [],
        incompleteMessages: [],
        errorMessages: [],
      });
      expect(result.consistent).toBe(false);
    });

    it('should mark the configuration inconsistent when only failedValidations are present (other issue lists undefined)', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationIncompleteInconsistent,
        invalidMessages: undefined,
        incompleteMessages: undefined,
        errorMessages: undefined,
      });
      expect(result.consistent).toBe(false);
    });

    it('should mark the configuration inconsistent when only incompleteMessages are present (other issue lists empty)', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationIncompleteInconsistent,
        invalidMessages: [],
        failedValidations: [],
        errorMessages: [],
      });
      expect(result.consistent).toBe(false);
    });

    it('should mark the configuration inconsistent when only incompleteMessages are present (other issue lists undefined)', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationIncompleteInconsistent,
        invalidMessages: undefined,
        failedValidations: undefined,
        errorMessages: undefined,
      });
      expect(result.consistent).toBe(false);
    });

    it('should mark the configuration inconsistent when only errorMessages are present (other issue lists empty)', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationIncompleteInconsistent,
        invalidMessages: [],
        failedValidations: [],
        incompleteMessages: [],
      });
      expect(result.consistent).toBe(false);
    });

    it('should mark the configuration inconsistent when only errorMessages are present (other issue lists undefined)', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationIncompleteInconsistent,
        invalidMessages: undefined,
        failedValidations: undefined,
        incompleteMessages: undefined,
      });
      expect(result.consistent).toBe(false);
    });

    it('should mark the configuration incomplete and inconsistent when both issues and incomplete attributes exist', () => {
      const result = cpqConfiguratorNormalizer.convert(
        cpqConfigurationIncompleteInconsistent
      );
      expect(result.productCode).toBe(cpqProductSystemId);
      expect(result.complete).toBe(false);
      expect(result.consistent).toBe(false);
      expect(result.totalNumberOfIssues).toBe(6);
    });

    it('should mark the configuration complete but inconsistent when only consistency issues exist', () => {
      const result = cpqConfiguratorNormalizer.convert(
        cpqConfigurationCompleteInconsistent
      );
      expect(result.productCode).toBe(cpqProductSystemId);
      expect(result.complete).toBe(true);
      expect(result.consistent).toBe(false);
      expect(result.totalNumberOfIssues).toBe(4);
    });

    it('should fall back to a single generic group when tabs are undefined', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationCompleteInconsistent,
        tabs: undefined,
      });
      expect(result.groups.length).toBe(1);
    });

    it('should create an empty generic group when both tabs and attributes are undefined', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationCompleteInconsistent,
        attributes: undefined,
        tabs: undefined,
      });
      expect(result.groups.length).toBe(1);
      expect(result.groups[0].attributes).toEqual([]);
    });

    it('should convert tabs to groups with empty attributes when source attributes are undefined', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationCompleteInconsistent,
        attributes: undefined,
      });
      expect(result.groups.length).toBe(2);
      expect(result.groups[0].attributes).toEqual([]);
      expect(result.groups[1].attributes).toEqual([]);
    });

    it('should mark the generic group complete when tabs and incompleteAttributes are undefined', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationCompleteInconsistent,
        incompleteAttributes: undefined,
        tabs: undefined,
      });
      expect(result.groups.length).toBe(1);
      expect(result.groups[0].complete).toBe(true);
    });

    it('should collect errorMessages from error and invalid messages', () => {
      const mappedConfiguration = cpqConfiguratorNormalizer.convert(
        cpqConfigurationIncompleteInconsistent
      );
      expect(mappedConfiguration.errorMessages?.length).toBe(2);

      checkMessagePresent(mappedConfiguration.errorMessages, ERROR_MSG);
      checkMessagePresent(mappedConfiguration.errorMessages, INVALID_MSG);
    });

    it('should collect warningMessages from failed validations and incomplete messages', () => {
      const mappedConfiguration = cpqConfiguratorNormalizer.convert(
        cpqConfigurationIncompleteInconsistent
      );
      expect(mappedConfiguration.warningMessages?.length).toBe(2);
      checkMessagePresent(mappedConfiguration.warningMessages, VALIDATION_MSG);
      checkMessagePresent(mappedConfiguration.warningMessages, INCOMPLETE_MSG);
    });

    it('should map typed messages with severity and keep hasFullConfigurationState true', () => {
      const mappedConfiguration = cpqConfiguratorNormalizer.convert({
        ...cpqConfigurationIncompleteInconsistent,
        messages: [
          {
            message: 'Check zoom range',
            severity: Cpq.MessageSeverity.WARNING,
          },
          {
            message: 'Info only',
            severity: Cpq.MessageSeverity.INFO,
          },
        ],
      });
      expect(mappedConfiguration.hasFullConfigurationState).toBe(true);
      expect(mappedConfiguration.messages).toEqual([
        {
          message: 'Check zoom range',
          severity: Configurator.MessageSeverity.ERROR,
        },
        {
          message: 'Info only',
          severity: Configurator.MessageSeverity.WARNING,
        },
      ]);
      expect(mappedConfiguration.errorMessages?.length).toBe(2);
      expect(mappedConfiguration.warningMessages?.length).toBe(2);
    });

    it('should leave typed root messages undefined when the source has none', () => {
      const mappedConfiguration =
        cpqConfiguratorNormalizer.convert(cpqConfiguration);
      expect(mappedConfiguration.hasFullConfigurationState).toBe(true);
      expect(mappedConfiguration.messages).toBeUndefined();
    });

    it('should preserve hasFullConfigurationState when the source sets it to false', () => {
      const mappedConfiguration = cpqConfiguratorNormalizer.convert({
        ...cpqConfiguration,
        hasFullConfigurationState: false,
      });
      expect(mappedConfiguration.hasFullConfigurationState).toBe(false);
    });

    it('should always enable pricing on the converted configuration', () => {
      const mappedConfiguration =
        cpqConfiguratorNormalizer.convert(cpqConfiguration);
      expect(mappedConfiguration.pricingEnabled).toBe(true);
    });
  });

  describe('convertValueCode', () => {
    it('should map paV_ID 0 to the retract value code', () => {
      expect(cpqConfiguratorNormalizer['convertValueCode'](0)).toEqual(
        Configurator.RetractValueCode
      );
    });

    it('should stringify a non-zero paV_ID as the valueCode', () => {
      const pav_ID = 8462;
      expect(cpqConfiguratorNormalizer['convertValueCode'](pav_ID)).toEqual(
        pav_ID.toString()
      );
    });
  });

  describe('convertValue', () => {
    it('should map valueCode, name, display, description, productSystemId, selected and quantity', () => {
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        dataType: Cpq.DataType.QTY_ATTRIBUTE_LEVEL,
        quantity: '3',
        values: [cpqValue],
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['convertValue'](
        cpqValue,
        cpqAttr,
        CURRENCY,
        values
      );
      expect(values.length).toBe(1);
      const value: Configurator.Value = values[0];
      expect(value.valueCode).toBe(cpqValuePavId.toString());
      expect(value.name).toBe(cpqValueCode);
      expect(value.valueDisplay).toBe(cpqValueDisplay);
      expect(value.description).toBe(cpqValueDescription);
      expect(value.productSystemId).toBe(cpqValueProductSystemId);
      expect(value.selected).toBe(true);
      expect(value.quantity).toBe(3);
    });

    it('should map valuePrice and valuePriceTotal (quantity × unit price) onto the converted value', () => {
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        dataType: Cpq.DataType.QTY_ATTRIBUTE_LEVEL,
        quantity: '3',
        values: [cpqValue],
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['convertValue'](
        cpqValue,
        cpqAttr,
        CURRENCY,
        values
      );
      expect(values.length).toBe(1);
      const value: Configurator.Value = values[0];
      expect(value.valuePrice).toEqual({
        currencyIso: 'USD',
        value: 123.45,
        formattedValue: '$123.45',
      });
      expect(value.valuePriceTotal).toEqual({
        currencyIso: 'USD',
        value: 370.35,
        formattedValue: '$370.35',
      });
    });

    it('should skip the retract option for a required dropdown that already has a real selection', () => {
      const cpqValueA: Cpq.Value = { paV_ID: 0, selected: false };
      const cpqValueB: Cpq.Value = { paV_ID: 1, selected: true };
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        displayAs: Cpq.DisplayAs.DROPDOWN,
        required: true,
        values: [cpqValueA, cpqValueB],
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['convertValue'](
        cpqValueA,
        cpqAttr,
        CURRENCY,
        values
      );
      expect(values.length).toBe(0);
    });

    it('should keep the retract option for a non-required dropdown that already has a real selection', () => {
      const cpqValueA: Cpq.Value = { paV_ID: 0, selected: false };
      const cpqValueB: Cpq.Value = { paV_ID: 1, selected: true };
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        displayAs: Cpq.DisplayAs.DROPDOWN,
        required: false,
        values: [cpqValueA, cpqValueB],
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['convertValue'](
        cpqValueA,
        cpqAttr,
        CURRENCY,
        values
      );
      expect(values.length).toBe(1);
      expect(values[0].valueCode).toBe(Configurator.RetractValueCode);
    });
  });

  describe('convertAttribute', () => {
    it('should map a radio-button attribute whose values have no product sysId', () => {
      const attributeList: Configurator.Attribute[] = [];

      const cpqValueNoSysId1: Cpq.Value = { ...cpqValue };
      delete cpqValueNoSysId1.productSystemId;

      const cpqValueNoSysId2: Cpq.Value = { ...cpqValue2 };
      delete cpqValueNoSysId2.productSystemId;

      const cpqAttributeNoSysId: Cpq.Attribute = {
        ...cpqAttribute,
        values: [cpqValueNoSysId1, cpqValueNoSysId2],
      };

      cpqConfiguratorNormalizer['convertAttribute'](
        cpqAttributeNoSysId,
        cpqGroupIdNumber,
        CURRENCY,
        attributeList
      );

      const attribute: Configurator.Attribute = attributeList[0];

      expect(attributeList.length).toBe(1);
      expect(attribute.attrCode).toBe(cpqAttributeStdAttrCode);
      expect(attribute.name).toBe(cpqAttributePaId.toString());
      expect(attribute.description).toBe(cpqAttributeDescription);
      expect(attribute.label).toBe(cpqAttributeLabel);
      expect(attribute.required).toBe(cpqAttributeRequired);
      expect(attribute.isLineItem).toBe(cpqAttributeIsLineItem);
      expect(attribute.uiType).toBe(Configurator.UiType.RADIOBUTTON);
      expect(attribute.selectedSingleValue).toBe(cpqValuePavId.toString());
      expect(attribute.groupId).toBe(cpqGroupId);
      expect(attribute.userInput).toBe(cpqAttributeUserInput);
      expect(attribute.hasConflicts).toBe(cpqAttributeHasConflict);
      expect(attribute.incomplete).toBe(false);
      expect(attribute.quantity).toBe(configuratorAttributeQuantity);
      expect(attribute.dataType).toBe(configuratorAttributeDataType);

      const values = attribute.values;
      expect(values?.length).toBe(2);
      expect(values?.[0].valueCode).toBe(cpqValuePavId.toString());
    });

    it('should map a radio-button-product attribute when multiple values have a product sysId', () => {
      const attributeList: Configurator.Attribute[] = [];

      cpqConfiguratorNormalizer['convertAttribute'](
        cpqAttribute,
        cpqGroupIdNumber,
        CURRENCY,
        attributeList
      );

      const attribute: Configurator.Attribute = attributeList[0];

      expect(attributeList.length).toBe(1);
      expect(attribute.attrCode).toBe(cpqAttributeStdAttrCode);
      expect(attribute.name).toBe(cpqAttributePaId.toString());
      expect(attribute.description).toBe(cpqAttributeDescription);
      expect(attribute.label).toBe(cpqAttributeLabel);
      expect(attribute.required).toBe(cpqAttributeRequired);
      expect(attribute.isLineItem).toBe(cpqAttributeIsLineItem);
      expect(attribute.uiType).toBe(Configurator.UiType.RADIOBUTTON_PRODUCT);
      expect(attribute.selectedSingleValue).toBe(cpqValuePavId.toString());
      expect(attribute.groupId).toBe(cpqGroupId);
      expect(attribute.userInput).toBe(cpqAttributeUserInput);
      expect(attribute.hasConflicts).toBe(cpqAttributeHasConflict);
      expect(attribute.incomplete).toBe(false);
      expect(attribute.quantity).toBe(configuratorAttributeQuantity);
      expect(attribute.dataType).toBe(configuratorAttributeDataType);
      expect(attribute.attributePriceTotal).toEqual({
        currencyIso: 'USD',
        value: 123.45,
        formattedValue: '$123.45',
      });

      const values = attribute.values;
      expect(values?.length).toBe(2);
    });

    it('should still use the product radio-button ui type when only one value has a sysId', () => {
      const attributeList: Configurator.Attribute[] = [];

      const cpqValueNoSysId: Cpq.Value = { ...cpqValue };
      delete cpqValueNoSysId.productSystemId;

      const cpqAttributeOnlyOneSysId: Cpq.Attribute = {
        ...cpqAttribute,
        values: [cpqValueNoSysId, cpqValue2],
      };

      cpqConfiguratorNormalizer['convertAttribute'](
        cpqAttributeOnlyOneSysId,
        cpqGroupIdNumber,
        CURRENCY,
        attributeList
      );

      const attribute: Configurator.Attribute = attributeList[0];

      expect(attributeList.length).toBe(1);
      expect(attribute.attrCode).toBe(cpqAttributeStdAttrCode);
      expect(attribute.name).toBe(cpqAttributePaId.toString());
      expect(attribute.description).toBe(cpqAttributeDescription);
      expect(attribute.label).toBe(cpqAttributeLabel);
      expect(attribute.required).toBe(cpqAttributeRequired);
      expect(attribute.isLineItem).toBe(cpqAttributeIsLineItem);
      expect(attribute.uiType).toBe(Configurator.UiType.RADIOBUTTON_PRODUCT);
      expect(attribute.selectedSingleValue).toBe(cpqValuePavId.toString());
      expect(attribute.groupId).toBe(cpqGroupId);
      expect(attribute.userInput).toBe(cpqAttributeUserInput);
      expect(attribute.hasConflicts).toBe(cpqAttributeHasConflict);
      expect(attribute.incomplete).toBe(false);
      expect(attribute.quantity).toBe(configuratorAttributeQuantity);
      expect(attribute.dataType).toBe(configuratorAttributeDataType);

      const values = attribute.values;
      expect(values?.length).toBe(2);
    });

    it('should map a string input attribute that has no values', () => {
      const attributeList: Configurator.Attribute[] = [];

      cpqConfiguratorNormalizer['convertAttribute'](
        cpqAttribute2,
        cpqGroupIdNumber,
        CURRENCY,
        attributeList
      );

      const attribute: Configurator.Attribute = attributeList[0];

      expect(attributeList.length).toBe(1);
      expect(attribute.attrCode).toBe(cpqAttributeStdAttrCode2);
      expect(attribute.name).toBe(cpqAttributePaId2.toString());
      expect(attribute.description).toBe(cpqAttributeDescription2);
      expect(attribute.label).toBe(cpqAttributeLabel2);
      expect(attribute.required).toBe(cpqAttributeRequired2);
      expect(attribute.isLineItem).toBe(cpqAttributeIsLineItem2);
      expect(attribute.uiType).toBe(Configurator.UiType.STRING);
      expect(attribute.selectedSingleValue).toBeUndefined();
      expect(attribute.groupId).toBe(cpqGroupId);
      expect(attribute.userInput).toBe(cpqAttributeUserInput2);
      expect(attribute.hasConflicts).toBe(cpqAttributeHasConflict2);
      expect(attribute.incomplete).toBe(false);

      const values = attribute.values;
      expect(values?.length).toBe(undefined);
    });

    it('should fall back to the CPQ name when the attribute label is missing', () => {
      const attributeList: Configurator.Attribute[] = [];
      const cpqAttributeWithoutLabel: Cpq.Attribute = {
        ...cpqAttribute,
        label: undefined,
        name: 'AttributeName',
      };
      cpqConfiguratorNormalizer['convertAttribute'](
        cpqAttributeWithoutLabel,
        cpqGroupIdNumber,
        CURRENCY,
        attributeList
      );
      const attribute: Configurator.Attribute = attributeList[0];
      expect(attributeList.length).toBe(1);
      expect(attribute.label).toBe('AttributeName');
    });

    it('should set visible to true on every converted attribute', () => {
      const attributeList: Configurator.Attribute[] = [];

      cpqConfiguratorNormalizer['convertAttribute'](
        cpqAttribute,
        cpqGroupIdNumber,
        CURRENCY,
        attributeList
      );
      const attribute: Configurator.Attribute = attributeList[0];
      expect(attributeList.length).toBe(1);
      expect(attribute.visible).toBe(true);
    });
  });

  describe('convertGroup', () => {
    it('should map tab id, name, completeness and attributes onto an attribute group', () => {
      const groups: Configurator.Group[] = [];
      const flatGroups: Configurator.Group[] = [];
      cpqConfiguratorNormalizer['convertGroup'](
        cpqTab,
        cpqAttributes,
        CURRENCY,
        groups,
        flatGroups
      );
      expect(groups.length).toBe(1);
      expect(flatGroups.length).toBe(1);
      const group: Configurator.Group = groups[0];
      expect(group.id).toBe(cpqGroupId);
      expect(group.name).toBe(cpqGroupName);
      expect(group.description).toBe(cpqGroupDisplayName);
      expect(group.configurable).toBe(true);
      expect(group.complete).toBe(!cpqGroupIsIncomplete);
      expect(group.consistent).toBe(true);
      expect(group.groupType).toBe(Configurator.GroupType.ATTRIBUTE_GROUP);
      expect(group.subGroups.length).toBe(0);
      expect(group.attributes?.length).toBe(1);
      if (group.attributes) {
        expect(group.attributes[0].attrCode).toBe(cpqAttributeStdAttrCode);
        expect(group.attributes[0].groupId).toBe(cpqGroupId);
      } else {
        fail();
      }
    });

    it('should build the _GEN group with translated description and source attributes', () => {
      const groups: Configurator.Group[] = [];
      const flatGroups: Configurator.Group[] = [];
      const incompleteAttributes: string[] = ['Attribute1', 'Attribute2'];
      cpqConfiguratorNormalizer['convertGenericGroup'](
        cpqAttributes,
        incompleteAttributes,
        CURRENCY,
        groups,
        flatGroups
      );
      expect(groups.length).toBe(1);
      expect(flatGroups.length).toBe(1);
      const group: Configurator.Group = groups[0];
      expect(group.id).toBe('1');
      expect(group.name).toBe('_GEN');
      expect(group.description).toBe('configurator.group.general');
      expect(group.configurable).toBe(true);
      expect(group.complete).toBe(false);
      expect(group.consistent).toBe(true);
      expect(group.groupType).toBe(Configurator.GroupType.ATTRIBUTE_GROUP);
      expect(group.subGroups.length).toBe(0);
      expect(group.attributes?.length).toBe(1);
      if (group.attributes) {
        expect(group.attributes[0].attrCode).toBe(cpqAttributeStdAttrCode);
      } else {
        fail();
      }
    });
  });

  describe('convertAttributeType', () => {
    describe('when at least one value has a productSystemId', () => {
      it('should map RADIO_BUTTON with a product value to RADIOBUTTON_PRODUCT', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.RADIO_BUTTON,
          isEnabled: true,
          values: [{ paV_ID: 1, productSystemId: 'System_Id' }],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.RADIOBUTTON_PRODUCT
        );
      });

      it('should map DROPDOWN with a product value to DROPDOWN_PRODUCT', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.DROPDOWN,
          isEnabled: true,
          values: [{ paV_ID: 1, productSystemId: 'System_Id' }],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.DROPDOWN_PRODUCT
        );
      });

      it('should map CHECK_BOX with a product value to CHECKBOXLIST_PRODUCT', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.CHECK_BOX,
          isEnabled: true,
          values: [{ paV_ID: 1, productSystemId: 'System_Id' }],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.CHECKBOXLIST_PRODUCT
        );
      });
    });

    describe('when no value has a productSystemId', () => {
      it('should map RADIO_BUTTON without a product value to RADIOBUTTON', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.RADIO_BUTTON,
          isEnabled: true,
          values: [{ paV_ID: 1 }],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.RADIOBUTTON
        );
      });

      it('should map DROPDOWN without a product value to DROPDOWN', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.DROPDOWN,
          isEnabled: true,
          values: [{ paV_ID: 1 }],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.DROPDOWN
        );
      });

      it('should map CHECK_BOX without a product value to CHECKBOXLIST', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.CHECK_BOX,
          isEnabled: true,
          values: [{ paV_ID: 1 }],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.CHECKBOXLIST
        );
      });

      it('should map INPUT with INPUT_STRING data type to STRING', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.INPUT,
          dataType: Cpq.DataType.INPUT_STRING,
          isEnabled: true,
          values: [],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.STRING
        );
      });

      it('should map CONTAINER displayAs to CONTAINER ui type', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.CONTAINER,
          isEnabled: true,
          values: [],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.CONTAINER
        );
      });

      it('should map INPUT with a non-string data type to NOT_IMPLEMENTED', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.INPUT,
          dataType: Cpq.DataType.INPUT_NUMBER,
          isEnabled: true,
          values: [],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.NOT_IMPLEMENTED
        );
      });

      it('should map CPQ READ_ONLY displayAs to NOT_IMPLEMENTED', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.READ_ONLY,
          isEnabled: true,
          values: [],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.NOT_IMPLEMENTED
        );
      });

      it('should map an unsupported displayAs such as LIST_BOX to NOT_IMPLEMENTED', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.LIST_BOX,
          isEnabled: true,
          values: [],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.NOT_IMPLEMENTED
        );
      });

      it('should map a supported displayAs to READ_ONLY when isEnabled is false', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.RADIO_BUTTON,
          isEnabled: false,
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.READ_ONLY
        );
      });

      it('should map a supported displayAs to READ_ONLY when isEnabled is undefined', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.RADIO_BUTTON,
          isEnabled: undefined,
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.READ_ONLY
        );
      });

      it('should keep LIST_BOX as NOT_IMPLEMENTED even when isEnabled is false', () => {
        const cpqAttr: Cpq.Attribute = {
          pA_ID: 1,
          stdAttrCode: 2,
          displayAs: Cpq.DisplayAs.LIST_BOX,
          isEnabled: false,
          values: [{ paV_ID: 1 }],
        };
        expect(cpqConfiguratorNormalizer['convertAttributeType'](cpqAttr)).toBe(
          Configurator.UiType.NOT_IMPLEMENTED
        );
      });
    });
  });

  describe('setSelectedSingleValue', () => {
    it('should copy the valueCode when exactly one value is selected', () => {
      const configAttribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        values: [{ valueCode: 'VK1' }, { valueCode: 'VK2', selected: true }],
      };
      cpqConfiguratorNormalizer['setSelectedSingleValue'](configAttribute);
      expect(configAttribute.selectedSingleValue).toBe('VK2');
    });

    it('should leave selectedSingleValue unset when more than one value is selected', () => {
      const configAttribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        values: [
          { valueCode: 'VK1', selected: true },
          { valueCode: 'VK2', selected: true },
        ],
      };
      cpqConfiguratorNormalizer['setSelectedSingleValue'](configAttribute);
      expect(configAttribute.selectedSingleValue).toBeUndefined();
    });

    it('should leave selectedSingleValue unset when the attribute has no values', () => {
      const configAttribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
      };
      cpqConfiguratorNormalizer['setSelectedSingleValue'](configAttribute);
      expect(configAttribute.selectedSingleValue).toBeUndefined();
    });
  });

  describe('compileAttributeIncomplete', () => {
    it('should mark single-selection attributes incomplete unless a value is selected', () => {
      const attributeRBWithValues: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.RADIOBUTTON,
        selectedSingleValue: 'SomeValue',
      };
      const attributeRBWoValues: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.RADIOBUTTON,
        selectedSingleValue: '',
      };
      const attributeDDWithValues: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.DROPDOWN,
        selectedSingleValue: 'SomeValue',
      };
      const attributeDDWoValues: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.DROPDOWN,
        selectedSingleValue: '',
      };
      const attributeSSIWithValues: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
        selectedSingleValue: 'SomeValue',
      };
      const attributeSSIWoValues: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
        selectedSingleValue: '',
      };

      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeRBWoValues
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeRBWithValues
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeDDWoValues
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeDDWithValues
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeSSIWoValues
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeSSIWithValues
      );

      expect(attributeRBWoValues.incomplete).toBe(true);
      expect(attributeRBWithValues.incomplete).toBe(false);
      expect(attributeDDWoValues.incomplete).toBe(true);
      expect(attributeDDWithValues.incomplete).toBe(false);
      expect(attributeSSIWoValues.incomplete).toBe(true);
      expect(attributeSSIWithValues.incomplete).toBe(false);
    });

    it('should mark string and numeric attributes incomplete unless userInput is set', () => {
      const attributeStringWithValues: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.STRING,
        userInput: 'User Input',
      };
      const attributeStringWoValues: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.STRING,
        userInput: '',
      };
      const attributeNumericWithValues: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.NUMERIC,
        userInput: '123',
      };
      const attributeNumericWoValues: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.NUMERIC,
        userInput: '',
      };

      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeStringWithValues
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeStringWoValues
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeNumericWithValues
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeNumericWoValues
      );

      expect(attributeStringWithValues.incomplete).toBe(false);
      expect(attributeStringWoValues.incomplete).toBe(true);
      expect(attributeNumericWithValues.incomplete).toBe(false);
      expect(attributeNumericWoValues.incomplete).toBe(true);
    });

    it('should mark multi-select attributes incomplete unless at least one value is selected', () => {
      const valuesWOSelectedOne: Configurator.Value[] = [
        { name: 'name1', selected: false, valueCode: cpqValueCode },
        { name: 'name2', selected: false, valueCode: cpqValueCode2 },
      ];
      const valuesWithSelectedOne: Configurator.Value[] = [
        { name: 'name1', selected: true, valueCode: cpqValueCode },
        { name: 'name2', selected: false, valueCode: cpqValueCode2 },
      ];
      const attributeCheckboxWOValue: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.CHECKBOX,
        values: valuesWOSelectedOne,
      };
      const attributeCheckboxWithValue: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.CHECKBOX,
        values: valuesWithSelectedOne,
      };
      const attributeCheckboxlistWOValue: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.CHECKBOXLIST,
        values: valuesWOSelectedOne,
      };
      const attributeCheckboxlistWithValue: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.CHECKBOXLIST,
        values: valuesWithSelectedOne,
      };
      const attributeMSIWOValue: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
        values: valuesWOSelectedOne,
      };
      const attributeMSIWithValue: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
        values: valuesWithSelectedOne,
      };

      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeCheckboxWOValue
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeCheckboxWithValue
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeCheckboxlistWOValue
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeCheckboxlistWithValue
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeMSIWOValue
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeMSIWithValue
      );

      expect(attributeCheckboxWOValue.incomplete).toBe(true);
      expect(attributeCheckboxWithValue.incomplete).toBe(false);
      expect(attributeCheckboxlistWOValue.incomplete).toBe(true);
      expect(attributeCheckboxlistWithValue.incomplete).toBe(false);
      expect(attributeMSIWOValue.incomplete).toBe(true);
      expect(attributeMSIWithValue.incomplete).toBe(false);
    });

    it('should mark a multi-selection image incomplete when values are undefined', () => {
      const attributeMSIWOValue: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
        values: undefined,
      };
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeMSIWOValue
      );
      expect(attributeMSIWOValue.incomplete).toBe(true);
    });

    it('should mark a CONTAINER attribute complete when selected rows meet minRows', () => {
      const attributeWithSelectedRow: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.CONTAINER,
        container: { minRows: 1, rows: [{ id: '1', selected: true }] },
      };

      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeWithSelectedRow
      );

      expect(attributeWithSelectedRow.incomplete).toBe(false);
    });

    it('should mark a CONTAINER attribute incomplete when selected rows are below minRows', () => {
      const attributeWithUnselectedRow: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.CONTAINER,
        container: { minRows: 1, rows: [{ id: '1', selected: false }] },
      };
      const attributeWithEmptyRows: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.CONTAINER,
        container: { minRows: 1, rows: [] },
      };

      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeWithUnselectedRow
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeWithEmptyRows
      );

      expect(attributeWithUnselectedRow.incomplete).toBe(true);
      expect(attributeWithEmptyRows.incomplete).toBe(true);
    });

    it('should mark a CONTAINER attribute complete when minRows is omitted (defaults to 0)', () => {
      const attributeWithoutContainer: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        uiType: Configurator.UiType.CONTAINER,
      };
      const attributeWithUnselectedRow: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        uiType: Configurator.UiType.CONTAINER,
        container: { rows: [{ id: '1', selected: false }] },
      };
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeWithoutContainer
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeWithUnselectedRow
      );
      expect(attributeWithoutContainer.incomplete).toBe(false);
      expect(attributeWithUnselectedRow.incomplete).toBe(false);
    });

    it('should mark a CONTAINER attribute incomplete when a row minRows is not met', () => {
      const attributeWithRowMinRows: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.CONTAINER,
        container: {
          minRows: 0,
          rows: [
            { id: '1', productSystemId: 'P1', selected: true },
            { id: '2', productSystemId: 'P2', selected: false, minRows: 2 },
          ],
        },
      };

      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeWithRowMinRows
      );

      expect(attributeWithRowMinRows.incomplete).toBe(true);
    });

    it('should mark a CONTAINER attribute complete when row minRows is met', () => {
      const attributeWithRowMinRows: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        uiType: Configurator.UiType.CONTAINER,
        container: {
          minRows: 0,
          rows: [
            { id: '1', productSystemId: 'P2', selected: true, minRows: 2 },
            { id: '2', productSystemId: 'P2', selected: true },
          ],
        },
      };

      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeWithRowMinRows
      );

      expect(attributeWithRowMinRows.incomplete).toBe(false);
    });

    it('should evaluate container and per-product row minRows independently', () => {
      const rows: Configurator.ContainerRow[] = [
        {
          id: 'A',
          productSystemId: 'PROD_A',
          minRows: 2,
          maxRows: 5,
          selected: true,
        },
        { id: 'A2', productSystemId: 'PROD_A', selected: true },
        { id: 'B', productSystemId: 'PROD_B', maxRows: 10, selected: true },
        {
          id: 'C',
          productSystemId: 'PROD_C',
          minRows: 3,
          selected: true,
        },
        { id: 'C2', productSystemId: 'PROD_C', selected: true },
        { id: 'C3', productSystemId: 'PROD_C', selected: true },
        { id: 'X', productSystemId: 'PROD_X', selected: true },
      ];
      const completeAttribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.CONTAINER,
        container: { minRows: 7, maxRows: 10, rows },
      };
      const belowContainerMinRows: Configurator.Attribute = {
        ...completeAttribute,
        container: {
          ...completeAttribute.container!,
          rows: rows.slice(0, 6),
        },
      };
      const belowRowAMinRows: Configurator.Attribute = {
        ...completeAttribute,
        container: {
          ...completeAttribute.container!,
          rows: [
            {
              id: 'A',
              productSystemId: 'PROD_A',
              minRows: 2,
              maxRows: 5,
              selected: true,
            },
            ...rows.slice(2),
          ],
        },
      };
      const belowRowCMinRows: Configurator.Attribute = {
        ...completeAttribute,
        container: {
          ...completeAttribute.container!,
          rows: rows.slice(0, 5),
        },
      };

      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        completeAttribute
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        belowContainerMinRows
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](belowRowAMinRows);
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](belowRowCMinRows);

      expect(completeAttribute.incomplete).toBe(false);
      expect(belowContainerMinRows.incomplete).toBe(true);
      expect(belowRowAMinRows.incomplete).toBe(true);
      expect(belowRowCMinRows.incomplete).toBe(true);
    });

    it('should not mark non-required attributes incomplete', () => {
      const attributeWithoutValue: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: false,
        uiType: Configurator.UiType.STRING,
        userInput: '',
      };
      const attributeWithUnselectedContainer: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: false,
        uiType: Configurator.UiType.CONTAINER,
        container: { minRows: 1, rows: [{ id: '1', selected: false }] },
      };

      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeWithoutValue
      );
      cpqConfiguratorNormalizer['compileAttributeIncomplete'](
        attributeWithUnselectedContainer
      );

      expect(attributeWithoutValue.incomplete).toBe(false);
      expect(attributeWithUnselectedContainer.incomplete).toBe(false);
    });
  });

  describe('compileGroupComplete', () => {
    it('should set group complete to false when an attribute is incomplete', () => {
      const group: Configurator.Group = {
        id: '1',
        complete: true,
        consistent: true,
        subGroups: [],
        attributes: [
          {
            name: 'ATTRIBUTE_NAME',
            incomplete: true,
          },
        ],
      };

      cpqConfiguratorNormalizer['compileGroupComplete'](group);

      expect(group.complete).toBe(false);
    });

    it('should set group complete to false when a sub group is incomplete', () => {
      const group: Configurator.Group = {
        id: '1',
        complete: true,
        consistent: true,
        subGroups: [
          {
            id: '2',
            complete: false,
            consistent: true,
            subGroups: [],
          },
        ],
      };

      cpqConfiguratorNormalizer['compileGroupComplete'](group);

      expect(group.complete).toBe(false);
    });

    it('should propagate incompleteness to ancestor groups', () => {
      const rootGroup: Configurator.Group = {
        id: '1',
        complete: true,
        consistent: true,
        subGroups: [],
      };
      const rowGroup: Configurator.Group = {
        id: '2',
        complete: true,
        consistent: true,
        subGroups: [],
      };
      const nestedGroup: Configurator.Group = {
        id: '3',
        complete: true,
        consistent: true,
        subGroups: [],
        attributes: [
          {
            name: 'ATTRIBUTE_NAME',
            incomplete: true,
          },
        ],
      };

      cpqConfiguratorNormalizer['compileGroupComplete'](nestedGroup, [
        rowGroup,
        rootGroup,
      ]);

      expect(nestedGroup.complete).toBe(false);
      expect(rowGroup.complete).toBe(false);
      expect(rootGroup.complete).toBe(false);
    });

    it('should propagate incompleteness down to a single sub group', () => {
      const nestedGroup: Configurator.Group = {
        id: '3',
        complete: true,
        consistent: true,
        subGroups: [],
      };
      const rowGroup: Configurator.Group = {
        id: '2',
        complete: false,
        consistent: true,
        subGroups: [nestedGroup],
      };

      cpqConfiguratorNormalizer['compileGroupComplete'](rowGroup);

      expect(nestedGroup.complete).toBe(false);
    });

    it('should not propagate incompleteness down when there are multiple sub groups', () => {
      const nestedGroupA: Configurator.Group = {
        id: '3',
        complete: true,
        consistent: true,
        subGroups: [],
      };
      const nestedGroupB: Configurator.Group = {
        id: '4',
        complete: true,
        consistent: true,
        subGroups: [],
      };
      const rowGroup: Configurator.Group = {
        id: '2',
        complete: false,
        consistent: true,
        subGroups: [nestedGroupA, nestedGroupB],
      };

      cpqConfiguratorNormalizer['compileGroupComplete'](rowGroup);

      expect(nestedGroupA.complete).toBe(true);
      expect(nestedGroupB.complete).toBe(true);
    });

    it('should leave group complete when no attribute is incomplete', () => {
      const group: Configurator.Group = {
        id: '1',
        complete: true,
        consistent: true,
        subGroups: [],
        attributes: [
          {
            name: 'ATTRIBUTE_NAME',
            incomplete: false,
          },
        ],
      };

      cpqConfiguratorNormalizer['compileGroupComplete'](group);

      expect(group.complete).toBe(true);
    });

    it('should leave group incomplete when no attribute is incomplete', () => {
      const group: Configurator.Group = {
        id: '1',
        complete: false,
        consistent: true,
        subGroups: [],
        attributes: [
          {
            name: 'ATTRIBUTE_NAME',
            incomplete: false,
          },
        ],
      };

      cpqConfiguratorNormalizer['compileGroupComplete'](group);

      expect(group.complete).toBe(false);
    });

    it('should set group complete to false when the group carries an error message', () => {
      const group: Configurator.Group = {
        id: '1',
        complete: true,
        consistent: true,
        subGroups: [],
        messages: [
          {
            message: 'Too many units',
            severity: Configurator.MessageSeverity.ERROR,
          },
        ],
      };

      cpqConfiguratorNormalizer['compileGroupComplete'](group);

      expect(group.complete).toBe(false);
    });

    it('should set group complete to false when a container attribute carries an error message', () => {
      const group: Configurator.Group = {
        id: '1',
        complete: true,
        consistent: true,
        subGroups: [],
        attributes: [
          {
            name: 'CONTAINER_ATTR',
            uiType: Configurator.UiType.CONTAINER,
            container: {
              rows: [],
              messages: [
                {
                  message: 'Container validation failed',
                  severity: Configurator.MessageSeverity.ERROR,
                },
              ],
            },
          },
        ],
      };

      cpqConfiguratorNormalizer['compileGroupComplete'](group);

      expect(group.complete).toBe(false);
    });

    it('should leave group complete when only warning messages are present', () => {
      const group: Configurator.Group = {
        id: '1',
        complete: true,
        consistent: true,
        subGroups: [],
        messages: [
          {
            message: 'Check quantity',
            severity: Configurator.MessageSeverity.WARNING,
          },
        ],
        attributes: [
          {
            name: 'CONTAINER_ATTR',
            uiType: Configurator.UiType.CONTAINER,
            container: {
              rows: [],
              messages: [
                {
                  message: 'Container requires attention',
                  severity: Configurator.MessageSeverity.WARNING,
                },
              ],
            },
          },
        ],
      };

      cpqConfiguratorNormalizer['compileGroupComplete'](group);

      expect(group.complete).toBe(true);
    });
  });

  describe('hasErrorMessages', () => {
    it('should return true when the list contains an error message', () => {
      expect(
        cpqConfiguratorNormalizer['hasErrorMessages']([
          {
            message: 'Validation failed',
            severity: Configurator.MessageSeverity.ERROR,
          },
        ])
      ).toBe(true);
    });

    it('should return false when the list contains only warning messages', () => {
      expect(
        cpqConfiguratorNormalizer['hasErrorMessages']([
          {
            message: 'Check quantity',
            severity: Configurator.MessageSeverity.WARNING,
          },
        ])
      ).toBe(false);
    });

    it('should return false when the list contains only info messages', () => {
      expect(
        cpqConfiguratorNormalizer['hasErrorMessages']([
          {
            message: 'Informational tip',
            severity: Configurator.MessageSeverity.INFO,
          },
        ])
      ).toBe(false);
    });

    it('should return false when severity is undefined', () => {
      expect(
        cpqConfiguratorNormalizer['hasErrorMessages']([
          { message: 'Unspecified tip' },
        ])
      ).toBe(false);
    });

    it('should return false when messages are undefined or empty', () => {
      expect(cpqConfiguratorNormalizer['hasErrorMessages'](undefined)).toBe(
        false
      );
      expect(cpqConfiguratorNormalizer['hasErrorMessages']([])).toBe(false);
    });
  });

  describe('hasGroupErrorMessages', () => {
    it('should return true when the group carries an error message', () => {
      const group: Configurator.Group = {
        id: '1',
        subGroups: [],
        messages: [
          {
            message: 'Too many units',
            severity: Configurator.MessageSeverity.ERROR,
          },
        ],
      };

      expect(cpqConfiguratorNormalizer['hasGroupErrorMessages'](group)).toBe(
        true
      );
    });

    it('should return true when a container attribute carries an error message', () => {
      const group: Configurator.Group = {
        id: '1',
        subGroups: [],
        attributes: [
          {
            name: 'CONTAINER_ATTR',
            uiType: Configurator.UiType.CONTAINER,
            container: {
              rows: [],
              messages: [
                {
                  message: 'Container validation failed',
                  severity: Configurator.MessageSeverity.ERROR,
                },
              ],
            },
          },
        ],
      };

      expect(cpqConfiguratorNormalizer['hasGroupErrorMessages'](group)).toBe(
        true
      );
    });

    it('should return false when only warning messages are present', () => {
      const group: Configurator.Group = {
        id: '1',
        subGroups: [],
        messages: [
          {
            message: 'Check quantity',
            severity: Configurator.MessageSeverity.WARNING,
          },
        ],
        attributes: [
          {
            name: 'CONTAINER_ATTR',
            uiType: Configurator.UiType.CONTAINER,
            container: {
              rows: [],
              messages: [
                {
                  message: 'Container requires attention',
                  severity: Configurator.MessageSeverity.WARNING,
                },
              ],
            },
          },
        ],
      };

      expect(cpqConfiguratorNormalizer['hasGroupErrorMessages'](group)).toBe(
        false
      );
    });

    it('should return false when the group has no messages', () => {
      const group: Configurator.Group = {
        id: '1',
        subGroups: [],
      };

      expect(cpqConfiguratorNormalizer['hasGroupErrorMessages'](group)).toBe(
        false
      );
    });
  });

  describe('hasValueToBeIgnored', () => {
    const cpqValueA: Cpq.Value = { paV_ID: 0, selected: false };
    const cpqValueB: Cpq.Value = { paV_ID: 1, selected: true };

    it('should not ignore the retract option when required is undefined', () => {
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        displayAs: Cpq.DisplayAs.DROPDOWN,
        values: [cpqValueA],
      };
      expect(
        cpqConfiguratorNormalizer['hasValueToBeIgnored'](cpqAttr, cpqValueA)
      ).toBe(false);
    });

    it('should ignore the retract option on a required dropdown that already has a real selection', () => {
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        displayAs: Cpq.DisplayAs.DROPDOWN,
        required: true,
        values: [cpqValueA, cpqValueB],
      };
      expect(
        cpqConfiguratorNormalizer['hasValueToBeIgnored'](cpqAttr, cpqValueA)
      ).toBe(true);
    });

    it('should keep the retract option on a non-required dropdown that already has a real selection', () => {
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        displayAs: Cpq.DisplayAs.DROPDOWN,
        required: false,
        values: [cpqValueA, cpqValueB],
      };
      expect(
        cpqConfiguratorNormalizer['hasValueToBeIgnored'](cpqAttr, cpqValueA)
      ).toBe(false);
    });

    it('should keep the retract option on a required radio button', () => {
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        displayAs: Cpq.DisplayAs.RADIO_BUTTON,
        required: true,
        values: [cpqValueA, cpqValueB],
      };
      expect(
        cpqConfiguratorNormalizer['hasValueToBeIgnored'](cpqAttr, cpqValueA)
      ).toBe(false);
    });

    it('should keep the retract option on a required dropdown with no real selection', () => {
      const cpqValueB: Cpq.Value = { paV_ID: 1, selected: false };
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        displayAs: Cpq.DisplayAs.DROPDOWN,
        required: true,
        values: [cpqValueA, cpqValueB],
      };
      expect(
        cpqConfiguratorNormalizer['hasValueToBeIgnored'](cpqAttr, cpqValueA)
      ).toBe(false);
    });

    it('should never ignore a real (non-retract) dropdown value', () => {
      const cpqValueA: Cpq.Value = { paV_ID: 2, selected: false };
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        displayAs: Cpq.DisplayAs.DROPDOWN,
        required: true,
        values: [cpqValueA, cpqValueB],
      };
      expect(
        cpqConfiguratorNormalizer['hasValueToBeIgnored'](cpqAttr, cpqValueA)
      ).toBe(false);
    });
  });

  describe('getTabAttributes', () => {
    it("should use the tab's own attributes when hasFullConfigurationState is true", () => {
      const source: Cpq.Configuration = {
        ...cpqConfiguration,
        hasFullConfigurationState: true,
      };
      const tab: Cpq.Tab = {
        ...cpqTab2,
        isSelected: false,
        attributes: [cpqAttribute2],
      };
      const result = cpqConfiguratorNormalizer['getTabAttributes'](source, tab);
      expect(result).toEqual([cpqAttribute2]);
    });

    it('should use configuration.attributes for the selected tab when hasFullConfigurationState is undefined', () => {
      const source: Cpq.Configuration = {
        ...cpqConfiguration,
        hasFullConfigurationState: undefined,
      };
      const tab: Cpq.Tab = {
        ...cpqTab,
        isSelected: true,
        attributes: [cpqAttribute2],
      };
      const result = cpqConfiguratorNormalizer['getTabAttributes'](source, tab);
      expect(result).toEqual(source.attributes);
    });

    it('should return no attributes for an unselected tab when hasFullConfigurationState is false', () => {
      const source: Cpq.Configuration = {
        ...cpqConfiguration,
        hasFullConfigurationState: false,
      };
      const tab: Cpq.Tab = {
        ...cpqTab2,
        isSelected: false,
      };
      const result = cpqConfiguratorNormalizer['getTabAttributes'](source, tab);
      expect(result).toEqual([]);
    });
  });

  function checkMessagePresent(messages?: string[], expectedMsg?: string) {
    if (messages && expectedMsg) {
      expect(messages.includes(expectedMsg)).toBeTruthy();
    } else {
      fail();
    }
  }

  describe('convertValueDisplay', () => {
    const mockCpqValue: Cpq.Value = {
      paV_ID: 0,
      valueDisplay: 'Blue',
      selected: false,
    };

    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      displayAs: Cpq.DisplayAs.RADIO_BUTTON,
      required: true,
      values: [mockCpqValue],
    };
    const values: Configurator.Value[] = [];

    it('should keep the CPQ valueDisplay for radio buttons', () => {
      cpqConfiguratorNormalizer['convertValue'](
        mockCpqValue,
        cpqAttr,
        CURRENCY,
        values
      );

      let value = values[0];
      cpqConfiguratorNormalizer['convertValueDisplay'](
        mockCpqValue,
        cpqAttr,
        value
      );
      expect(value.valueDisplay).toEqual(mockCpqValue.valueDisplay);
    });

    it('should use the drop-down select message for a selected retract option', () => {
      const mockCpqValue: Cpq.Value = {
        paV_ID: 0,
        valueDisplay: 'No option selected',
        selected: true,
      };
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        displayAs: Cpq.DisplayAs.DROPDOWN,
        required: true,
        values: [mockCpqValue],
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['convertValue'](
        mockCpqValue,
        cpqAttr,
        CURRENCY,
        values
      );
      let value = values[0];
      cpqConfiguratorNormalizer['convertValueDisplay'](
        mockCpqValue,
        cpqAttr,
        value
      );
      expect(value.valueDisplay).toEqual(
        'configurator.attribute.dropDownSelectMsg'
      );
    });

    it('should keep the CPQ valueDisplay for a selected real dropdown value', () => {
      const mockCpqValue: Cpq.Value = {
        paV_ID: 5,
        valueDisplay: 'Red',
        selected: true,
      };
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        displayAs: Cpq.DisplayAs.DROPDOWN,
        required: true,
        values: [mockCpqValue],
      };
      const value: Configurator.Value = {
        valueCode: mockCpqValue.paV_ID.toString(),
      };
      cpqConfiguratorNormalizer['convertValueDisplay'](
        mockCpqValue,
        cpqAttr,
        value
      );
      expect(value.valueDisplay).toEqual(mockCpqValue.valueDisplay);
    });

    it('should keep the CPQ valueDisplay for an unselected dropdown value', () => {
      cpqConfiguratorNormalizer['convertValue'](
        mockCpqValue,
        cpqAttr,
        CURRENCY,
        values
      );
      let value = values[0];
      cpqConfiguratorNormalizer['convertValueDisplay'](
        mockCpqValue,
        cpqAttr,
        value
      );
      expect(value.valueDisplay).toEqual(mockCpqValue.valueDisplay);
    });
  });

  describe('isUITypeReadOnly', () => {
    it('should identify READ_ONLY as a read-only ui type', () => {
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        uiType: Configurator.UiType.READ_ONLY,
      };
      expect(cpqConfiguratorNormalizer['isUITypeReadOnly'](attribute)).toBe(
        true
      );
    });

    it('should not identify a selectable ui type such as RADIOBUTTON as read-only', () => {
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        uiType: Configurator.UiType.RADIOBUTTON,
      };
      expect(cpqConfiguratorNormalizer['isUITypeReadOnly'](attribute)).toBe(
        false
      );
    });
  });

  describe('isSingleSelectionUiType', () => {
    function expectSingleSelectionUiType(
      uiType: Configurator.UiType,
      expected: boolean
    ): void {
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        uiType,
      };
      expect(
        cpqConfiguratorNormalizer['isSingleSelectionUiType'](attribute)
      ).toBe(expected);
    }

    it('should treat RADIOBUTTON as a single-selection ui type', () => {
      expectSingleSelectionUiType(Configurator.UiType.RADIOBUTTON, true);
    });

    it('should treat DROPDOWN as a single-selection ui type', () => {
      expectSingleSelectionUiType(Configurator.UiType.DROPDOWN, true);
    });

    it('should not treat SINGLE_SELECTION_IMAGE as a single-selection ui type', () => {
      expectSingleSelectionUiType(
        Configurator.UiType.SINGLE_SELECTION_IMAGE,
        false
      );
    });

    it('should treat DROPDOWN_PRODUCT as a single-selection ui type', () => {
      expectSingleSelectionUiType(Configurator.UiType.DROPDOWN_PRODUCT, true);
    });

    it('should treat RADIOBUTTON_PRODUCT as a single-selection ui type', () => {
      expectSingleSelectionUiType(
        Configurator.UiType.RADIOBUTTON_PRODUCT,
        true
      );
    });

    it('should not treat CHECKBOXLIST as a single-selection ui type', () => {
      expectSingleSelectionUiType(Configurator.UiType.CHECKBOXLIST, false);
    });

    it('should not treat STRING as a single-selection ui type', () => {
      expectSingleSelectionUiType(Configurator.UiType.STRING, false);
    });

    it('should not treat READ_ONLY as a single-selection ui type', () => {
      expectSingleSelectionUiType(Configurator.UiType.READ_ONLY, false);
    });
  });

  describe('isNoValueSelected', () => {
    it('should treat the attribute as having no selection when every value is unselected', () => {
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        values: [
          { paV_ID: 1, selected: false },
          { paV_ID: 2, selected: false },
        ],
      };
      expect(cpqConfiguratorNormalizer['isNoValueSelected'](cpqAttr)).toBe(
        true
      );
    });

    it('should treat the attribute as having no selection when it has no values array', () => {
      const cpqAttr: Cpq.Attribute = { pA_ID: 1, stdAttrCode: 2 };
      expect(cpqConfiguratorNormalizer['isNoValueSelected'](cpqAttr)).toBe(
        true
      );
    });

    it('should treat the attribute as having a selection when any value is selected', () => {
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        values: [
          { paV_ID: 1, selected: false },
          { paV_ID: 2, selected: true },
        ],
      };
      expect(cpqConfiguratorNormalizer['isNoValueSelected'](cpqAttr)).toBe(
        false
      );
    });
  });

  describe('hasRetractValue', () => {
    it('should detect a retract option when a value with paV_ID 0 exists', () => {
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        values: [
          { paV_ID: 0, selected: false },
          { paV_ID: 1, selected: true },
        ],
      };
      expect(cpqConfiguratorNormalizer['hasRetractValue'](cpqAttr)).toBe(true);
    });

    it('should not detect a retract option when only real values exist', () => {
      const cpqAttr: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        values: [
          { paV_ID: 1, selected: false },
          { paV_ID: 2, selected: true },
        ],
      };
      expect(cpqConfiguratorNormalizer['hasRetractValue'](cpqAttr)).toBe(false);
    });

    it('should not detect a retract option when the attribute has no values array', () => {
      const cpqAttr: Cpq.Attribute = { pA_ID: 1, stdAttrCode: 2 };
      expect(cpqConfiguratorNormalizer['hasRetractValue'](cpqAttr)).toBe(false);
    });
  });

  describe('setRetractValueDisplay', () => {
    it('should show the drop-down select prompt for a selected DROPDOWN retract value', () => {
      const value: Configurator.Value = { valueCode: '0', selected: true };
      const attribute: Configurator.Attribute = {
        name: 'attr_1',
        uiType: Configurator.UiType.DROPDOWN,
        values: [value],
      };
      cpqConfiguratorNormalizer['setRetractValueDisplay'](attribute, value);
      expect(value.valueDisplay).toBe(
        'configurator.attribute.dropDownSelectMsg'
      );
    });

    it('should show the drop-down select prompt for a selected DROPDOWN_PRODUCT retract value', () => {
      const value: Configurator.Value = { valueCode: '0', selected: true };
      const attribute: Configurator.Attribute = {
        name: 'attr_2',
        uiType: Configurator.UiType.DROPDOWN_PRODUCT,
        values: [value],
      };
      cpqConfiguratorNormalizer['setRetractValueDisplay'](attribute, value);
      expect(value.valueDisplay).toBe(
        'configurator.attribute.dropDownSelectMsg'
      );
    });

    it('should show "no option selected" for an unselected DROPDOWN retract value', () => {
      const value: Configurator.Value = { valueCode: '0', selected: false };
      const attribute: Configurator.Attribute = {
        name: 'attr_2',
        uiType: Configurator.UiType.DROPDOWN,
        values: [value],
      };
      cpqConfiguratorNormalizer['setRetractValueDisplay'](attribute, value);
      expect(value.valueDisplay).toBe(
        'configurator.attribute.noOptionSelectedMsg'
      );
    });

    it('should show "no option selected" for an unselected DROPDOWN_PRODUCT retract value', () => {
      const value: Configurator.Value = { valueCode: '0', selected: false };
      const attribute: Configurator.Attribute = {
        name: 'attr_2',
        uiType: Configurator.UiType.DROPDOWN_PRODUCT,
        values: [value],
      };
      cpqConfiguratorNormalizer['setRetractValueDisplay'](attribute, value);
      expect(value.valueDisplay).toBe(
        'configurator.attribute.noOptionSelectedMsg'
      );
    });

    it('should show "no option selected" for a selected RADIOBUTTON retract value', () => {
      const value: Configurator.Value = { valueCode: '0', selected: true };
      const attribute: Configurator.Attribute = {
        name: 'attr_3',
        uiType: Configurator.UiType.RADIOBUTTON,
        values: [value],
      };
      cpqConfiguratorNormalizer['setRetractValueDisplay'](attribute, value);
      expect(value.valueDisplay).toBe(
        'configurator.attribute.noOptionSelectedMsg'
      );
    });
  });

  describe('addRetractValue', () => {
    it('should add a selected retract option for optional radio and dropdown attributes', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        required: false,
        values: [{ paV_ID: 1, selected: false }],
      };
      [
        Configurator.UiType.RADIOBUTTON,
        Configurator.UiType.DROPDOWN,
        Configurator.UiType.DROPDOWN_PRODUCT,
        Configurator.UiType.RADIOBUTTON_PRODUCT,
      ].forEach((uiType) => {
        const attribute: Configurator.Attribute = {
          name: 'ATTRIBUTE_NAME',
          required: false,
          uiType,
        };
        const values: Configurator.Value[] = [];
        cpqConfiguratorNormalizer['addRetractValue'](
          sourceAttribute,
          attribute,
          values
        );
        expect(values.length).toBe(1);
        expect(values[0].valueCode).toBe(Configurator.RetractValueCode);
        expect(values[0].selected).toBe(true);
      });
    });

    it('should not add a retract option for optional SINGLE_SELECTION_IMAGE attributes', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        required: false,
        values: [{ paV_ID: 1, selected: false }],
      };
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: false,
        uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['addRetractValue'](
        sourceAttribute,
        attribute,
        values
      );
      expect(values.length).toBe(0);
    });

    it('should not add a retract option for required dropdown attributes', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        required: true,
        values: [{ paV_ID: 1, selected: false }],
      };
      [
        Configurator.UiType.DROPDOWN,
        Configurator.UiType.DROPDOWN_PRODUCT,
      ].forEach((uiType) => {
        const attribute: Configurator.Attribute = {
          name: 'ATTRIBUTE_NAME',
          required: true,
          uiType,
        };
        const values: Configurator.Value[] = [];
        cpqConfiguratorNormalizer['addRetractValue'](
          sourceAttribute,
          attribute,
          values
        );
        expect(values.length).toBe(0);
      });
    });

    it('should not add a retract option for required RADIOBUTTON attributes', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        required: true,
        values: [{ paV_ID: 1, selected: false }],
      };
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.RADIOBUTTON,
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['addRetractValue'](
        sourceAttribute,
        attribute,
        values
      );
      expect(values.length).toBe(0);
    });

    it('should not add a retract option when the attribute is READ_ONLY', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        values: [{ paV_ID: 1, selected: false }],
      };
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        uiType: Configurator.UiType.READ_ONLY,
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['addRetractValue'](
        sourceAttribute,
        attribute,
        values
      );
      expect(values.length).toBe(0);
    });

    it('should not add another retract option if CPQ already sent paV_ID 0', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        values: [{ paV_ID: 0, selected: false }],
      };
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        uiType: Configurator.UiType.RADIOBUTTON,
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['addRetractValue'](
        sourceAttribute,
        attribute,
        values
      );
      expect(values.length).toBe(0);
    });

    it('should not add a retract option for multi-select ui types such as CHECKBOXLIST', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        values: [{ paV_ID: 1, selected: false }],
      };
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        uiType: Configurator.UiType.CHECKBOXLIST,
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['addRetractValue'](
        sourceAttribute,
        attribute,
        values
      );
      expect(values.length).toBe(0);
    });
  });

  describe('addRequiredSelectionPromptValue', () => {
    it('should add a prompt option for a required dropdown with no selection', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        required: true,
        values: [{ paV_ID: 1, selected: false }],
      };
      [
        Configurator.UiType.DROPDOWN,
        Configurator.UiType.DROPDOWN_PRODUCT,
      ].forEach((uiType) => {
        const attribute: Configurator.Attribute = {
          name: 'ATTRIBUTE_NAME',
          required: true,
          uiType,
        };
        const values: Configurator.Value[] = [];
        cpqConfiguratorNormalizer['addRequiredSelectionPromptValue'](
          sourceAttribute,
          attribute,
          values
        );
        expect(values.length).toBe(1);
        expect(values[0].valueCode).toBe(Configurator.RetractValueCode);
        expect(values[0].selected).toBe(true);
      });
    });

    it('should not add a prompt option when a required dropdown already has a selection', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        required: true,
        values: [{ paV_ID: 1, selected: true }],
      };
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.DROPDOWN,
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['addRequiredSelectionPromptValue'](
        sourceAttribute,
        attribute,
        values
      );
      expect(values.length).toBe(0);
    });

    it('should not add a prompt option for an optional dropdown', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        required: false,
        values: [{ paV_ID: 1, selected: false }],
      };
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: false,
        uiType: Configurator.UiType.DROPDOWN,
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['addRequiredSelectionPromptValue'](
        sourceAttribute,
        attribute,
        values
      );
      expect(values.length).toBe(0);
    });

    it('should not add a prompt option for a required RADIOBUTTON', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        required: true,
        values: [{ paV_ID: 1, selected: false }],
      };
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.RADIOBUTTON,
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['addRequiredSelectionPromptValue'](
        sourceAttribute,
        attribute,
        values
      );
      expect(values.length).toBe(0);
    });

    it('should not add a prompt option when the attribute is READ_ONLY', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        required: true,
        values: [{ paV_ID: 1, selected: false }],
      };
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.READ_ONLY,
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['addRequiredSelectionPromptValue'](
        sourceAttribute,
        attribute,
        values
      );
      expect(values.length).toBe(0);
    });

    it('should not add a prompt option if CPQ already sent paV_ID 0', () => {
      const sourceAttribute: Cpq.Attribute = {
        pA_ID: 1,
        stdAttrCode: 2,
        required: true,
        values: [{ paV_ID: 0, selected: false }],
      };
      const attribute: Configurator.Attribute = {
        name: 'ATTRIBUTE_NAME',
        required: true,
        uiType: Configurator.UiType.DROPDOWN,
      };
      const values: Configurator.Value[] = [];
      cpqConfiguratorNormalizer['addRequiredSelectionPromptValue'](
        sourceAttribute,
        attribute,
        values
      );
      expect(values.length).toBe(0);
    });
  });

  describe('generateWarningMessages', () => {
    it('should return an empty list when there are no failed validations or incomplete messages', () => {
      const result =
        cpqConfiguratorNormalizer['generateWarningMessages'](cpqConfiguration);
      expect(result).toEqual([]);
    });

    it('should concatenate failedValidations and incompleteMessages', () => {
      const result = cpqConfiguratorNormalizer['generateWarningMessages']({
        ...cpqConfiguration,
        failedValidations: [VALIDATION_MSG],
        incompleteMessages: [INCOMPLETE_MSG],
      });
      expect(result).toEqual([VALIDATION_MSG, INCOMPLETE_MSG]);
    });
  });

  describe('generateErrorMessages', () => {
    it('should not treat incomplete attributes as error messages', () => {
      const messageObs = cpqConfiguratorNormalizer['generateErrorMessages'](
        cpqConfigurationIncompleteConsistent
      );
      expect(messageObs.length).toBe(0);
    });

    it('should return an empty list when there are no error or invalid messages', () => {
      const result =
        cpqConfiguratorNormalizer['generateErrorMessages'](cpqConfiguration);
      expect(result).toEqual([]);
    });

    it('should concatenate errorMessages and invalidMessages', () => {
      const result = cpqConfiguratorNormalizer['generateErrorMessages']({
        ...cpqConfiguration,
        errorMessages: [ERROR_MSG],
        invalidMessages: [INVALID_MSG],
      });
      expect(result).toEqual([ERROR_MSG, INVALID_MSG]);
    });
  });

  describe('generateTotalNumberOfIssues', () => {
    it('should return 0 for a complete, consistent configuration', () => {
      expect(
        cpqConfiguratorNormalizer['generateTotalNumberOfIssues'](
          cpqConfiguration
        )
      ).toBe(0);
    });

    it('should add incomplete attributes, conflicts, errors, invalid messages, failed validations and incomplete messages', () => {
      expect(
        cpqConfiguratorNormalizer['generateTotalNumberOfIssues'](
          cpqConfigurationIncompleteInconsistent
        )
      ).toBe(6);
    });
  });

  describe('mapPAId', () => {
    it('should prefer pA_ID when both pA_ID and PA_ID are present', () => {
      expect(
        cpqConfiguratorNormalizer['mapPAId'](<any>{
          pA_ID: 123,
          PA_ID: 456,
        })
      ).toBe('123');
    });
    it('should fall back to PA_ID when pA_ID is missing', () => {
      expect(
        cpqConfiguratorNormalizer['mapPAId'](<any>{
          PA_ID: 456,
        })
      ).toBe('456');
    });
  });

  describe('containers', () => {
    const nestedAttrCode = 612;
    const nestedAttribute: Cpq.Attribute = {
      pA_ID: 99,
      stdAttrCode: nestedAttrCode,
      label: 'Accessories',
      displayAs: Cpq.DisplayAs.RADIO_BUTTON,
      isEnabled: true,
      values: [
        {
          paV_ID: 1,
          valueCode: 'ACC1',
          valueDisplay: 'Accessory 1',
          selected: true,
        },
      ],
    };

    const nestedTab: Cpq.Tab = {
      id: 57,
      name: 'NESTED_TAB',
      displayName: 'Nested Tab',
      isIncomplete: false,
      isSelected: true,
      attributes: [nestedAttribute],
    };

    const rowWithConfigId = '018';
    const rowWithoutConfigId = '017';

    const expectedRowGroupId = `${Configurator.ContainerRowGroupIdPrefix}@${cpqAttributeStdAttrCode}@${rowWithConfigId}`;
    const expectedNestedTabGroupId = `${expectedRowGroupId}@${nestedTab.id}`;

    const nestedContainerOnNestedAttr: Cpq.Container = {
      stdAttrCode: nestedAttrCode,
      minRows: 0,
      maxRows: 4,
      rows: [
        {
          id: '019',
          productSystemId: 'UV_FILTER_KIT',
          productName: 'UV Filter Kit',
          selected: true,
          actions: [Cpq.ContainerRowAction.DELETE],
        },
      ],
    };

    const containerWithRows: Cpq.Container = {
      stdAttrCode: cpqAttributeStdAttrCode,
      minRows: 1,
      maxRows: 15,
      messages: [{ message: 'Too many units' }],
      rows: [
        {
          id: rowWithoutConfigId,
          productSystemId: 'LENS_50MM',
          productName: '50mm Lens',
          selected: true,
          actions: [Cpq.ContainerRowAction.DELETE, Cpq.ContainerRowAction.COPY],
        },
        {
          id: rowWithConfigId,
          productSystemId: 'LENS_ZOOM',
          productName: 'Zoom Lens',
          selected: true,
          actions: [
            Cpq.ContainerRowAction.DELETE,
            Cpq.ContainerRowAction.EDIT,
            Cpq.ContainerRowAction.COPY,
          ],
          configuration: {
            completed: false,
            errorMessages: [ERROR_MSG],
            invalidMessages: [INVALID_MSG],
            failedValidations: [VALIDATION_MSG],
            incompleteMessages: [INCOMPLETE_MSG],
            messages: [
              {
                message: 'Check zoom range',
                severity: Cpq.MessageSeverity.WARNING,
              },
              {
                message: 'Info only',
                severity: Cpq.MessageSeverity.INFO,
              },
            ],
            tabs: [nestedTab],
            containers: [nestedContainerOnNestedAttr],
          },
        },
      ],
    };

    function configurationWithContainers(
      containers: Cpq.Container[]
    ): Cpq.Configuration {
      return {
        ...cpqConfiguration,
        tabs: [
          {
            ...cpqTab,
            attributes: [cpqAttribute],
          },
        ],
        sapContainers: containers,
      };
    }

    function convertContainerAttribute(
      required: boolean,
      minRows?: number
    ): Configurator.Attribute | undefined {
      return cpqConfiguratorNormalizer.convert({
        ...cpqConfiguration,
        tabs: [
          {
            ...cpqTab,
            attributes: [
              {
                ...cpqAttribute,
                displayAs: Cpq.DisplayAs.CONTAINER,
                required,
                values: [],
              },
            ],
          },
        ],
        sapContainers: [
          {
            stdAttrCode: cpqAttributeStdAttrCode,
            minRows,
            rows: [],
          },
        ],
      }).groups[0].attributes?.[0];
    }

    it('should not attach a container when no sapContainers entry matches the attribute code', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([
          {
            stdAttrCode: 999,
            rows: [],
          },
        ])
      );
      expect(result.groups[0].attributes?.[0].container).toBeUndefined();
      expect(result.groups[0].subGroups.length).toBe(0);
    });

    it('should map minRows, maxRows, rows and add-actions onto the matching attribute', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([
          {
            stdAttrCode: cpqAttributeStdAttrCode,
            minRows: 2,
            maxRows: 5,
            messages: [{ message: 'validation' }],
            rows: [
              {
                id: '1',
                productSystemId: 'P1',
                productName: 'Product 1',
                selected: false,
                actions: [Cpq.ContainerRowAction.ADD],
              },
            ],
          },
        ])
      );
      const container = result.groups[0].attributes?.[0].container;
      expect(container?.minRows).toBe(2);
      expect(container?.maxRows).toBe(5);
      //expect(container?.failedValidations).toEqual(['validation']);
      expect(container?.rows.length).toBe(1);
      expect(container?.rows[0]).toEqual(
        jasmine.objectContaining({
          id: '1',
          productSystemId: 'P1',
          productName: 'Product 1',
          selected: false,
          actions: [Configurator.ContainerRowAction.ADD],
        })
      );
      expect(container?.rows[0].groupId).toBeUndefined();
      expect(result.groups[0].subGroups.length).toBe(0);
    });

    it('should mark a CONTAINER attribute complete when selected rows meet minRows (or minRows is omitted)', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfiguration,
        tabs: [
          {
            ...cpqTab,
            attributes: [
              {
                ...cpqAttribute,
                displayAs: Cpq.DisplayAs.CONTAINER,
                values: [],
              },
            ],
          },
        ],
        sapContainers: [
          {
            stdAttrCode: cpqAttributeStdAttrCode,
            rows: [{ id: '1', selected: true }],
          },
        ],
      });
      expect(result.groups[0].attributes?.[0].incomplete).toBe(false);
    });

    it('should mark a CONTAINER attribute incomplete when selected rows are below minRows', () => {
      const result = cpqConfiguratorNormalizer.convert({
        ...cpqConfiguration,
        tabs: [
          {
            ...cpqTab,
            attributes: [
              {
                ...cpqAttribute,
                displayAs: Cpq.DisplayAs.CONTAINER,
                values: [],
              },
            ],
          },
        ],
        sapContainers: [
          {
            stdAttrCode: cpqAttributeStdAttrCode,
            minRows: 1,
            rows: [{ id: '1', selected: false }],
          },
        ],
      });
      expect(result.groups[0].attributes?.[0].incomplete).toBe(true);
      expect(result.groups[0].complete).toBe(false);
    });

    it('should force required=true when minRows is 1 even if the CPQ attribute is optional', () => {
      expect(convertContainerAttribute(false, 1)?.required).toBe(true);
    });

    it('should force required=true when minRows is greater than 1 even if the CPQ attribute is optional', () => {
      expect(convertContainerAttribute(false, 2)?.required).toBe(true);
    });

    it('should leave an optional CPQ attribute optional when minRows is 0', () => {
      expect(convertContainerAttribute(false, 0)?.required).toBe(false);
    });

    it('should leave an optional CPQ attribute optional when minRows is omitted', () => {
      expect(convertContainerAttribute(false)?.required).toBe(false);
    });

    it('should force required=true when a row minRows is at least 1 even if the container minRows is 0', () => {
      const attribute = cpqConfiguratorNormalizer.convert({
        ...cpqConfiguration,
        tabs: [
          {
            ...cpqTab,
            attributes: [
              {
                ...cpqAttribute,
                displayAs: Cpq.DisplayAs.CONTAINER,
                required: false,
                values: [],
              },
            ],
          },
        ],
        sapContainers: [
          {
            stdAttrCode: cpqAttributeStdAttrCode,
            minRows: 0,
            rows: [
              {
                id: '1',
                productSystemId: 'P1',
                minRows: 2,
              },
            ],
          },
        ],
      }).groups[0].attributes?.[0];

      expect(attribute?.required).toBe(true);
    });

    it('should leave an optional CPQ attribute optional when neither container nor row minRows is set', () => {
      const attribute = cpqConfiguratorNormalizer.convert({
        ...cpqConfiguration,
        tabs: [
          {
            ...cpqTab,
            attributes: [
              {
                ...cpqAttribute,
                displayAs: Cpq.DisplayAs.CONTAINER,
                required: false,
                values: [],
              },
            ],
          },
        ],
        sapContainers: [
          {
            stdAttrCode: cpqAttributeStdAttrCode,
            minRows: 0,
            rows: [
              {
                id: '1',
                productSystemId: 'P1',
                maxRows: 10,
              },
            ],
          },
        ],
      }).groups[0].attributes?.[0];

      expect(attribute?.required).toBe(false);
    });

    it('should keep a required CPQ attribute required when minRows is 0', () => {
      expect(convertContainerAttribute(true, 0)?.required).toBe(true);
    });

    it('should create a CONTAINER_ROW_GROUP with nested tab, messages and row groupId', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([containerWithRows])
      );
      const parentGroup = result.groups[0];
      const container = parentGroup.attributes?.[0].container;
      expect(container?.rows.length).toBe(2);

      const rowWithoutConfig = container?.rows.find(
        (row) => row.id === rowWithoutConfigId
      );
      expect(rowWithoutConfig?.groupId).toBeUndefined();

      const rowWithConfig = container?.rows.find(
        (row) => row.id === rowWithConfigId
      );
      expect(rowWithConfig?.groupId).toBe(expectedRowGroupId);

      expect(parentGroup.subGroups.length).toBe(1);
      const rowGroup = parentGroup.subGroups[0];
      expect(rowGroup.id).toBe(expectedRowGroupId);
      expect(rowGroup.groupType).toBe(
        Configurator.GroupType.CONTAINER_ROW_GROUP
      );
      expect(rowGroup.name).toBe('LENS_ZOOM');
      expect(rowGroup.description).toBe('Zoom Lens');
      expect(rowGroup.complete).toBe(false);
      expect(parentGroup.complete).toBe(false);
      expect(rowGroup.messages).toEqual([
        {
          message: 'Check zoom range',
          severity: Configurator.MessageSeverity.ERROR,
        },
        {
          message: 'Info only',
          severity: Configurator.MessageSeverity.WARNING,
        },
      ]);

      expect(rowGroup.subGroups.length).toBe(1);
      const nestedAttrGroup = rowGroup.subGroups[0];
      expect(nestedAttrGroup.id).toBe(expectedNestedTabGroupId);
      expect(nestedAttrGroup.groupType).toBe(
        Configurator.GroupType.ATTRIBUTE_GROUP
      );
      expect(nestedAttrGroup.attributes?.length).toBe(1);
      expect(nestedAttrGroup.attributes?.[0].containerRowId).toBe(
        rowWithConfigId
      );
      expect(nestedAttrGroup.attributes?.[0].groupId).toBe(
        expectedNestedTabGroupId
      );
      expect(nestedAttrGroup.attributes?.[0].attrCode).toBe(nestedAttrCode);
      expect(nestedAttrGroup.complete).toBe(false);
    });

    it('should include nested container-row issues in totalNumberOfIssues', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([containerWithRows])
      );
      expect(result.totalNumberOfIssues).toBe(6);
    });

    it('should include incomplete nested-tab attributes in totalNumberOfIssues', () => {
      const nestedAttributeIncomplete: Cpq.Attribute = {
        ...nestedAttribute,
        incomplete: true,
      };
      const containerWithIncompleteNestedAttribute: Cpq.Container = {
        ...containerWithRows,
        rows: containerWithRows.rows?.map((row) =>
          row.id === rowWithConfigId
            ? {
                ...row,
                configuration: {
                  ...row.configuration,
                  tabs: [
                    {
                      ...nestedTab,
                      attributes: [nestedAttributeIncomplete],
                    },
                  ],
                },
              }
            : row
        ),
      };
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([containerWithIncompleteNestedAttribute])
      );
      expect(result.totalNumberOfIssues).toBe(7);
    });

    it('should leave row-group messages undefined when the nested configuration has none', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([
          {
            stdAttrCode: cpqAttributeStdAttrCode,
            rows: [
              {
                id: rowWithConfigId,
                productSystemId: 'LENS_ZOOM',
                selected: true,
                configuration: {
                  completed: true,
                  tabs: [nestedTab],
                },
              },
            ],
          },
        ])
      );
      const row = result.groups[0].attributes?.[0].container?.rows[0];
      expect(row?.groupId).toBe(
        `${Configurator.ContainerRowGroupIdPrefix}@${cpqAttributeStdAttrCode}@${rowWithConfigId}`
      );
      expect(result.groups[0].subGroups[0].messages).toBeUndefined();
    });

    it('should attach nested containers and keep CONTAINER_ROW_GROUP out of flatGroups', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([containerWithRows])
      );
      const nestedAttrGroup = result.groups[0].subGroups[0].subGroups[0];
      const nestedContainer = nestedAttrGroup.attributes?.[0].container;
      expect(nestedContainer?.minRows).toBe(0);
      expect(nestedContainer?.maxRows).toBe(4);
      expect(nestedContainer?.rows[0].id).toBe('019');
      expect(nestedContainer?.rows[0].groupId).toBeUndefined();

      const flatGroupTypes = result.flatGroups.map((group) => group.groupType);
      expect(flatGroupTypes).toContain(Configurator.GroupType.ATTRIBUTE_GROUP);
      expect(flatGroupTypes).not.toContain(
        Configurator.GroupType.CONTAINER_ROW_GROUP
      );
      expect(
        result.flatGroups.some((group) => group.id === expectedRowGroupId)
      ).toBe(false);
      expect(
        result.flatGroups.some((group) => group.id === expectedNestedTabGroupId)
      ).toBe(true);
    });

    it('should append a nested container-row tab after its parent in flatGroups', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([containerWithRows])
      );
      const flatGroupIds = result.flatGroups.map((group) => group.id);
      expect(flatGroupIds.indexOf(cpqGroupId)).toBeLessThan(
        flatGroupIds.indexOf(expectedNestedTabGroupId)
      );
    });

    it('should prefix a nested tab id with the row group id when CPQ reuses a root tab id', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([
          {
            ...containerWithRows,
            rows: [
              {
                id: rowWithConfigId,
                productSystemId: 'LENS_ZOOM',
                selected: true,
                configuration: {
                  completed: false,
                  tabs: [{ ...nestedTab, id: cpqGroupIdNumber }],
                },
              },
            ],
          },
        ])
      );

      const rootTabGroup = result.groups[0];
      expect(rootTabGroup.id).toBe(cpqGroupId);
      const nestedTabGroup = rootTabGroup.subGroups[0].subGroups[0];
      expect(nestedTabGroup.id).toBe(`${expectedRowGroupId}@${cpqGroupId}`);
      expect(nestedTabGroup.id).not.toBe(rootTabGroup.id);

      const flatGroupIds = result.flatGroups.map((group) => group.id);
      expect(new Set(flatGroupIds).size).toBe(flatGroupIds.length);
    });

    it('should keep EDIT when the nested configuration is available', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([containerWithRows])
      );
      const rowWithConfig =
        result.groups[0].attributes?.[0].container?.rows.find(
          (row) => row.id === rowWithConfigId
        );
      expect(rowWithConfig?.actions).toContain(
        Configurator.ContainerRowAction.EDIT
      );
    });

    it('should remove EDIT when CPQ sends it without a nested configuration', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([
          {
            stdAttrCode: cpqAttributeStdAttrCode,
            rows: [
              {
                id: rowWithoutConfigId,
                productSystemId: 'LENS_50MM',
                productName: '50mm Lens',
                selected: true,
                actions: [
                  Cpq.ContainerRowAction.DELETE,
                  Cpq.ContainerRowAction.EDIT,
                  Cpq.ContainerRowAction.COPY,
                ],
              },
            ],
          },
        ])
      );
      const row = result.groups[0].attributes?.[0].container?.rows[0];
      expect(row?.groupId).toBeUndefined();
      expect(row?.actions).toEqual([
        Configurator.ContainerRowAction.DELETE,
        Configurator.ContainerRowAction.COPY,
      ]);
    });

    it('should set actions to undefined when EDIT is the only action and no nested configuration is available', () => {
      const result = cpqConfiguratorNormalizer.convert(
        configurationWithContainers([
          {
            stdAttrCode: cpqAttributeStdAttrCode,
            rows: [
              {
                id: rowWithoutConfigId,
                productSystemId: 'LENS_50MM',
                productName: '50mm Lens',
                selected: true,
                actions: [Cpq.ContainerRowAction.EDIT],
              },
            ],
          },
        ])
      );
      const row = result.groups[0].attributes?.[0].container?.rows[0];
      expect(row?.actions).toBeUndefined();
    });

    it('should attach matching sapContainers when convert falls back to the generic group', () => {
      const result = cpqConfiguratorNormalizer.convert({
        productSystemId: cpqProductSystemId,
        currencyISOCode: CURRENCY,
        attributes: [cpqAttribute],
        incompleteAttributes: [],
        sapContainers: [
          {
            stdAttrCode: cpqAttributeStdAttrCode,
            minRows: 1,
            maxRows: 3,
            rows: [
              {
                id: '7',
                productSystemId: 'GENERIC_ROW',
                selected: true,
              },
            ],
          },
        ],
      });
      expect(result.groups[0].id).toBe('1');
      expect(result.groups[0].attributes?.[0].container?.minRows).toBe(1);
      expect(result.groups[0].attributes?.[0].container?.rows[0].id).toBe('7');
    });
  });
});
