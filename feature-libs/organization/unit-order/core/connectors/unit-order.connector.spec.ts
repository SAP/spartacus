import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UnitOrderAdapter } from './unit-order.adapter';
import { UnitOrderConnector } from './unit-order.connector';
import createSpy = jasmine.createSpy;

class MockUnitOrderAdapter implements UnitOrderAdapter {
  loadUnitOrderHistory = createSpy(
    'UnitOrderAdapter.loadUnitOrderHistory'
  ).and.callFake((userId: string) => of(`orderHistory-${userId}`));
}

describe('OrderHistoryConnector', () => {
  let service: UnitOrderConnector;
  let adapter: UnitOrderAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitOrderConnector,
        { provide: UnitOrderAdapter, useClass: MockUnitOrderAdapter },
      ],
    });

    service = TestBed.inject(UnitOrderConnector);
    adapter = TestBed.inject(UnitOrderAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUnitOrderHistory should call adapter', () => {
    let result;
    service.getUnitOrderHistory('user3').subscribe((res) => (result = res));
    expect(result).toBe('orderHistory-user3');
    expect(adapter.loadUnitOrderHistory).toHaveBeenCalledWith(
      'user3',
      undefined,
      undefined,
      undefined
    );
  });
});
