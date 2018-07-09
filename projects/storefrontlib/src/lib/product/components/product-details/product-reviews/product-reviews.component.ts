import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
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
