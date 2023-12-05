import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ProductReviewsConnector } from '../../connectors/reviews/product-reviews.connector';
import { ProductActions } from '../actions/index';
import { GlobalMessageService } from '../../../global-message/index';
import { LoggerService } from '../../../logger';
import * as i0 from "@angular/core";
export declare class ProductReviewsEffects {
    private actions$;
    private productReviewsConnector;
    private globalMessageService;
    protected logger: LoggerService;
    loadProductReviews$: Observable<ProductActions.LoadProductReviewsSuccess | ProductActions.LoadProductReviewsFail>;
    postProductReview: Observable<ProductActions.PostProductReviewSuccess | ProductActions.PostProductReviewFail>;
    showGlobalMessageOnPostProductReviewSuccess$: Observable<never> & import("@ngrx/effects").CreateEffectMetadata;
    showGlobalMessageOnPostProductReviewFail$: Observable<never> & import("@ngrx/effects").CreateEffectMetadata;
    constructor(actions$: Actions, productReviewsConnector: ProductReviewsConnector, globalMessageService: GlobalMessageService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductReviewsEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductReviewsEffects>;
}
