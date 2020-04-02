import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AnonymousConsentsService } from '../../anonymous-consents/index';
import { AnonymousConsent, Consent } from '../../model/index';
import { ConsentService } from './consent.service';
import { UserConsentService } from './user-consent.service';

class MockUserConsentService {
  getConsent(_templateId: string): Observable<Consent> {
    return of();
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
    return of();
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
      spyOn(userConsentService, 'getConsent').and.returnValue(of(mockConsent));
      spyOn(anonymousConsentsService, 'getConsent').and.returnValue(
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
      spyOn(service, 'getConsent').and.returnValue(of(undefined));
      let result = true;
      service
        .checkConsentGivenByTemplateId(mockTemplateId)
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(false);
    });
    describe('when the returned consent is of type anonymous consent', () => {
      it('should call anonymousConsentsService.isConsentGiven', () => {
        spyOn(service, 'getConsent').and.returnValue(of(mockAnonymousConsent));
        spyOn(service, 'isAnonymousConsentType').and.returnValue(true);
        spyOn(anonymousConsentsService, 'isConsentGiven').and.returnValue(true);
        spyOn(userConsentService, 'isConsentGiven').and.stub();
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
        spyOn(service, 'getConsent').and.returnValue(of(mockConsent));
        spyOn(service, 'isAnonymousConsentType').and.returnValue(false);
        spyOn(anonymousConsentsService, 'isConsentGiven').and.stub();
        spyOn(userConsentService, 'isConsentGiven').and.returnValue(true);
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
      spyOn(service, 'getConsent').and.returnValue(of(undefined));
      let result = false;
      service
        .checkConsentWithdrawnByTemplateId(mockTemplateId)
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual(true);
    });
    describe('when the returned consent is of type anonymous consent', () => {
      it('should call anonymousConsentsService.isConsentWithdrawn', () => {
        spyOn(service, 'getConsent').and.returnValue(of(mockAnonymousConsent));
        spyOn(service, 'isAnonymousConsentType').and.returnValue(true);
        spyOn(anonymousConsentsService, 'isConsentWithdrawn').and.returnValue(
          true
        );
        spyOn(userConsentService, 'isConsentWithdrawn').and.stub();
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
        spyOn(service, 'getConsent').and.returnValue(of(mockConsent));
        spyOn(service, 'isAnonymousConsentType').and.returnValue(false);
        spyOn(anonymousConsentsService, 'isConsentWithdrawn').and.stub();
        spyOn(userConsentService, 'isConsentWithdrawn').and.returnValue(true);
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
        spyOn(anonymousConsentsService, 'isConsentGiven').and.returnValue(true);
        spyOn(userConsentService, 'isConsentGiven').and.stub();

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
        spyOn(anonymousConsentsService, 'isConsentGiven').and.stub();
        spyOn(userConsentService, 'isConsentGiven').and.returnValue(true);

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
        spyOn(anonymousConsentsService, 'isConsentWithdrawn').and.returnValue(
          true
        );
        spyOn(userConsentService, 'isConsentWithdrawn').and.stub();

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
        spyOn(anonymousConsentsService, 'isConsentWithdrawn').and.stub();
        spyOn(userConsentService, 'isConsentWithdrawn').and.returnValue(true);

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
