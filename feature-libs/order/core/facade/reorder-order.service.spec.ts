import { inject, TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  CartModificationList,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { config, of } from 'rxjs';
import { ReorderOrderConnector } from '../connectors/reorder-order.connector';
import { ReorderOrderService } from './reorder-order.service';

import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockOrderId = 'orderID';
const mockCartId = 'test-cart';
const mockCartModificationList: CartModificationList = {
  cartModifications: [],
};

class MockReorderOrderOrderConnector implements Partial<ReorderOrderConnector> {
  reorder = createSpy().and.returnValue(of(mockCartModificationList));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(OCC_USER_ID_CURRENT));
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActiveCartId = createSpy().and.returnValue(of(mockCartId));
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  deleteCart = createSpy();
}

describe(`ReorderOrderService`, () => {
  let service: ReorderOrderService;
  let connector: ReorderOrderConnector;
  let userIdService: UserIdService;
  let activeCartFacade: ActiveCartFacade;
  let multiCartFacade: MultiCartFacade;

  // TODO: CXSPA-4870 verify if can be avoided
  let originalOnUnhandledError: ((err: any) => void) | null;

  beforeAll(() => {
    // configure rxjs to not crash node instance with thrown errors
    // TODO: CXSPA-4870 verify if can be avoided
    originalOnUnhandledError = config.onUnhandledError;
    config.onUnhandledError = () => {};
  });

  afterAll(() => {
    // reset rxjs configuration
    // TODO: CXSPA-4870 verify if can be avoided
    config.onUnhandledError = originalOnUnhandledError;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReorderOrderService,
        {
          provide: ReorderOrderConnector,
          useClass: MockReorderOrderOrderConnector,
        },
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
        {
          provide: MultiCartFacade,
          useClass: MockMultiCartFacade,
        },
      ],
    });

    service = TestBed.inject(ReorderOrderService);
    connector = TestBed.inject(ReorderOrderConnector);
    userIdService = TestBed.inject(UserIdService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    multiCartFacade = TestBed.inject(MultiCartFacade);
  });

  it(`should inject ReorderOrderService`, inject(
    [ReorderOrderService],
    (reorderOrderService: ReorderOrderService) => {
      expect(reorderOrderService).toBeTruthy();
    }
  ));

  describe(`reorderOrder`, () => {
    it(`should call reorderOrderConnector.reorder`, () => {
      service.reorder(mockOrderId);
      expect(connector.reorder).toHaveBeenCalledWith(mockOrderId, mockUserId);
    });

    describe('reorder preconditions', () => {
      it('should delete cart when there exist an active cart before re-ordering', () => {
        service.reorder(mockOrderId);

        expect(multiCartFacade.deleteCart).toHaveBeenCalledWith(
          mockCartId,
          mockUserId
        );
      });

      it('should NOT delete cart when active cart does NOT exist before re-ordering', () => {
        activeCartFacade.getActiveCartId = createSpy().and.returnValue(of(''));

        service.reorder(mockOrderId);

        expect(multiCartFacade.deleteCart).not.toHaveBeenCalled();
      });

      it('should NOT allow to re-order when user is not logged in', () => {
        userIdService.takeUserId = createSpy().and.returnValue(of(''));

        service.reorder(mockOrderId);

        expect(service.reorder).toThrowError();
      });
    });
  });
});
