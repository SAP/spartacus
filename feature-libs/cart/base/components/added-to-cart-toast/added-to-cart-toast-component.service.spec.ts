import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { OrderEntry } from '../../root';
import { AddedToCartToastComponentService } from './added-to-cart-toast-component.service';

const mockOrderEntry: OrderEntry = {
  quantity: 1,
  product: { name: 'mockProduct', images: {} },
  basePrice: {
    formattedValue: '$4.20',
  },
};

describe('AddedToCartToastComponentService', () => {
  let service: AddedToCartToastComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddedToCartToastComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a toast', () => {
    const toast = service.addToast(1, mockOrderEntry, 'test');
    expect(toast).toBeTruthy();
  });

  it('should remove previous toasts when adding', fakeAsync(() => {
    const serviceSpy = spyOn(service, 'removePrevious');
    service.addToast(1, mockOrderEntry, 'test');
    tick(500);
    expect(serviceSpy).toHaveBeenCalled();
  }));

  it('should remove a toast', fakeAsync(() => {
    service.addToast(1, mockOrderEntry, 'test');
    tick(500);
    service.removeToast();
    expect(service.cartToastItems.length).toBe(0);
  }));

  it('should clear all old timeouts when adding a new toast', fakeAsync(() => {
    const clearSpy = spyOn(service, 'clearTimeouts');
    service.addToast(1, mockOrderEntry, 'test');
    tick(500);
    expect(clearSpy).toHaveBeenCalled();
  }));

  it('should remove previous toasts when adding a new toast', fakeAsync(() => {
    const removeSpy = spyOn(service, 'removePrevious');
    service.addToast(1, mockOrderEntry, 'test');
    tick(500);
    expect(removeSpy).toHaveBeenCalled();
  }));

  it('should change the position of the toast', () => {
    const toast = service.addToast(1, mockOrderEntry, 'test');
    service.setPosition('test-class');
    expect(toast.baseClass).toBe('test-class');
  });
});
