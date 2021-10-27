import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { CartActions } from '@spartacus/core';
import {
  OrderEntriesSource,
  AddOrderEntriesContext,
  ProductImportStatus,
  ProductData,
} from '@spartacus/storefront';
import { CartOrderEntriesContext } from './cart-order-entries.context';

const mockActionsSubject = new Subject<Action>();

const mockProductsData: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

const mockCartId = '00004546';
const mockUserId = 'current';

@Injectable({
  providedIn: 'root',
})
class TestCartOrderEntriesContext
  extends CartOrderEntriesContext
  implements AddOrderEntriesContext
{
  constructor(protected actionsSubject: ActionsSubject) {
    super(actionsSubject);
  }

  readonly type = 'TEST_CART' as OrderEntriesSource;

  protected add(_products: ProductData[]): Observable<string> {
    return of(mockCartId);
  }
}

describe('CartOrderEntriesContext', () => {
  let service: TestCartOrderEntriesContext;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ useValue: mockActionsSubject, provide: ActionsSubject }],
    });
    service = TestBed.inject(TestCartOrderEntriesContext);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addEntries', () => {
    it('should return success action', () => {
      let action;
      service.addEntries(mockProductsData).subscribe((data) => (action = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntrySuccess({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          quantity: 1,
          entry: { product: { name: 'mockProduct1' } },
          quantityAdded: 1,
          statusCode: ProductImportStatus.SUCCESS,
        })
      );

      expect(action).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.SUCCESS,
        productName: 'mockProduct1',
      });
    });

    it('should return low stock action', () => {
      let action;
      service.addEntries(mockProductsData).subscribe((data) => (action = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntrySuccess({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          entry: { product: { name: 'mockProduct1' } },
          quantity: 4,
          quantityAdded: 1,
          statusCode: ProductImportStatus.LOW_STOCK,
        })
      );

      expect(action).toEqual({
        productName: 'mockProduct1',
        quantity: 4,
        quantityAdded: 1,
        productCode: '693923',
        statusCode: ProductImportStatus.LOW_STOCK,
      });
    });

    it('should return no stock action', () => {
      let action;
      service.addEntries(mockProductsData).subscribe((data) => (action = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntrySuccess({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          entry: { product: { name: 'mockProduct1' } },
          quantity: 4,
          quantityAdded: 0,
          statusCode: ProductImportStatus.NO_STOCK,
        })
      );

      expect(action).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.NO_STOCK,
        productName: 'mockProduct1',
      });
    });

    it('should return Unknown Identifier Error action', () => {
      let action;
      service.addEntries(mockProductsData).subscribe((data) => (action = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntryFail({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          quantity: 1,
          error: { details: [{ type: 'UnknownIdentifierError' }] },
        })
      );

      expect(action).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
      });
    });

    it('should return unknown error action', () => {
      let action;
      service.addEntries(mockProductsData).subscribe((data) => (action = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntrySuccess({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          entry: { product: { name: 'mockProduct1' } },
          quantity: 4,
          quantityAdded: 1,
          statusCode: 'CODE_WHICH_WE_DIDNT_REGISTER',
        })
      );

      expect(action).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.UNKNOWN_ERROR,
      });
    });
  });
});
