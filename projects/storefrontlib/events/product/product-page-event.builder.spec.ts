import { TestBed } from '@angular/core/testing';
import {
  createFrom,
  EventService,
  Product,
  ProductSearchPage,
  ProductSearchService,
  ProductService,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
import { ProductPageEventBuilder } from './product-page-event.builder';
import {
  CategoryPageResultsEvent,
  ProductDetailsPageEvent,
  SearchPageResultsEvent,
} from './product-page.events';

const productGetBehavior = new BehaviorSubject<Product>(undefined);
class MockProductService {
  get = () => productGetBehavior;
}

const getResultsBehavior = new BehaviorSubject<ProductSearchPage>(undefined);
class MockProductSearchService {
  getResults = () => getResultsBehavior;
}

describe('ProductPageEventModule', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: ProductSearchService, useClass: MockProductSearchService },
      ],
    });

    TestBed.inject(ProductPageEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  describe('SearchPageResultsEvent', () => {
    it('should fire when the user performs a search and navigates to the search page', () => {
      const searchResults: ProductSearchPage = {
        freeTextSearch: 'camera',
        pagination: { totalResults: 5 },
        facets: [{ category: true }],
      };

      let result: SearchPageResultsEvent | undefined;
      eventService
        .get(SearchPageResultsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      const navigationEvent = createFrom(NavigationEvent, {
        context: { id: 'xxx' },
        semanticRoute: 'search',
        url: 'search url',
        params: {},
      });
      eventService.dispatch(navigationEvent);
      getResultsBehavior.next(searchResults);

      const expected = createFrom(SearchPageResultsEvent, {
        searchTerm: searchResults.freeTextSearch,
        numberOfResults: searchResults.pagination.totalResults,
        navigation: navigationEvent,
      });
      expect(result).toEqual(jasmine.objectContaining({ ...expected }));
    });

    it('should fire again if the user is on the search page, and the search state changes', () => {
      const searchResults: ProductSearchPage = {
        freeTextSearch: 'camera',
        pagination: { totalResults: 5 },
        facets: [{ category: true }],
      };

      let result: SearchPageResultsEvent | undefined;
      const sub = eventService
        .get(SearchPageResultsEvent)
        .subscribe((value) => (result = value));

      const navigationEvent = createFrom(NavigationEvent, {
        context: undefined,
        semanticRoute: 'search',
        url: 'search url',
        params: undefined,
      });

      eventService.dispatch(navigationEvent);
      getResultsBehavior.next(searchResults);

      const expected1 = createFrom(SearchPageResultsEvent, {
        searchTerm: searchResults.freeTextSearch,
        numberOfResults: searchResults.pagination.totalResults,
        navigation: navigationEvent,
      });
      expect(result).toEqual(jasmine.objectContaining({ ...expected1 }));

      getResultsBehavior.next({
        ...searchResults,
        freeTextSearch: 'new',
      });

      const expected2 = createFrom(SearchPageResultsEvent, {
        searchTerm: 'new',
        numberOfResults: searchResults.pagination.totalResults,
        navigation: navigationEvent,
      });
      expect(result).toEqual(jasmine.objectContaining({ ...expected2 }));
      sub.unsubscribe();
    });

    it('should not fire if the user is not on the search page', () => {
      const searchResults: ProductSearchPage = {
        freeTextSearch: 'camera',
        pagination: { totalResults: 5 },
        facets: [{ category: true }],
      };

      let result: SearchPageResultsEvent;
      eventService
        .get(SearchPageResultsEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      getResultsBehavior.next(searchResults);

      expect(result).toBeFalsy();
    });
  });

  it('CategoryPageResultsEvent', () => {
    const searchResults: ProductSearchPage = {
      breadcrumbs: [{ facetValueName: 'Cat1' }],
      pagination: { totalResults: 5 },
    };

    let result: CategoryPageResultsEvent;
    eventService
      .get(CategoryPageResultsEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const navigationEvent = createFrom(NavigationEvent, {
      context: { id: 'cat1' },
      semanticRoute: 'category',
      url: 'category url',
      params: undefined,
    });
    eventService.dispatch(navigationEvent);
    getResultsBehavior.next(searchResults);

    expect(result).toEqual(
      jasmine.objectContaining({
        navigation: navigationEvent,
        categoryCode: navigationEvent.context.id,
        categoryName: searchResults.breadcrumbs[0].facetValueName,
        numberOfResults: searchResults.pagination.totalResults,
      })
    );
  });

  describe('ProductDetailsPageEvent', () => {
    it('should fire on PDP visit', () => {
      const product: Product = {
        code: '1234',
        categories: [{ code: 'cat1', name: 'Cat1' }],
        name: 'Test Product 1',
        price: { value: 100 },
      };

      let result: ProductDetailsPageEvent | undefined;
      eventService
        .get(ProductDetailsPageEvent)
        .pipe(take(1))
        .subscribe((value) => (result = value));

      const productPageEvent = createFrom(NavigationEvent, {
        context: { id: product.code },
        semanticRoute: 'product',
        url: 'product url',
        params: {},
      });
      eventService.dispatch(productPageEvent);
      productGetBehavior.next(product);

      expect(result).toBeTruthy();
      const expected = createFrom(ProductDetailsPageEvent, {
        navigation: productPageEvent,
        code: product.code,
        categories: product.categories,
        name: product.name,
        price: product.price,
      });
      expect(result).toEqual(jasmine.objectContaining({ ...expected }));
    });

    it('should not fire again if the product state changes', () => {
      const product: Product = {
        code: '1234',
        categories: [{ code: 'cat1', name: 'Cat1' }],
        name: 'Test Product 1',
        price: { value: 100 },
      };

      let result: ProductDetailsPageEvent | undefined;
      const sub = eventService
        .get(ProductDetailsPageEvent)
        .subscribe((value) => (result = value));

      const productPageEvent = createFrom(NavigationEvent, {
        context: { id: product.code },
        semanticRoute: 'product',
        url: 'product url',
        params: {},
      });

      eventService.dispatch(productPageEvent);
      productGetBehavior.next(product);

      const expected = createFrom(ProductDetailsPageEvent, {
        navigation: productPageEvent,
        code: product.code,
        categories: product.categories,
        name: product.name,
        price: product.price,
      });
      expect(result).toEqual(jasmine.objectContaining({ ...expected }));

      productGetBehavior.next({ ...product, code: 'new' });
      expect(result).not.toEqual(jasmine.objectContaining({ code: 'new' }));
      expect(result).toEqual(
        jasmine.objectContaining({
          code: product.code,
          categories: product.categories,
          name: product.name,
          price: product.price,
        } as ProductDetailsPageEvent)
      );
      sub.unsubscribe();
    });
  });
});
