import { inject, TestBed } from '@angular/core/testing';
import { AuthMultisiteIsolationService } from './auth-multisite-isolation.service';
// import { Observable, of } from 'rxjs';

// class MockBaseSiteService {
//   get(): Observable<string> {
//     return of();
//   }
// }

// const mockDecorator = '|';

// const mockBaseSite = 'test-site';

// const mockCredentials = {
//   userId: 'test@example.com',
//   password: 'myPassword',
// };

describe('AuthMultisiteIsolationService', () => {
  let service: AuthMultisiteIsolationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthMultisiteIsolationService],
    });

    service = TestBed.inject(AuthMultisiteIsolationService);
  });

  it('should be injected', inject(
    [AuthMultisiteIsolationService],
    (authMultisiteIsolationService: AuthMultisiteIsolationService) => {
      expect(authMultisiteIsolationService).toBeTruthy();
    }
  ));

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
