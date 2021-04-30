import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CheckoutCostCenterAdapter } from './checkout-cost-center.adapter';
import { CheckoutCostCenterConnector } from './checkout-cost-center.connector';
import createSpy = jasmine.createSpy;

describe('CheckoutCostCenterConnector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  class MockCheckoutCostCenterAdapter implements CheckoutCostCenterAdapter {
    setCostCenter = createSpy().and.returnValue(of({}));
  }

  let service: CheckoutCostCenterConnector;
  let adapter: CheckoutCostCenterAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutCostCenterConnector,
        {
          provide: CheckoutCostCenterAdapter,
          useClass: MockCheckoutCostCenterAdapter,
        },
      ],
    });

    service = TestBed.inject(
      CheckoutCostCenterConnector as Type<CheckoutCostCenterConnector>
    );
    adapter = TestBed.inject(
      CheckoutCostCenterAdapter as Type<CheckoutCostCenterAdapter>
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setCostCenter should call adapter', () => {
    service.setCostCenter('userId', 'cartId', 'testCostCenter').subscribe();
    expect(adapter.setCostCenter).toHaveBeenCalledWith(
      'userId',
      'cartId',
      'testCostCenter'
    );
  });
});
