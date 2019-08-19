import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthConfig } from '../../auth/config/auth-config';
import { CustomerService } from './customer.service';

const mockAuthConfig: AuthConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  authentication: {
    client_id: '',
    client_secret: '',
  },
};
describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthConfig, useValue: mockAuthConfig }],
    });
  });

  it('should be created', () => {
    const service: CustomerService = TestBed.get(CustomerService);
    expect(service).toBeTruthy();
  });
});
