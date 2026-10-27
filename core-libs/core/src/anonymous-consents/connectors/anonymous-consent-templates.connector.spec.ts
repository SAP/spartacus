import { AnonymousConsentTemplatesAdapter } from './anonymous-consent-templates.adapter';
import { TestBed } from '@angular/core/testing';
import { EMPTY, firstValueFrom, of } from 'rxjs';
import { AnonymousConsent } from '../../model/index';
import { AnonymousConsentTemplatesConnector } from './anonymous-consent-templates.connector';

describe('AnonymousConsentTemplatesConnector', () => {
  let service: AnonymousConsentTemplatesConnector;
  let adapter: {
    loadAnonymousConsentTemplates: ReturnType<typeof vi.fn>;
    loadAnonymousConsents: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      loadAnonymousConsentTemplates: vi.fn().mockReturnValue(of([])),
      loadAnonymousConsents: vi.fn().mockReturnValue(EMPTY),
    };
    TestBed.configureTestingModule({
      providers: [
        AnonymousConsentTemplatesConnector,
        { provide: AnonymousConsentTemplatesAdapter, useValue: adapter },
      ],
    });
    service = TestBed.inject(AnonymousConsentTemplatesConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadAnonymousConsentTemplates', () => {
    it('should call adapter', async () => {
      const result = await firstValueFrom(
        service.loadAnonymousConsentTemplates()
      );
      expect(result).toEqual([]);
      expect(adapter.loadAnonymousConsentTemplates).toHaveBeenCalled();
    });
  });

  describe('loadAnonymousConsentTemplates', () => {
    it('should call adapter', async () => {
      const mockConsents: AnonymousConsent[] = [{ templateCode: 'test' }];
      adapter.loadAnonymousConsents.mockReturnValue(of(mockConsents));

      const result = await firstValueFrom(service.loadAnonymousConsents());
      expect(result).toEqual(mockConsents);
      expect(adapter.loadAnonymousConsents).toHaveBeenCalled();
    });
  });
});
