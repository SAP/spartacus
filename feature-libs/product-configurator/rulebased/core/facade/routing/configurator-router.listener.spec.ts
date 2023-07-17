import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterState, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfiguratorCartService } from '../configurator-cart.service';
import { ConfiguratorRouterListener } from './configurator-router.listener';

class MockConfiguratorCartService {
  removeCartBoundConfigurations() {}
}

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

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(routerState);
  }
}

let mockConfiguratorCartService: MockConfiguratorCartService =
  new MockConfiguratorCartService();

let mockRoutingService: MockRoutingService = new MockRoutingService();

describe('ConfiguratorRouterListener', () => {
  let configuratorCartService: ConfiguratorCartService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: ConfiguratorCartService,
            useValue: mockConfiguratorCartService,
          },
          {
            provide: RoutingService,
            useValue: mockRoutingService,
          },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    configuratorCartService = TestBed.inject(
      ConfiguratorCartService as Type<ConfiguratorCartService>
    );

    spyOn(
      configuratorCartService,
      'removeCartBoundConfigurations'
    ).and.callThrough();
  });

  describe('observeRouterChanges', () => {
    it('should subscribe to routingService and call facade service for the deletion of cart bound configurations in case navigation is done outside configurators', () => {
      routerState = routerStateCartRoute;
      TestBed.inject(
        ConfiguratorRouterListener as Type<ConfiguratorRouterListener>
      );
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).toHaveBeenCalled();
    });

    it('should subscribe to routingService and call facade service for the deletion of cart bound configurations in case no semantic route available', () => {
      routerState = routerStateNoSemanticRoute;
      TestBed.inject(
        ConfiguratorRouterListener as Type<ConfiguratorRouterListener>
      );
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).toHaveBeenCalled();
    });

    it('should not call facade service for deletion in case navigation is in the configurator feature lib', () => {
      routerState = routerStateConfigRoute;
      TestBed.inject(
        ConfiguratorRouterListener as Type<ConfiguratorRouterListener>
      );
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).toHaveBeenCalledTimes(0);
    });
  });
});
