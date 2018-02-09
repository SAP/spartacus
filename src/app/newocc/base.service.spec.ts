import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from '../newocc/base.service';
import { of } from 'rxjs/observable/of';
import { ConfigService } from './config.service';

class MockConfigService {
  server = {
    baseUrl: '/mockBaseUrl',
    occPrefix: '/mockOccPrefix',
  };
  site = {
    baseSite: '/mockBaseSite'
  };
}

fdescribe('BaseService', () => {
  let service: BaseService;
  let config: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        BaseService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(BaseService);
    config = TestBed.get(ConfigService);
  });

  it('should return the product endpoint', () => {
    const endpoint = service.getProductEndpoint();
    expect(endpoint).toEqual('/mockBaseUrl/mockOccPrefix/mockBaseSite/products');
  });

  it('should return the product search endpoint', () => {
    const endpoint = service.getProductSearchEndpoint();
    expect(endpoint).toEqual('/mockBaseUrl/mockOccPrefix/mockBaseSite/products/search');
  });

  it('should return the product suggestions endpoint', () => {
    const endpoint = service.getProductSuggestionsEndpoint();
    expect(endpoint).toEqual('/mockBaseUrl/mockOccPrefix/mockBaseSite/products/suggestions');
  });

  it('should return the cart endpoint', () => {
    const endpoint = service.getCartEndpoint('123');
    expect(endpoint).toEqual('/mockBaseUrl/mockOccPrefix/mockBaseSite/users/123/carts/');
  });

  it('should return the oauth endpoint', () => {
    const endpoint = service.getOAuthEndpoint();
    expect(endpoint).toEqual('/mockBaseUrl/authorizationserver/oauth/token');
  });

  it('should return the oauth endpoint', () => {
    const endpoint = service.getUserEndpoint();
    expect(endpoint).toEqual('/mockBaseUrl/mockOccPrefix/mockBaseSite/users/');
  });
});
