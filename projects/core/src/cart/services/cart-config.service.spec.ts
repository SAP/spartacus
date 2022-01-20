import { TestBed } from '@angular/core/testing';
import { CartConfig, CartConfigService } from '@spartacus/core';

describe('CartConfigService', () => {
  let mockCartConfig: CartConfig;
  let service: CartConfigService;

  beforeEach(() => {
    mockCartConfig = {};
    TestBed.configureTestingModule({
      providers: [{ provide: CartConfig, useValue: mockCartConfig }],
    });
    service = TestBed.inject(CartConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isSelectiveCartService', () => {
    it('should return true if selectiveCart enabled is set to true', () => {
      mockCartConfig.cart = { selectiveCart: { enabled: true } };
      expect(service.isSelectiveCartEnabled()).toBeTruthy();
    });

    it('should return false if selectiveCart enabled is set to false', () => {
      expect(service.isSelectiveCartEnabled()).toBeFalsy();
    });
  });

  describe('isCartValidationEnabled', () => {
    it('should return true if cart validation enabled is set to true', () => {
      mockCartConfig.cart = { validation: { enabled: true } };
      expect(service.isCartValidationEnabled()).toBeTruthy();
    });

    it('should return false if cart validation enabled is set to false', () => {
      expect(service.isCartValidationEnabled()).toBeFalsy();
    });
  });
});
