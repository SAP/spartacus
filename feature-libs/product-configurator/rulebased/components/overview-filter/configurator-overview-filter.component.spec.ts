import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
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

let mockConfigCommonsService: ConfiguratorCommonsService;

let ovConfig: Configurator.ConfigurationWithOverview;

function initTestData() {
  ovConfig = structuredClone({
    ...ConfiguratorTestUtils.createConfiguration(configId, owner),
    overview: ConfigurationTestData.productConfiguration.overview,
  });
  ovConfig.overview.possibleGroups = structuredClone(ovConfig.overview.groups);
}

function initMocks() {
  mockConfigCommonsService = jasmine.createSpyObj([
    'updateConfigurationOverview',
  ]);
}

function initTestComponent() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  component.config = ovConfig;
  fixture.detectChanges();
}

describe('ConfiguratorOverviewFilterComponent', () => {
  describe('in a component test environment', () => {
    beforeEach(
      waitForAsync(() => {
        initTestData();
        initMocks();
        TestBed.configureTestingModule({
          imports: [I18nTestingModule],
          declarations: [ConfiguratorOverviewFilterComponent],
          providers: [
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
      ovConfig.overview.possibleGroups = [];
      initTestComponent();

      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-overview-filter-option',
        2 //2 default
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

    it('should update overview on change of filter option', () => {
      initTestComponent();
      fixture.debugElement
        .queryAll(By.css('.cx-overview-filter-option input'))
        .forEach((element) => {
          element.triggerEventHandler('change');
        });

      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledTimes(4); // Price Relevant, My Selections, Group 1, Group 2
    });

    describe('to support A11Y', () => {
      it('price filter label should be linked to checkbox', () => {
        initTestComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-option label',
          'for',
          'cx-configurator-overview-filter-option-price'
        );
      });

      it('price filter label should have a11y text', () => {
        initTestComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '#cx-configurator-overview-filter-option-price',
          'aria-label',
          'configurator.a11y.filterOverviewByPrice'
        );
      });

      it('my selections filter label should be linked to checkbox', () => {
        initTestComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-option label',
          'for',
          'cx-configurator-overview-filter-option-mySelections',
          1
        );
      });

      it('my selections filter label should have a11y text', () => {
        initTestComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '#cx-configurator-overview-filter-option-mySelections',
          'aria-label',
          'configurator.a11y.filterOverviewByMySelections'
        );
      });

      it('group filter label should be linked to checkbox', () => {
        initTestComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-option label',
          'for',
          'cx-configurator-overview-filter-option-group-1',
          2
        );
      });

      it('group filter label should have a11y text', () => {
        initTestComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '#cx-configurator-overview-filter-option-group-1',
          'aria-label',
          'configurator.a11y.filterOverviewByGroup groupName:Group 1'
        );
      });
    });
  });

  describe('in a unit test environment', () => {
    beforeEach(() => {
      initTestData();
      initMocks();
      component = new ConfiguratorOverviewFilterComponent(
        mockConfigCommonsService
      );
      component.config = ovConfig;
    });

    it('extractAttrFilterState should extract attribute filters state', () => {
      ovConfig.overview.attributeFilters = [
        Configurator.OverviewFilter.PRICE_RELEVANT,
      ];
      component['extractAttrFilterState'](ovConfig);
      expect(component.priceFilter.value).toBeTruthy();
      expect(component.mySelectionsFilter.value).toBeFalsy();
    });

    describe('extractGroupFilterState', () => {
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
    });

    it('ngOnChanges should extract filters state', () => {
      ovConfig.overview.attributeFilters = [
        Configurator.OverviewFilter.USER_INPUT,
      ];
      ovConfig.overview.groupFilters = ['1'];
      component.ngOnChanges();
      expect(component.priceFilter.value).toBeFalsy();
      expect(component.mySelectionsFilter.value).toBeTruthy();
      expect(component.groupFilters.length).toBe(2);
      expect(component.groupFilters[0].value).toBeTruthy();
      expect(component.groupFilters[1].value).toBeFalsy();
    });

    describe('collectAttrFilters', () => {
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
    });

    describe('collectGroupFilters', () => {
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
    });

    it('onFilter should call common configuration service', () => {
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

    it('createInputConfig should create input config', () => {
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
