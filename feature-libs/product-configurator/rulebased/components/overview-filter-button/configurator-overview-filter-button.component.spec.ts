import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, TranslatePipe } from '@spartacus/core';
import { CommonConfigurator } from '../../../common/core/model/common-configurator.model';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { NEVER, Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewFilterButtonComponent } from './configurator-overview-filter-button.component';
import { ConfiguratorOverviewFilterBarComponent } from '../overview-filter-bar/configurator-overview-filter-bar.component';
import {
  MockConfiguratorOverviewFilterBarComponent,
  MockConfiguratorProviderService,
  provideConfiguratorMockCommonsService,
  provideConfiguratorMockRouterExtractorService,
  provideConfiguratorMockStorefrontUtilsService,
} from '../../testing';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const configId = '1234-56-7890';

const PRICE_RELEVANT = Configurator.OverviewFilter.PRICE_RELEVANT;

let component: ConfiguratorOverviewFilterButtonComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterButtonComponent>;
let htmlElem: HTMLElement;

let mockLaunchDialogService: LaunchDialogService;
let ovConfig: Configurator.ConfigurationWithOverview;
let configuration$: Observable<Configurator.Configuration>;

function initTestData() {
  ovConfig = structuredClone({
    ...ConfiguratorTestUtils.createConfiguration(configId, owner),
    overview: ConfigurationTestData.productConfiguration.overview
      ? ConfigurationTestData.productConfiguration.overview
      : { configId: '', productCode: '' },
  });
  ovConfig.overview.possibleGroups = structuredClone(ovConfig.overview.groups);
}

function initComponent() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterButtonComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  isDisplayOnlyVariant = false;
}

let isDisplayOnlyVariant: boolean;

describe('ConfigurationOverviewFilterButtonComponent', () => {
  beforeEach(async () => {
    initTestData();
    configuration$ = of(ovConfig);
    await TestBed.configureTestingModule({
      imports: [ConfiguratorOverviewFilterButtonComponent],
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockConfiguratorProviderService.MockLaunchDialogService,
        },
        provideConfiguratorMockRouterExtractorService({
          routerDataSource: () => of(ConfigurationTestData.mockRouterState),
        }),
        provideConfiguratorMockCommonsService({
          configurationSource: () => configuration$,
        }),
        provideConfiguratorMockStorefrontUtilsService({
          isDisplayOnlyVariantSource: () => of(isDisplayOnlyVariant),
        }),
      ],
    })
      .overrideComponent(ConfiguratorOverviewFilterButtonComponent, {
        remove: {
          imports: [TranslatePipe, ConfiguratorOverviewFilterBarComponent],
        },
        add: {
          imports: [
            I18nTestingModule,
            MockConfiguratorOverviewFilterBarComponent,
          ],
        },
      })
      .compileComponents();
    mockLaunchDialogService = TestBed.inject(LaunchDialogService);
    vi.mocked(
      mockLaunchDialogService.openDialogAndSubscribe
    ).mockImplementation(() => {});
    initComponent();
    // Pre-set ghostStyle to avoid NG0100 from tap() side-effect during first detectChanges.
    // The 'while loading' test re-initializes with NEVER observable so ghostStyle stays true.
    component.ghostStyle = false;
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
  });

  it('should open filter modal on request', () => {
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('.cx-config-filter-button'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.CONFIGURATOR_OV_FILTER,
      component.filterButton,
      ovConfig
    );
  });

  it('should render filter button', () => {
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-filter-button'
    );
    expect(htmlElem.classList.contains('ghost')).toBeFalsy();
  });

  it('should render filter button for variant in case there is more than one group', () => {
    isDisplayOnlyVariant = true;
    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-filter-button'
    );
  });

  it('should render no filter button for variant in case there is only one group', () => {
    isDisplayOnlyVariant = true;
    ovConfig.overview.possibleGroups = (
      ovConfig.overview.possibleGroups ??
      ovConfig.overview.groups ??
      []
    ).slice(1);
    fixture.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-config-filter-button'
    );
  });

  it('should render filter button with count if there are active filters', () => {
    ovConfig.overview.attributeFilters = [PRICE_RELEVANT];
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-config-filter-button',
      'configurator.button.filterOverviewWithCount numAppliedFilters:1'
    );
  });

  it('should render filter button without count if there are no active filters', () => {
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-config-filter-button',
      'configurator.button.filterOverview numAppliedFilters:0'
    );
  });

  it('while loading should not render filter button but ghost button instead', () => {
    configuration$ = NEVER;
    initComponent();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-config-filter-button'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-ghost-filter-button'
    );

    expect(htmlElem.classList.contains('ghost')).toBeTruthy();
  });

  describe('to support A11Y', () => {
    it('filter button should have descriptive title', () => {
      fixture.detectChanges();
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
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-config-filter-button',
        'title',
        'configurator.a11y.filterOverviewWithCount numAppliedFilters:3'
      );
    });
  });

  describe('getNumFilters', () => {
    it('should return 0 when there are no filters', () => {
      expect(component.getNumFilters(ovConfig.overview)).toEqual(0);
    });

    it('should return 3 when there are 2 group filters and one attribute filter', () => {
      ovConfig.overview.attributeFilters = [
        Configurator.OverviewFilter.USER_INPUT,
      ];
      ovConfig.overview.groupFilters = ['1', '2'];
      expect(component.getNumFilters(ovConfig.overview)).toEqual(3);
    });
  });
});
