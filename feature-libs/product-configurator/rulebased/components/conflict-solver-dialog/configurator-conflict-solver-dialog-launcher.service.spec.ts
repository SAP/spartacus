import { TestBed } from '@angular/core/testing';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfiguratorConflictSolverDialogLauncherService } from './configurator-conflict-solver-dialog-launcher.service';
import { ConfiguratorRouter } from '../../../common/components/service/configurator-router-data';
import {
  CommonConfigurator,
  ConfiguratorType,
} from '../../../common/core/model/common-configurator.model';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import {
  MockConfiguratorProviderService,
  provideConfiguratorMockGroupsService,
  provideConfiguratorMockRouterExtractorService,
} from '../../testing';

const PRODUCT_CODE = 'CONF_LAPTOP';
let lastDialogData: any;

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

function createConflictGroup(): Configurator.Group {
  return ConfiguratorTestUtils.createGroup('TEST_PRODUCT.1000');
}

let group: Configurator.Group;
let groupSubject: Subject<Configurator.Group | undefined>;

describe('ConfiguratorConflictSolverDialogLauncherService', () => {
  let listener: ConfiguratorConflictSolverDialogLauncherService;
  let launchDialogService: LaunchDialogService;

  function initLauncherService() {
    listener = TestBed.inject(ConfiguratorConflictSolverDialogLauncherService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    vi.spyOn(launchDialogService, 'closeDialog').mockImplementation(() => {});
    vi.spyOn(launchDialogService, 'openDialogAndSubscribe').mockImplementation(
      (_caller, _ref, data) => {
        lastDialogData = data;
      }
    );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfiguratorConflictSolverDialogLauncherService,
        {
          provide: LaunchDialogService,
          useClass: MockConfiguratorProviderService.MockLaunchDialogService,
        },
        provideConfiguratorMockRouterExtractorService({
          routerDataSource: () => routerData$,
        }),
        provideConfiguratorMockGroupsService({
          conflictGroupSource: () => groupSubject.asObservable(),
        }),
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

  beforeEach(() => {
    vi.useFakeTimers();
  });

  describe('conflictGroups observable', () => {
    let configRouterData: ConfiguratorRouter.Data;

    beforeEach(() => {
      configRouterData = structuredClone(defaultMockRouterData);
      configRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
    });

    it('should emit group data', async () => {
      routerData$ = of(configRouterData);
      initLauncherService();
      let data: any;
      listener.conflictGroupAndRouterData$.pipe(take(1)).subscribe((d) => {
        data = d;
      });
      groupSubject.next(group);
      await vi.advanceTimersByTimeAsync(0);
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
