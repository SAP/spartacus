import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';

const attributeCode = 1;

const attributeIncomplete: Configurator.Attribute = { name: 'name' };
let configuratorUISettingsConfigTemplate: ConfiguratorUISettingsConfig = {
  productConfigurator: {
    descriptions: {
      valueDescriptionLength: 100,
    },
  },
};

class MockConfiguratorAttributePriceChangeService {
  getChangedPrices(): Observable<Record<string, Configurator.PriceDetails>> {
    return of({ dummy: { value: 10, currencyIso: 'USD' } });
  }
}

describe('ConfiguratorAttributeBaseComponent', () => {
  let classUnderTest: ConfiguratorAttributeBaseComponent;
  let configuratorAttributePriceChangeService: ConfiguratorAttributePriceChangeService;
  let currentAttribute: Configurator.Attribute;
  let configuratorUISettingsConfig: ConfiguratorUISettingsConfig;

  beforeEach(() => {
    configuratorUISettingsConfig = structuredClone(
      configuratorUISettingsConfigTemplate
    );
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        ConfiguratorAttributeBaseComponent,
        {
          provide: ConfiguratorUISettingsConfig,
          useValue: configuratorUISettingsConfig,
        },
        {
          provide: ConfiguratorAttributePriceChangeService,
          useClass: MockConfiguratorAttributePriceChangeService,
        },
        {
          provide: ConfiguratorStorefrontUtilsService,
          useValue: {},
        },
      ],
    });

    classUnderTest = TestBed.inject(
      ConfiguratorAttributeBaseComponent as Type<ConfiguratorAttributeBaseComponent>
    );
    configuratorAttributePriceChangeService = TestBed.inject(
      ConfiguratorAttributePriceChangeService as Type<ConfiguratorAttributePriceChangeService>
    );
    spyOn(
      configuratorAttributePriceChangeService,
      'getChangedPrices'
    ).and.callThrough();

    currentAttribute = {
      name: 'attributeId',
      attrCode: attributeCode,
      uiType: Configurator.UiType.RADIOBUTTON,
    };
  });

  it('should generate value key', () => {
    expect(
      classUnderTest.createValueUiKey('prefix', 'attributeId', 'valueId')
    ).toBe('cx-configurator--prefix--attributeId--valueId');
  });

  it('should generate attribute key', () => {
    expect(classUnderTest.createAttributeUiKey('prefix', 'attributeId')).toBe(
      'cx-configurator--prefix--attributeId'
    );
  });

  describe('createAriaLabelledBy', () => {
    it('should return only attribute id for aria-labelledby', () => {
      expect(
        classUnderTest.createAriaLabelledBy('prefix', 'attributeId')
      ).toEqual('cx-configurator--label--attributeId');
    });

    it("should return only attribute id for aria-labelledby in case value id is 'undefined'", () => {
      expect(
        classUnderTest.createAriaLabelledBy('prefix', 'attributeId', undefined)
      ).toEqual('cx-configurator--label--attributeId');
    });

    it('should return attribute id, value id  and without quantity for aria-labelledby', () => {
      expect(
        classUnderTest.createAriaLabelledBy('prefix', 'attributeId', 'valueId')
      ).toEqual(
        'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--price--optionsPriceValue--attributeId--valueId'
      );
    });

    it('should return attribute id, value id  and with undefined quantity for aria-labelledby', () => {
      expect(
        classUnderTest.createAriaLabelledBy(
          'prefix',
          'attributeId',
          'valueId',
          undefined
        )
      ).toEqual(
        'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--price--optionsPriceValue--attributeId--valueId'
      );
    });

    it("should return attribute id, value id  and with quantity equals 'true' for aria-labelledby", () => {
      expect(
        classUnderTest.createAriaLabelledBy(
          'prefix',
          'attributeId',
          'valueId',
          true
        )
      ).toEqual(
        'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--price--optionsPriceValue--attributeId--valueId'
      );
    });

    it("should return attribute id, value id  and with quantity equals 'false' for aria-labelledby", () => {
      expect(
        classUnderTest.createAriaLabelledBy(
          'prefix',
          'attributeId',
          'valueId',
          false
        )
      ).toEqual(
        'cx-configurator--label--attributeId cx-configurator--prefix--attributeId--valueId cx-configurator--option--price--attributeId--valueId'
      );
    });
  });

  describe('createAttributeIdForConfigurator', () => {
    it('should generate attribute id for configurator', () => {
      expect(
        classUnderTest.createAttributeIdForConfigurator(currentAttribute)
      ).toBe('cx-configurator--radioGroup--attributeId');
    });

    it('should generate value id for configurator', () => {
      expect(
        classUnderTest.createAttributeValueIdForConfigurator(
          currentAttribute,
          'valueId'
        )
      ).toBe('cx-configurator--radioGroup--attributeId--valueId');
    });

    it('falls back to the attribute id when no value is given', () => {
      expect(
        classUnderTest.createAttributeValueIdForConfigurator(currentAttribute)
      ).toBe('cx-configurator--radioGroup--attributeId');
    });

    it('uses the "not implemented" ui type when the attribute has none', () => {
      expect(
        classUnderTest.createAttributeValueIdForConfigurator(
          attributeIncomplete,
          'valueId'
        )
      ).toBe('cx-configurator--not_implemented--name--valueId');
    });
  });

  describe('getImage', () => {
    const image: Configurator.Image = { url: 'url' };
    const value: Configurator.Value = { valueCode: 'val', images: [image] };

    it('should return first image if present', () => {
      value.images = [image];
      expect(classUnderTest.getImage(value)).toBe(image);
    });

    it('should return undefined in case no images present on value', () => {
      value.images = undefined;
      expect(classUnderTest.getImage(value)).toBeUndefined();
    });

    it('should return undefined in case empty image array present on value', () => {
      value.images = [];
      expect(classUnderTest.getImage(value)).toBeUndefined();
    });
  });

  describe('getAriaLabelForValueWithPrice', () => {
    it('should return translation key for read-only', () => {
      expect(classUnderTest.getAriaLabelForValueWithPrice(true)).toEqual(
        'configurator.a11y.readOnlyValueOfAttributeFullWithPrice'
      );
    });

    it('should return translation key for another attribute types as read-only', () => {
      expect(classUnderTest.getAriaLabelForValueWithPrice(false)).toEqual(
        'configurator.a11y.valueOfAttributeFullWithPrice'
      );
    });
  });

  describe('getAriaLabelForValue', () => {
    it('should return translation key for read-only', () => {
      expect(classUnderTest.getAriaLabelForValue(true)).toEqual(
        'configurator.a11y.readOnlyValueOfAttributeFull'
      );
    });

    it('should return translation key for another attribute types as read-only', () => {
      expect(classUnderTest.getAriaLabelForValue(false)).toEqual(
        'configurator.a11y.valueOfAttributeFull'
      );
    });
  });

  describe('getImgStyleClasses', () => {
    const imgStyleClass = 'cx-img';
    const hoverClass = imgStyleClass + ' cx-img-hover';
    const selectedClasses = hoverClass + ' cx-img-selected';

    it('should return passed image style class without adding further classes if attribute is READ_ONLY_MULTI_SELECTION_IMAGE', () => {
      currentAttribute.uiType =
        Configurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE;
      const value: Configurator.Value = { valueCode: 'val', selected: false };

      expect(
        classUnderTest.getImgStyleClasses(
          currentAttribute,
          value,
          imgStyleClass
        )
      ).toEqual(imgStyleClass);
    });

    it('should return passed image style class without adding further classes if attribute is READ_ONLY_SINGLE_SELECTION_IMAGE', () => {
      currentAttribute.uiType =
        Configurator.UiType.READ_ONLY_SINGLE_SELECTION_IMAGE;
      const value: Configurator.Value = { valueCode: 'val', selected: false };

      expect(
        classUnderTest.getImgStyleClasses(
          currentAttribute,
          value,
          imgStyleClass
        )
      ).toEqual(imgStyleClass);
    });

    it('should append cx-img-hover style class if attribute is not read-only UI type', () => {
      currentAttribute.uiType = Configurator.UiType.DROPDOWN;
      const value: Configurator.Value = { valueCode: 'val', selected: false };

      expect(
        classUnderTest.getImgStyleClasses(
          currentAttribute,
          value,
          imgStyleClass
        )
      ).toEqual(hoverClass);
    });

    it('should append cx-img-selected style class if attribute is not read-only UI type and value is selected', () => {
      currentAttribute.uiType = Configurator.UiType.RADIOBUTTON;
      const value: Configurator.Value = { valueCode: 'val', selected: true };

      expect(
        classUnderTest.getImgStyleClasses(
          currentAttribute,
          value,
          imgStyleClass
        )
      ).toEqual(selectedClasses);
    });
  });

  it('should generate focus id for attribute value', () => {
    expect(classUnderTest.createFocusId('attrCode', 'valueCode')).toBe(
      'attrCode--valueCode--focus'
    );
  });

  describe('getUiType', () => {
    it('should return ui type from attribute if set on attribute level', () => {
      expect(classUnderTest['getUiType'](currentAttribute)).toBe(
        Configurator.UiType.RADIOBUTTON
      );
    });
    it('should return ui type "not implemented" if not available on attribute', () => {
      expect(classUnderTest['getUiType'](attributeIncomplete)).toBe(
        Configurator.UiType.NOT_IMPLEMENTED
      );
    });
  });

  describe('getAttributeCode', () => {
    it('should return code from attribute if available', () => {
      expect(classUnderTest['getAttributeCode'](currentAttribute)).toBe(
        attributeCode
      );
    });
    it('should throw exception if no code available', () => {
      expect(() =>
        classUnderTest['getAttributeCode'](attributeIncomplete)
      ).toThrow();
    });
  });

  describe('isWithAdditionalValues', () => {
    it('should know that DROPDOWN does not allow additional values', () => {
      currentAttribute.uiType = Configurator.UiType.DROPDOWN;
      expect(classUnderTest['isWithAdditionalValues'](currentAttribute)).toBe(
        false
      );
    });

    it('should know that DROPDOWN_ADDITIONAL_INPUT allows additional values', () => {
      currentAttribute.uiType = Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      expect(classUnderTest['isWithAdditionalValues'](currentAttribute)).toBe(
        true
      );
    });

    it('should know that RADIOBUTTON_ADDITIONAL_INPUT allows additional values', () => {
      currentAttribute.uiType =
        Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
      expect(classUnderTest['isWithAdditionalValues'](currentAttribute)).toBe(
        true
      );
    });
  });

  describe('getLabel', () => {
    it('should return empty string', () => {
      expect(classUnderTest.getLabel(false, undefined, undefined)).toEqual('');
    });

    it('should return label without technical name', () => {
      const label = 'label';
      const techName = 'techName';
      expect(classUnderTest.getLabel(false, label, techName)).toEqual(label);
    });

    it('should return label without technical name despite expert mode is set to true', () => {
      const label = 'label';
      const techName = undefined;
      expect(classUnderTest.getLabel(true, label, techName)).toEqual(label);
    });

    it('should return label with technical name in case expert mode is set to true', () => {
      const label = 'label';
      const techName = 'techName';
      const techLabel = label + ' / [' + techName + ']';
      expect(classUnderTest.getLabel(true, label, techName)).toEqual(techLabel);
    });

    it('should return label with positive price', () => {
      const label = 'label';
      const techName = undefined;
      const value = ConfiguratorTestUtils.createValue('valueCode', 3.2);
      expect(classUnderTest.getLabel(false, label, techName, value)).toEqual(
        label + ' [+' + value.valuePrice?.formattedValue + ']'
      );
    });

    it('should return label with zero price', () => {
      const label = 'label';
      const techName = undefined;
      const value = ConfiguratorTestUtils.createValue('valueCode', 0);
      expect(classUnderTest.getLabel(false, label, techName, value)).toEqual(
        label
      );
    });

    it('should return label with negative price', () => {
      const label = 'label';
      const techName = undefined;
      const value = ConfiguratorTestUtils.createValue('valueCode', -3.2);
      expect(classUnderTest.getLabel(false, label, techName, value)).toEqual(
        label + ' [' + value.valuePrice?.formattedValue + ']'
      );
    });
  });

  describe('getImageLabel', () => {
    it('should return image label without ellipsis', () => {
      const label = 'BLACK';
      const techName = 'BLK';
      const techLabel = label + ' / [' + techName + ']';
      expect(classUnderTest.getImageLabel(true, label, techName)).toEqual(
        techLabel
      );
    });

    it('should return image label with ellipsis', () => {
      const label = 'String value 0 make text long make text long';
      const techName = 'techName';
      const techLabel = label.substring(0, 16).concat('...');
      expect(classUnderTest.getImageLabel(true, label, techName)).toEqual(
        techLabel
      );
    });
  });

  describe('getValuePrice', () => {
    it('should return empty string in case value is undefined', () => {
      expect(classUnderTest['getValuePrice'](undefined)).toEqual('');
    });

    it('should return empty string in case price is undefined', () => {
      const value = ConfiguratorTestUtils.createValue('valueCode', undefined);
      expect(classUnderTest['getValuePrice'](value)).toEqual('');
    });

    it('should return empty string in case price is zero', () => {
      const value = ConfiguratorTestUtils.createValue('valueCode', 0);
      expect(classUnderTest['getValuePrice'](value)).toEqual('');
    });

    it('should return title that contains negative price', () => {
      const value = ConfiguratorTestUtils.createValue('valueCode', -100);
      expect(classUnderTest['getValuePrice'](value)).toEqual(
        ' [' + value.valuePrice?.formattedValue + ']'
      );
    });

    it('should return title that contains positive price', () => {
      const value = ConfiguratorTestUtils.createValue('valueCode', 10);
      expect(classUnderTest['getValuePrice'](value)).toEqual(
        ' [+' + value.valuePrice?.formattedValue + ']'
      );
    });

    it('returns empty string when value is selected even if price is set', () => {
      const value = ConfiguratorTestUtils.createValue('valueCode', 10, true);
      expect(classUnderTest['getValuePrice'](value)).toEqual('');
    });
  });

  describe('createContainerUiKey', () => {
    it('returns attribute key when valueId is omitted', () => {
      expect(classUnderTest.createContainerUiKey('prefix', 'attributeId')).toBe(
        'cx-configurator--prefix--attributeId'
      );
    });

    it('returns value key when valueId is provided', () => {
      expect(
        classUnderTest.createContainerUiKey('prefix', 'attributeId', 'valueId')
      ).toBe('cx-configurator--prefix--attributeId--valueId');
    });
  });

  describe('getContainerRequiredMessageKey', () => {
    it('returns translatable when remaining count is at least 1', () => {
      expect(
        classUnderTest.getContainerRequiredMessageKey(4, [
          { id: '1', selected: true },
        ])
      ).toEqual({
        key: 'configurator.attribute.containerRequiredMessage',
        params: { count: 3 },
      });
    });

    it('returns undefined when minimum selection is satisfied', () => {
      expect(
        classUnderTest.getContainerRequiredMessageKey(2, [
          { id: '1', selected: true },
          { id: '2', selected: true },
        ])
      ).toBeUndefined();
    });
  });

  describe('getSelectedValue', () => {
    it('returns the selected value from attribute values', () => {
      currentAttribute.values = [
        ConfiguratorTestUtils.createValue('123', 10, true),
        ConfiguratorTestUtils.createValue('456', 15),
      ];
      expect(
        classUnderTest['getSelectedValue'](currentAttribute)?.valueCode
      ).toBe('123');
    });

    it('returns undefined when no value is selected', () => {
      currentAttribute.values = [ConfiguratorTestUtils.createValue('456', 15)];
      expect(
        classUnderTest['getSelectedValue'](currentAttribute)
      ).toBeUndefined();
    });
  });

  describe('getAriaLabelGeneric', () => {
    it('returns empty string when value is undefined', () => {
      expect(
        classUnderTest['getAriaLabelGeneric'](currentAttribute, undefined)
      ).toBe('');
    });

    it('returns translated label including value and attribute', () => {
      const value = ConfiguratorTestUtils.createValue('123', 10);
      value.valueDisplay = 'Red';
      currentAttribute.label = 'Color';
      expect(
        classUnderTest['getAriaLabelGeneric'](currentAttribute, value)
      ).toContain('Red');
    });

    it('uses selected-value key when considerSelectionState is true and value is selected', () => {
      const value = ConfiguratorTestUtils.createValue('123', 10, true);
      value.valueDisplay = 'Red';
      currentAttribute.label = 'Color';
      expect(
        classUnderTest['getAriaLabelGeneric'](currentAttribute, value, true)
      ).toContain('configurator.a11y.selectedValueOfAttributeFull');
    });
  });

  describe('extractValuePriceFormulaParameters', () => {
    it('maps quantity, prices and selection state from value', () => {
      const value = ConfiguratorTestUtils.createValue('123', 10, true);
      value.quantity = 2;
      expect(classUnderTest.extractValuePriceFormulaParameters(value)).toEqual({
        quantity: 2,
        price: value.valuePrice,
        priceTotal: value.valuePriceTotal,
        isLightedUp: true,
      });
    });

    it('returns empty option fields when value is undefined', () => {
      expect(
        classUnderTest.extractValuePriceFormulaParameters(undefined)
      ).toEqual({
        quantity: undefined,
        price: undefined,
        priceTotal: undefined,
        isLightedUp: undefined,
      });
    });
  });

  describe('isLastSelected', () => {
    it('delegates to ConfiguratorStorefrontUtilsService', () => {
      const utils = TestBed.inject(
        ConfiguratorStorefrontUtilsService
      ) as unknown as {
        isLastSelected: jasmine.Spy;
      };
      utils.isLastSelected = jasmine
        .createSpy('isLastSelected')
        .and.returnValue(true);

      expect(classUnderTest.isLastSelected('attributeName', 'valueCode')).toBe(
        true
      );
      expect(utils.isLastSelected).toHaveBeenCalledWith(
        'attributeName',
        'valueCode'
      );
    });
  });

  describe('isRequiredErrorMsg', () => {
    it('should return false in case both required and incomplete properties are undefined', () => {
      expect(classUnderTest['isRequiredErrorMsg'](currentAttribute)).toBe(
        false
      );
    });

    it('should return false in case required property is undefined', () => {
      currentAttribute.required = undefined;
      currentAttribute.incomplete = true;
      expect(classUnderTest['isRequiredErrorMsg'](currentAttribute)).toBe(
        false
      );
    });

    it('should return false in case incomplete property is undefined', () => {
      currentAttribute.required = true;
      currentAttribute.incomplete = undefined;
      expect(classUnderTest['isRequiredErrorMsg'](currentAttribute)).toBe(
        false
      );
    });

    it('should return false in case required property is false', () => {
      currentAttribute.required = false;
      currentAttribute.incomplete = true;
      expect(classUnderTest['isRequiredErrorMsg'](currentAttribute)).toBe(
        false
      );
    });

    it('should return false in case incomplete property is false', () => {
      currentAttribute.required = false;
      currentAttribute.incomplete = true;
      expect(classUnderTest['isRequiredErrorMsg'](currentAttribute)).toBe(
        false
      );
    });

    it('should return true in case both required and incomplete properties are true', () => {
      currentAttribute.required = true;
      currentAttribute.incomplete = true;
      expect(classUnderTest['isRequiredErrorMsg'](currentAttribute)).toBe(true);
    });
  });

  describe('isUserInput', () => {
    it('should return false in case uiType is undefined', () => {
      currentAttribute.uiType = undefined;
      expect(classUnderTest['isUserInput'](currentAttribute)).toBe(false);
    });

    it('should return true in case uiType is RADIOBUTTON', () => {
      expect(classUnderTest['isUserInput'](currentAttribute)).toBe(false);
    });

    it('should return true in case uiType is STRING', () => {
      currentAttribute.uiType = Configurator.UiType.STRING;
      expect(classUnderTest['isUserInput'](currentAttribute)).toBe(true);
    });

    it('should return true in case uiType is NUMERIC', () => {
      currentAttribute.uiType = Configurator.UiType.NUMERIC;
      expect(classUnderTest['isUserInput'](currentAttribute)).toBe(true);
    });
  });

  describe('isDropDown', () => {
    it('should return false in case uiType is undefined', () => {
      currentAttribute.uiType = undefined;
      expect(classUnderTest['isDropDown'](currentAttribute)).toBe(false);
    });

    it('should return true in case uiType is RADIOBUTTON', () => {
      expect(classUnderTest['isDropDown'](currentAttribute)).toBe(false);
    });

    it('should return true in case uiType is DROPDOWN', () => {
      currentAttribute.uiType = Configurator.UiType.DROPDOWN;
      expect(classUnderTest['isDropDown'](currentAttribute)).toBe(true);
    });

    it('should return true in case uiType is DROPDOWN_PRODUCT', () => {
      currentAttribute.uiType = Configurator.UiType.DROPDOWN_PRODUCT;
      expect(classUnderTest['isDropDown'](currentAttribute)).toBe(true);
    });
  });

  describe('$priceChanged', () => {
    it('should emit true immediately', () => {
      let emitted = false;
      classUnderTest.changedPrices$
        .subscribe((priceChanged) => {
          expect(priceChanged).toEqual({});
          emitted = true;
        })
        .unsubscribe();
      expect(emitted).toBe(true);
      expect(
        configuratorAttributePriceChangeService.getChangedPrices
      ).not.toHaveBeenCalled();
    });

    it('should emit true immediately, if price changed event is initialized in synchronous pricing mode', () => {
      classUnderTest['initPriceChangedEvent'](false, 'attrKey');
      let emitted = false;
      classUnderTest.changedPrices$
        .subscribe((priceChanged) => {
          expect(priceChanged).toEqual({});
          emitted = true;
        })
        .unsubscribe();
      expect(emitted).toBe(true);
      expect(
        configuratorAttributePriceChangeService.getChangedPrices
      ).not.toHaveBeenCalled();
    });

    it('should emit true immediately, price changed event  is initialized but no price change service injected', () => {
      classUnderTest['configuratorAttributePriceChangeService'] = null;
      classUnderTest['initPriceChangedEvent'](true, 'attrKey');
      let emitted = false;
      classUnderTest.changedPrices$
        .subscribe((priceChanged) => {
          expect(priceChanged).toEqual({});
          emitted = true;
        })
        .unsubscribe();
      expect(emitted).toBe(true);
      expect(
        configuratorAttributePriceChangeService.getChangedPrices
      ).not.toHaveBeenCalled();
    });

    it('should emit immediately, if price changed event is initialized proper', () => {
      classUnderTest['initPriceChangedEvent'](true, 'attrKey');
      let emitted = false;

      classUnderTest.changedPrices$
        .subscribe((priceChanged) => {
          expect(priceChanged).toEqual({
            dummy: { value: 10, currencyIso: 'USD' },
          });
          emitted = true;
        })
        .unsubscribe();
      expect(emitted).toBe(true);
      expect(
        configuratorAttributePriceChangeService.getChangedPrices
      ).toHaveBeenCalled();
    });
  });

  describe('isNoValueSelected', () => {
    it('should return `false` in case there are no values', () => {
      expect(classUnderTest['isNoValueSelected'](currentAttribute)).toBe(true);
    });

    it('should return `false` in case there is a selected value with value code `0`', () => {
      currentAttribute.values = [
        ConfiguratorTestUtils.createValue(
          Configurator.RetractValueCode,
          undefined,
          true
        ),
        ConfiguratorTestUtils.createValue('456', 15),
        ConfiguratorTestUtils.createValue('789', 20),
      ];
      expect(classUnderTest['isNoValueSelected'](currentAttribute)).toBe(true);
    });

    it('should return `false` in case the selected value has a code `###RETRACT_VALUE_CODE###`', () => {
      currentAttribute.values = [
        ConfiguratorTestUtils.createValue(
          Configurator.RetractValueCode,
          undefined,
          true
        ),
        ConfiguratorTestUtils.createValue('456', 15),
        ConfiguratorTestUtils.createValue('789', 20),
      ];
      expect(classUnderTest['isNoValueSelected'](currentAttribute)).toBe(true);
    });

    it('should return `false` in case there is selected value', () => {
      currentAttribute.values = [
        ConfiguratorTestUtils.createValue('123', 10, true),
        ConfiguratorTestUtils.createValue('456', 15),
        ConfiguratorTestUtils.createValue('789', 20),
      ];
      expect(classUnderTest['isNoValueSelected'](currentAttribute)).toBe(false);
    });

    it('should return `true` in case there is selected value', () => {
      currentAttribute.values = [
        ConfiguratorTestUtils.createValue('123', 10, true),
        ConfiguratorTestUtils.createValue('456', 15),
        ConfiguratorTestUtils.createValue('789', 20),
      ];
      expect(classUnderTest['isNoValueSelected'](currentAttribute)).toBe(false);
    });
  });

  describe('getValueDescriptionLength', () => {
    it('should return default value if productConfigurator setting is not provided', () => {
      configuratorUISettingsConfig.productConfigurator = undefined;
      expect(classUnderTest.getValueDescriptionLength()).toEqual(70);
    });

    it('should return default value if descriptions setting is not provided', () => {
      (configuratorUISettingsConfig.productConfigurator ?? {}).descriptions =
        undefined;
      expect(classUnderTest.getValueDescriptionLength()).toEqual(70);
    });

    it('should return default value if valueDescriptionLength setting is not provided', () => {
      (
        configuratorUISettingsConfig.productConfigurator?.descriptions ?? {}
      ).valueDescriptionLength = undefined;
      expect(classUnderTest.getValueDescriptionLength()).toEqual(70);
    });

    it('should return set value if valueDescriptionLength setting is 80', () => {
      (
        configuratorUISettingsConfig.productConfigurator?.descriptions ?? {}
      ).valueDescriptionLength = 80;
      expect(classUnderTest.getValueDescriptionLength()).toEqual(80);
    });

    describe('isReadOnly', () => {
      it('should return false in case uiType is undefined', () => {
        currentAttribute.uiType = undefined;
        expect(classUnderTest['isReadOnly'](currentAttribute)).toBe(false);
      });

      it('should return false in case uiType is RADIOBUTTON', () => {
        expect(classUnderTest['isReadOnly'](currentAttribute)).toBe(false);
      });

      it('should return true in case uiType is READ_ONLY', () => {
        currentAttribute.uiType = Configurator.UiType.READ_ONLY;
        expect(classUnderTest['isReadOnly'](currentAttribute)).toBe(true);
      });

      it('should return true in case uiType is READ_ONLY_SINGLE_SELECTION_IMAGE', () => {
        currentAttribute.uiType =
          Configurator.UiType.READ_ONLY_SINGLE_SELECTION_IMAGE;
        expect(classUnderTest['isReadOnly'](currentAttribute)).toBe(true);
      });

      it('should return true in case uiType is READ_ONLY_MULTI_SELECTION_IMAGE', () => {
        currentAttribute.uiType =
          Configurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE;
        expect(classUnderTest['isReadOnly'](currentAttribute)).toBe(true);
      });
    });

    describe('isValueDisplayed', () => {
      it('should return false in case uiType is READ_ONLY_MULTI_SELECTION_IMAGE and value is not selected', () => {
        currentAttribute.uiType =
          Configurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE;
        const value: Configurator.Value = { valueCode: 'val', selected: false };
        expect(
          classUnderTest['isValueDisplayed'](currentAttribute, value)
        ).toBe(false);
      });

      it('should return true in case uiType is READ_ONLY_MULTI_SELECTION_IMAGE and value is selected', () => {
        currentAttribute.uiType =
          Configurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE;
        const value: Configurator.Value = { valueCode: 'val', selected: true };
        expect(
          classUnderTest['isValueDisplayed'](currentAttribute, value)
        ).toBe(true);
      });

      it('should return true in case uiType is RADIOBUTTON and value is not selected', () => {
        currentAttribute.uiType = Configurator.UiType.RADIOBUTTON;
        const value: Configurator.Value = { valueCode: 'val', selected: false };
        expect(
          classUnderTest['isValueDisplayed'](currentAttribute, value)
        ).toBe(true);
      });

      it('should return true in case uiType is RADIOBUTTON and value is selected', () => {
        currentAttribute.uiType = Configurator.UiType.RADIOBUTTON;
        const value: Configurator.Value = { valueCode: 'val', selected: true };
        expect(
          classUnderTest['isValueDisplayed'](currentAttribute, value)
        ).toBe(true);
      });
    });
  });

  describe('getContainerRowInfoKey', () => {
    it('should return undefined if neither minRows nor maxRows is set', () => {
      expect(classUnderTest.getContainerRowInfoKey()).toBeUndefined();
    });

    it('should return undefined if minRows is 0 and maxRows is not set', () => {
      expect(classUnderTest.getContainerRowInfoKey(0)).toBeUndefined();
    });

    it('should return undefined if minRows and maxRows are 0', () => {
      expect(classUnderTest.getContainerRowInfoKey(0, 0)).toBeUndefined();
    });

    it('should return min/max translatable if both minRows and maxRows are set and differ', () => {
      expect(classUnderTest.getContainerRowInfoKey(1, 4)).toEqual({
        key: 'configurator.attribute.containerMinMaxRows',
        params: { minRows: 1, maxRows: 4 },
      });
    });

    it('should return min translatable if only minRows is set', () => {
      expect(classUnderTest.getContainerRowInfoKey(1)).toEqual({
        key: 'configurator.attribute.containerMinRows',
        params: { count: 1 },
      });
    });

    it('should return max translatable if only maxRows is set', () => {
      expect(classUnderTest.getContainerRowInfoKey(undefined, 4)).toEqual({
        key: 'configurator.attribute.containerMaxRows',
        params: { count: 4 },
      });
    });

    it('should treat minRows of 0 as no minimum', () => {
      expect(classUnderTest.getContainerRowInfoKey(0, 4)).toEqual({
        key: 'configurator.attribute.containerMaxRows',
        params: { count: 4 },
      });
    });

    it('should treat maxRows of 0 as no maximum', () => {
      expect(classUnderTest.getContainerRowInfoKey(2, 0)).toEqual({
        key: 'configurator.attribute.containerMinRows',
        params: { count: 2 },
      });
    });

    it('should return exact-count translatable if minRows equals maxRows', () => {
      expect(classUnderTest.getContainerRowInfoKey(3, 3)).toEqual({
        key: 'configurator.attribute.containerExactRows',
        params: { count: 3 },
      });
    });
  });

  describe('getContainerRemainingRequiredCount', () => {
    it('should return minRows when no rows are selected', () => {
      expect(classUnderTest.getContainerRemainingRequiredCount(3, [])).toBe(3);
    });

    it('should subtract selected rows from minRows', () => {
      expect(
        classUnderTest.getContainerRemainingRequiredCount(4, [
          { id: '1', selected: true },
          { id: '2', selected: true },
          { id: '3', selected: false },
        ])
      ).toBe(2);
    });

    it('should return 0 if minRows is not set', () => {
      expect(
        classUnderTest.getContainerRemainingRequiredCount(undefined, [])
      ).toBe(0);
    });

    it('should return 0 if minRows is 0', () => {
      expect(classUnderTest.getContainerRemainingRequiredCount(0, [])).toBe(0);
    });

    it('should treat undefined rows as no selection', () => {
      expect(classUnderTest.getContainerRemainingRequiredCount(3)).toBe(3);
    });

    it('should default to 0 if remaining products are zero', () => {
      expect(
        classUnderTest.getContainerRemainingRequiredCount(2, [
          { id: '1', selected: true },
          { id: '2', selected: true },
        ])
      ).toBe(0);
    });
  });

  describe('enrichValueWithPrice', () => {
    const value: Configurator.Value = { valueCode: 'val', selected: true };
    it('should return original value if no price is known', () => {
      expect(classUnderTest.enrichValueWithPrice(value, {})).toBe(value);
    });

    it('should return new value if price is known', () => {
      const price: Configurator.PriceDetails = {
        value: 10,
        currencyIso: 'USD',
      };
      type ChangedPrices = Record<string, Configurator.PriceDetails>;
      const changedPrices: ChangedPrices = {
        val: price,
      };
      const expectedValue = { ...value };
      expectedValue.valuePrice = price;
      expect(classUnderTest.enrichValueWithPrice(value, changedPrices)).toEqual(
        expectedValue
      );
    });
  });
});
