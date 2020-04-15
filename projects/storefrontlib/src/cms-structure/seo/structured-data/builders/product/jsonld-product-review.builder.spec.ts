import { TestBed } from '@angular/core/testing';
import { Product, ProductReviewService, Review } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { JsonLdProductReviewBuilder } from './jsonld-product-review.builder';

const simpleProductMock: Product = {
  code: '123',
  name: 'Product 123',
  summary: 'Product 123 summary',
  averageRating: 2.5,
};

const review1: Review = {
  rating: 4,
  date: new Date('5 dec 2019'),
  comment: 'Great product!',
};

const review2: Review = {
  headline: 'Another review for product 123',
  comment: 'Poor, I wish I could rate 0!',
  rating: 1,
  date: new Date('1 jan 1977'),
  principal: {
    name: 'tobi',
  },
};

const review3: Review = {
  headline: 'Last review for product 123',
  rating: 3,
  date: new Date('1 jan 2001'),
};

class MockProductReviewService {
  getByProductCode(_code: string): Observable<Review[]> {
    return of([]);
  }
}

describe('JsonLdProductReviewBuilder', () => {
  let service: JsonLdProductReviewBuilder;
  let reviewService: ProductReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JsonLdProductReviewBuilder,
        {
          provide: ProductReviewService,
          useClass: MockProductReviewService,
        },
      ],
    });

    service = TestBed.inject(JsonLdProductReviewBuilder);

    reviewService = TestBed.inject(ProductReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('@AggregateRating', () => {
    it('should contain a schema with aggregateRating.ratingCount = 1', () => {
      spyOn(reviewService, 'getByProductCode').and.returnValue(of([review1]));
      service
        .build(simpleProductMock)
        .subscribe((schema) => {
          expect(schema.aggregateRating.ratingCount).toEqual(1);
        })
        .unsubscribe();
    });

    it('should contain a schema with aggregateRating.ratingCount = 3', () => {
      spyOn(reviewService, 'getByProductCode').and.returnValue(
        of([review1, review2, review3])
      );
      service
        .build(simpleProductMock)
        .subscribe((schema) => {
          expect(schema.aggregateRating.ratingCount).toEqual(3);
        })
        .unsubscribe();
    });

    it('should contain a schema with aggregateRating.reviewCount = 2 out of 3', () => {
      spyOn(reviewService, 'getByProductCode').and.returnValue(
        of([review1, review2, review3])
      );
      service
        .build(simpleProductMock)
        .subscribe((schema) => {
          expect(schema.aggregateRating.reviewCount).toEqual(2);
        })
        .unsubscribe();
    });
  });

  describe('ReviewDetails', () => {
    it('should have a schema with 2 reviews', () => {
      spyOn(reviewService, 'getByProductCode').and.returnValue(
        of([review1, review2])
      );
      service
        .build(simpleProductMock)
        .subscribe((schema) => {
          expect(schema.review.length).toEqual(2);
        })
        .unsubscribe();
    });
    it('should have a schema with 3 reviews', () => {
      spyOn(reviewService, 'getByProductCode').and.returnValue(
        of([review1, review2, review3])
      );
      service
        .build(simpleProductMock)
        .subscribe((schema) => {
          expect(schema.review.length).toEqual(3);
        })
        .unsubscribe();
    });

    it('should have reviewRating', () => {
      spyOn(reviewService, 'getByProductCode').and.returnValue(of([review1]));
      service
        .build(simpleProductMock)
        .subscribe((schema) => {
          expect(schema.review[0].reviewRating.ratingValue).toEqual('4');
        })
        .unsubscribe();
    });

    it('should not have an author', () => {
      spyOn(reviewService, 'getByProductCode').and.returnValue(of([review1]));
      service
        .build(simpleProductMock)
        .subscribe((schema) => {
          expect(schema.review[0].author).toBeUndefined();
        })
        .unsubscribe();
    });

    it('should have an author', () => {
      spyOn(reviewService, 'getByProductCode').and.returnValue(of([review2]));
      service
        .build(simpleProductMock)
        .subscribe((schema) => {
          expect(schema.review[0].author).toEqual('tobi');
        })
        .unsubscribe();
    });

    it('should have an publication date', () => {
      spyOn(reviewService, 'getByProductCode').and.returnValue(of([review1]));
      service
        .build(simpleProductMock)
        .subscribe((schema) => {
          expect(schema.review[0].datePublished).toEqual('2019-12-5');
        })
        .unsubscribe();
    });
  });
});
