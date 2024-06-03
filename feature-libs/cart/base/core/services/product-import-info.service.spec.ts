import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { CartActions } from '@spartacus/cart/base/core';
import { ProductImportStatus } from '@spartacus/cart/base/root';
import { LoggerService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { ProductImportInfoService } from './product-import-info.service';

const mockActionsSubject = new Subject<Action>();
const mockCartId = '00004546';
const mockUserId = 'current';

describe('ProductImportInfoService', () => {
  let service: ProductImportInfoService;
  let logger: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductImportInfoService,
        { useValue: mockActionsSubject, provide: ActionsSubject },
      ],
    });
    service = TestBed.inject(ProductImportInfoService);
    logger = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getResults', () => {
    it('should return success', () => {
      let result;
      service.getResults(mockCartId).subscribe((data) => (result = data));

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

      expect(result).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.SUCCESS,
        productName: 'mockProduct1',
      });
    });

    it('should return low stock', () => {
      let result;
      service.getResults(mockCartId).subscribe((data) => (result = data));

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

      expect(result).toEqual({
        productName: 'mockProduct1',
        quantity: 4,
        quantityAdded: 1,
        productCode: '693923',
        statusCode: ProductImportStatus.LOW_STOCK,
      });
    });

    it('should return no stock', () => {
      let result;
      service.getResults(mockCartId).subscribe((data) => (result = data));

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

      expect(result).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.NO_STOCK,
        productName: 'mockProduct1',
      });
    });

    it('should return Unknown Identifier Error', () => {
      let result;
      service.getResults(mockCartId).subscribe((data) => (result = data));

      mockActionsSubject.next(
        new CartActions.CartAddEntryFail({
          userId: mockUserId,
          cartId: mockCartId,
          productCode: '693923',
          quantity: 1,
          error: { details: [{ type: 'UnknownIdentifierError' }] },
        })
      );

      expect(result).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
      });
    });

    it('should return unknown error action', () => {
      spyOn(logger, 'warn');
      let result;
      const payload = {
        userId: mockUserId,
        cartId: mockCartId,
        productCode: '693923',
        entry: { product: { name: 'mockProduct1' } },
        quantity: 4,
        quantityAdded: 1,
        statusCode: 'CODE_WHICH_WE_DIDNT_REGISTER',
      };

      service.getResults(mockCartId).subscribe((data) => (result = data));

      mockActionsSubject.next(new CartActions.CartAddEntrySuccess(payload));

      expect(result).toEqual({
        productCode: '693923',
        statusCode: ProductImportStatus.UNKNOWN_ERROR,
      });
      expect(logger.warn).toHaveBeenCalledWith(
        'Unrecognized cart add entry action type while mapping messages',
        new CartActions.CartAddEntrySuccess(payload)
      );
    });
  });
});
