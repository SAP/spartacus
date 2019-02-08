import { StripHighlightPipe } from './strip-highlight.pipe';
import { TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';

describe('StripHighlightPipe', () => {
  const mockProduct: Product = {
    code: 'testId',
    name: '8GB Super Fast <em class="search-results-highlight">Card</em>'
  };

  let pipe: StripHighlightPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StripHighlightPipe]
    });
    pipe = TestBed.get(StripHighlightPipe);
  });

  describe('transform', () => {
    it('should return the product with an unstilled name', () => {
      const transformedProduct = pipe.transform(mockProduct);

      expect(transformedProduct.code).toEqual(mockProduct.code);
      expect(transformedProduct.name).toEqual('8GB Super Fast Card');
    });
  });
});
