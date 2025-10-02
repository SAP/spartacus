import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewFilterComponent } from './configurator-overview-filter.component';
import { ConfiguratorStorefrontUtilsService } from '@spartacus/product-configurator/rulebased';
import { Observable, of } from 'rxjs';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const configId = '1234-56-7890';

let component: ConfiguratorOverviewFilterComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterComponent>;
let htmlElem: HTMLElement;

let mockConfigCommonsService: ConfiguratorCommonsService;
let overview: Configurator.ConfigurationWithOverview;
const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';
const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
    semanticRoute: CONFIGURATOR_ROUTE,
  },
};

function initTestData() {
  overview = structuredClone({
    ...ConfiguratorTestUtils.createConfiguration(configId, owner),
    overview: ConfigurationTestData.productConfiguration.overview,
  });
  overview.overview.possibleGroups = structuredClone(overview.overview.groups);
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
  component.config = overview;
  isDisplayOnlyVariant = false;
  component.ngOnChanges();
  fixture.detectChanges();
}

@Component({
  selector: 'cx-configurator-overview-filter-bar',
  template: '',
  imports: [I18nTestingModule, ReactiveFormsModule],
})
class MockConfiguratorOverviewFilterBarComponent {
  @Input() config: Configurator.ConfigurationWithOverview;
}

let isDisplayOnlyVariant: boolean;
class MockConfiguratorStorefrontUtilsService {
  isDisplayOnlyVariant(): Observable<boolean> {
    return of(isDisplayOnlyVariant);
  }
}

describe('ConfiguratorOverviewFilterComponent', () => {
  function configureTestingModule(): TestBed {
    mockRouterState.state.params.displayOnly = false;

    return TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ReactiveFormsModule,
        ConfiguratorOverviewFilterComponent,
        MockConfiguratorOverviewFilterBarComponent,
      ],
      providers: [
        {
          provide: ConfiguratorCommonsService,
          useValue: mockConfigCommonsService,
        },
        {
          provide: ConfiguratorStorefrontUtilsService,
          useClass: MockConfiguratorStorefrontUtilsService,
        },
      ],
    });
  }

  beforeEach(waitForAsync(() => {
    initTestData();
    initMocks();
    configureTestingModule().compileComponents();
    initTestComponent();
  }));

  describe('in a component test environment', () => {
    it('should create component', () => {
      expect(component).toBeDefined();
    });

    it('should render filter options', () => {
      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-overview-filter-option',
        4 //2 default + 2 groups
      );
    });

    it('should render both filter headers', () => {
      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-overview-filter-header',
        2
      );
    });

    it('should render one filter header for variant', () => {
      mockRouterState.state.params.displayOnly = true;
      mockRouterState.state.queryParams.productCode = PRODUCT_CODE;
      isDisplayOnlyVariant = true;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-overview-filter-header',
        1
      );
    });

    it('should render `No filters available` text', () => {
      mockRouterState.state.params.displayOnly = true;
      mockRouterState.state.queryParams.productCode = PRODUCT_CODE;
      isDisplayOnlyVariant = true;
      overview.overview.possibleGroups = [{ id: '1' }];
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-no-overview-filters-available'
      );
    });

    it('should always render default options', () => {
      overview.overview.possibleGroups = [];
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-overview-filter-option',
        2 //2 default
      );
    });

    it('should not render any filter options for read-only variants', () => {
      mockRouterState.state.params.displayOnly = true;
      mockRouterState.state.queryParams.productCode = PRODUCT_CODE;
      isDisplayOnlyVariant = true;
      overview.overview.possibleGroups = [];
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-overview-filter-option'
      );
    });

    it('should render filter bar by default', () => {
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-overview-filter-bar'
      );
    });

    it('should hide filter bar if requested', () => {
      component.showFilterBar = false;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-overview-filter-bar'
      );
    });

    it('should update overview on change of filter option', () => {
      fixture.debugElement
        .queryAll(By.css('.cx-overview-filter-option input'))
        .forEach((element) => {
          element.nativeElement.dispatchEvent(new InputEvent('change'));
        });

      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledTimes(4); // Price Relevant, My Selections, Group 1, Group 2
    });

    describe('to support A11Y', () => {
      it('price filter label should be linked to checkbox', () => {
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-option label',
          'for',
          'cx-configurator-overview-filter-option-price'
        );
      });

      it('price filter label should have a11y text', () => {
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '#cx-configurator-overview-filter-option-price',
          'aria-label',
          'configurator.a11y.filterOverviewByPrice'
        );
      });

      it('my selections filter label should be linked to checkbox', () => {
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
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '#cx-configurator-overview-filter-option-mySelections',
          'aria-label',
          'configurator.a11y.filterOverviewByMySelections'
        );
      });

      it('group filter label should be linked to checkbox', () => {
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
    it('extractAttrFilterState should extract attribute filters state', () => {
      overview.overview.attributeFilters = [
        Configurator.OverviewFilter.PRICE_RELEVANT,
      ];
      component['extractAttrFilterState'](overview);
      expect(component.priceFilter.value).toBeTruthy();
      expect(component.mySelectionsFilter.value).toBeFalsy();
    });

    describe('extractGroupFilterState', () => {
      it('should extract group filters state when all groups are selected', () => {
        overview.overview.groupFilters = ['1', '2'];
        component['extractGroupFilterState'](overview);
        expect(component.groupFilters.length).toBe(2);
        expect(component.groupFilters[0].value).toBeTruthy();
        expect(component.groupFilters[1].value).toBeTruthy();
      });

      it('should extract group filters state when no group is available', () => {
        overview.overview.possibleGroups = [];
        component['extractGroupFilterState'](overview);
        expect(component.groupFilters.length).toBe(0);
      });
    });

    it('ngOnChanges should extract filters state', () => {
      overview.overview.attributeFilters = [
        Configurator.OverviewFilter.USER_INPUT,
      ];
      overview.overview.groupFilters = ['1'];
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
        let groupFilters = component['collectGroupFilters'](overview.overview);
        expect(groupFilters).toEqual([]);
      });

      it('should collect group filters when one selected', () => {
        component.groupFilters = [
          new UntypedFormControl(false),
          new UntypedFormControl(true),
        ];
        let groupFilters = component['collectGroupFilters'](overview.overview);
        expect(groupFilters).toEqual(['2']);
      });
    });

    it('onFilter should call common configuration service', () => {
      component.mySelectionsFilter.setValue(true);
      component.groupFilters = [
        new UntypedFormControl(false),
        new UntypedFormControl(true),
      ];
      component.onFilter(overview);
      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledWith({
        ...overview,
        overview: {
          configId: overview.configId,
          productCode: overview.productCode,
          attributeFilters: [Configurator.OverviewFilter.USER_INPUT],
          groupFilters: ['2'],
          possibleGroups: overview.overview.possibleGroups,
        },
      });
    });

    it('createInputConfig should create input config', () => {
      let inputConfig = component['createInputConfig'](
        overview,
        [Configurator.OverviewFilter.PRICE_RELEVANT],
        ['3', '5']
      );
      expect(inputConfig).toEqual({
        ...overview,
        overview: {
          configId: overview.configId,
          productCode: overview.productCode,
          attributeFilters: [Configurator.OverviewFilter.PRICE_RELEVANT],
          groupFilters: ['3', '5'],
          possibleGroups: overview.overview.possibleGroups,
        },
      });
    });
  });
});
