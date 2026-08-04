import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { firstValueFrom, Observable, of, Subject } from 'rxjs';
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
import { vi } from 'vitest';

const PRODUCT_CODE = 'CONF_LAPTOP';
let lastDialogData: any;

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _data?: any
  ) {
    lastDialogData = _data;
  }

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
let groupSubject: Subject<Configurator.Group | undefined>;

class MockConfiguratorGroupsService {
  getConflictGroupForImmediateConflictResolution(): Observable<
    Configurator.Group | undefined
  > {
    return groupSubject.asObservable();
  }
}

describe('ConfiguratorConflictSolverDialogLauncherService', () => {
  let listener: ConfiguratorConflictSolverDialogLauncherService;
  let launchDialogService: LaunchDialogService;

  function initLauncherService() {
    listener = TestBed.inject(ConfiguratorConflictSolverDialogLauncherService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    vi.spyOn(launchDialogService, 'closeDialog').mockImplementation(() => {});
    vi.spyOn(launchDialogService, 'openDialogAndSubscribe');
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
    groupSubject = new Subject<Configurator.Group | undefined>();
    mockRouterData = structuredClone(defaultMockRouterData);
    routerData$ = of(mockRouterData);
  });

  afterEach(() => {
    listener.ngOnDestroy();
    vi.useRealTimers();
  });

  beforeEach(() => { vi.useFakeTimers(); });

  describe('conflictGroups observable', () => {
    let configRouterData: ConfiguratorRouter.Data;

    beforeEach(() => {
      configRouterData = structuredClone(defaultMockRouterData);
      configRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
    });

    it('should emit group data', async () => {
      routerData$ = of(configRouterData);
      initLauncherService();
      groupSubject.next(group);
      const data = await firstValueFrom(listener.conflictGroupAndRouterData$);
      expect(data.conflictGroup).toEqual(group);
    });
  });

  describe('controlDialog', () => {
    it('should open conflict solver dialog because there are some conflict groups', async () => {
      initLauncherService();
      groupSubject.next(group);
      await vi.advanceTimersByTimeAsync(0);
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    });

    it('should open conflict solver dialog only once if same conflict groups is emitted', async () => {
      initLauncherService();
      groupSubject.next(group);
      await vi.advanceTimersByTimeAsync(0);
      groupSubject.next(group);
      await vi.advanceTimersByTimeAsync(0);
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledTimes(
        1
      );
    });

    it('should close conflict solver dialog because there are not any conflict groups', async () => {
      initLauncherService();
      groupSubject.next(group);
      await vi.advanceTimersByTimeAsync(0);
      groupSubject.next(undefined);
      await vi.advanceTimersByTimeAsync(0);
      expect(launchDialogService.closeDialog).toHaveBeenCalled();
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'CLOSE_NO_CONFLICTS_EXIST'
      );
    });

    it('should NOT close conflict solver dialog because it has not been opened yet', async () => {
      initLauncherService();
      groupSubject.next(undefined);
      await vi.advanceTimersByTimeAsync(0);
      expect(launchDialogService.closeDialog).not.toHaveBeenCalled();
    });

    it('should close conflict solver dialog only once unless it is not opened again', async () => {
      initLauncherService();
      groupSubject.next(group);
      await vi.advanceTimersByTimeAsync(0);

      groupSubject.next(undefined);
      await vi.advanceTimersByTimeAsync(0);
      expect(launchDialogService.closeDialog).toHaveBeenCalledTimes(1);

      groupSubject.next(undefined);
      await vi.advanceTimersByTimeAsync(0);
      expect(launchDialogService.closeDialog).toHaveBeenCalledTimes(1);
    });
  });

  describe('closeModal', () => {
    it('should close conflict solver dialog', () => {
      initLauncherService();
      listener['closeModal']('reason');
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('reason');
    });
  });

  describe('openModal', () => {
    it('should provide conflict data', () => {
      initLauncherService();
      listener['conflictGroupAndRouterData$'] = of({
        conflictGroup: group,
        routerData: mockRouterData,
      });
      listener['openModal']();
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
      expect(lastDialogData.routerData).toBe(listener['routerData$']);
      lastDialogData.conflictGroup
        .subscribe((dialogData: any) => {
          expect(dialogData).toBe(group);
        })
        .unsubscribe();
    });
  });
});
