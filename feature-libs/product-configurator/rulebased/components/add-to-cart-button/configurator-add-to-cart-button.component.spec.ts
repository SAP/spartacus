import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { Cart, MultiCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Order, OrderHistoryFacade } from '@spartacus/order/root';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { ICON_TYPE, IntersectionService } from '@spartacus/storefront';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
import { Observable, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCartService } from '../../core/facade/configurator-cart.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorQuantityService } from '../../core/services/configurator-quantity.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorStorefrontUtilsService } from '../service';
import { KeyboardFocusService } from '@spartacus/storefront';
import { ConfiguratorAddToCartButtonComponent } from './configurator-add-to-cart-button.component';

const CART_ENTRY_KEY = '001+1';
const ORDER_ENTRY_KEY = '001+1';
const QUOTE_CODE = '003';
const QUOTE_ENTRY_KEY = QUOTE_CODE + '+1';
const QUANTITY = 99;
const QUANTITY_CHANGED = 7;

const configuratorType = ConfiguratorType.VARIANT;

const ROUTE_OVERVIEW = 'configureOverviewCPQCONFIGURATOR';

const mockProductConfiguration = ConfigurationTestData.productConfiguration;

const mockProductConfigurationWithoutPriceSummary =
  ConfigurationTestData.productConfigurationWithConflicts;

const mockProductConfigurationWithoutBasePrice =
  ConfigurationTestData.productConfigurationWithoutBasePrice;

const mockProductConfigurationWithoutSelectedOptions =
  ConfigurationTestData.productConfigurationWithoutSelectedOptions;

const mockProductConfigurationWithoutTotalPrice =
  ConfigurationTestData.mockProductConfigurationWithoutTotalPrice;

const mockProductConfigurationWithPriceSummaryButNoPrices =
  ConfigurationTestData.mockProductConfigurationWithPriceSummaryButNoPrices;

const navParamsOverview: any = {
  cxRoute: 'configureOverview' + configuratorType,
  params: { ownerType: 'cartEntry', entityKey: CART_ENTRY_KEY },
};

const mockOwner = mockProductConfiguration.owner;
const mockRouterData: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: mockOwner,
};

const mockOrder: Order = {
  code: '1',
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  template: '',
  selector: 'cx-item-counter',
})
class MockItemCounterComponent {
  @Input() min: number;
  @Input() max: number;
  @Input() step: any;
  @Input() control: any;
  @Input() allowZero: boolean;
}

let component: ConfiguratorAddToCartButtonComponent;
let fixture: ComponentFixture<ConfiguratorAddToCartButtonComponent>;
let htmlElem: HTMLElement;
let routerStateObservable: Observable<any>;
let productConfigurationObservable: Observable<any>;
let pendingChangesObservable: Observable<any>;
let elementMock: { style: any };
let orderEntryObservable: Observable<any>;

function initialize() {
  routerStateObservable = of(mockRouterState);
  productConfigurationObservable = of(mockProductConfiguration);
  orderEntryObservable = of(mockOrderEntry);
  fixture = TestBed.createComponent(ConfiguratorAddToCartButtonComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  component.quantityControl = new UntypedFormControl(1);
  fixture.detectChanges();
}

class MockGlobalMessageService {
  add(): void {}
}

class MockConfiguratorQuantityService {
  getQuantity(): Observable<number> {
    return of(QUANTITY);
  }
  setQuantity(): void {}
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return productConfigurationObservable;
  }

  getOrCreateConfiguration(): Observable<Configurator.Configuration> {
    return productConfigurationObservable;
  }

  getConfigurationWithOverview(): Observable<Configurator.Configuration> {
    return productConfigurationObservable;
  }

  removeConfiguration() {}

  removeUiState() {}

  hasPendingChanges() {
    return pendingChangesObservable;
  }
}

const mockOrderEntry: OrderEntry = { orderCode: '123' };

class MockConfiguratorCartService {
  updateCartEntry() {}

  addToCart() {}

  getEntry() {
    return orderEntryObservable;
  }
}

class MockConfiguratorGroupsService {
  setGroupStatusVisited() {}
}

class MockCommonConfiguratorUtilsService {
  decomposeOwnerId(ownerId: string): any {
    const parts: string[] = ownerId.split('+');
    const result = { documentId: parts[0], entryNumber: parts[1] };
    return result;
  }
}

