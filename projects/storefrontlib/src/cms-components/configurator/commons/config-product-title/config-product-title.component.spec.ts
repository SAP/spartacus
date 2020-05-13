import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  ConfiguratorCommonsService,
  GenericConfigurator,
  GenericConfigUtilsService,
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
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

const product: Product = {
  name: PRODUCT_NAME,
};

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
    return of(config);
  }
}

describe('ConfigurationGroupMenuComponent', () => {
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

    component.ngOnInit();
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

  it('check initial rendering', () => {
    expectElementPresent(htmlElem, '.cx-config-product-title');
    expectElementToContainText(
      htmlElem,
      '.cx-config-product-title',
      PRODUCT_NAME
    );

    expectElementPresent(htmlElem, '.cx-config-toogle-details-link');
    expectElementToContainText(
      htmlElem,
      '.cx-config-toogle-details-link',
      'configurator.header.showMore' //Check translation key, because translation module is not available
    );

    expectElementNotPresent(htmlElem, '.cx-config-product-title-details');
  });

  it('check rendering in show more case', () => {
    component.click();
    fixture.detectChanges();

    expect(component.showMore).toBe(true);

    expectElementToContainText(
      htmlElem,
      '.cx-config-toogle-details-link',
      'configurator.header.showLess' //Check translation key, because translation module is not available
    );

    expectElementPresent(htmlElem, '.cx-config-product-title-details');
    expectElementPresent(htmlElem, '.cx-config-product-title-details img');
  });
});

function expectElementPresent(htmlElement: Element, querySelector: string) {
  expect(htmlElement.querySelectorAll(querySelector).length).toBeGreaterThan(
    0,
    "expected element identified by selector '" +
      querySelector +
      "' to be present, but it is NOT! innerHtml: " +
      htmlElement.innerHTML
  );
}

function expectElementToContainText(
  htmlElement: Element,
  querySelector: string,
  expectedText: string
) {
  expect(htmlElement.querySelector(querySelector).textContent.trim()).toBe(
    expectedText
  );
}

function expectElementNotPresent(htmlElement: Element, querySelector: string) {
  expect(htmlElement.querySelectorAll(querySelector).length).toBe(
    0,
    "expected element identified by selector '" +
      querySelector +
      "' to be NOT present, but it is! innerHtml: " +
      htmlElement.innerHTML
  );
}
