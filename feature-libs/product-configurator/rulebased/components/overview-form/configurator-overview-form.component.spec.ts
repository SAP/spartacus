import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FeatureLevelDirective,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { cold } from 'jasmine-marbles';
import { NEVER, Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewAttributeComponent } from '../overview-attribute/configurator-overview-attribute.component';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';
import { ConfiguratorOverviewFormComponent } from './configurator-overview-form.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const mockRouterState: any = ConfigurationTestData.mockRouterState;
const configId = '1234-56-7890';

const configCreate: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(configId, owner),
  overview: ConfigurationTestData.productConfiguration.overview,
};
const configCreate2: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration('1234-11111', owner),
  overview: ConfigurationTestData.productConfiguration.overview,
};
const configInitial: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(configId, owner),
  overview: {
    configId: ConfigurationTestData.CONFIG_ID,
    groups: [],
  },
};

let routerStateObservable: any;
let configurationObservable: any;
let overviewObservable: any;
let defaultConfigObservable: any;
let defaultRouterStateObservable: any;

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

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

describe('ConfigurationOverviewFormComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
        declarations: [
          ConfiguratorOverviewFormComponent,
          ConfiguratorOverviewAttributeComponent,
          FeatureLevelDirective,
          MockConfiguratorPriceComponent,
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

  it('should display ghost view, consisting of 3 elements representing groups, if no data is present', () => {
    defaultConfigObservable = NEVER;
    initialize();

    expect(htmlElem.querySelectorAll('.cx-ghost-group').length).toBe(3);
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
      ...ConfiguratorTestUtils.createConfiguration(
        configId,
        ConfiguratorModelUtils.createInitialOwner()
      ),
      overview: { configId: ConfigurationTestData.CONFIG_ID },
    };
    expect(component.hasAttributes(configWOOverviewGroups)).toBe(false);
  });

  it('should detect that a configuration w/o groups that carry attributes does not provide OV attributes', () => {
    initialize();
    const configWOOverviewAttributes: Configurator.Configuration = {
      ...ConfiguratorTestUtils.createConfiguration(
        configId,
        ConfiguratorModelUtils.createInitialOwner()
      ),
      overview: {
        configId: ConfigurationTestData.CONFIG_ID,
        groups: [{ id: 'GROUP1' }],
      },
    };
    expect(component.hasAttributes(configWOOverviewAttributes)).toBe(false);
  });

  describe('isSameAttribute', () => {
    it("should return 'false' because the attributes array is empty", () => {
      initialize();
      const attributes: Configurator.AttributeOverview[] = [];
      const result = component.isSameAttribute(attributes, 0);
      expect(result).toBe(false);
    });

    it("should return 'false' because it is not the same attribute", () => {
      initialize();
      const attributes: Configurator.AttributeOverview[] = [
        {
          attribute: 'C2',
          value: 'V2',
        },
      ];
      const result = component.isSameAttribute(attributes, 0);
      expect(result).toBe(false);
    });

    it("should return 'true' because it is the same attribute", () => {
      initialize();
      const attributes: Configurator.AttributeOverview[] = [
        {
          attribute: 'C2',
          value: 'V2',
        },
        {
          attribute: 'C2',
          value: 'V3',
        },
      ];
      let result = component.isSameAttribute(attributes, 0);
      expect(result).toBe(true);
      result = component.isSameAttribute(attributes, 1);
      expect(result).toBe(true);
    });
  });

  describe('getStyleClasses', () => {
    const generalAttributes: Configurator.AttributeOverview[] = [
      {
        attribute: 'C1',
        value: 'V1',
        type: Configurator.AttributeOverviewType.GENERAL,
      },
      {
        attribute: 'C1',
        value: 'V2',
        type: Configurator.AttributeOverviewType.GENERAL,
      },
      {
        attribute: 'C1',
        value: 'V4',
      },
    ];

    const bundleAttribute: Configurator.AttributeOverview[] = [
      {
        attribute: 'C1',
        value: 'V1',
        type: Configurator.AttributeOverviewType.BUNDLE,
      },
      {
        attribute: 'C1',
        value: 'V2',
        type: Configurator.AttributeOverviewType.BUNDLE,
      },
      {
        attribute: 'C1',
        value: 'V4',
      },
    ];

    it('should return general and margin classes for general attribute type', () => {
      initialize();
      const result = component.getStyleClasses(generalAttributes, 0);
      expect(result.includes('general')).toBe(true);
      expect(result.includes('bundle')).toBe(false);
      expect(result.includes('margin')).toBe(true);
      expect(result.includes('last-value-pair')).toBe(false);
    });

    it('should return only general class for general attribute type', () => {
      initialize();
      const result = component.getStyleClasses(generalAttributes, 1);
      expect(result.includes('general')).toBe(true);
      expect(result.includes('bundle')).toBe(false);
      expect(result.includes('margin')).toBe(false);
      expect(result.includes('last-value-pair')).toBe(false);
    });

    it('should return only last-value-pair class for general attribute type', () => {
      initialize();
      const result = component.getStyleClasses(generalAttributes, 2);
      expect(result.includes('general')).toBe(false);
      expect(result.includes('bundle')).toBe(false);
      expect(result.includes('margin')).toBe(false);
      expect(result.includes('last-value-pair')).toBe(true);
    });

    it('should return bundle and margin classes for bundle attribute type', () => {
      initialize();
      const result = component.getStyleClasses(bundleAttribute, 0);
      expect(result.includes('bundle')).toBe(true);
      expect(result.includes('general')).toBe(false);
      expect(result.includes('margin')).toBe(true);
      expect(result.includes('last-value-pair')).toBe(false);
    });

    it('should return only bundle class for bundle attribute type', () => {
      initialize();
      const result = component.getStyleClasses(bundleAttribute, 1);
      expect(result.includes('bundle')).toBe(true);
      expect(result.includes('general')).toBe(false);
      expect(result.includes('margin')).toBe(false);
      expect(result.includes('last-value-pair')).toBe(false);
    });

    it('should return only last-value-pair class for bundle attribute type', () => {
      initialize();
      const result = component.getStyleClasses(bundleAttribute, 2);
      expect(result.includes('bundle')).toBe(false);
      expect(result.includes('general')).toBe(false);
      expect(result.includes('margin')).toBe(false);
      expect(result.includes('last-value-pair')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      initialize();
    });

    it("should contain action span element with class name 'cx-visually-hidden' that hides element on the UI", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        0,
        undefined,
        undefined,
        'configurator.a11y.listOfAttributesAndValues'
      );
    });

    it("should contain action span element with class name 'cx-visually-hidden' that hides span element content on the UI", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        1,
        undefined,
        undefined,
        'configurator.a11y.group group:Group 1'
      );
    });

    it("should contain action h2 element with 'aria-hidden' attribute that removes h2 element from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'h2',
        undefined,
        0,
        'aria-hidden',
        'true',
        'Group 1'
      );
    });
  });
});
