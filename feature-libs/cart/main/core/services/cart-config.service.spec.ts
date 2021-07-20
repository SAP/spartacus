import { TestBed } from '@angular/core/testing';
import { CartConfig } from '@spartacus/cart/main/root';
import { CartConfigService } from './cart-config.service';

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
});
