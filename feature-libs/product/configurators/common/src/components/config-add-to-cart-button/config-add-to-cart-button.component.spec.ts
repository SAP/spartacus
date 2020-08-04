import { ChangeDetectionStrategy, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Configurator,
  ConfiguratorCartService,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigurator,
  GlobalMessageService,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { ConfigurationRouter } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import * as ConfigurationTestData from 'projects/storefrontlib/src/cms-components/configurator/commons/configuration-test-data';
import { ConfigAddToCartButtonComponent } from './config-add-to-cart-button.component';

const CART_ENTRY_KEY = '1';
const configuratorType = 'cpqconfigurator';

const URL_OVERVIEW =
  'host:port/electronics-spa/en/USD/configureOverviewCPQCONFIGURATOR';

const productConfiguration = ConfigurationTestData.productConfiguration;
const navParamsOverview: any =
  'configureOverview' +
  configuratorType +
  '/cartEntry/entityKey/' +
  CART_ENTRY_KEY;
const attribs = {};

const routerData: ConfigurationRouter.Data = {
  configuratorType: configuratorType,
  pageType: ConfigurationRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: productConfiguration.owner,
};

class MockGlobalMessageService {
  add(): void {}
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(ConfigurationTestData.productConfiguration);
  }
  removeConfiguration() {}
  removeUiState() {}
}

class MockConfiguratorCartService {
  updateCartEntry() {}
  addToCart() {}
}

class MockConfiguratorGroupsService {
  setGroupStatus() {}
}

function performAddToCartOnOverview(
  classUnderTest: ConfigAddToCartButtonComponent
) {
  mockRouterState.state = {
    params: {
      entityKey: ConfigurationTestData.PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
    url: URL_OVERVIEW,
  };
  classUnderTest.onAddToCart(productConfiguration, routerData);
}

function performUpdateCart(classUnderTest: ConfigAddToCartButtonComponent) {
  ensureCartBound();

  classUnderTest.onAddToCart(productConfiguration, routerData);
}

function ensureCartBound() {
  routerData.isOwnerCartEntry = true;
  routerData.owner.type = GenericConfigurator.OwnerType.CART_ENTRY;
  routerData.owner.id = CART_ENTRY_KEY;
  productConfiguration.owner.id = CART_ENTRY_KEY;
}

function ensureCartBoundAndOnOverview() {
  routerData.isOwnerCartEntry = true;
  routerData.owner.type = GenericConfigurator.OwnerType.CART_ENTRY;
  routerData.owner.id = CART_ENTRY_KEY;
  routerData.pageType = ConfigurationRouter.PageType.OVERVIEW;
  productConfiguration.owner.id = CART_ENTRY_KEY;
}

function ensureProductBound() {
  mockRouterState.state.params = {
    entityKey: ConfigurationTestData.PRODUCT_CODE,
    ownerType: GenericConfigurator.OwnerType.PRODUCT,
  };
  mockRouterState.state.url = URL_CONFIGURATION;
  productConfiguration.nextOwner.id = CART_ENTRY_KEY;
}

function performUpdateOnOV(classUnderTest: ConfigAddToCartButtonComponent) {
  ensureCartBoundAndOnOverview();
  classUnderTest.onAddToCart(productConfiguration, routerData);
}
const URL_CONFIGURATION =
  'host:port/electronics-spa/en/USD/configureCPQCONFIGURATOR';
const mockRouterState: any = {
  state: {
    url: URL_CONFIGURATION,
    params: {
      entityKey: ConfigurationTestData.PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
  },
};
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
  go() {}
}

describe('ConfigAddToCartButtonComponent', () => {
  let classUnderTest: ConfigAddToCartButtonComponent;
  let fixture: ComponentFixture<ConfigAddToCartButtonComponent>;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let configuratorGroupsService: ConfiguratorGroupsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfigAddToCartButtonComponent],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: ConfiguratorCartService,
          useClass: MockConfiguratorCartService,
        },
        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    })
      .overrideComponent(ConfigAddToCartButtonComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAddToCartButtonComponent);
    classUnderTest = fixture.componentInstance;
    fixture.detectChanges();
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
    globalMessageService = TestBed.inject(
      GlobalMessageService as Type<GlobalMessageService>
    );
    configuratorGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );
    spyOn(configuratorGroupsService, 'setGroupStatus').and.callThrough();
    spyOn(routingService, 'go').and.callThrough();
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(configuratorCommonsService, 'removeConfiguration').and.callThrough();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('onAddToCart', () => {
    it('should navigate to OV in case configuration is cart bound and we are on product config page', () => {
      routerData.pageType = ConfigurationRouter.PageType.CONFIGURATION;
      performUpdateCart(classUnderTest);
      expect(routingService.go).toHaveBeenCalledWith(
        navParamsOverview,
        attribs
      );

      expect(configuratorGroupsService.setGroupStatus).toHaveBeenCalled();
    });

    it('should navigate to cart in case configuration is cart bound and we are on OV config page', () => {
      performUpdateOnOV(classUnderTest);
      expect(routingService.go).toHaveBeenCalledWith('cart');
    });

    it('should not remove configuration for cart entry owner in case configuration is cart bound and we are on OV page', () => {
      performUpdateOnOV(classUnderTest);
      expect(
        configuratorCommonsService.removeConfiguration
      ).toHaveBeenCalledTimes(0);
    });

    it('should not remove configuration and display no message in case continue to cart is triggered on config page', () => {
      productConfiguration.isCartEntryUpdateRequired = false;
      routerData.pageType = ConfigurationRouter.PageType.CONFIGURATION;
      performUpdateCart(classUnderTest);
      expect(
        configuratorCommonsService.removeConfiguration
      ).toHaveBeenCalledTimes(0);
      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
    });

    it('should display a message in case done is triggered on config page which means that there are pending changes', () => {
      productConfiguration.isCartEntryUpdateRequired = true;
      performUpdateCart(classUnderTest);
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });

    it('should display updateCart message if configuration has already been added', () => {
      ensureCartBound();
      classUnderTest.onAddToCart(productConfiguration, routerData);
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });

    it('should navigate to overview in case configuration has not been added yet and we are on configuration page', () => {
      ensureProductBound();
      classUnderTest.onAddToCart(productConfiguration, routerData);
      expect(routingService.go).toHaveBeenCalledWith(
        navParamsOverview,
        attribs
      );
    });

    it('should display addToCart message in case configuration has not been added yet', () => {
      ensureProductBound();
      classUnderTest.onAddToCart(productConfiguration, routerData);
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });

    it('should navigate to cart in case configuration has not yet been added and process was triggered from overview', () => {
      routerData.pageType = ConfigurationRouter.PageType.OVERVIEW;
      performAddToCartOnOverview(classUnderTest);
      expect(routingService.go).toHaveBeenCalledWith('cart');
    });

    it('should remove configuration in case configuration has not yet been added and process was triggered from overview', () => {
      performAddToCartOnOverview(classUnderTest);
      expect(
        configuratorCommonsService.removeConfiguration
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('performNavigation', () => {
    it('should display message on addToCart ', () => {
      classUnderTest.performNavigation(
        configuratorType,
        productConfiguration.owner,
        true,
        true,
        true
      );
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });
    it('should display no message on addToCart in case this is not desired', () => {
      classUnderTest.performNavigation(
        configuratorType,
        productConfiguration.owner,
        true,
        true,
        false
      );
      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
    });
  });
});
