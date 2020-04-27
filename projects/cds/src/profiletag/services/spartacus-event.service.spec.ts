import { TestBed } from '@angular/core/testing';
import {
  Event as NgRouterEvent,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import {
  ActiveCartService,
  Cart,
  ConsentService,
  OrderEntry,
} from '@spartacus/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CdsConfig } from '../../config';
import { SpartacusEventService } from './spartacus-event.service';

describe('SpartacusEventTracker', () => {
  let spartacusEventTracker: SpartacusEventService;
  let getConsentBehavior;
  let isConsentGivenValue;
  let routerEventsBehavior;
  let router;
  let consentsService;
  let activeCartService;
  let cartBehavior;
  const mockCDSConfig: CdsConfig = {
    cds: {
      consentTemplateId: 'PROFILE',
    },
  };
  function setVariables() {
    getConsentBehavior = new BehaviorSubject<Object>([{}]);
    isConsentGivenValue = false;
    routerEventsBehavior = new BehaviorSubject<NgRouterEvent>(
      new NavigationStart(0, 'test.com', 'popstate')
    );
    cartBehavior = new ReplaySubject<Cart>();
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
      ],
    });
    spartacusEventTracker = TestBed.inject(SpartacusEventService);
  });

  it('should be created', () => {
    expect(spartacusEventTracker).toBeTruthy();
  });

  it(`Should call the push method if the profile consent changes to true,
  and ignore all further changes, only sending one consent changed event,`, () => {
    let timesCalled = 0;
    const subscription = spartacusEventTracker
      .consentGranted()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    isConsentGivenValue = false;
    getConsentBehavior.next({ consent: 'test' });
    getConsentBehavior.next({ consent: 'test' });
    getConsentBehavior.next({ consent: 'test' });
    isConsentGivenValue = true;
    getConsentBehavior.next({ consent: 'test' });
    getConsentBehavior.next({ consent: 'test' });
    getConsentBehavior.next({ consent: 'test' });
    isConsentGivenValue = true;
    getConsentBehavior.next({ consent: 'test' });
    subscription.unsubscribe();
    expect(timesCalled).toEqual(1);
  });

  it(`Should call the push method for every NavigationEnd event,
    regardless of consent status, and even if the consent pipe ends due to take(1)`, () => {
    let timesCalled = 0;
    const subscription = spartacusEventTracker
      .navigated()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    getConsentBehavior.next({ consent: 'test' });
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'));
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test'));
    routerEventsBehavior.next(new NavigationStart(0, 'test', 'hashchange'));
    routerEventsBehavior.next(new NavigationStart(0, 'test', 'hashchange'));
    routerEventsBehavior.next(new NavigationStart(0, 'test', 'hashchange'));
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test2'));
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test3'));
    routerEventsBehavior.next(new NavigationEnd(0, 'test', 'test1'));
    subscription.unsubscribe();
    expect(timesCalled).toEqual(5);
  });

  it(`Should call the cartChanged method for every CartSnapshot event`, () => {
    let timesCalled = 0;
    const subscription = spartacusEventTracker
      .cartChanged()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    const mockOrderEntry: OrderEntry[] = [{ entryNumber: 7 }];
    const mockOrderEntries: OrderEntry[] = [
      { entryNumber: 7 },
      { entryNumber: 1 },
    ];
    const testCart = { id: 123, entries: mockOrderEntry };
    const testCartWithAdditionalOrderEntry = {
      id: 123,
      entries: mockOrderEntries,
    };
    cartBehavior.next(testCart);
    cartBehavior.next(testCartWithAdditionalOrderEntry);
    subscription.unsubscribe();
    expect(timesCalled).toEqual(2);
  });

  it(`Should not call the cartChanged method when the cart is not modified`, () => {
    let timesCalled = 0;
    const subscription = spartacusEventTracker
      .cartChanged()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    subscription.unsubscribe();
    expect(timesCalled).toEqual(0);
  });

  it(`Should not call the cartChanged method even when the entries have an empty array`, () => {
    let timesCalled = 0;
    const subscription = spartacusEventTracker
      .cartChanged()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    cartBehavior.next({ id: 123, entries: [] });
    cartBehavior.next({ id: 13, entries: [] });
    subscription.unsubscribe();
    expect(timesCalled).toEqual(0);
  });

  it(`Should call the cartChanged method every time after a non-empty cart is passed`, () => {
    let timesCalled = 0;
    const subscription = spartacusEventTracker
      .cartChanged()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    const mockOrderEntry: OrderEntry[] = [{ entryNumber: 7 }];
    cartBehavior.next({ id: 123, entries: [] });
    cartBehavior.next({ id: 123, entries: [] });
    cartBehavior.next({ id: 123, entries: [] });
    cartBehavior.next({ id: 123, entries: mockOrderEntry });
    cartBehavior.next({ id: 123, entries: mockOrderEntry });
    cartBehavior.next({ id: 123, entries: [] });
    cartBehavior.next({ id: 123, entries: [] });
    subscription.unsubscribe();
    expect(timesCalled).toEqual(4);
  });
});
