import { PLATFORM_ID, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Event as NgRouterEvent,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import {
  BaseSiteService,
  Cart,
  CartService,
  ConsentService,
  OrderEntry,
} from '@spartacus/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CdsConfig } from '../../config/index';
import { ConsentChangedPushEvent, NavigatedPushEvent } from '../model';
import { ProfileTagInjector } from './profile-tag.injector';
import { ProfileTagEventTracker } from './profiletag-events';
import { SpartacusEventTracker } from './spartacus-events';
const mockCDSConfig: CdsConfig = {
  cds: {
    consentTemplateId: 'PROFILE',
    tenant: 'ArgoTest',
    baseUrl: 'example.com',
    endpoints: {
      strategyProducts: 'example',
    },
    profileTag: {
      javascriptUrl: 'https://tag.static.eu.context.cloud.sap',
      configUrl: 'https://tag.static.us.context.cloud.sap',
      allowInsecureCookies: false,
      gtmId: 'test-id-1234567',
    },
  },
};

describe('ProfileTagInjector', () => {
  let profileTagInjector: ProfileTagInjector;
  let profileTagEventTracker: ProfileTagEventTracker;
  let spartacusEventTracker;
  let getActiveBehavior;
  let baseSiteService;
  let getConsentBehavior;
  let isConsentGivenValue;
  let routerEventsBehavior;
  let router;
  let consentsService;
  let cartService;
  let orderEntryBehavior;
  let cartBehavior;

  function setVariables() {
    getActiveBehavior = new BehaviorSubject<string>('');
    getConsentBehavior = new BehaviorSubject<Object>([{}]);
    isConsentGivenValue = true;
    routerEventsBehavior = new BehaviorSubject<NgRouterEvent>(
      new NavigationStart(0, 'test.com', 'popstate')
    );
    orderEntryBehavior = new ReplaySubject<OrderEntry[]>();
    cartBehavior = new ReplaySubject<Cart>();
    consentsService = {
      getConsent: () => getConsentBehavior,
      isConsentGiven: () => isConsentGivenValue,
    };
    router = {
      events: routerEventsBehavior,
    };
    baseSiteService = {
      getActive: () => getActiveBehavior,
    };
    cartService = {
      getEntries: () => orderEntryBehavior,
      getActive: () => cartBehavior,
    };
  }
  beforeEach(() => {
    setVariables();
    TestBed.configureTestingModule({
      providers: [
        { provide: CdsConfig, useValue: mockCDSConfig },
        { provide: BaseSiteService, useValue: baseSiteService },
        { provide: Router, useValue: router },
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: ConsentService,
          useValue: consentsService,
        },
        {
          provide: CartService,
          useValue: cartService,
        },
      ],
    });
    profileTagInjector = TestBed.get(ProfileTagInjector as Type<
      ProfileTagInjector
    >);

    profileTagEventTracker = TestBed.get(ProfileTagEventTracker as Type<
      ProfileTagEventTracker
    >);
    profileTagEventTracker.notifyProfileTagOfEventOccurence = jasmine.createSpy(
      'notifyProfileTagOfEventOccurence'
    );

    spartacusEventTracker = new SpartacusEventTracker(
      cartService,
      consentsService,
      router,
      mockCDSConfig
    );
    spartacusEventTracker.consentGranted = jasmine.createSpy('consentGranted');
  });

  it('Should be created', () => {
    expect(profileTagInjector).toBeTruthy();
    expect(profileTagEventTracker).toBeTruthy();
    expect(spartacusEventTracker).toBeTruthy();
  });

  it('Should notify profile tag of consent granted', () => {
    let timesCalled = 0;

    const subscription = profileTagInjector
      .notifyProfileTagOfConsentGranted()
      .pipe(tap(_ => timesCalled++))
      .subscribe();

    isConsentGivenValue = false;
    getConsentBehavior.next({ consent: 'test' });
    isConsentGivenValue = true;

    subscription.unsubscribe();

    expect(timesCalled).toEqual(1);
    expect(
      profileTagEventTracker.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalled();

    expect(
      profileTagEventTracker.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(new ConsentChangedPushEvent(true));
  });

  it('Should notify profile tag of cart change', () => {
    let timesCalled = 0;

    const subscription = profileTagInjector
      .notifyProfileTagOfCartChange()
      .pipe(tap(_ => timesCalled++))
      .subscribe();

    const cartEntry: OrderEntry[] = [{ entryNumber: 7 }];
    const testCart = { testCart: { id: 123 } };
    cartBehavior.next(testCart);
    orderEntryBehavior.next(cartEntry);

    subscription.unsubscribe();

    expect(timesCalled).toEqual(1);
    expect(
      profileTagEventTracker.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalled();

    //expect(
    //  profileTagEventTracker.notifyProfileTagOfEventOccurence
    //).toHaveBeenCalledWith(new CartChangedPushEvent({ cartEntry, testCart }));
  });

  it('Should notify profile tag of page loaded', () => {
    let timesCalled = 0;

    const subscription = profileTagInjector
      .notifyProfileTagOfPageLoaded()
      .pipe(tap(_ => timesCalled++))
      .subscribe();

    routerEventsBehavior.next(new NavigationEnd(0, 'test1', 'test2'));

    subscription.unsubscribe();

    expect(timesCalled).toEqual(1);
    expect(
      profileTagEventTracker.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalled();
    expect(
      profileTagEventTracker.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(new NavigatedPushEvent());
  });
});
