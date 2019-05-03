import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductReviewService, Review, UIProduct } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { CurrentProductService } from 'projects/storefrontlib/src/lib/ui/pages/product-page/current-product.service';

@Component({
  selector: 'cx-product-reviews',
  templateUrl: './product-reviews.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReviewsComponent implements OnChanges, OnInit, OnDestroy {
  product: UIProduct;
  subscription: Subscription;

  isWritingReview = false;

  // TODO: configurable
  initialMaxListItems = 5;
  maxListItems: number;
  reviewForm: FormGroup;

  reviews$: Observable<Review[]>;

  constructor(
    protected reviewService: ProductReviewService,
    protected currentProductService: CurrentProductService,
    private fb: FormBuilder
  ) {}

  ngOnChanges(): void {
    this.maxListItems = this.initialMaxListItems;
  }

  ngOnInit(): void {
    this.subscription = this.currentProductService
      .getProduct()
      .subscribe((product: UIProduct) => {
        this.product = product;
        this.reviews$ = this.reviewService.getByProductCode(this.product.code);
      });
    this.resetReviewForm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initiateWriteReview(): void {
    this.isWritingReview = true;
  }

  cancelWriteReview(): void {
    this.isWritingReview = false;
    this.resetReviewForm();
  }

  submitReview(): void {
    const reviewFormControls = this.reviewForm.controls;
    const review: Review = {
      headline: reviewFormControls.title.value,
      comment: reviewFormControls.comment.value,
      rating: reviewFormControls.rating.value,
      alias: reviewFormControls.reviewerName.value,
    };

    this.reviewService.add(this.product.code, review);

    this.isWritingReview = false;
    this.resetReviewForm();
  }

  private resetReviewForm(): void {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      comment: ['', Validators.required],
      rating: [0, [Validators.min(1), Validators.max(5)]],
      reviewerName: '',
    });
  }
}
