import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActiveCartService,
  Cart,
  EventService,
  OrderEntry,
  OrderPlacedEvent,
  PersonalizationContext,
  PersonalizationContextService,
} from '@spartacus/core';
import {
  CartPageEvent,
  CategoryPageResultsEvent,
  HomePageEvent,
  PageEvent,
  ProductDetailsPageEvent,
  SearchPageResultsEvent,
} from '@spartacus/storefront';
import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProfileTagPushEventsService } from './profile-tag-push-events.service';

let profileTagPushEventsService: ProfileTagPushEventsService;
let cartBehavior: ReplaySubject<Cart>;
let activeCartService;
let eventService;
let eventServiceEvents: Map<Type<any>, ReplaySubject<any>>;
let personalizationContextService;
let getPersonalizationContext;

function setVariables() {
  cartBehavior = new ReplaySubject<Cart>();
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
  getPersonalizationContext = new ReplaySubject<PersonalizationContext>();
  eventService = {
    get<T>(eventType: Type<T>) {
      return eventServiceEvents.get(eventType);
    },
  };
  activeCartService = {
    getActive: () => cartBehavior,
  };
  personalizationContextService = {
    getPersonalizationContext: () => getPersonalizationContext,
  };
}

describe('profileTagPushEventsService', () => {
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

  describe('call profileTagPushEventsService for CartSnapshotEvents events', () => {
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

  describe('call profileTagPushEventsService for CategoryPageResultsEvent events', () => {
    it(`Should call the CategoryPageResultsEvent method for every CategoryPageResultsEvent event`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(tap(() => timesCalled++))
        .subscribe();
      const mockOrderEntry: CategoryPageResultsEvent[] = [
        { categoryCode: '123', categoryName: 'categoryName1' },
      ];
      const mockOrderEntries: CategoryPageResultsEvent[] = [
        { categoryCode: '234', categoryName: 'categoryName2' },
        { categoryCode: '345', categoryName: 'categoryName3' },
      ];
      eventServiceEvents.get(CategoryPageResultsEvent).next(mockOrderEntry);
      eventServiceEvents.get(CategoryPageResultsEvent).next(mockOrderEntries);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(2);
    });
  });

  describe('call profileTagPushEventsService for SearchPageResultsEvent events', () => {
    it(`Should call the searchResultsChanged method for every SearchPageResultsEvent event`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(tap(() => timesCalled++))
        .subscribe();
      const mockOrderEntry: SearchPageResultsEvent[] = [
        { searchTerm: 'search term 1', numberOfResults: 0 },
      ];
      const mockOrderEntries: SearchPageResultsEvent[] = [
        { searchTerm: 'search term 2', numberOfResults: 1 },
        { searchTerm: 'search term 3', numberOfResults: 4 },
      ];
      eventServiceEvents.get(SearchPageResultsEvent).next(mockOrderEntry);
      eventServiceEvents.get(SearchPageResultsEvent).next(mockOrderEntries);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(2);
    });
  });

  describe('call profileTagPushEventsService for ProductDetailsPageEvent events', () => {
    it(`Should call the productDetailsPageView method for every ProductDetailsPageEvent event`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(tap(() => timesCalled++))
        .subscribe();
      const mockOrderEntry: ProductDetailsPageEvent[] = [
        {
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
        },
      ];
      const mockOrderEntries: ProductDetailsPageEvent[] = [
        {
          code: '23456',
          name: 'product 2',
          price: {
            value: 234.56,
            currencyIso: 'EUR',
          },
          categories: [
            {
              code: '432',
              name: 'category 2',
            },
          ],
        },
        {
          code: '34567',
          name: 'product 3',
          price: {
            value: 345.67,
            currencyIso: 'EUR',
          },
          categories: [
            {
              code: '543',
              name: 'category 3',
            },
          ],
        },
      ];
      eventServiceEvents.get(ProductDetailsPageEvent).next(mockOrderEntry);
      eventServiceEvents.get(ProductDetailsPageEvent).next(mockOrderEntries);
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
      const mockOrderEntry: PageEvent[] = [{ url: 'page 1' }];
      const mockOrderEntries: PageEvent[] = [
        { url: 'page 2' },
        { url: 'page 3' },
      ];
      eventServiceEvents.get(PageEvent).next(mockOrderEntry);
      eventServiceEvents.get(PageEvent).next(mockOrderEntries);
      subscription.unsubscribe();
      expect(timesCalled).toEqual(2);
    });
  });

  describe('call profileTagPushEventsService for CartPageEvent events', () => {
    it(`Should call the categoryPageVisited method for every CartPageEvent event`, () => {
      let timesCalled = 0;
      const subscription = profileTagPushEventsService
        .getPushEvents()
        .pipe(tap(() => timesCalled++))
        .subscribe();
      const mockOrderEntry: CartPageEvent[] = [{ cartId: '123' }];
      const mockOrderEntries: CartPageEvent[] = [
        { cartId: '234' },
        { cartId: '345' },
      ];
      eventServiceEvents.get(CartPageEvent).next(mockOrderEntry);
      eventServiceEvents.get(CartPageEvent).next(mockOrderEntries);
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
      const mockOrderEntry: HomePageEvent[] = [{}];
      const mockOrderEntries: HomePageEvent[] = [{}, {}];
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
