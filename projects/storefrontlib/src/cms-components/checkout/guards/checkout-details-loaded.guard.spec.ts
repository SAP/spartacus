import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { CheckoutDetailsLoadedGuard } from './checkout-details-loaded.guard';

class MockCheckoutDetailsService {
  get getCheckoutDetailsLoaded$(): Observable<Boolean> {
    return of();
  }
}

describe(`CheckoutDetailsLoadedGuard`, () => {
  let guard: CheckoutDetailsLoadedGuard;
  let mockCheckoutDetailsService: MockCheckoutDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
      ],
    });

    guard = TestBed.inject(CheckoutDetailsLoadedGuard);
    mockCheckoutDetailsService = TestBed.inject(CheckoutDetailsService);
  });

  describe('when checkout details not loaded', () => {
    it('should return false', done => {
      spyOnProperty(
        mockCheckoutDetailsService,
        'getCheckoutDetailsLoaded$'
      ).and.returnValue(of(false));

      guard.canActivate().subscribe(result => {
        expect(result).toBeFalsy();
        done();
      });
    });
  });

  describe(`when checkout details not loaded`, () => {
    it(`should return true`, done => {
      spyOnProperty(
        mockCheckoutDetailsService,
        'getCheckoutDetailsLoaded$'
      ).and.returnValue(of(true));

      guard.canActivate().subscribe(result => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });
});
