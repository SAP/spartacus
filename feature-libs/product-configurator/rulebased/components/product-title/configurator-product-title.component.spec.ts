import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  I18nTestingModule,
  Product,
  ProductScope,
  ProductService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { IconLoaderService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorProductTitleComponent } from './configurator-product-title.component';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';

const mockProductConfiguration = ConfigurationTestData.productConfiguration;
const PRODUCT_CODE = ConfigurationTestData.PRODUCT_CODE;
const PRODUCT_DESCRIPTION = 'Here is a product description';
const PRODUCT_NAME = 'productName';
const CONFIG_ID = '12342';
const ORDER_ENTRY_KEY = '001+1';
const CART_ENTRY_KEY = ORDER_ENTRY_KEY;
const SAVED_CART_ENTRY_KEY = ORDER_ENTRY_KEY;
const QUOTE_ENTRY_KEY = ORDER_ENTRY_KEY;
const PRODUCT_SUFFIX = 'PRODUCT_';
const ORDER_ENTRY_SUFFIX = 'ORDER_ENTRY_';
const CART_ENTRY_SUFFIX = 'CART_ENTRY_';
const SAVED_CART_ENTRY_SUFFIX = 'SAVED_CART_ENTRY_';
const QUOTE_ENTRY_SUFFIX = 'QUOTE_ENTRY_';

const ROUTE_CONFIGURATION = 'configureCPQCONFIGURATOR';
const ROUTE_OVERVIEW = 'configureOverviewCPQCONFIGURATOR';

let mockConfiguration: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    CONFIG_ID,
    ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE
    )
  ),
  productCode: PRODUCT_CODE,
  kbKey: {
    kbName: PRODUCT_CODE + '_KB',
    kbBuildNumber: '2',
    kbLogsys: 'RR5CLNT910',
    kbVersion: '1',
  },
};

const mockOwner = mockProductConfiguration.owner;
const mockRouterData: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: mockOwner,
};

const imageURL = 'some URL';
const altText = 'some text';

const mockProduct: Product = {
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

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return routerDataObservable;
  }
}

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }

  go = () => Promise.resolve(true);
}

const mockRouterState: any = {
  state: {
    semanticRoute: ROUTE_CONFIGURATION,
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
  },
};

class MockRouter {
  public events = of('');
}

class MockProductService implements Partial<ProductService> {
  get(): Observable<Product> {
    return productObservable;
  }
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return productConfigurationObservable;
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

class MockConfiguratorExpertModeService {
  setExpModeRequested(): void {}

  getExpModeRequested() {}

  setExpModeActive(): void {}

