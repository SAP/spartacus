import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product/configurators/common';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../shared/testing/configurator-test-data';
import { ConfiguratorOverviewAttributeComponent } from '../overview-attribute/configurator-overview-attribute.component';
import { ConfiguratorOverviewFormComponent } from './configurator-overview-form.component';

const owner: CommonConfigurator.Owner =
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
let defaultRouterDataObservable;
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

class MockRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(defaultRouterDataObservable);
  }
}

class MockConfiguratorCommonsService {
  getOrCreateConfiguration(
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
  beforeEach(
    waitForAsync(() => {
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
    })
  );
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

    expect(htmlElem.querySelectorAll('.cx-group').length).toBe(2);

    expect(htmlElem.querySelectorAll('.cx-attribute-value-pair').length).toBe(
      3
    );
  });

  it('should display no result text in case of empty configuration', () => {
    defaultConfigObservable = of(configInitial);
    initialize();

    expect(htmlElem.querySelectorAll('.cx-group').length).toBe(0);

    expect(htmlElem.querySelectorAll('.cx-attribute-value-pair').length).toBe(
      0
    );

    expect(
      htmlElem.querySelectorAll('.cx-no-attribute-value-pairs').length
    ).toBe(1);
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

describe('ConfigurationOverviewFormComponent with forceReload', () => {
  let configuratorCommonsServiceMock: ConfiguratorCommonsService;
  const theOwner = {
    id: '1',
    type: CommonConfigurator.OwnerType.CART_ENTRY,
    configuratorType: 'cpqconfigurator',
  };
  beforeEach(
    waitForAsync(() => {
      const bed = TestBed.configureTestingModule({
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
          {
            provide: ConfiguratorRouterExtractorService,
            useClass: MockRouterExtractorService,
          },
        ],
      });
      configuratorCommonsServiceMock = bed.inject(ConfiguratorCommonsService);
      bed.compileComponents();
    })
  );
  beforeEach(() => {
    routerStateObservable = null;
    configurationObservable = null;
    overviewObservable = null;
    defaultRouterStateObservable = of(mockRouterState);
    defaultConfigObservable = of(configCreate2);
    defaultRouterDataObservable = {
      forceReload: true,
      owner: theOwner,
    };
  });

  it('should create component and call removeConfiguration', () => {
    spyOn(
      configuratorCommonsServiceMock,
      'removeConfiguration'
    ).and.callThrough();
    initialize();
    expect(component).toBeDefined();
    expect(
      configuratorCommonsServiceMock.removeConfiguration
    ).toHaveBeenCalledWith(theOwner);
  });
});
