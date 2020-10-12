import { TestBed } from '@angular/core/testing';
import { BasicAuthService } from '../services/basic-auth.service';
import { AuthService } from './auth.service';

class MockBasicAuthService {
  initImplicit() {}
}

// TODO(#8246): Fix unit tests after final implementation
describe('AuthService', () => {
  let service: AuthService;
  // let basicAuthService: BasicAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        {
          provide: BasicAuthService,
          useClass: MockBasicAuthService,
        },
      ],
    });

    service = TestBed.inject(AuthService);
    // basicAuthService = TestBed.inject(BasicAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
