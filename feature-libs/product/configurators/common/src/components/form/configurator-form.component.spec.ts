import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  GenericConfigurator,
  GenericConfiguratorUtilsService,
  I18nTestingModule,
  LanguageService,
  RoutingService,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import * as ConfigurationTestData from '../../shared/testing/configurator-test-data';
import { ConfiguratorAttributeFooterComponent } from '../attribute/footer/configurator-attribute-footer.component';
import { ConfiguratorAttributeHeaderComponent } from '../attribute/header/configurator-attribute-header.component';
import { ConfiguratorAttributeCheckBoxListComponent } from '../attribute/types/checkbox-list/configurator-attribute-checkbox-list.component';
import { ConfiguratorAttributeCheckBoxComponent } from '../attribute/types/checkbox/configurator-attribute-checkbox.component';
import { ConfiguratorAttributeDropDownComponent } from '../attribute/types/drop-down/configurator-attribute-drop-down.component';
import { ConfiguratorAttributeInputFieldComponent } from '../attribute/types/input-field/configurator-attribute-input-field.component';
import { ConfiguratorAttributeMultiSelectionImageComponent } from '../attribute/types/multi-selection-image/configurator-attribute-multi-selection-image.component';
import { ConfiguratorAttributeRadioButtonComponent } from '../attribute/types/radio-button/configurator-attribute-radio-button.component';
import { ConfiguratorAttributeReadOnlyComponent } from '../attribute/types/read-only/configurator-attribute-read-only.component';
import { ConfiguratorAttributeSingleSelectionImageComponent } from '../attribute/types/single-selection-image/configurator-attribute-single-selection-image.component';
import { ConfiguratorFormComponent } from './configurator-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    semanticRoute: CONFIGURATOR_ROUTE,
    queryParams: {},
  },
};

const owner: GenericConfigurator.Owner = {
  id: PRODUCT_CODE,
  type: GenericConfigurator.OwnerType.PRODUCT,
};
const groups: Configurator.Group[] =
  ConfigurationTestData.productConfiguration.groups;

const configRead: Configurator.Configuration = {
  configId: 'a',
  consistent: true,
  complete: true,
  productCode: PRODUCT_CODE,
  owner: owner,
  groups: groups,
};

