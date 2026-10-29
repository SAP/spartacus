import { TestBed } from '@angular/core/testing';
import { RouterState } from '@spartacus/core';
import { Subscription, of } from 'rxjs';
import {
  MockConfiguratorProviderService,
  provideConfiguratorMockQuantityService,
  provideConfiguratorMockRoutingService,
} from '../../../testing';
import { ConfiguratorCartService } from '../configurator-cart.service';
import { ConfiguratorQuantityService } from '../../services/configurator-quantity.service';
import { ConfiguratorRouterListener } from './configurator-router.listener';

const QUANTITY = 99;
let routerState: RouterState = {
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
  ...routerState,
};

const routerStateConfigRoute: RouterState = {
  ...routerState,
  state: {
    ...routerState.state,
    semanticRoute: 'configureCPQ',
  },
};

const routerStateCartRoute: RouterState = {
  ...routerState,
  state: {
    ...routerState.state,
    semanticRoute: 'cart',
  },
};

describe('ConfiguratorRouterListener', () => {
  let configuratorCartService: ConfiguratorCartService;
  let configuratorQuantityService: ConfiguratorQuantityService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        ConfiguratorRouterListener,
        {
          provide: ConfiguratorCartService,
          useClass: MockConfiguratorProviderService.MockConfiguratorCartService,
        },
        provideConfiguratorMockRoutingService(() => of(routerState)),
        provideConfiguratorMockQuantityService({ quantity: QUANTITY }),
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    configuratorCartService = TestBed.inject(ConfiguratorCartService);
    configuratorQuantityService = TestBed.inject(ConfiguratorQuantityService);

    vi.spyOn(configuratorCartService, 'removeCartBoundConfigurations');
    vi.spyOn(configuratorQuantityService, 'setQuantity');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('observeRouterChanges', () => {
    it('should subscribe to routingService and call facade service for the deletion of cart bound configurations in case navigation is done outside configurators', () => {
      routerState = routerStateCartRoute;
      TestBed.inject(ConfiguratorRouterListener);
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).toHaveBeenCalled();
    });

    it('should subscribe to routingService and call facade service for the deletion of cart bound configurations in case no semantic route available', () => {
      routerState = routerStateNoSemanticRoute;
      TestBed.inject(ConfiguratorRouterListener);
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).toHaveBeenCalled();
    });

    it('should not call facade service for deletion in case navigation is in the configurator feature lib', () => {
      routerState = routerStateConfigRoute;
      TestBed.inject(ConfiguratorRouterListener);
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).toHaveBeenCalledTimes(0);
    });

    it('should reset quantity if quantity service available', () => {
      routerState = routerStateCartRoute;
      TestBed.inject(ConfiguratorRouterListener);
      expect(configuratorQuantityService.setQuantity).toHaveBeenCalledWith(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe subscription', () => {
      const classUnderTest = TestBed.inject(ConfiguratorRouterListener);
      const spyUnsubscribe = vi.spyOn(Subscription.prototype, 'unsubscribe');
      classUnderTest.ngOnDestroy();
      expect(spyUnsubscribe).toHaveBeenCalled();
    });
  });
});
