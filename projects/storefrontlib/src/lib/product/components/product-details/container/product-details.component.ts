import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../../store';

@Component({
  selector: 'y-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnChanges {
  @ViewChild(MatTabGroup) matTabGroup;
  @Input() productCode: string;
  product$: Observable<any>;
  // The value of selectedTabIndex reflects the current tab selected
  selectedTabIndex = 0;
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
    const reviewPosition = this.matTabGroup._tabs.find((tab: MatTab) => {
      return tab.textLabel.indexOf('REVIEWS') !== -1;
    }).position;

    this.selectedTabIndex += reviewPosition;

    this.matTabGroup._elementRef.nativeElement.scrollIntoView();
  }

  writeReview() {
    this.isWritingReview = true;
    this.goToReviews(this.isWritingReview);
  }
}
