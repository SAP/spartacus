import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CustomerSearchPage } from '../../models/asm.models';
import { CustomerService } from '../../services/customer.service';
import { AsmActions } from '../actions/index';
import { CustomerEffects } from './customer.effect';

class CustomerServiceMock {
  search(_searchTerm: string): Observable<CustomerSearchPage> {
    return of(<CustomerSearchPage>{});
  }
}

describe('Customer effect', () => {
  let customerService: CustomerService;
  let customerEffects: CustomerEffects;
  let actions$: Observable<AsmActions.CustomerAction>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerEffects,
        {
          provide: CustomerService,
          useClass: CustomerServiceMock,
        },
        provideMockActions(() => actions$),
      ],
    });

    customerEffects = TestBed.get(CustomerEffects);
    customerService = TestBed.get(CustomerService);

    spyOn(customerService, 'search').and.returnValue(of({}));
  });

  describe('customerSearch$', () => {
    it('should provide search results', () => {
      const action = new AsmActions.CustomerSearch({ query: 'abc' });
      const completion = new AsmActions.CustomerSearchSuccess(
        {} as CustomerSearchPage
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(customerEffects.customerSearch$).toBeObservable(expected);
    });
  });
});
