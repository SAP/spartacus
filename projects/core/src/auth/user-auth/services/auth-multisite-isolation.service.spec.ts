import { inject, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AuthMultisiteIsolationService } from './auth-multisite-isolation.service';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';

class MockBaseSiteService {
  get(): Observable<string> {
    return of();
  }
}

describe('AuthMultisiteIsolationService', () => {
  let service: AuthMultisiteIsolationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthMultisiteIsolationService,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
      ],
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
