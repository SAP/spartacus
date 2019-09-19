import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CustomerConnector } from '../../connectors/customer.connector';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmActions } from '../actions/index';
import { CustomerEffects } from './customer.effect';

class CustomerConnectorMock {
  search(_searchTerm: string): Observable<CustomerSearchPage> {
    return of(<CustomerSearchPage>{});
  }
}

fdescribe('Customer effect', () => {
  let customerConnector: CustomerConnector;
  let customerEffects: CustomerEffects;
  let actions$: Observable<AsmActions.CustomerAction>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerEffects,
        {
          provide: CustomerConnector,
          useClass: CustomerConnectorMock,
        },
        provideMockActions(() => actions$),
      ],
    });

    customerEffects = TestBed.get(CustomerEffects);
    customerConnector = TestBed.get(CustomerConnector);

    spyOn(customerConnector, 'search').and.returnValue(of({ entries: [] }));
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
