import { inject, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AuthMultisiteIsolationService } from './auth-multisite-isolation.service';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { BaseSite } from '../../../model/misc.model';

const mockBaseSite: BaseSite = {
  uid: 'test-basesite',
  isolated: true,
};

const mockDecorator = `|${mockBaseSite?.uid}`;

class MockBaseSiteService {
  get(): Observable<BaseSite> {
    return of(mockBaseSite);
  }
}

describe('AuthMultisiteIsolationService', () => {
  let service: AuthMultisiteIsolationService;
  let baseSiteService: BaseSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthMultisiteIsolationService,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
      ],
    });

    service = TestBed.inject(AuthMultisiteIsolationService);
    baseSiteService = TestBed.inject(BaseSiteService);
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

  it('should getBaseSiteDecorator() return decorator if `isolated` property is `true`', () => {
    spyOn(baseSiteService, 'get').and.returnValue(of(mockBaseSite));

    const decorator = service.getBaseSiteDecorator();

    expect(decorator).toBe(mockDecorator);
  });

  it('should getBaseSiteDecorator() return empty string decorator if `isolated` is `false`', () => {
    spyOn(baseSiteService, 'get').and.returnValue(
      of({ ...mockBaseSite, ...{ isolated: false } })
    );

    const decorator = service.getBaseSiteDecorator();

    expect(decorator).toBe('');
  });
});
