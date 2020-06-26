import { TestBed } from '@angular/core/testing';
import {
  ActiveCartService,
  Cart,
  EventService,
  OrderEntry,
  PersonalizationContext,
  PersonalizationContextService,
} from '@spartacus/core';
import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProfileTagPushEventsService } from './profile-tag-push-events.service';

fdescribe('profileTagPushEventsService', () => {
  let profileTagPushEventsService: ProfileTagPushEventsService;
  let cartBehavior: ReplaySubject<Cart>;
  let activeCartService;
  let eventService;
  let eventServiceEvents: ReplaySubject<any>;
  let personalizationContextService;
  let getPersonalizationContext;
  function setVariables() {
    cartBehavior = new ReplaySubject<Cart>();
    eventServiceEvents = new ReplaySubject<any>();
    getPersonalizationContext = new ReplaySubject<PersonalizationContext>();
    eventService = {
      get: () => eventServiceEvents,
    };
    activeCartService = {
      getActive: () => cartBehavior,
    };
    personalizationContextService = {
      getPersonalizationContext: () => getPersonalizationContext,
    };
  }
  beforeEach(() => {
    setVariables();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActiveCartService,
          useValue: activeCartService,
        },
        {
          provide: EventService,
          useValue: eventService,
        },
        {
          provide: PersonalizationContextService,
          useValue: personalizationContextService,
        },
      ],
    });
    profileTagPushEventsService = TestBed.inject(ProfileTagPushEventsService);
  });

  it('should be created', () => {
    expect(profileTagPushEventsService).toBeTruthy();
  });

  it(`Should call the cartChanged method for every CartSnapshot event`, () => {
    let timesCalled = 0;
    const subscription = profileTagPushEventsService
      .getPushEvents()
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
    const subscription = profileTagPushEventsService
      .getPushEvents()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    subscription.unsubscribe();
    expect(timesCalled).toEqual(0);
  });

  it(`Should not call the cartChanged method even when the entries have an empty array`, () => {
    let timesCalled = 0;
    const subscription = profileTagPushEventsService
      .getPushEvents()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    cartBehavior.next({ entries: [] });
    cartBehavior.next({ entries: [] });
    subscription.unsubscribe();
    expect(timesCalled).toEqual(0);
  });

  it(`Should call the cartChanged method every time after a non-empty cart is passed`, () => {
    let timesCalled = 0;
    const subscription = profileTagPushEventsService
      .getPushEvents()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    const mockOrderEntry: OrderEntry[] = [{ entryNumber: 7 }];
    cartBehavior.next({ entries: [] });
    cartBehavior.next({ entries: [] });
    cartBehavior.next({ entries: [] });
    cartBehavior.next({ entries: mockOrderEntry });
    cartBehavior.next({ entries: mockOrderEntry });
    cartBehavior.next({ entries: [] });
    cartBehavior.next({ entries: [] });
    subscription.unsubscribe();
    expect(timesCalled).toEqual(4);
  });
});
