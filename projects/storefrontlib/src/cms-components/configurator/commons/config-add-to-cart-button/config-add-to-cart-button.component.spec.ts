import { ChangeDetectionStrategy, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigurator,
  GlobalMessageService,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigurationRouter } from '../../generic/service/config-router-data';
import { ConfigAddToCartButtonComponent } from './config-add-to-cart-button.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_KEY = '1';
const configuratorType = 'cpqconfigurator';
const pageTypeConfiguration = ConfigurationRouter.PageType.CONFIGURATION;
const URL_CONFIGURATION =
  'host:port/electronics-spa/en/USD/configureCPQCONFIGURATOR';
const URL_OVERVIEW =
  'host:port/electronics-spa/en/USD/configureOverviewCPQCONFIGURATOR';

const mockRouterState: any = {
  state: {
    url: URL_CONFIGURATION,
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
  },
};
const navParamsOverview: any =
  'configureOverview' +
  configuratorType +
  '/cartEntry/entityKey/' +
  CART_ENTRY_KEY;
const attribs = {};

const productConfiguration: Configurator.Configuration = {
  configId: '1234-56-7890',
  consistent: true,
  complete: true,
  productCode: PRODUCT_CODE,
  owner: {
    id: PRODUCT_CODE,
    type: GenericConfigurator.OwnerType.PRODUCT,
  },
  nextOwner: {
    type: GenericConfigurator.OwnerType.CART_ENTRY,
  },
  groups: [
    {
      configurable: true,
      description: 'Core components',
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      id: '1-CPQ_LAPTOP.1',
      name: '1',
      attributes: [
        {
          label: 'Expected Number',
          name: 'EXP_NUMBER',
          required: true,
          uiType: Configurator.UiType.NOT_IMPLEMENTED,
          values: [],
        },
        {
          label: 'Processor',
          name: 'CPQ_CPU',
          required: true,
          selectedSingleValue: 'INTELI5_35',
          uiType: Configurator.UiType.RADIOBUTTON,
          values: [],
        },
      ],
    },
    {
      configurable: true,
      description: 'Peripherals & Accessories',
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      id: '1-CPQ_LAPTOP.2',
      name: '2',
      attributes: [],
    },
    {
      configurable: true,
      description: 'Software ',
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      id: '1-CPQ_LAPTOP.3',
      name: '3',
      attributes: [],
    },
  ],
  interactionState: {
    currentGroup: '1-CPQ_LAPTOP.2',
    menuParentGroup: '1-CPQ_LAPTOP.3',
    groupsStatus: {},
    groupsVisited: {},
  },
};

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
  go() {}
}

class MockGlobalMessageService {
  add(): void {}
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(productConfiguration);
  }
  addToCart() {}
  updateCartEntry() {}
  removeConfiguration() {}
  removeUiState() {}
}

class MockConfiguratorGroupsService {
  setGroupStatus() {}
}

function performAddToCartOnOverview(
  classUnderTest: ConfigAddToCartButtonComponent
) {
  mockRouterState.state = {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
    url: URL_OVERVIEW,
  };
  classUnderTest.onAddToCart(
    productConfiguration,
    configuratorType,
    ConfigurationRouter.PageType.OVERVIEW
  );
}

function performUpdateCart(classUnderTest: ConfigAddToCartButtonComponent) {
  ensureCartBound();
  classUnderTest.onAddToCart(
    productConfiguration,
    configuratorType,
    pageTypeConfiguration
  );
}

function ensureCartBound() {
  mockRouterState.state.params = {
    ownerType: GenericConfigurator.OwnerType.CART_ENTRY,
    entityKey: CART_ENTRY_KEY,
  };
  productConfiguration.owner.id = CART_ENTRY_KEY;
}

function ensureCartBoundAndOnOverview() {
  mockRouterState.state.params = {
    ownerType: GenericConfigurator.OwnerType.CART_ENTRY,
    entityKey: CART_ENTRY_KEY,
  };
  mockRouterState.state.url = URL_OVERVIEW;
  productConfiguration.owner.id = CART_ENTRY_KEY;
}

function ensureProductBound() {
  mockRouterState.state.params = {
    entityKey: PRODUCT_CODE,
    ownerType: GenericConfigurator.OwnerType.PRODUCT,
  };
  mockRouterState.state.url = URL_CONFIGURATION;
  productConfiguration.nextOwner.id = CART_ENTRY_KEY;
}

function performUpdateOnOV(classUnderTest: ConfigAddToCartButtonComponent) {
  ensureCartBoundAndOnOverview();
  classUnderTest.onAddToCart(
    productConfiguration,
    configuratorType,
    ConfigurationRouter.PageType.OVERVIEW
  );
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

    it('should remove configuration for product owner in case configuration is cart bound and we are on OV page, because we need to force a cart re-read', () => {
      performUpdateOnOV(classUnderTest);
      expect(
        configuratorCommonsService.removeConfiguration
      ).toHaveBeenCalledTimes(0);
    });

    it('should not remove configuration and display no message in case continue to cart is triggered on config page', () => {
      productConfiguration.isCartEntryUpdateRequired = false;
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
      classUnderTest.onAddToCart(
        productConfiguration,
        configuratorType,
        pageTypeConfiguration
      );
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });

    it('should navigate to overview in case configuration has not been added yet and we are on configuration page', () => {
      ensureProductBound();
      classUnderTest.onAddToCart(
        productConfiguration,
        configuratorType,
        pageTypeConfiguration
      );
      expect(routingService.go).toHaveBeenCalledWith(
        navParamsOverview,
        attribs
      );
    });

    it('should display addToCart message in case configuration has not been added yet', () => {
      ensureProductBound();
      classUnderTest.onAddToCart(
        productConfiguration,
        configuratorType,
        pageTypeConfiguration
      );
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });

    it('should navigate to cart in case configuration has not yet been added and process was triggered from overview', () => {
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
        '',
        true,
        true
      );
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });
    it('should display no message on addToCart in case this is not desired', () => {
      classUnderTest.performNavigation(
        configuratorType,
        productConfiguration.owner,
        '',
        true,
        false
      );
      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
    });
  });
});
