import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { EMPTY, Observable, of } from 'rxjs';
import { AnonymousConsentsService } from '../../anonymous-consents/index';
import { AnonymousConsent, Consent } from '../../model/index';
import { ConsentService } from './consent.service';
import { UserConsentService } from './user-consent.service';

class MockUserConsentService {
  getConsent(_templateId: string): Observable<Consent> {
    return EMPTY;
  }
  isConsentGiven(_consent: Consent): boolean {
    return false;
  }
  isConsentWithdrawn(_consent: Consent): boolean {
    return false;
  }
}

class MockAnonymousConsentsService {
  getConsent(_templateId: string): Observable<AnonymousConsent> {
    return EMPTY;
  }
  isConsentGiven(_consent: AnonymousConsent): boolean {
    return false;
  }
  isConsentWithdrawn(_consent: AnonymousConsent): boolean {
    return false;
  }
}

const mockTemplateId = 'PROFILE';
const mockConsent: Consent = {
  code: mockTemplateId,
};
const mockAnonymousConsent: AnonymousConsent = {
  templateCode: mockTemplateId,
};

describe('ConsentService', () => {
  let service: ConsentService;
  let userConsentService: UserConsentService;
  let anonymousConsentsService: AnonymousConsentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserConsentService, useClass: MockUserConsentService },
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
      ],
    });

    service = TestBed.inject(ConsentService);
    userConsentService = TestBed.inject(UserConsentService);
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);
  });

  describe('getConsent', () => {
    it('should merge both anonymous and registered-consent getConsent methods', () => {
      vi.spyOn(userConsentService, 'getConsent').mockReturnValue(of(mockConsent));
      vi.spyOn(anonymousConsentsService, 'getConsent').mockReturnValue(
        of(mockAnonymousConsent)
      );

      const results: (Consent | AnonymousConsent)[] = [];
      service
        .getConsent(mockTemplateId)
        .subscribe((value) => results.push(value))
        .unsubscribe();
      expect(userConsentService.getConsent).toHaveBeenCalledWith(
        mockTemplateId
      );
      expect(anonymousConsentsService.getConsent).toHaveBeenCalledWith(
        mockTemplateId
      );
      expect(results).toEqual([mockConsent, mockAnonymousConsent]);
    });
  });

  describe('checkConsentGivenByTemplateId', () => {
    it('should return false if the consent is falsy', () => {
      vi.spyOn(service, 'getConsent').mockReturnValue(of(undefined));
      let result = true;
      service
        .checkConsentGivenByTemplateId(mockTemplateId)
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(false);
    });
    describe('when the returned consent is of type anonymous consent', () => {
      it('should call anonymousConsentsService.isConsentGiven', () => {
        vi.spyOn(service, 'getConsent').mockReturnValue(of(mockAnonymousConsent));
        vi.spyOn(service, 'isAnonymousConsentType').mockReturnValue(true);
        vi.spyOn(anonymousConsentsService, 'isConsentGiven').mockReturnValue(true);
        vi.spyOn(userConsentService, 'isConsentGiven').mockImplementation(() => {});
        let result = false;
        service
          .checkConsentGivenByTemplateId(mockTemplateId)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
        expect(anonymousConsentsService.isConsentGiven).toHaveBeenCalledWith(
          mockAnonymousConsent
        );
        expect(userConsentService.isConsentGiven).not.toHaveBeenCalled();
      });
    });
    describe('when the returned consent is of type registered consent', () => {
      it('should call userConsentService.isConsentGiven', () => {
        vi.spyOn(service, 'getConsent').mockReturnValue(of(mockConsent));
        vi.spyOn(service, 'isAnonymousConsentType').mockReturnValue(false);
        vi.spyOn(anonymousConsentsService, 'isConsentGiven').mockImplementation(() => {});
        vi.spyOn(userConsentService, 'isConsentGiven').mockReturnValue(true);
        let result = false;
        service
          .checkConsentGivenByTemplateId(mockTemplateId)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
        expect(anonymousConsentsService.isConsentGiven).not.toHaveBeenCalled();
        expect(userConsentService.isConsentGiven).toHaveBeenCalledWith(
          mockConsent
        );
      });
    });
  });

  describe('checkConsentWithdrawnByTemplateId', () => {
    it('should return true if the consent is falsy', () => {
      vi.spyOn(service, 'getConsent').mockReturnValue(of(undefined));
      let result = false;
      service
        .checkConsentWithdrawnByTemplateId(mockTemplateId)
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(true);
    });
    describe('when the returned consent is of type anonymous consent', () => {
      it('should call anonymousConsentsService.isConsentWithdrawn', () => {
        vi.spyOn(service, 'getConsent').mockReturnValue(of(mockAnonymousConsent));
        vi.spyOn(service, 'isAnonymousConsentType').mockReturnValue(true);
        vi.spyOn(anonymousConsentsService, 'isConsentWithdrawn').mockReturnValue(
          true
        );
        vi.spyOn(userConsentService, 'isConsentWithdrawn').mockImplementation(() => {});
        let result = false;
        service
          .checkConsentWithdrawnByTemplateId(mockTemplateId)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
        expect(
          anonymousConsentsService.isConsentWithdrawn
        ).toHaveBeenCalledWith(mockAnonymousConsent);
        expect(userConsentService.isConsentWithdrawn).not.toHaveBeenCalled();
      });
    });
    describe('when the returned consent is of type registered consent', () => {
      it('should call userConsentService.isConsentWithdrawn', () => {
        vi.spyOn(service, 'getConsent').mockReturnValue(of(mockConsent));
        vi.spyOn(service, 'isAnonymousConsentType').mockReturnValue(false);
        vi.spyOn(anonymousConsentsService, 'isConsentWithdrawn').mockImplementation(() => {});
        vi.spyOn(userConsentService, 'isConsentWithdrawn').mockReturnValue(true);
        let result = false;
        service
          .checkConsentWithdrawnByTemplateId(mockTemplateId)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
        expect(
          anonymousConsentsService.isConsentWithdrawn
        ).not.toHaveBeenCalled();
        expect(userConsentService.isConsentWithdrawn).toHaveBeenCalledWith(
          mockConsent
        );
      });
    });
  });

  describe('isConsentGiven', () => {
    describe('when anonymous consent is provided', () => {
      it('should delegate to anonymousConsentsService.isConsentGiven()', () => {
        vi.spyOn(anonymousConsentsService, 'isConsentGiven').mockReturnValue(true);
        vi.spyOn(userConsentService, 'isConsentGiven').mockImplementation(() => {});

        const result = service.isConsentGiven(mockAnonymousConsent);

        expect(result).toEqual(true);
        expect(anonymousConsentsService.isConsentGiven).toHaveBeenCalledWith(
          mockAnonymousConsent
        );
        expect(userConsentService.isConsentGiven).not.toHaveBeenCalled();
      });
    });
    describe('when registered consent is provided', () => {
      it('should delegate to userConsentService.isConsentGiven()', () => {
        vi.spyOn(anonymousConsentsService, 'isConsentGiven').mockImplementation(() => {});
        vi.spyOn(userConsentService, 'isConsentGiven').mockReturnValue(true);

        const result = service.isConsentGiven(mockConsent);

        expect(result).toEqual(true);
        expect(userConsentService.isConsentGiven).toHaveBeenCalledWith(
          mockConsent
        );
        expect(anonymousConsentsService.isConsentGiven).not.toHaveBeenCalled();
      });
    });
  });

  describe('isConsentWithdrawn', () => {
    describe('when anonymous consent is provided', () => {
      it('should delegate to anonymousConsentsService.isConsentWithdrawn()', () => {
        vi.spyOn(anonymousConsentsService, 'isConsentWithdrawn').mockReturnValue(
          true
        );
        vi.spyOn(userConsentService, 'isConsentWithdrawn').mockImplementation(() => {});

        const result = service.isConsentWithdrawn(mockAnonymousConsent);

        expect(result).toEqual(true);
        expect(
          anonymousConsentsService.isConsentWithdrawn
        ).toHaveBeenCalledWith(mockAnonymousConsent);
        expect(userConsentService.isConsentWithdrawn).not.toHaveBeenCalled();
      });
    });
    describe('when registered consent is provided', () => {
      it('should delegate to userConsentService.isConsentWithdrawn()', () => {
        vi.spyOn(anonymousConsentsService, 'isConsentWithdrawn').mockImplementation(() => {});
        vi.spyOn(userConsentService, 'isConsentWithdrawn').mockReturnValue(true);

        const result = service.isConsentWithdrawn(mockConsent);

        expect(result).toEqual(true);
        expect(userConsentService.isConsentWithdrawn).toHaveBeenCalledWith(
          mockConsent
        );
        expect(
          anonymousConsentsService.isConsentWithdrawn
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe('isAnonymousConsentType', () => {
    it('should return true if anonymous consent type is provided', () => {
      const result = service.isAnonymousConsentType(mockAnonymousConsent);
      expect(result).toEqual(true);
    });
    it('should return false if registered consent type is provided', () => {
      const result = service.isAnonymousConsentType(mockConsent);
      expect(result).toEqual(false);
    });
  });

  describe('isConsentType', () => {
    it('should return true if registered consent type is provided', () => {
      const result = service.isConsentType(mockConsent);
      expect(result).toEqual(true);
    });
    it('should return false if anonymous consent type is provided', () => {
      const result = service.isConsentType(mockAnonymousConsent);
      expect(result).toEqual(false);
    });
  });
});
