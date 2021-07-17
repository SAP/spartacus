import { TestBed } from '@angular/core/testing';
import {
  AnonymousConsent,
  ConsentTemplate,
} from '@spartacus/user/anonymous-consents/root';
import { Observable, of } from 'rxjs';
import { UserAnonymousConsentTemplatesAdapter } from './user-anonymous-consent-templates.adapter';
import { UserAnonymousConsentTemplatesConnector } from './user-anonymous-consent-templates.connector';

class MockUserAnonymousConsentTemplatesAdapter
  implements Partial<UserAnonymousConsentTemplatesAdapter> {
  loadAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    return of();
  }
  loadAnonymousConsents(): Observable<AnonymousConsent[]> {
    return of();
  }
}

describe('AnonymousConsentTemplatesConnector', () => {
  let service: UserAnonymousConsentTemplatesConnector;
  let adapter: UserAnonymousConsentTemplatesAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserAnonymousConsentTemplatesAdapter,
          useClass: MockUserAnonymousConsentTemplatesAdapter,
        },
        UserAnonymousConsentTemplatesConnector,
      ],
    });

    adapter = TestBed.inject(UserAnonymousConsentTemplatesAdapter);
    service = TestBed.inject(UserAnonymousConsentTemplatesConnector);

    spyOn(adapter, 'loadAnonymousConsentTemplates').and.returnValue(of([]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadAnonymousConsentTemplates', () => {
    it('should call adapter', () => {
      let result: ConsentTemplate[] | undefined;
      service
        .loadAnonymousConsentTemplates()
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual([]);
      expect(adapter.loadAnonymousConsentTemplates).toHaveBeenCalled();
    });
  });

  describe('loadAnonymousConsentTemplates', () => {
    it('should call adapter', () => {
      const mockConsents: AnonymousConsent[] = [{ templateCode: 'test' }];
      spyOn(adapter, 'loadAnonymousConsents').and.returnValue(of(mockConsents));

      let result: AnonymousConsent[] | undefined;
      service
        .loadAnonymousConsents()
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(mockConsents);
      expect(adapter.loadAnonymousConsents).toHaveBeenCalled();
    });
  });
});
