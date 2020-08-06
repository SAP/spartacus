import { TestBed } from '@angular/core/testing';
import { AnonymousConsentsService } from '../../../../anonymous-consents/index';
import { AnonymousConsent } from '../../../../model/index';
import { AnonymousConsentNormalizer } from './anonymous-consents-normalizer';

class MockAnonymousConsentsService {
  decodeAndDeserialize(_rawConsents: string): AnonymousConsent[] {
    return null;
  }
}

describe('AnonymousConsentNormalizer', () => {
  let normalizer: AnonymousConsentNormalizer;
  let anonymousConsentsService: AnonymousConsentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnonymousConsentNormalizer,
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
      ],
    });
    normalizer = TestBed.inject(AnonymousConsentNormalizer);
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);
  });

  it('should be created', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should copy return request properties if target is not provided', () => {
    const mockConsents: AnonymousConsent[] = [{ templateCode: 'test' }];
    spyOn(anonymousConsentsService, 'decodeAndDeserialize').and.returnValue(
      mockConsents
    );
    const result = normalizer.convert('xxx');
    expect(result).toEqual(mockConsents);
    expect(anonymousConsentsService.decodeAndDeserialize).toHaveBeenCalled();
  });
});
