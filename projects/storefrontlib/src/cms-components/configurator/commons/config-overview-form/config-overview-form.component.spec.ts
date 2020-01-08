import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  ConfiguratorCommonsService,
  GenericConfigurator,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConfigAttributeHeaderComponent } from '../config-attribute-header/config-attribute-header.component';
import { ConfigOverviewAttributeComponent } from '../config-overview-attribute/config-overview-attribute.component';
import { ConfigOverviewFormComponent } from './config-overview-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
  },
};

const owner: GenericConfigurator.Owner = {
  id: PRODUCT_CODE,
  type: GenericConfigurator.OwnerType.PRODUCT,
};

const configCreate: Configurator.Configuration = {
  configId: '1234-56-7890',
  owner: owner,
  overview: {
    groups: [
      {
        id: '1',
        groupDescription: 'Group 1',
        attributes: [
          {
            attribute: 'C1',
            value: 'V1',
          },
        ],
      },
      {
        id: '2',
        groupDescription: 'Group 2',
        attributes: [
          {
            attribute: 'C2',
            value: 'V2',
          },
          {
            attribute: 'C3',
            value: 'V3',
          },
        ],
      },
    ],
  },
};
let configCreate2: Configurator.Configuration = {
  configId: '1234-56-7890',
  owner: owner,
  overview: {
    groups: [
      {
        id: '1',
        groupDescription: 'Group 1',
        attributes: [
          {
            attribute: 'C1',
            value: 'V1',
          },
        ],
      },
      {
        id: '2',
        groupDescription: 'Group 2',
        attributes: [
          {
            attribute: 'C2',
            value: 'V2',
          },
          {
            attribute: 'C3',
            value: 'V3',
          },
        ],
      },
    ],
  },
};
const configInitial: Configurator.Configuration = {
  configId: '1235-56-7890',
  owner: owner,
  overview: {
    groups: [],
  },
};

let routerStateObservable = null;
let configurationObservable = null;
let overviewObservable = null;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable ? routerStateObservable : of(mockRouterState);
  }
}

class MockConfiguratorCommonsService {
  getOrCreateConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    configCreate.productCode = productCode;
    return configurationObservable
      ? configurationObservable
      : of(configCreate2);
  }
  getConfigurationWithOverview(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return overviewObservable ? overviewObservable : of(configuration);
  }
}

function checkConfigurationOverviewObs(
  component: ConfigOverviewFormComponent,
  routerMarbels: string,
  configurationMarbels: string,
  overviewMarbels: string,
  expectedMarbels: string
) {
  routerStateObservable = cold(routerMarbels, {
    a: mockRouterState,
  });
  configurationObservable = cold(configurationMarbels, {
    x: configCreate,
    y: configCreate2,
  });
  overviewObservable = cold(overviewMarbels, {
    u: configCreate,
    v: configCreate2,
  });
  component.ngOnInit();

  expect(component.configuration$).toBeObservable(
    cold(expectedMarbels, { u: configCreate, v: configCreate2 })
  );
}

describe('ConfigurationOverviewFormComponent', () => {
  let component: ConfigOverviewFormComponent;
  let fixture: ComponentFixture<ConfigOverviewFormComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [
        ConfigOverviewFormComponent,
        ConfigOverviewAttributeComponent,
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
    fixture = TestBed.createComponent(ConfigOverviewFormComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display configuration overview', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('.cx-config-overview-group').length).toBe(
      2
    );

    expect(
      htmlElem.querySelectorAll('cx-config-overview-attribute').length
    ).toBe(3);
  });

  it('should display no result text in case of empty configuration', () => {
    configCreate2 = configInitial;

    component.ngOnInit();
    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('.cx-config-overview-group').length).toBe(
      0
    );

    expect(
      htmlElem.querySelectorAll('cx-config-overview-attribute').length
    ).toBe(0);
  });

  it('should only get the minimum needed 2 emissions of overview if overview emits slowly', () => {
    checkConfigurationOverviewObs(
      component,
      'aa',
      '---xy',
      '---uv',
      '-------uv'
    );
  });

  it('should get 2 emissions of overview if configurations service emits fast', () => {
    checkConfigurationOverviewObs(component, 'a---a', 'xy', '--uv', '--uv');
  });

  it('should get 2 emissions of overview if router and config service emit slowly', () => {
    checkConfigurationOverviewObs(component, 'a-----a', '--x--y', 'uv', '--uv');
  });
});
