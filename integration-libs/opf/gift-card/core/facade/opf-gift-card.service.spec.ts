/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfBaseFacade,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import {
  OpfGiftCardBalanceRequest,
  OpfGiftCardResponse,
} from '@spartacus/opf/gift-card/root';
import { of, throwError } from 'rxjs';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfGiftCardConnector } from '../connectors/opf-gift-card.connector';
import { OpfGiftCardService } from './opf-gift-card.service';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { UserIdService } from '@spartacus/core';

describe('OpfGiftCardService', () => {
  let service: OpfGiftCardService;
  let opfBaseFacade: OpfBaseFacade;
  let opfGiftCardConnector: OpfGiftCardConnector;
  let activeCartFacade: ActiveCartFacade;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfGiftCardService,
        {
          provide: OpfBaseFacade,
          useValue: {
            getActiveConfigurationsState: vi.fn(),
          },
        },
        {
          provide: OpfGiftCardConnector,
          useValue: {
            applyGiftCard: vi.fn(),
            removeGiftCard: vi.fn(),
          },
        },
        {
          provide: ActiveCartFacade,
          useValue: {
            getActiveCartId: vi.fn(),
          },
        },
        {
          provide: UserIdService,
          useValue: {
            getUserId: vi.fn(),
          },
        },
      ],
    });

    service = TestBed.inject(OpfGiftCardService);
    opfBaseFacade = TestBed.inject(OpfBaseFacade);
    opfGiftCardConnector = TestBed.inject(OpfGiftCardConnector);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    userIdService = TestBed.inject(UserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should inject all dependencies via inject()', () => {
    expect((service as any).opfBaseFacade).toBeTruthy();
    expect((service as any).opfGiftCardConnector).toBeTruthy();
    expect((service as any).activeCartFacade).toBeTruthy();
    expect((service as any).userIdService).toBeTruthy();
  });
  describe('getGiftCardConfiguration', () => {
    it('should return gift card configuration when found', async () => {
      const mockConfig = {
        data: {
          value: [
            {
              id: 123,
              providerType: OpfPaymentProviderType.STORED_VALUE_PAYMENT,
            },
          ],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as any
      ).mockReturnValue(of(mockConfig));

      service.getGiftCardConfiguration().subscribe((result) => {
        expect(result).toEqual({
          id: 123,
          providerType: OpfPaymentProviderType.STORED_VALUE_PAYMENT,
        });      });
    });

    it('should return undefined when gift card configuration is not found', async () => {
      const mockConfig = {
        data: {
          value: [
            {
              id: 456,
              providerType: 'SOME_OTHER_PAYMENT',
            },
          ],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as any
      ).mockReturnValue(of(mockConfig));

      service.getGiftCardConfiguration().subscribe((result) => {
        expect(result).toBeUndefined();      });
    });

    it('should return undefined when configurations are empty', async () => {
      const mockConfig = {
        data: {
          value: [],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as any
      ).mockReturnValue(of(mockConfig));

      service.getGiftCardConfiguration().subscribe((result) => {
        expect(result).toBeUndefined();      });
    });

    it('should handle null config data gracefully', async () => {
      const mockConfig = {
        data: null,
      };

      (
        opfBaseFacade.getActiveConfigurationsState as any
      ).mockReturnValue(of(mockConfig));

      service.getGiftCardConfiguration().subscribe(
        (result) => {
          expect(result).toBeUndefined();        },
        () => {        }
      );
    });
  });

  describe('isGiftCardEnabled', () => {
    it('should return true when gift card configuration exists', async () => {
      const mockConfig = {
        data: {
          value: [
            {
              id: 123,
              providerType: OpfPaymentProviderType.STORED_VALUE_PAYMENT,
            },
          ],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as any
      ).mockReturnValue(of(mockConfig));

      const emissions: boolean[] = [];
      service.isGiftCardEnabled().subscribe((result) => {
        emissions.push(result);
        if (emissions.length === 2) {
          expect(emissions[0]).toBe(false); // startWith(false)
          expect(emissions[1]).toBe(true); // actual value
        }
      });
    });

    it('should return false when gift card configuration does not exist', async () => {
      const mockConfig = {
        data: {
          value: [],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as any
      ).mockReturnValue(of(mockConfig));

      const emissions: boolean[] = [];
      service.isGiftCardEnabled().subscribe((result) => {
        emissions.push(result);
        if (emissions.length === 2) {
          expect(emissions[0]).toBe(false); // startWith(false)
          expect(emissions[1]).toBe(false); // actual value
        }
      });
    });

    it('should emit false initially with startWith', async () => {
      const mockConfig = {
        data: {
          value: [
            {
              id: 123,
              providerType: OpfPaymentProviderType.STORED_VALUE_PAYMENT,
            },
          ],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as any
      ).mockReturnValue(of(mockConfig));

      const results: boolean[] = [];
      service.isGiftCardEnabled().subscribe((result) => {
        results.push(result);
        if (results.length === 2) {
          expect(results[0]).toBe(false); // Initial value from startWith
          expect(results[1]).toBe(true); // Actual value
        }
      });
    });
  });

  describe('applyGiftCard', () => {
    const mockUserId = 'user-123';
    const mockCartId = 'cart-456';
    const mockGiftCardRequest: OpfGiftCardBalanceRequest = {
      number: '1234567890123456',
      securityCode: '0000',
    };

    const mockGiftCardResponse: OpfGiftCardResponse = {
      id: '123',
      maskedNumber: '****567890123456',
      balance: { value: 100.0, formattedValue: '$100.00' },
      appliedAmount: { value: 50.0, formattedValue: '$50.00' },
      remainingBalance: { value: 50.0, formattedValue: '$50.00' },
    };

    it('should apply gift card successfully with valid userId and cartId', async () => {
      (userIdService.getUserId as any).mockReturnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.applyGiftCard as any).mockReturnValue(
        of(mockGiftCardResponse)
      );

      service.applyGiftCard(mockGiftCardRequest).subscribe((result) => {
        expect(result).toEqual(mockGiftCardResponse);
        expect(
          opfGiftCardConnector.applyGiftCard as any
        ).toHaveBeenCalledWith(mockUserId, mockCartId, mockGiftCardRequest);      });
    });

    it('should not call connector if userId is missing', async () => {
      (userIdService.getUserId as any).mockReturnValue(of(null));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(mockCartId)
      );

      service.applyGiftCard(mockGiftCardRequest).subscribe({
        next: () => fail('Should not emit'),
        error: () => fail('Should not error'),
        complete: () => {
          expect(
            opfGiftCardConnector.applyGiftCard as any
          ).not.toHaveBeenCalled();        },
      });
    });

    it('should not call connector if cartId is missing', async () => {
      (userIdService.getUserId as any).mockReturnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(null)
      );

      service.applyGiftCard(mockGiftCardRequest).subscribe({
        next: () => fail('Should not emit value'),
        error: () => fail('Should not error'),
        complete: () => {
          expect(
            opfGiftCardConnector.applyGiftCard as any
          ).not.toHaveBeenCalled();        },
      });
    });

    it('should handle connector errors', async () => {
      const error = new Error('Connector error');
      (userIdService.getUserId as any).mockReturnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.applyGiftCard as any).mockReturnValue(
        throwError(() => error)
      );

      service.applyGiftCard(mockGiftCardRequest).subscribe(
        () => {
          fail('Should not emit value');
        },
        (err) => {
          expect(err).toBe(error);        }
      );
    });

    it('should take only the first emission and complete', async () => {
      (userIdService.getUserId as any).mockReturnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.applyGiftCard as any).mockReturnValue(
        of(mockGiftCardResponse)
      );

      let emissionCount = 0;
      service.applyGiftCard(mockGiftCardRequest).subscribe(() => {
        emissionCount++;
        expect(emissionCount).toBe(1);      });
    });
  });

  describe('removeGiftCard', () => {
    const mockUserId = 'user-123';
    const mockCartId = 'cart-456';
    const mockGiftCardId = 'gc-789';

    it('should remove gift card successfully with valid userId and cartId', async () => {
      (userIdService.getUserId as any).mockReturnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.removeGiftCard as any).mockReturnValue(
        of(undefined)
      );

      service.removeGiftCard(mockGiftCardId).subscribe(() => {
        expect(
          opfGiftCardConnector.removeGiftCard as any
        ).toHaveBeenCalledWith(mockUserId, mockCartId, mockGiftCardId);      });
    });

    it('should not call connector if userId is missing', async () => {
      (userIdService.getUserId as any).mockReturnValue(of(null));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(mockCartId)
      );

      service.removeGiftCard(mockGiftCardId).subscribe({
        next: () => fail('Should not emit value'),
        error: () => fail('Should not error'),
        complete: () => {
          expect(
            opfGiftCardConnector.removeGiftCard as any
          ).not.toHaveBeenCalled();        },
      });
    });

    it('should not call connector if cartId is missing', async () => {
      (userIdService.getUserId as any).mockReturnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(null)
      );

      service.removeGiftCard(mockGiftCardId).subscribe({
        next: () => fail('Should not emit value'),
        error: () => fail('Should not error'),
        complete: () => {
          expect(
            opfGiftCardConnector.removeGiftCard as any
          ).not.toHaveBeenCalled();        },
      });
    });

    it('should handle connector errors', async () => {
      const error = new Error('Remove connector error');
      (userIdService.getUserId as any).mockReturnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.removeGiftCard as any).mockReturnValue(
        throwError(() => error)
      );

      service.removeGiftCard(mockGiftCardId).subscribe(
        () => {
          fail('Should not emit value');
        },
        (err) => {
          expect(err).toBe(error);        }
      );
    });

    it('should take only the first emission and complete', async () => {
      (userIdService.getUserId as any).mockReturnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.removeGiftCard as any).mockReturnValue(
        of(undefined)
      );

      let emissionCount = 0;
      service.removeGiftCard(mockGiftCardId).subscribe(() => {
        emissionCount++;
        expect(emissionCount).toBe(1);      });
    });

    it('should pass correct parameters to removeGiftCard connector', async () => {
      const customUserId = 'custom-user';
      const customCartId = 'custom-cart';
      const customGiftCardId = 'custom-gc';

      (userIdService.getUserId as any).mockReturnValue(
        of(customUserId)
      );
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(customCartId)
      );
      (opfGiftCardConnector.removeGiftCard as any).mockReturnValue(
        of(undefined)
      );

      service.removeGiftCard(customGiftCardId).subscribe(() => {
        expect(
          opfGiftCardConnector.removeGiftCard as any
        ).toHaveBeenCalledWith(customUserId, customCartId, customGiftCardId);      });
    });
  });

  describe('isGiftCardCoveredTotalAmount', () => {
    it('should return true when giftCardsCoverFullAmount is true', async () => {
      const mockCart = {
        opfGiftCardSummary: {
          giftCardsCoverFullAmount: true,
          totalBalance: { value: 100, formattedValue: '$100.00' },
          totalAppliedAmount: { value: 100, formattedValue: '$100.00' },
          totalRemainingBalance: { value: 0, formattedValue: '$0.00' },
        },
      };

      service
        .isGiftCardCoveredTotalAmount(of(mockCart as any))
        .subscribe((result) => {
          expect(result).toBe(true);        });
    });

    it('should return false when giftCardsCoverFullAmount is false', async () => {
      const mockCart = {
        opfGiftCardSummary: {
          giftCardsCoverFullAmount: false,
          totalBalance: { value: 100, formattedValue: '$100.00' },
          totalAppliedAmount: { value: 50, formattedValue: '$50.00' },
          totalRemainingBalance: { value: 50, formattedValue: '$50.00' },
        },
      };

      service
        .isGiftCardCoveredTotalAmount(of(mockCart as any))
        .subscribe((result) => {
          expect(result).toBe(false);        });
    });

    it('should return false when  opfGiftCardSummary is null', async () => {
      const mockCart = {
        opfGiftCardSummary: null,
      };

      service
        .isGiftCardCoveredTotalAmount(of(mockCart as any))
        .subscribe((result) => {
          expect(result).toBe(false);        });
    });

    it('should return false when  opfGiftCardSummary is undefined', async () => {
      const mockCart = {
        opfGiftCardSummary: undefined,
      };

      service
        .isGiftCardCoveredTotalAmount(of(mockCart as any))
        .subscribe((result) => {
          expect(result).toBe(false);        });
    });

    it('should return false when cart is null', async () => {
      service
        .isGiftCardCoveredTotalAmount(of(null as any))
        .subscribe((result) => {
          expect(result).toBe(false);        });
    });

    it('should return false when giftCardsCoverFullAmount is undefined', async () => {
      const mockCart = {
        opfGiftCardSummary: {
          giftCardsCoverFullAmount: undefined,
          totalBalance: { value: 100, formattedValue: '$100.00' },
          totalAppliedAmount: { value: 50, formattedValue: '$50.00' },
          totalRemainingBalance: { value: 50, formattedValue: '$50.00' },
        },
      };

      service
        .isGiftCardCoveredTotalAmount(of(mockCart as any))
        .subscribe((result) => {
          expect(result).toBe(false);        });
    });

    it('should handle observable emissions correctly', async () => {
      const mockCart1 = {
        opfGiftCardSummary: {
          giftCardsCoverFullAmount: true,
          totalBalance: { value: 100, formattedValue: '$100.00' },
          totalAppliedAmount: { value: 100, formattedValue: '$100.00' },
          totalRemainingBalance: { value: 0, formattedValue: '$0.00' },
        },
      };
      const mockCart2 = {
        opfGiftCardSummary: {
          giftCardsCoverFullAmount: false,
          totalBalance: { value: 100, formattedValue: '$100.00' },
          totalAppliedAmount: { value: 50, formattedValue: '$50.00' },
          totalRemainingBalance: { value: 50, formattedValue: '$50.00' },
        },
      };

      const results: boolean[] = [];
      service
        .isGiftCardCoveredTotalAmount(of(mockCart1 as any, mockCart2 as any))
        .subscribe((result) => {
          results.push(result);
          if (results.length === 2) {
            expect(results[0]).toBe(true);
            expect(results[1]).toBe(false);          }
        });
    });
  });

  describe('Integration Tests', () => {
    it('should combine user and cart observables correctly', async () => {
      const mockUserId = 'user-123';
      const mockCartId = 'cart-456';
      const mockRequest: OpfGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '0000',
      };
      const mockResponse: OpfGiftCardResponse = {
        id: '123',
        maskedNumber: '****567890123456',
        balance: { value: 100.0, formattedValue: '$100.00' },
        appliedAmount: { value: 100.0, formattedValue: '$100.00' },
        remainingBalance: { value: 0.0, formattedValue: '$0.00' },
      };

      (userIdService.getUserId as any).mockReturnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as any).mockReturnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.applyGiftCard as any).mockReturnValue(
        of(mockResponse)
      );

      service.applyGiftCard(mockRequest).subscribe((result) => {
        expect(result.maskedNumber).toEqual(mockResponse.maskedNumber);
        expect(result.balance).toEqual(mockResponse.balance);      });
    });
  });

  describe('Edge Cases and Additional Coverage', () => {
    describe('getGiftCardConfiguration - Multiple configurations', () => {
      it('should return first matching gift card configuration when multiple exist', async () => {
        const mockConfig = {
          data: {
            value: [
              {
                id: 100,
                providerType: OpfPaymentProviderType.STORED_VALUE_PAYMENT,
              },
              {
                id: 123,
                providerType: OpfPaymentProviderType.STORED_VALUE_PAYMENT,
              },
              {
                id: 124,
                providerType: OpfPaymentProviderType.STORED_VALUE_PAYMENT,
              },
            ],
          },
        };

        (
          opfBaseFacade.getActiveConfigurationsState as any
        ).mockReturnValue(of(mockConfig));

        service.getGiftCardConfiguration().subscribe((result) => {
          expect(result?.id).toBe(100);        });
      });
    });

    describe('applyGiftCard - Request variations', () => {
      const mockUserId = 'user-123';
      const mockCartId = 'cart-456';

      it('should handle request with all properties', async () => {
        const mockRequest: OpfGiftCardBalanceRequest = {
          number: '1234567890123456',
          securityCode: '0000',
        };
        const mockResponse: OpfGiftCardResponse = {
          id: '123',
          maskedNumber: '****567890123456',
          balance: { value: 100.0, formattedValue: '$100.00' },
          appliedAmount: { value: 50.0, formattedValue: '$50.00' },
          remainingBalance: { value: 50.0, formattedValue: '$50.00' },
        };

        (userIdService.getUserId as any).mockReturnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as any).mockReturnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.applyGiftCard as any).mockReturnValue(
          of(mockResponse)
        );

        service.applyGiftCard(mockRequest).subscribe((result) => {
          expect(result.maskedNumber).toBeDefined();
          expect(result.balance).toBeDefined();
          expect(result.appliedAmount).toBeDefined();
          expect(result.remainingBalance).toBeDefined();        });
      });

      it('should handle response with zero applied amount', async () => {
        const mockRequest: OpfGiftCardBalanceRequest = {
          number: '1234567890123456',
          securityCode: '0000',
        };
        const mockResponse: OpfGiftCardResponse = {
          id: '123',
          maskedNumber: '****567890123456',
          balance: { value: 100.0, formattedValue: '$100.00' },
          appliedAmount: { value: 0.0, formattedValue: '$0.00' },
          remainingBalance: { value: 100.0, formattedValue: '$100.00' },
        };

        (userIdService.getUserId as any).mockReturnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as any).mockReturnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.applyGiftCard as any).mockReturnValue(
          of(mockResponse)
        );

        service.applyGiftCard(mockRequest).subscribe((result) => {
          expect(result.appliedAmount.value).toBe(0.0);        });
      });

      it('should handle response with remaining balance equal to zero', async () => {
        const mockRequest: OpfGiftCardBalanceRequest = {
          number: '1234567890123456',
          securityCode: '0000',
        };
        const mockResponse: OpfGiftCardResponse = {
          id: '123',
          maskedNumber: '****567890123456',
          balance: { value: 100.0, formattedValue: '$100.00' },
          appliedAmount: { value: 100.0, formattedValue: '$100.00' },
          remainingBalance: { value: 0.0, formattedValue: '$0.00' },
        };

        (userIdService.getUserId as any).mockReturnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as any).mockReturnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.applyGiftCard as any).mockReturnValue(
          of(mockResponse)
        );

        service.applyGiftCard(mockRequest).subscribe((result) => {
          expect(result.remainingBalance.value).toBe(0.0);        });
      });
    });

    describe('removeGiftCard - Edge cases', () => {
      const mockUserId = 'user-123';
      const mockCartId = 'cart-456';

      it('should handle empty string giftCardId', async () => {
        (userIdService.getUserId as any).mockReturnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as any).mockReturnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.removeGiftCard as any).mockReturnValue(
          of(undefined)
        );

        service.removeGiftCard('').subscribe(() => {
          expect(
            opfGiftCardConnector.removeGiftCard as any
          ).toHaveBeenCalledWith(mockUserId, mockCartId, '');        });
      });

      it('should handle special characters in giftCardId', async () => {
        const specialGiftCardId = 'gc-@#$%^&*()';

        (userIdService.getUserId as any).mockReturnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as any).mockReturnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.removeGiftCard as any).mockReturnValue(
          of(undefined)
        );

        service.removeGiftCard(specialGiftCardId).subscribe(() => {
          expect(
            opfGiftCardConnector.removeGiftCard as any
          ).toHaveBeenCalledWith(mockUserId, mockCartId, specialGiftCardId);        });
      });

      it('should handle both userId and cartId as empty strings', async () => {
        (userIdService.getUserId as any).mockReturnValue(of(''));
        (activeCartFacade.getActiveCartId as any).mockReturnValue(
          of('')
        );

        service.removeGiftCard('gc-123').subscribe({
          next: () => fail('Should not emit value'),
          error: () => fail('Should not error'),
          complete: () => {          },
        });
      });
    });

    describe('Concurrent operations', () => {
      it('should handle multiple applyGiftCard calls', async () => {
        const mockUserId = 'user-123';
        const mockCartId = 'cart-456';
        const mockRequest1: OpfGiftCardBalanceRequest = {
          number: '1111111111111111',
          securityCode: '0000',
        };
        const mockRequest2: OpfGiftCardBalanceRequest = {
          number: '2222222222222222',
          securityCode: '0000',
        };
        const mockResponse1: OpfGiftCardResponse = {
          id: '123',
          maskedNumber: '****1111111111',
          balance: { value: 100.0, formattedValue: '$100.00' },
          appliedAmount: { value: 50.0, formattedValue: '$50.00' },
          remainingBalance: { value: 50.0, formattedValue: '$50.00' },
        };
        const mockResponse2: OpfGiftCardResponse = {
          id: '124',
          maskedNumber: '****2222222222',
          balance: { value: 200.0, formattedValue: '$200.00' },
          appliedAmount: { value: 100.0, formattedValue: '$100.00' },
          remainingBalance: { value: 100.0, formattedValue: '$100.00' },
        };

        (userIdService.getUserId as any).mockReturnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as any).mockReturnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.applyGiftCard as any).mockImplementation(
          (request: OpfGiftCardBalanceRequest) => {
            if (request === mockRequest1) {
              return of(mockResponse1);
            }
            if (request === mockRequest2) {
              return of(mockResponse2);
            }
            return of(mockResponse1);
          }
        );

        let completedCount = 0;
        service.applyGiftCard(mockRequest1).subscribe(() => {
          completedCount++;
          if (completedCount === 2) {          }
        });
        service.applyGiftCard(mockRequest2).subscribe(() => {
          completedCount++;
          if (completedCount === 2) {          }
        });
      });
    });

    describe('Observable behavior', () => {
      it('should not call connector when filter excludes both values', async () => {
        (userIdService.getUserId as any).mockReturnValue(of(null));
        (activeCartFacade.getActiveCartId as any).mockReturnValue(
          of(null)
        );

        service.removeGiftCard('gc-123').subscribe({
          next: () => fail('Should not emit'),
          error: () => fail('Should not error'),
          complete: () => {
            expect(
              opfGiftCardConnector.removeGiftCard as any
            ).not.toHaveBeenCalled();          },
        });
      });

      it('should complete after first emission with take(1)', async () => {
        const mockUserId = 'user-123';
        const mockCartId = 'cart-456';

        (userIdService.getUserId as any).mockReturnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as any).mockReturnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.removeGiftCard as any).mockReturnValue(
          of(undefined)
        );

        let emissionCount = 0;
        service.removeGiftCard('gc-123').subscribe(() => {
          emissionCount++;
        });
        expect(emissionCount).toBe(1);
      });
    });
  });
});
