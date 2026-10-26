import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterState, RoutingService } from '@spartacus/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { ConfiguratorCartService } from '../configurator-cart.service';
import { ConfiguratorRouterListener } from './configurator-router.listener';
import { ConfiguratorQuantityService } from '../../services/configurator-quantity.service';

const QUANTITY = 99;
class MockConfiguratorCartService {
  removeCartBoundConfigurations() {}
}

const routerStateBase: RouterState = {
  navigationId: 1,
  state: {
    url: '',
    queryParams: [],
    params: [],
    context: { id: '' },
    cmsRequired: true,
  },
};

const routerStateNoSemanticRoute: RouterState = {
  ...routerStateBase,
};

const routerStateConfigRoute: RouterState = {
  ...routerStateBase,
  state: {
    ...routerStateBase.state,
    semanticRoute: 'configureCPQ',
  },
};

const routerStateCartRoute: RouterState = {
  ...routerStateBase,
  state: {
    ...routerStateBase.state,
    semanticRoute: 'cart',
  },
};

const routerStateProductRoute: RouterState = {
  ...routerStateBase,
  state: {
    ...routerStateBase.state,
    semanticRoute: 'product',
  },
};

let routerStateSubject: ReplaySubject<RouterState>;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateSubject.asObservable();
  }
}

class MockConfiguratorQuantityService {
  getQuantity(): Observable<number> {
    return new Observable((subscriber) => {
      subscriber.next(QUANTITY);
      subscriber.complete();
    });
  }
  setQuantity(): void {}
}

let mockConfiguratorCartService: MockConfiguratorCartService =
  new MockConfiguratorCartService();

describe('ConfiguratorRouterListener', () => {
  let configuratorCartService: ConfiguratorCartService;
  let configuratorQuantityService: ConfiguratorQuantityService;

  beforeEach(async () => {
    routerStateSubject = new ReplaySubject<RouterState>(1);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfiguratorCartService,
          useValue: mockConfiguratorCartService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ConfiguratorQuantityService,
          useClass: MockConfiguratorQuantityService,
        },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    configuratorCartService = TestBed.inject(
      ConfiguratorCartService as Type<ConfiguratorCartService>
    );
    configuratorQuantityService = TestBed.inject(
      ConfiguratorQuantityService as Type<ConfiguratorQuantityService>
    );

    vi.spyOn(configuratorCartService, 'removeCartBoundConfigurations');
    vi.spyOn(configuratorQuantityService, 'setQuantity');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('observeRouterChanges', () => {
    it('should not delete cart bound configurations when listener starts outside configurators', () => {
      TestBed.inject(
        ConfiguratorRouterListener as Type<ConfiguratorRouterListener>
      );
      routerStateSubject.next(routerStateCartRoute);
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).not.toHaveBeenCalled();
    });

    it('should not delete cart bound configurations when no semantic route is available on init', () => {
      TestBed.inject(
        ConfiguratorRouterListener as Type<ConfiguratorRouterListener>
      );
      routerStateSubject.next(routerStateNoSemanticRoute);
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).not.toHaveBeenCalled();
    });

    it('should not call facade service for deletion while staying in the configurator feature lib', () => {
      TestBed.inject(
        ConfiguratorRouterListener as Type<ConfiguratorRouterListener>
      );
      routerStateSubject.next(routerStateConfigRoute);
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).toHaveBeenCalledTimes(0);
    });

    it('should not reset quantity when navigating from product to configurator', () => {
      TestBed.inject(
        ConfiguratorRouterListener as Type<ConfiguratorRouterListener>
      );
      routerStateSubject.next(routerStateProductRoute);
      routerStateSubject.next(routerStateConfigRoute);
      expect(configuratorQuantityService.setQuantity).not.toHaveBeenCalled();
    });

    it('should delete cart bound configurations when leaving configurators', () => {
      TestBed.inject(
        ConfiguratorRouterListener as Type<ConfiguratorRouterListener>
      );
      routerStateSubject.next(routerStateConfigRoute);
      routerStateSubject.next(routerStateCartRoute);
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).toHaveBeenCalled();
    });

    it('should reset quantity when leaving configurators', () => {
      TestBed.inject(
        ConfiguratorRouterListener as Type<ConfiguratorRouterListener>
      );
      routerStateSubject.next(routerStateConfigRoute);
      routerStateSubject.next(routerStateCartRoute);
      expect(configuratorQuantityService.setQuantity).toHaveBeenCalledWith(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe subscription', () => {
      const classUnderTest = TestBed.inject(
        ConfiguratorRouterListener as Type<ConfiguratorRouterListener>
      );
      const spyUnsubscribe = vi.spyOn(Subscription.prototype, 'unsubscribe');
      classUnderTest.ngOnDestroy();
      expect(spyUnsubscribe).toHaveBeenCalled();
    });
  });
});
