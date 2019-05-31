import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';


describe('GlobalMessage Effects', () => {
  let actions$: Observable<fromActions.ProductAction>;
  let effects: fromEffects.ProductEffects;

  const mockProductState = {
    details: {
      entities: {
        testLoadedCode: { loading: false, value: product },
        testLoadingCode: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ product: () => mockProductState }),
      ],
      providers: [
        { provide: ProductConnector, useClass: MockProductConnector },
        { provide: OccConfig, useValue: defaultOccProductConfig },
        fromEffects.ProductEffects,
        provideMockActions(() => actions$),
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });
    effects = TestBed.get(fromEffects.ProductEffects);
  });

  describe('hideAfterDelay$', () => {
    it('should return loadProductStart action if product not loaded', () => {
      const action = new GlobalMessageActions.AddMessage(message);
      const completion = new GlobalMessageActions.RemoveMessage(message);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadProduct$).toBeObservable(expected);
    });
  });
});

