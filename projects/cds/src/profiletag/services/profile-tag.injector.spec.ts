import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Event as NgRouterEvent,
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
import { CdsConfig } from '../../config/index';
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
    getActiveBehavior = new BehaviorSubject<String>('');
    getConsentBehavior = new BehaviorSubject<Object>([{}]);
    isConsentGivenValue = false;
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
        ProfileTagInjector,
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

    profileTagInjector = TestBed.get(ProfileTagInjector);
  });

  it('should be created', () => {
    expect(profileTagInjector).toBeTruthy();
  });
});
