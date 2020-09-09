import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  GenericConfigurator,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import * as ConfigurationTestData from '../../shared/testing/configurator-test-data';
import { ConfiguratorOverviewAttributeComponent } from '../overview-attribute/configurator-overview-attribute.component';
import { ConfiguratorOverviewFormComponent } from './configurator-overview-form.component';

const owner: GenericConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const mockRouterState: any = ConfigurationTestData.mockRouterState;
const configId = '1234-56-7890';

const configCreate: Configurator.Configuration = {
  configId: configId,
  owner: owner,
  overview: ConfigurationTestData.productConfiguration.overview,
};
const configCreate2: Configurator.Configuration = {
  configId: '1234-11111',
  owner: owner,
  overview: ConfigurationTestData.productConfiguration.overview,
};
const configInitial: Configurator.Configuration = {
  configId: configId,
  owner: owner,
  overview: {
    groups: [],
  },
};

let routerStateObservable;
let configurationObservable;
let overviewObservable;
let defaultConfigObservable;
let defaultRouterStateObservable;
let component: ConfiguratorOverviewFormComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFormComponent>;
let htmlElem: HTMLElement;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    const obs: Observable<RouterState> = routerStateObservable
      ? routerStateObservable
      : defaultRouterStateObservable;
    return obs;
  }
}

class MockConfiguratorCommonsService {
  getConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    configCreate.productCode = productCode;
    const obs: Observable<Configurator.Configuration> = configurationObservable
      ? configurationObservable
      : defaultConfigObservable;
    return obs;
  }
  getConfigurationWithOverview(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const obs: Observable<Configurator.Configuration> = overviewObservable
      ? overviewObservable
      : of(configuration);
    return obs;
  }
  removeConfiguration(): void {}
}

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFormComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
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
        ConfiguratorOverviewFormComponent,
        ConfiguratorOverviewAttributeComponent,
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
    routerStateObservable = null;
    configurationObservable = null;
    overviewObservable = null;
    defaultRouterStateObservable = of(mockRouterState);
    defaultConfigObservable = of(configCreate2);
  });

  it('should create component', () => {
    initialize();
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
    checkConfigurationOverviewObs('aa', '---xy', '---uv', '--------uv');
  });

  it('should get 4 emissions of overview if configurations service emits fast', () => {
    checkConfigurationOverviewObs('a---a', 'xy', '--uv', '---uv--uv');
  });

  it('should know if a configuration OV has attributes', () => {
    initialize();
    expect(component.hasAttributes(configCreate)).toBe(true);
  });

  it('should detect that a configuration w/o groups has no attributes', () => {
    initialize();
    const configWOOverviewGroups: Configurator.Configuration = {
      configId: configId,
      overview: {},
    };
    expect(component.hasAttributes(configWOOverviewGroups)).toBe(false);
  });

  it('should detect that a configuration w/o groups that carry attributes does not provide OV attributes', () => {
    initialize();
    const configWOOverviewAttributes: Configurator.Configuration = {
      configId: configId,
      overview: { groups: [{ id: 'GROUP1' }] },
    };
    expect(component.hasAttributes(configWOOverviewAttributes)).toBe(false);
  });
});
