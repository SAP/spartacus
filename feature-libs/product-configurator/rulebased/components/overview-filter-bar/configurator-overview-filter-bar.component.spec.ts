import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from 'feature-libs/product-configurator/common/core/model/common-configurator.model';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfigurationNonNullOv } from '../overview-filter/configurator-overview-filter.component';
import { ConfiguratorOverviewFilterBarComponent } from './configurator-overview-filter-bar.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const configId = '1234-56-7890';

let component: ConfiguratorOverviewFilterBarComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterBarComponent>;
//let htmlElem: HTMLElement;

let mockConfigCommonsService: ConfiguratorCommonsService;

let config: Configurator.Configuration;
let ovConfig: ConfigurationNonNullOv;

function initTestData() {
  config = ConfiguratorTestUtils.createConfiguration(configId, owner);
  ovConfig = structuredClone({
    ...config,
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
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterBarComponent);
  // htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

describe('ConfiguratorOverviewFilterBarComponent', () => {
  describe('Component Test', () => {
    beforeEach(
      waitForAsync(() => {
        initTestData();
        initMocks();
        TestBed.configureTestingModule({
          imports: [I18nTestingModule],
          declarations: [ConfiguratorOverviewFilterBarComponent],
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
  });

  describe('Unit Test', () => {
    beforeEach(() => {
      initTestData();
      initMocks();
      component = new ConfiguratorOverviewFilterBarComponent(
        mockConfigCommonsService
      );
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
