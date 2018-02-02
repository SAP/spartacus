import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'y-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() productCode: string;
  product$: Observable<any>;

  constructor(protected store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.product$ = this.store.select(
      fromStore.getSelectedProductFactory(this.productCode)
    );
  }
}
