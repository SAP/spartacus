import { AbstractType, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OrderPlacedEvent } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Cart,
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
  CxEvent,
  EventService,
  MergeCartSuccessEvent,
} from '@spartacus/core';
import {
  CartPageEvent,
  CategoryPageResultsEvent,
  HomePageEvent,
  PageEvent,
  ProductDetailsPageEvent,
  SearchPageResultsEvent,
} from '@spartacus/storefront';
import {
  PersonalizationContext,
  PersonalizationContextService,
} from '@spartacus/tracking/personalization/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ProfileTagPushEventsService } from './profile-tag-push-events.service';

let profileTagPushEventsService: ProfileTagPushEventsService;
let eventService: Partial<EventService>;
let eventServiceEvents: Map<
  AbstractType<CxEvent>,
  ReplaySubject<any>
> = new Map();
let personalizationContextService: Partial<PersonalizationContextService>;
let getPersonalizationContext: Observable<PersonalizationContext | undefined>;
let activeCartService: Partial<ActiveCartService>;
let activeCartBehavior: ReplaySubject<Cart>;

function setVariables() {
  eventServiceEvents = new Map();
  eventServiceEvents.set(
    CategoryPageResultsEvent,
    new ReplaySubject<CategoryPageResultsEvent>()
  );
  eventServiceEvents.set(
    SearchPageResultsEvent,
    new ReplaySubject<SearchPageResultsEvent>()
  );
  eventServiceEvents.set(
    ProductDetailsPageEvent,
    new ReplaySubject<ProductDetailsPageEvent>()
  );
  eventServiceEvents.set(PageEvent, new ReplaySubject<PageEvent>());
  eventServiceEvents.set(CartPageEvent, new ReplaySubject<CartPageEvent>());
  eventServiceEvents.set(HomePageEvent, new ReplaySubject<HomePageEvent>());
  eventServiceEvents.set(
    OrderPlacedEvent,
    new ReplaySubject<OrderPlacedEvent>()
  );
  eventServiceEvents.set(
    CartAddEntrySuccessEvent,
    new ReplaySubject<CartAddEntrySuccessEvent>()
  );
  eventServiceEvents.set(
    CartRemoveEntrySuccessEvent,
    new ReplaySubject<CartRemoveEntrySuccessEvent>()
  );
  eventServiceEvents.set(
    CartUpdateEntrySuccessEvent,
    new ReplaySubject<CartUpdateEntrySuccessEvent>()
  );
  eventServiceEvents.set(
    MergeCartSuccessEvent,
    new ReplaySubject<MergeCartSuccessEvent>()
  );

  getPersonalizationContext = new ReplaySubject<PersonalizationContext>();
  eventService = {
    get<T>(eventType: Type<T>) {
      return eventServiceEvents.get(eventType);
    },
  };
  personalizationContextService = {
    getPersonalizationContext: () => getPersonalizationContext,
  };
  activeCartBehavior = new ReplaySubject<Cart>();
  activeCartService = {
    takeActive: () => activeCartBehavior,
  };
}

