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
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';

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

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(mockRouterData);
  }
}

function createListOfGroups(amount: number): Configurator.Group[] {
  const groups: Configurator.Group[] = [];
  for (let index = 1; index <= amount; index++) {
    const groupId = index + '-TEST_PRODUCT.' + index;
    const group = ConfiguratorTestUtils.createGroup(groupId);
    groups.push(group);
  }
  return groups;
}

let groups: Configurator.Group[] = [];

class MockConfiguratorGroupsService {
  getConflictGroups(): Observable<Configurator.Group[] | undefined> {
    return of(groups);
  }
}

const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';
const OVERVIEW_ROUTE = 'overviewCPQCONFIGURATOR';

let mockRouterState: any;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
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

    groups = createListOfGroups(5);

    mockRouterData = structuredClone(defaultMockRouterData);
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

    listener = TestBed.inject(ConfiguratorConflictSolverDialogEventListener);
    launchDialogService = TestBed.inject(LaunchDialogService);
    spyOn(launchDialogService, 'closeDialog').and.stub();
    spyOn(launchDialogService, 'openDialog').and.stub();

    configuratorGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );

    spyOn(configuratorGroupsService, 'getConflictGroups').and.callThrough();
  });

  afterEach(() => {
    listener.ngOnDestroy();
  });

  describe('conflictGroups observable', () => {
    it('should emit group data when routing pageType = "configuration"', () => {
      mockRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
      listener.conflictGroups$
        .subscribe((receivedGroups) => {
          expect(receivedGroups).toEqual(groups);
        })
        .unsubscribe();
    });

    it('should not emit group data when routing pageType = "overview"', () => {
      mockRouterData.pageType = ConfiguratorRouter.PageType.OVERVIEW;
      listener.conflictGroups$
        .subscribe(() => {
          fail(
            'entity with mockRouterData.pageType = "overview" should have been filtered out and not emitted'
          );
        })
        .unsubscribe();
    });
  });

  describe('isConfiguratorRelatedRoute', () => {
    it('should return false because semanticRoute is not defined', () => {
      expect(listener['isConfiguratorRelatedRoute']()).toBe(false);
    });

    it('should return false because semanticRoute does not contain configure', () => {
      expect(listener['isConfiguratorRelatedRoute'](OVERVIEW_ROUTE)).toBe(
        false
      );
    });

    it('should return true because semanticRoute contains configure', () => {
      expect(listener['isConfiguratorRelatedRoute'](CONFIGURATOR_ROUTE)).toBe(
        true
      );
    });
  });

  describe('openConflictSolverDialog', () => {
    it('should open conflict solver dialog because there are some conflict groups', () => {
      listener['openConflictSolverDialog']();
      expect(launchDialogService.openDialog).toHaveBeenCalled();
    });

    it('should close conflict solver dialog because there are not any conflict groups', () => {
      groups = [];
      listener['openConflictSolverDialog']();
      expect(launchDialogService.closeDialog).toHaveBeenCalled();
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'CLOSE_NO_CONFLICTS_EXIST'
      );
    });

    it('should close conflict solver dialog because no configurator related route', () => {
      mockRouterState.state.semanticRoute = OVERVIEW_ROUTE;
      listener['openConflictSolverDialog']();
      expect(launchDialogService.closeDialog).toHaveBeenCalled();
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'CLOSE_CLICK_EXIT_CANCEL_CONFIGURATION_BUTTON'
      );
    });
  });

  describe('closeModal', () => {
    it('should close conflict solver dialog', () => {
      listener['closeModal']('reason');
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('reason');
    });
  });
});
