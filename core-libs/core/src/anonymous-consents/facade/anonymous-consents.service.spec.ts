/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, firstValueFrom, Observable, of } from 'rxjs';
import { AuthService } from '../../auth/index';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '../../model/index';
import {
  AnonymousConsentsActions,
  ANONYMOUS_CONSENTS_STORE_FEATURE,
  StateWithAnonymousConsents,
} from '../store/index';
import * as fromStoreReducers from '../store/reducers/index';
import { AnonymousConsentsService } from './anonymous-consents.service';

class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }
}

const mockTemplateId = 'MARKETING';
const mockConsentTemplates: ConsentTemplate[] = [
  {
    id: mockTemplateId,
    description: 'marketing consent template',
    version: 0,
  },
  {
    id: 'STORE_USER_INFO',
    description: 'store user info consent template',
    version: 0,
  },
];

const mockAnonymousConsents: AnonymousConsent[] = [
  {
    templateCode: mockTemplateId,
    consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
    templateVersion: 0,
  },
  {
    templateCode: 'STORE_USER_INFO',
    consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
    templateVersion: 0,
  },
];

describe('AnonymousConsentsService', () => {
  let service: AnonymousConsentsService;
  let store: Store<StateWithAnonymousConsents>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ANONYMOUS_CONSENTS_STORE_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    });

    service = TestBed.inject(AnonymousConsentsService);
    store = TestBed.inject(Store);
    authService = TestBed.inject(AuthService);
    vi.spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadTemplates should dispatch LoadAnonymousConsentTemplates action', () => {
    service.loadTemplates();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplates()
    );
  });

  describe('getTemplates', () => {
    describe('when load parameter is false', () => {
      it('should just call getAnonymousConsentTemplatesValue selector', async () => {
        vi.spyOn(service, 'loadTemplates').mockImplementation(() => {});
        store.dispatch(
          new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
            mockConsentTemplates
          )
        );

        const result = await firstValueFrom(service.getTemplates());
        expect(result).toEqual(mockConsentTemplates);
        expect(service.loadTemplates).not.toHaveBeenCalled();
      });
    });
    describe('when load parameter is true', () => {
      it('should not attempt the load if already loading', () => {
        vi.spyOn(service, 'loadTemplates').mockImplementation(() => {});
        vi.spyOn(service, 'getLoadTemplatesLoading').mockReturnValue(of(true));

        // firstValueFrom cannot be used here: the observable never emits (blocked by
        // filter(!loading)) and never completes (store selector is infinite), so
        // firstValueFrom would time out. subscribe/unsubscribe triggers the tap
        // synchronously and is the correct pattern for side-effect-only assertions.
        service.getTemplates(true).subscribe().unsubscribe();
        expect(service.loadTemplates).not.toHaveBeenCalled();
      });
      it('should attempt the load if NOT already loading and templates are undefined', () => {
        vi.spyOn(service, 'loadTemplates').mockImplementation(() => {});
        vi.spyOn(service, 'getLoadTemplatesLoading').mockReturnValue(of(false));

        // firstValueFrom cannot be used here: the tap fires but filter(Boolean(templates))
        // blocks emission since templates are undefined, and the store selector never
        // completes, so firstValueFrom would time out. subscribe/unsubscribe triggers
        // the tap synchronously and is the correct pattern for side-effect-only assertions.
        service.getTemplates(true).subscribe().unsubscribe();
        expect(service.loadTemplates).toHaveBeenCalled();
      });
      it('should NOT attempt the load if templates already exist', async () => {
        vi.spyOn(service, 'loadTemplates').mockImplementation(() => {});
        vi.spyOn(service, 'getLoadTemplatesLoading').mockReturnValue(of(false));
        store.dispatch(
          new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
            mockConsentTemplates
          )
        );

        await firstValueFrom(service.getTemplates(true));
        expect(service.loadTemplates).not.toHaveBeenCalled();
      });
    });
  });

  it('getTemplate should call getAnonymousConsentTemplate selector', async () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockConsentTemplates
      )
    );

    const result = await firstValueFrom(service.getTemplate(mockTemplateId));
    expect(result).toEqual(mockConsentTemplates[0]);
  });

  it('getLoadTemplatesLoading should call getAnonymousConsentTemplatesLoading selector', async () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplates()
    );

    const result = await firstValueFrom(service.getLoadTemplatesLoading());
    expect(result).toEqual(true);
  });

  it('getLoadTemplatesSuccess should call getAnonymousConsentTemplatesSuccess selector', async () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesSuccess(
        mockConsentTemplates
      )
    );

    const result = await firstValueFrom(service.getLoadTemplatesSuccess());
    expect(result).toEqual(true);
  });

  it('getLoadTemplatesError should call getAnonymousConsentTemplatesError selector', async () => {
    store.dispatch(
      new AnonymousConsentsActions.LoadAnonymousConsentTemplatesFail(
        new Error('an error')
      )
    );

    const result = await firstValueFrom(service.getLoadTemplatesError());
    expect(result).toEqual(true);
  });

  it('resetLoadTemplatesState should dispatch ResetLoadAnonymousConsentTemplates action', () => {
    service.resetLoadTemplatesState();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.ResetLoadAnonymousConsentTemplates()
    );
  });

  it('getConsents should call getAnonymousConsents selector', async () => {
    store.dispatch(
      new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
    );

    const result = await firstValueFrom(service.getConsents());
    expect(result).toEqual(mockAnonymousConsents);
  });

  it('setConsents should dispatch ResetLoadAnonymousConsentTemplates action', () => {
    service.setConsents(mockAnonymousConsents);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.SetAnonymousConsents(mockAnonymousConsents)
    );
  });

  describe('getConsent', () => {
    describe('when the user is anonymous', () => {
      it('should call getAnonymousConsentByTemplateCode selector', async () => {
        vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
        vi.spyOn(service, 'getTemplates').mockReturnValue(
          of(mockConsentTemplates)
        );
        store.dispatch(
          new AnonymousConsentsActions.SetAnonymousConsents(
            mockAnonymousConsents
          )
        );

        const result = await firstValueFrom(
          service.getConsent(mockTemplateId)
        );
        expect(result).toEqual(mockAnonymousConsents[0]);
      });
    });
    describe('when the user is NOT anonymous', () => {
      it('should not call getTemplates()', () => {
        vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
        vi.spyOn(service, 'getTemplates').mockImplementation(() => {});

        // firstValueFrom cannot be used here: getConsent returns EMPTY for logged-in
        // users, which completes without emitting. firstValueFrom would throw EmptyError.
        // subscribe/unsubscribe triggers the subscription synchronously and is the
        // correct pattern for side-effect-only assertions.
        service.getConsent(mockTemplateId).subscribe().unsubscribe();

        expect(service.getTemplates).not.toHaveBeenCalled();
      });
    });
  });

  it('giveConsent should dispatch GiveAnonymousConsent action', () => {
    service.giveConsent(mockTemplateId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.GiveAnonymousConsent(mockTemplateId)
    );
  });

  it('giveAllConsents should give anonymous consent for each consent template', async () => {
    vi.spyOn(service, 'getTemplates').mockReturnValue(of(mockConsentTemplates));
    vi.spyOn(service, 'giveConsent').mockImplementation(() => {});

    await firstValueFrom(service.giveAllConsents());

    expect(service.getTemplates).toHaveBeenCalled();
    expect(service.giveConsent).toHaveBeenCalledTimes(
      mockConsentTemplates.length
    );
  });

  describe('isConsentGiven', () => {
    it('should return true if the consent is given', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
      };
      expect(service.isConsentGiven(anonymousConsent)).toEqual(true);
    });
    it('should return false if the consent is withdrawn', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
      };
      expect(service.isConsentGiven(anonymousConsent)).toEqual(false);
    });
  });

  it('withdrawAnonymousConsent should dispatch WithdrawAnonymousConsent action', () => {
    service.withdrawConsent(mockTemplateId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.WithdrawAnonymousConsent(mockTemplateId)
    );
  });

  it('withdrawAllConsents should withdraw anonymous consent for each consent template', async () => {
    vi.spyOn(service, 'getTemplates').mockReturnValue(of(mockConsentTemplates));
    vi.spyOn(service, 'withdrawConsent').mockImplementation(() => {});

    await firstValueFrom(service.withdrawAllConsents());

    expect(service.getTemplates).toHaveBeenCalled();
    expect(service.withdrawConsent).toHaveBeenCalledTimes(
      mockConsentTemplates.length
    );
  });

  describe('isConsentWithdrawn', () => {
    it('should return true if the consent is withdrawn', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
      };
      expect(service.isConsentWithdrawn(anonymousConsent)).toEqual(true);
    });
    it('should return false if the consent is given', () => {
      const anonymousConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
      };
      expect(service.isConsentWithdrawn(anonymousConsent)).toEqual(false);
    });
  });

  describe('isBannerVisible', () => {
    describe('when user is anonymous', () => {
      it('should return true if isBannerDismissed() returns false', async () => {
        vi.spyOn(service, 'isBannerDismissed').mockReturnValue(of(false));
        vi.spyOn(service, 'getTemplatesUpdated').mockReturnValue(of(false));

        const result = await firstValueFrom(service.isBannerVisible());

        expect(service.isBannerDismissed).toHaveBeenCalled();
        expect(service.getTemplatesUpdated).toHaveBeenCalled();
        expect(result).toEqual(true);
      });
      it('should return true if getTemplatesUpdated() returns true', async () => {
        vi.spyOn(service, 'isBannerDismissed').mockReturnValue(of(true));
        vi.spyOn(service, 'getTemplatesUpdated').mockReturnValue(of(true));

        const result = await firstValueFrom(service.isBannerVisible());

        expect(service.isBannerDismissed).toHaveBeenCalled();
        expect(service.getTemplatesUpdated).toHaveBeenCalled();
        expect(result).toEqual(true);
      });

      it('should return false if isBannerDismissed() returns true and getTemplatesUpdated() returns false', async () => {
        vi.spyOn(service, 'isBannerDismissed').mockReturnValue(of(true));
        vi.spyOn(service, 'getTemplatesUpdated').mockReturnValue(of(false));

        const result = await firstValueFrom(service.isBannerVisible());

        expect(service.isBannerDismissed).toHaveBeenCalled();
        expect(service.getTemplatesUpdated).toHaveBeenCalled();
        expect(result).toEqual(false);
      });
    });

    describe('when user is logged in', () => {
      it('should return false without checking banner state or consent templates', async () => {
        vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
        vi.spyOn(service, 'isBannerDismissed');
        vi.spyOn(service, 'getTemplatesUpdated');

        const result = await firstValueFrom(service.isBannerVisible());

        expect(result).toEqual(false);
        expect(service.isBannerDismissed).not.toHaveBeenCalled();
        expect(service.getTemplatesUpdated).not.toHaveBeenCalled();
      });

      it('should switch to false when user logs in mid-session', () => {
        const isLoggedIn$ = new BehaviorSubject<boolean>(false);
        vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(isLoggedIn$);
        vi.spyOn(service, 'isBannerDismissed').mockReturnValue(of(false));
        vi.spyOn(service, 'getTemplatesUpdated').mockReturnValue(of(false));

        const results: boolean[] = [];
        const sub = service
          .isBannerVisible()
          .subscribe((value) => results.push(value));

        expect(results).toEqual([true]);

        isLoggedIn$.next(true);
        expect(results).toEqual([true, false]);

        sub.unsubscribe();
      });
    });
  });

  describe('toggleBannerDismissed', () => {
    it('should just dispatch ToggleAnonymousConsentsBannerDissmissed action when dismissing', () => {
      service.toggleBannerDismissed(false);
      expect(store.dispatch).toHaveBeenCalledWith(
        new AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed(
          false
        )
      );
    });
    it('should dispatch ToggleAnonymousConsentsBannerDissmissed action and call toggleTemplatesUpdated(false) when showing', () => {
      vi.spyOn(service, 'toggleTemplatesUpdated').mockImplementation(() => {});
      service.toggleBannerDismissed(true);
      expect(store.dispatch).toHaveBeenCalledWith(
        new AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed(
          true
        )
      );
      expect(service.toggleTemplatesUpdated).toHaveBeenCalledWith(false);
    });
  });

  it('isBannerDismissed should call getAnonymousConsentsBannerDismissed selector', async () => {
    store.dispatch(
      new AnonymousConsentsActions.ToggleAnonymousConsentsBannerDissmissed(
        false
      )
    );

    const result = await firstValueFrom(service.isBannerDismissed());
    expect(result).toEqual(false);
  });

  describe('getTemplatesUpdated', () => {
    it('should call getAnonymousConsentTemplatesUpdate selector and getTemplates(true)', async () => {
      vi.spyOn(service, 'getTemplates').mockReturnValue(of([]));
      store.dispatch(
        new AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated(
          false
        )
      );

      const result = await firstValueFrom(service.getTemplatesUpdated());
      expect(result).toEqual(false);
      expect(service.getTemplates).toHaveBeenCalledWith(true);
    });
  });

  it('toggleTemplatesUpdated should dispatch AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated', () => {
    service.toggleTemplatesUpdated(false);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AnonymousConsentsActions.ToggleAnonymousConsentTemplatesUpdated(false)
    );
  });

  describe('detectUpdatedTemplates', () => {
    it('should return true when the lengths do not match', () => {
      expect(service.detectUpdatedTemplates(mockConsentTemplates, [])).toEqual(
        true
      );
    });
    it('should return true when a version was updated', () => {
      const updatedMockConsentTemplates: ConsentTemplate[] = [
        { ...mockConsentTemplates[0], version: 1 },
        mockConsentTemplates[1],
      ];
      expect(
        service.detectUpdatedTemplates(
          mockConsentTemplates,
          updatedMockConsentTemplates
        )
      ).toEqual(true);
    });
    it('should return false when the versions did not not update', () => {
      expect(
        service.detectUpdatedTemplates(
          mockConsentTemplates,
          mockConsentTemplates
        )
      ).toEqual(false);
    });
  });

  describe('serializeAndEncode', () => {
    it('should return an empty string if a falsy parameter is passed', () => {
      expect(service.serializeAndEncode(null)).toEqual('');
    });
    it('should return stringify and encode the provided consents', () => {
      const result = service.serializeAndEncode(mockAnonymousConsents);
      expect(result).toEqual(
        encodeURIComponent(JSON.stringify(mockAnonymousConsents))
      );
    });
  });

  describe('decodeAndDeserialize', () => {
    it('should decode and unserialize the provided value', () => {
      const mockRawConsents = encodeURIComponent(
        JSON.stringify(mockAnonymousConsents)
      );

      const result = service.decodeAndDeserialize(mockRawConsents);
      expect(result).toEqual(mockAnonymousConsents);
    });
  });

  describe('consentsUpdated', () => {
    it('should return true when the newConsents are different from previousConsents', () => {
      const newConsents: AnonymousConsent[] = [
        {
          consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
          templateCode: 'a',
          templateVersion: 0,
        },
      ];
      const previousConsents: AnonymousConsent[] = [
        {
          consentState: null,
          templateCode: 'b',
          templateVersion: 1,
        },
      ];

      const result = service.consentsUpdated(newConsents, previousConsents);
      expect(result).toEqual(true);
    });
    it('should return false when the newConsents are the same as previousConsents', () => {
      const newConsents: AnonymousConsent[] = [
        {
          consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
          templateCode: 'a',
          templateVersion: 0,
        },
      ];
      const previousConsents: AnonymousConsent[] = [...newConsents];

      const result = service.consentsUpdated(newConsents, previousConsents);
      expect(result).toEqual(false);
    });
  });
});
