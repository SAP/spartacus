import { TestBed } from '@angular/core/testing';
import { ElementRef, Type, ViewContainerRef } from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorConflictSolverDialogEventListener } from './configurator-conflict-solver-dialog-event.listener';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import {
  Configurator,
  ConfiguratorGroupsService,
} from '@spartacus/product-configurator/rulebased';
import { RouterState, RoutingService } from '@spartacus/core';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return of();
  }
  closeDialog(_reason: string): void {}
}

const PRODUCT_CODE = 'CONF_LAPTOP';

const mockRouterData: any = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: {
    type: CommonConfigurator.OwnerType.PRODUCT,
    id: PRODUCT_CODE,
    configuratorType: ConfiguratorType.CPQ,
  },
  displayOnly: false,
  forceReload: false,
  resolveIssues: false,
};

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(mockRouterData);
  }
}

class MockConfiguratorGroupsService {
  getConflictGroups(): Observable<Configurator.Group[] | undefined> {
    return of([]);
  }
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

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(routerState);
  }
}

describe('ConfiguratorConflictSolverDialogEventListener', () => {
  let listener: ConfiguratorConflictSolverDialogEventListener;
  let launchDialogService: LaunchDialogService;
  let configuratorGroupsService: ConfiguratorGroupsService;
  let mockRoutingService: MockRoutingService = new MockRoutingService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfiguratorConflictSolverDialogEventListener,
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: ConfiguratorRouterExtractorService,
          useClass: MockConfiguratorRouterExtractorService,
        },
        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
        {
          provide: RoutingService,
          useValue: mockRoutingService,
        },
      ],
    });

    listener = TestBed.inject(ConfiguratorConflictSolverDialogEventListener);
    launchDialogService = TestBed.inject(LaunchDialogService);

    configuratorGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );

    spyOn(configuratorGroupsService, 'getConflictGroups').and.callThrough();
  });

  describe('closeModal', () => {
    it('Should close conflict solver dialog', () => {
      spyOn(launchDialogService, 'closeDialog').and.stub();
      listener['closeModal']('reason');
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('reason');
    });
  });
});
