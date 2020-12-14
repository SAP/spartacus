import { TestBed } from '@angular/core/testing';
import { CdsConfig } from '../config/cds-config';
import { StrategyRequest } from './../cds-models/cds-strategy-request.model';
import { CdsEndpointsService } from './cds-endpoints.service';

describe('CdsEndpointsService', () => {
  const STRATEGY_PRODUCTS_ENDPOINT_KEY = 'strategyProducts';
  const STRATEGY_ID = 'test-strategy-id';
  const BASE_SITE = 'electronics-spa';
  const LANGUAGE = 'en';
  const PAGE_SIZE = 10;

  const mockCdsConfig = {
    cds: {
      tenant: 'merchandising-strategy-adapter-test-tenant',
      baseUrl: 'http://some-cds-base-url',
      endpoints: {
        strategyProducts:
          '/strategy/${tenant}/strategies/${strategyId}/products',
      },
    },
  } as CdsConfig;

  const FULLY_CALCULATED_URL = `${mockCdsConfig.cds.baseUrl}/strategy/${mockCdsConfig.cds.tenant}/strategies/${STRATEGY_ID}/products`;

  let cdsEndpointsService: CdsEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CdsConfig, useValue: mockCdsConfig }],
    });

    cdsEndpointsService = TestBed.inject(CdsEndpointsService);
  });

  it('should be created', () => {
    expect(cdsEndpointsService).toBeTruthy();
  });

  describe('getUrl', () => {
    it('should prepend a known endpoint with the base url, but not replace palceholders when none are provided', () => {
      expect(cdsEndpointsService.getUrl(STRATEGY_PRODUCTS_ENDPOINT_KEY)).toBe(
        `${mockCdsConfig.cds.baseUrl}/strategy/${mockCdsConfig.cds.tenant}/strategies/\${strategyId}/products`
      );
    });

    it('should prepend a known endpoint with the base url and replace provided placeholders', () => {
      expect(
        cdsEndpointsService.getUrl(STRATEGY_PRODUCTS_ENDPOINT_KEY, {
          strategyId: STRATEGY_ID,
        })
      ).toBe(FULLY_CALCULATED_URL);
    });

    it('should allow the tenant path parameter to be overridden', () => {
      const ALTERNATIVE_TENANT = 'some-other-tenant';
      expect(
        cdsEndpointsService.getUrl(STRATEGY_PRODUCTS_ENDPOINT_KEY, {
          strategyId: STRATEGY_ID,
          tenant: ALTERNATIVE_TENANT,
        })
      ).toBe(
        `${mockCdsConfig.cds.baseUrl}/strategy/${ALTERNATIVE_TENANT}/strategies/${STRATEGY_ID}/products`
      );
    });

    it('should not replace provided placeholders that are not in the endpoint pattern', () => {
      expect(
        cdsEndpointsService.getUrl(STRATEGY_PRODUCTS_ENDPOINT_KEY, {
          strategyId: STRATEGY_ID,
          someOtherField: 'someOtherField',
        })
      ).toBe(FULLY_CALCULATED_URL);
    });

    it('should prepend an unknown endpoint with the base url', () => {
      const UNKNOWN_ENDPOINT_KEY =
        '/some-other-url-with-placeholders/${placeHolder1}/${placeHolder2}';
      expect(
        cdsEndpointsService.getUrl(UNKNOWN_ENDPOINT_KEY, {
          placeHolder1: 'value1',
          placeHolder2: 'value2',
        })
      ).toBe(
        `${mockCdsConfig.cds.baseUrl}/some-other-url-with-placeholders/value1/value2`
      );
    });

    it('should not prepend an endpoint that already has the configured base url with the configured base url', () => {
      expect(cdsEndpointsService.getUrl(FULLY_CALCULATED_URL)).toBe(
        FULLY_CALCULATED_URL
      );
    });

    it('should not prepend an endpoint that already has the configured base url with the configured base url, but should replace placeholders', () => {
      expect(
        cdsEndpointsService.getUrl(
          `${mockCdsConfig.cds.baseUrl}${mockCdsConfig.cds.endpoints.strategyProducts}`,
          { strategyId: STRATEGY_ID }
        )
      ).toBe(FULLY_CALCULATED_URL);
    });

    it('should escape special characters passed in url params', () => {
      expect(
        cdsEndpointsService.getUrl(STRATEGY_PRODUCTS_ENDPOINT_KEY, {
          strategyId: 'ąćę$%',
        })
      ).toBe(
        `${mockCdsConfig.cds.baseUrl}/strategy/${mockCdsConfig.cds.tenant}/strategies/%C4%85%C4%87%C4%99%24%25/products`
      );
    });

    it('should append query parameters to the URL', () => {
      const FULLY_CALCULATED_URL_WITH_QUERY_PARAMS = `${FULLY_CALCULATED_URL}?site=${BASE_SITE}&language=${LANGUAGE}&pageSize=${PAGE_SIZE}`;
      const strategyRequest: StrategyRequest = {
        queryParams: {
          site: 'electronics-spa',
          language: 'en',
          pageSize: 10,
        },
      };

      expect(
        cdsEndpointsService.getUrl(
          STRATEGY_PRODUCTS_ENDPOINT_KEY,
          {
            strategyId: STRATEGY_ID,
          },
          strategyRequest.queryParams
        )
      ).toBe(FULLY_CALCULATED_URL_WITH_QUERY_PARAMS);
    });

    it('should append additional query parameters to URL that already has query parameters', () => {
      const URL = `${FULLY_CALCULATED_URL}?pageSize=${PAGE_SIZE}`;
      const FULLY_CALCULATED_URL_WITH_QUERY_PARAMS = `${FULLY_CALCULATED_URL}?pageSize=${PAGE_SIZE}&site=${BASE_SITE}&language=${LANGUAGE}`;

      const strategyRequestNoPageSize: StrategyRequest = {
        queryParams: {
          site: 'electronics-spa',
          language: 'en',
        },
      };
      expect(
        cdsEndpointsService.getUrl(
          URL,
          {
            strategyId: STRATEGY_ID,
          },
          strategyRequestNoPageSize.queryParams
        )
      ).toBe(FULLY_CALCULATED_URL_WITH_QUERY_PARAMS);
    });

    it('should handle query params that have "null" as the value, and simply not pass them to the request', () => {
      const FULLY_CALCULATED_URL_WITH_QUERY_PARAMS = `${FULLY_CALCULATED_URL}?site=${BASE_SITE}&pageSize=${PAGE_SIZE}`;

      const strategyRequest: StrategyRequest = {
        queryParams: {
          site: 'electronics-spa',
          language: null,
          pageSize: 10,
        },
      };

      expect(
        cdsEndpointsService.getUrl(
          STRATEGY_PRODUCTS_ENDPOINT_KEY,
          {
            strategyId: STRATEGY_ID,
          },
          strategyRequest.queryParams
        )
      ).toBe(FULLY_CALCULATED_URL_WITH_QUERY_PARAMS);
    });

    it('should prepend an unknown endpoint, without a leading slash, with the base url', () => {
      const UNKNOWN_ENDPOINT_KEY =
        'some-other-url-with-placeholders/${placeHolder1}/${placeHolder2}';
      expect(
        cdsEndpointsService.getUrl(UNKNOWN_ENDPOINT_KEY, {
          placeHolder1: 'value1',
          placeHolder2: 'value2',
        })
      ).toBe(
        `${mockCdsConfig.cds.baseUrl}/some-other-url-with-placeholders/value1/value2`
      );
    });
  });
});
