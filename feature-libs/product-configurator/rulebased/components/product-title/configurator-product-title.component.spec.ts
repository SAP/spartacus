import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
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
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  IconComponent,
  IconLoaderService,
  MediaComponent,
} from '@spartacus/storefront';
import { Observable, of, throwError } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorProductTitleComponent } from './configurator-product-title.component';

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
const baseMockRouterData: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: mockOwner,
};
let mockRouterData: ConfiguratorRouter.Data;

const imageURL = 'some URL';
const altText = 'some text';
const NESTED_PRODUCT_CODE = 'LENS_ZOOM';
const NESTED_PRODUCT_NAME = 'Zoom Lens';
const NESTED_PRODUCT_DESCRIPTION = 'Nested product description';
const INNER_NESTED_PRODUCT_CODE = 'FILTER_UV';
const INNER_NESTED_PRODUCT_NAME = 'UV Filter';
const ROOT_TAB_ID = 'root-tab';
const OUTER_ROW_GROUP_ID = 'CONTAINER_ROW@111@row-1';
const OUTER_TAB_ID = 'CONTAINER_ROW@111@row-1@57';
const INNER_ROW_GROUP_ID = 'CONTAINER_ROW@222@row-2';
const INNER_TAB_ID = 'CONTAINER_ROW@222@row-2@57';

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

const mockNestedProduct: Product = {
  name: 'Catalog Zoom Lens',
  code: NESTED_PRODUCT_CODE,
  description: NESTED_PRODUCT_DESCRIPTION,
  images: {
    PRIMARY: {
      thumbnail: {
        url: 'nested image URL',
        altText: 'nested alt',
      },
    },
  },
};

