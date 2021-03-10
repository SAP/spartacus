import { TestBed } from '@angular/core/testing';
import { ReplaySubject, Subject } from 'rxjs';
import {
  ConsentChangedPushEvent,
  HomePageViewPushEvent,
  NavigatedPushEvent,
  ProfileTagPushEvent,
} from '../model/profile-tag.model';
import { ProfileTagLifecycleService } from '../services/profile-tag-lifecycle.service';
import { ProfileTagPushEventsService } from '../services/profile-tag-push-events.service';
import { ProfileTagEventService } from '../services/profiletag-event.service';
import { TrackingService } from './tracking.service';

describe('TrackingService', () => {
  let postBehaviour: Subject<boolean>;
  let trackingService: TrackingService;
  let profileTagEventTrackerMock: ProfileTagEventService;
  let consentBehavior: Subject<ConsentChangedPushEvent>;
  let profileTagPushEventsServiceMock: ProfileTagPushEventsService;
  let profileTagLifecycleServiceMock: ProfileTagLifecycleService;
  let pushEvents: Subject<ProfileTagPushEvent>;
  function setVariables() {
    consentBehavior = new ReplaySubject<ConsentChangedPushEvent>();
    postBehaviour = new ReplaySubject<boolean>();
    pushEvents = new ReplaySubject<ProfileTagPushEvent>();
    profileTagLifecycleServiceMock = <ProfileTagLifecycleService>(<unknown>{
      consentChanged: jasmine
        .createSpy('consentChanged')
        .and.callFake(() => consentBehavior),
      loginSuccessful: jasmine
        .createSpy('loginSuccessful')
        .and.callFake((_) => postBehaviour),
    });
    profileTagPushEventsServiceMock = <ProfileTagPushEventsService>(<unknown>{
      getPushEvents: jasmine
        .createSpy('getPushEvents')
        .and.callFake((_) => pushEvents),
    });
    profileTagEventTrackerMock = <ProfileTagEventService>(<unknown>{
      notifyProfileTagOfEventOccurence: jasmine.createSpy(
        'notifyProfileTagOfEventOccurence'
      ),
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
          provide: ProfileTagLifecycleService,
          useValue: profileTagLifecycleServiceMock,
        },
      ],
    });
    trackingService = TestBed.inject(TrackingService);
  });

  it('Should be created', () => {
    expect(trackingService).toBeTruthy();
    expect(profileTagPushEventsServiceMock).toBeTruthy();
  });

  it('Should notify profile tag of consent granted', () => {
    trackingService.trackEvents();
    consentBehavior.next(new ConsentChangedPushEvent(true));
    consentBehavior.next(new ConsentChangedPushEvent(false));
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledTimes(2);

    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(new ConsentChangedPushEvent(true));
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(new ConsentChangedPushEvent(false));
  });

  it('Should notify profile tag of when push events happen', () => {
    trackingService.trackEvents();
    consentBehavior.next(new ConsentChangedPushEvent(true));
    const testEvent = new HomePageViewPushEvent();
    pushEvents.next(testEvent);
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalled();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(testEvent);
  });

  it('Should notify profile tag of page loaded', () => {
    trackingService.trackEvents();
    consentBehavior.next(new ConsentChangedPushEvent(true));
    pushEvents.next(new NavigatedPushEvent('test'));
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalled();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(new NavigatedPushEvent('test'));
  });
});
