import { ChangeDetectionStrategy, Type } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  Configurator,
  ConfiguratorCommonsService,
  GenericConfigurator,
  GlobalMessageService,
  I18nTestingModule,
  RouterState,
  RoutingService
} from "@spartacus/core";
import { Observable, of } from "rxjs";
import { ConfigAddToCartButtonComponent } from "./config-add-to-cart-button.component";

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_KEY = '1';
const configuratorType = 'cpqconfigurator';
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
  classUnderTest.onAddToCart(productConfiguration, configuratorType);
}

function performAddToCartWhenAdded(
  classUnderTest: ConfigAddToCartButtonComponent
) {
  ensureCartBound();
  classUnderTest.onAddToCart(productConfiguration, configuratorType);
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

function performAddToCartWhenAddedAndOnOV(
  classUnderTest: ConfigAddToCartButtonComponent
) {
  ensureCartBoundAndOnOverview();
  classUnderTest.onAddToCart(productConfiguration, configuratorType);
}

describe('ConfigAddToCartButtonComponent', () => {
  let classUnderTest: ConfigAddToCartButtonComponent;
  let fixture: ComponentFixture<ConfigAddToCartButtonComponent>;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let configuratorCommonsService: ConfiguratorCommonsService;

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
    spyOn(routingService, 'go').and.callThrough();
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(configuratorCommonsService, 'removeConfiguration').and.callThrough();
    spyOn(configuratorCommonsService, 'removeUiState').and.callThrough();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should navigate to OV in case configuration is cart bound and we are on product config page', () => {
    performAddToCartWhenAdded(classUnderTest);
    expect(routingService.go).toHaveBeenCalledWith(navParamsOverview, attribs);
  });

  it('should navigate to cart in case configuration is cart bound and we are on OV config page', () => {
    performAddToCartWhenAddedAndOnOV(classUnderTest);
    expect(routingService.go).toHaveBeenCalledWith('cart');
  });

  it('should remove configuration for product owner in case configuration is cart bound, because we need to force a cart re-read', () => {
    performAddToCartWhenAdded(classUnderTest);
    expect(
      configuratorCommonsService.removeConfiguration
    ).toHaveBeenCalledTimes(1);
  });

  it('should remove configuration for product owner in case configuration is cart bound and we are on OV page, because we need to force a cart re-read', () => {
    performAddToCartWhenAddedAndOnOV(classUnderTest);
    expect(
      configuratorCommonsService.removeConfiguration
    ).toHaveBeenCalledTimes(1);
  });

  it('should not remove UI state for product owner in case configuration has already been added', () => {
    performAddToCartWhenAdded(classUnderTest);
    expect(configuratorCommonsService.removeUiState).toHaveBeenCalledTimes(0);
  });

  it('should display updateCart message if configuration has already been added', () => {
    ensureCartBound();
    classUnderTest.onAddToCart(productConfiguration, configuratorType);
    expect(globalMessageService.add).toHaveBeenCalledTimes(1);
  });

  it('should navigate to overview in case configuration has not been added yet and we are on configuration page', () => {
    ensureProductBound();
    classUnderTest.onAddToCart(productConfiguration, configuratorType);
    expect(routingService.go).toHaveBeenCalledWith(navParamsOverview, attribs);
  });

  it('should display addToCart message in case configuration has not been added yet', () => {
    ensureProductBound();
    classUnderTest.onAddToCart(productConfiguration, configuratorType);
    expect(globalMessageService.add).toHaveBeenCalledTimes(1);
  });

  it('should navigate to cart in case configuration has not yet been added and process was triggered from overview', () => {
    performAddToCartOnOverview(classUnderTest);
    expect(routingService.go).toHaveBeenCalledWith('cart');
  });

  it('should remove UI state in case configuration has not yet been added and process was triggered from overview', () => {
    performAddToCartOnOverview(classUnderTest);
    expect(configuratorCommonsService.removeUiState).toHaveBeenCalledTimes(1);
  });

  it('should remove configuration in case configuration has not yet been added and process was triggered from overview', () => {
    performAddToCartOnOverview(classUnderTest);
    expect(
      configuratorCommonsService.removeConfiguration
    ).toHaveBeenCalledTimes(1);
  });
});