const mockInnerNestedProduct: Product = {
  name: 'Catalog UV Filter',
  code: INNER_NESTED_PRODUCT_CODE,
  description: 'Inner nested product description',
  images: {
    PRIMARY: {
      thumbnail: {
        url: 'inner nested image URL',
        altText: 'inner nested alt',
      },
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
  get(_code?: string): Observable<Product> {
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
  imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
})
class MockCxIconComponent {
  @Input() type: any;
}

@Component({
  template: '',
  selector: 'cx-media',
  imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
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
let featureToggles: MockFeatureTogglesController;
let productService: ProductService;
let htmlElem: HTMLElement;
let routerDataObservable: Observable<any>;
let routerStateObservable: Observable<any>;
let productConfigurationObservable: Observable<any>;
let productObservable: Observable<any>;

function initialize(options?: {
  keepGhostStyle?: boolean;
  detectChanges?: boolean;
}) {
  routerDataObservable = of(mockRouterData);
  routerStateObservable = of(mockRouterState);
  productConfigurationObservable = of(mockConfiguration);
  productObservable = of(mockProduct);
  fixture = TestBed.createComponent(ConfiguratorProductTitleComponent);
  changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  if (!options?.keepGhostStyle) {
    component.ghostStyle = false;
  }
  if (options?.detectChanges !== false) {
    fixture.detectChanges();
  }
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
  mockRouterData.isOwnerCartEntry = true;
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

function createContainerRowGroup(
  groupId: string,
  productSystemId: string,
  productName: string,
  nestedTab: Configurator.Group
): Configurator.Group {
  return {
    id: groupId,
    name: productSystemId,
    description: productName,
    groupType: Configurator.GroupType.CONTAINER_ROW_GROUP,
    subGroups: [nestedTab],
    attributes: [],
  };
}

function setDataForNestedContainerProduct(includeInnerContainer = false): void {
  setDataForProductConfiguration();

  const innerTab: Configurator.Group = {
    ...ConfiguratorTestUtils.createGroup(INNER_TAB_ID),
    groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
  };
  const innerRowGroup = createContainerRowGroup(
    INNER_ROW_GROUP_ID,
    INNER_NESTED_PRODUCT_CODE,
    INNER_NESTED_PRODUCT_NAME,
    innerTab
  );
  const outerTab: Configurator.Group = {
    ...ConfiguratorTestUtils.createGroup(OUTER_TAB_ID),
    groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
    subGroups: includeInnerContainer ? [innerRowGroup] : [],
  };
  const outerRowGroup = createContainerRowGroup(
    OUTER_ROW_GROUP_ID,
    NESTED_PRODUCT_CODE,
    NESTED_PRODUCT_NAME,
    outerTab
  );
  const rootGroup: Configurator.Group = {
    ...ConfiguratorTestUtils.createGroup(ROOT_TAB_ID),
    groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
    subGroups: [outerRowGroup],
  };

  mockConfiguration.groups = [rootGroup];
  mockConfiguration.interactionState = {
    currentGroup: includeInnerContainer ? INNER_TAB_ID : OUTER_TAB_ID,
  };
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
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        ConfiguratorProductTitleComponent,
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
        provideMockFeatureToggles({
          productConfiguratorCPQContainer: false,
        }),
      ],
    })
      .overrideComponent(ConfiguratorProductTitleComponent, {
        remove: {
          imports: [IconComponent, MediaComponent],
        },
        add: {
          imports: [MockCxIconComponent, MockMediaComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    mockRouterData = structuredClone(baseMockRouterData);
    initialize();

    configExpertModeService = TestBed.inject(ConfiguratorExpertModeService);
    spyOn(configExpertModeService, 'setExpModeRequested').and.callThrough();
    spyOn(configExpertModeService, 'setExpModeActive').and.callThrough();

    featureToggles = TestBed.inject(MockFeatureTogglesController);

    productService = TestBed.inject(ProductService);
  });

  it('should create component', () => {
    setDataForProductConfiguration();
    initialize();
    expect(component).toBeDefined();
  });

  describe('product$', () => {
    beforeEach(() => {
      spyOn(productService, 'get').and.returnValue(productObservable);
    });

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

    it('should prefer config product code over routing data product code in case configuration is cart bound', () => {
      // For cart entries the configuration is authoritative, so the config
      // product code wins even if a (potentially stale) product code is
      // provided via routing data.
      setDataForCartEntry();
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should ignore a stale routing data product code in case configuration is cart bound (browser back after cart entry deletion)', () => {
      setDataForCartEntry();
      mockConfiguration.productCode = PRODUCT_CODE;
      // Simulates a stale URL product code that no longer matches the cart
      // entry which has been re-read after a preceding entry was deleted.
      mockRouterData.productCode = CART_ENTRY_SUFFIX + 'STALE_PRODUCT';
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should fall back to overview product code in case configuration is cart bound but config has no product code', () => {
      setDataForCartEntry();
      mockConfiguration.productCode = undefined as unknown as string;
      mockConfiguration.overview = {
        configId: CONFIG_ID,
        productCode: 'OVERVIEW_' + PRODUCT_CODE,
      };
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        'OVERVIEW_' + PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should fall back to routing data product code in case configuration is cart bound but config has no product code', () => {
      setDataForCartEntry();
      mockConfiguration.productCode = undefined as unknown as string;
      mockConfiguration.overview = undefined;
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        CART_ENTRY_SUFFIX + PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should not emit a product when no product code can be resolved', () => {
      setDataForProductConfiguration();
      mockConfiguration.productCode = undefined as unknown as string;
      mockConfiguration.overview = undefined;
      mockRouterData.productCode = undefined;
      initialize();

      let emitted = false;
      component.product$.subscribe(() => (emitted = true)).unsubscribe();

      expect(emitted).toBe(false);
    });

    it('should not emit a product when the catalog product is missing', () => {
      setDataForProductConfiguration();
      (productService.get as jasmine.Spy).and.returnValue(of(undefined));
      initialize();

      let emitted = false;
      component.product$.subscribe(() => (emitted = true)).unsubscribe();

      expect(emitted).toBe(false);
    });

    it('should emit the catalog product', () => {
      setDataForProductConfiguration();
      initialize();

      let product: Product | undefined;
      component.product$
        .subscribe((emitted) => (product = emitted))
        .unsubscribe();

      expect(product).toEqual(mockProduct);
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

  describe('productTitle$', () => {
    it('should emit the catalog product name', () => {
      setDataForProductConfiguration();
      initialize();

      let title: string | undefined;
      component.productTitle$
        .subscribe((emitted) => (title = emitted))
        .unsubscribe();

      expect(title).toBe(PRODUCT_NAME);
    });

    it('should emit an empty title when the catalog product has no name', () => {
      setDataForProductConfiguration();
      spyOn(productService, 'get').and.returnValue(
        of({ ...mockProduct, name: undefined })
      );
      initialize();

      let title: string | undefined;
      component.productTitle$
        .subscribe((emitted) => (title = emitted))
        .unsubscribe();

      expect(title).toBe('');
    });
  });

  describe('ghost style', () => {
    it('should remove the ghost style when product title data is available', () => {
      setDataForProductConfiguration();
      spyOn(productService, 'get').and.returnValue(of(mockProduct));
      initialize({ keepGhostStyle: true, detectChanges: false });

      expect(component.ghostStyle).toBe(true);

      component.product$.subscribe().unsubscribe();
      expect(component.ghostStyle).toBe(false);

      fixture.detectChanges();
      expect(htmlElem.classList.contains('ghost')).toBe(false);
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-title'
      );
    });

    it('should keep the ghost style when no product is available', () => {
      setDataForProductConfiguration();
      mockConfiguration.productCode = undefined as unknown as string;
      mockConfiguration.overview = undefined;
      mockRouterData.productCode = undefined;
      initialize({ keepGhostStyle: true });

      expect(component.ghostStyle).toBe(true);
      expect(htmlElem.classList.contains('ghost')).toBe(true);
    });
  });

  describe('getContainerRowGroupsOnPath', () => {
    it('should return an empty list when the current group is missing', () => {
      setDataForNestedContainerProduct();
      mockConfiguration.interactionState = {};

      expect(
        component['getContainerRowGroupsOnPath'](mockConfiguration)
      ).toEqual([]);
    });

    it('should return an empty list when the configuration has no groups', () => {
      setDataForProductConfiguration();
      mockConfiguration.groups = [];
      mockConfiguration.interactionState = { currentGroup: ROOT_TAB_ID };

      expect(
        component['getContainerRowGroupsOnPath'](mockConfiguration)
      ).toEqual([]);
    });
  });

  describe('expMode', () => {
    it('should return true when expert mode is active', () => {
      spyOn(configExpertModeService, 'getExpModeActive').and.returnValue(
        of(true)
      );

      let expMode: boolean | undefined;
      component.expMode
        ?.subscribe((emitted) => (expMode = emitted))
        .unsubscribe();

      expect(expMode).toBe(true);
    });

    it('should return false when expert mode is not active', () => {
      spyOn(configExpertModeService, 'getExpModeActive').and.returnValue(
        of(false)
      );

      let expMode: boolean | undefined;
      component.expMode
        ?.subscribe((emitted) => (expMode = emitted))
        .unsubscribe();

      expect(expMode).toBe(false);
    });
  });

  describe('triggerDetails', () => {
    it('should toggle the show more state', () => {
      expect(component.showMore).toBe(false);

      component.triggerDetails();
      expect(component.showMore).toBe(true);

      component.triggerDetails();
      expect(component.showMore).toBe(false);
    });
  });

  describe('nested container products', () => {
    beforeEach(() => {
      featureToggles.set('productConfiguratorCPQContainer', true);
    });

    function stubCatalogProducts(): void {
      spyOn(productService, 'get').and.callFake((code: string) => {
        if (code === NESTED_PRODUCT_CODE) {
          return of(mockNestedProduct);
        }
        if (code === INNER_NESTED_PRODUCT_CODE) {
          return of(mockInnerNestedProduct);
        }
        return of(mockProduct);
      });
    }

    it('should keep the base product name when the CPQ container feature toggle is disabled', () => {
      featureToggles.set('productConfiguratorCPQContainer', false);
      setDataForNestedContainerProduct();
      stubCatalogProducts();
      initialize();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        PRODUCT_NAME
      );

      expect(productService.get).toHaveBeenCalledWith(
        PRODUCT_CODE,
        ProductScope.LIST
      );
      expect(productService.get).not.toHaveBeenCalledWith(
        NESTED_PRODUCT_CODE,
        ProductScope.LIST
      );
    });

    it('should use an empty heading when the catalog product has no name', () => {
      setDataForNestedContainerProduct();
      mockConfiguration.interactionState = { currentGroup: ROOT_TAB_ID };
      spyOn(productService, 'get').and.returnValue(
        of({ ...mockProduct, name: undefined })
      );
      initialize();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        ''
      );
    });

    it('should keep the base product name when the current group is not a nested container', () => {
      setDataForNestedContainerProduct();
      mockConfiguration.interactionState = { currentGroup: ROOT_TAB_ID };
      stubCatalogProducts();
      initialize();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        PRODUCT_NAME
      );
    });

    it('should render base and nested product names separated by a slash', () => {
      setDataForNestedContainerProduct();
      stubCatalogProducts();
      initialize();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        PRODUCT_NAME + ' / ' + NESTED_PRODUCT_NAME
      );
    });

    it('should collect the full nested path for a container in a container', () => {
      setDataForNestedContainerProduct(true);
      stubCatalogProducts();
      initialize();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        PRODUCT_NAME +
          ' / ' +
          NESTED_PRODUCT_NAME +
          ' / ' +
          INNER_NESTED_PRODUCT_NAME
      );
    });

    it('should expose the full nested path as the heading tooltip and accessible name', () => {
      setDataForNestedContainerProduct(true);
      stubCatalogProducts();
      initialize();

      const fullTitle =
        PRODUCT_NAME +
        ' / ' +
        NESTED_PRODUCT_NAME +
        ' / ' +
        INNER_NESTED_PRODUCT_NAME;
      const titleSpan = htmlElem.querySelector('#cxConfigProductName');

      expect(titleSpan?.getAttribute('title')).toBe(fullTitle);
      expect(titleSpan?.getAttribute('aria-label')).toBe(fullTitle);
    });

    it('should load catalog details of the base product', () => {
      setDataForNestedContainerProduct();
      stubCatalogProducts();
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        PRODUCT_CODE,
        ProductScope.LIST
      );
      expect(productService.get).not.toHaveBeenCalledWith(
        NESTED_PRODUCT_CODE,
        ProductScope.LIST
      );

      component.triggerDetails();
      changeDetectorRef.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-detail-title',
        PRODUCT_NAME
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-code',
        PRODUCT_CODE
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-description',
        PRODUCT_DESCRIPTION
      );
    });

    it('should still show base product details for a container in a container', () => {
      setDataForNestedContainerProduct(true);
      stubCatalogProducts();
      initialize();

      expect(productService.get).toHaveBeenCalledWith(
        PRODUCT_CODE,
        ProductScope.LIST
      );
      expect(productService.get).not.toHaveBeenCalledWith(
        INNER_NESTED_PRODUCT_CODE,
        ProductScope.LIST
      );

      component.triggerDetails();
      changeDetectorRef.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-detail-title',
        PRODUCT_NAME
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-code',
        PRODUCT_CODE
      );
    });

    it('should keep the nested heading when the base product catalog lookup fails', () => {
      setDataForNestedContainerProduct();
      spyOn(productService, 'get').and.returnValue(
        throwError(() => new Error('not found'))
      );
      initialize();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        PRODUCT_CODE + ' / ' + NESTED_PRODUCT_NAME
      );
    });

    it('should return container row groups on the path from outer to inner', () => {
      setDataForNestedContainerProduct(true);
      stubCatalogProducts();
      initialize();

      const nestedGroups =
        component['getContainerRowGroupsOnPath'](mockConfiguration);

      expect(nestedGroups.map((group) => group.id)).toEqual([
        OUTER_ROW_GROUP_ID,
        INNER_ROW_GROUP_ID,
      ]);
    });

    it('should omit a container row without description from the heading', () => {
      setDataForNestedContainerProduct();
      const outerRowGroup = mockConfiguration.groups?.[0]?.subGroups[0];
      expect(outerRowGroup).toBeDefined();
      if (outerRowGroup) {
        outerRowGroup.description = '';
      }
      stubCatalogProducts();
      initialize();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        PRODUCT_NAME
      );
    });

    it('should omit the base product from the heading when no base product code is available', () => {
      setDataForNestedContainerProduct();
      mockConfiguration.productCode = undefined as unknown as string;
      mockConfiguration.overview = undefined;
      mockRouterData.productCode = undefined;
      stubCatalogProducts();
      initialize();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        NESTED_PRODUCT_NAME
      );
    });

    it('should use the base product code in the heading when the base product is not in the catalog', () => {
      setDataForNestedContainerProduct();
      spyOn(productService, 'get').and.callFake((code: string) => {
        if (code === PRODUCT_CODE) {
          return of(undefined);
        }
        if (code === NESTED_PRODUCT_CODE) {
          return of(mockNestedProduct);
        }
        return of(mockProduct);
      });
      initialize();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        PRODUCT_CODE + ' / ' + NESTED_PRODUCT_NAME
      );
    });

    it('should omit an empty base product name from the heading', () => {
      setDataForNestedContainerProduct();
      spyOn(productService, 'get').and.callFake((code: string) => {
        if (code === PRODUCT_CODE) {
          return of({ ...mockProduct, name: '' });
        }
        if (code === NESTED_PRODUCT_CODE) {
          return of(mockNestedProduct);
        }
        return of(mockProduct);
      });
      initialize();

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-title',
        NESTED_PRODUCT_NAME
      );
    });

    it('should render the ghost title when no nested name or base product code can be resolved', () => {
      setDataForNestedContainerProduct();
      const outerRowGroup = mockConfiguration.groups?.[0]?.subGroups[0];
      expect(outerRowGroup).toBeDefined();
      if (outerRowGroup) {
        outerRowGroup.name = '';
        outerRowGroup.description = '';
      }
      mockConfiguration.productCode = undefined as unknown as string;
      mockConfiguration.overview = undefined;
      mockRouterData.productCode = undefined;
      initialize({ keepGhostStyle: true });

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-general-product-info'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-general-product-info'
      );
    });

    it('should render the ghost title when the catalog product cannot be loaded for a non-nested group', () => {
      setDataForNestedContainerProduct();
      mockConfiguration.interactionState = { currentGroup: ROOT_TAB_ID };
      spyOn(productService, 'get').and.returnValue(
        throwError(() => new Error('not found'))
      );
      initialize();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-general-product-info'
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
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-ghost-general-product-info'
    );
  });

  it('should render the ghost product title when no product is available', () => {
    setDataForProductConfiguration();
    spyOn(productService, 'get').and.returnValue(of(undefined));
    initialize({ keepGhostStyle: true });

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-ghost-general-product-info'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-general-product-info'
    );
  });

  it('should render product details, image and show-less label after expanding', () => {
    setDataForProductConfiguration();
    initialize();

    const toggleButton = htmlElem.querySelector('button');
    toggleButton?.click();
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
      'configurator.header.showLess'
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-detail-title',
      PRODUCT_NAME
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-code',
      PRODUCT_CODE
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-description',
      PRODUCT_DESCRIPTION
    );

    const media = fixture.debugElement.query(By.css('cx-media'));
    expect(media.componentInstance.container).toEqual(
      mockProduct.images?.PRIMARY
    );
    expect(media.componentInstance.format).toBe('product');

    const icon = fixture.debugElement.query(By.css('cx-icon'));
    expect(icon.componentInstance.type).toBe(component.iconTypes.CARET_UP);
  });

  it('should render the show more icon when details are collapsed', () => {
    setDataForProductConfiguration();
    initialize();

    const icon = fixture.debugElement.query(By.css('cx-icon'));
    expect(icon.componentInstance.type).toBe(component.iconTypes.CARET_DOWN);
  });

  it('should not render name, code or description spans when those product fields are missing', () => {
    setDataForProductConfiguration();
    spyOn(productService, 'get').and.returnValue(
      of({
        ...mockProduct,
        name: undefined,
        code: undefined,
        description: undefined,
      })
    );
    initialize();
    component.triggerDetails();
    changeDetectorRef.detectChanges();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-detail-title span'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-code span'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-description span'
    );
  });

  it('should not render kb key details when expert mode is disabled', () => {
    spyOn(configExpertModeService, 'getExpModeActive').and.returnValue(
      of(false)
    );
    setDataForProductConfiguration();
    initialize();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'div.cx-kb-key-details'
    );
  });

  it('should not render kb key details when the configuration has no kb key', () => {
    setDataForProductConfiguration();
    mockConfiguration.kbKey = undefined;
    initialize();

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'div.cx-kb-key-details'
    );
  });

  it('should render only the kb key fields that are present', () => {
    setDataForProductConfiguration();
    mockConfiguration.kbKey = {
      kbName: PRODUCT_CODE + '_KB',
    };
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
      1
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'span.cx-value',
      mockConfiguration.kbKey?.kbName ?? ''
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
        'configurator.a11y.showLessProductInfo product:productName'
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

    it("should contain div element with class name 'cx-details-image' and 'aria-hidden' attribute that removes the product image from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-details-image',
        0,
        'aria-hidden',
        'true'
      );
    });

    it("should contain span element with 'aria-level' attribute that defines an accessible level for the heading", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        0,
        'aria-level',
        '1',
        mockProduct.name
      );
    });

    it("should contain span element with 'title' attribute for product name that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        2,
        'title',
        'configurator.a11y.productName',
        mockProduct.name
      );
    });

    it("should contain span element with 'title' attribute for product code that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        3,
        'title',
        'configurator.a11y.productCode',
        mockProduct.code
      );
    });

    it("should contain span element with 'title' attribute for product description that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        4,
        'title',
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
