import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewFilterButtonComponent } from './configurator-overview-filter-button.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const configId = '1234-56-7890';

const PRICE_RELEVANT = Configurator.OverviewFilter.PRICE_RELEVANT;

let component: ConfiguratorOverviewFilterButtonComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterButtonComponent>;
let htmlElem: HTMLElement;

let mockLaunchDialogService: LaunchDialogService;
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

function initComponent() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterButtonComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

function initMocks() {
  mockLaunchDialogService = jasmine.createSpyObj(['openDialogAndSubscribe']);
  mockConfigRouterService = jasmine.createSpyObj(['extractRouterData']);
  mockConfigCommonsService = jasmine.createSpyObj(['getConfiguration']);
  asSpy(mockConfigRouterService.extractRouterData).and.returnValue(
    of(ConfigurationTestData.mockRouterState)
  );
  asSpy(mockConfigCommonsService.getConfiguration).and.returnValue(
    of(ovConfig)
  );
  asSpy(mockLaunchDialogService.openDialogAndSubscribe).and.returnValue(of());
}

describe('ConfigurationOverviewFilterButtonComponent', () => {
  describe('Component Test', () => {
    beforeEach(
      waitForAsync(() => {
        initTestData();
        initMocks();
        TestBed.configureTestingModule({
          imports: [I18nTestingModule],
          declarations: [ConfiguratorOverviewFilterButtonComponent],
          providers: [
            { provide: LaunchDialogService, useValue: mockLaunchDialogService },
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
      initComponent();
      expect(component).toBeDefined();
    });

    it('should open filter modal on request', () => {
      initComponent();
      component.openFilterModal();
      expect(
        mockLaunchDialogService.openDialogAndSubscribe
      ).toHaveBeenCalledWith(
        LAUNCH_CALLER.CONFIGURATOR_OV_FILTER,
        component.filerButton,
        {}
      );
    });

    it('should render filter button', () => {
      initComponent();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-config-filter-button'
      );
    });

    it('should render filter button with count if there are active filters', () => {
      ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
      initComponent();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-config-filter-button',
        'configurator.button.filterOverviewWithCount numAppliedFilters:1'
      );
    });

    it('should render filter button without count if there are no active filters', () => {
      initComponent();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-config-filter-button',
        'configurator.button.filterOverview numAppliedFilters:0'
      );
    });

    describe('A11Y', () => {
      it('filter button should have descriptive title', () => {
        initComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-config-filter-button',
          'title',
          'configurator.a11y.filterOverview numAppliedFilters:0'
        );
      });

      it('filter button should have descriptive title with count', () => {
        ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
        ovConfig.overview.groupFilters = ['1', '2'];
        initComponent();
        CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
          expect,
          htmlElem,
          '.cx-config-filter-button',
          'title',
          'configurator.a11y.filterOverviewWithCount numAppliedFilters:3'
        );
      });
    });

  });

  describe('Unit Test', () => {
    beforeEach(() => {
      initTestData();
      initMocks();
      component = new ConfiguratorOverviewFilterButtonComponent(
        mockLaunchDialogService,
        mockConfigCommonsService,
        mockConfigRouterService
      );
    });

    it('should get 0 as number of filters when there are no filters', () => {
      expect(component.getNumFilters(ovConfig.overview)).toEqual(0);
    });

    it('should get number of filters when there are filters', () => {
      ovConfig.overview.attributeFilters = [
        Configurator.OverviewFilter.USER_INPUT,
      ];
      ovConfig.overview.groupFilters = ['1', '2'];
      expect(component.getNumFilters(ovConfig.overview)).toEqual(3);
    });
  });
});
