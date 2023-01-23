import { fakeAsync, TestBed, tick } from '@angular/core/testing';
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

import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';

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
  return ConfiguratorTestUtils.createGroup('TEST_PRODUCT.1000');
}

let group: Configurator.Group;
let conflictGroup$: Observable<Configurator.Group | undefined>;

class MockConfiguratorGroupsService {
  getConflictGroupForImmediateConflictResolution(): Observable<
    Configurator.Group | undefined
  > {
    return conflictGroup$;
  }
}

describe('ConfiguratorConflictSolverDialogLauncherService', () => {
  let listener: ConfiguratorConflictSolverDialogLauncherService;
  let launchDialogService: LaunchDialogService;

  function initLauncherService() {
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
      ],
    });
    group = createConflictGroup();
    conflictGroup$ = of(group);

    mockRouterData = structuredClone(defaultMockRouterData);
    routerData$ = of(mockRouterData);
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
      routerData$ = of(configRouterData);
      conflictGroup$ = of(group);

      initLauncherService();
      listener.conflictGroup$.subscribe((data) => expect(data).toEqual(group));
    });
  });

  describe('controlDialog', () => {
    it('should open conflict solver dialog because there are some conflict groups', fakeAsync(() => {
      initLauncherService();
      listener['controlDialog']();
      tick(0);
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    }));

    it('should close conflict solver dialog because there are not any conflict groups', fakeAsync(() => {
      initLauncherService();
      conflictGroup$ = of(undefined);
      listener['controlDialog']();
      tick(0);
      expect(launchDialogService.closeDialog).toHaveBeenCalled();
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'CLOSE_NO_CONFLICTS_EXIST'
      );
    }));
  });

  describe('closeModal', () => {
    it('should close conflict solver dialog', () => {
      initLauncherService();
      listener['closeModal']('reason');
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('reason');
    });
  });
});
