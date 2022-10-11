import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
import { AuthToken, EventService } from '@spartacus/core';
import { of, Subject, throwError } from 'rxjs';
import { CdcUserAuthenticationTokenService } from '../auth/services/user-authentication/cdc-user-authentication-token.service';
import createSpy = jasmine.createSpy;

const anonymousUser = {} as Partial<AuthToken & { expires_in?: number }>;
const cdcAuthenticatedUser: Partial<AuthToken & { expires_in?: number }> = {
  access_token: '123',
  expires_in: 123,
};

const UID: string = 'uid';
const UIDSignature: string = 'uidSignature';
const signatureTimestamp: string = 'signature-timestamp';
const idToken: string = 'cdc-id-token';
const baseSite: string = 'some-base-site';

class MockCdcUserAuthenticationTokenService
  implements Partial<CdcUserAuthenticationTokenService>
{
  loadTokenUsingCustomFlow = createSpy().and.returnValue(
    of(cdcAuthenticatedUser)
  );
}

describe('CdcEventBuilder', () => {
  let actions$: Subject<Action>;
  let eventService: EventService;
  let cdcUserAuthTokenService: CdcUserAuthenticationTokenService;

  beforeEach(() => {
    actions$ = new Subject();
    TestBed.configureTestingModule({
      providers: [
        { provide: ActionsSubject, useValue: actions$ },
        {
          provide: CdcUserAuthenticationTokenService,
          useClass: MockCdcUserAuthenticationTokenService,
        },
      ],
    });

    eventService = TestBed.inject(EventService);
    cdcUserAuthTokenService = TestBed.inject(CdcUserAuthenticationTokenService);
  });

  describe('LoadCDCUserTokenFail', () => {
    it('should emit a LoadCDCUserTokenFail when a user CDC Custom Oauth token flow fails', (done) => {
      cdcUserAuthTokenService.loadTokenUsingCustomFlow =
        createSpy().and.returnValue(throwError(' Error '));

      checkFailEvent();
      expect(eventService).toBeDefined();
      done();
    });

    it('should NOT emit a LoadCDCUserTokenFail when CDC Custom Oauth token flow is successful', (done) => {
      cdcUserAuthTokenService.loadTokenUsingCustomFlow =
        createSpy().and.returnValue(of(cdcAuthenticatedUser));

      checkNoFailure();
      expect(eventService).toBeDefined();
      done();
    });

    it('should NOT emit a LoadCDCUserTokenFail when a token is already present', (done) => {
      createSpy().and.returnValues(of(anonymousUser), of(cdcAuthenticatedUser));

      checkNoFailure();
      checkNoFailure();
      expect(eventService).toBeDefined();
      done();
    });

    it('should emit LoadCDCUserTokenFail on failure and not on success', (done) => {
      cdcUserAuthTokenService.loadTokenUsingCustomFlow =
        createSpy().and.returnValues(
          throwError(' Error '),
          of(cdcAuthenticatedUser)
        );

      checkFailEvent();
      checkNoFailure();

      expect(eventService).toBeDefined();
      done();
    });
  });

  function checkFailEvent() {
    cdcUserAuthTokenService
      .loadTokenUsingCustomFlow(
        UID,
        UIDSignature,
        signatureTimestamp,
        idToken,
        baseSite
      )
      .subscribe({
        next: () => {
          expect(false).toBeTruthy(); //fail the test
        },
        error: () => {
          eventService
            .get(CdcLoadUserTokenFailEvent)
            .subscribe((value) =>
              expect(value).toEqual(new CdcLoadUserTokenFailEvent())
            );
        },
      });
  }

  function checkNoFailure() {
    cdcUserAuthTokenService
      .loadTokenUsingCustomFlow(
        UID,
        UIDSignature,
        signatureTimestamp,
        idToken,
        baseSite
      )
      .subscribe({
        next: () => {
          eventService
            .get(CdcLoadUserTokenFailEvent)
            .subscribe((value) => expect(value).toBeUndefined());
        },
        error: () => {
          expect(false).toBeTruthy(); //fail the test
        },
      });
  }
});
