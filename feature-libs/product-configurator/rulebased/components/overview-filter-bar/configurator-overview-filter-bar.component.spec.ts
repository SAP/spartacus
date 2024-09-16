import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewFilterBarComponent } from './configurator-overview-filter-bar.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const configId = '1234-56-7890';

const PRICE_RELEVANT = Configurator.OverviewFilter.PRICE_RELEVANT;
const MY_SELECTIONS = Configurator.OverviewFilter.USER_INPUT;
const PREFIX_ID = 'cx-overview-filter-applied-';
const FIRST_FILTER_CHECKBOX_ID = 'cx-configurator-overview-filter-option-price';

let component: ConfiguratorOverviewFilterBarComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterBarComponent>;
let htmlElem: HTMLElement;
let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;

let mockConfigCommonsService: ConfiguratorCommonsService;

let config: Configurator.Configuration;
let ovConfig: Configurator.ConfigurationWithOverview;
let expectedInputConfig: Configurator.ConfigurationWithOverview;

function initTestData() {
  config = ConfiguratorTestUtils.createConfiguration(configId, owner);
  ovConfig = structuredClone({
    ...config,
    overview: ConfigurationTestData.productConfiguration.overview,
  });
  ovConfig.overview.possibleGroups = structuredClone(ovConfig.overview.groups);
  expectedInputConfig = {
    ...config,
    overview: {
      configId: config.configId,
      productCode: config.productCode,
      attributeFilters: [],
      groupFilters: [],
      possibleGroups: structuredClone(ovConfig.overview.groups),
    },
  };
}
function initMocks() {
  mockConfigCommonsService = jasmine.createSpyObj([
    'updateConfigurationOverview',
  ]);
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}
class MockConfigUtilsService {
  getElement(): void {}
}

