import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorPriceSummaryComponent } from './configurator-price-summary.component';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';

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
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}
class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(config);
  }
}

describe('ConfigPriceSummaryComponent', () => {
  let component: ConfiguratorPriceSummaryComponent;
  let fixture: ComponentFixture<ConfiguratorPriceSummaryComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      routerStateObservable = of(mockRouterState);
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          ConfiguratorPriceSummaryComponent,
          MockFeatureLevelDirective,
        ],
        providers: [
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },

          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      })
        .overrideComponent(ConfiguratorPriceSummaryComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );
  beforeEach(() => {
    config = { ...defaultConfig };
    fixture = TestBed.createComponent(ConfiguratorPriceSummaryComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should get product code and prices as part of product configuration', () => {
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

  it('should not render selected and options price when requested', () => {
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
});
