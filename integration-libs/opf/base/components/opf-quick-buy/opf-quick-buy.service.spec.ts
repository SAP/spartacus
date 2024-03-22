/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CheckoutConfig } from '@spartacus/checkout/base/root';
import { AuthService, BaseSiteService, RoutingService } from '@spartacus/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { OpfPaymentFacade } from '../../root/facade';
import {
  DigitalWalletQuickBuy,
  OpfPaymentProviderType,
  OpfProviderType,
  OpfQuickBuyLocation,
  defaultMerchantName,
} from '../../root/model';
import { OpfQuickBuyService } from './opf-quick-buy.service';

describe('OpfQuickBuyService', () => {
  let service: OpfQuickBuyService;
  let opfPaymentFacadeMock: any;
  let baseSiteServiceMock: any;
  let authServiceMock: any;
  let checkoutConfigMock: any;
  let routingServiceMock: any;

  beforeEach(() => {
    opfPaymentFacadeMock = jasmine.createSpyObj('OpfPaymentFacade', [
      'getActiveConfigurationsState',
    ]);
    baseSiteServiceMock = jasmine.createSpyObj('BaseSiteService', ['get']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['isUserLoggedIn']);
    checkoutConfigMock = jasmine.createSpyObj('CheckoutConfig', ['checkout']);
    routingServiceMock = jasmine.createSpyObj('RoutingService', [
      'getRouterState',
    ]);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        OpfQuickBuyService,
        { provide: OpfPaymentFacade, useValue: opfPaymentFacadeMock },
        { provide: BaseSiteService, useValue: baseSiteServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: CheckoutConfig, useValue: checkoutConfigMock },
        { provide: RoutingService, useValue: routingServiceMock },
      ],
    });

    service = TestBed.inject(OpfQuickBuyService);
  });

  describe('getPaymentGatewayConfiguration', () => {
    it('should return the first PAYMENT_GATEWAY configuration when available', () => {
      const mockConfigurations = [
        { providerType: OpfPaymentProviderType.PAYMENT_METHOD },
        { providerType: OpfPaymentProviderType.PAYMENT_GATEWAY },
        { providerType: OpfPaymentProviderType.PAYMENT_GATEWAY },
      ];
      opfPaymentFacadeMock.getActiveConfigurationsState.and.returnValue(
        of({ data: mockConfigurations })
      );

      service.getPaymentGatewayConfiguration().subscribe((result) => {
        expect(result).toEqual(mockConfigurations[1]);
      });
    });

    it('should return undefined when there are no active configurations', () => {
      opfPaymentFacadeMock.getActiveConfigurationsState.and.returnValue(
        of({ data: [] })
      );

      service.getPaymentGatewayConfiguration().subscribe((result) => {
        expect(result).toBeUndefined();
      });
    });

    it('should return undefined when no configuration matches PAYMENT_GATEWAY type', () => {
      const mockConfigurations = [{ providerType: 'SOME_OTHER_TYPE' }];
      opfPaymentFacadeMock.getActiveConfigurationsState.and.returnValue(
        of({ data: mockConfigurations })
      );

      service.getPaymentGatewayConfiguration().subscribe((result) => {
        expect(result).toBeUndefined();
      });
    });

    it('should handle errors when fetching configurations', () => {
      const error = new Error('Network error');
      opfPaymentFacadeMock.getActiveConfigurationsState.and.returnValue(
        throwError(error)
      );

      service.getPaymentGatewayConfiguration().subscribe(
        () => fail('Expected an error, not configurations'),
        (err) => expect(err).toBe(error)
      );
    });

    it('should return an empty array when config.data is undefined', () => {
      opfPaymentFacadeMock.getActiveConfigurationsState.and.returnValue(of({}));

      service.getPaymentGatewayConfiguration().subscribe((result) => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('isQuickBuyProviderEnabled', () => {
    const provider = OpfProviderType.APPLE_PAY;

    it('should return true when the provider is enabled', () => {
      const activeConfiguration = {
        digitalWalletQuickBuy: [
          { provider: OpfProviderType.APPLE_PAY, enabled: true },
        ],
      };

      const result = service.isQuickBuyProviderEnabled(
        provider,
        activeConfiguration
      );
      expect(result).toBeTruthy();
    });

    it('should return false when the provider is disabled', () => {
      const activeConfiguration = {
        digitalWalletQuickBuy: [
          { provider: OpfProviderType.APPLE_PAY, enabled: false },
        ],
      };

      const result = service.isQuickBuyProviderEnabled(
        provider,
        activeConfiguration
      );
      expect(result).toBeFalsy();
    });

    it('should return false when the provider is not found', () => {
      const activeConfiguration = {
        digitalWalletQuickBuy: [
          { provider: 'otherProvider' as any, enabled: true },
        ],
      };

      const result = service.isQuickBuyProviderEnabled(
        provider,
        activeConfiguration
      );
      expect(result).toBeFalsy();
    });

    it('should return false when activeConfiguration is null', () => {
      const result = service.isQuickBuyProviderEnabled(provider, null as any);
      expect(result).toBeFalsy();
    });

    it('should return false when activeConfiguration is undefined', () => {
      const result = service.isQuickBuyProviderEnabled(
        provider,
        undefined as any
      );
      expect(result).toBeFalsy();
    });

    it('should return false when digitalWalletQuickBuy is null or empty', () => {
      const provider = OpfProviderType.APPLE_PAY;
      const activeConfiguration = {
        digitalWalletQuickBuy: null as any,
      };

      const result = service.isQuickBuyProviderEnabled(
        provider,
        activeConfiguration
      );
      expect(result).toBeFalsy();
    });
  });

  describe('isUserGuestOrLoggedIn', () => {
    it('should return true if the user is logged in', () => {
      baseSiteServiceMock.get.and.returnValue(
        of({ baseStore: { paymentProvider: 'providerWithGuestSupport' } })
      );
      authServiceMock.isUserLoggedIn.and.returnValue(of(true));

      service.isUserGuestOrLoggedIn().subscribe((result) => {
        expect(result).toBeTruthy();
      });
    });

    it('should return true if the user is a guest and guest checkout is supported', () => {
      baseSiteServiceMock.get.and.returnValue(
        of({ baseStore: { paymentProvider: 'providerWithGuestSupport' } })
      );

      authServiceMock.isUserLoggedIn.and.returnValue(of(false));
      checkoutConfigMock.checkout.flows = {
        providerWithGuestSupport: { guest: true },
      };

      service.isUserGuestOrLoggedIn().subscribe((result) => {
        expect(result).toBeTruthy();
      });
    });

    it('should return false if the user is not logged in and guest checkout is not supported', () => {
      baseSiteServiceMock.get.and.returnValue(
        of({ baseStore: { paymentProvider: 'providerWithoutGuestSupport' } })
      );
      authServiceMock.isUserLoggedIn.and.returnValue(of(false));
      checkoutConfigMock.checkout.flows = {
        providerWithoutGuestSupport: { guest: false },
      };

      service.isUserGuestOrLoggedIn().subscribe((result) => {
        expect(result).toBeFalsy();
      });
    });

    it('should handle errors appropriately', () => {
      const error = new Error('Network error');
      baseSiteServiceMock.get.and.returnValue(throwError(error));

      service.isUserGuestOrLoggedIn().subscribe(
        () => fail('Expected an error, not a successful response'),
        (err) => expect(err).toBe(error)
      );
    });
  });

  describe('getQuickBuyLocationContext', () => {
    it('should return OpfQuickBuyLocation', () => {
      routingServiceMock.getRouterState.and.returnValue(
        new BehaviorSubject({ state: { semanticRoute: 'cart' } })
      );

      service.getQuickBuyLocationContext().subscribe((context) => {
        expect(context).toBe(OpfQuickBuyLocation.CART);
      });
    });
  });

  describe('getQuickBuyProviderConfig', () => {
    const config: DigitalWalletQuickBuy = {
      provider: OpfProviderType.GOOGLE_PAY,
      googlePayGateway: 'test',
      merchantId: 'test',
      merchantName: 'test',
      enabled: true,
    };

    it('should return config for specific provider', () => {
      const activeConfiguration = {
        digitalWalletQuickBuy: [
          { provider: OpfProviderType.APPLE_PAY, enabled: true },
          config,
        ],
      };

      const result = service.getQuickBuyProviderConfig(
        OpfProviderType.GOOGLE_PAY,
        activeConfiguration
      );
      expect(result).toBe(config);
    });
  });
  describe('getMerchantName', () => {
    it('should return baseSite name', (done) => {
      const mockName = 'Electronics store';
      baseSiteServiceMock.get.and.returnValue(of({ name: mockName }));
      service.getMerchantName().subscribe((merchantName) => {
        expect(merchantName).toBe(mockName);
        done();
      });
    });
    it('should return default MerchantName name when empty', (done) => {
      const mockName = undefined;
      baseSiteServiceMock.get.and.returnValue(of({ name: mockName }));
      service.getMerchantName().subscribe((merchantName) => {
        expect(merchantName).toBe(defaultMerchantName);
        done();
      });
    });
  });
});
