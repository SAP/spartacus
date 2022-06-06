import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartEntryGroupAdapter } from './cart-entry-group.adapter';
import { CartEntryGroupConnector } from './cart-entry-group.connector';
import createSpy = jasmine.createSpy;

describe('CartEntryGroupConnector', () => {
  class MockCartEntryGroupAdapter implements CartEntryGroupAdapter {
    addToEntryGroup = createSpy().and.returnValue(of({}));
    deleteEntryGroup = createSpy().and.returnValue(of({}));
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
    expect(service).toBeTruthy();
  });

  it('addToEntryGroup should call adapter', () => {
    const adapter = TestBed.inject(CartEntryGroupAdapter);
    service.addToEntryGroup('1', '2', 3, { orderCode: '4' }).subscribe();
    expect(adapter.addToEntryGroup).toHaveBeenCalledWith('1', '2', 3, {
      orderCode: '4',
    });
  });

  it('deleteEntryGroup should call adapter', () => {
    const adapter = TestBed.inject(CartEntryGroupAdapter);
    service.deleteEntryGroup('1', '2', 3).subscribe();
    expect(adapter.deleteEntryGroup).toHaveBeenCalledWith('1', '2', 3);
  });
});
