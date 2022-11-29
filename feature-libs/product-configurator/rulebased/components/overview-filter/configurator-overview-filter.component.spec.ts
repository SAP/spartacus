import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { NEVER, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewFilterComponent } from './configurator-overview-filter.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const configId = '1234-56-7890';

let component: ConfiguratorOverviewFilterComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterComponent>;
let htmlElem: HTMLElement;

let mockConfigRouterService: ConfiguratorRouterExtractorService;
let mockConfigCommonsService: ConfiguratorCommonsService;

let ovConfig: Configurator.ConfigurationWithOverview;

function asSpy(f: any) {
  return <jasmine.Spy>f;
}

function initTestData() {
  ovConfig = structuredClone({
    ...ConfiguratorTestUtils.createConfiguration(configId, owner),
    overview: ConfigurationTestData.productConfiguration.overview,
  });
  ovConfig.overview.possibleGroups = structuredClone(ovConfig.overview.groups);
}

function initMocks() {
  mockConfigRouterService = jasmine.createSpyObj(['extractRouterData']);
  mockConfigCommonsService = jasmine.createSpyObj([
    'getConfiguration',
    'updateConfigurationOverview',
  ]);
  asSpy(mockConfigRouterService.extractRouterData).and.returnValue(
    of(ConfigurationTestData.mockRouterState)
  );
  asSpy(mockConfigCommonsService.getConfiguration).and.returnValue(
    of(ovConfig)
  );
}

function initTestComponent() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

describe('ConfiguratorOverviewFilterComponent', () => {
  describe('Component Test', () => {
    beforeEach(
      waitForAsync(() => {
        initTestData();
        initMocks();
        TestBed.configureTestingModule({
          imports: [I18nTestingModule],
          declarations: [ConfiguratorOverviewFilterComponent],
          providers: [
            {
              provide: ConfiguratorRouterExtractorService,
              useValue: mockConfigRouterService,
            },
            {
              provide: ConfiguratorCommonsService,
              useValue: mockConfigCommonsService,
            },
          ],
        }).compileComponents();
      })
    );

    it('should create component', () => {
      initTestComponent();
      expect(component).toBeDefined();
    });

    it('should render filter options', () => {
      initTestComponent();
      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-overview-filter-option',
        4 //2 default + 2 groups
      );
    });

    it('should render both filter headers', () => {
      initTestComponent();
      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-overview-filter-header',
        2
      );
    });

    it('should render always default options', () => {
      if (ovConfig.overview) ovConfig.overview.possibleGroups = [];
      initTestComponent();

      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-overview-filter-option',
        2 //2 default
      );
    });

    it('should not render anything if nothing has been emitted', () => {
      asSpy(mockConfigCommonsService.getConfiguration).and.returnValue(NEVER);
      initTestComponent();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-overview-filter-option, .cx-overview-filter-header'
      );
    });

    it('should render filter bar by default', () => {
      initTestComponent();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-overview-filter-bar'
      );
    });

    it('should hide filter bar if requested', () => {
      initTestComponent();
      component.showFilterBar = false;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-overview-filter-bar'
      );
    });
  });

  describe('Unit Test', () => {
    beforeEach(() => {
      initTestData();
      initMocks();
      component = new ConfiguratorOverviewFilterComponent(
        mockConfigCommonsService,
        mockConfigRouterService
      );
    });

    it('should extract attribute filters state', () => {
      ovConfig.overview.attributeFilters = [
        Configurator.OverviewFilter.PRICE_RELEVANT,
      ];
      component['extractAttrFilterState'](ovConfig);
      expect(component.priceFilter.value).toBeTruthy();
      expect(component.mySelectionsFilter.value).toBeFalsy();
    });

    it('should extract group filters state when all groups are selected', () => {
      ovConfig.overview.groupFilters = ['1', '2'];
      component['extractGroupFilterState'](ovConfig);
      expect(component.groupFilters.length).toBe(2);
      expect(component.groupFilters[0].value).toBeTruthy();
      expect(component.groupFilters[1].value).toBeTruthy();
    });

    it('should extract group filters state when no group is available', () => {
      ovConfig.overview.possibleGroups = [];
      component['extractGroupFilterState'](ovConfig);
      expect(component.groupFilters.length).toBe(0);
    });

    it('should collect attribute filters when nothing selected', () => {
      let attrFilters = component['collectAttrFilters']();
      expect(attrFilters).toEqual([]);
    });

    it('should collect attribute filters when all selected', () => {
      component.priceFilter.setValue(true);
      component.mySelectionsFilter.setValue(true);
      let attrFilters = component['collectAttrFilters']();
      expect(attrFilters).toEqual([
        Configurator.OverviewFilter.PRICE_RELEVANT,
        Configurator.OverviewFilter.USER_INPUT,
      ]);
    });

    it('should collect group filters when nothing selected', () => {
      let groupFilters = component['collectGroupFilters'](ovConfig.overview);
      expect(groupFilters).toEqual([]);
    });

    it('should collect group filters when one selected', () => {
      component.groupFilters = [
        new UntypedFormControl(false),
        new UntypedFormControl(true),
      ];
      let groupFilters = component['collectGroupFilters'](ovConfig.overview);
      expect(groupFilters).toEqual(['2']);
    });

    it('on filter should call common configuration service', () => {
      component.mySelectionsFilter.setValue(true);
      component.groupFilters = [
        new UntypedFormControl(false),
        new UntypedFormControl(true),
      ];
      component.onFilter(ovConfig);
      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledWith({
        ...ovConfig,
        overview: {
          configId: ovConfig.configId,
          productCode: ovConfig.productCode,
          attributeFilters: [Configurator.OverviewFilter.USER_INPUT],
          groupFilters: ['2'],
          possibleGroups: ovConfig.overview.possibleGroups,
        },
      });
    });

    it('should create input config', () => {
      let inputConfig = component['createInputConfig'](
        ovConfig,
        [Configurator.OverviewFilter.PRICE_RELEVANT],
        ['3', '5']
      );
      expect(inputConfig).toEqual({
        ...ovConfig,
        overview: {
          configId: ovConfig.configId,
          productCode: ovConfig.productCode,
          attributeFilters: [Configurator.OverviewFilter.PRICE_RELEVANT],
          groupFilters: ['3', '5'],
          possibleGroups: ovConfig.overview.possibleGroups,
        },
      });
    });
  });
});
