import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GenericConfigurator,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigRouterExtractorService } from './config-router-extractor.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_NUMBER = '0';
const CONFIGURATOR_URL =
  'electronics-spa/en/USD/configureCPQCONFIGURATOR/product/entityKey/WCEM_DEPENDENCY_PC';
const OVERVIEW_URL =
  'electronics-spa/en/USD/configureOverviewCPQCONFIGURATOR/product/entityKey/WCEM_DEPENDENCY_PC';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
    url: CONFIGURATOR_URL,
  },
};

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

describe('ConfigRouterExtractorService', () => {
  let serviceUnderTest: ConfigRouterExtractorService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.inject(
      ConfigRouterExtractorService as Type<ConfigRouterExtractorService>
    );
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
  });

  it('should create component', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should find proper owner for route based purely on product code ', () => {
    let owner: GenericConfigurator.Owner;
    serviceUnderTest
      .extractConfigurationOwner(routingService)
      .subscribe(ownerFromRouting => (owner = ownerFromRouting));
    expect(owner.id).toBe(PRODUCT_CODE);
    expect(owner.type).toBe(GenericConfigurator.OwnerType.PRODUCT);
    expect(owner.key.includes(GenericConfigurator.OwnerType.PRODUCT)).toBe(
      true
    );
  });

  it('should find proper owner for route based on owner type PRODUCT and product code', () => {
    let owner: GenericConfigurator.Owner;
    mockRouterState.state.params.ownerType =
      GenericConfigurator.OwnerType.PRODUCT;
    mockRouterState.state.params.entityKey = PRODUCT_CODE;

    serviceUnderTest
      .extractConfigurationOwner(routingService)
      .subscribe(ownerFromRouting => (owner = ownerFromRouting));
    expect(owner.id).toBe(PRODUCT_CODE);
    expect(owner.type).toBe(GenericConfigurator.OwnerType.PRODUCT);
    expect(owner.key.includes(GenericConfigurator.OwnerType.PRODUCT)).toBe(
      true
    );
  });

  it('should find proper owner for route based on owner type CART_ENTRY and cart entry number', () => {
    let owner: GenericConfigurator.Owner;
    mockRouterState.state.params.ownerType =
      GenericConfigurator.OwnerType.CART_ENTRY;
    mockRouterState.state.params.entityKey = CART_ENTRY_NUMBER;

    serviceUnderTest
      .extractConfigurationOwner(routingService)
      .subscribe(ownerFromRouting => (owner = ownerFromRouting));
    expect(owner.id).toBe(CART_ENTRY_NUMBER);
    expect(owner.type).toBe(GenericConfigurator.OwnerType.CART_ENTRY);
    expect(owner.key.includes(GenericConfigurator.OwnerType.CART_ENTRY)).toBe(
      true
    );
  });

  it('should extract configurator type from URL', () => {
    let configType: string;
    mockRouterState.state.params.ownerType =
      GenericConfigurator.OwnerType.CART_ENTRY;
    mockRouterState.state.params.entityKey = CART_ENTRY_NUMBER;
    mockRouterState.state.url =
      'http://localhost:4200/electronics-spa/en/USD/configureCPQCONFIGURATOR/cartEntry/entityKey/2';

    serviceUnderTest
      .getConfiguratorType(routingService)
      .subscribe(configuratorType => (configType = configuratorType));
    expect(configType).toBe('CPQCONFIGURATOR');
  });

  it('should know from URL that a configuration has been added to the cart', () => {
    let hasBeenAdded;
    mockRouterState.state.params.ownerType =
      GenericConfigurator.OwnerType.CART_ENTRY;
    mockRouterState.state.params.entityKey = CART_ENTRY_NUMBER;

    serviceUnderTest
      .isOwnerCartEntry(routingService)
      .subscribe(
        hasBeenAddedFromRouter => (hasBeenAdded = hasBeenAddedFromRouter)
      );
    expect(hasBeenAdded.isOwnerCartEntry).toBe(true);
  });

  it('should know from URL that a configuration has not been added to the cart yet', () => {
    let hasBeenAdded;
    mockRouterState.state.params.ownerType =
      GenericConfigurator.OwnerType.PRODUCT;
    mockRouterState.state.params.entityKey = PRODUCT_CODE;

    serviceUnderTest
      .isOwnerCartEntry(routingService)
      .subscribe(
        hasBeenAddedFromRouter => (hasBeenAdded = hasBeenAddedFromRouter)
      );
    expect(hasBeenAdded.isOwnerCartEntry).toBe(false);
  });

  describe('should know if it is on the overview or configurator page', () => {
    it('on configurator page', () => {
      let isOverviewResult;
      let isConfiguratorResult;

      serviceUnderTest
        .isOverview(routingService)
        .subscribe(isOverview => (isOverviewResult = isOverview));
      serviceUnderTest
        .isConfigurator(routingService)
        .subscribe(isConfigurator => (isConfiguratorResult = isConfigurator));

      expect(isConfiguratorResult.isConfigurator).toBe(true);
      expect(isOverviewResult.isOverview).toBe(false);
    });

    it('on overview page', () => {
      let isOverviewResult;
      let isConfiguratorResult;

      mockRouterState.state.url = OVERVIEW_URL;

      serviceUnderTest
        .isOverview(routingService)
        .subscribe(isOverview => (isOverviewResult = isOverview));
      serviceUnderTest
        .isConfigurator(routingService)
        .subscribe(isConfigurator => (isConfiguratorResult = isConfigurator));

      expect(isConfiguratorResult.isConfigurator).toBe(false);
      expect(isOverviewResult.isOverview).toBe(true);
    });
  });
});