describe('ConfiguratorOverviewFilterBarComponent', () => {
  beforeEach(waitForAsync(() => {
    initTestData();
    initMocks();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        ConfiguratorOverviewFilterBarComponent,
        MockCxIconComponent,
      ],
      providers: [
        {
          provide: ConfiguratorCommonsService,
          useValue: mockConfigCommonsService,
        },
        {
          provide: ConfiguratorStorefrontUtilsService,
          useClass: MockConfigUtilsService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorOverviewFilterBarComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    component.config = ovConfig;
    fixture.detectChanges();
    configuratorStorefrontUtilsService = TestBed.inject(
      ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
    );
  });
  describe('in a component test environment', () => {
    it('should create component', () => {
      expect(component).toBeDefined();
    });

    it('should render Price Relevant filter removal button', () => {
      ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-overview-filter-applied',
        'configurator.overviewFilter.byPrice'
      );
    });

    it('should render my Selections filter removal button', () => {
      ovConfig.overview.attributeFilters = [MY_SELECTIONS];
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-overview-filter-applied',
        'configurator.overviewFilter.mySelections'
      );
    });

    it('should render group filter removal button', () => {
      ovConfig.overview.groupFilters = ['1', '2'];
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-overview-filter-applied',
        'Group 1',
        0
      );

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-overview-filter-applied',
        'Group 2',
        1
      );
    });

    it('should render remove all button component if there are 2 or more filters active', () => {
      ovConfig.overview.attributeFilters = [MY_SELECTIONS];
      ovConfig.overview.groupFilters = ['1'];
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-overview-filter-applied',
        'configurator.overviewFilter.removeAll',
        2
      );
    });

    it('should trigger overview update on filter removal click', () => {
      ovConfig.overview.attributeFilters = [MY_SELECTIONS];
      ovConfig.overview.groupFilters = ['1'];
      fixture.detectChanges();

      fixture.debugElement
        .queryAll(By.css('.cx-overview-filter-applied'))
        .forEach((element) => {
          element.triggerEventHandler('click');
        });

      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledTimes(3); // My Selections, Group 1, Remove All
    });

    it('should activate the remove my selections button with Delete key', () => {
      ovConfig.overview.attributeFilters = [MY_SELECTIONS];
      fixture.detectChanges();

      let buttonEl = fixture.debugElement.query(
        By.css('#cx-overview-filter-applied-USER_INPUT')
      );
      spyOn(component, 'onAttrFilterRemove');

      const event = new KeyboardEvent('keydown', {
        key: 'Delete',
      });
      buttonEl.nativeElement.dispatchEvent(event);

      expect(component.onAttrFilterRemove).toHaveBeenCalledWith(
        ovConfig,
        ovConfig.overview.attributeFilters[0]
      );
    });

    describe('to support A11Y', () => {
      it('the button to remove the price filter should have a descriptive title', () => {
        ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-applied',
          'title',
          'configurator.overviewFilter.removeByPrice',
          0
        );
      });

      it('the button to remove the my selection filter should have a descriptive title', () => {
        ovConfig.overview.attributeFilters = [MY_SELECTIONS];
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-applied',
          'title',
          'configurator.overviewFilter.removeMySelections',
          0
        );
      });

      it('the button to remove all filters should have a descriptive title', () => {
        ovConfig.overview.attributeFilters = [MY_SELECTIONS];
        ovConfig.overview.groupFilters = ['1'];
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-applied',
          'title',
          'configurator.overviewFilter.removeAllFilters',
          2
        );
      });

      it('the button to remove a group filter should have a descriptive title', () => {
        ovConfig.overview.groupFilters = ['1'];
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-overview-filter-applied',
          'title',
          'configurator.overviewFilter.removeByGroup group:Group 1',
          0
        );
      });
    });
  });

  describe('in a unit test environment', () => {
    describe('getGroupFilterDescription', () => {
      it('should return description for existing group', () => {
        expect(
          component.getGroupFilterDescription(ovConfig.overview, '2')
        ).toEqual('Group 2');
      });

      it('should return empty string for non existing group', () => {
        expect(
          component.getGroupFilterDescription(ovConfig.overview, 'x')
        ).toEqual('');
      });
    });

    it('onAttrFilterRemove should call service with adapted attribute filter', () => {
      ovConfig.overview.attributeFilters = [PRICE_RELEVANT, MY_SELECTIONS];
      expectedInputConfig.overview.attributeFilters = [PRICE_RELEVANT];
      component.onAttrFilterRemove(ovConfig, MY_SELECTIONS);
      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledWith(expectedInputConfig);
    });

    it('onGroupFilterRemove should call service with adapted group filter', () => {
      ovConfig.overview.groupFilters = ['1', '3'];
      expectedInputConfig.overview.groupFilters = ['3'];
      component.onGroupFilterRemove(ovConfig, '1');
      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledWith(expectedInputConfig);
    });

    it('onRemoveAll should call service with empty filters', () => {
      ovConfig.overview.groupFilters = ['1', '3'];
      ovConfig.overview.attributeFilters = [PRICE_RELEVANT, MY_SELECTIONS];
      expectedInputConfig.overview.groupFilters = [];
      expectedInputConfig.overview.attributeFilters = [];
      component.onRemoveAll(ovConfig);
      expect(
        mockConfigCommonsService.updateConfigurationOverview
      ).toHaveBeenCalledWith(expectedInputConfig);
    });

    describe('isShowRemoveAll', () => {
      it('should return false if only one filter applied', () => {
        ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
        expect(component.isShowRemoveAll(ovConfig.overview)).toBeFalsy();
      });

      it('should return true if two filters are applied', () => {
        ovConfig.overview.groupFilters = ['1'];
        ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
        expect(component.isShowRemoveAll(ovConfig.overview)).toBeTruthy();
      });
    });

    it('createInputConfig should create input config', () => {
      let inputConfig = component['createInputConfig'](
        ovConfig,
        [PRICE_RELEVANT],
        ['3', '5']
      );
      expectedInputConfig.overview.attributeFilters = [PRICE_RELEVANT];
      expectedInputConfig.overview.groupFilters = ['3', '5'];

      expect(inputConfig).toEqual(expectedInputConfig);
    });

    describe('getNextElementIdToFocusForAttributeFilter', () => {
      it('should return the element ID if indexOfRemoved is less than the length of attrFilters', () => {
        const attrFilters = ['filter1', 'filter2', 'filter3'];
        const result = component['getNextElementIdToFocusForAttributeFilter'](
          1,
          attrFilters
        );
        expect(result).toBe(PREFIX_ID + attrFilters[1]);
      });

      it('should return null if removed attribute filter was the last one in the list', () => {
        const attrFilters = ['filter1', 'filter2', 'filter3'];
        const result = component['getNextElementIdToFocusForAttributeFilter'](
          3,
          attrFilters
        );
        expect(result).toBeNull();
      });

      it('should return null if attrFilters array is empty', () => {
        const attrFilters: string[] = [];
        const result = component['getNextElementIdToFocusForAttributeFilter'](
          0,
          attrFilters
        );
        expect(result).toBeNull();
      });
    });

    describe('getNextElementIdToFocusForGroupFilter', () => {
      it('should return the next element id if indexOfRemoved is less than the length of groupFilters', () => {
        const groupFilters = ['filter1', 'filter2', 'filter3'];
        const attrFilters: string[] = [];
        const indexOfRemoved = 1;
        const result = component['getNextElementIdToFocusForGroupFilter'](
          indexOfRemoved,
          attrFilters,
          groupFilters
        );
        expect(result).toBe(PREFIX_ID + groupFilters[1]);
      });

      it('should return the remove all button id if removed group filter was the last one in the list but there are more than one group filters left', () => {
        const groupFilters = ['filter1', 'filter2'];
        const attrFilters: string[] = [];
        const indexOfRemoved = 2;
        const result = component['getNextElementIdToFocusForGroupFilter'](
          indexOfRemoved,
          attrFilters,
          groupFilters
        );
        expect(result).toBe(PREFIX_ID + 'REMOVE_ALL');
      });

      it('should return the remove all button id if removed group filter was the last one in the list but there are more than one filters (attribute and group filter combined) left', () => {
        const groupFilters = ['filter1'];
        const attrFilters: string[] = ['filter2'];
        const indexOfRemoved = 2;
        const result = component['getNextElementIdToFocusForGroupFilter'](
          indexOfRemoved,
          attrFilters,
          groupFilters
        );
        expect(result).toBe(PREFIX_ID + 'REMOVE_ALL');
      });

      it('should return first filter checkbox id if indexOfRemoved is equal or greather than the length of groupFilters and there is only one group filter', () => {
        const groupFilters = ['filter1'];
        const attrFilters: string[] = [];
        const indexOfRemoved = 1;
        const result = component['getNextElementIdToFocusForGroupFilter'](
          indexOfRemoved,
          attrFilters,
          groupFilters
        );
        expect(result).toBe(FIRST_FILTER_CHECKBOX_ID);
      });

      it('should return first filter checkbox id if no group and attribute filter is left', () => {
        const groupFilters: string[] = [];
        const attrFilters: string[] = [];
        const indexOfRemoved = 1;
        const result = component['getNextElementIdToFocusForGroupFilter'](
          indexOfRemoved,
          attrFilters,
          groupFilters
        );
        expect(result).toBe(FIRST_FILTER_CHECKBOX_ID);
      });
    });

    describe('focusElementById', () => {
      it('should call getElement method of ConfiguratorStorefrontUtilsService using # as prefix', () => {
        spyOn(
          configuratorStorefrontUtilsService,
          'getElement'
        ).and.callThrough();
        component['focusElementById'](FIRST_FILTER_CHECKBOX_ID);
        expect(
          configuratorStorefrontUtilsService.getElement
        ).toHaveBeenCalledWith('#' + FIRST_FILTER_CHECKBOX_ID);
      });

      it('should call focus method of html element', () => {
        let mockElement = jasmine.createSpyObj('HTMLElement', ['focus']);
        spyOn(configuratorStorefrontUtilsService, 'getElement').and.returnValue(
          mockElement
        );
        component['focusElementById'](FIRST_FILTER_CHECKBOX_ID);
        expect(mockElement.focus).toHaveBeenCalled();
      });

      it('should not call focus method if getElement returns null', () => {
        let mockElement = jasmine.createSpyObj('HTMLElement', ['focus']);
        spyOn(configuratorStorefrontUtilsService, 'getElement').and.returnValue(
          null
        );
        component['focusElementById'](FIRST_FILTER_CHECKBOX_ID);
        expect(mockElement.focus).not.toHaveBeenCalled();
      });
    });
  });
});
