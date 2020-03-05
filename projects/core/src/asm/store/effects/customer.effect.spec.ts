import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { AsmConnector } from '../../connectors/asm.connector';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmActions } from '../actions/index';
import { CustomerEffects } from './customer.effect';

class AsmConnectorMock {
  customerSearch(_searchTerm: string): Observable<CustomerSearchPage> {
    return of(<CustomerSearchPage>{});
  }
}

describe('Customer effect', () => {
  let asmConnector: AsmConnector;
  let customerEffects: CustomerEffects;
  let actions$: Observable<AsmActions.CustomerAction>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerEffects,
        {
          provide: AsmConnector,
          useClass: AsmConnectorMock,
        },
        provideMockActions(() => actions$),
      ],
    });

    customerEffects = TestBed.inject(CustomerEffects);
    asmConnector = TestBed.inject(AsmConnector);

    spyOn(asmConnector, 'customerSearch').and.returnValue(of({ entries: [] }));
  });

  describe('customerSearch$', () => {
    it('should provide search results', () => {
      const action = new AsmActions.CustomerSearch({ query: 'abc' });
      const completion = new AsmActions.CustomerSearchSuccess({
        entries: [],
      } as CustomerSearchPage);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(customerEffects.customerSearch$).toBeObservable(expected);
    });
  });
});
