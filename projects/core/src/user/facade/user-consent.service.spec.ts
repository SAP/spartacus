import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/facade/auth.service';
import { ConsentTemplate } from '../../model/consent.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserConsentService } from './user-consent.service';

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('UserConsentService', () => {
  let service: UserConsentService;
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
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithUser>>);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(UserConsentService as Type<UserConsentService>);
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
      it('should return the consent template list', () => {
        store.dispatch(
          new UserActions.LoadUserConsentsSuccess(consentTemplateListMock)
        );

        let result: ConsentTemplate[];
        service
          .getConsents()
          .subscribe(consents => (result = consents))
          .unsubscribe();
        expect(result).toEqual(consentTemplateListMock);
      });
    });
    describe('getConsentsResultLoading', () => {
      it('should return the loading flag', () => {
        store.dispatch(new UserActions.LoadUserConsents(userId));

        let result = false;
        service
          .getConsentsResultLoading()
          .subscribe(loading => (result = loading))
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
          .subscribe(loading => (result = loading))
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
          .subscribe(loading => (result = loading))
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
          .subscribe(loading => (result = loading))
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
          .subscribe(loading => (result = loading))
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
          .subscribe(loading => (result = loading))
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
          .subscribe(loading => (result = loading))
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
          .subscribe(loading => (result = loading))
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
          .subscribe(loading => (result = loading))
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
});
