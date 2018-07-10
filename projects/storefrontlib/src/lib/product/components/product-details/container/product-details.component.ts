import { ProductReviewsComponent } from './../product-reviews/product-reviews.component';
import { MatTabGroup } from '@angular/material';
import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';

@Component({
  selector: 'y-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnChanges {
  @ViewChild(MatTabGroup) matTabGroup;
  @Input() productCode: string;
  product$: Observable<any>;
  selectedTabIndex = 0;
  isWritingReview = false;
  // @ViewChild(ComponentWrapperComponent) cmsComponent: ComponentWrapperComponent;

  constructor(protected store: Store<fromStore.ProductsState>) {}

  ngOnChanges() {
    this.product$ = this.store.select(
      fromStore.getSelectedProductFactory(this.productCode)
    );
  }

  goToReviews(isWritingReview?: boolean) {
    if (!isWritingReview) {
      this.isWritingReview = false;
    }
    const reviewIndex = this.matTabGroup._tabs._results.findIndex(tab => {
      return tab.textLabel.indexOf('REVIEWS') !== -1;
    });
    this.selectedTabIndex = reviewIndex;
    this.matTabGroup._elementRef.nativeElement.scrollIntoView();
  }

  writeReview() {
    this.isWritingReview = true;
    this.goToReviews(this.isWritingReview);
  }
}
