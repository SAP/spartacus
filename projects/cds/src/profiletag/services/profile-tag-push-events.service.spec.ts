import { TestBed } from '@angular/core/testing';
import {
  ActiveCartService,
  Cart,
  EventService,
  OrderEntry,
  PersonalizationContext,
  PersonalizationContextService,
  CategoryPageVisited,
  SearchPageVisited,
  ProductDetailsPageVisited,
  PageVisited,
  CartPageVisited,
  HomePageVisited,
  OrderConfirmationPageVisited,
} from '@spartacus/core';
import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProfileTagPushEventsService } from './profile-tag-push-events.service';
import { Type } from '@angular/core';

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
    CategoryPageVisited,
    new ReplaySubject<CategoryPageVisited>()
  );
  eventServiceEvents.set(
    SearchPageVisited,
    new ReplaySubject<SearchPageVisited>()
  );
  eventServiceEvents.set(
    ProductDetailsPageVisited,
    new ReplaySubject<ProductDetailsPageVisited>()
  );
  eventServiceEvents.set(PageVisited, new ReplaySubject<PageVisited>());
  eventServiceEvents.set(CartPageVisited, new ReplaySubject<CartPageVisited>());
  eventServiceEvents.set(HomePageVisited, new ReplaySubject<HomePageVisited>());
  eventServiceEvents.set(
    OrderConfirmationPageVisited,
    new ReplaySubject<OrderConfirmationPageVisited>()
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

describe('profileTagPushEventsService', () => {
  it('should be created', () => {
    expect(profileTagPushEventsService).toBeTruthy();
  });
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

describe('call profileTagPushEventsService for CategoryPageVisited events', () => {
  it(`Should call the categoryPageVisited method for every CategoryPageVisited event`, () => {
    let timesCalled = 0;
    const subscription = profileTagPushEventsService
      .getPushEvents()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    const mockOrderEntry: CategoryPageVisited[] = [
      { categoryCode: '123', categoryName: 'categoryName1' },
    ];
    const mockOrderEntries: CategoryPageVisited[] = [
      { categoryCode: '234', categoryName: 'categoryName2' },
      { categoryCode: '345', categoryName: 'categoryName3' },
    ];
    eventServiceEvents.get(CategoryPageVisited).next(mockOrderEntry);
    eventServiceEvents.get(CategoryPageVisited).next(mockOrderEntries);
    subscription.unsubscribe();
    expect(timesCalled).toEqual(2);
  });
});

describe('call profileTagPushEventsService for SearchPageVisited events', () => {
  it(`Should call the searchResultsChanged method for every SearchPageVisited event`, () => {
    let timesCalled = 0;
    const subscription = profileTagPushEventsService
      .getPushEvents()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    const mockOrderEntry: SearchPageVisited[] = [
      { searchTerm: 'search term 1', numberOfResults: 0 },
    ];
    const mockOrderEntries: SearchPageVisited[] = [
      { searchTerm: 'search term 2', numberOfResults: 1 },
      { searchTerm: 'search term 3', numberOfResults: 4 },
    ];
    eventServiceEvents.get(SearchPageVisited).next(mockOrderEntry);
    eventServiceEvents.get(SearchPageVisited).next(mockOrderEntries);
    subscription.unsubscribe();
    expect(timesCalled).toEqual(2);
  });
});

describe('call profileTagPushEventsService for ProductDetailsPageVisited events', () => {
  it(`Should call the productDetailsPageView method for every ProductDetailsPageVisited event`, () => {
    let timesCalled = 0;
    const subscription = profileTagPushEventsService
      .getPushEvents()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    const mockOrderEntry: ProductDetailsPageVisited[] = [
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
    const mockOrderEntries: ProductDetailsPageVisited[] = [
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
    eventServiceEvents.get(ProductDetailsPageVisited).next(mockOrderEntry);
    eventServiceEvents.get(ProductDetailsPageVisited).next(mockOrderEntries);
    subscription.unsubscribe();
    expect(timesCalled).toEqual(2);
  });
});

describe('call profileTagPushEventsService for PageVisited events', () => {
  it(`Should call the navigatedEvent method for every PageVisited event`, () => {
    let timesCalled = 0;
    const subscription = profileTagPushEventsService
      .getPushEvents()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    const mockOrderEntry: PageVisited[] = [{ url: 'page 1' }];
    const mockOrderEntries: PageVisited[] = [
      { url: 'page 2' },
      { url: 'page 3' },
    ];
    eventServiceEvents.get(PageVisited).next(mockOrderEntry);
    eventServiceEvents.get(PageVisited).next(mockOrderEntries);
    subscription.unsubscribe();
    expect(timesCalled).toEqual(2);
  });
});

describe('call profileTagPushEventsService for CartPageVisited events', () => {
  it(`Should call the categoryPageVisited method for every CartPageVisited event`, () => {
    let timesCalled = 0;
    const subscription = profileTagPushEventsService
      .getPushEvents()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    const mockOrderEntry: CartPageVisited[] = [{ cartId: '123' }];
    const mockOrderEntries: CartPageVisited[] = [
      { cartId: '234' },
      { cartId: '345' },
    ];
    eventServiceEvents.get(CartPageVisited).next(mockOrderEntry);
    eventServiceEvents.get(CartPageVisited).next(mockOrderEntries);
    subscription.unsubscribe();
    expect(timesCalled).toEqual(2);
  });
});

describe('call profileTagPushEventsService for HomePageVisited events', () => {
  it(`Should call the homePageVisitedEvent method for every HomePageVisited event`, () => {
    let timesCalled = 0;
    const subscription = profileTagPushEventsService
      .getPushEvents()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    const mockOrderEntry: HomePageVisited[] = [{}];
    const mockOrderEntries: HomePageVisited[] = [{}, {}];
    eventServiceEvents.get(HomePageVisited).next(mockOrderEntry);
    eventServiceEvents.get(HomePageVisited).next(mockOrderEntries);
    subscription.unsubscribe();
    expect(timesCalled).toEqual(2);
  });
});

describe('call profileTagPushEventsService for OrderConfirmationPageVisited events', () => {
  it(`Should call the orderConfirmationPageVisited method for every OrderConfirmationPageVisited event`, () => {
    let timesCalled = 0;
    const subscription = profileTagPushEventsService
      .getPushEvents()
      .pipe(tap(() => timesCalled++))
      .subscribe();
    const mockOrderEntry: OrderConfirmationPageVisited[] = [{ orderId: '123' }];
    const mockOrderEntries: OrderConfirmationPageVisited[] = [
      { orderId: '234' },
      { orderId: '345' },
    ];
    eventServiceEvents.get(OrderConfirmationPageVisited).next(mockOrderEntry);
    eventServiceEvents.get(OrderConfirmationPageVisited).next(mockOrderEntries);
    subscription.unsubscribe();
    expect(timesCalled).toEqual(2);
  });
});
