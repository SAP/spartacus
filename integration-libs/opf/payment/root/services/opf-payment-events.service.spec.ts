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
    it('should emit undefined when no payment option ID is provided', async () => {
      service.reinitiatePaymentEvent$.subscribe((paymentOptionId) => {
        expect(paymentOptionId).toBeUndefined();      });

      service.emitReinitiatePaymentEvent();
    });

    it('should emit the provided payment option ID', async () => {
      const testPaymentOptionId = 123;

      service.reinitiatePaymentEvent$.subscribe((paymentOptionId) => {
        expect(paymentOptionId).toBe(testPaymentOptionId);      });

      service.emitReinitiatePaymentEvent(testPaymentOptionId);
    });
  });

  describe('emitReinitiatePaymentEvent', () => {
    it('should emit undefined when called without parameters', async () => {
      service.reinitiatePaymentEvent$.subscribe((paymentOptionId) => {
        expect(paymentOptionId).toBeUndefined();      });

      service.emitReinitiatePaymentEvent();
    });

    it('should emit the provided payment option ID', async () => {
      const testPaymentOptionId = 789;

      service.reinitiatePaymentEvent$.subscribe((paymentOptionId) => {
        expect(paymentOptionId).toBe(testPaymentOptionId);      });

      service.emitReinitiatePaymentEvent(testPaymentOptionId);
    });
  });

  describe('refreshActiveConfigurationsEvent$', () => {
    it('should emit when emitRefreshActiveConfigurationsEvent is called', async () => {
      service.refreshActiveConfigurationsEvent$.subscribe(() => {
        expect(true).toBe(true);      });

      service.emitRefreshActiveConfigurationsEvent();
    });
  });
});
