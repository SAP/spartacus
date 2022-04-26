import { EventEmitter } from '@angular/core';
import { ProductReference } from '@spartacus/core';
import { of } from 'rxjs';
import { skip } from 'rxjs/operators';
import { VisualPickingProductFilterService } from './visual-picking-product-filter.service';

describe('VisualPickingProductFilterService', () => {
  it('should match on product code', (done) => {
    const visualPickingProductFilterService =
      new VisualPickingProductFilterService();

    const productReferences: ProductReference[] = [
      {
        target: {
          code: 'productCodeX',
        },
      },
      {
        target: {
          code: 'productCodeY',
        },
      },
      {
        target: {
          code: 'productCodeZ',
        },
      },
    ];

    visualPickingProductFilterService
      .getFilteredProducts(of(productReferences))
      .pipe(skip(1))
      .subscribe((filteredProductReferences: ProductReference[]) => {
        expect(filteredProductReferences).toBeTruthy();
        expect(filteredProductReferences.length).toBe(1);
        expect(filteredProductReferences[0].target?.code).toBe('productCodeY');
        done();
      });

    visualPickingProductFilterService.filter = 'y';
  });

  describe('set filter', () => {
    it('should do nothing when setting existing value', (done) => {
      const visualPickingProductFilterService =
        new VisualPickingProductFilterService();

      const filter$ = visualPickingProductFilterService[
        'filter$'
      ] as EventEmitter<string>;
      const spy = spyOn(filter$, 'emit');

      visualPickingProductFilterService.filter = '';
      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });

  describe('get filter', () => {
    it('should return value that was set', () => {
      const visualPickingProductFilterService =
        new VisualPickingProductFilterService();

      expect(visualPickingProductFilterService.filter).toEqual('');
      visualPickingProductFilterService.filter = 'yyyy';
      expect(visualPickingProductFilterService.filter).toEqual('yyyy');
    });
  });

  describe('getFilteredProducts', () => {
    it('should match on product description', (done) => {
      const visualPickingProductFilterService =
        new VisualPickingProductFilterService();

      const productReferences: ProductReference[] = [
        {
          target: {
            code: 'productCode1',
            name: 'x',
          },
        },
        {
          target: {
            code: 'productCode2',
            name: 'y',
          },
        },
        {
          target: {
            code: 'productCode3',
            name: 'z',
          },
        },
      ];

      visualPickingProductFilterService
        .getFilteredProducts(of(productReferences))
        .pipe(skip(1))
        .subscribe((filteredProductReferences: ProductReference[]) => {
          expect(filteredProductReferences).toBeTruthy();
          expect(filteredProductReferences.length).toBe(1);
          expect(filteredProductReferences[0].target?.code).toBe(
            'productCode1'
          );
          done();
        });

      visualPickingProductFilterService.filter = 'X';
    });

    it('should match multiple', (done) => {
      const visualPickingProductFilterService =
        new VisualPickingProductFilterService();

      const productReferences: ProductReference[] = [
        {
          target: {
            code: 'productCode1',
            name: 'xx',
          },
        },
        {
          target: {
            code: 'productCode2',
            name: 'xy',
          },
        },
        {
          target: {
            code: 'productCode3',
            name: 'xz',
          },
        },
      ];

      visualPickingProductFilterService
        .getFilteredProducts(of(productReferences))
        .pipe(skip(1))
        .subscribe((filteredProductReferences: ProductReference[]) => {
          expect(filteredProductReferences).toBeTruthy();
          expect(filteredProductReferences.length).toBe(3);
          expect(filteredProductReferences[0].target?.code).toBe(
            'productCode1'
          );
          expect(filteredProductReferences[1].target?.code).toBe(
            'productCode2'
          );
          expect(filteredProductReferences[2].target?.code).toBe(
            'productCode3'
          );
          done();
        });

      visualPickingProductFilterService.filter = 'X';
    });

    it('should not filter when empty string used as filter string', (done) => {
      const visualPickingProductFilterService =
        new VisualPickingProductFilterService();

      const productReferences: ProductReference[] = [
        {
          target: {
            code: 'productCode1',
            name: 'x',
          },
        },
        {
          target: {
            code: 'productCode2',
            name: 'y',
          },
        },
        {
          target: {
            code: 'productCode3',
            name: 'z',
          },
        },
      ];

      visualPickingProductFilterService
        .getFilteredProducts(of(productReferences))
        .pipe(skip(2))
        .subscribe((filteredProductReferences: ProductReference[]) => {
          expect(filteredProductReferences).toBeTruthy();
          expect(filteredProductReferences.length).toBe(3);
          expect(filteredProductReferences[0].target?.code).toBe(
            'productCode1'
          );
          expect(filteredProductReferences[1].target?.code).toBe(
            'productCode2'
          );
          expect(filteredProductReferences[2].target?.code).toBe(
            'productCode3'
          );
          done();
        });

      // use a value other than ''
      visualPickingProductFilterService.filter = 'yyyyy';
      // set back to ''
      visualPickingProductFilterService.filter = '';
    });
  });
});
