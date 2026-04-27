/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CheckoutConfig } from '@spartacus/checkout/base/root';
import { AuthService, QueryState, RoutingService } from '@spartacus/core';
import {
  OpfActiveConfigurationsResponse,
  OpfBaseFacade,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import { of, throwError } from 'rxjs';
import {
  OpfQuickBuyDigitalWallet,
  OpfQuickBuyProviderType,
} from '../../root/model';
import { OpfQuickBuyButtonsService } from './opf-quick-buy-buttons.service';

describe('OpfQuickBuyButtonsService', () => {
  let service: OpfQuickBuyButtonsService;
  let opfBaseFacadeMock: jasmine.SpyObj<OpfBaseFacade>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let checkoutConfigMock: jasmine.SpyObj<CheckoutConfig>;
  let routingServiceMock: jasmine.SpyObj<RoutingService>;

  beforeEach(() => {
    opfBaseFacadeMock = jasmine.createSpyObj('OpfBaseFacade', [
      'getActiveConfigurationsState',
    ]);
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
        { provide: AuthService, useValue: authServiceMock },
        { provide: CheckoutConfig, useValue: checkoutConfigMock },
        { provide: RoutingService, useValue: routingServiceMock },
      ],
    });

    service = TestBed.inject(OpfQuickBuyButtonsService);
  });

  describe('getPaymentGatewayConfiguration', () => {
    it('should return all PAYMENT_GATEWAY configurations when available', () => {
      const mockConfigurations = [
        { providerType: OpfPaymentProviderType.PAYMENT_METHOD },
        { providerType: OpfPaymentProviderType.PAYMENT_GATEWAY },
        { providerType: OpfPaymentProviderType.PAYMENT_GATEWAY },
      ];
      opfBaseFacadeMock.getActiveConfigurationsState.and.returnValue(
        of({
          data: { value: mockConfigurations },
        } as QueryState<OpfActiveConfigurationsResponse>)
      );

      service.getPaymentGatewayConfiguration().subscribe((result) => {
        expect(result).toEqual([
          mockConfigurations[1],
          mockConfigurations[2],
        ] as any);
      });
    });

    it('should return undefined when there are no active configurations', () => {
      opfBaseFacadeMock.getActiveConfigurationsState.and.returnValue(
        of({
          data: { value: undefined },
        } as QueryState<OpfActiveConfigurationsResponse>)
      );

      service.getPaymentGatewayConfiguration().subscribe((result) => {
        expect(result).toEqual([]);
      });
    });

    it('should return undefined when no configuration matches PAYMENT_GATEWAY type', () => {
      const mockConfigurations = [{ providerType: 'SOME_OTHER_TYPE' }];
      opfBaseFacadeMock.getActiveConfigurationsState.and.returnValue(
        of({
          data: { value: mockConfigurations },
        } as QueryState<OpfActiveConfigurationsResponse>)
      );

      service.getPaymentGatewayConfiguration().subscribe((result) => {
        expect(result).toEqual([]);
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
  });

  describe('isQuickBuyProviderEnabled', () => {
    const provider = OpfQuickBuyProviderType.APPLE_PAY;

    it('should return true when the provider is enabled (array)', () => {
      const activeConfiguration = [
        {
          digitalWalletQuickBuy: [
            { provider: OpfQuickBuyProviderType.APPLE_PAY, enabled: true },
          ],
        } as any,
      ];

      const result = service.isQuickBuyProviderEnabled(
        provider,
        activeConfiguration
      );
      expect(result).toBeTruthy();
    });

    it('should return true when the provider is enabled (single object)', () => {
      const activeConfiguration = {
        digitalWalletQuickBuy: [
          { provider: OpfQuickBuyProviderType.APPLE_PAY, enabled: true },
        ],
      } as any;

      const result = service.isQuickBuyProviderEnabled(
        provider,
        activeConfiguration
      );
      expect(result).toBeTruthy();
    });

    it('should return false when the provider is disabled', () => {
      const activeConfiguration = [
        {
          digitalWalletQuickBuy: [
            { provider: OpfQuickBuyProviderType.APPLE_PAY, enabled: false },
          ],
        } as any,
      ];

      const result = service.isQuickBuyProviderEnabled(
        provider,
        activeConfiguration
      );
      expect(result).toBeFalsy();
    });

    it('should return false when the provider is not found', () => {
      const activeConfiguration = [
        {
          digitalWalletQuickBuy: [
            { provider: 'otherProvider' as any, enabled: true },
          ],
        } as any,
      ];

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
      const provider = OpfQuickBuyProviderType.APPLE_PAY;
      const activeConfiguration = [
        {
          digitalWalletQuickBuy: null as any,
        } as any,
      ];

      const result = service.isQuickBuyProviderEnabled(
        provider,
        activeConfiguration
      );
      expect(result).toBeFalsy();
    });
  });

  describe('getQuickBuyProviderConfig', () => {
    const config: OpfQuickBuyDigitalWallet = {
      provider: OpfQuickBuyProviderType.GOOGLE_PAY,
      googlePayGateway: 'test',
      merchantId: 'test',
      merchantName: 'test',
      enabled: true,
    };

    it('should return config for specific provider (array)', () => {
      const activeConfiguration = [
        {
          digitalWalletQuickBuy: [
            { provider: OpfQuickBuyProviderType.APPLE_PAY, enabled: true },
            config,
          ],
        } as any,
      ];

      const result = service.getQuickBuyProviderConfig(
        OpfQuickBuyProviderType.GOOGLE_PAY,
        activeConfiguration
      );
      expect(result).toBe(config);
    });

    it('should return config for specific provider (single object)', () => {
      const activeConfiguration = {
        digitalWalletQuickBuy: [
          { provider: OpfQuickBuyProviderType.APPLE_PAY, enabled: true },
          config,
        ],
      } as any;

      const result = service.getQuickBuyProviderConfig(
        OpfQuickBuyProviderType.GOOGLE_PAY,
        activeConfiguration
      );
      expect(result).toBe(config);
    });

    it('should return undefined when activeConfiguration is null', () => {
      const result = service.getQuickBuyProviderConfig(
        OpfQuickBuyProviderType.GOOGLE_PAY,
        null as any
      );
      expect(result).toBeUndefined();
    });

    it('should return undefined when activeConfiguration is undefined', () => {
      const result = service.getQuickBuyProviderConfig(
        OpfQuickBuyProviderType.GOOGLE_PAY,
        undefined as any
      );
      expect(result).toBeUndefined();
    });
  });

  describe('getActiveConfigurationForProvider', () => {
    const mockConfig = {
      digitalWalletQuickBuy: [
        { provider: OpfQuickBuyProviderType.APPLE_PAY, enabled: true },
      ],
    } as any;

    it('should return configuration for specific provider (array)', () => {
      const activeConfigurations = [mockConfig];

      const result = service.getActiveConfigurationForProvider(
        OpfQuickBuyProviderType.APPLE_PAY,
        activeConfigurations
      );
      expect(result).toBe(mockConfig);
    });

    it('should return configuration for specific provider (single object)', () => {
      const result = service.getActiveConfigurationForProvider(
        OpfQuickBuyProviderType.APPLE_PAY,
        mockConfig
      );
      expect(result).toBe(mockConfig);
    });

    it('should return undefined when provider is not found (array)', () => {
      const activeConfigurations = [mockConfig];

      const result = service.getActiveConfigurationForProvider(
        OpfQuickBuyProviderType.GOOGLE_PAY,
        activeConfigurations
      );
      expect(result).toBeUndefined();
    });

    it('should return undefined when provider is not found (single object)', () => {
      const result = service.getActiveConfigurationForProvider(
        OpfQuickBuyProviderType.GOOGLE_PAY,
        mockConfig
      );
      expect(result).toBeUndefined();
    });

    it('should return undefined when activeConfiguration is null', () => {
      const result = service.getActiveConfigurationForProvider(
        OpfQuickBuyProviderType.APPLE_PAY,
        null as any
      );
      expect(result).toBeUndefined();
    });

    it('should return undefined when activeConfiguration is undefined', () => {
      const result = service.getActiveConfigurationForProvider(
        OpfQuickBuyProviderType.APPLE_PAY,
        undefined as any
      );
      expect(result).toBeUndefined();
    });

    it('should return undefined when provider is disabled', () => {
      const disabledConfig = {
        digitalWalletQuickBuy: [
          { provider: OpfQuickBuyProviderType.APPLE_PAY, enabled: false },
        ],
      } as any;

      const result = service.getActiveConfigurationForProvider(
        OpfQuickBuyProviderType.APPLE_PAY,
        disabledConfig
      );
      expect(result).toBeUndefined();
    });
  });
});
