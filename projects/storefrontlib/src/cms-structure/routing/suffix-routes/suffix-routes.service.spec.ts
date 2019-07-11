import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SuffixRoutesConfig } from './suffix-routes-config';
import { SuffixRoutesService } from './suffix-routes.service';

describe('SuffixRoutesService', () => {
  let service: SuffixRoutesService;
  let config: SuffixRoutesConfig;
  let router: Router;

  beforeEach(() => {
    const mockConfig = { routing: { suffixRoutes: {} } };
    class MockRouter {
      config = [
        { data: { cxRoute: 'product' } },
        { data: { cxSuffixRoute: 'product' } },
        { data: { cxSuffixRoute: 'category' } },
      ];

      resetConfig(routes) {
        this.config = routes;
      }
    }
    TestBed.configureTestingModule({
      providers: [
        { provide: SuffixRoutesConfig, useValue: mockConfig },
        { provide: Router, useClass: MockRouter },
      ],
    });

    service = TestBed.get(SuffixRoutesService);
    router = TestBed.get(Router);
    config = TestBed.get(SuffixRoutesConfig);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not disable suffix routes if not configured so', () => {
    service.init();
    expect(router.config).toEqual([
      { data: { cxRoute: 'product' } },
      { data: { cxSuffixRoute: 'product' } },
      { data: { cxSuffixRoute: 'category' } },
    ]);
  });

  it('should disable only suffix routes that were disabled by config, but not standard routes', () => {
    config.routing.suffixRoutes.product = { disabled: true };
    service.init();
    expect(router.config).toEqual([
      { data: { cxRoute: 'product' } },
      { data: { cxSuffixRoute: 'product' }, matcher: jasmine.any(Function) },
      { data: { cxSuffixRoute: 'category' } },
    ]);
    expect(router.config[1].matcher(null, null, null)).toBe(null);
  });

  it('should disable all suffix routes that were disabled by config', () => {
    config.routing.suffixRoutes = {
      product: { disabled: true },
      category: { disabled: true },
    };
    service.init();
    expect(router.config).toEqual([
      { data: { cxRoute: 'product' } },
      { data: { cxSuffixRoute: 'product' }, matcher: jasmine.any(Function) },
      { data: { cxSuffixRoute: 'category' }, matcher: jasmine.any(Function) },
    ]);
    expect(router.config[1].matcher(null, null, null)).toBe(null);
    expect(router.config[2].matcher(null, null, null)).toBe(null);
  });
});
