import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { CustomerActions } from '../actions/index';
import { CustomerEffects } from './customer.effect';

class CustomerServiceMock {
  search(_searchTerm: string): Observable<any> {
    return of({});
  }
}

describe('Customer effect', () => {
  let customerService: CustomerService;
  let customerEffects: CustomerEffects;
  let actions$: Observable<CustomerActions.CustomerAction>;

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
      const action = new CustomerActions.CustomerSearch({ searchTerm: 'abc' });
      const completion = new CustomerActions.CustomerSearchSuccess({});

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(customerEffects.customerSearch$).toBeObservable(expected);
    });
  });
});
