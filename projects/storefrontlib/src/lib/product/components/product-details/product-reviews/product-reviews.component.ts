import { OccProductService } from './../../../../occ/product/product.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
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

  maxListItems;
  reviewForm: FormGroup;
  // TODO: configurable
  initialMaxListItems = 5;

  reviews$: Observable<any>;

  constructor(
    protected store: Store<fromStore.ProductsState>,
    private fb: FormBuilder,
    private service: OccProductService
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
      this.reviews$.subscribe(data => console.log(data));
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

  initiateWriteReview() {
    this.isWritingReview = true;
  }

  cancelWriteReview() {
    this.resetReviewForm();
    this.isWritingReview = false;
  }

  submitReview() {
    // this.resetReviewForm();
    this.service
      .postProductReview(this.product.code, this.reviewForm.controls)
      .subscribe();

    this.store.dispatch;

    this.isWritingReview = false;
  }

  private resetReviewForm() {
    this.reviewForm.reset({
      title: '',
      comment: '',
      rating: 0,
      reviewerName: ''
    });
  }
}
