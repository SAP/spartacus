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
//const OVERVIEW_URL =
//  'electronics-spa/en/USD/configureOverviewCPQCONFIGURATOR/product/entityKey/WCEM_DEPENDENCY_PC';

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
      .extractRouterData(routingService)
      .subscribe((routerData) => (owner = routerData.owner));
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
      .extractRouterData(routingService)
      .subscribe((routerData) => (owner = routerData.owner));
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
      .extractRouterData(routingService)
      .subscribe((routerData) => (owner = routerData.owner));
    expect(owner.id).toBe(CART_ENTRY_NUMBER);
    expect(owner.type).toBe(GenericConfigurator.OwnerType.CART_ENTRY);
    expect(owner.key.includes(GenericConfigurator.OwnerType.CART_ENTRY)).toBe(
      true
    );
  });
});
