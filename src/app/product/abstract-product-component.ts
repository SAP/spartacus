import { Observable } from 'rxjs/Rx';
import {
  Injectable,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectorRef
} from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from './store';

@Injectable()
export abstract class AbstractProductComponent implements OnInit, OnChanges {
  model;

  @Input() productCode: string;

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.ProductsState>
  ) {}

  ngOnChanges() {
    if (this.productCode) {
      this.store
        .select(
          fromStore.getSelectedProductsFactory(
            new Array<String>(this.productCode)
          )
        )
        .map(products => {
          if (products && Array.isArray(products) && products.length > 0) {
            return products[0];
          }
        })
        .subscribe(product => {
          this.model = product;
          // this.cd.markForCheck();
          this.ready();
        });
    }
  }

  ngOnInit() {}

  // HOOK
  protected ready() {}
}
