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
import { ConfigurationRouter } from './config-router-data';
import { ConfigRouterExtractorService } from './config-router-extractor.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_NUMBER = '0';
const CONFIGURATOR_TYPE = 'CPQCONFIGURATOR';
const CONFIGURATOR_URL =
  'electronics-spa/en/USD/configureCPQCONFIGURATOR/product/entityKey/WCEM_DEPENDENCY_PC';
const OVERVIEW_URL =
  'electronics-spa/en/USD/configureOverviewCPQCONFIGURATOR/product/entityKey/WCEM_DEPENDENCY_PC';

let mockRouterState: any;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

describe('ConfigRouterExtractorService', () => {
  let serviceUnderTest: ConfigRouterExtractorService;

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

    mockRouterState = {
      state: {
        params: {
          entityKey: PRODUCT_CODE,
          ownerType: GenericConfigurator.OwnerType.PRODUCT,
        },
        queryParams: {},
        url: CONFIGURATOR_URL,
      },
    };
  });

  it('should create component', () => {
    expect(serviceUnderTest).toBeDefined();
  });
  describe('extractRouterData', () => {
    it('should find proper owner for route based purely on product code', () => {
      let owner: GenericConfigurator.Owner;
      serviceUnderTest
        .extractRouterData()
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
        .extractRouterData()
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
        .extractRouterData()
        .subscribe((routerData) => (owner = routerData.owner));
      expect(owner.id).toBe(CART_ENTRY_NUMBER);
      expect(owner.type).toBe(GenericConfigurator.OwnerType.CART_ENTRY);
      expect(owner.key.includes(GenericConfigurator.OwnerType.CART_ENTRY)).toBe(
        true
      );
    });

    it('should determine configurator and page type from router state ', () => {
      let routerData: ConfigurationRouter.Data;
      serviceUnderTest
        .extractRouterData()
        .subscribe((data) => (routerData = data));
      expect(routerData.configuratorType).toBe(CONFIGURATOR_TYPE);
      expect(routerData.isOwnerCartEntry).toBe(false);
      expect(routerData.pageType).toBe(
        ConfigurationRouter.PageType.CONFIGURATION
      );
    });

    it('should determine configurator and page type from router based on owner type CART_ENTRY and cart entry number ', () => {
      mockRouterState.state.params.ownerType =
        GenericConfigurator.OwnerType.CART_ENTRY;
      mockRouterState.state.params.entityKey = CART_ENTRY_NUMBER;
      mockRouterState.state.url = OVERVIEW_URL;
      let routerData: ConfigurationRouter.Data;
      serviceUnderTest
        .extractRouterData()
        .subscribe((data) => (routerData = data))
        .unsubscribe();
      expect(routerData.configuratorType).toBe(CONFIGURATOR_TYPE);
      expect(routerData.isOwnerCartEntry).toBe(true);
      expect(routerData.pageType).toBe(ConfigurationRouter.PageType.OVERVIEW);
      expect(routerData.forceReload).toBe(false);
    });

    it('should tell from the URL if we need to enforce a reload of a configuration', () => {
      mockRouterState.state.queryParams = { forceReload: 'true' };
      let routerData: ConfigurationRouter.Data;
      serviceUnderTest
        .extractRouterData()
        .subscribe((data) => (routerData = data))
        .unsubscribe();

      expect(routerData.forceReload).toBe(true);
    });

    it('should tell from the URL if we need to resolve issues of a configuration', () => {
      mockRouterState.state.queryParams = { resolveIssues: 'true' };
      let routerData: ConfigurationRouter.Data;
      serviceUnderTest
        .extractRouterData()
        .subscribe((data) => (routerData = data))
        .unsubscribe();

      expect(routerData.resolveIssues).toBe(true);
    });
  });

  describe('createOwnerFromRouterState', () => {
    it('should create owner from router state correctly', () => {
      const owner: GenericConfigurator.Owner = serviceUnderTest.createOwnerFromRouterState(
        mockRouterState
      );

      expect(owner.type).toBe(GenericConfigurator.OwnerType.PRODUCT);
    });

    it('should create owner from router state if owner type is not provided', () => {
      mockRouterState.state.params = {
        rootProduct: PRODUCT_CODE,
      };
      const owner: GenericConfigurator.Owner = serviceUnderTest.createOwnerFromRouterState(
        mockRouterState
      );

      expect(owner.type).toBe(GenericConfigurator.OwnerType.PRODUCT);
    });

    it('should detect an obsolete state of a cart related owner type', () => {
      mockRouterState.state.params.ownerType =
        GenericConfigurator.OwnerType.CART_ENTRY;
      mockRouterState.state.params.entityKey = CART_ENTRY_NUMBER;

      const owner: GenericConfigurator.Owner = serviceUnderTest.createOwnerFromRouterState(
        mockRouterState
      );

      expect(owner.type).toBe(GenericConfigurator.OwnerType.CART_ENTRY);
    });
  });
});
