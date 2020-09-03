import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  GenericConfigurator,
  GenericConfigUtilsService,
  I18nTestingModule,
  LanguageService,
  RoutingService,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import * as ConfigurationTestData from '../../shared/testing/configuration-test-data';
import { ConfigAttributeFooterComponent } from '../config-attribute/config-attribute-footer/config-attribute-footer.component';
import { ConfigAttributeHeaderComponent } from '../config-attribute/config-attribute-header/config-attribute-header.component';
import { ConfigAttributeCheckBoxListComponent } from '../config-attribute/config-attribute-types/config-attribute-checkbox-list/config-attribute-checkbox-list.component';
import { ConfigAttributeCheckBoxComponent } from '../config-attribute/config-attribute-types/config-attribute-checkbox/config-attribute-checkbox.component';
import { ConfigAttributeDropDownComponent } from '../config-attribute/config-attribute-types/config-attribute-drop-down/config-attribute-drop-down.component';
import { ConfigAttributeInputFieldComponent } from '../config-attribute/config-attribute-types/config-attribute-input-field/config-attribute-input-field.component';
import { ConfigAttributeMultiSelectionImageComponent } from '../config-attribute/config-attribute-types/config-attribute-multi-selection-image/config-attribute-multi-selection-image.component';
import { ConfigAttributeRadioButtonComponent } from '../config-attribute/config-attribute-types/config-attribute-radio-button/config-attribute-radio-button.component';
import { ConfigAttributeReadOnlyComponent } from '../config-attribute/config-attribute-types/config-attribute-read-only/config-attribute-read-only.component';
import { ConfigAttributeSingleSelectionImageComponent } from '../config-attribute/config-attribute-types/config-attribute-single-selection-image/config-attribute-single-selection-image.component';
import { ConfiguratorCommonsService } from './../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from './../../core/facade/configurator-groups.service';
import { ConfigFormComponent } from './config-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIGURATOR_URL =
  'electronics-spa/en/USD/configureCPQCONFIGURATOR/product/entityKey/WCEM_DEPENDENCY_PC';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
    url: CONFIGURATOR_URL,
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

  const fixture = TestBed.createComponent(ConfigFormComponent);
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
  const fixture = TestBed.createComponent(ConfigFormComponent);
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
  let configuratorUtils: GenericConfigUtilsService;
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
        ConfigFormComponent,
        ConfigAttributeHeaderComponent,
        ConfigAttributeFooterComponent,
        ConfigAttributeRadioButtonComponent,
        ConfigAttributeInputFieldComponent,
        ConfigAttributeDropDownComponent,
        ConfigAttributeReadOnlyComponent,

        ConfigAttributeCheckBoxComponent,
        ConfigAttributeCheckBoxListComponent,
        ConfigAttributeMultiSelectionImageComponent,
        ConfigAttributeSingleSelectionImageComponent,
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
      .overrideComponent(ConfigAttributeHeaderComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));
  beforeEach(() => {
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
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
    const fixture = TestBed.createComponent(ConfigFormComponent);
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
    const fixture = TestBed.createComponent(ConfigFormComponent);
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

      const fixture = TestBed.createComponent(ConfigFormComponent);
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
      const fixture = TestBed.createComponent(ConfigFormComponent);
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
      const fixture = TestBed.createComponent(ConfigFormComponent);
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
    const fixture = TestBed.createComponent(ConfigFormComponent);
    const component = fixture.componentInstance;
    component.updateConfiguration({
      changedAttribute: configRead.groups[0].attributes[0],
      productCode: owner.key,
    });

    expect(configurationCommonsService.updateConfiguration).toHaveBeenCalled();
  });
});
