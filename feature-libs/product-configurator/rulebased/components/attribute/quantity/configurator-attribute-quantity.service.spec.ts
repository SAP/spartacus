import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityService } from './configurator-attribute-quantity.service';
import { TestBed } from '@angular/core/testing';

describe('ConfiguratorAttributeQuantityService', () => {
  let service: ConfiguratorAttributeQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguratorAttributeQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should readOnlyQuantity be false when has value', () => {
    expect(service.readOnlyQuantity(10)).toBe(false);
  });

  it('should readOnlyQuantity be true when value is missing', () => {
    expect(service.readOnlyQuantity(0)).toBe(true);
  });

  it('should withQuantity be true when UIType DROPDOWN and DataType USER_SELECTION_QTY_ATTRIBUTE_LEVEL', () => {
    expect(
      service.withQuantity(
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
        Configurator.UiType.DROPDOWN
      )
    ).toBe(true);
  });

  it('should withQuantity be false when UIType DROPDOWN and DataType is not USER_SELECTION_QTY_ATTRIBUTE_LEVEL', () => {
    expect(
      service.withQuantity(
        Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL,
        Configurator.UiType.DROPDOWN
      )
    ).toBe(false);
  });

  it('should withQuantity be true when UIType DROPDOWN_PRODUCT and DataType USER_SELECTION_QTY_VALUE_LEVEL', () => {
    expect(
      service.withQuantity(
        Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL,
        Configurator.UiType.DROPDOWN_PRODUCT
      )
    ).toBe(true);
  });

  it('should withQuantity be false when UIType DROPDOWN_PRODUCT and DataType is not USER_SELECTION_QTY_VALUE_LEVEL', () => {
    expect(
      service.withQuantity(
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
        Configurator.UiType.DROPDOWN_PRODUCT
      )
    ).toBe(false);
  });
});
