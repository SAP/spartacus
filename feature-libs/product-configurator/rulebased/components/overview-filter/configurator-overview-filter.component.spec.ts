import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from 'feature-libs/product-configurator/common/components/service/configurator-router-extractor.service';
import { CommonConfigurator } from 'feature-libs/product-configurator/common/core/model/common-configurator.model';
import { CommonConfiguratorTestUtilsService } from 'feature-libs/product-configurator/common/testing/common-configurator-test-utils.service';
import { NEVER, of } from 'rxjs';
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

let config: Configurator.Configuration;
let ovConfig: Configurator.Configuration;

function asSpy(f: any) {
  return <jasmine.Spy>f;
}

function initTestData() {
  config = ConfiguratorTestUtils.createConfiguration(configId, owner);
  ovConfig = {
    ...config,
    overview: ConfigurationTestData.productConfiguration.overview,
  };
}

function initMocks() {
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

function initTestComponent() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

describe('ConfigurationOverviewFilterComponent', () => {
  beforeEach(
    waitForAsync(() => {
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
  beforeEach(() => {
    initTestData();
  });

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
    if (ovConfig.overview) ovConfig.overview.groups = [];
    initTestComponent();

    CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.cx-overview-filter-option',
      2 //2 default
    );
  });

  it('should not render anything if nothing has been emitted', () => {
    asSpy(mockConfigCommonsService.getOrCreateConfiguration).and.returnValue(
      NEVER
    );
    initTestComponent();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-overview-filter-option, .cx-overview-filter-header'
    );
  });
});
