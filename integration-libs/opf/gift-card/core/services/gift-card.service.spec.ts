import { OpfBaseFacade, OpfPaymentProviderType } from '@spartacus/opf/base/root';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { GiftCardService } from './gift-card.service';
import { OpfGiftCardConnector } from '@spartacus/opf/gift-card/core';
import { TestBed } from '@angular/core/testing';
import { UserIdService } from '@spartacus/core';
import { of } from 'rxjs';

describe('GiftCardService', () => {
  let service: GiftCardService;
  let opfBaseFacade: OpfBaseFacade;
  let opfGiftCardConnector: OpfGiftCardConnector;
  let activeCartFacade: ActiveCartFacade;
  let userIdService: UserIdService;

  beforeEach(() => {
    const mockOpfBaseFacade = {
      getActiveConfigurationsState: jest.fn(),
    };
    const mockOpfGiftCardConnector = {
      applyGiftCard: jest.fn(),
      removeGiftCard: jest.fn(),
    };
    const mockActiveCartFacade = {
      getActiveCartId: jest.fn().mockReturnValue(of('test-cart-id')),
    };
    const mockUserIdService = {
      getUserId: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GiftCardService,
        { provide: OpfBaseFacade, useValue: mockOpfBaseFacade },
        { provide: OpfGiftCardConnector, useValue: mockOpfGiftCardConnector },
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: UserIdService, useValue: mockUserIdService },
      ],
    });

    service = TestBed.inject(GiftCardService);
    opfBaseFacade = TestBed.inject(OpfBaseFacade);
    opfGiftCardConnector = TestBed.inject(OpfGiftCardConnector);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    userIdService = TestBed.inject(UserIdService);
  });

  describe('getGiftCardConfiguration', () => {
    it('should return the gift card configuration when present', (done) => {
      const mockState = {
        loading: false,
        data: {
          value: [
            { providerType: 'OTHER' },
            { providerType: OpfPaymentProviderType.GIFT_CARD_PAYMENT, id: 'gc-config' },
          ],
        },
      };
      (opfBaseFacade.getActiveConfigurationsState as jest.Mock).mockReturnValue(of(mockState));

      service.getGiftCardConfiguration().subscribe((result) => {
        expect(result?.id).toBe('gc-config');
        done();
      });
    });

    it('should filter out configurations while loading', () => {
      (opfBaseFacade.getActiveConfigurationsState as jest.Mock).mockReturnValue(of({ loading: true }));
      let result;
      service.getGiftCardConfiguration().subscribe((res) => (result = res));
      expect(result).toBeUndefined();
    });
  });

  describe('applyGiftCard', () => {
    it('should call connector with userId and cartId', (done) => {
      const request = { configurationId: '1', number: '123', securityCode: '000' };
      (userIdService.getUserId as jest.Mock).mockReturnValue(of('user123'));
      (activeCartFacade.getActiveCartId as jest.Mock).mockReturnValue(of('cart123'));
      (opfGiftCardConnector.applyGiftCard as jest.Mock).mockReturnValue(of({ balance: 50 }));

      service.applyGiftCard(request).subscribe((response) => {
        expect(opfGiftCardConnector.applyGiftCard).toHaveBeenCalledWith('user123', 'cart123', request);
        expect(response.balance).toBe(50);
        done();
      });
    });
  });

  describe('removeGiftCard', () => {
    it('should call connector to remove the card', (done) => {
      (userIdService.getUserId as jest.Mock).mockReturnValue(of('user123'));
      (activeCartFacade.getActiveCartId as jest.Mock).mockReturnValue(of('cart123'));
      (opfGiftCardConnector.removeGiftCard as jest.Mock).mockReturnValue(of(undefined));

      service.removeGiftCard('gc-id').subscribe(() => {
        expect(opfGiftCardConnector.removeGiftCard).toHaveBeenCalledWith('user123', 'cart123', 'gc-id');
        done();
      });
    });
  });
});
