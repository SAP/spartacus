import { TestBed } from '@angular/core/testing';

import { Product } from '@spartacus/core';

import { StripHtmlPipe } from './strip-html.pipe';

describe('StripHtmlPipe', () => {
  const mockProduct: Product = {
    code: 'testId',
    name: '8GB Super Fast <em class="search-results-highlight">Card</em>'
  };

  let pipe: StripHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StripHtmlPipe]
    });
    pipe = TestBed.get(StripHtmlPipe);
  });

  describe('transform', () => {
    it('should return the product with an unstilled name', () => {
      const transformedProduct = pipe.transform(mockProduct);

      expect(transformedProduct.code).toEqual(mockProduct.code);
      expect(transformedProduct.name).toEqual('8GB Super Fast Card');
    });
  });
});
