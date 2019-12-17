import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Cart, OrderEntry } from '@spartacus/core';
import { of, ReplaySubject, Subject } from 'rxjs';
import {
  CartChangedPushEvent,
  ConsentChangedPushEvent,
  NavigatedPushEvent,
} from '../model';
import { ProfileTagInjector } from './profile-tag.injector';
import { ProfileTagEventTracker } from './profiletag-events';
import { SpartacusEventTracker } from './spartacus-events';

describe('ProfileTagInjector', () => {
  let profileTagInjector: ProfileTagInjector;
  let siteBehavior: Subject<string>;
  let profileTagEventTrackerMock: ProfileTagEventTracker;
  let cartBehavior: Subject<{ entries: OrderEntry[]; cart: Cart }>;
  let consentBehavior: Subject<boolean>;
  let navigatedBehavior: Subject<boolean>;
  let spartacusEventTrackerMock: SpartacusEventTracker;
  function setVariables() {
    cartBehavior = new ReplaySubject<{ entries: OrderEntry[]; cart: Cart }>();
    consentBehavior = new ReplaySubject<boolean>();
    navigatedBehavior = new ReplaySubject<boolean>();
    siteBehavior = new ReplaySubject<string>();
    spartacusEventTrackerMock = <SpartacusEventTracker>(<unknown>{
      consentGranted: jasmine
        .createSpy('consentGranted')
        .and.callFake(_ => consentBehavior),
      navigated: jasmine
        .createSpy('navigated')
        .and.callFake(_ => navigatedBehavior),
      cartChanged: jasmine
        .createSpy('cartChanged')
        .and.callFake(_ => cartBehavior),
    });
    profileTagEventTrackerMock = <ProfileTagEventTracker>(<unknown>{
      addTracker: jasmine
        .createSpy('addTracker')
        .and.callFake(_ => siteBehavior),
      notifyProfileTagOfEventOccurence: jasmine.createSpy(
        'notifyProfileTagOfEventOccurence'
      ),
      getProfileTagEvents: jasmine
        .createSpy('getProfileTagEvents')
        .and.callFake(_ => of()),
    });
  }
  beforeEach(() => {
    setVariables();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProfileTagEventTracker,
          useValue: profileTagEventTrackerMock,
        },
        {
          provide: SpartacusEventTracker,
          useValue: spartacusEventTrackerMock,
        },
      ],
    });
    profileTagInjector = TestBed.get(ProfileTagInjector as Type<
      ProfileTagInjector
    >);
  });

  it('Should be created', () => {
    expect(profileTagInjector).toBeTruthy();
    expect(spartacusEventTrackerMock).toBeTruthy();
  });

  it('Should notify profile tag of consent granted', () => {
    const subscription = profileTagInjector.track().subscribe();
    siteBehavior.next('test');
    consentBehavior.next(true);

    subscription.unsubscribe();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledTimes(1);

    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(new ConsentChangedPushEvent(true));
  });

  it('Should notify profile tag of cart change', () => {
    const subscription = profileTagInjector.track().subscribe();
    const cartEntry: OrderEntry[] = [{ entryNumber: 7 }];
    const testCart = <Cart>{ testCart: { id: 123 } };
    siteBehavior.next('test');
    cartBehavior.next({ entries: cartEntry, cart: testCart });

    subscription.unsubscribe();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalled();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(
      new CartChangedPushEvent({ entries: cartEntry, cart: testCart })
    );
  });

  it('Should notify profile tag of page loaded', () => {
    const subscription = profileTagInjector.track().subscribe();
    siteBehavior.next('test');
    navigatedBehavior.next(true);
    subscription.unsubscribe();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalled();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(new NavigatedPushEvent());
  });
});
