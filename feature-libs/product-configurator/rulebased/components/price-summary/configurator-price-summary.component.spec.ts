import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RouterState } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorType,
} from '../../../common/core/model/common-configurator.model';
import { ConfiguratorModelUtils } from '../../../common/shared/utils/configurator-model-utils';
import { MockFeatureLevelDirective } from 'core-libs/storefront/shared/test/mock-feature-level-directive';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorUISettingsConfig } from '../config/configurator-ui-settings.config';
import { defaultConfiguratorUISettingsConfig } from '../config/default-configurator-ui-settings.config';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfiguratorPriceSummaryComponent } from './configurator-price-summary.component';
import {
  provideConfiguratorMockCommonsService,
  provideConfiguratorMockRoutingService,
} from '../../testing';

class MockConfiguratorStorefrontUtilsService {
  shouldHideBasePriceAndSelectedOptions(
    configuration: Configurator.Configuration
  ): boolean {
    const configuratorType = configuration.owner?.configuratorType;
    if (configuratorType === ConfiguratorType.CPQ) {
      return !!TestBed.inject(ConfiguratorUISettingsConfig).productConfigurator
        ?.cpqHideBasePriceAndSelectedOptions;
    }
    return !!configuration.hideBasePriceAndSelectedOptions;
  }
}

const PRODUCT_CODE = 'CONF_LAPTOP';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
    semanticRoute: 'configureOverviewCPQCONFIGURATOR',
  },
};

let config: Configurator.Configuration;
const defaultConfig: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    '1234-56-7890',
    ConfiguratorModelUtils.createInitialOwner()
  ),
  consistent: true,
  complete: true,
  productCode: PRODUCT_CODE,
  priceSummary: {
    basePrice: {
      value: 22000,
      currencyIso: 'EUR',
      formattedValue: '22.000 €',
    },
    selectedOptions: {
      value: 900,
      currencyIso: 'EUR',
      formattedValue: '900 €',
    },
    currentTotal: {
      value: 22900,
      currencyIso: 'EUR',
      formattedValue: '22.900 €',
    },
  },

  pricingEnabled: true,
};

let routerStateObservable: Observable<RouterState>;
describe('ConfigPriceSummaryComponent', () => {
  let component: ConfiguratorPriceSummaryComponent;
  let fixture: ComponentFixture<ConfiguratorPriceSummaryComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async () => {
    routerStateObservable = of(mockRouterState);
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ConfiguratorPriceSummaryComponent,
        MockFeatureLevelDirective,
      ],
      providers: [
        provideConfiguratorMockCommonsService({
          configurationSource: () => of(config),
        }),
        provideConfiguratorMockRoutingService(() => routerStateObservable),
        {
          provide: ConfiguratorUISettingsConfig,
          useValue: structuredClone(defaultConfiguratorUISettingsConfig),
        },
        {
          provide: ConfiguratorStorefrontUtilsService,
          useClass: MockConfiguratorStorefrontUtilsService,
        },
      ],
    })
      .overrideComponent(ConfiguratorPriceSummaryComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });
  beforeEach(() => {
    config = { ...defaultConfig };
    fixture = TestBed.createComponent(ConfiguratorPriceSummaryComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
  });

  it('should get product code and prices as part of product configuration', () => {
    fixture.detectChanges();
    component.configuration$
      .subscribe((data: Configurator.Configuration) => {
        expect(data.productCode).toEqual(PRODUCT_CODE);
        expect(data.priceSummary?.basePrice).toEqual(
          config.priceSummary?.basePrice
        );
      })
      .unsubscribe();
  });

  it('should render price summary container', () => {
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-price-summary-container'
    );
  });

  it('should not render price summary container in case pricing not enabled', () => {
    config.pricingEnabled = false;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-price-summary-container'
    );
  });

  it('should render selected and options price when no setting specified', () => {
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-selected-options'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-base-price'
    );
  });

  it('should render selected and options price when requested', () => {
    config.hideBasePriceAndSelectedOptions = false;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-selected-options'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-base-price'
    );
  });

  it('should not render selected and options price when requested for variant configurator', () => {
    config.owner = ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE,
      ConfiguratorType.VARIANT
    );
    config.hideBasePriceAndSelectedOptions = true;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-selected-options'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-base-price'
    );
  });

  it('should not render selected and options price for CPQ when storefront setting is true', () => {
    config.owner = ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE,
      ConfiguratorType.CPQ
    );
    config.hideBasePriceAndSelectedOptions = true;
    TestBed.inject(ConfiguratorUISettingsConfig).productConfigurator = {
      cpqHideBasePriceAndSelectedOptions: true,
    };
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-selected-options'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-base-price'
    );
  });

  it('should render selected and options price for CPQ when OCC flag is true but storefront setting is false', () => {
    config.owner = ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE,
      ConfiguratorType.CPQ
    );
    config.hideBasePriceAndSelectedOptions = true;
    TestBed.inject(ConfiguratorUISettingsConfig).productConfigurator = {
      cpqHideBasePriceAndSelectedOptions: false,
    };
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-selected-options'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-base-price'
    );
  });
});