  getExpModeActive(): Observable<boolean> {
    return of(true);
  }
}

let component: ConfiguratorProductTitleComponent;
let fixture: ComponentFixture<ConfiguratorProductTitleComponent>;
let changeDetectorRef: ChangeDetectorRef;
let configExpertModeService: ConfiguratorExpertModeService;
let productService: ProductService;
let htmlElem: HTMLElement;
let routerDataObservable: Observable<any>;
let routerStateObservable: Observable<any>;
let productConfigurationObservable: Observable<any>;
let productObservable: Observable<any>;

function initialize() {
  routerDataObservable = of(mockRouterData);
  routerStateObservable = of(mockRouterState);
  productConfigurationObservable = of(mockConfiguration);
  productObservable = of(mockProduct);
  fixture = TestBed.createComponent(ConfiguratorProductTitleComponent);
  changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  component.ghostStyle = false;
  fixture.detectChanges();
}

function setDataForProductConfiguration() {
  mockConfiguration = {
    ...ConfiguratorTestUtils.createConfiguration(
      CONFIG_ID,
      ConfiguratorModelUtils.createOwner(
        CommonConfigurator.OwnerType.PRODUCT,
        PRODUCT_CODE
      )
    ),
    productCode: PRODUCT_CODE,
    kbKey: {
      kbName: PRODUCT_CODE + '_KB',
      kbBuildNumber: '2',
      kbLogsys: 'RR5CLNT910',
      kbVersion: '1',
    },
  };

  mockRouterState.state.params = {
    entityKey: PRODUCT_CODE,
    ownerType: CommonConfigurator.OwnerType.PRODUCT,
  };
  mockRouterState.state.semanticRoute = ROUTE_CONFIGURATION;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.PRODUCT;
  mockRouterData.owner.id = PRODUCT_CODE;
}

function setDataForOrderEntry() {
  mockConfiguration = {
    ...ConfiguratorTestUtils.createConfiguration(
      CONFIG_ID,
      ConfiguratorModelUtils.createOwner(
        CommonConfigurator.OwnerType.ORDER_ENTRY,
        PRODUCT_CODE
      )
    ),
    overview: {
      configId: CONFIG_ID,
      productCode: ORDER_ENTRY_SUFFIX + PRODUCT_CODE,
    },
  };

  mockRouterState.state.params = {
    entityKey: ORDER_ENTRY_KEY,
    ownerType: CommonConfigurator.OwnerType.ORDER_ENTRY,
  };
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.ORDER_ENTRY;
  mockRouterData.owner.id = ORDER_ENTRY_KEY;
  mockRouterData.productCode = undefined;
}

function setDataForCartEntry() {
  mockConfiguration = {
    ...ConfiguratorTestUtils.createConfiguration(
      CONFIG_ID,
      ConfiguratorModelUtils.createOwner(
        CommonConfigurator.OwnerType.CART_ENTRY,
        '0'
      )
    ),
    productCode: PRODUCT_CODE,
  };

  mockRouterState.state.params = {
    entityKey: CART_ENTRY_KEY,
    ownerType: CommonConfigurator.OwnerType.CART_ENTRY,
  };
  mockRouterState.state.semanticRoute = ROUTE_CONFIGURATION;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.CART_ENTRY;
  mockRouterData.owner.id = CART_ENTRY_KEY;
  mockRouterData.productCode = CART_ENTRY_SUFFIX + PRODUCT_CODE;
}

function setDataForSavedCartEntry() {
  mockConfiguration = {
    ...ConfiguratorTestUtils.createConfiguration(
      CONFIG_ID,
      ConfiguratorModelUtils.createOwner(
        CommonConfigurator.OwnerType.SAVED_CART_ENTRY,
        PRODUCT_CODE
      )
    ),
    overview: {
      configId: CONFIG_ID,
      productCode: PRODUCT_CODE,
    },
  };

  mockRouterState.state.params = {
    entityKey: SAVED_CART_ENTRY_KEY,
    ownerType: CommonConfigurator.OwnerType.SAVED_CART_ENTRY,
  };
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.SAVED_CART_ENTRY;
  mockRouterData.owner.id = SAVED_CART_ENTRY_KEY;
  mockRouterData.productCode = SAVED_CART_ENTRY_SUFFIX + PRODUCT_CODE;
}

function setDataForQuoteEntry() {
  mockConfiguration = {
    ...ConfiguratorTestUtils.createConfiguration(
      CONFIG_ID,
      ConfiguratorModelUtils.createOwner(
        CommonConfigurator.OwnerType.QUOTE_ENTRY,
        PRODUCT_CODE
      )
    ),
    overview: {
      configId: CONFIG_ID,
      productCode: PRODUCT_CODE,
    },
  };

  mockRouterState.state.params = {
    entityKey: QUOTE_ENTRY_KEY,
    ownerType: CommonConfigurator.OwnerType.QUOTE_ENTRY,
  };
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.QUOTE_ENTRY;
  mockRouterData.owner.id = QUOTE_ENTRY_KEY;
  mockRouterData.productCode = QUOTE_ENTRY_SUFFIX + PRODUCT_CODE;
}

describe('ConfigProductTitleComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
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
            provide: ConfiguratorRouterExtractorService,
            useClass: MockConfiguratorRouterExtractorService,
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
            provide: ConfiguratorExpertModeService,
            useClass: MockConfiguratorExpertModeService,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    initialize();

    configExpertModeService = TestBed.inject(ConfiguratorExpertModeService);
    spyOn(configExpertModeService, 'setExpModeRequested').and.callThrough();
    spyOn(configExpertModeService, 'setExpModeActive').and.callThrough();

    productService = TestBed.inject(ProductService);
    spyOn(productService, 'get').and.returnValue(productObservable);
  });

  it('should create component', () => {
    setDataForProductConfiguration();
    initialize();
    expect(component).toBeDefined();
  });

  describe('product$', () => {
    it('should get product name as part of product configuration via config product code', () => {
      setDataForProductConfiguration();
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should get product name as part of product configuration via routerData product code', () => {
      setDataForProductConfiguration();
      mockRouterData.productCode = PRODUCT_SUFFIX + PRODUCT_CODE;
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        mockRouterData.productCode,
        ProductScope.LIST
      );
    });

    it('should get product name as part of product configuration via config product code in case configuration is cart bound and product is not provided with routing data', () => {
      setDataForCartEntry();
      mockConfiguration.productCode = PRODUCT_CODE;
      mockRouterData.productCode = undefined;
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should get product name as part of product configuration in case configuration is cart bound and product is provided with routing data', () => {
      setDataForCartEntry();
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        CART_ENTRY_SUFFIX + PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should get product name as part of product configuration via config product code in case configuration is saved cart bound and product code is not provided with routing data', () => {
      setDataForSavedCartEntry();
      mockConfiguration.productCode = PRODUCT_CODE;
      mockRouterData.productCode = undefined;
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should get product name as part of product configuration in case configuration is saved cart bound and product code is provided with routing data', () => {
      setDataForSavedCartEntry();
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        SAVED_CART_ENTRY_SUFFIX + PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should get product name as part of product configuration via config product code in case configuration is quote bound and product code is not provided with routing data', () => {
      setDataForQuoteEntry();
      mockConfiguration.productCode = PRODUCT_CODE;
      mockRouterData.productCode = undefined;
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should get product name as part of product configuration in case configuration is quote bound and product code is provided with routing data', () => {
      setDataForQuoteEntry();
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        QUOTE_ENTRY_SUFFIX + PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should get product name as part of product from overview in case configuration is order bound and product code is not provided with routing data', () => {
      setDataForOrderEntry();
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        ORDER_ENTRY_SUFFIX + PRODUCT_CODE,
        ProductScope.LIST
      );
    });
  });

  it('should render initial content properly', () => {
    setDataForProductConfiguration();
    initialize();
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
    setDataForProductConfiguration();
    initialize();
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
    setDataForOrderEntry();
    initialize();
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

  it('should render kb key details properly', () => {
    setDataForProductConfiguration();
    initialize();

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'div.cx-kb-key-details'
    );

    CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'div.cx-kb-pair',
      4
    );

    CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'span.cx-label',
      4
    );

    CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'span.cx-value',
      4
    );

    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'span.cx-value',
      mockConfiguration.kbKey?.kbName ?? '',
      0
    );

    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'span.cx-value',
      mockConfiguration.kbKey?.kbLogsys ?? '',
      1
    );

    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'span.cx-value',
      mockConfiguration.kbKey?.kbVersion ?? '',
      2
    );

    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'span.cx-value',
      mockConfiguration.kbKey?.kbBuildNumber ?? '',
      3
    );
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      setDataForProductConfiguration();
      initialize();
    });

    it("should contain cx-icon element with an 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'cx-icon',
        undefined,
        0,
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

    it("should contain button element with 'aria-expanded' attribute false", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        undefined,
        undefined,
        'aria-expanded',
        'false'
      );
    });

    it("should contain cx-icon element with an 'aria-label' attribute that defines an accessible name to label the current element", () => {
      component.triggerDetails();
      changeDetectorRef.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'cx-icon',
        undefined,
        0,
        'aria-label',
        'configurator.a11y.showLessProductInfo product:' + mockProduct.name
      );
    });

    it("should contain button element with 'aria-expanded' attribute true", () => {
      component.triggerDetails();
      changeDetectorRef.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        undefined,
        undefined,
        'aria-expanded',
        'true'
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
        mockProduct.name
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
        mockProduct.code
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
        mockProduct.description
      );
    });

    it("should contain span element with 'aria-label' attribute for kb key name that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-label',
        0,
        'aria-label',
        'configurator.a11y.kbKeyName name:' + mockConfiguration.kbKey?.kbName,
        'configurator.header.kbKeyName'
      );
    });

    it("should contain span element with 'aria-label' attribute for kb key logical system that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-label',
        1,
        'aria-label',
        'configurator.a11y.kbKeyLogsys logsys:' +
          mockConfiguration.kbKey?.kbLogsys,
        'configurator.header.kbKeyLogsys'
      );
    });

    it("should contain span element with 'aria-label' attribute for kb key version that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-label',
        2,
        'aria-label',
        'configurator.a11y.kbKeyVersion version:' +
          mockConfiguration.kbKey?.kbVersion,
        'configurator.header.kbKeyVersion'
      );
    });

    it("should contain span element with 'aria-label' attribute for kb key build number that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-label',
        3,
        'aria-label',
        'configurator.a11y.kbKeyBuildNr number:' +
          mockConfiguration.kbKey?.kbBuildNumber,
        'configurator.header.kbKeyBuildNr'
      );
    });
  });
});
