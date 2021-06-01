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
import { ConfiguratorTestUtils } from '../../shared/testing/configurator-test-utils';
import { ConfiguratorPriceSummaryComponent } from './configurator-price-summary.component';

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

const config: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    '1234-56-7890',
    ConfiguratorModelUtils.createInitialOwner()
  ),

  consistent: true,
  complete: true,
  productCode: PRODUCT_CODE,
  priceSummary: {
    basePrice: {
      formattedValue: '22.000 €',
    },
    selectedOptions: {
      formattedValue: '900 €',
    },
    currentTotal: {
      formattedValue: '22.900 €',
    },
  },
};

let routerStateObservable = null;
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

  beforeEach(
    waitForAsync(() => {
      routerStateObservable = of(mockRouterState);
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ConfiguratorPriceSummaryComponent],
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
    fixture = TestBed.createComponent(ConfiguratorPriceSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should get product code and prices as part of product configuration', () => {
    component.configuration$
      .subscribe((data: Configurator.Configuration) => {
        expect(data.productCode).toEqual(PRODUCT_CODE);
        expect(data.priceSummary.basePrice).toEqual(
          config.priceSummary.basePrice
        );
      })
      .unsubscribe();
  });
});
