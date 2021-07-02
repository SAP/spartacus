import { TestBed } from '@angular/core/testing';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityService } from './configurator-attribute-quantity.service';

const VALUE_CODE = 'a';
const VALUE_CODE2 = 'b';

describe('ConfiguratorAttributeQuantityService', () => {
  let service: ConfiguratorAttributeQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguratorAttributeQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('disableQuantityActions', () => {
    it('should return false if numeric non-zero value is passed', () => {
      expect(service.disableQuantityActions(10)).toBe(false);
    });
    it('should return true if value is null or undefined', () => {
      expect(service.disableQuantityActions(null)).toBe(true);
      expect(service.disableQuantityActions(undefined)).toBe(true);
    });
    it('should return true if numeric value is zero', () => {
      expect(service.disableQuantityActions(0)).toBe(true);
    });
    it('should return true if string value is "0"', () => {
      expect(service.disableQuantityActions('0')).toBe(true);
    });
  });

  describe('disableQuantityActionsMultiSelection', () => {
    it('should return false if attribute dataType other than USER_SELECTION_QTY_ATTRIBUTE_LEVEL', () => {
      const attribute: Configurator.Attribute = {
        name: 'attributeName',
        dataType: Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL,
        quantity: 0,
      };
      expect(service.disableQuantityActionsMultiSelection(attribute)).toBe(
        false
      );
    });

    it('should return false if attribute dataType is USER_SELECTION_QTY_ATTRIBUTE_LEVEL, value is selected and quantity <> 0', () => {
      const attribute: Configurator.Attribute = {
        name: 'attributeName',
        dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
        values: [{ name: 'V1', selected: true, valueCode: VALUE_CODE }],
        quantity: 1,
      };
      expect(service.disableQuantityActionsMultiSelection(attribute)).toBe(
        false
      );
    });

    it('should return true if attribute dataType is USER_SELECTION_QTY_ATTRIBUTE_LEVEL and no values', () => {
      const attribute: Configurator.Attribute = {
        name: 'attributeName',
        dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
        quantity: 1,
      };
      expect(service.disableQuantityActionsMultiSelection(attribute)).toBe(
        true
      );
    });

    it('should return true if attribute dataType is USER_SELECTION_QTY_ATTRIBUTE_LEVEL and no selected value', () => {
      const attribute: Configurator.Attribute = {
        name: 'attributeName',
        dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
        values: [
          { name: 'V1', selected: false, valueCode: VALUE_CODE },
          { name: 'V2', selected: false, valueCode: VALUE_CODE2 },
        ],
        quantity: 1,
      };
      expect(service.disableQuantityActionsMultiSelection(attribute)).toBe(
        true
      );
    });

    it('should return true if attribute dataType is USER_SELECTION_QTY_ATTRIBUTE_LEVEL and quantity is 0', () => {
      const attribute: Configurator.Attribute = {
        name: 'attributeName',
        dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
        values: [
          { name: 'V1', selected: true, valueCode: VALUE_CODE },
          { name: 'V2', selected: false, valueCode: VALUE_CODE2 },
        ],
        quantity: 0,
      };
      expect(service.disableQuantityActionsMultiSelection(attribute)).toBe(
        true
      );
    });
  });

  describe('withQuantityOnAttributeLevel', () => {
    it('should return true if attribute dataType is USER_SELECTION_QTY_ATTRIBUTE_LEVEL', () => {
      const attribute: Configurator.Attribute = {
        name: 'attributeName',
        dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
      };
      expect(service.withQuantityOnAttributeLevel(attribute)).toBe(true);
    });

    it('should return false if attribute dataType other than USER_SELECTION_QTY_ATTRIBUTE_LEVEL', () => {
      const attribute: Configurator.Attribute = {
        name: 'attributeName',
        dataType: Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL,
      };
      expect(service.withQuantityOnAttributeLevel(attribute)).toBe(false);
    });
  });

  describe('withQuantity', () => {
    it('should return true for uiType DROPDOWN and dataType USER_SELECTION_QTY_ATTRIBUTE_LEVEL', () => {
      expect(
        service.withQuantity(
          Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
          Configurator.UiType.DROPDOWN
        )
      ).toBe(true);
    });
    it('should return false if uiType is DROPDOWN and dataType is not USER_SELECTION_QTY_ATTRIBUTE_LEVEL', () => {
      expect(
        service.withQuantity(
          Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL,
          Configurator.UiType.DROPDOWN
        )
      ).toBe(false);
    });
    it('should return true for uiType DROPDOWN_PRODUCT and dataType USER_SELECTION_QTY_VALUE_LEVEL', () => {
      expect(
        service.withQuantity(
          Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL,
          Configurator.UiType.DROPDOWN_PRODUCT
        )
      ).toBe(false);
    });
    it('should return false if uiType is DROPDOWN_PRODUCT and dataType is not USER_SELECTION_QTY_VALUE_LEVEL', () => {
      expect(
        service.withQuantity(
          Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
          Configurator.UiType.DROPDOWN_PRODUCT
        )
      ).toBe(true);
    });
    it('should return based on data type for uiType CHECKBOXLIST', () => {
      expect(
        service.withQuantity(
          Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
          Configurator.UiType.CHECKBOXLIST
        )
      ).toBe(false);
    });
    it('should return based on data type for uiType CHECKBOXLIST_PRODUCT', () => {
      expect(
        service.withQuantity(
          Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL,
          Configurator.UiType.CHECKBOXLIST_PRODUCT
        )
      ).toBe(true);
    });
  });

  describe('allowZeroValueQuantity', () => {
    it('should return false if attribute is required and less than 2 values are selected', () => {
      const attribute: Configurator.Attribute = {
        name: 'attributeName',
        required: true,
        values: [
          { name: 'V1', selected: true, valueCode: VALUE_CODE },
          { name: 'V2', selected: false, valueCode: VALUE_CODE2 },
        ],
      };
      expect(service.allowZeroValueQuantity(attribute)).toBe(false);
    });

    it('should return true if more than 1 value is selected', () => {
      const attribute: Configurator.Attribute = {
        name: 'attributeName',
        required: true,
        values: [
          { name: 'V1', selected: true, valueCode: VALUE_CODE },
          { name: 'V2', selected: true, valueCode: VALUE_CODE2 },
        ],
      };
      expect(service.allowZeroValueQuantity(attribute)).toBe(true);
    });

    it('should return true if attribute is not required', () => {
      const attribute: Configurator.Attribute = {
        name: 'attributeName',
        required: false,
        values: [
          { name: 'V1', selected: true, valueCode: VALUE_CODE },
          { name: 'V2', selected: false, valueCode: VALUE_CODE2 },
        ],
      };
      expect(service.allowZeroValueQuantity(attribute)).toBe(true);
    });
  });
});
