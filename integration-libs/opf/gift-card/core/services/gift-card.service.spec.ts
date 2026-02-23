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
  SAPGiftCardBalanceRequest,
  SAPGiftCardResponse,
} from '@spartacus/opf/gift-card/root';
import { of, throwError } from 'rxjs';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { GiftCardService } from './gift-card.service';
import { OpfGiftCardConnector } from '../connectors/opf-gift-card.connector';
import { TestBed } from '@angular/core/testing';
import { UserIdService } from '@spartacus/core';

describe('GiftCardService', () => {
  let service: GiftCardService;
  let opfBaseFacade: OpfBaseFacade;
  let opfGiftCardConnector: OpfGiftCardConnector;
  let activeCartFacade: ActiveCartFacade;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GiftCardService,
        {
          provide: OpfBaseFacade,
          useValue: {
            getActiveConfigurationsState: jasmine.createSpy(),
          },
        },
        {
          provide: OpfGiftCardConnector,
          useValue: {
            applyGiftCard: jasmine.createSpy(),
            removeGiftCard: jasmine.createSpy(),
          },
        },
        {
          provide: ActiveCartFacade,
          useValue: {
            getActiveCartId: jasmine.createSpy(),
          },
        },
        {
          provide: UserIdService,
          useValue: {
            getUserId: jasmine.createSpy(),
          },
        },
      ],
    });

    service = TestBed.inject(GiftCardService);
    opfBaseFacade = TestBed.inject(OpfBaseFacade);
    opfGiftCardConnector = TestBed.inject(OpfGiftCardConnector);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    userIdService = TestBed.inject(UserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getGiftCardConfiguration', () => {
    it('should return gift card configuration when found', (done) => {
      const mockConfig = {
        data: {
          value: [
            {
              id: 123,
              providerType: OpfPaymentProviderType.GIFT_CARD_PAYMENT,
            },
          ],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as jasmine.Spy
      ).and.returnValue(of(mockConfig));

      service.getGiftCardConfiguration().subscribe((result) => {
        expect(result).toEqual({
          id: 123,
          providerType: OpfPaymentProviderType.GIFT_CARD_PAYMENT,
        });
        done();
      });
    });

    it('should return undefined when gift card configuration is not found', (done) => {
      const mockConfig = {
        data: {
          value: [
            {
              id: 456,
              providerType: OpfPaymentProviderType.GIFT_CARD_PAYMENT,
            },
          ],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as jasmine.Spy
      ).and.returnValue(of(mockConfig));

      service.getGiftCardConfiguration().subscribe((result) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should return undefined when configurations are empty', (done) => {
      const mockConfig = {
        data: {
          value: [],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as jasmine.Spy
      ).and.returnValue(of(mockConfig));

      service.getGiftCardConfiguration().subscribe((result) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should handle null config data gracefully', (done) => {
      const mockConfig = {
        data: null,
      };

      (
        opfBaseFacade.getActiveConfigurationsState as jasmine.Spy
      ).and.returnValue(of(mockConfig));

      service.getGiftCardConfiguration().subscribe(
        (result) => {
          expect(result).toBeUndefined();
          done();
        },
        () => {
          done();
        }
      );
    });
  });

  describe('isGiftCardEnabled', () => {
    it('should return true when gift card configuration exists', (done) => {
      const mockConfig = {
        data: {
          value: [
            {
              id: 123,
              providerType: OpfPaymentProviderType.GIFT_CARD_PAYMENT,
            },
          ],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as jasmine.Spy
      ).and.returnValue(of(mockConfig));

      const emissions: boolean[] = [];
      service.isGiftCardEnabled().subscribe((result) => {
        emissions.push(result);
        if (emissions.length === 2) {
          expect(emissions[0]).toBe(false); // startWith(false)
          expect(emissions[1]).toBe(true); // actual value
          done();
        }
      });
    });

    it('should return false when gift card configuration does not exist', (done) => {
      const mockConfig = {
        data: {
          value: [],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as jasmine.Spy
      ).and.returnValue(of(mockConfig));

      const emissions: boolean[] = [];
      service.isGiftCardEnabled().subscribe((result) => {
        emissions.push(result);
        if (emissions.length === 2) {
          expect(emissions[0]).toBe(false); // startWith(false)
          expect(emissions[1]).toBe(false); // actual value
          done();
        }
      });
    });

    it('should emit false initially with startWith', (done) => {
      const mockConfig = {
        data: {
          value: [
            {
              id: 123,
              providerType: OpfPaymentProviderType.GIFT_CARD_PAYMENT,
            },
          ],
        },
      };

      (
        opfBaseFacade.getActiveConfigurationsState as jasmine.Spy
      ).and.returnValue(of(mockConfig));

      const results: boolean[] = [];
      service.isGiftCardEnabled().subscribe((result) => {
        results.push(result);
        if (results.length === 2) {
          expect(results[0]).toBe(false); // Initial value from startWith
          expect(results[1]).toBe(true); // Actual value
          done();
        }
      });
    });
  });

  describe('applyGiftCard', () => {
    const mockUserId = 'user-123';
    const mockCartId = 'cart-456';
    const mockGiftCardRequest: SAPGiftCardBalanceRequest = {
      number: '1234567890123456',
      securityCode: '0000',
    };

    const mockGiftCardResponse: SAPGiftCardResponse = {
      id: '123',
      maskedNumber: '****567890123456',
      balance: { value: 100.0, formattedValue: '$100.00' },
      appliedAmount: { value: 50.0, formattedValue: '$50.00' },
      remainingBalance: { value: 50.0, formattedValue: '$50.00' },
    };

    it('should apply gift card successfully with valid userId and cartId', (done) => {
      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.applyGiftCard as jasmine.Spy).and.returnValue(
        of(mockGiftCardResponse)
      );

      service.applyGiftCard(mockGiftCardRequest).subscribe((result) => {
        expect(result).toEqual(mockGiftCardResponse);
        expect(
          opfGiftCardConnector.applyGiftCard as jasmine.Spy
        ).toHaveBeenCalledWith(mockUserId, mockCartId, mockGiftCardRequest);
        done();
      });
    });

    it('should not call connector if userId is missing', (done) => {
      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(null));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(mockCartId)
      );

      service.applyGiftCard(mockGiftCardRequest).subscribe(
        () => {
          fail('Should not emit value');
        },
        () => {
          expect(
            opfGiftCardConnector.applyGiftCard as jasmine.Spy
          ).not.toHaveBeenCalled();
          done();
        }
      );
    });

    it('should not call connector if cartId is missing', (done) => {
      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(null)
      );

      service.applyGiftCard(mockGiftCardRequest).subscribe(
        () => {
          fail('Should not emit value');
        },
        () => {
          expect(
            opfGiftCardConnector.applyGiftCard as jasmine.Spy
          ).not.toHaveBeenCalled();
          done();
        }
      );
    });

    it('should handle connector errors', (done) => {
      const error = new Error('Connector error');
      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.applyGiftCard as jasmine.Spy).and.returnValue(
        throwError(() => error)
      );

      service.applyGiftCard(mockGiftCardRequest).subscribe(
        () => {
          fail('Should not emit value');
        },
        (err) => {
          expect(err).toBe(error);
          done();
        }
      );
    });

    it('should take only the first emission and complete', (done) => {
      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.applyGiftCard as jasmine.Spy).and.returnValue(
        of(mockGiftCardResponse)
      );

      let emissionCount = 0;
      service.applyGiftCard(mockGiftCardRequest).subscribe(() => {
        emissionCount++;
        expect(emissionCount).toBe(1);
        done();
      });
    });
  });

  describe('removeGiftCard', () => {
    const mockUserId = 'user-123';
    const mockCartId = 'cart-456';
    const mockGiftCardId = 'gc-789';

    it('should remove gift card successfully with valid userId and cartId', (done) => {
      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.removeGiftCard as jasmine.Spy).and.returnValue(
        of(undefined)
      );

      service.removeGiftCard(mockGiftCardId).subscribe(() => {
        expect(
          opfGiftCardConnector.removeGiftCard as jasmine.Spy
        ).toHaveBeenCalledWith(mockUserId, mockCartId, mockGiftCardId);
        done();
      });
    });

    it('should not call connector if userId is missing', (done) => {
      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(null));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(mockCartId)
      );

      service.removeGiftCard(mockGiftCardId).subscribe(
        () => {
          fail('Should not emit value');
        },
        () => {
          expect(
            opfGiftCardConnector.removeGiftCard as jasmine.Spy
          ).not.toHaveBeenCalled();
          done();
        }
      );
    });

    it('should not call connector if cartId is missing', (done) => {
      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(null)
      );

      service.removeGiftCard(mockGiftCardId).subscribe(
        () => {
          fail('Should not emit value');
        },
        () => {
          expect(
            opfGiftCardConnector.removeGiftCard as jasmine.Spy
          ).not.toHaveBeenCalled();
          done();
        }
      );
    });

    it('should handle connector errors', (done) => {
      const error = new Error('Remove connector error');
      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.removeGiftCard as jasmine.Spy).and.returnValue(
        throwError(() => error)
      );

      service.removeGiftCard(mockGiftCardId).subscribe(
        () => {
          fail('Should not emit value');
        },
        (err) => {
          expect(err).toBe(error);
          done();
        }
      );
    });

    it('should take only the first emission and complete', (done) => {
      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.removeGiftCard as jasmine.Spy).and.returnValue(
        of(undefined)
      );

      let emissionCount = 0;
      service.removeGiftCard(mockGiftCardId).subscribe(() => {
        emissionCount++;
        expect(emissionCount).toBe(1);
        done();
      });
    });

    it('should pass correct parameters to removeGiftCard connector', (done) => {
      const customUserId = 'custom-user';
      const customCartId = 'custom-cart';
      const customGiftCardId = 'custom-gc';

      (userIdService.getUserId as jasmine.Spy).and.returnValue(
        of(customUserId)
      );
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(customCartId)
      );
      (opfGiftCardConnector.removeGiftCard as jasmine.Spy).and.returnValue(
        of(undefined)
      );

      service.removeGiftCard(customGiftCardId).subscribe(() => {
        expect(
          opfGiftCardConnector.removeGiftCard as jasmine.Spy
        ).toHaveBeenCalledWith(customUserId, customCartId, customGiftCardId);
        done();
      });
    });
  });

  describe('Integration Tests', () => {
    it('should combine user and cart observables correctly', (done) => {
      const mockUserId = 'user-123';
      const mockCartId = 'cart-456';
      const mockRequest: SAPGiftCardBalanceRequest = {
        number: '1234567890123456',
        securityCode: '0000',
      };
      const mockResponse: SAPGiftCardResponse = {
        id: '123',
        maskedNumber: '****567890123456',
        balance: { value: 100.0, formattedValue: '$100.00' },
        appliedAmount: { value: 100.0, formattedValue: '$100.00' },
        remainingBalance: { value: 0.0, formattedValue: '$0.00' },
      };

      (userIdService.getUserId as jasmine.Spy).and.returnValue(of(mockUserId));
      (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
        of(mockCartId)
      );
      (opfGiftCardConnector.applyGiftCard as jasmine.Spy).and.returnValue(
        of(mockResponse)
      );

      service.applyGiftCard(mockRequest).subscribe((result) => {
        expect(result.maskedNumber).toEqual(mockResponse.maskedNumber);
        expect(result.balance).toEqual(mockResponse.balance);
        done();
      });
    });
  });

  describe('Edge Cases and Additional Coverage', () => {
    describe('getGiftCardConfiguration - Multiple configurations', () => {
      it('should return first matching gift card configuration when multiple exist', (done) => {
        const mockConfig = {
          data: {
            value: [
              {
                id: 100,
                providerType: OpfPaymentProviderType.GIFT_CARD_PAYMENT,
              },
              {
                id: 123,
                providerType: OpfPaymentProviderType.GIFT_CARD_PAYMENT,
              },
              {
                id: 124,
                providerType: OpfPaymentProviderType.GIFT_CARD_PAYMENT,
              },
            ],
          },
        };

        (
          opfBaseFacade.getActiveConfigurationsState as jasmine.Spy
        ).and.returnValue(of(mockConfig));

        service.getGiftCardConfiguration().subscribe((result) => {
          expect(result?.id).toBe(123);
          done();
        });
      });
    });

    describe('applyGiftCard - Request variations', () => {
      const mockUserId = 'user-123';
      const mockCartId = 'cart-456';

      it('should handle request with all properties', (done) => {
        const mockRequest: SAPGiftCardBalanceRequest = {
          number: '1234567890123456',
          securityCode: '0000',
        };
        const mockResponse: SAPGiftCardResponse = {
          id: '123',
          maskedNumber: '****567890123456',
          balance: { value: 100.0, formattedValue: '$100.00' },
          appliedAmount: { value: 50.0, formattedValue: '$50.00' },
          remainingBalance: { value: 50.0, formattedValue: '$50.00' },
        };

        (userIdService.getUserId as jasmine.Spy).and.returnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.applyGiftCard as jasmine.Spy).and.returnValue(
          of(mockResponse)
        );

        service.applyGiftCard(mockRequest).subscribe((result) => {
          expect(result.maskedNumber).toBeDefined();
          expect(result.balance).toBeDefined();
          expect(result.appliedAmount).toBeDefined();
          expect(result.remainingBalance).toBeDefined();
          done();
        });
      });

      it('should handle response with zero applied amount', (done) => {
        const mockRequest: SAPGiftCardBalanceRequest = {
          number: '1234567890123456',
          securityCode: '0000',
        };
        const mockResponse: SAPGiftCardResponse = {
          id: '123',
          maskedNumber: '****567890123456',
          balance: { value: 100.0, formattedValue: '$100.00' },
          appliedAmount: { value: 0.0, formattedValue: '$0.00' },
          remainingBalance: { value: 100.0, formattedValue: '$100.00' },
        };

        (userIdService.getUserId as jasmine.Spy).and.returnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.applyGiftCard as jasmine.Spy).and.returnValue(
          of(mockResponse)
        );

        service.applyGiftCard(mockRequest).subscribe((result) => {
          expect(result.appliedAmount.value).toBe(0.0);
          done();
        });
      });

      it('should handle response with remaining balance equal to zero', (done) => {
        const mockRequest: SAPGiftCardBalanceRequest = {
          number: '1234567890123456',
          securityCode: '0000',
        };
        const mockResponse: SAPGiftCardResponse = {
          id: '123',
          maskedNumber: '****567890123456',
          balance: { value: 100.0, formattedValue: '$100.00' },
          appliedAmount: { value: 100.0, formattedValue: '$100.00' },
          remainingBalance: { value: 0.0, formattedValue: '$0.00' },
        };

        (userIdService.getUserId as jasmine.Spy).and.returnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.applyGiftCard as jasmine.Spy).and.returnValue(
          of(mockResponse)
        );

        service.applyGiftCard(mockRequest).subscribe((result) => {
          expect(result.remainingBalance.value).toBe(0.0);
          done();
        });
      });
    });

    describe('removeGiftCard - Edge cases', () => {
      const mockUserId = 'user-123';
      const mockCartId = 'cart-456';

      it('should handle empty string giftCardId', (done) => {
        (userIdService.getUserId as jasmine.Spy).and.returnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.removeGiftCard as jasmine.Spy).and.returnValue(
          of(undefined)
        );

        service.removeGiftCard('').subscribe(() => {
          expect(
            opfGiftCardConnector.removeGiftCard as jasmine.Spy
          ).toHaveBeenCalledWith(mockUserId, mockCartId, '');
          done();
        });
      });

      it('should handle special characters in giftCardId', (done) => {
        const specialGiftCardId = 'gc-@#$%^&*()';

        (userIdService.getUserId as jasmine.Spy).and.returnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.removeGiftCard as jasmine.Spy).and.returnValue(
          of(undefined)
        );

        service.removeGiftCard(specialGiftCardId).subscribe(() => {
          expect(
            opfGiftCardConnector.removeGiftCard as jasmine.Spy
          ).toHaveBeenCalledWith(mockUserId, mockCartId, specialGiftCardId);
          done();
        });
      });

      it('should handle both userId and cartId as empty strings', (done) => {
        (userIdService.getUserId as jasmine.Spy).and.returnValue(of(''));
        (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
          of('')
        );

        service.removeGiftCard('gc-123').subscribe(
          () => {
            fail('Should not emit value');
          },
          () => {
            done();
          }
        );
      });
    });

    describe('Concurrent operations', () => {
      it('should handle multiple applyGiftCard calls', (done) => {
        const mockUserId = 'user-123';
        const mockCartId = 'cart-456';
        const mockRequest1: SAPGiftCardBalanceRequest = {
          number: '1111111111111111',
          securityCode: '0000',
        };
        const mockRequest2: SAPGiftCardBalanceRequest = {
          number: '2222222222222222',
          securityCode: '0000',
        };
        const mockResponse1: SAPGiftCardResponse = {
          id: '123',
          maskedNumber: '****1111111111',
          balance: { value: 100.0, formattedValue: '$100.00' },
          appliedAmount: { value: 50.0, formattedValue: '$50.00' },
          remainingBalance: { value: 50.0, formattedValue: '$50.00' },
        };
        const mockResponse2: SAPGiftCardResponse = {
          id: '124',
          maskedNumber: '****2222222222',
          balance: { value: 200.0, formattedValue: '$200.00' },
          appliedAmount: { value: 100.0, formattedValue: '$100.00' },
          remainingBalance: { value: 100.0, formattedValue: '$100.00' },
        };

        (userIdService.getUserId as jasmine.Spy).and.returnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.applyGiftCard as jasmine.Spy).and.callFake(
          (request: SAPGiftCardBalanceRequest) => {
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
          if (completedCount === 2) {
            done();
          }
        });
        service.applyGiftCard(mockRequest2).subscribe(() => {
          completedCount++;
          if (completedCount === 2) {
            done();
          }
        });
      });
    });

    describe('Observable behavior', () => {
      it('should not call connector when filter excludes both values', (done) => {
        (userIdService.getUserId as jasmine.Spy).and.returnValue(of(null));
        (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
          of(null)
        );

        service.removeGiftCard('gc-123').subscribe(
          () => fail('Should not emit'),
          () => {
            expect(
              opfGiftCardConnector.removeGiftCard as jasmine.Spy
            ).not.toHaveBeenCalled();
            done();
          }
        );
      });

      it('should complete after first emission with take(1)', (done) => {
        const mockUserId = 'user-123';
        const mockCartId = 'cart-456';

        (userIdService.getUserId as jasmine.Spy).and.returnValue(
          of(mockUserId)
        );
        (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(
          of(mockCartId)
        );
        (opfGiftCardConnector.removeGiftCard as jasmine.Spy).and.returnValue(
          of(undefined)
        );

        let emissionCount = 0;
        service.removeGiftCard('gc-123').subscribe(() => {
          emissionCount++;
          setTimeout(() => {
            expect(emissionCount).toBe(1);
            done();
          }, 100);
        });
      });
    });
  });
});
