import { TestBed } from '@angular/core/testing';
import {
  Event as NgRouterEvent,
  NavigationStart,
  Router,
} from '@angular/router';
import { Action, ActionsSubject } from '@ngrx/store';
import {
  ActiveCartService,
  AuthActions,
  Cart,
  ConsentService,
} from '@spartacus/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CdsConfig } from '../../config';
import { ProfileTagLifecycleService } from './profile-tag-lifecycle.service';

describe('profileTagLifecycleService', () => {
  let profileTagLifecycleService: ProfileTagLifecycleService;
  let getConsentBehavior;
  let isConsentGivenValue;
  let routerEventsBehavior;
  let router;
  let consentsService;
  let activeCartService;
  let cartBehavior;
  let mockActionsSubject: ReplaySubject<Action>;

  const mockCDSConfig: CdsConfig = {
    cds: {
      consentTemplateId: 'PROFILE',
    },
  };
  function setVariables() {
    getConsentBehavior = new BehaviorSubject<Object>(null);
    isConsentGivenValue = false;
    routerEventsBehavior = new BehaviorSubject<NgRouterEvent>(
      new NavigationStart(0, 'test.com', 'popstate')
    );
    cartBehavior = new ReplaySubject<Cart>();
    mockActionsSubject = new ReplaySubject<Action>();
    consentsService = {
      getConsent: () => getConsentBehavior,
      isConsentGiven: () => isConsentGivenValue,
    };
    router = {
      events: routerEventsBehavior,
    };
    activeCartService = {
      getActive: () => cartBehavior,
    };
  }
  beforeEach(() => {
    setVariables();
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        {
          provide: ConsentService,
          useValue: consentsService,
        },
        {
          provide: ActiveCartService,
          useValue: activeCartService,
        },
        {
          provide: CdsConfig,
          useValue: mockCDSConfig,
        },
        {
          provide: ActionsSubject,
          useValue: mockActionsSubject,
        },
      ],
    });
    profileTagLifecycleService = TestBed.inject(ProfileTagLifecycleService);
  });

  it('should be created', () => {
    expect(profileTagLifecycleService).toBeTruthy();
  });
  describe('Consent', () => {
    it(`Should emit an event if the profile consent changes to true,`, () => {
      let timesCalled = 0;
      const subscription = profileTagLifecycleService
        .consentChanged()
        .pipe(tap(() => timesCalled++))
        .subscribe();
      isConsentGivenValue = true;
      getConsentBehavior.next({ consent: 'test' });
      subscription.unsubscribe();
      expect(timesCalled).toEqual(1);
    });
    it(`Should emit an event if the profile consent changes to false,`, () => {
      let timesCalled = 0;
      const subscription = profileTagLifecycleService
        .consentChanged()
        .pipe(
          filter((event) => Boolean(!event.data.granted)),
          tap(() => timesCalled++)
        )
        .subscribe();
      isConsentGivenValue = false;
      getConsentBehavior.next({ consent: 'test' });
      subscription.unsubscribe();
      expect(timesCalled).toEqual(1);
    });
  });

  it(`Should call the push method first time a login is successful`, () => {
    let timesCalled = 0;
    const subscription = profileTagLifecycleService
      .loginSuccessful()
      .pipe(tap((_) => timesCalled++))
      .subscribe();
    mockActionsSubject.next({ type: AuthActions.LOGOUT });
    mockActionsSubject.next({ type: AuthActions.LOGIN });
    mockActionsSubject.next({ type: AuthActions.LOGOUT });
    mockActionsSubject.next({ type: AuthActions.LOGOUT });
    mockActionsSubject.next({ type: AuthActions.LOGIN });
    mockActionsSubject.next({ type: AuthActions.LOGOUT });
    subscription.unsubscribe();
    expect(timesCalled).toEqual(2);
  });
});
