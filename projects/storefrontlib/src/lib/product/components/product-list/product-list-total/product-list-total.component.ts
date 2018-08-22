import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import * as fromProductStore from '../../../store';

@Component({
  selector: 'y-product-list-total',
  templateUrl: './product-list-total.component.html',
  styleUrls: ['./product-list-total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListTotalComponent implements OnInit {
  @Input() query;

  total$: Observable<number>;

  constructor(protected store: Store<fromProductStore.ProductsState>) {}

  ngOnInit() {
    this.total$ = this.store
      .select(fromProductStore.getSearchResultsPagination)
      .pipe(map(pagination => pagination && pagination.totalResults));
  }
}
