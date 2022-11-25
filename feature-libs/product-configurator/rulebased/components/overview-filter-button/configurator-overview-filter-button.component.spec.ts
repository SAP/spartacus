import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { ConfiguratorRouterExtractorService } from 'feature-libs/product-configurator/common/components/service/configurator-router-extractor.service';
import { CommonConfiguratorTestUtilsService } from 'feature-libs/product-configurator/common/testing/common-configurator-test-utils.service';
import { of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core';
import { ConfiguratorOverviewFilterButtonComponent } from './configurator-overview-filter-button.component';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { CommonConfigurator } from 'feature-libs/product-configurator/common/core/model/common-configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { Configurator } from '../../core/model/configurator.model';
import { ConfigurationNonNullOv } from '../overview-filter/configurator-overview-filter.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const configId = '1234-56-7890';

let component: ConfiguratorOverviewFilterButtonComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterButtonComponent>;
let htmlElem: HTMLElement;

let mockLaunchDialogService: LaunchDialogService;
let mockConfigRouterService: ConfiguratorRouterExtractorService;
let mockConfigCommonsService: ConfiguratorCommonsService;

let config: Configurator.Configuration;
let ovConfig: ConfigurationNonNullOv;

function asSpy(f: any) {
  return <jasmine.Spy>f;
}

function initTestData() {
  config = ConfiguratorTestUtils.createConfiguration(configId, owner);
  ovConfig = structuredClone({
    ...config,
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
  mockLaunchDialogService = jasmine.createSpyObj(['openDialog']);
  mockConfigRouterService = jasmine.createSpyObj(['extractRouterData']);
  mockConfigCommonsService = jasmine.createSpyObj([
    'getOrCreateConfiguration',
    'getConfigurationWithOverview',
  ]);
  asSpy(mockConfigRouterService.extractRouterData).and.returnValue(
    of(ConfigurationTestData.mockRouterState)
  );
  asSpy(mockConfigCommonsService.getOrCreateConfiguration).and.returnValue(
    of(config)
  );
  asSpy(mockConfigCommonsService.getConfigurationWithOverview).and.returnValue(
    of(ovConfig)
  );
}

describe('ConfigurationOverviewFilterButtonComponent', () => {
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
    expect(mockLaunchDialogService.openDialog).toHaveBeenCalled();
  });

  it('should render filter button', () => {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-filter-button'
    );
  });
});
