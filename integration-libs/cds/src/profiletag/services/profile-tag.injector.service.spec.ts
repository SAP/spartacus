import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Cart } from '@spartacus/cart/base/root';
import { BehaviorSubject, EMPTY, ReplaySubject, Subject } from 'rxjs';
import { CdsBackendConnector } from '../connectors/cds-backend-connector';
import {
  ConsentChangedPushEvent,
  ProfileTagPushEvent,
} from '../model/profile-tag.model';
import { ProfileTagLifecycleService } from './profile-tag-lifecycle.service';
import { ProfileTagPushEventsService } from './profile-tag-push-events.service';
import { ProfileTagInjectorService } from './profile-tag.injector.service';
import { ProfileTagEventService } from './profiletag-event.service';

describe('ProfileTagInjector', () => {
  let postBehavior: Subject<boolean>;
  let profileTagInjector: ProfileTagInjectorService;
  let addTrackerBehavior: Subject<Event>;
  let profileTagEventTrackerMock: ProfileTagEventService;
  let cartBehavior: Subject<{ cart: Cart }>;
  let consentBehavior: Subject<ConsentChangedPushEvent>;
  let navigatedBehavior: Subject<boolean>;
  let profileTagPushEventsServiceMock: ProfileTagPushEventsService;
  let profileTagLifecycleServiceMock: ProfileTagLifecycleService;
  let cdsBackendConnectorMock: CdsBackendConnector;
  let pushEvents: Subject<ProfileTagPushEvent>;
  function setVariables() {
    cartBehavior = new ReplaySubject<{ cart: Cart }>();
    consentBehavior = new ReplaySubject<ConsentChangedPushEvent>();
    navigatedBehavior = new ReplaySubject<boolean>();
    addTrackerBehavior = new ReplaySubject<Event>();
    postBehavior = new ReplaySubject<boolean>();
    pushEvents = new ReplaySubject<ProfileTagPushEvent>();
    cdsBackendConnectorMock = <CdsBackendConnector>(<any>{
      notifySuccessfulLogin: vi.fn().mockReturnValue(new BehaviorSubject(true)),
    });
    profileTagLifecycleServiceMock = <ProfileTagLifecycleService>(<unknown>{
      consentGranted: vi.fn().mockImplementation(() => consentBehavior),
      navigated: vi.fn().mockImplementation(() => navigatedBehavior),
      loginSuccessful: vi.fn().mockImplementation((_) => postBehavior),
    });
    profileTagPushEventsServiceMock = <ProfileTagPushEventsService>(<unknown>{
      cartChanged: vi.fn().mockImplementation((_) => cartBehavior),
      getPushEvents: vi.fn().mockImplementation((_) => pushEvents),
    });
    profileTagEventTrackerMock = <ProfileTagEventService>(<unknown>{
      addTracker: vi.fn().mockImplementation(() => addTrackerBehavior),
      notifyProfileTagOfEventOccurrence: vi.fn(),
      getProfileTagEvents: vi.fn().mockImplementation(() => EMPTY),
    });
  }
  beforeEach(() => {
    setVariables();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProfileTagEventService,
          useValue: profileTagEventTrackerMock,
        },
        {
          provide: ProfileTagPushEventsService,
          useValue: profileTagPushEventsServiceMock,
        },
        {
          provide: CdsBackendConnector,
          useValue: cdsBackendConnectorMock,
        },
        {
          provide: ProfileTagLifecycleService,
          useValue: profileTagLifecycleServiceMock,
        },
      ],
    });
    profileTagInjector = TestBed.inject(ProfileTagInjectorService);
  });

  it('Should be created', () => {
    expect(profileTagInjector).toBeTruthy();
    expect(profileTagPushEventsServiceMock).toBeTruthy();
  });

  it('Should notify profile tag of successful login', () => {
    const subscription = profileTagInjector.track().subscribe();
    addTrackerBehavior.next(new CustomEvent('test'));
    postBehavior.next(true);
    subscription.unsubscribe();
    expect(cdsBackendConnectorMock.notifySuccessfulLogin).toHaveBeenCalled();
  });
});
