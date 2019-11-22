import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Event as NgRouterEvent,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import {
  AnonymousConsentsService,
  BaseSiteService,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { CdsConfig } from '../../config';
import { ProfileTagWindowObject } from '../model';
import { ProfileTagInjector } from './profile-tag.injector';

const mockCDSConfig: CdsConfig = {
  cds: {
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
  let nativeWindow: ProfileTagWindowObject;
  let getActiveBehavior;
  let baseSiteService;
  let appendChildSpy;
  let getConsentBehavior;
  let isConsentGivenValue;
  let routerEventsBehavior;
  let router;
  let anonymousConsentsService;
  let mockedWindowRef;
  function setVariables() {
    getActiveBehavior = new BehaviorSubject<String>('');
    getConsentBehavior = new BehaviorSubject<Object>([{}]);
    isConsentGivenValue = false;
    appendChildSpy = jasmine.createSpy('appendChildSpy');
    routerEventsBehavior = new BehaviorSubject<NgRouterEvent>(
      new NavigationStart(0, 'test.com', 'popstate')
    );
    anonymousConsentsService = {
      getConsent: () => getConsentBehavior,
      isConsentGiven: () => isConsentGivenValue,
    };
    router = {
      events: routerEventsBehavior,
    };
    mockedWindowRef = {
      nativeWindow: {
        Y_TRACKING: {
          push: jasmine.createSpy('push'),
        },
      },
      document: {
        createElement: () => ({}),
        getElementsByTagName: () => [{ appendChild: appendChildSpy }],
      },
    };
    baseSiteService = {
      getActive: () => getActiveBehavior,
    };
  }
  beforeEach(() => {
    setVariables();
    TestBed.configureTestingModule({
      providers: [
        ProfileTagInjector,
        { provide: CdsConfig, useValue: mockCDSConfig },
        { provide: WindowRef, useValue: mockedWindowRef },
        { provide: BaseSiteService, useValue: baseSiteService },
        { provide: Router, useValue: router },
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: AnonymousConsentsService,
          useValue: anonymousConsentsService,
        },
      ],
    });

    profileTagInjector = TestBed.get(ProfileTagInjector);
    nativeWindow = TestBed.get(WindowRef).nativeWindow;
  });

  it('should be created', () => {
    expect(profileTagInjector).toBeTruthy();
  });

  it('Should first wait for the basesite to be active before adding config parameters to the q array', () => {
    profileTagInjector.track();
    const profileTagLoaded$ = profileTagInjector.track();
    const profileTagLoadedSubcriber = profileTagLoaded$.subscribe();
    profileTagLoadedSubcriber.unsubscribe();

    expect(appendChildSpy).not.toHaveBeenCalled();
    expect(nativeWindow.Y_TRACKING.push).not.toHaveBeenCalled();
    expect(nativeWindow.Y_TRACKING.q).not.toBeDefined();
  });

  it(`Should add config parameters to the q array after the base site is active`, () => {
    const profileTagLoaded$ = profileTagInjector.track();
    const subscription = profileTagLoaded$.subscribe();
    const baseSite = 'electronics-test';
    getActiveBehavior.next(baseSite);
    subscription.unsubscribe();

    expect(nativeWindow.Y_TRACKING.q[0][0]).toEqual({
      ...mockCDSConfig.cds.profileTag,
      tenant: mockCDSConfig.cds.tenant,
      siteId: baseSite,
      spa: true,
      profileTagEventReceiver: jasmine.anything(),
    });
    expect(appendChildSpy).toHaveBeenCalled();
    expect(nativeWindow.Y_TRACKING.push).not.toHaveBeenCalled();
  });

  it(`Should not call the push method if the event receiver callback hasn't been called`, () => {
    const profileTagLoaded$ = profileTagInjector.track();
    const subscription = profileTagLoaded$.subscribe();
    getActiveBehavior.next('electronics-test');
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'));
    getConsentBehavior.next({ consent: 'test' });
    subscription.unsubscribe();

    expect(nativeWindow.Y_TRACKING.push).not.toHaveBeenCalled();
  });

  it(`Should call the push method if the site is active,
     and event receiver callback has been called with loaded`, () => {
    const profileTagLoaded$ = profileTagInjector.track();
    const subscription = profileTagLoaded$.subscribe();
    getActiveBehavior.next('electronics-test');
    nativeWindow.Y_TRACKING.q[0][0].profileTagEventReceiver({
      eventName: 'Loaded',
    });
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'));
    subscription.unsubscribe();

    expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalled();
    expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalledWith({
      event: 'Navigated',
    });
  });
  it(`Should call the push method if the profile consent changes to true,
    and ignore all further changes, only sending one consent changed event,`, () => {
    const profileTagLoaded$ = profileTagInjector.track();
    const subscription = profileTagLoaded$.subscribe();
    getActiveBehavior.next('electronics-test');
    nativeWindow.Y_TRACKING.q[0][0].profileTagEventReceiver({
      eventName: 'Loaded',
    });
    isConsentGivenValue = true;
    getConsentBehavior.next({ consent: 'test' });
    getConsentBehavior.next({ consent: 'test' });
    getConsentBehavior.next({ consent: 'test' });
    isConsentGivenValue = false;
    getConsentBehavior.next({ consent: 'test' });
    getConsentBehavior.next({ consent: 'test' });
    getConsentBehavior.next({ consent: 'test' });
    isConsentGivenValue = true;
    getConsentBehavior.next({ consent: 'test' });
    subscription.unsubscribe();

    expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalledTimes(1);
    expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalledWith({
      event: 'ConsentChanged',
      granted: true,
    });
  });

  it(`Should call the push method for every NavigationEnd event, 
    regardless of consent status, and even if the consent pipe ends due to take(1)`, () => {
    const profileTagLoaded$ = profileTagInjector.track();
    const subscription = profileTagLoaded$.subscribe();
    getActiveBehavior.next('electronics-test');
    nativeWindow.Y_TRACKING.q[0][0].profileTagEventReceiver({
      eventName: 'Loaded',
    });
    isConsentGivenValue = true;
    getConsentBehavior.next({ consent: 'test' });
    isConsentGivenValue = false;
    getConsentBehavior.next({ consent: 'test' });
    isConsentGivenValue = true;
    getConsentBehavior.next({ consent: 'test' });
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'));
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'));
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test2'));
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test3'));
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test1'));
    subscription.unsubscribe();
    expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalledTimes(6);
    expect(nativeWindow.Y_TRACKING.push).toHaveBeenCalledWith({
      event: 'Navigated',
    });
  });
});
