import { ChangeDetectionStrategy, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Configurator,
  ConfiguratorCommonsService,
  GenericConfigurator,
  GlobalMessageService,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigAddToCartButtonComponent } from './config-add-to-cart-button.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_KEY = '1';
const configuratorType = 'cpqconfigurator';

const mockRouterState: any = {
  state: {
    url: 'host:port/electronics-spa/en/USD/configureCPQCONFIGURATOR',
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
  },
};

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
    url: 'host:port/electronics-spa/en/USD/configureOverviewCPQCONFIGURATOR',
  };
  classUnderTest.onAddToCart(
    productConfiguration.owner,
    productConfiguration.configId,
    configuratorType
  );
}

function performAddToCartWhenAdded(
  classUnderTest: ConfigAddToCartButtonComponent
) {
  mockRouterState.state.params = {
    ownerType: GenericConfigurator.OwnerType.CART_ENTRY,
    entityKey: CART_ENTRY_KEY,
  };
  classUnderTest.onAddToCart(
    productConfiguration.owner,
    productConfiguration.configId,
    configuratorType
  );
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
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    configuratorCommonsService = TestBed.get(ConfiguratorCommonsService as Type<
      ConfiguratorCommonsService
    >);
    globalMessageService = TestBed.get(GlobalMessageService as Type<
      GlobalMessageService
    >);
    spyOn(routingService, 'go').and.callThrough();
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(configuratorCommonsService, 'removeConfiguration').and.callThrough();
    spyOn(configuratorCommonsService, 'removeUiState').and.callThrough();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should navigate to cart in case configuration has already been added', () => {
    performAddToCartWhenAdded(classUnderTest);
    expect(routingService.go).toHaveBeenCalledWith('cart');
  });

  it('should not remove configuration for product owner in case configuration has already been added', () => {
    performAddToCartWhenAdded(classUnderTest);
    expect(
      configuratorCommonsService.removeConfiguration
    ).toHaveBeenCalledTimes(0);
  });

  it('should not remove UI state for product owner in case configuration has already been added', () => {
    performAddToCartWhenAdded(classUnderTest);
    expect(configuratorCommonsService.removeUiState).toHaveBeenCalledTimes(0);
  });

  it('should not display addToCart message if configuration has already been added', () => {
    mockRouterState.state.params = {
      ownerType: GenericConfigurator.OwnerType.CART_ENTRY,
      entityKey: CART_ENTRY_KEY,
    };
    classUnderTest.onAddToCart(
      productConfiguration.owner,
      productConfiguration.configId,
      configuratorType
    );
    expect(globalMessageService.add).toHaveBeenCalledTimes(0);
  });

  it('should navigate to overview in case configuration has not been added yet', () => {
    mockRouterState.state.params = {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    };
    classUnderTest.onAddToCart(
      productConfiguration.owner,
      productConfiguration.configId,
      configuratorType
    );
    expect(routingService.go).toHaveBeenCalledWith(
      'configureOverview' +
        configuratorType +
        '/cartEntry/entityKey/' +
        productConfiguration.nextOwner.id,
      {}
    );
  });

  it('should display addToCart message in case configuration has not been added yet', () => {
    mockRouterState.state.params = {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    };
    classUnderTest.onAddToCart(
      productConfiguration.owner,
      productConfiguration.configId,
      configuratorType
    );
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
