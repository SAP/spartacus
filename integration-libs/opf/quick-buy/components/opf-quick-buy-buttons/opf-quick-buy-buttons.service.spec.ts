/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CheckoutConfig } from '@spartacus/checkout/base/root';
import {
  AuthService,
  BaseSiteService,
  QueryState,
  RoutingService,
} from '@spartacus/core';
import {
  ActiveConfiguration,
  OpfBaseFacade,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import { of, throwError } from 'rxjs';
import { OpfProviderType, OpfQuickBuyDigitalWallet } from '../../root/model';
import { OpfQuickBuyButtonsService } from './opf-quick-buy-buttons.service';

describe('OpfQuickBuyService', () => {
  let service: OpfQuickBuyButtonsService;
  let opfBaseFacadeMock: jasmine.SpyObj<OpfBaseFacade>;
  let baseSiteServiceMock: jasmine.SpyObj<BaseSiteService>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let checkoutConfigMock: jasmine.SpyObj<CheckoutConfig>;
  let routingServiceMock: jasmine.SpyObj<RoutingService>;

  beforeEach(() => {
    opfBaseFacadeMock = jasmine.createSpyObj('OpfBaseFacade', [
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
        OpfQuickBuyButtonsService,
        { provide: OpfBaseFacade, useValue: opfBaseFacadeMock },
        { provide: BaseSiteService, useValue: baseSiteServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: CheckoutConfig, useValue: checkoutConfigMock },
        { provide: RoutingService, useValue: routingServiceMock },
      ],
    });

    service = TestBed.inject(OpfQuickBuyButtonsService);
  });

  describe('getPaymentGatewayConfiguration', () => {
    it('should return the first PAYMENT_GATEWAY configuration when available', () => {
      const mockConfigurations = [
        { providerType: OpfPaymentProviderType.PAYMENT_METHOD },
        { providerType: OpfPaymentProviderType.PAYMENT_GATEWAY },
        { providerType: OpfPaymentProviderType.PAYMENT_GATEWAY },
      ];
      opfBaseFacadeMock.getActiveConfigurationsState.and.returnValue(
        of({ data: mockConfigurations } as QueryState<ActiveConfiguration[]>)
      );

      service.getPaymentGatewayConfiguration().subscribe((result) => {
        expect(result).toEqual(mockConfigurations[1]);
      });
    });

    it('should return undefined when there are no active configurations', () => {
      opfBaseFacadeMock.getActiveConfigurationsState.and.returnValue(
        of({ data: undefined } as QueryState<ActiveConfiguration[]>)
      );

      service.getPaymentGatewayConfiguration().subscribe((result) => {
        expect(result).toBeUndefined();
      });
    });

    it('should return undefined when no configuration matches PAYMENT_GATEWAY type', () => {
      const mockConfigurations = [{ providerType: 'SOME_OTHER_TYPE' }];
      opfBaseFacadeMock.getActiveConfigurationsState.and.returnValue(
        of({ data: mockConfigurations } as QueryState<ActiveConfiguration[]>)
      );

      service.getPaymentGatewayConfiguration().subscribe((result) => {
        expect(result).toBeUndefined();
      });
    });

    it('should handle errors when fetching configurations', () => {
      const error = new Error('Network error');
      opfBaseFacadeMock.getActiveConfigurationsState.and.returnValue(
        throwError(error)
      );

      service.getPaymentGatewayConfiguration().subscribe(
        () => fail('Expected an error, not configurations'),
        (err) => expect(err).toBe(error)
      );
    });

    it('should return an empty array when config.data is undefined', () => {
      opfBaseFacadeMock.getActiveConfigurationsState.and.returnValue(
        of({} as QueryState<ActiveConfiguration[]>)
      );

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

  describe('getQuickBuyProviderConfig', () => {
    const config: OpfQuickBuyDigitalWallet = {
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
});