const configRead2: Configurator.Configuration = {
  configId: 'b',
  consistent: true,
  complete: true,
  productCode: PRODUCT_CODE,
  owner: owner,
  groups: groups,
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

let routerStateObservable = null;
let configurationCreateObservable = null;
let currentGroupObservable = null;
let isConfigurationLoadingObservable = null;
let hasConfigurationConflictsObservable = null;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

class MockConfiguratorCommonsService {
  getOrCreateConfiguration(): Observable<Configurator.Configuration> {
    return configurationCreateObservable;
  }
  removeConfiguration(): void {}
  updateConfiguration(): void {}

  isConfigurationLoading(): Observable<boolean> {
    return isConfigurationLoadingObservable;
  }
  hasConflicts(): Observable<boolean> {
    return hasConfigurationConflictsObservable;
  }
}
class MockConfiguratorGroupsService {
  getCurrentGroup(): Observable<string> {
    return currentGroupObservable;
  }
  getNextGroup(): Observable<string> {
    return of('');
  }
  getPreviousGroup(): Observable<string> {
    return of('');
  }
  subscribeToUpdateConfiguration() {}
  setGroupStatus(): void {}
  navigateToConflictSolver(): void {}
  navigateToFirstIncompleteGroup(): void {}
}
function checkConfigurationObs(
  routerMarbels: string,
  configurationServiceMarbels: string,
  expectedMarbels: string
) {
  routerStateObservable = cold(routerMarbels, {
    a: mockRouterState,
  });
  configurationCreateObservable = cold(configurationServiceMarbels, {
    x: configRead,
    y: configRead2,
  });

  const fixture = TestBed.createComponent(ConfiguratorFormComponent);
  const component = fixture.componentInstance;
  expect(component.configuration$).toBeObservable(
    cold(expectedMarbels, { x: configRead, y: configRead2 })
  );
}
function checkCurrentGroupObs(
  routerMarbels: string,
  groupMarbels: string,
  expectedMarbels: string
) {
  routerStateObservable = cold(routerMarbels, {
    a: mockRouterState,
  });
  currentGroupObservable = cold(groupMarbels, {
    u: groups[0],
    v: groups[1],
  });
  const fixture = TestBed.createComponent(ConfiguratorFormComponent);
  const component = fixture.componentInstance;
  expect(component.currentGroup$).toBeObservable(
    cold(expectedMarbels, {
      u: groups[0],
      v: groups[1],
    })
  );
}
describe('ConfigurationFormComponent', () => {
  let configuratorCommonsService;
  let configuratorUtils: GenericConfiguratorUtilsService;
  let configurationCommonsService: ConfiguratorCommonsService;
  let configuratorGroupsService: ConfiguratorGroupsService;
  let mockLanguageService;
  beforeEach(async(() => {
    mockLanguageService = {
      getAll: () => of([]),
      getActive: jasmine.createSpy().and.returnValue(of('en')),
    };
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [
        ConfiguratorFormComponent,
        ConfiguratorAttributeHeaderComponent,
        ConfiguratorAttributeFooterComponent,
        ConfiguratorAttributeRadioButtonComponent,
        ConfiguratorAttributeInputFieldComponent,
        ConfiguratorAttributeDropDownComponent,
        ConfiguratorAttributeReadOnlyComponent,

        ConfiguratorAttributeCheckBoxComponent,
        ConfiguratorAttributeCheckBoxListComponent,
        ConfiguratorAttributeMultiSelectionImageComponent,
        ConfiguratorAttributeSingleSelectionImageComponent,
        MockCxIconComponent,
      ],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },

        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },

        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
        { provide: LanguageService, useValue: mockLanguageService },
      ],
    })
      .overrideComponent(ConfiguratorAttributeHeaderComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));
  beforeEach(() => {
    configuratorUtils = TestBed.inject(
      GenericConfiguratorUtilsService as Type<GenericConfiguratorUtilsService>
    );
    configurationCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
    configuratorGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );
    spyOn(
      configurationCommonsService,
      'isConfigurationLoading'
    ).and.callThrough();
    spyOn(configuratorGroupsService, 'setGroupStatus').and.callThrough();

    configuratorUtils.setOwnerKey(owner);
    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
    isConfigurationLoadingObservable = of(false);
    hasConfigurationConflictsObservable = of(false);
  });

  it('should not enforce a reload of the configuration per default', () => {
    spyOn(configuratorCommonsService, 'removeConfiguration').and.callThrough();
    mockRouterState.state.queryParams = { forceReload: 'false' };
    routerStateObservable = of(mockRouterState);
    const fixture = TestBed.createComponent(ConfiguratorFormComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    expect(
      configuratorCommonsService.removeConfiguration
    ).toHaveBeenCalledTimes(0);
  });

  it('should enforce a reload of the configuration by removing the current one in case the router requires this', () => {
    spyOn(configuratorCommonsService, 'removeConfiguration').and.callThrough();
    routerStateObservable = of({
      ...mockRouterState,
      state: {
        ...mockRouterState.state,
        queryParams: { forceReload: 'true' },
      },
    });
    const fixture = TestBed.createComponent(ConfiguratorFormComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();

    expect(
      configuratorCommonsService.removeConfiguration
    ).toHaveBeenCalledTimes(1);
  });

  describe('resolve issues navigation', () => {
    it('should go to neither conflict solver nor first incomplete group', () => {
      spyOn(
        configuratorGroupsService,
        'navigateToConflictSolver'
      ).and.callThrough();
      spyOn(
        configuratorGroupsService,
        'navigateToFirstIncompleteGroup'
      ).and.callThrough();
      routerStateObservable = of({
        ...mockRouterState,
      });

      const fixture = TestBed.createComponent(ConfiguratorFormComponent);
      const component = fixture.componentInstance;
      component.ngOnInit();

      expect(
        configuratorGroupsService.navigateToConflictSolver
      ).toHaveBeenCalledTimes(0);
      expect(
        configuratorGroupsService.navigateToFirstIncompleteGroup
      ).toHaveBeenCalledTimes(0);
    });

    it('should go to conflict solver in case the router requires this - has conflicts', () => {
      spyOn(
        configuratorGroupsService,
        'navigateToConflictSolver'
      ).and.callThrough();
      spyOn(
        configuratorGroupsService,
        'navigateToFirstIncompleteGroup'
      ).and.callThrough();
      routerStateObservable = of({
        ...mockRouterState,
        state: {
          ...mockRouterState.state,
          queryParams: { resolveIssues: 'true' },
        },
      });
      hasConfigurationConflictsObservable = of(true);
      const fixture = TestBed.createComponent(ConfiguratorFormComponent);
      const component = fixture.componentInstance;
      component.ngOnInit();

      expect(
        configuratorGroupsService.navigateToConflictSolver
      ).toHaveBeenCalledTimes(1);
      expect(
        configuratorGroupsService.navigateToFirstIncompleteGroup
      ).toHaveBeenCalledTimes(0);
    });

    it('should go to first incomplete group in case the router requires this - has no conflicts', () => {
      spyOn(
        configuratorGroupsService,
        'navigateToConflictSolver'
      ).and.callThrough();
      spyOn(
        configuratorGroupsService,
        'navigateToFirstIncompleteGroup'
      ).and.callThrough();
      routerStateObservable = of({
        ...mockRouterState,
        state: {
          ...mockRouterState.state,
          queryParams: { resolveIssues: 'true' },
        },
      });
      const fixture = TestBed.createComponent(ConfiguratorFormComponent);
      const component = fixture.componentInstance;
      component.ngOnInit();

      expect(
        configuratorGroupsService.navigateToConflictSolver
      ).toHaveBeenCalledTimes(0);
      expect(
        configuratorGroupsService.navigateToFirstIncompleteGroup
      ).toHaveBeenCalledTimes(1);
    });
  });

  it('should only get the minimum needed 2 emissions of product configurations if router emits faster than commons service', () => {
    checkConfigurationObs('aa', '---xy', '----xy');
  });

  it('should get 3 emissions of product configurations if both services emit fast', () => {
    checkConfigurationObs('aa', 'xy', 'xxy');
  });

  it('should get the maximum 4 emissions of product configurations if router pauses between emissions', () => {
    checkConfigurationObs('a---a', 'xy', 'xy--xy');
  });

  it('should only get the minimum needed 2 emissions of current groups if group service emits slowly', () => {
    checkCurrentGroupObs('aa', '---uv', '----uv');
  });

  it('should get 4 emissions of current groups if configurations service emits fast', () => {
    checkCurrentGroupObs('a---a', '--uv', '--uv--uv');
  });

  it('should get the maximum 8 emissions of current groups if router and config service emit slowly', () => {
    checkCurrentGroupObs('a-----a', 'uv', 'uv----uv');
  });

  it('check update configuration', () => {
    spyOn(configuratorCommonsService, 'updateConfiguration').and.callThrough();
    isConfigurationLoadingObservable = cold('xy', {
      x: true,
      y: false,
    });
    routerStateObservable = of(mockRouterState);
    const fixture = TestBed.createComponent(ConfiguratorFormComponent);
    const component = fixture.componentInstance;
    component.updateConfiguration({
      changedAttribute: configRead.groups[0].attributes[0],
      productCode: owner.key,
    });

    expect(configurationCommonsService.updateConfiguration).toHaveBeenCalled();
  });
});
