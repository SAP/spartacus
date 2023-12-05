import { Action } from '@ngrx/store';
import { ErrorModel, HttpErrorModel } from '../../../model/misc.model';
import { Review } from '../../../model/product.model';
export declare const LOAD_PRODUCT_REVIEWS = "[Product] Load Product Reviews Data";
export declare const LOAD_PRODUCT_REVIEWS_FAIL = "[Product] Load Product Reviews Data Fail";
export declare const LOAD_PRODUCT_REVIEWS_SUCCESS = "[Product] Load Product Reviews Data Success";
export declare const POST_PRODUCT_REVIEW = "[Product] Post Product Review";
export declare const POST_PRODUCT_REVIEW_FAIL = "[Product] Post Product Review Fail";
export declare const POST_PRODUCT_REVIEW_SUCCESS = "[Product] Post Product Review Success";
export declare class LoadProductReviews implements Action {
    payload: string;
    readonly type = "[Product] Load Product Reviews Data";
    constructor(payload: string);
}
export declare class LoadProductReviewsFail implements Action {
    payload?: ErrorModel | undefined;
    readonly type = "[Product] Load Product Reviews Data Fail";
    constructor(payload?: ErrorModel | undefined);
}
export declare class LoadProductReviewsSuccess implements Action {
    payload: {
        productCode: string;
        list: Review[];
    };
    readonly type = "[Product] Load Product Reviews Data Success";
    constructor(payload: {
        productCode: string;
        list: Review[];
    });
}
export declare class PostProductReview implements Action {
    payload: {
        productCode: string;
        review: Review;
    };
    readonly type = "[Product] Post Product Review";
    constructor(payload: {
        productCode: string;
        review: Review;
    });
}
export declare class PostProductReviewFail implements Action {
    payload?: HttpErrorModel | undefined;
    readonly type = "[Product] Post Product Review Fail";
    constructor(payload?: HttpErrorModel | undefined);
}
export declare class PostProductReviewSuccess implements Action {
    payload: Review;
    readonly type = "[Product] Post Product Review Success";
    constructor(payload: Review);
}
export type ProductReviewsAction = LoadProductReviews | LoadProductReviewsFail | LoadProductReviewsSuccess | PostProductReview | PostProductReviewFail | PostProductReviewSuccess;
