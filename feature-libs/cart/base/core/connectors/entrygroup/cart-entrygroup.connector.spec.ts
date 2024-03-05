import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartEntryGroupAdapter } from './cart-entrygroup.adapter';
import { CartEntryGroupConnector } from './cart-entrygroup.connector';
import createSpy = jasmine.createSpy;

describe('CartEntryGroupConnector', () => {
  class MockCartEntryGroupAdapter implements CartEntryGroupAdapter {
    remove = createSpy().and.returnValue(of({}));
    addTo = createSpy().and.returnValue(of({}));
  }

  let service: CartEntryGroupConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CartEntryGroupAdapter, useClass: MockCartEntryGroupAdapter },
      ],
    });

    service = TestBed.inject(CartEntryGroupConnector);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('remove should call adapter', () => {
    const adapter = TestBed.inject(CartEntryGroupAdapter);
    service.remove('1', '2', 3).subscribe();
    expect(adapter.remove).toHaveBeenCalledWith('1', '2', 3);
  });

  it('addTo should call adapter', () => {
    const adapter = TestBed.inject(CartEntryGroupAdapter);
    service.addTo('1', '2', 3, '4', 1).subscribe();
    expect(adapter.addTo).toHaveBeenCalledWith('1', '2', 3, '4', 1);
  });
});
