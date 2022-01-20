import { ChangeDetectorRef, Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { IconLoaderService } from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorProductTitleComponent } from './configurator-product-title.component';

const PRODUCT_DESCRIPTION = 'Here is a product description';
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
  ...ConfiguratorTestUtils.createConfiguration(
    CONFIG_ID,
    ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE
    )
  ),

  productCode: PRODUCT_CODE,
};

const orderEntryconfig: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    CONFIG_ID,
    ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.ORDER_ENTRY,
      PRODUCT_CODE
    )
  ),
  overview: {
    configId: CONFIG_ID,
    productCode: PRODUCT_CODE,
  },
};

const orderEntryconfigWoOverview: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, {
    id: PRODUCT_CODE,
    type: CommonConfigurator.OwnerType.ORDER_ENTRY,
    key: ConfiguratorModelUtils.getOwnerKey(
      CommonConfigurator.OwnerType.ORDER_ENTRY,
      PRODUCT_CODE
    ),
    configuratorType: ConfiguratorType.VARIANT,
  }),
};

const imageURL = 'some URL';
const altText = 'some text';

const product: Product = {
  name: PRODUCT_NAME,
  code: PRODUCT_CODE,
  description: PRODUCT_DESCRIPTION,
  images: {
    PRIMARY: {
      thumbnail: {
        url: imageURL,
        altText: altText,
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
  @Input() type: any;
}

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container: any;
  @Input() format: any;
}

describe('ConfigProductTitleComponent', () => {
  let component: ConfiguratorProductTitleComponent;
  let fixture: ComponentFixture<ConfiguratorProductTitleComponent>;
  let changeDetectorRef: ChangeDetectorRef;
  let configuratorUtils: CommonConfiguratorUtilsService;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          ReactiveFormsModule,
          NgSelectModule,
          FeaturesConfigModule,
        ],
        declarations: [
          ConfiguratorProductTitleComponent,
          MockCxIconComponent,
          MockMediaComponent,
        ],
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
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '3.3' },
            },
          },
        ],
      });
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorProductTitleComponent);
    changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    component.ghostStyle = false;

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

  describe('product$', () => {
    it('should get product name as part of product of configuration', () => {
      component.product$.subscribe((data: Product) => {
        expect(data.name).toEqual(PRODUCT_NAME);
      });
    });

    it('should get product name as part of product from overview, in case configuration is order bound', () => {
      configuration = orderEntryconfig;
      component.product$.subscribe((data: Product) => {
        expect(data.name).toEqual(PRODUCT_NAME);
      });
    });

    it('should not emit in case an order bound configuration does not have the OV aspect (yet)', () => {
      configuration = orderEntryconfigWoOverview;
      const expected = cold('|');
      expect(component.product$).toBeObservable(expected);
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
    changeDetectorRef.detectChanges();

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

  describe('Accessibility', () => {
    it("should contain div element with class name 'cx-toggle-details-link-text' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-toggle-details-link-text',
        undefined,
        'aria-label',
        'configurator.a11y.showMoreProductInfo product:productName'
      );
    });

    it("should contain span element with 'aria-hidden' attribute that removes span element from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        1,
        'aria-hidden',
        'true',
        'configurator.header.showMore'
      );
    });

    it("should contain div element with class name 'cx-toggle-details-link-text' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      component.triggerDetails();
      changeDetectorRef.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-toggle-details-link-text',
        undefined,
        'aria-label',
        'configurator.a11y.showLessProductInfo product:' + product.name,
        'configurator.header.showLess'
      );
    });

    it("should contain div element with class name 'cx-details-content' and 'aria-hidden' attribute that removes div element from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-details-content',
        0,
        'aria-hidden',
        'true'
      );
    });

    it("should contain div element with class name 'cx-details-content' and 'aria-hidden' attribute that removes div element from the accessibility tree", () => {
      component.triggerDetails();
      changeDetectorRef.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-details-content',
        0,
        'aria-hidden',
        'false'
      );
    });

    it("should contain span element with 'aria-label' attribute  for product name that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        2,
        'aria-label',
        'configurator.a11y.productName',
        product.name
      );
    });

    it("should contain span element with 'aria-label' attribute for product code that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        3,
        'aria-label',
        'configurator.a11y.productCode',
        product.code
      );
    });

    it("should contain span element with 'aria-label' attribute for product description that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        4,
        'aria-label',
        'configurator.a11y.productDescription',
        product.description
      );
    });
  });
});
