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
import { Observable } from 'rxjs';
import { ProductReviewService } from '@spartacus/core';

@Component({
  selector: 'cx-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductReviewsComponent implements OnChanges, OnInit {
  @Input()
  product: any;
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
  maxListItems;
  reviewForm: FormGroup;

  reviews$: Observable<any>;

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

  initiateWriteReview() {
    this.isWritingReview = true;
  }

  cancelWriteReview() {
    this.isWritingReview = false;
    this.resetReviewForm();
  }

  submitReview() {
    this.reviewService.add(this.product.code, this.reviewForm.controls);

    this.isWritingReview = false;
    this.resetReviewForm();
  }

  private resetReviewForm() {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      comment: ['', Validators.required],
      rating: [0, [Validators.min(1), Validators.max(5)]],
      reviewerName: ''
    });
  }
}