class MockOrderHistoryFacade implements Partial<OrderHistoryFacade> {
  loadOrderDetails() {}

  getOrderDetails(): Observable<Order> {
    return of(mockOrder);
  }
}

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(mockRouterData);
  }
}

class MockIntersectionService {
  isIntersecting(): Observable<boolean> {
    return of(false);
  }
}
const cart: Cart = { quoteCode: QUOTE_CODE };
class MockMultiCartFacade implements Partial<MultiCartFacade> {
  getCart(): Observable<Cart> {
    return of(cart);
  }
}

function setRouterTestDataCartBoundAndConfigPage() {
  mockRouterState.state.params = {
    entityKey: CART_ENTRY_KEY,
    ownerType: CommonConfigurator.OwnerType.CART_ENTRY,
  };
  mockRouterState.state.semanticRoute = ROUTE_CONFIGURATION;
  mockRouterData.isOwnerCartEntry = true;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.CART_ENTRY;
  mockRouterData.owner.id = CART_ENTRY_KEY;
  mockRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
}

function setRouterTestDataProductBoundAndConfigPage() {
  mockRouterState.state.params = {
    entityKey: ConfigurationTestData.PRODUCT_CODE,
    ownerType: CommonConfigurator.OwnerType.PRODUCT,
  };
  mockRouterState.state.semanticRoute = ROUTE_CONFIGURATION;
  mockRouterData.isOwnerCartEntry = false;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.PRODUCT;
  mockRouterData.owner.id = ConfigurationTestData.PRODUCT_CODE;
  mockRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
}

function setRouterTestDataReadOnlyCart() {
  mockRouterState.state.params = {
    entityKey: CART_ENTRY_KEY,
    ownerType: CommonConfigurator.OwnerType.CART_ENTRY,
  };
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.isOwnerCartEntry = true;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.CART_ENTRY;
  mockRouterData.owner.id = CART_ENTRY_KEY;
  mockRouterData.pageType = ConfiguratorRouter.PageType.OVERVIEW;
}

function setRouterTestDataReadOnlyOrder() {
  mockRouterState.state.params = {
    entityKey: ORDER_ENTRY_KEY,
    ownerType: CommonConfigurator.OwnerType.ORDER_ENTRY,
  };
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.isOwnerCartEntry = false;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.ORDER_ENTRY;
  mockRouterData.owner.id = ORDER_ENTRY_KEY;
  mockRouterData.pageType = ConfiguratorRouter.PageType.OVERVIEW;
  mockRouterData.displayOnly = true;
}

function setRouterTestDataReadOnlyQuote() {
  mockRouterState.state.params = {
    entityKey: QUOTE_ENTRY_KEY,
    ownerType: CommonConfigurator.OwnerType.QUOTE_ENTRY,
  };
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.isOwnerCartEntry = false;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.QUOTE_ENTRY;
  mockRouterData.owner.id = QUOTE_ENTRY_KEY;
  mockRouterData.pageType = ConfiguratorRouter.PageType.OVERVIEW;
  mockRouterData.displayOnly = true;
}

function setRouterTestDataReadOnlySavedCart() {
  mockRouterState.state.params = {
    entityKey: QUOTE_ENTRY_KEY,
    ownerType: CommonConfigurator.OwnerType.SAVED_CART_ENTRY,
  };
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.isOwnerCartEntry = false;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.SAVED_CART_ENTRY;
  mockRouterData.owner.id = QUOTE_ENTRY_KEY;
  mockRouterData.pageType = ConfiguratorRouter.PageType.OVERVIEW;
  mockRouterData.displayOnly = true;
}

function performAddToCartOnOverview() {
  setRouterTestDataProductBoundAndConfigPage();
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.pageType = ConfiguratorRouter.PageType.OVERVIEW;
  initialize();
  component.onAddToCart(mockProductConfiguration, mockRouterData);
}

function performUpdateCart() {
  ensureCartBound();
  component.onAddToCart(mockProductConfiguration, mockRouterData);
}

function ensureCartBound() {
  setRouterTestDataCartBoundAndConfigPage();
  mockOwner.id = CART_ENTRY_KEY;
  initialize();
}

function ensureCartBoundAndOnOverview() {
  setRouterTestDataCartBoundAndConfigPage();
  mockRouterState.state.semanticRoute = ROUTE_OVERVIEW;
  mockRouterData.pageType = ConfiguratorRouter.PageType.OVERVIEW;
  initialize();
}

