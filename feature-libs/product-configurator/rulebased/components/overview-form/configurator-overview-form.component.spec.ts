import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { getTestScheduler } from 'jasmine-marbles';
import { NEVER, Observable, delay, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewAttributeComponent } from '../overview-attribute/configurator-overview-attribute.component';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfiguratorOverviewFormComponent } from './configurator-overview-form.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const mockRouterState: any = ConfigurationTestData.mockRouterState;
const configId = '1234-56-7890';
const OV_GROUP_ID = 'A--B-ovGroup';
const OV_GROUP_ID_2 = 'C--D-ovGroup';
const OV_ATTRIBUTE: Configurator.AttributeOverview = {
  attribute: 'Colour',
  value: 'RED',
};

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
    productCode: '',
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
    return routerStateObservable
      ? routerStateObservable
      : defaultRouterStateObservable;
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

class MockConfiguratorStorefrontUtilsService {
  createOvGroupId(): string {
    return OV_GROUP_ID;
  }

  getPrefixId(idPrefix: string | undefined, groupId: string): string {
    return idPrefix ? idPrefix + '--' + groupId : groupId;
  }
}

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFormComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  component.ghostStyle = false;
  fixture.detectChanges();
}

function checkConfigurationOverviewObs(
  routerMarbels: string,
  configurationMarbels: string,
  overviewMarbels: string,
  expectedMarbels: string
) {
  const scheduler = getTestScheduler();
  scheduler.run((helpers) => {
    routerStateObservable = helpers.cold(routerMarbels, {
      a: mockRouterState,
    });
    configurationObservable = helpers.cold(configurationMarbels, {
      x: configCreate,
      y: configCreate2,
    });
    overviewObservable = helpers.cold(overviewMarbels, {
      u: configCreate,
      v: configCreate2,
    });
    initialize();
    helpers
      .expectObservable(component.configuration$)
      .toBe(expectedMarbels, { u: configCreate, v: configCreate2 });
  });
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
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfiguratorStorefrontUtilsService,
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

  it('should display configuration overview', (done) => {
    defaultConfigObservable = of(configCreate2);
    initialize();
    component.configuration$.pipe(delay(0)).subscribe(() => {
      fixture.detectChanges();
      expect(htmlElem.querySelectorAll('.cx-group').length).toBe(10);

      expect(htmlElem.querySelectorAll('.cx-attribute-value-pair').length).toBe(
        11
      );
      done();
    });
  });

  it('should display no result text in case of empty configuration', (done) => {
    defaultConfigObservable = of(configInitial);
    initialize();
    component.configuration$.pipe(delay(0)).subscribe(() => {
      fixture.detectChanges();
      expect(htmlElem.querySelectorAll('.cx-group').length).toBe(0);

      expect(htmlElem.querySelectorAll('.cx-attribute-value-pair').length).toBe(
        0
      );

      expect(
        htmlElem.querySelectorAll('.cx-no-attribute-value-pairs').length
      ).toBe(1);
      done();
    });
  });

  it('should only get the minimum needed 2 emissions of overview if overview emits slowly', () => {
    checkConfigurationOverviewObs('aa', '---xy', '---uv', '--------uv');
  });

  it('should get 4 emissions of overview if configurations service emits fast', () => {
    checkConfigurationOverviewObs('a---a', 'xy', '--uv', '---uv--uv');
  });

  describe('hasAttributes', () => {
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
        overview: {
          configId: ConfigurationTestData.CONFIG_ID,
          productCode: ConfigurationTestData.PRODUCT_CODE,
        },
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
          productCode: ConfigurationTestData.PRODUCT_CODE,
          groups: [{ id: OV_GROUP_ID }],
        },
      };
      expect(component.hasAttributes(configWOOverviewAttributes)).toBe(false);
    });
  });

  describe('hasGroupWithAttributes', () => {
    it('should return true if one first level group has attributes', () => {
      initialize();
      const ovGroups: Configurator.GroupOverview[] = [
        { id: OV_GROUP_ID, attributes: [OV_ATTRIBUTE] },
      ];
      expect(component['hasGroupWithAttributes'](ovGroups)).toBe(true);
    });

    it('should return false if no groups provided', () => {
      initialize();
      expect(component['hasGroupWithAttributes'](undefined)).toBe(false);
    });

    it('should return false if only first level groups exist but no attributes present', () => {
      initialize();
      const ovGroups: Configurator.GroupOverview[] = [
        { id: OV_GROUP_ID },
        { id: OV_GROUP_ID_2 },
      ];
      expect(component['hasGroupWithAttributes'](ovGroups)).toBe(false);
    });

    it('should return true if no first level attribute group has attributes but attributes exist on second level', () => {
      initialize();
      const ovGroups: Configurator.GroupOverview[] = [
        {
          id: OV_GROUP_ID,
          subGroups: [{ id: OV_GROUP_ID_2, attributes: [OV_ATTRIBUTE] }],
        },
      ];
      expect(component['hasGroupWithAttributes'](ovGroups)).toBe(true);
    });
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

  describe('getPrefixId', () => {
    it('should return group ID string', () => {
      initialize();
      expect(component.getPrefixId(undefined, 'BBB')).toBe('BBB');
    });

    it('should return prefix ID separated by 2 dashes and group ID string', () => {
      initialize();
      expect(component.getPrefixId('AAA', 'BBB')).toBe('AAA--BBB');
    });
  });

  describe('getGroupId', () => {
    it('should dispatch request to utils service', () => {
      initialize();
      expect(component.getGroupId('A', 'B')).toBe(OV_GROUP_ID);
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

    it("should contain action span element with class name 'cx-visually-hidden' that hides element on the UI", (done) => {
      component.configuration$.pipe(delay(0)).subscribe(() => {
        fixture.detectChanges();
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
        done();
      });
    });

    it("should contain action span element with class name 'cx-visually-hidden' that hides span element content on the UI", (done) => {
      component.configuration$.pipe(delay(0)).subscribe(() => {
        fixture.detectChanges();
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
        done();
      });
    });

    it("should contain action h2 element with 'aria-hidden' attribute that removes h2 element from the accessibility tree", (done) => {
      component.configuration$.pipe(delay(0)).subscribe(() => {
        fixture.detectChanges();
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
        done();
      });
    });
  });

  describe('getGroupLevelStyleClasses', () => {
    const group: Configurator.GroupOverview = {
      id: 'G1',
      groupDescription: 'Group 1',
    };

    const groupWithSubgroups: Configurator.GroupOverview = {
      id: 'G1',
      groupDescription: 'Group 1',
      subGroups: [
        {
          id: 'SG1',
          groupDescription: 'Subgroup 1',
        },
        {
          id: 'SG2',
          groupDescription: 'Subgroup 2',
        },
      ],
    };

    it('should return top level style class without subgroup', () => {
      initialize();
      const result = component.getGroupLevelStyleClasses(1, group.subGroups);
      expect(result).toEqual('cx-group topLevel');
    });

    it('should return top level style class with subgroup', () => {
      initialize();
      const result = component.getGroupLevelStyleClasses(
        1,
        groupWithSubgroups.subGroups
      );
      expect(result).toEqual('cx-group topLevel subgroupTopLevel');
    });

    it('should return subgroup level 2 style class', () => {
      initialize();
      const result = component.getGroupLevelStyleClasses(
        2,
        groupWithSubgroups.subGroups
      );
      expect(result).toEqual('cx-group subgroup subgroupLevel2');
    });

    it('should return subgroup level 3 style class', () => {
      initialize();
      const result = component.getGroupLevelStyleClasses(3, group.subGroups);
      expect(result).toEqual('cx-group subgroup subgroupLevel3');
    });
  });
});