describe('profileTagPushEventsService', () => {
  beforeEach(() => {
    setVariables();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: EventService,
          useValue: eventService,
        },
        {
          provide: PersonalizationContextService,
          useValue: personalizationContextService,
        },
        {
          provide: ActiveCartService,
          useValue: activeCartService,
        },
      ],
    });
    profileTagPushEventsService = TestBed.inject(ProfileTagPushEventsService);
  });

  it('should be created', () => {
    expect(profileTagPushEventsService).toBeTruthy();
  });

  describe('Cart Events', () => {
    it(`Should Transform CartAddEntrySuccessEvents to a AddedToCartPushEvent`, () => {
      let timesCalled = 0;
      let calledWith;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(
          tap((item) => {
            timesCalled++;
            calledWith = item;
          })
        )
        .subscribe();
      eventServiceEvents
        .get(CartAddEntrySuccessEvent)
        .next({ entry: { product: { categories: [{}] } } });
      subscription.unsubscribe();
      expect(timesCalled).toEqual(1);
      expect(calledWith.name).toBe('AddedToCart');
    });

    it(`Should Transform CartRemoveEntrySuccessEvents to a RemovedFromCartPushEvent`, () => {
      let timesCalled = 0;
      let calledWith;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(
          tap((item) => {
            timesCalled++;
            calledWith = item;
          })
        )
        .subscribe();
      eventServiceEvents
        .get(CartRemoveEntrySuccessEvent)
        .next({ entry: { product: { categories: [{}] } } });
      subscription.unsubscribe();
      expect(timesCalled).toEqual(1);
      expect(calledWith.name).toBe('RemovedFromCart');
    });

    it(`Should Transform CartUpdateEntrySuccessEvents to a ModifiedCart`, () => {
      let timesCalled = 0;
      let calledWith;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(
          tap((item) => {
            timesCalled++;
            calledWith = item;
          })
        )
        .subscribe();
      eventServiceEvents
        .get(CartUpdateEntrySuccessEvent)
        .next({ entry: { product: { categories: [{}] } } });
      subscription.unsubscribe();
      expect(timesCalled).toEqual(1);
      expect(calledWith.name).toBe('ModifiedCart');
    });

    it(`Should transform Cart(Add/Remove/Update)EntrySuccessEvents to CartSnapshotEvents`, () => {
      let timesCalled = 0;
      let calledWith = [];
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(
          tap((item) => {
            timesCalled++;
            calledWith.push(item);
          })
        )
        .subscribe();
      eventServiceEvents
        .get(CartAddEntrySuccessEvent)
        .next({ entry: { product: { categories: [{}] } } });
      activeCartBehavior.next({
        entries: [{ product: { code: 'xyz' }, quantity: 1 }],
        code: 'CustomCart',
      });
      subscription.unsubscribe();
      expect(timesCalled).toEqual(2);
      expect(calledWith[0].name).toBe('AddedToCart');
      expect(calledWith[1].name).toBe('CartSnapshot');
      expect(calledWith[1].data.cart.entries.length).toBe(1);
    });

    it(`Should transform MergeCartSuccessEvent to CartSnapshotEvents`, () => {
      let timesCalled = 0;
      let calledWith = [];
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(
          tap((item) => {
            timesCalled++;
            calledWith.push(item);
          })
        )
        .subscribe();
      eventServiceEvents
        .get(MergeCartSuccessEvent)
        .next({ entry: { product: { categories: [{}] } } });
      activeCartBehavior.next({
        entries: [{ product: { code: 'xyz' }, quantity: 1 }],
        code: 'CustomCart',
      });
      subscription.unsubscribe();
      expect(timesCalled).toEqual(1);
      expect(calledWith[0].name).toBe('CartSnapshot');
      expect(calledWith[0].data.cart.entries.length).toBe(1);
    });
  });

  describe('CategoryPageResultsEvent events', () => {
    const pageEventHome: PageEvent = {
      navigation: {
        semanticRoute: 'home',
        url: 'page 1',
        context: undefined,
        params: { 'pt-debug': true },
      },
    };
    const pageEventCategory: PageEvent = {
      navigation: {
        semanticRoute: 'home',
        url: 'page 1',
        context: undefined,
        params: { 'pt-debug': true },
      },
    };
    const categoryPageResultsEvent123: CategoryPageResultsEvent = {
      categoryCode: '123',
      categoryName: 'categoryName1',
      numberOfResults: 2,
      navigation: {
        context: null,
        url: 'http',
        params: { 'pt-debug': true },
      },
    };
    const categoryPageResultsEvent234: CategoryPageResultsEvent = {
      categoryCode: '234',
      categoryName: 'categoryName2',
      numberOfResults: 2,
      navigation: {
        context: null,
        url: 'http',
        params: { 'pt-debug': true },
      },
    };
    const categoryPageResultsEvent345: CategoryPageResultsEvent = {
      categoryCode: '345',
      categoryName: 'categoryName3',
      numberOfResults: 2,
      navigation: {
        context: undefined,
        url: 'http',
        params: { 'pt-debug': true },
      },
    };
    it(`Should emit an event for every CategoryPageResultsEvent event with a different category code`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(
          filter((event) => event.name === 'CategoryPageViewed'),
          tap(() => timesCalled++)
        )
        .subscribe();
      eventServiceEvents.get(PageEvent).next(pageEventHome);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent123);
      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent234);
      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent345);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(3);
    });

    it(`Should not emit an event if the category code and semantic route are the same`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(
          filter((event) => event.name === 'CategoryPageViewed'),
          tap(() => timesCalled++)
        )
        .subscribe();
      eventServiceEvents.get(PageEvent).next(pageEventHome);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent123);
      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent123);
      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent123);
      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent234);
      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent345);
      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent345);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(3);
    });

    it(`Should emit an event if the category code is the same, and different type of page is visited`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(
          filter((event) => event.name === 'CategoryPageViewed'),
          tap(() => timesCalled++)
        )
        .subscribe();
      eventServiceEvents.get(PageEvent).next(pageEventHome);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent123);

      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent123);

      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent123);

      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent345);

      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent345);

      eventServiceEvents.get(PageEvent).next(pageEventCategory);
      eventServiceEvents
        .get(CategoryPageResultsEvent)
        .next(categoryPageResultsEvent234);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(3);
    });
  });

  describe('call profileTagPushEventsService for SearchPageResultsEvent events', () => {
    it(`Should call the searchResultsChanged method for every SearchPageResultsEvent event`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(tap(() => timesCalled++))
        .subscribe();
      const searchResultEvent1: SearchPageResultsEvent = {
        searchTerm: 'search term 1',
        numberOfResults: 0,
        navigation: {
          context: undefined,
          url: 'http',
          params: { 'pt-debug': true },
        },
      };
      const searchResultEvent2: SearchPageResultsEvent = {
        searchTerm: 'search term 2',
        numberOfResults: 1,
        navigation: {
          context: undefined,
          url: 'http',
          params: { 'pt-debug': true },
        },
      };
      const searchResultEvent3: SearchPageResultsEvent = {
        searchTerm: 'search term 3',
        numberOfResults: 4,
        navigation: {
          context: undefined,
          url: 'http',
          params: { 'pt-debug': true },
        },
      };
      eventServiceEvents.get(SearchPageResultsEvent).next(searchResultEvent1);
      eventServiceEvents.get(SearchPageResultsEvent).next(searchResultEvent2);
      eventServiceEvents.get(SearchPageResultsEvent).next(searchResultEvent3);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(3);
    });
  });

  describe('ProductDetailsPageEvent events', () => {
    const productDetailsPageEvent: ProductDetailsPageEvent = {
      code: '12345',
      name: 'product 1',
      price: {
        value: 123.45,
        currencyIso: 'EUR',
      },
      categories: [
        {
          code: '321',
          name: 'category 1',
        },
      ],
      navigation: {
        context: undefined,
        url: 'http',
        params: { 'pt-debug': true },
      },
    };

    it(`Should call the productDetailsPageView method for every ProductDetailsPageEvent event with a different code`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(tap(() => timesCalled++))
        .subscribe();
      eventServiceEvents
        .get(ProductDetailsPageEvent)
        .next(productDetailsPageEvent);
      eventServiceEvents
        .get(ProductDetailsPageEvent)
        .next(productDetailsPageEvent);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(2);
    });
  });

  describe('call profileTagPushEventsService for PageEvent events', () => {
    it(`Should call the navigatedEvent method for every PageEvent event`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(tap(() => timesCalled++))
        .subscribe();
      const pageEvent: PageEvent = {
        navigation: {
          url: 'page 1',
          context: undefined,
          params: { 'pt-debug': true },
        },
      };
      eventServiceEvents.get(PageEvent).next(pageEvent);
      eventServiceEvents.get(PageEvent).next(pageEvent);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(2);
    });
  });

  describe('call profileTagPushEventsService for HomePageEvent events', () => {
    it(`Should call the HomePageEventEvent method for every HomePageEvent event`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(tap(() => timesCalled++))
        .subscribe();
      const mockOrderEntry: HomePageEvent[] = [
        {
          navigation: {
            url: 'page 1',
            context: undefined,
            params: { 'pt-debug': true },
          },
        },
      ];
      const mockOrderEntries: HomePageEvent[] = [
        {
          navigation: {
            url: 'page 1',
            context: undefined,
            params: { 'pt-debug': true },
          },
        },
        {
          navigation: {
            url: 'page 1',
            context: undefined,
            params: { 'pt-debug': true },
          },
        },
      ];
      eventServiceEvents.get(HomePageEvent).next(mockOrderEntry);
      eventServiceEvents.get(HomePageEvent).next(mockOrderEntries);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(2);
    });
  });

  describe('call profileTagPushEventsService for OrderPlacedEvent events', () => {
    it(`Should call the OrderPlacedEvent method for every OrderPlacedEvent event`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(tap(() => timesCalled++))
        .subscribe();
      const mockOrderEntry: OrderPlacedEvent[] = [{ code: '123' }];
      const mockOrderEntries: OrderPlacedEvent[] = [
        { code: '234' },
        { code: '345' },
      ];
      eventServiceEvents.get(OrderPlacedEvent).next(mockOrderEntry);
      eventServiceEvents.get(OrderPlacedEvent).next(mockOrderEntries);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(2);
    });
  });
});
