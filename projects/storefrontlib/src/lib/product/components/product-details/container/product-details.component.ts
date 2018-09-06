import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../../store';

@Component({
  selector: 'y-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnChanges {
  @ViewChild('tabSet') tabSet;
  @ViewChild('tabSetWrapper') tabSetWrapper;
  @Input() productCode: string;
  product$: Observable<any>;

  isWritingReview = false;

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
    this.tabSet.select('reviews');
    this.tabSetWrapper.nativeElement.scrollIntoView();
  }
}
