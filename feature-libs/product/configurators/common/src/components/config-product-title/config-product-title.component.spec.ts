import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  GenericConfigurator,
  GenericConfigUtilsService,
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { IconLoaderService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfigComponentTestUtilsService } from '../../shared/testing/config-component-test-utils.service';
import { ConfiguratorCommonsService } from './../../core/facade/configurator-commons.service';
import { ConfigProductTitleComponent } from './config-product-title.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const PRODUCT_NAME = 'productName';
const CONFIG_ID = '12342';
const CONFIGURATOR_URL =
  'electronics-spa/en/USD/configureCPQCONFIGURATOR/product/entityKey/WCEM_DEPENDENCY_PC';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    url: CONFIGURATOR_URL,
  },
};

const config: Configurator.Configuration = {
  owner: {
    id: PRODUCT_CODE,
    type: GenericConfigurator.OwnerType.PRODUCT,
  },
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
};

const orderEntryconfig: Configurator.Configuration = {
  owner: {
    id: PRODUCT_CODE,
    type: GenericConfigurator.OwnerType.ORDER_ENTRY,
  },
  configId: CONFIG_ID,
  overview: {
    productCode: PRODUCT_CODE,
  },
};

const product: Product = {
  name: PRODUCT_NAME,
  code: PRODUCT_CODE,
  images: {
    PRIMARY: {
      thumbnail: {
        url: 'some URL',
        altText: 'some text',
      },
    },
  },
  price: {
    formattedValue: '$1.500',
  },
  priceRange: {
    maxPrice: {
      formattedValue: '$1.500',
    },
    minPrice: {
      formattedValue: '$1.000',
    },
  },
};
let configuration: Configurator.Configuration;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

class MockRouter {
  public events = of('');
}

class MockProductService {
  get(): Observable<Product> {
    return of(product);
  }
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(configuration);
  }
}

export class MockIconFontLoaderService {
  getFlipDirection(): void {}
}

describe('ConfigProductTitleComponent', () => {
  let component: ConfigProductTitleComponent;
  let fixture: ComponentFixture<ConfigProductTitleComponent>;
  let configuratorUtils: GenericConfigUtilsService;
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [ConfigProductTitleComponent],
      providers: [
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        { provide: IconLoaderService, useClass: MockIconFontLoaderService },
      ],
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigProductTitleComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;

    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    configuratorUtils.setOwnerKey(config.owner);
    configuratorUtils.setOwnerKey(orderEntryconfig.owner);
    configuration = config;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should get product name as part of product configuration', () => {
    component.product$.subscribe((data: Product) => {
      expect(data.name).toEqual(PRODUCT_NAME);
    });
  });

  it('should render initial content properly', () => {
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-product-title'
    );
    ConfigComponentTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-config-product-title',
      PRODUCT_NAME
    );

    ConfigComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-config-product-title-details.open'
    );
    ConfigComponentTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-config-toogle-details-link-text',
      'configurator.header.showMore' //Check translation key, because translation module is not available
    );
  });

  it('should render show more case - default', () => {
    component.triggerDetails();
    fixture.detectChanges();

    expect(component.showMore).toBe(true);
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-product-title-details.open'
    );

    ConfigComponentTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-config-toogle-details-link-text',
      'configurator.header.showLess' //Check translation key, because translation module is not available
    );
  });

  it('should render properly for navigation from order entry', () => {
    configuration = orderEntryconfig;
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-product-title'
    );
    ConfigComponentTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-config-product-title',
      PRODUCT_NAME
    );
  });
});
