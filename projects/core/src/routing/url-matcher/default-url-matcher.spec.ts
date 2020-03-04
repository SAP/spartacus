import { TestBed } from '@angular/core/testing';
import { UrlMatcher } from '@angular/router';
import { RoutingConfigService } from '../configurable-routes/routing-config.service';
import { UrlMatcherService } from '../services/url-matcher.service';
import { DEFAULT_URL_MATCHER } from './default-url-matcher';

class MockRoutingConfigService implements Partial<RoutingConfigService> {
  getRouteConfig = jasmine.createSpy('getRouteConfig').and.returnValue({
    paths: ['test-path'],
  });
}

const fromPathsUrlMatcher: UrlMatcher = () => null;

class MockUrlMatcherService implements Partial<UrlMatcherService> {
  getFromPaths = jasmine
    .createSpy('fromPaths')
    .and.returnValue(fromPathsUrlMatcher);
}

describe('DEFAULT_URL_MATCHER', () => {
  let routingConfigService: RoutingConfigService;
  let urlMatcherService: UrlMatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingConfigService,
          useClass: MockRoutingConfigService,
        },
        {
          provide: UrlMatcherService,
          useClass: MockUrlMatcherService,
        },
      ],
    });
    urlMatcherService = TestBed.inject(UrlMatcherService);
    routingConfigService = TestBed.inject(RoutingConfigService);
  });

  it('should provide a function to create URL matcher from configured paths of given route', () => {
    const factory = TestBed.inject(DEFAULT_URL_MATCHER);
    const route = { data: { cxRoute: 'testPage' } };
    const urlMatcher = factory(route);
    expect(routingConfigService.getRouteConfig).toHaveBeenCalledWith(
      'testPage'
    );
    expect(urlMatcherService.getFromPaths).toHaveBeenCalledWith(['test-path']);
    expect(urlMatcher).toBe(fromPathsUrlMatcher);
  });
});
