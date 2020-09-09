import { ChangeDetectionStrategy, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Configurator,
  GenericConfigurator,
  GlobalMessageService,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { ConfigurationRouter } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorCartService } from '../../core/facade/configurator-cart.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import * as ConfigurationTestData from '../../shared/testing/configuration-test-data';
import { ConfiguratorAddToCartButtonComponent } from './configurator-add-to-cart-button.component';

const CART_ENTRY_KEY = '1';
const configuratorType = 'cpqconfigurator';

const ROUTE_OVERVIEW = 'configureOverviewCPQCONFIGURATOR';

const mockProductConfiguration = ConfigurationTestData.productConfiguration;

const navParamsOverview: any = {
  cxRoute: 'configureOverview' + configuratorType,
  params: { ownerType: 'cartEntry', entityKey: CART_ENTRY_KEY },
};

const attributes = {};

const mockRouterData: ConfigurationRouter.Data = {
  configuratorType: configuratorType,
  pageType: ConfigurationRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: mockProductConfiguration.owner,
};

let component: ConfiguratorAddToCartButtonComponent;
let fixture: ComponentFixture<ConfiguratorAddToCartButtonComponent>;
let htmlElem: HTMLElement;
let routerStateObservable = null;
let productConfigurationObservable = null;
let pendingChangesObservable = null;

function initialize() {
  routerStateObservable = of(mockRouterState);
  productConfigurationObservable = of(mockProductConfiguration);
  fixture = TestBed.createComponent(ConfiguratorAddToCartButtonComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  fixture.detectChanges();
}

class MockGlobalMessageService {
  add(): void {}
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return productConfigurationObservable;
  }
  removeConfiguration() {}
  removeUiState() {}
  hasPendingChanges() {
    return pendingChangesObservable;
  }
}

class MockConfiguratorCartService {
  updateCartEntry() {}
  addToCart() {}
}

class MockConfiguratorGroupsService {
  setGroupStatus() {}
}

function setRouterTestDataCartBoundAndConfigPage() {
  mockRouterState.state.params = {
    entityKey: CART_ENTRY_KEY,
    ownerType: GenericConfigurator.OwnerType.CART_ENTRY,
  };
  mockRouterState.state.semanticRoute = ROUTE_CONFIGURATION;
  mockRouterData.isOwnerCartEntry = true;
  mockRouterData.owner.type = GenericConfigurator.OwnerType.CART_ENTRY;
  mockRouterData.owner.id = CART_ENTRY_KEY;
  mockRouterData.pageType = ConfigurationRouter.PageType.CONFIGURATION;
}

function setRouterTestDataProductBoundAndConfigPage() {
  mockRouterState.state.params = {
    entityKey: ConfigurationTestData.PRODUCT_CODE,
    ownerType: GenericConfigurator.OwnerType.PRODUCT,
  };
  mockRouterState.state.semanticRoute = ROUTE_CONFIGURATION;
  mockRouterData.isOwnerCartEntry = false;
  mockRouterData.owner.type = GenericConfigurator.OwnerType.PRODUCT;
  mockRouterData.owner.id = ConfigurationTestData.PRODUCT_CODE;
  mockRouterData.pageType = ConfigurationRouter.PageType.CONFIGURATION;
}

function performAddToCartOnOverview() {
  setRouterTestDataProductBoundAndConfigPage();
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.pageType = ConfigurationRouter.PageType.OVERVIEW;
  initialize();
  component.onAddToCart(mockProductConfiguration, mockRouterData);
}

function performUpdateCart() {
  ensureCartBound();
  component.onAddToCart(mockProductConfiguration, mockRouterData);
}

function ensureCartBound() {
  setRouterTestDataCartBoundAndConfigPage();
  mockProductConfiguration.owner.id = CART_ENTRY_KEY;
  initialize();
}

function ensureCartBoundAndOnOverview() {
  setRouterTestDataCartBoundAndConfigPage();
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.pageType = ConfigurationRouter.PageType.OVERVIEW;
  initialize();
}

function ensureProductBound() {
  setRouterTestDataProductBoundAndConfigPage();
  mockProductConfiguration.nextOwner.id = CART_ENTRY_KEY;
  initialize();
}

