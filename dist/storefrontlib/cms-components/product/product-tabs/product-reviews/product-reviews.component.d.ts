import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Product, ProductReviewService, Review } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import * as i0 from "@angular/core";
export declare class ProductReviewsComponent {
    protected reviewService: ProductReviewService;
    protected currentProductService: CurrentProductService;
    private fb;
    protected cd: ChangeDetectorRef;
    titleInput: ElementRef;
    writeReviewButton: ElementRef;
    isWritingReview: boolean;
    initialMaxListItems: number;
    maxListItems: number;
    reviewForm: UntypedFormGroup;
    product$: Observable<Product | null>;
    reviews$: Observable<Review[]>;
    constructor(reviewService: ProductReviewService, currentProductService: CurrentProductService, fb: UntypedFormBuilder, cd: ChangeDetectorRef);
    initiateWriteReview(): void;
    cancelWriteReview(): void;
    setRating(rating: number): void;
    submitReview(product: Product): void;
    addReview(product: Product): void;
    private resetReviewForm;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductReviewsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductReviewsComponent, "cx-product-reviews", never, {}, {}, never, never, false, never>;
}
