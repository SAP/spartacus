import { Observable } from 'rxjs/Observable';
import {
  Injectable,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectorRef
} from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Injectable()
export abstract class AbstractProductComponent implements OnInit, OnChanges {
  model$: Observable<any>;

  @Input() productCode: string;

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.ProductsState>
  ) {}

  ngOnChanges() {
    if (this.productCode) {
      this.model$ = this.store.select(
        fromStore.getSelectedProductFactory(this.productCode)
      );
      this.ready();
    }
  }

  ngOnInit() {}

  // HOOK
  protected ready() {}
}
