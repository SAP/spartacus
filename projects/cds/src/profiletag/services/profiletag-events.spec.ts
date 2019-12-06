import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Event as NgRouterEvent,
  NavigationEnd,
  NavigationStart,
} from '@angular/router';
import { BaseSiteService, WindowRef } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CdsConfig } from '../../config/index';
import {
  ConsentReferenceEvent,
  DebugEvent,
  ProfileTagEventNames,
  ProfileTagWindowObject,
} from '../model/index';
import { ProfileTagEventTracker } from './profiletag-events';

const mockCDSConfig: CdsConfig = {
  cds: {
    tenant: 'ArgoTest',
    baseUrl: 'example.com',
    endpoints: {
      strategyProducts: 'example',
    },
    profileTag: {
      javascriptUrl: 'https:tag.static.eu.context.cloud.sap',
      configUrl: 'https:tag.static.us.context.cloud.sap',
      allowInsecureCookies: false,
      gtmId: 'test-id-1234567',
    },
  },
};

describe('ProfileTagEventTracker', () => {
  let profileTagEventTracker: ProfileTagEventTracker;
  let nativeWindow: ProfileTagWindowObject;
  let getActiveBehavior;
  let baseSiteService;
  let appendChildSpy;
  let eventListener;
  let mockedWindowRef;
  let getConsentBehavior;
  let routerEventsBehavior;
  let router;

  function setVariables() {
    getActiveBehavior = new BehaviorSubject<String>('');
    appendChildSpy = jasmine.createSpy('appendChildSpy');
    getConsentBehavior = new BehaviorSubject<Object>([{}]);
    routerEventsBehavior = new BehaviorSubject<NgRouterEvent>(
      new NavigationStart(0, 'test.com', 'popstate')
    );
    mockedWindowRef = {
      nativeWindow: {
        addEventListener: (_, listener) => {
          eventListener = listener;
        },
        removeEventListener: jasmine.createSpy('removeEventListener'),
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
    router = {
      events: routerEventsBehavior,
    };
  }
  beforeEach(() => {
    setVariables();
    TestBed.configureTestingModule({
      providers: [
        { provide: CdsConfig, useValue: mockCDSConfig },
        { provide: WindowRef, useValue: mockedWindowRef },
        { provide: BaseSiteService, useValue: baseSiteService },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: router, useValue: router },
      ],
    });
    profileTagEventTracker = TestBed.get(ProfileTagEventTracker);
    nativeWindow = TestBed.get(WindowRef).nativeWindow;
  });

  it('should be created', () => {
    expect(profileTagEventTracker).toBeTruthy();
  });

  it('Should first wait for the basesite to be active before adding config parameters to the q array', () => {
    expect(appendChildSpy).not.toHaveBeenCalled();
    expect(nativeWindow.Y_TRACKING.push).not.toHaveBeenCalled();
    expect(nativeWindow.Y_TRACKING.q).not.toBeDefined();
  });

  it(`Should add config parameters to the q array after the base site is active`, () => {
    const profileTagLoaded$ = profileTagEventTracker.addTracker();
    const subscription = profileTagLoaded$.subscribe();
    const baseSite = 'electronics-test';
    getActiveBehavior.next(baseSite);
    subscription.unsubscribe();

    expect(nativeWindow.Y_TRACKING.q[0][0]).toEqual({
      ...mockCDSConfig.cds.profileTag,
      tenant: mockCDSConfig.cds.tenant,
      siteId: baseSite,
      spa: true,
    });
    expect(appendChildSpy).toHaveBeenCalled();
    expect(nativeWindow.Y_TRACKING.push).not.toHaveBeenCalled();
  });

  it(`Should not call the push method if the event receiver callback hasn't been called`, () => {
    const profileTagLoaded$ = profileTagEventTracker.addTracker();
    const subscription = profileTagLoaded$.subscribe();
    getActiveBehavior.next('electronics-test');
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'));
    getConsentBehavior.next({ consent: 'test' });
    subscription.unsubscribe();

    expect(nativeWindow.Y_TRACKING.push).not.toHaveBeenCalled();
  });

  it(`Should call the pageLoaded method if the site is active,
        and event receiver callback has been called with loaded`, () => {
    let timesCalled = 0;
    const subscription = profileTagEventTracker
      .profileTagLoaded()
      .pipe(tap(_ => timesCalled++))
      .subscribe();
    getActiveBehavior.next('electronics-test');
    eventListener(new CustomEvent(ProfileTagEventNames.LOADED));
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'));
    subscription.unsubscribe();

    expect(timesCalled).toEqual(1);
  });

  it(`Should call the debugChanged method when profileTagDebug value changes`, () => {
    let timesCalled = 0;
    const subscription = profileTagEventTracker
      .debugModeChanged()
      .pipe(tap(_ => timesCalled++))
      .subscribe();

    const debugEvent = <DebugEvent>(
      new CustomEvent(ProfileTagEventNames.DEBUG_FLAG_CHANGED, {
        detail: { debug: true },
      })
    );
    eventListener(debugEvent);
    subscription.unsubscribe();

    expect(timesCalled).toEqual(1);
  });

  it(`Should call the consentReferenceChanged method when consentReference value changes`, () => {
    let timesCalled = 0;
    const subscription = profileTagEventTracker
      .consentReferenceChanged()
      .pipe(tap(_ => timesCalled++))
      .subscribe();

    let consentReferenceChangedEvent = <ConsentReferenceEvent>(
      new CustomEvent(ProfileTagEventNames.CONSENT_REFERENCE_CHANGED, {
        detail: { consentReference: 'some_id' },
      })
    );
    eventListener(consentReferenceChangedEvent);

    consentReferenceChangedEvent = <ConsentReferenceEvent>(
      new CustomEvent(ProfileTagEventNames.CONSENT_REFERENCE_CHANGED, {
        detail: { consentReference: 'another_id' },
      })
    );
    eventListener(consentReferenceChangedEvent);
    subscription.unsubscribe();

    expect(timesCalled).toEqual(2);
  });
});
