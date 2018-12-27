import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductReviewService, Review, Product } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'cx-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductReviewsComponent implements OnChanges, OnInit {
  @Input()
  product: Product;
  @Input()
  get isWritingReview() {
    return this._isWritingReview;
  }
  @Output()
  isWritingReviewChange = new EventEmitter();

  set isWritingReview(val) {
    this._isWritingReview = val;
    this.isWritingReviewChange.emit(this.isWritingReview);
  }
  private _isWritingReview = false;

  // TODO: configurable
  initialMaxListItems = 5;
  maxListItems: number;
  reviewForm: FormGroup;

  reviews$: Observable<Review[]>;

  constructor(
    protected reviewService: ProductReviewService,
    private fb: FormBuilder
  ) {}

  ngOnChanges() {
    this.maxListItems = this.initialMaxListItems;

    if (this.product) {
      this.reviews$ = this.reviewService.getByProductCode(this.product.code);
    }
  }

  ngOnInit() {
    this.resetReviewForm();
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
      alias: reviewFormControls.reviewerName.value
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
      reviewerName: ''
    });
  }
}
