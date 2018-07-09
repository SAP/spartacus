import { StarRatingComponent } from './../star-rating/star-rating.component';
import { FormBuilder, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  forwardRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'y-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StarRatingComponent)
    }
  ]
})
export class ProductReviewsComponent implements OnChanges, OnInit, OnDestroy {
  @Input() product: any;

  // TODO: configurable
  initialMaxListItems = 5;
  maxListItems;
  writingReview = false;

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
    this.reviewForm = this.fb.group({
      title: '',
      comment: '',
      rating: 0,
      reviewerName: ''
    });
  }
  ngOnDestroy() {}

  initiateWriteReview() {
    this.writingReview = true;
  }

  test() {
    console.log(this.reviewForm.controls);
  }
}
