import { TestBed } from "@angular/core/testing";
import { RoutingEventBuilder, SearchPageVisited, ProductDetailsPageVisited, CategoryPageVisited, HomePageVisited, CartPageVisited, PageVisited, OrderConfirmationPageVisited } from ".";
import { ActionsSubject, Action } from "@ngrx/store";
import { ReplaySubject, Observable, of } from "rxjs";
import { ProductService, ProductSearchService } from "../../product";
import { Product } from "../../model/product.model";
import { SemanticPathService, UrlCommands } from "../configurable-routes";
import { EventService } from "../../event";
import { ProductSearchPage } from "../../model";


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
      expect(
        eventService.register
      ).toHaveBeenCalledTimes(7);
    });   

    it('should register SearchPageVisited', () => {
      expect(
        eventService.register
      ).toHaveBeenCalledWith(SearchPageVisited, jasmine.any(Observable)); 
    });  
    
    it('should register ProductDetailsPageVisited', () => {
      expect(
        eventService.register
      ).toHaveBeenCalledWith(ProductDetailsPageVisited, jasmine.any(Observable)); 
    });  

    it('should register CategoryPageVisited', () => {
      expect(
        eventService.register
      ).toHaveBeenCalledWith(CategoryPageVisited, jasmine.any(Observable)); 
    }); 

    it('should register HomePageVisited', () => {
      expect(
        eventService.register
      ).toHaveBeenCalledWith(HomePageVisited, jasmine.any(Observable)); 
    }); 

    it('should register CartPageVisited', () => {
      expect(
        eventService.register
      ).toHaveBeenCalledWith(CartPageVisited, jasmine.any(Observable)); 
    }); 

    it('should register PageVisited', () => {
      expect(
        eventService.register
      ).toHaveBeenCalledWith(PageVisited, jasmine.any(Observable)); 
    }); 

    it('should register OrderConfirmationPageVisited', () => {
      expect(
        eventService.register
      ).toHaveBeenCalledWith(OrderConfirmationPageVisited, jasmine.any(Observable)); 
    });                        
});