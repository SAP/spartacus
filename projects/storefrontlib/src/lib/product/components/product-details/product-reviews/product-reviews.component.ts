import { Actions } from '@ngrx/effects';

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../../store';

@Component({
  selector: 'y-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductReviewsComponent implements OnChanges, OnInit {
  @Input() product: any;
  @Input()
  get isWritingReview() {
    return this._isWritingReview;
  }
  @Output() isWritingReviewChange = new EventEmitter();

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
    protected store: Store<fromStore.ProductsState>,
    private fb: FormBuilder
  ) {}

  ngOnChanges() {
    this.maxListItems = this.initialMaxListItems;

    if (this.product) {
      this.reviews$ = this.store
        .select(fromStore.getSelectedProductReviewsFactory(this.product.code))
        .pipe(
          tap(reviews => {
            if (reviews === undefined && this.product.code !== undefined) {
              this.store.dispatch(
                new fromStore.LoadProductReviews(this.product.code)
              );
            }
          })
        );
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
    this.store.dispatch(
      new fromStore.PostProductReview({
        productCode: this.product.code,
        review: this.reviewForm.controls
      })
    );

    this.isWritingReview = false;
    this.resetReviewForm();
  }

  private resetReviewForm() {
    this.reviewForm = this.fb.group({
      title: '',
      comment: '',
      rating: 0,
      reviewerName: ''
    });
  }
}
