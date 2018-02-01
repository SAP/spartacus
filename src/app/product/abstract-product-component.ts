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
        .select(fromStore.getSelectedProductFactory(this.productCode))
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
