import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Configurator,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigRouterExtractorService } from './config-router-extractor.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_NUMBER = '0';

const mockRouterState: any = {
  state: {
    params: {
      rootProduct: PRODUCT_CODE,
    },
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
    serviceUnderTest = TestBed.get(ConfigRouterExtractorService as Type<
      ConfigRouterExtractorService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  });

  it('should create component', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should find proper owner for route based purely on product code ', () => {
    let owner: Configurator.Owner;
    serviceUnderTest
      .extractConfigurationOwner(routingService)
      .subscribe(ownerFromRouting => (owner = ownerFromRouting));
    expect(owner.productCode).toBe(PRODUCT_CODE);
    expect(owner.type).toBe(Configurator.OwnerType.PRODUCT);
    expect(owner.key.includes(Configurator.OwnerType.PRODUCT)).toBe(true);
  });

  it('should find proper owner for route based on owner type PRODUCT and product code', () => {
    let owner: Configurator.Owner;
    mockRouterState.state.params.ownerType = Configurator.OwnerType.PRODUCT;
    mockRouterState.state.params.entityKey = PRODUCT_CODE;

    serviceUnderTest
      .extractConfigurationOwner(routingService)
      .subscribe(ownerFromRouting => (owner = ownerFromRouting));
    expect(owner.productCode).toBe(PRODUCT_CODE);
    expect(owner.type).toBe(Configurator.OwnerType.PRODUCT);
    expect(owner.key.includes(Configurator.OwnerType.PRODUCT)).toBe(true);
  });

  it('should find proper owner for route based on owner type CART_ENTRY and cart entry number', () => {
    let owner: Configurator.Owner;
    mockRouterState.state.params.ownerType = Configurator.OwnerType.CART_ENTRY;
    mockRouterState.state.params.entityKey = CART_ENTRY_NUMBER;

    serviceUnderTest
      .extractConfigurationOwner(routingService)
      .subscribe(ownerFromRouting => (owner = ownerFromRouting));
    expect(owner.productCode).toBeUndefined();
    expect(owner.documentEntryId).toBe(CART_ENTRY_NUMBER);
    expect(owner.type).toBe(Configurator.OwnerType.CART_ENTRY);
    expect(owner.key.includes(Configurator.OwnerType.CART_ENTRY)).toBe(true);
  });
});
