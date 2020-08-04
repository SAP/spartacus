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
import * as ConfigurationTestData from '../../shared/testing/configuration-test-data';
import { ConfigOverviewAttributeComponent } from '../config-overview-attribute/config-overview-attribute.component';
import { ConfigOverviewFormComponent } from './config-overview-form.component';

const owner: GenericConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const mockRouterState: any = ConfigurationTestData.mockRouterState;

const configCreate: Configurator.Configuration = {
  configId: '1234-56-7890',
  owner: owner,
  overview: ConfigurationTestData.productConfiguration.overview,
};
const configCreate2: Configurator.Configuration = {
  configId: '1234-56-7890',
  owner: owner,
  overview: ConfigurationTestData.productConfiguration.overview,
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
let defaultConfigObservable = null;
let component: ConfigOverviewFormComponent;
let fixture: ComponentFixture<ConfigOverviewFormComponent>;
let htmlElem: HTMLElement;

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
      : defaultConfigObservable;
  }
  getConfigurationWithOverview(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return overviewObservable ? overviewObservable : of(configuration);
  }
  removeConfiguration(): void {}
}

function initialize() {
  fixture = TestBed.createComponent(ConfigOverviewFormComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
}

function checkConfigurationOverviewObs(
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
  initialize();
  expect(component.configuration$).toBeObservable(
    cold(expectedMarbels, { u: configCreate, v: configCreate2 })
  );
}

describe('ConfigurationOverviewFormComponent', () => {
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
    }).compileComponents();
  }));
  beforeEach(() => {
    initialize();

    routerStateObservable = null;
    configurationObservable = null;
    overviewObservable = null;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display configuration overview', () => {
    defaultConfigObservable = of(configCreate2);
    initialize();

    expect(htmlElem.querySelectorAll('.cx-config-overview-group').length).toBe(
      2
    );

    expect(
      htmlElem.querySelectorAll('cx-config-overview-attribute').length
    ).toBe(3);
  });

  it('should display no result text in case of empty configuration', () => {
    defaultConfigObservable = of(configInitial);
    initialize();

    expect(htmlElem.querySelectorAll('.cx-config-overview-group').length).toBe(
      0
    );

    expect(
      htmlElem.querySelectorAll('cx-config-overview-attribute').length
    ).toBe(0);
  });

  it('should only get the minimum needed 2 emissions of overview if overview emits slowly', () => {
    checkConfigurationOverviewObs('aa', '---xy', '---uv', '-------uv');
  });

  it('should get 2 emissions of overview if configurations service emits fast', () => {
    checkConfigurationOverviewObs('a---a', 'xy', '--uv', '--uv');
  });

  it('should get 2 emissions of overview if router and config service emit slowly', () => {
    checkConfigurationOverviewObs('a-----a', '--x--y', 'uv', '--uv');
  });
});
