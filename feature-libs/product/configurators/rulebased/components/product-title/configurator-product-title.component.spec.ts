import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorTestUtilsService,
  CommonConfiguratorUtilsService,
} from '@spartacus/product/configurators/common';
import { IconLoaderService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorProductTitleComponent } from './configurator-product-title.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const PRODUCT_NAME = 'productName';
const CONFIG_ID = '12342';
const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
    },
    semanticRoute: CONFIGURATOR_ROUTE,
  },
};

const config: Configurator.Configuration = {
  owner: {
    id: PRODUCT_CODE,
    type: CommonConfigurator.OwnerType.PRODUCT,
  },
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
};

const orderEntryconfig: Configurator.Configuration = {
  owner: {
    id: PRODUCT_CODE,
    type: CommonConfigurator.OwnerType.ORDER_ENTRY,
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

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

describe('ConfigProductTitleComponent', () => {
  let component: ConfiguratorProductTitleComponent;
  let fixture: ComponentFixture<ConfiguratorProductTitleComponent>;
  let configuratorUtils: CommonConfiguratorUtilsService;
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [ConfiguratorProductTitleComponent, MockCxIconComponent],
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
    fixture = TestBed.createComponent(ConfiguratorProductTitleComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;

    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
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
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-title'
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-title',
      PRODUCT_NAME
    );

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-details.open'
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-toggle-details-link-text',
      'configurator.header.showMore' //Check translation key, because translation module is not available
    );
  });

  it('should render show more case - default', () => {
    component.triggerDetails();
    fixture.detectChanges();

    expect(component.showMore).toBe(true);
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-details.open'
    );

    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-toggle-details-link-text',
      'configurator.header.showLess' //Check translation key, because translation module is not available
    );
  });

  it('should render properly for navigation from order entry', () => {
    configuration = orderEntryconfig;
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-title'
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-title',
      PRODUCT_NAME
    );
  });
});
