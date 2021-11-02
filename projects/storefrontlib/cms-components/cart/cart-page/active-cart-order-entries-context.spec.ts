import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { ActiveCartService, OrderEntry } from '@spartacus/core';
import { ProductData } from '../order-entries-context/import-to-cart.model';
import { ActiveCartOrderEntriesContext } from './active-cart-order-entries-context';
import createSpy = jasmine.createSpy;

const mockActionsSubject = new Subject<Action>();

const mockCartId = '00004546';

const mockProductData: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

class MockActiveCartService implements Partial<ActiveCartService> {
  addEntries = createSpy().and.callThrough();
  getEntries = createSpy().and.returnValue(of(mockEntries));
  getActiveCartId = createSpy().and.returnValue(of(mockCartId));
}

describe('ActiveCartOrderEntriesContext', () => {
  let service: ActiveCartOrderEntriesContext;
  let activeCartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { useValue: mockActionsSubject, provide: ActionsSubject },
        { useClass: MockActiveCartService, provide: ActiveCartService },
      ],
    });
    service = TestBed.inject(ActiveCartOrderEntriesContext);
    activeCartService = TestBed.inject(ActiveCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addEntries', () => {
    it('addEntries for active cart', () => {
      service.addEntries(mockProductData).subscribe().unsubscribe();

      expect(activeCartService.addEntries).toHaveBeenCalledWith([
        { product: { code: '693923' }, quantity: 1 },
        { product: { code: '232133' }, quantity: 2 },
      ]);
      expect(activeCartService.getActiveCartId).toHaveBeenCalledWith();
    });
  });

  describe('getEntries', () => {
    it('getEntries from active cart', () => {
      let entries: OrderEntry[];
      service
        .getEntries()
        .subscribe((result) => {
          entries = result;
        })
        .unsubscribe();

      expect(activeCartService.getEntries).toHaveBeenCalledWith();
      expect(entries).toEqual(mockEntries);
    });
  });
});
