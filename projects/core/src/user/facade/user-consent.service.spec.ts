import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Consent, ConsentTemplate } from '../../model/consent.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserConsentService } from './user-consent.service';

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('UserConsentService', () => {
  let service: UserConsentService;
  let authService: AuthService;
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        UserConsentService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(UserConsentService);
    authService = TestBed.inject(AuthService);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should UserConsentService is injected', inject(
    [UserConsentService],
    (userConsentService: UserConsentService) => {
      expect(userConsentService).toBeTruthy();
    }
  ));

  const userId = OCC_USER_ID_CURRENT;
  const consentTemplateListMock: ConsentTemplate[] = [{ id: 'xxx' }];

  describe('load consents', () => {
    describe('loadConsents', () => {
      it('should dispatch an action', () => {
        service.loadConsents();
        expect(store.dispatch).toHaveBeenCalledWith(
          new UserActions.LoadUserConsents(userId)
        );
      });
    });
    describe('getConsents', () => {
      describe('when the loadIfMissing parameter is false', () => {
        it('should just return the consent template list', () => {
          store.dispatch(
            new UserActions.LoadUserConsentsSuccess(consentTemplateListMock)
          );

          let result: ConsentTemplate[];
          service
            .getConsents()
            .subscribe((consents) => (result = consents))
            .unsubscribe();
          expect(result).toEqual(consentTemplateListMock);
        });
      });
      describe('when the loadIfMissing parameter is set to true', () => {
        it('should call loadConsents()', () => {
          spyOn(service, 'loadConsents').and.stub();
          spyOn(service, 'getConsentsResultLoading').and.returnValue(of(false));
          spyOn(service, 'getConsentsResultSuccess').and.returnValue(of(false));

          service.getConsents(true).subscribe().unsubscribe();

          expect(service.loadConsents).toHaveBeenCalled();
        });
        describe('when the templates already exist', () => {
          it('should NOT call loadConsents()', () => {
            store.dispatch(
              new UserActions.LoadUserConsentsSuccess(consentTemplateListMock)
            );
            spyOn(service, 'loadConsents').and.stub();
            spyOn(service, 'getConsentsResultLoading').and.returnValue(
              of(false)
            );
            spyOn(service, 'getConsentsResultSuccess').and.returnValue(
              of(false)
            );

            service.getConsents(true).subscribe().unsubscribe();

            expect(service.loadConsents).not.toHaveBeenCalled();
          });
        });
        describe('when the templates are currently being loaded', () => {
          it('should NOT call loadConsents()', () => {
            spyOn(service, 'loadConsents').and.stub();
            spyOn(service, 'getConsentsResultLoading').and.returnValue(
              of(true)
            );
            spyOn(service, 'getConsentsResultSuccess').and.returnValue(
              of(false)
            );

            service.getConsents(true).subscribe().unsubscribe();

            expect(service.loadConsents).not.toHaveBeenCalled();
          });
        });
        describe('when the loading was already attempted', () => {
          it('should NOT call loadConsents()', () => {
            store.dispatch(
              new UserActions.LoadUserConsentsSuccess(consentTemplateListMock)
            );
            spyOn(service, 'loadConsents').and.stub();
            spyOn(service, 'getConsentsResultLoading').and.returnValue(
              of(false)
            );
            spyOn(service, 'getConsentsResultSuccess').and.returnValue(
              of(true)
            );

            service.getConsents(true).subscribe().unsubscribe();

            expect(service.loadConsents).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('getConsentsResultLoading', () => {
      it('should return the loading flag', () => {
        store.dispatch(new UserActions.LoadUserConsents(userId));

        let result = false;
        service
          .getConsentsResultLoading()
          .subscribe((loading) => (result = loading))
          .unsubscribe();

        expect(result).toEqual(true);
      });
    });
    describe('getConsentsResultSuccess', () => {
      it('should return the success flag', () => {
        store.dispatch(
          new UserActions.LoadUserConsentsSuccess(consentTemplateListMock)
        );

        let result = false;
        service
          .getConsentsResultSuccess()
          .subscribe((loading) => (result = loading))
          .unsubscribe();

        expect(result).toEqual(true);
      });
    });
    describe('getConsentsResultError', () => {
      it('should return the error flag', () => {
        store.dispatch(new UserActions.LoadUserConsentsFail('an error'));

        let result = false;
        service
          .getConsentsResultError()
          .subscribe((loading) => (result = loading))
          .unsubscribe();

        expect(result).toEqual(true);
      });
    });
    describe('resetConsentsProcessState', () => {
      it('should dispatch the reset action', () => {
        service.resetConsentsProcessState();
        expect(store.dispatch).toHaveBeenCalledWith(
          new UserActions.ResetLoadUserConsents()
        );
      });
    });

    describe('getConsent', () => {
      const mockTemplateId = 'PROFILE';
      const mockConsentTemplates: ConsentTemplate[] = [
        {
          id: mockTemplateId,
          currentConsent: {
            code: 'xxx',
          },
        },
      ];

      describe('when the user is logged in', () => {
        it('should call getConsentByTemplateId selector', () => {
          spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
          spyOn(service, 'getConsents').and.returnValue(
            of(mockConsentTemplates)
          );
          store.dispatch(
            new UserActions.LoadUserConsentsSuccess(mockConsentTemplates)
          );

          let result: Consent;
          service
            .getConsent(mockTemplateId)
            .subscribe((value) => (result = value))
            .unsubscribe();
          expect(result).toEqual(mockConsentTemplates[0].currentConsent);
        });
      });
      describe('when the user is anonymous', () => {
        it('should not call getConsents()', () => {
          spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
          spyOn(service, 'getConsents').and.stub();

          service.getConsent(mockTemplateId).subscribe().unsubscribe();

          expect(service.getConsents).not.toHaveBeenCalled();
        });
      });
    });

    describe('isConsentGiven', () => {
      describe('when the consent does not exist', () => {
        it('should return false', () => {
          const result = service.isConsentGiven(undefined);
          expect(result).toEqual(false);
        });
      });
      describe('when the consent has a given date, but not the withdrawn date', () => {
        it('should return true', () => {
          const result = service.isConsentGiven({
            consentGivenDate: new Date(),
          });
          expect(result).toEqual(true);
        });
      });
      describe('when the consent has a withdrawn date', () => {
        it('should return true', () => {
          const result = service.isConsentGiven({
            consentGivenDate: new Date(),
            consentWithdrawnDate: new Date(),
          });
          expect(result).toEqual(false);
        });
      });
    });

    describe('isConsentWithdrawn', () => {
      describe('when the consent is falsy', () => {
        it('should return true', () => {
          const result = service.isConsentWithdrawn(undefined);
          expect(result).toEqual(true);
        });
      });
      describe('when the consent does NOT have a withdrawn date', () => {
        it('should return false', () => {
          const result = service.isConsentWithdrawn({
            consentGivenDate: new Date(),
          });
          expect(result).toEqual(false);
        });
      });
      describe('when the consent has a withdrawn date', () => {
        it('should return true', () => {
          const result = service.isConsentWithdrawn({
            consentGivenDate: new Date(),
            consentWithdrawnDate: new Date(),
          });
          expect(result).toEqual(true);
        });
      });
    });
  });

  describe('give consent', () => {
    const consentTemplateId = 'templateId';
    const consentTemplateVersion = 0;

    describe('giveConsent', () => {
      it('should dispatch an action', () => {
        service.giveConsent(consentTemplateId, consentTemplateVersion);
        expect(store.dispatch).toHaveBeenCalledWith(
          new UserActions.GiveUserConsent({
            userId,
            consentTemplateId,
            consentTemplateVersion,
          })
        );
      });
    });
    describe('getGiveConsentResultLoading', () => {
      it('should return the loading flag', () => {
        store.dispatch(
          new UserActions.GiveUserConsent({
            userId,
            consentTemplateId,
            consentTemplateVersion,
          })
        );

        let result = false;
        service
          .getGiveConsentResultLoading()
          .subscribe((loading) => (result = loading))
          .unsubscribe();

        expect(result).toEqual(true);
      });
    });
    describe('getGiveConsentResultSuccess', () => {
      it('should return the success flag', () => {
        store.dispatch(new UserActions.GiveUserConsentSuccess({}));

        let result = false;
        service
          .getGiveConsentResultSuccess()
          .subscribe((loading) => (result = loading))
          .unsubscribe();

        expect(result).toEqual(true);
      });
    });
    describe('getGiveConsentResultError', () => {
      it('should return the error flag', () => {
        store.dispatch(new UserActions.GiveUserConsentFail('an error'));

        let result = false;
        service
          .getGiveConsentResultError()
          .subscribe((loading) => (result = loading))
          .unsubscribe();

        expect(result).toEqual(true);
      });
    });
    describe('resetGiveConsentProcessState', () => {
      it('should dispatch the reset action', () => {
        service.resetGiveConsentProcessState();
        expect(store.dispatch).toHaveBeenCalledWith(
          new UserActions.ResetGiveUserConsentProcess()
        );
      });
    });
  });

  describe('withdraw consent', () => {
    describe('withdrawConsent', () => {
      it('should dispatch an action', () => {
        const consentCode = 'xxx';
        service.withdrawConsent(consentCode);
        expect(store.dispatch).toHaveBeenCalledWith(
          new UserActions.WithdrawUserConsent({
            userId,
            consentCode,
          })
        );
      });
    });
    describe('getWithdrawConsentResultLoading', () => {
      it('should return the loading flag', () => {
        store.dispatch(
          new UserActions.WithdrawUserConsent({ userId, consentCode: 'xxx' })
        );

        let result = false;
        service
          .getWithdrawConsentResultLoading()
          .subscribe((loading) => (result = loading))
          .unsubscribe();

        expect(result).toEqual(true);
      });
    });
    describe('getWithdrawConsentResultSuccess', () => {
      it('should return the success flag', () => {
        store.dispatch(new UserActions.WithdrawUserConsentSuccess());

        let result = false;
        service
          .getWithdrawConsentResultSuccess()
          .subscribe((loading) => (result = loading))
          .unsubscribe();

        expect(result).toEqual(true);
      });
    });
    describe('getWithdrawConsentResultError', () => {
      it('should return the error flag', () => {
        store.dispatch(new UserActions.WithdrawUserConsentFail('an error'));

        let result = false;
        service
          .getWithdrawConsentResultError()
          .subscribe((loading) => (result = loading))
          .unsubscribe();

        expect(result).toEqual(true);
      });
    });
    describe('resetWithdrawConsentProcessState', () => {
      it('should dispatch the reset action', () => {
        service.resetWithdrawConsentProcessState();
        expect(store.dispatch).toHaveBeenCalledWith(
          new UserActions.ResetWithdrawUserConsentProcess()
        );
      });
    });
  });

  describe('filterConsentTemplates', () => {
    const mockTemplateList: ConsentTemplate[] = [
      { id: 'MARKETING' },
      { id: 'PERSONALIZATION' },
    ];

    describe('when the empty hideTemplateIds is provided', () => {
      it('should return the provided templateList', () => {
        expect(service.filterConsentTemplates(mockTemplateList)).toEqual(
          mockTemplateList
        );
      });
    });
    describe('when a list of IDs to hide is provided', () => {
      it('should remove them from the provided templateList', () => {
        expect(
          service.filterConsentTemplates(mockTemplateList, ['MARKETING'])
        ).toEqual([mockTemplateList[1]]);
      });
    });
  });
});
