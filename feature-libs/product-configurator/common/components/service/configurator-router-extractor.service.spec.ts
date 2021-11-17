import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { ConfiguratorType } from './../../core/model/common-configurator.model';
import { ConfiguratorRouter } from './configurator-router-data';
import { ConfiguratorRouterExtractorService } from './configurator-router-extractor.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_NUMBER = '0';
const CONFIGURATOR_TYPE = ConfiguratorType.VARIANT;
const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';
const OVERVIEW_ROUTE = 'configureOverviewCPQCONFIGURATOR';

let mockRouterState: any;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

describe('ConfigRouterExtractorService', () => {
  let serviceUnderTest: ConfiguratorRouterExtractorService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        providers: [
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    serviceUnderTest = TestBed.inject(
      ConfiguratorRouterExtractorService as Type<ConfiguratorRouterExtractorService>
    );

    mockRouterState = {
      state: {
        params: {
          entityKey: PRODUCT_CODE,
          ownerType: CommonConfigurator.OwnerType.PRODUCT,
        },
        queryParams: {},
        semanticRoute: CONFIGURATOR_ROUTE,
      },
    };
  });

  it('should create component', () => {
    expect(serviceUnderTest).toBeDefined();
  });
  describe('extractRouterData', () => {
    it('should find proper owner for route based purely on product code', () => {
      let owner: CommonConfigurator.Owner;
      serviceUnderTest.extractRouterData().subscribe((routerData) => {
        owner = routerData.owner;
        expect(owner.id).toBe(PRODUCT_CODE);
        expect(owner.type).toBe(CommonConfigurator.OwnerType.PRODUCT);
        expect(owner.key.includes(CommonConfigurator.OwnerType.PRODUCT)).toBe(
          true
        );
      });
    });

    it('should find proper owner for route based on owner type PRODUCT and product code', () => {
      let owner: CommonConfigurator.Owner;
      mockRouterState.state.params.ownerType =
        CommonConfigurator.OwnerType.PRODUCT;
      mockRouterState.state.params.entityKey = PRODUCT_CODE;

      serviceUnderTest.extractRouterData().subscribe((routerData) => {
        owner = routerData.owner;
        expect(owner.id).toBe(PRODUCT_CODE);
        expect(owner.type).toBe(CommonConfigurator.OwnerType.PRODUCT);
        expect(owner.key.includes(CommonConfigurator.OwnerType.PRODUCT)).toBe(
          true
        );
      });
    });

    it('should find proper owner for route based on owner type CART_ENTRY and cart entry number', () => {
      let owner: CommonConfigurator.Owner;
      mockRouterState.state.params.ownerType =
        CommonConfigurator.OwnerType.CART_ENTRY;
      mockRouterState.state.params.entityKey = CART_ENTRY_NUMBER;

      serviceUnderTest.extractRouterData().subscribe((routerData) => {
        owner = routerData.owner;
        expect(owner.id).toBe(CART_ENTRY_NUMBER);
        expect(owner.type).toBe(CommonConfigurator.OwnerType.CART_ENTRY);
        expect(
          owner.key.includes(CommonConfigurator.OwnerType.CART_ENTRY)
        ).toBe(true);
      });
    });

    it('should determine configurator and page type from router state ', () => {
      let routerData: ConfiguratorRouter.Data;
      serviceUnderTest.extractRouterData().subscribe((data) => {
        routerData = data;
        expect(routerData.owner.configuratorType).toBe(CONFIGURATOR_TYPE);
        expect(routerData.isOwnerCartEntry).toBe(false);
        expect(routerData.pageType).toBe(
          ConfiguratorRouter.PageType.CONFIGURATION
        );
      });
    });

    it('should determine configurator and page type from router based on owner type CART_ENTRY and cart entry number ', () => {
      mockRouterState.state.params.ownerType =
        CommonConfigurator.OwnerType.CART_ENTRY;
      mockRouterState.state.params.entityKey = CART_ENTRY_NUMBER;
      mockRouterState.state.semanticRoute = OVERVIEW_ROUTE;
      let routerData: ConfiguratorRouter.Data;
      serviceUnderTest
        .extractRouterData()
        .subscribe((data) => {
          routerData = data;
          expect(routerData.owner.configuratorType).toBe(CONFIGURATOR_TYPE);
          expect(routerData.isOwnerCartEntry).toBe(true);
          expect(routerData.pageType).toBe(
            ConfiguratorRouter.PageType.OVERVIEW
          );
          expect(routerData.forceReload).toBe(false);
        })
        .unsubscribe();
    });

    it('should tell from the URL if we need to enforce a reload of a configuration', () => {
      mockRouterState.state.queryParams = { forceReload: 'true' };
      let routerData: ConfiguratorRouter.Data;
      serviceUnderTest
        .extractRouterData()
        .subscribe((data) => {
          routerData = data;
          expect(routerData.forceReload).toBe(true);
        })
        .unsubscribe();
    });

    it('should tell from the URL if we need to resolve issues of a configuration', () => {
      mockRouterState.state.queryParams = { resolveIssues: 'true' };
      let routerData: ConfiguratorRouter.Data;
      serviceUnderTest
        .extractRouterData()
        .subscribe((data) => {
          routerData = data;
          expect(routerData.resolveIssues).toBe(true);
        })
        .unsubscribe();
    });
  });

  describe('createOwnerFromRouterState', () => {
    it('should create owner from router state correctly', () => {
      const owner: CommonConfigurator.Owner =
        serviceUnderTest.createOwnerFromRouterState(mockRouterState);

      expect(owner.type).toBe(CommonConfigurator.OwnerType.PRODUCT);
    });

    it('should create owner from router state if owner type is not provided', () => {
      mockRouterState.state.params = {
        rootProduct: PRODUCT_CODE,
      };
      const owner: CommonConfigurator.Owner =
        serviceUnderTest.createOwnerFromRouterState(mockRouterState);

      expect(owner.type).toBe(CommonConfigurator.OwnerType.PRODUCT);
    });

    it('should detect an obsolete state of a cart related owner type', () => {
      mockRouterState.state.params.ownerType =
        CommonConfigurator.OwnerType.CART_ENTRY;
      mockRouterState.state.params.entityKey = CART_ENTRY_NUMBER;

      const owner: CommonConfigurator.Owner =
        serviceUnderTest.createOwnerFromRouterState(mockRouterState);

      expect(owner.type).toBe(CommonConfigurator.OwnerType.CART_ENTRY);
    });
  });

  describe('getConfiguratorTypeFromSemanticRoute', () => {
    it('should throw error if semantic route is empty', () => {
      expect(() =>
        serviceUnderTest['getConfiguratorTypeFromSemanticRoute']('')
      ).toThrowError();
    });

    it('should throw error if semantic route is not configuration neither OV page', () => {
      expect(() =>
        serviceUnderTest['getConfiguratorTypeFromSemanticRoute'](
          'isNoKnownRoute'
        )
      ).toThrowError();
    });
  });
});