function ensureProductBound() {
  setRouterTestDataProductBoundAndConfigPage();
  if (mockProductConfiguration.nextOwner) {
    mockProductConfiguration.nextOwner.id = CART_ENTRY_KEY;
  }
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
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
  },
};

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }

  go = () => Promise.resolve(true);
}

class MockConfiguratorAddToCartButtonComponent {
  goToOrderDetails() {}
}

describe('ConfigAddToCartButtonComponent', () => {
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let configuratorCartService: ConfiguratorCartService;
  let configuratorGroupsService: ConfiguratorGroupsService;
  let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
  let intersectionService: IntersectionService;
  let configuratorQuantityService: ConfiguratorQuantityService;
  let keyboardFocusService: KeyboardFocusService;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          ConfiguratorAddToCartButtonComponent,
          MockItemCounterComponent,
          MockCxIconComponent,
          MockFeatureLevelDirective,
        ],
        providers: [
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ConfiguratorQuantityService,
            useClass: MockConfiguratorQuantityService,
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
          {
            provide: OrderHistoryFacade,
            useClass: MockOrderHistoryFacade,
          },
          {
            provide: CommonConfiguratorUtilsService,
            useClass: MockCommonConfiguratorUtilsService,
          },
          {
            provide: ConfiguratorRouterExtractorService,
            useClass: MockConfiguratorRouterExtractorService,
          },
          {
            provide: ConfiguratorAddToCartButtonComponent,
            useClass: MockConfiguratorAddToCartButtonComponent,
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
          },
          {
            provide: IntersectionService,
            useClass: MockIntersectionService,
          },
          {
            provide: MultiCartFacade,
            useClass: MockMultiCartFacade,
          },
        ],
      })
        .overrideComponent(ConfiguratorAddToCartButtonComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    elementMock = {
      style: {
        position: '',
      },
    };
    pendingChangesObservable = of(false);
    initialize();
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );

    globalMessageService = TestBed.inject(
      GlobalMessageService as Type<GlobalMessageService>
    );

    configuratorQuantityService = TestBed.inject(
      ConfiguratorQuantityService as Type<ConfiguratorQuantityService>
    );

    configuratorGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );

    configuratorStorefrontUtilsService = TestBed.inject(
      ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
    );

    intersectionService = TestBed.inject(
      IntersectionService as Type<IntersectionService>
    );

    keyboardFocusService = TestBed.inject(
      KeyboardFocusService as Type<KeyboardFocusService>
    );

    spyOn(configuratorGroupsService, 'setGroupStatusVisited').and.callThrough();
    spyOn(routingService, 'go').and.callThrough();
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(configuratorCommonsService, 'removeConfiguration').and.callThrough();
    spyOn(configuratorQuantityService, 'setQuantity').and.callThrough();
    configuratorCartService = TestBed.inject(
      ConfiguratorCartService as Type<ConfiguratorCartService>
    );
    spyOn(configuratorCartService, 'getEntry').and.callThrough();
    spyOn(configuratorStorefrontUtilsService, 'changeStyling').and.stub();
    spyOn(
      configuratorStorefrontUtilsService,
      'focusFirstActiveElement'
    ).and.callThrough();
    spyOn(keyboardFocusService, 'clear').and.callThrough();
  });

  afterEach(() => {
    fixture.destroy();
    mockRouterData.displayOnly = false;
  });

  it('should create cart-btn-container', () => {
    initialize();
    expect(component).toBeTruthy();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-add-to-cart-btn-container'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-quantity-add-to-cart-container'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-quantity'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'button.cx-add-to-cart-btn'
    );
  });

  it('should create display-only-btn-container', () => {
    setRouterTestDataReadOnlyOrder();
    initialize();
    expect(component).toBeTruthy();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-display-only-btn-container'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'button.btn-secondary.cx-display-only-btn'
    );

    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'button.btn-secondary.cx-display-only-btn',
      'configurator.addToCart.buttonClose'
    );
  });

  it('should render button that is not disabled in case there are no pending changes', () => {
    initialize();
    const selector = htmlElem.querySelector('button');
    if (selector) {
      expect(selector.disabled).toBe(false);
    } else {
      fail();
    }
  });

  it('should not disable button in case there are pending changes', () => {
    pendingChangesObservable = of(true);
    initialize();
    const selector = htmlElem.querySelector('button');
    if (selector) {
      expect(selector.disabled).toBe(false);
    } else {
      fail();
    }
  });

  describe('ngOnInit', () => {
    it('should set quantity that was retrieved from quantity service', () => {
      initialize();
      expect(component.quantityControl.value).toBe(QUANTITY);
    });
  });

  describe('quantityChange', () => {
    it('should push current quantity to qty service', () => {
      initialize();
      component.quantityControl.setValue(QUANTITY_CHANGED);
      expect(configuratorQuantityService.setQuantity).toHaveBeenCalledWith(
        QUANTITY_CHANGED
      );
    });
  });

  describe('onAddToCart', () => {
    it('should navigate to OV in case configuration is cart bound and we are on product config page', () => {
      mockRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
      performUpdateCart();
      expect(routingService.go).toHaveBeenCalledWith(navParamsOverview);

      expect(
        configuratorGroupsService.setGroupStatusVisited
      ).toHaveBeenCalled();
    });

    it('should navigate to cart in case configuration is cart bound and we are on OV config page', () => {
      performUpdateOnOV();
      expect(routingService.go).toHaveBeenCalledWith('cart');
    });

    it('should not remove configuration for cart entry owner in case configuration is cart bound and we are on OV page and no changes happened', () => {
      //not needed to remove the configuration here, as clean up is done in router listener
      mockProductConfiguration.isCartEntryUpdateRequired = false;
      performUpdateOnOV();
      expect(
        configuratorCommonsService.removeConfiguration
      ).toHaveBeenCalledTimes(0);
    });

    it('should not remove configuration and display no message in case continue to cart is triggered on config page', () => {
      mockProductConfiguration.isCartEntryUpdateRequired = false;
      mockRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
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
      expect(routingService.go).toHaveBeenCalledWith(navParamsOverview);
    });

    it('should remove one configuration (cart bound) in case configuration has not yet been added and we are on configuration page', () => {
      ensureProductBound();
      component.onAddToCart(mockProductConfiguration, mockRouterData);
      expect(
        configuratorCommonsService.removeConfiguration
      ).toHaveBeenCalledTimes(1);
    });

    it('should display addToCart message in case configuration has not been added yet', () => {
      ensureProductBound();
      component.onAddToCart(mockProductConfiguration, mockRouterData);
      expect(globalMessageService.add).toHaveBeenCalledTimes(1);
    });

    it('should not display addToCart message in case configuration has not been added yet but there are pending changes', () => {
      pendingChangesObservable = of(true);
      ensureProductBound();
      component.onAddToCart(mockProductConfiguration, mockRouterData);
      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
    });

    it('should navigate to cart in case configuration has not yet been added and process was triggered from overview', () => {
      mockRouterData.pageType = ConfiguratorRouter.PageType.OVERVIEW;
      performAddToCartOnOverview();
      expect(routingService.go).toHaveBeenCalledWith('cart');
    });

    it('should remove one (cart bound) configurations in case configuration has not yet been added and process was triggered from overview', () => {
      //not needed to remove the configuration here, as clean up is done in router listener
      performAddToCartOnOverview();
      expect(
        configuratorCommonsService.removeConfiguration
      ).toHaveBeenCalledTimes(0);
    });
  });

  describe('navigateForProductBound', () => {
    it('should navigate to OV in case configuration is product bound and we are on product config page', () => {
      mockRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
      ensureProductBound();

      component['navigateForProductBound'](
        mockProductConfiguration,
        mockOwner.configuratorType,
        false
      );
      expect(routingService.go).toHaveBeenCalledWith(navParamsOverview);
    });

    it('should handle case that next owner is not defined', () => {
      mockRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
      ensureProductBound();

      component['navigateForProductBound'](
        { ...mockProductConfiguration, nextOwner: undefined },
        mockOwner.configuratorType,
        false
      );
      expect(routingService.go).toHaveBeenCalledWith({
        ...navParamsOverview,
        params: { ...navParamsOverview.params, entityKey: 'INITIAL' },
      });
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

  describe('displayOnlyButton', () => {
    it('should navigate to review order', () => {
      setRouterTestDataReadOnlyCart();
      initialize();
      component.leaveConfigurationOverview();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'checkoutReviewOrder',
      });
    });

    it('should navigate to order details', () => {
      setRouterTestDataReadOnlyOrder();
      initialize();
      component.leaveConfigurationOverview();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orderDetails',
        params: mockOrder,
      });
    });

    it('should navigate to quote details in case owner is quote entry', () => {
      setRouterTestDataReadOnlySavedCart();
      initialize();
      component.leaveConfigurationOverview();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'quoteDetails',
        params: { quoteId: QUOTE_CODE },
      });
    });

    it('should navigate to quote details in case owner is saved cart entry and saved cart is bound to a quote', () => {
      setRouterTestDataReadOnlyQuote();
      initialize();
      component.leaveConfigurationOverview();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'quoteDetails',
        params: { quoteId: QUOTE_CODE },
      });
    });
  });

  describe('Floating button', () => {
    it('should make button sticky', (done) => {
      spyOn(configuratorStorefrontUtilsService, 'getElement').and.returnValue(
        elementMock as unknown as HTMLElement
      );
      spyOn(intersectionService, 'isIntersecting').and.returnValue(of(true));
      component.ngOnInit();
      component.container$.pipe(take(1), delay(0)).subscribe(() => {
        expect(
          configuratorStorefrontUtilsService.changeStyling
        ).toHaveBeenCalledWith(
          'cx-configurator-add-to-cart-button',
          'position',
          'sticky'
        );
        done();
      });
    });

    it('should make button fixed when not intersecting', (done) => {
      spyOn(configuratorStorefrontUtilsService, 'getElement').and.returnValue(
        elementMock as unknown as HTMLElement
      );
      component.ngOnInit();
      component.container$.pipe(take(1), delay(0)).subscribe(() => {
        spyOn(intersectionService, 'isIntersecting').and.callThrough();
        expect(
          configuratorStorefrontUtilsService.changeStyling
        ).toHaveBeenCalledWith(
          'cx-configurator-add-to-cart-button',
          'position',
          'fixed'
        );
        done();
      });
    });
  });

  describe('Accessibility', () => {
    it('should return base price, selected option price and total price', () => {
      let result = {
        basePrice: '$123.56',
        selectedOptions: '$500',
        totalPrice: '$623.56',
      };
      expect(component.extractConfigPrices(mockProductConfiguration)).toEqual(
        result
      );
    });

    it('should return "0" in case there is no price summary in the configuration', () => {
      let result = {
        basePrice: '0',
        selectedOptions: '0',
        totalPrice: '0',
      };
      expect(
        component.extractConfigPrices(
          mockProductConfigurationWithoutPriceSummary
        )
      ).toEqual(result);
    });

    it('should return "0" for basePrice in case basePrice is undefined', () => {
      let result = {
        basePrice: '0',
        selectedOptions: '$500',
        totalPrice: '$623.56',
      };
      expect(
        component.extractConfigPrices(mockProductConfigurationWithoutBasePrice)
      ).toEqual(result);
    });

    it('should return "0" for basePrice in case basePrice is undefined', () => {
      let result = {
        basePrice: '0',
        selectedOptions: '$500',
        totalPrice: '$623.56',
      };
      expect(
        component.extractConfigPrices(mockProductConfigurationWithoutBasePrice)
      ).toEqual(result);
    });

    it('should return "0" for selectedOption in case selectedOption is undefined', () => {
      let result = {
        basePrice: '$123.56',
        selectedOptions: '0',
        totalPrice: '$623.56',
      };
      expect(
        component.extractConfigPrices(
          mockProductConfigurationWithoutSelectedOptions
        )
      ).toEqual(result);
    });

    it('should return "0" for totalPrice in case totalPrice  is undefined', () => {
      let result = {
        basePrice: '$123.56',
        selectedOptions: '$500',
        totalPrice: '0',
      };
      expect(
        component.extractConfigPrices(mockProductConfigurationWithoutTotalPrice)
      ).toEqual(result);
    });

    it('should return "0" for prices in case they are not available', () => {
      let result = {
        basePrice: '0',
        selectedOptions: '0',
        totalPrice: '0',
      };
      expect(
        component.extractConfigPrices(
          mockProductConfigurationWithPriceSummaryButNoPrices
        )
      ).toEqual(result);
    });

    it("should contain add to cart button element with 'aria-label' attribute that contains prices of the configuration", () => {
      let basePrice =
        mockProductConfiguration.priceSummary?.basePrice?.formattedValue;
      let selectedOptions =
        mockProductConfiguration.priceSummary?.selectedOptions?.formattedValue;
      let totalPrice =
        mockProductConfiguration.priceSummary?.currentTotal?.formattedValue;
      let expectedA11YString =
        `configurator.a11y.addToCartPrices basePrice:${basePrice}` +
        ` selectedOptions:${selectedOptions} totalPrice:${totalPrice}`;
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        undefined,
        0,
        'aria-label',
        component.getButtonResourceKey(
          mockRouterData,
          mockProductConfiguration
        ) +
          ' ' +
          expectedA11YString
      );
    });
  });

  describe('getButtonResourceKey', () => {
    let routerData: ConfiguratorRouter.Data;
    let config: Configurator.Configuration;

    function prepareTestData(
      isOwnerCartEntry: boolean,
      isCartEntryUpdateRequired: boolean
    ) {
      routerData = {
        pageType: ConfiguratorRouter.PageType.CONFIGURATION,
        isOwnerCartEntry: isOwnerCartEntry,
        owner: mockOwner,
      };

      config = structuredClone(mockProductConfiguration);
      config.isCartEntryUpdateRequired = isCartEntryUpdateRequired;
    }

    it('should return configurator.addToCart.buttonUpdateCart', () => {
      prepareTestData(true, true);
      expect(component.getButtonResourceKey(routerData, config)).toBe(
        'configurator.addToCart.buttonUpdateCart'
      );
    });

    it('should return configurator.addToCart.buttonAfterAddToCart', () => {
      prepareTestData(true, false);
      expect(component.getButtonResourceKey(routerData, config)).toBe(
        'configurator.addToCart.buttonAfterAddToCart'
      );
    });

    it('should return configurator.addToCart.button', () => {
      prepareTestData(false, false);

      expect(component.getButtonResourceKey(routerData, config)).toBe(
        'configurator.addToCart.button'
      );
    });
  });

  describe('isCartEntry', () => {
    it("should return 'false' because isOwnerCartEntry is undefined", () => {
      const routerData: ConfiguratorRouter.Data = {
        pageType: ConfiguratorRouter.PageType.CONFIGURATION,
        owner: mockOwner,
      };

      expect(component.isCartEntry(routerData)).toBe(false);
    });

    it("should return 'false' because it is not a cart entry", () => {
      const routerData: ConfiguratorRouter.Data = {
        pageType: ConfiguratorRouter.PageType.CONFIGURATION,
        owner: mockOwner,
        isOwnerCartEntry: false,
      };

      expect(component.isCartEntry(routerData)).toBe(false);
    });

    it("should return 'true' because it is a cart entry", () => {
      const routerData: ConfiguratorRouter.Data = {
        pageType: ConfiguratorRouter.PageType.OVERVIEW,
        owner: mockOwner,
        isOwnerCartEntry: true,
      };

      expect(component.isCartEntry(routerData)).toBe(true);
    });
  });

  describe('Focus handling on navigation', () => {
    it('focusOverviewInTabBar should call clear and focusFirstActiveElement', fakeAsync(() => {
      component['focusOverviewInTabBar']();
      tick(1); // needed because of delay(0) in focusOverviewInTabBar
      expect(keyboardFocusService.clear).toHaveBeenCalledTimes(1);
      expect(
        configuratorStorefrontUtilsService.focusFirstActiveElement
      ).toHaveBeenCalledTimes(1);
    }));

    it('focusOverviewInTabBar should not call clear and focusFirstActiveElement if overview data is not present in configuration', fakeAsync(() => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(mockProductConfigurationWithoutBasePrice)
      );
      component['focusOverviewInTabBar']();
      tick(1); // needed because of delay(0) in focusOverviewInTabBar
      expect(keyboardFocusService.clear).toHaveBeenCalledTimes(0);
      expect(
        configuratorStorefrontUtilsService.focusFirstActiveElement
      ).toHaveBeenCalledTimes(0);
    }));

    it('navigateToOverview should navigate to overview page and should call focusFirstActiveElement inside focusOverviewInTabBar', fakeAsync(() => {
      component['navigateToOverview'](
        mockRouterData.owner.configuratorType,
        mockRouterData.owner
      );
      tick(1); // needed because of delay(0) in focusOverviewInTabBar
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'configureOverview' + mockRouterData.owner.configuratorType,
        params: {
          ownerType: 'cartEntry',
          entityKey: mockRouterData.owner.id,
        },
      });
      expect(
        configuratorStorefrontUtilsService.focusFirstActiveElement
      ).toHaveBeenCalledTimes(1);
    }));
  });
});
