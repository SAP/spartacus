import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutServiceDetailsAdapter } from './checkout-service-details.adapter';
import { CheckoutServiceDetailsConnector } from './checkout-service-details.connector';
import { ServiceDetails } from '@spartacus/s4-service/root';
import createSpy = jasmine.createSpy;

class MockServiceDetailsAdapter
  implements Partial<CheckoutServiceDetailsAdapter>
{
  setServiceScheduleSlot = createSpy().and.returnValue(of([]));
}

describe('CheckoutServiceDetailsConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let service: CheckoutServiceDetailsConnector;
  let adapter: CheckoutServiceDetailsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutServiceDetailsConnector,
        {
          provide: CheckoutServiceDetailsAdapter,
          useClass: MockServiceDetailsAdapter,
        },
      ],
    });

    service = TestBed.inject(
      CheckoutServiceDetailsConnector as Type<CheckoutServiceDetailsConnector>
    );
    adapter = TestBed.inject(
      CheckoutServiceDetailsAdapter as Type<CheckoutServiceDetailsAdapter>
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setServiceScheduleSlot should call adapter', () => {
    service
      .setServiceScheduleSlot(
        'userId',
        'cartId',
        'dd/mm/yyyy' as ServiceDetails
      )
      .pipe(take(1))
      .subscribe();
    expect(adapter.setServiceScheduleSlot).toHaveBeenCalledWith(
      'userId',
      'cartId',
      'dd/mm/yyyy' as ServiceDetails
    );
  });
});
