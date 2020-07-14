import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigurator,
  GenericConfigUtilsService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { GROUP_ID_1 } from 'projects/core/src/configurator/commons/facade/configuration-test-data';
import { Observable, of } from 'rxjs';
import { ConfigAttributeFooterComponent } from '../config-attribute-footer/config-attribute-footer.component';
import { ConfigAttributeHeaderComponent } from '../config-attribute-header/config-attribute-header.component';
import { ConfigAttributeCheckBoxListComponent } from '../config-attribute-types/config-attribute-checkbox-list/config-attribute-checkbox-list.component';
import { ConfigAttributeCheckBoxComponent } from '../config-attribute-types/config-attribute-checkbox/config-attribute-checkbox.component';
import { ConfigAttributeDropDownComponent } from '../config-attribute-types/config-attribute-drop-down/config-attribute-drop-down.component';
import { ConfigAttributeInputFieldComponent } from '../config-attribute-types/config-attribute-input-field/config-attribute-input-field.component';
import { ConfigAttributeMultiSelectionImageComponent } from '../config-attribute-types/config-attribute-multi-selection-image/config-attribute-multi-selection-image.component';
import { ConfigAttributeRadioButtonComponent } from '../config-attribute-types/config-attribute-radio-button/config-attribute-radio-button.component';
import { ConfigAttributeReadOnlyComponent } from '../config-attribute-types/config-attribute-read-only/config-attribute-read-only.component';
import { ConfigAttributeSingleSelectionImageComponent } from '../config-attribute-types/config-attribute-single-selection-image/config-attribute-single-selection-image.component';
import { ConfigPreviousNextButtonsComponent } from '../config-previous-next-buttons/config-previous-next-buttons.component';
import { ConfigFormComponent } from './config-form.component';
import { ConfigFormUpdateEvent } from './config-form.event';

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
const groups: Configurator.Group[] = [
  {
    configurable: true,
    description: 'Core components',
    groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
    id: '1-CPQ_LAPTOP.1',
    name: '1',
    attributes: [
      {
        label: 'Expected Number',
        name: 'EXP_NUMBER',
        required: true,
        uiType: Configurator.UiType.NOT_IMPLEMENTED,
        values: [],
      },
      {
        label: 'Processor',
        name: 'CPQ_CPU',
        required: true,
        selectedSingleValue: 'INTELI5_35',
        uiType: Configurator.UiType.RADIOBUTTON,
        values: [],
      },
    ],
  },
  {
    configurable: true,
    description: 'Peripherals & Accessories',
    groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
    id: '1-CPQ_LAPTOP.2',
    name: '2',
    attributes: [],
  },
  {
    configurable: true,
    description: 'Software',
    groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
    id: '1-CPQ_LAPTOP.3',
    name: '3',
    attributes: [],
  },
];

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
    return of(true);
  }
}
class MockConfiguratorGroupsService {
  getCurrentGroup() {
    return currentGroupObservable;
  }
  getNextGroup() {
    return of('');
  }
  getPreviousGroup() {
    return of('');
  }
  subscribeToUpdateConfiguration() {}
}
function checkConfigurationObs(
  component: ConfigFormComponent,
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
  component.ngOnInit();

  expect(component.configuration$).toBeObservable(
    cold(expectedMarbels, { x: configRead, y: configRead2 })
  );
}
function checkCurrentGroupObs(
  component: ConfigFormComponent,
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
  component.ngOnInit();

  expect(component.currentGroup$).toBeObservable(
    cold(expectedMarbels, { u: groups[0], v: groups[1] })
  );
}
describe('ConfigurationFormComponent', () => {
  let component: ConfigFormComponent;
  let configuratorCommonsService;
  let configuratorUtils: GenericConfigUtilsService;
  let fixture: ComponentFixture<ConfigFormComponent>;

  beforeEach(async(() => {
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
        ConfigPreviousNextButtonsComponent,
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
    fixture = TestBed.createComponent(ConfigFormComponent);
    component = fixture.componentInstance;
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    configuratorUtils.setOwnerKey(owner);
    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should not enforce a reload of the configuration per default', () => {
    spyOn(configuratorCommonsService, 'removeConfiguration').and.callThrough();
    routerStateObservable = of(mockRouterState);
    component.ngOnInit();
    expect(
      configuratorCommonsService.removeConfiguration
    ).toHaveBeenCalledTimes(0);
  });

  it('should enforce a reload of the configuration by removing the current one in case the router requires this', () => {
    spyOn(configuratorCommonsService, 'removeConfiguration').and.callThrough();
    mockRouterState.state.queryParams = { forceReload: 'true' };
    routerStateObservable = of(mockRouterState);
    component.ngOnInit();
    expect(
      configuratorCommonsService.removeConfiguration
    ).toHaveBeenCalledTimes(1);
  });

  it('should call service with update configuration', () => {
    spyOn(configuratorCommonsService, 'updateConfiguration').and.callThrough();
    const event: ConfigFormUpdateEvent = {
      productCode: PRODUCT_CODE,
      groupId: GROUP_ID_1,
      changedAttribute: groups[0].attributes[0],
    };
    component.updateConfiguration(event);
    expect(
      configuratorCommonsService.updateConfiguration
    ).toHaveBeenCalledTimes(1);
  });

  it('should only get the minimum needed 2 emissions of product configurations if router emits faster than commons service', () => {
    checkConfigurationObs(component, 'aa', '---xy', '----xy');
  });

  it('should get 3 emissions of product configurations if both services emit fast', () => {
    checkConfigurationObs(component, 'aa', 'xy', 'xxy');
  });

  it('should get the maximum 4 emissions of product configurations if router pauses between emissions', () => {
    checkConfigurationObs(component, 'a---a', 'xy', 'xy--xy');
  });

  it('should only get the minimum needed 2 emissions of current groups if group service emits slowly', () => {
    checkCurrentGroupObs(component, 'aa', '---uv', '----uv');
  });

  it('should get 4 emissions of current groups if configurations service emits fast', () => {
    checkCurrentGroupObs(component, 'a---a', '--uv', '--uv--uv');
  });

  it('should get the maximum 8 emissions of current groups if router and config service emit slowly', () => {
    checkCurrentGroupObs(component, 'a-----a', 'uv', 'uv----uv');
  });
});
