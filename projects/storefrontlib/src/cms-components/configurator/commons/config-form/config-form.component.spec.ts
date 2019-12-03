import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  ConfigUtilsService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConfigAttributeFooterComponent } from '../config-attribute-footer/config-attribute-footer.component';
import { ConfigAttributeHeaderComponent } from '../config-attribute-header/config-attribute-header.component';
import { ConfigAttributeDropDownComponent } from '../config-attribute-types/config-attribute-drop-down/config-attribute-drop-down.component';
import { ConfigAttributeInputFieldComponent } from '../config-attribute-types/config-attribute-input-field/config-attribute-input-field.component';
import { ConfigAttributeRadioButtonComponent } from '../config-attribute-types/config-attribute-radio-button/config-attribute-radio-button.component';
import { ConfigAttributeReadOnlyComponent } from '../config-attribute-types/config-attribute-read-only/config-attribute-read-only.component';
import { ConfigPreviousNextButtonsComponent } from '../config-previous-next-buttons/config-previous-next-buttons.component';
import { ConfigFormComponent } from './config-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: Configurator.OwnerType.PRODUCT,
    },
  },
};
const owner: Configurator.Owner = {
  id: PRODUCT_CODE,
  type: Configurator.OwnerType.PRODUCT,
};
const configRead: Configurator.Configuration = {
  configId: 'a',
  consistent: true,
  complete: true,
  productCode: PRODUCT_CODE,
  owner: owner,
};

const configRead2: Configurator.Configuration = {
  configId: 'b',
  consistent: true,
  complete: true,
  productCode: PRODUCT_CODE,
  owner: owner,
};

const configCreate: Configurator.Configuration = {
  configId: '1234-56-7890',
  owner: owner,
  groups: [
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
  ],
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

let routerStateObservable = null;
let configurationObservable = null;
let configurationCreateObservable = null;
let currentGroupObservable = null;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

class MockConfiguratorCommonsService {
  createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    configCreate.productCode = productCode;
    return of(configCreate);
  }
  getConfiguration(): Observable<Configurator.Configuration> {
    return configurationObservable;
  }
  getOrCreateConfiguration(): Observable<Configurator.Configuration> {
    return configurationCreateObservable;
  }
  hasConfiguration(): Observable<boolean> {
    return of(false);
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
  configurationServiceMarbels: string,
  groupMarbels: string,
  expectedMarbels: string
) {
  routerStateObservable = cold(routerMarbels, {
    a: mockRouterState,
  });
  configurationObservable = cold(configurationServiceMarbels, {
    x: configRead,
    y: configRead2,
  });
  currentGroupObservable = cold(groupMarbels, {
    u: 'group1',
    v: 'group2',
  });
  component.ngOnInit();

  expect(component.currentGroup$).toBeObservable(
    cold(expectedMarbels, { u: 'group1', v: 'group2' })
  );
}
describe('ConfigurationFormComponent', () => {
  let component: ConfigFormComponent;
  let configuratorUtils: ConfigUtilsService;
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
    configuratorUtils = TestBed.get(ConfigUtilsService as Type<
      ConfigUtilsService
    >);
    configuratorUtils.setOwnerKey(owner);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
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
    checkCurrentGroupObs(component, 'aa', '---xy', '---uv', '--------uv');
  });

  it('should get 4 emissions of current groups if configurations service emits fast', () => {
    checkCurrentGroupObs(component, 'a---a', 'xy', '--uv', '---uv--uv');
  });

  it('should get the maximum 8 emissions of current groups if router and config service emit slowly', () => {
    checkCurrentGroupObs(component, 'a-----a', '--x--y', 'uv', '--uv-uv-uv-uv');
  });
});
