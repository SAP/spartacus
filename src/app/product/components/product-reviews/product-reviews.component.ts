import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'y-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductReviewsComponent implements OnInit, OnDestroy {
  @Input() product: any;
  subscription: Subscription;

  // TODO: configurable
  initialMaxListItems = 5;
  maxListItems;

  reviews$: Observable<any>;

  constructor(protected store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.maxListItems = this.initialMaxListItems;

    if (this.product) {
      this.reviews$ = this.store.select(
        fromStore.getSelectedProductReviewsFactory(this.product.code)
      );
    }

    this.subscription = this.store
      .select(fromStore.getProductCode)
      .subscribe(code => {
        if (this.product && code !== this.product.code) {
          this.store.dispatch(
            new fromStore.LoadProductReviews(this.product.code)
          );
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
