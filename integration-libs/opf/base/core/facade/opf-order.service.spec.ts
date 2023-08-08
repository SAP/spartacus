import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { of } from 'rxjs';

import { OpfOrderConnector } from '../connectors';
import { OpfOrderService } from './opf-order.service';
import { Order } from '@spartacus/order/root';

import createSpy = jasmine.createSpy;

const mockOrder = { code: 'mockOrder' };
class MockOpfOrderConnector implements Partial<OpfOrderConnector> {
  placeOpfOrder = createSpy().and.callFake(() => of(mockOrder));
}

describe('OpfOrderServices', () => {
  let service: OpfOrderService;

  let activeCartFacade: jasmine.SpyObj<ActiveCartFacade>;
  let userIdService: jasmine.SpyObj<UserIdService>;

  activeCartFacade = jasmine.createSpyObj('ActiveCartFacade', [
    'takeActiveCartId',
    'isGuestCart',
  ]);
  userIdService = jasmine.createSpyObj('UserIdService', ['takeUserId']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfOrderService,
        {
          provide: OpfOrderConnector,
          useClass: MockOpfOrderConnector,
        },
        {
          provide: UserIdService,
          useValue: userIdService,
        },
        {
          provide: ActiveCartFacade,
          useValue: activeCartFacade,
        },
      ],
    });

    service = TestBed.inject(OpfOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should place order and return results', () => {
    activeCartFacade.takeActiveCartId.and.returnValue(of('current'));
    activeCartFacade.isGuestCart.and.returnValue(of(true));
    userIdService.takeUserId.and.returnValue(of('userId'));

    service
      .placeOpfOrder(true)
      .subscribe((result: Order) => {
        expect(result).toEqual(mockOrder);
        expect(result.code).toEqual('mockOrder');
      })
      .unsubscribe();
  });

  it('should throw error when cart is anonymous', () => {
    activeCartFacade.takeActiveCartId.and.returnValue(of(''));
    activeCartFacade.isGuestCart.and.returnValue(of(true));
    userIdService.takeUserId.and.returnValue(of('userId'));

    service
      .placeOpfOrder(true)
      .subscribe({
        error: (e) => {
          expect(e).toEqual(new Error('Checkout conditions not met'));
        },
      })
      .unsubscribe();
  });

  it('should throw error when user is not logged in', () => {
    activeCartFacade.takeActiveCartId.and.returnValue(of('current'));
    activeCartFacade.isGuestCart.and.returnValue(of(false));
    userIdService.takeUserId.and.returnValue(of(''));

    service
      .placeOpfOrder(true)
      .subscribe({
        error: (e) => {
          expect(e).toEqual(new Error('Checkout conditions not met'));
        },
      })
      .unsubscribe();
  });

  it('should throw error when user is anonymous and cart is not guest', () => {
    activeCartFacade.takeActiveCartId.and.returnValue(of('current'));
    activeCartFacade.isGuestCart.and.returnValue(of(false));
    userIdService.takeUserId.and.returnValue(of('anonymous'));

    service
      .placeOpfOrder(true)
      .subscribe({
        error: (e) => {
          expect(e).toEqual(new Error('Checkout conditions not met'));
        },
      })
      .unsubscribe();
  });
});
