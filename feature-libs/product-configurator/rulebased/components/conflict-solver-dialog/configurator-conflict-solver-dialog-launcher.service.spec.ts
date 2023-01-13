import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorConflictSolverDialogLauncherService } from './configurator-conflict-solver-dialog-launcher.service';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { RouterState, RoutingService } from '@spartacus/core';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { cold } from 'jasmine-marbles';

const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';
const PRODUCT_CODE = 'CONF_LAPTOP';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _data?: any
  ) {}

  closeDialog(_reason: string): void {}
}

const defaultMockRouterData: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: {
    key: 'OWNER_KEY',
    type: CommonConfigurator.OwnerType.PRODUCT,
    id: PRODUCT_CODE,
    configuratorType: ConfiguratorType.CPQ,
  },
  displayOnly: false,
  forceReload: false,
  resolveIssues: false,
};

let mockRouterData: ConfiguratorRouter.Data;
let routerData$: Observable<ConfiguratorRouter.Data>;

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return routerData$;
  }
}

function createConflictGroup(): Configurator.Group {
  const groupId = 'TEST_PRODUCT.1000';
  const group = ConfiguratorTestUtils.createGroup(groupId);
  return group;
}

let group: Configurator.Group = undefined;
let conflictGroup$: Observable<Configurator.Group | undefined>;

class MockConfiguratorGroupsService {
  getConflictGroupsForImmediateConflictResolution(): Observable<
    Configurator.Group | undefined
  > {
    return conflictGroup$;
  }
}

let mockRouterState: RouterState;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

describe('ConfiguratorConflictSolverDialogLauncherService', () => {
  let listener: ConfiguratorConflictSolverDialogLauncherService;
  let launchDialogService: LaunchDialogService;
  let mockRoutingService: MockRoutingService = new MockRoutingService();

  function initEventListener() {
    listener = TestBed.inject(ConfiguratorConflictSolverDialogLauncherService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    spyOn(launchDialogService, 'closeDialog').and.stub();
    spyOn(launchDialogService, 'openDialogAndSubscribe').and.stub();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfiguratorConflictSolverDialogLauncherService,
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
    group = createConflictGroup();
    conflictGroup$ = of(group);

    mockRouterData = structuredClone(defaultMockRouterData);
    routerData$ = of(mockRouterData);

    mockRouterState = {
      navigationId: 1,
      state: {
        url: '',
        queryParams: [],
        params: [],
        context: { id: '' },
        cmsRequired: true,
        semanticRoute: CONFIGURATOR_ROUTE,
      },
    };
  });

  afterEach(() => {
    listener.ngOnDestroy();
  });

  describe('conflictGroups observable', () => {
    let configRouterData: ConfiguratorRouter.Data;

    beforeEach(() => {
      configRouterData = structuredClone(defaultMockRouterData);
      configRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
    });

    it('should emit group data', () => {
      routerData$ = cold('    c---', { c: configRouterData });
      conflictGroup$ = cold('        -g--', { g: group });
      const expected$ = cold('-g--', { g: group });
      initEventListener();
      expect(listener.conflictGroup$).toBeObservable(expected$);
    });
  });

  describe('controlDialog', () => {
    it('should open conflict solver dialog because there are some conflict groups', () => {
      initEventListener();
      listener['controlDialog']();
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    });

    it('should close conflict solver dialog because there are not any conflict groups', () => {
      initEventListener();
      conflictGroup$ = of(undefined);
      listener['controlDialog']();
      expect(launchDialogService.closeDialog).toHaveBeenCalled();
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'CLOSE_NO_CONFLICTS_EXIST'
      );
    });
  });

  describe('closeModal', () => {
    it('should close conflict solver dialog', () => {
      initEventListener();
      listener['closeModal']('reason');
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('reason');
    });
  });
});
