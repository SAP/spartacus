import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { QuoteCartGuard } from './quote-cart.guard';
import { RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { QuoteCartService } from './quote-cart.service';
import { QUOTE_CODE } from '../../core/testing/quote-test-utils';
import createSpy = jasmine.createSpy;

class MockRoutingService {
  go = createSpy();
}

let isQuoteCartActive: any;
let quoteId: any;
class MockQuoteCartService {
  getQuoteCartActive() {
    return of(isQuoteCartActive);
  }
  getQuoteId() {
    return of(quoteId);
  }
}

describe('QuoteCartGuard', () => {
  let guard: QuoteCartGuard;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteCartGuard,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: QuoteCartService, useClass: MockQuoteCartService },
      ],
      imports: [RouterTestingModule],
    });

    isQuoteCartActive = false;
    quoteId = '';
    guard = TestBed.inject(QuoteCartGuard);
    routingService = TestBed.inject(RoutingService);
  });

  it('should create guard', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if quote cart is not present', (done) => {
      guard.canActivate().subscribe((canActive) => {
        expect(canActive).toBe(true);
        done();
      });
    });

    it('should return false if quote cart is present', (done) => {
      isQuoteCartActive = true;
      guard.canActivate().subscribe((canActive) => {
        expect(canActive).toBe(false);
        done();
      });
    });

    it('should navigate to quote details if quote cart is present', (done) => {
      isQuoteCartActive = true;
      quoteId = QUOTE_CODE;
      guard.canActivate().subscribe(() => {
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'quoteDetails',
          params: { quoteId: QUOTE_CODE },
        });
        done();
      });
    });
  });
});