function performUpdateOnOV() {
  ensureCartBoundAndOnOverview();
  component.onAddToCart(mockProductConfiguration, mockRouterData);
}
const ROUTE_CONFIGURATION = 'configureCPQCONFIGURATOR';
const mockRouterState: any = {
  state: {
    semanticRoute: ROUTE_CONFIGURATION,
    params: {
      entityKey: ConfigurationTestData.PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
  },
};
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
  go() {}
}

describe('ConfigAddToCartButtonComponent', () => {
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let configuratorGroupsService: ConfiguratorGroupsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfiguratorAddToCartButtonComponent],
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
      .overrideComponent(ConfiguratorAddToCartButtonComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    routerStateObservable = null;
    productConfigurationObservable = null;
    pendingChangesObservable = of(false);
    initialize();
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
    initialize();
    expect(component).toBeTruthy();
  });

  it('should render button that is not disabled in case there are no pending changes', () => {
    initialize();
    expect(
      htmlElem
        .querySelector('.cx-config-add-to-cart-btn')
        .innerHTML.includes('disabled')
    ).toBe(false);
  });

  it('should render disabled button in case there are pending changes', () => {
    pendingChangesObservable = of(true);
    initialize();
    expect(
      htmlElem
        .querySelector('.cx-config-add-to-cart-btn')
        .innerHTML.includes('disabled')
    ).toBe(true);
  });

  describe('onAddToCart', () => {
    it('should navigate to OV in case configuration is cart bound and we are on product config page', () => {
      mockRouterData.pageType = ConfigurationRouter.PageType.CONFIGURATION;
      performUpdateCart();
      expect(routingService.go).toHaveBeenCalledWith(
        navParamsOverview,
        attributes
      );

      expect(configuratorGroupsService.setGroupStatus).toHaveBeenCalled();
    });

    it('should navigate to cart in case configuration is cart bound and we are on OV config page', () => {
      performUpdateOnOV();
      expect(routingService.go).toHaveBeenCalledWith('cart');
    });

    it('should not remove configuration for cart entry owner in case configuration is cart bound and we are on OV page and no changes happened', () => {
      mockProductConfiguration.isCartEntryUpdateRequired = false;
      performUpdateOnOV();
      expect(
        configuratorCommonsService.removeConfiguration
      ).toHaveBeenCalledTimes(0);
    });

    it('should not remove configuration and display no message in case continue to cart is triggered on config page', () => {
      mockProductConfiguration.isCartEntryUpdateRequired = false;
      mockRouterData.pageType = ConfigurationRouter.PageType.CONFIGURATION;
      performUpdateCart();
      expect(
        configuratorCommonsService.removeConfiguration
      ).toHaveBeenCalledTimes(0);
      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
    });

    it('should display a message in case done is triggered on config page which means that there are pending changes', () => {
      mockProductConfiguration.isCartEntryUpdateRequired = true;
      performUpdateCart();
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });

    it('should display updateCart message if configuration has already been added', () => {
      ensureCartBound();
      mockProductConfiguration.isCartEntryUpdateRequired = true;
      component.onAddToCart(mockProductConfiguration, mockRouterData);
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });

    it('should navigate to overview in case configuration has not been added yet and we are on configuration page', () => {
      ensureProductBound();
      component.onAddToCart(mockProductConfiguration, mockRouterData);
      expect(routingService.go).toHaveBeenCalledWith(
        navParamsOverview,
        attributes
      );
    });

    it('should display addToCart message in case configuration has not been added yet', () => {
      ensureProductBound();
      component.onAddToCart(mockProductConfiguration, mockRouterData);
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });

    it('should navigate to cart in case configuration has not yet been added and process was triggered from overview', () => {
      mockRouterData.pageType = ConfigurationRouter.PageType.OVERVIEW;
      performAddToCartOnOverview();
      expect(routingService.go).toHaveBeenCalledWith('cart');
    });

    it('should remove configuration in case configuration has not yet been added and process was triggered from overview', () => {
      performAddToCartOnOverview();
      expect(
        configuratorCommonsService.removeConfiguration
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('performNavigation', () => {
    it('should display message on addToCart ', () => {
      component.performNavigation(
        configuratorType,
        mockProductConfiguration.owner,
        true,
        true,
        true
      );
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });
    it('should display no message on addToCart in case this is not desired', () => {
      component.performNavigation(
        configuratorType,
        mockProductConfiguration.owner,
        true,
        true,
        false
      );
      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
    });
  });
});
