import { TestBed } from '@angular/core/testing';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityService } from './configurator-attribute-quantity.service';

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
  describe('disableQuantityActions', () => {
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
});
