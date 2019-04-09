import { OccProductReviewsListNormalizer } from './occ-product-reviews-list.normalizer';
import { Review, ReviewList } from '@spartacus/core';

describe('OccProductReviewsListNormalizer', () => {
  let normalizer: OccProductReviewsListNormalizer;

  const reviews: Review[] = [
    {
      id: '1',
    },
    {
      id: '2',
    },
  ];

  const reviewList: ReviewList = {
    reviews,
  };

  beforeAll(() => {
    normalizer = new OccProductReviewsListNormalizer();
  });

  it('should create an instance', () => {
    expect(normalizer).toBeTruthy();
  });

  it('it should return reviews from ReviewList', () => {
    const result = normalizer.normalize(reviewList);
    expect(result).toEqual(reviews);
  });

  it('it should take into account target if defined', () => {
    const target = [{ comment: 'test' }];
    const result = normalizer.normalize(reviewList, target);
    expect(result[0]).toEqual({ id: '1', comment: 'test' });
  });
});
