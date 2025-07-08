import { TestBed } from '@angular/core/testing';
import { OpfPaymentEventsService } from './opf-payment-events.service';

describe('OpfPaymentEventsService', () => {
  let service: OpfPaymentEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpfPaymentEventsService],
    });
    service = TestBed.inject(OpfPaymentEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have reinitiatePaymentEvent$ observable', () => {
    expect(service.reinitiatePaymentEvent$).toBeDefined();
  });

  it('should have emitReinitiatePaymentEvent method', () => {
    expect(typeof service.emitReinitiatePaymentEvent).toBe('function');
  });

  describe('reinitiatePaymentEvent$', () => {
    it('should emit undefined when no payment option ID is provided', (done) => {
      service.reinitiatePaymentEvent$.subscribe((paymentOptionId) => {
        expect(paymentOptionId).toBeUndefined();
        done();
      });

      service.emitReinitiatePaymentEvent();
    });

    it('should emit the provided payment option ID', (done) => {
      const testPaymentOptionId = 123;

      service.reinitiatePaymentEvent$.subscribe((paymentOptionId) => {
        expect(paymentOptionId).toBe(testPaymentOptionId);
        done();
      });

      service.emitReinitiatePaymentEvent(testPaymentOptionId);
    });
  });

  describe('emitReinitiatePaymentEvent', () => {
    it('should emit undefined when called without parameters', (done) => {
      service.reinitiatePaymentEvent$.subscribe((paymentOptionId) => {
        expect(paymentOptionId).toBeUndefined();
        done();
      });

      service.emitReinitiatePaymentEvent();
    });

    it('should emit the provided payment option ID', (done) => {
      const testPaymentOptionId = 789;

      service.reinitiatePaymentEvent$.subscribe((paymentOptionId) => {
        expect(paymentOptionId).toBe(testPaymentOptionId);
        done();
      });

      service.emitReinitiatePaymentEvent(testPaymentOptionId);
    });
  });
});
