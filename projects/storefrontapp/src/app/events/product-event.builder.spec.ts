import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Observable, of, ReplaySubject } from 'rxjs';
import { EventService } from '../../event/event.service';
import { ProductSearchPage } from '../../model/product-search.model';
import { Product } from '../../model/product.model';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { ProductService } from '../../product/facade/product.service';
import { SemanticPathService } from '../../routing/configurable-routes/url-translation/semantic-path.service';
import { UrlCommands } from '../../routing/configurable-routes/url-translation/url-command';
import { RoutingEventBuilder } from '../../routing/event/routing-event.builder';
import {
  CategoryPageVisited,
  ProductDetailsPageVisited,
  SearchPageVisited,
} from './product.events';

class MockProductService {
  get(): Observable<Product> {
    return of();
  }
}
class ProductSearchServiceStub {
  getResults(): Observable<ProductSearchPage> {
    return of();
  }
}

class MockSemanticPathService {
  transform(_commands: UrlCommands): any[] {
    return [];
  }
  get(_routeName: string): string {
    return '';
  }
}

describe('Routing-Event Builder', () => {
  let routingEventBuilder: RoutingEventBuilder;
  let mockActionsSubject: ReplaySubject<Action>;
  let eventService: EventService;

  const mockTearDown = () => {};

  function setVariables() {
    mockActionsSubject = new ReplaySubject<Action>();
  }

  beforeEach(() => {
    setVariables();
    TestBed.configureTestingModule({
      providers: [
        RoutingEventBuilder,
        {
          provide: ActionsSubject,
          useValue: mockActionsSubject,
        },
        {
          provide: EventService,
          useValue: {
            register: jasmine
              .createSpy('register')
              .and.returnValue(mockTearDown),
          },
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        {
          provide: ProductSearchService,
          useClass: ProductSearchServiceStub,
        },
        {
          provide: SemanticPathService,
          useClass: MockSemanticPathService,
        },
      ],
    });
    routingEventBuilder = TestBed.inject(RoutingEventBuilder);
    eventService = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(routingEventBuilder).toBeTruthy();
  });

  it('should register seven events', () => {
    expect(eventService.register).toHaveBeenCalledTimes(7);
  });

  it('should register SearchPageVisited', () => {
    expect(eventService.register).toHaveBeenCalledWith(
      SearchPageVisited,
      jasmine.any(Observable)
    );
  });

  it('should register ProductDetailsPageVisited', () => {
    expect(eventService.register).toHaveBeenCalledWith(
      ProductDetailsPageVisited,
      jasmine.any(Observable)
    );
  });

  it('should register CategoryPageVisited', () => {
    expect(eventService.register).toHaveBeenCalledWith(
      CategoryPageVisited,
      jasmine.any(Observable)
    );
  });
});
